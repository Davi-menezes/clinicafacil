import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import * as crypto from 'crypto';
import { PrismaService } from '../database/prisma.service';
import { EncryptionService } from '../common/encryption.service';
import { RedisService } from '../config/redis.service';

@Injectable()
export class AuthService {
  private readonly BCRYPT_COST = 12;
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly LOGIN_WINDOW_SECONDS = 15 * 60;
  private readonly EMAIL_VERIFY_TTL = 15 * 60;

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encryptionService: EncryptionService,
    private readonly redisService: RedisService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.BCRYPT_COST);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  encryptEmail(email: string): { encrypted: string; hash: string } {
    const encrypted = this.encryptionService.encrypt(email.toLowerCase().trim());
    const hash = this.encryptionService.hash(email);
    return { encrypted, hash };
  }

  async validateLogin(ip: string): Promise<void> {
    const redis = this.redisService.getClient();
    const key = `login:attempts:${ip}`;
    const attempts = await redis.get(key);

    if (attempts && parseInt(attempts, 10) >= this.MAX_LOGIN_ATTEMPTS) {
      const ttl = await redis.ttl(key);
      throw new UnauthorizedException(
        `Muitas tentativas de login. Tente novamente em ${ttl} segundos.`,
      );
    }
  }

  async recordLoginAttempt(ip: string, success: boolean): Promise<void> {
    if (success) return;
    const redis = this.redisService.getClient();
    const key = `login:attempts:${ip}`;
    await redis.multi().incr(key).expire(key, this.LOGIN_WINDOW_SECONDS).exec();
  }

  async generateTokens(user: { id: string; tipo: string; emailHash: string }) {
    const payload = { sub: user.id, tipo: user.tipo, emailHash: user.emailHash };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES') || '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES') || '7d',
      }),
    ]);

    const familia = crypto.randomUUID();
    const tokenHash = this.encryptionService.hash(refreshToken);

    await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        tokenHash,
        familia,
        expiraEm: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return { accessToken, refreshToken };
  }

  async refreshTokens(oldRefreshToken: string) {
    const tokenHash = this.encryptionService.hash(oldRefreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.usado || new Date() > storedToken.expiraEm) {
      if (storedToken) {
        await this.prisma.refreshToken.deleteMany({
          where: { familia: storedToken.familia },
        });
      }
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { usado: true },
    });

    const tokens = await this.generateTokens({
      id: storedToken.user.id,
      tipo: storedToken.user.tipo,
      emailHash: storedToken.user.emailHash,
    });

    return tokens;
  }

  async sendEmailVerification(userId: string, email: string): Promise<string> {
    const token = crypto.randomUUID();
    const redis = this.redisService.getClient();
    await redis.set(
      `email:verify:${token}`,
      JSON.stringify({ userId, email }),
      'EX',
      this.EMAIL_VERIFY_TTL,
    );
    return token;
  }

  async verifyEmail(token: string): Promise<{ userId: string }> {
    const redis = this.redisService.getClient();
    const data = await redis.get(`email:verify:${token}`);
    if (!data) throw new BadRequestException('Token inválido ou expirado');

    const { userId } = JSON.parse(data) as { userId: string; email: string };
    await this.prisma.user.update({ where: { id: userId }, data: { verificado: true } });
    await redis.del(`email:verify:${token}`);

    return { userId };
  }

  generateTotpSecret(): { secret: string; otpauthUrl: string } {
    const secret = speakeasy.generateSecret({
      name: `ClinicaFacil (${process.env.APP_NAME || 'app'})`,
    });
    return {
      secret: secret.base32,
      otpauthUrl: secret.otpauth_url || '',
    };
  }

  verifyTotpToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }
}