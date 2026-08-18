import {
  Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException,
  BadRequestException, Req, Ip, Get, Param, Res, UseGuards, Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { PrismaService } from '../database/prisma.service';
import { EncryptionService } from '../common/encryption.service';
import { ConselhoService } from '../professionals/conselho.service';
import { RedisService } from '../config/redis.service';
import {
  LoginDto, CadastroProfissionalDto, CadastroPacienteDto, RefreshTokenDto,
  VerifyEmailDto, SetupTotpDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto,
} from './dto/auth.dto';
import { Throttle } from '@nestjs/throttler';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { JwtAuthGuard, GoogleAuthGuard, OptionalJwtGuard } from './guards/jwt-auth.guard';
import slugify from 'slugify';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly encryptionService: EncryptionService,
    private readonly conselhoService: ConselhoService,
    private readonly redisService: RedisService,
  ) {}

  private async createAuditLog(acao: string, userId?: string, detalhes?: string) {
    this.prisma.logAuditoria.create({
      data: { userId, acao, entidade: 'auth', entidadeId: userId, detalhes },
    }).catch(() => {});
  }

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login com email e senha' })
  async login(@Body() dto: LoginDto, @Ip() ip: string) {
    await this.authService.validateLogin(ip);

    const emailHash = this.authService.encryptEmail(dto.email).hash;
    const user = await this.prisma.user.findUnique({ where: { emailHash } });

    if (!user) {
      await this.authService.recordLoginAttempt(ip, false);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const validPassword = await this.authService.comparePassword(dto.senha, user.senhaHash);
    if (!validPassword) {
      await this.authService.recordLoginAttempt(ip, false);
      throw new UnauthorizedException('Credenciais inválidas');
    }

    if (!user.verificado) {
      throw new UnauthorizedException('Email não verificado. Verifique sua caixa de entrada.');
    }

    if (user.totpAtivo) {
      return { requiresTwoFactor: true, userId: user.id };
    }

    const tokens = await this.authService.generateTokens({
      id: user.id, tipo: user.tipo, emailHash: user.emailHash,
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { ultimoAcessoEm: new Date() },
    });

    await this.createAuditLog('LOGIN', user.id, `IP: ${ip}`);
    return tokens;
  }

  @Post('login/2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login com verificação 2FA' })
  async loginTwoFactor(@Body() dto: { token: string; userId: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: dto.userId } });
    if (!user || !user.totpSecret) throw new UnauthorizedException('Configuração 2FA não encontrada');

    const valid = this.authService.verifyTotpToken(user.totpSecret, dto.token);
    if (!valid) throw new UnauthorizedException('Código 2FA inválido');

    const tokens = await this.authService.generateTokens({
      id: user.id, tipo: user.tipo, emailHash: user.emailHash,
    });

    await this.createAuditLog('LOGIN_2FA', user.id);
    return tokens;
  }

  @Post('registro-profissional')
  @ApiOperation({ summary: 'Cadastro de profissional de saúde' })
  async registroProfissional(@Body() dto: CadastroProfissionalDto) {
    if (!dto.lgpdConsent) throw new BadRequestException('Consentimento LGPD é obrigatório');

    const { encrypted, hash } = this.authService.encryptEmail(dto.email);
    const existing = await this.prisma.user.findUnique({ where: { emailHash: hash } });
    if (existing) throw new BadRequestException('Email já cadastrado');

    const validacao = await this.conselhoService.validar(
      dto.conselhoNumero, dto.conselhoSigla, dto.conselhoUf,
    );

    if (validacao.status === 'INVALIDO') {
      throw new BadRequestException(`Registro inválido: ${validacao.mensagem}`);
    }

    const passwordHash = await this.authService.hashPassword(dto.senha);
    const slug = slugify(
      `${dto.nomeCompleto}-${dto.especialidadePrincipal}-${dto.estado}-${dto.conselhoSigla}-${dto.conselhoNumero}`,
      { lower: true, strict: true },
    );

    const user = await this.prisma.user.create({
      data: {
        emailEncrypted: encrypted,
        emailHash: hash,
        senhaHash: passwordHash,
        tipo: 'PROFISSIONAL',
        nomeCompleto: dto.nomeCompleto,
        lgpdConsent: true,
        profissional: {
          create: {
            slug,
            especialidadePrincipal: dto.especialidadePrincipal,
            conselhoNumero: dto.conselhoNumero,
            conselhoSigla: dto.conselhoSigla,
            conselhoUf: dto.conselhoUf,
            conselhoVerificado: validacao.status === 'VERIFICADO',
            pendenteValidacaoManual: validacao.status === 'PENDENTE',
            estado: dto.estado,
            cidade: dto.cidade,
            bairro: dto.bairro,
            atendeOnline: dto.atendeOnline ?? false,
            atendeDomicilio: dto.atendeDomicilio ?? false,
          },
        },
      },
    });

    await this.authService.sendEmailVerification(user.id, dto.email);
    await this.createAuditLog('REGISTRO_PROFISSIONAL', user.id, `Conselho: ${dto.conselhoSigla}`);

    return {
      message: 'Cadastro realizado. Verifique seu email para ativar a conta.',
      userId: user.id,
      conselhoStatus: validacao.status === 'VERIFICADO'
        ? 'Verificado automaticamente'
        : validacao.mensagem,
    };
  }

  @Post('registro-paciente')
  @ApiOperation({ summary: 'Cadastro de paciente' })
  async registroPaciente(@Body() dto: CadastroPacienteDto) {
    if (!dto.lgpdConsent) throw new BadRequestException('Consentimento LGPD é obrigatório');

    const { encrypted, hash } = this.authService.encryptEmail(dto.email);
    const existing = await this.prisma.user.findUnique({ where: { emailHash: hash } });
    if (existing) throw new BadRequestException('Email já cadastrado');

    const passwordHash = await this.authService.hashPassword(dto.senha);
    const cpfHash = dto.cpf ? this.encryptionService.hash(dto.cpf.replace(/\D/g, '')) : null;
    const cpfEncrypted = dto.cpf ? this.encryptionService.encrypt(dto.cpf.replace(/\D/g, '')) : null;

    const user = await this.prisma.user.create({
      data: {
        emailEncrypted: encrypted,
        emailHash: hash,
        senhaHash: passwordHash,
        tipo: 'PACIENTE',
        nomeCompleto: dto.nomeCompleto,
        lgpdConsent: true,
        paciente: {
          create: {
            telefone: dto.telefone,
            dataNasc: dto.dataNascimento ? new Date(dto.dataNascimento) : null,
            estado: dto.estado,
            cidade: dto.cidade,
            cpfEncrypted: cpfEncrypted || undefined,
            cpfHash: cpfHash || undefined,
          },
        },
      },
    });

    const pacienteRecord = await this.prisma.paciente.findUnique({
        where: { userId: user.id },
      });
      if (dto.planosSaude?.length && pacienteRecord) {
        await this.prisma.planoSaudePaciente.createMany({
          data: dto.planosSaude.map((plano: string) => ({
            pacienteId: pacienteRecord.id,
            planoSaude: plano,
          })),
        });
      }

    await this.authService.sendEmailVerification(user.id, dto.email);
    await this.createAuditLog('REGISTRO_PACIENTE', user.id);

    return {
      message: 'Cadastro realizado. Verifique seu email para ativar a conta.',
      userId: user.id,
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar token JWT' })
  async refreshTokens(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshTokens(dto.refreshToken);
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verificar email' })
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Post('reenviar-verificacao')
  @Throttle({ default: { limit: 3, ttl: 900000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reenviar email de verificação' })
  async reenviarVerificacao(@Body() dto: { email: string }) {
    const emailHash = this.encryptionService.hash(dto.email);
    const user = await this.prisma.user.findUnique({ where: { emailHash } });

    if (!user || user.verificado) {
      return { message: 'Se o email existir e não estiver verificado, enviamos um novo link.' };
    }

    const token = this.encryptionService.generateToken(32);
    const tokenHash = this.encryptionService.hash(token);
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: tokenHash,
        expiresAt,
      },
    });

    const emailService = new (await import('../notifications/email.service')).EmailService(this.configService);
    await emailService.sendVerificationEmail(dto.email, token, user.nomeCompleto);

    this.createAuditLog('RESEND_VERIFICATION', user.id);

    return { message: 'Email de verificação enviado!' };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dados do usuário logado' })
  async me(@CurrentUser() user: any) {
    if (!user) throw new UnauthorizedException();
    const dbUser = await this.prisma.user.findUnique({
      where: { id: user.sub },
      select: {
        id: true, tipo: true, nomeCompleto: true, verificado: true,
        totpAtivo: true, lgpdConsent: true, criadoEm: true,
        profissional: {
          include: {
            especialidades: true,
            planosAceitos: true,
            disponibilidades: true,
          },
        },
        paciente: {
          include: { planosUsuario: true },
        },
      },
    });
    return dbUser;
  }

  @Post('profissional/assinar-destaque')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Assinar plano de destaque' })
  async assinarDestaque(@CurrentUser() user: any, @Body() dto: { subscriptionId: string; vencimento: string }) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { userId: user.sub },
    });

    if (!profissional) {
      throw new BadRequestException('Profissional não encontrado');
    }

    await this.prisma.profissional.update({
      where: { id: profissional.id },
      data: {
        planoStatus: 'PRO_DESTAQUE',
        planoDestaque: true,
        mpSubscriptionId: dto.subscriptionId,
        planoVencimento: new Date(dto.vencimento),
      },
    });

    this.createAuditLog('DESTAQUE_ASSINADO', profissional.id);

    return { message: 'Plano de destaque ativado com sucesso!' };
  }

  @Post('profissional/cancelar-destaque')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancelar plano de destaque' })
  async cancelarDestaque(@CurrentUser() user: any) {
    const profissional = await this.prisma.profissional.findUnique({
      where: { userId: user.sub },
    });

    if (!profissional) {
      throw new BadRequestException('Profissional não encontrado');
    }

    await this.prisma.profissional.update({
      where: { id: profissional.id },
      data: {
        planoStatus: 'GRATUITO',
        planoDestaque: false,
        mpSubscriptionId: null,
      },
    });

    this.createAuditLog('DESTAQUE_CANCELADO', profissional.id);

    return { message: 'Plano cancelado. Você continuará com destaque até o fim do período pago.' };
  }

  @Post('2fa/setup')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Configurar autenticação de dois fatores' })
  async setup2fa(@CurrentUser() user: any) {
    const { secret, otpauthUrl } = this.authService.generateTotpSecret();
    await this.prisma.user.update({
      where: { id: user.sub }, data: { totpSecret: secret },
    });
    await this.createAuditLog('2FA_SETUP', user.sub);
    return { otpauthUrl, message: 'Escaneie o QR code com seu app de autenticação' };
  }

  @Post('2fa/enable')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ativar 2FA' })
  async enable2fa(@Body() dto: SetupTotpDto, @CurrentUser() user: any) {
    const dbUser = await this.prisma.user.findUnique({ where: { id: user.sub } });
    if (!dbUser?.totpSecret) throw new BadRequestException('Configure 2FA primeiro');

    const valid = this.authService.verifyTotpToken(dbUser.totpSecret, dto.token);
    if (!valid) throw new BadRequestException('Código inválido');

    await this.prisma.user.update({ where: { id: user.sub }, data: { totpAtivo: true } });
    await this.createAuditLog('2FA_ENABLED', user.sub);
    return { message: 'Autenticação de dois fatores ativada com sucesso' };
  }

  @Post('2fa/disable')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Desativar 2FA' })
  async disable2fa(@Body() dto: SetupTotpDto, @CurrentUser() user: any) {
    const dbUser = await this.prisma.user.findUnique({ where: { id: user.sub } });
    if (!dbUser?.totpSecret) throw new BadRequestException('2FA não está configurado');

    const valid = this.authService.verifyTotpToken(dbUser.totpSecret, dto.token);
    if (!valid) throw new BadRequestException('Código inválido');

    await this.prisma.user.update({
      where: { id: user.sub }, data: { totpAtivo: false, totpSecret: null },
    });
    await this.createAuditLog('2FA_DISABLED', user.sub);
    return { message: '2FA desativado' };
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alterar senha' })
  async changePassword(@Body() dto: ChangePasswordDto, @CurrentUser() user: any) {
    const dbUser = await this.prisma.user.findUnique({ where: { id: user.sub } });
    if (!dbUser) throw new UnauthorizedException();

    const valid = await this.authService.comparePassword(dto.senhaAtual, dbUser.senhaHash);
    if (!valid) throw new BadRequestException('Senha atual incorreta');

    const newHash = await this.authService.hashPassword(dto.senhaNova);
    await this.prisma.user.update({ where: { id: user.sub }, data: { senhaHash: newHash } });
    await this.prisma.refreshToken.deleteMany({ where: { userId: user.sub } });
    await this.createAuditLog('CHANGE_PASSWORD', user.sub);

    return { message: 'Senha alterada com sucesso. Faça login novamente.' };
  }

  @Post('forgot-password')
  @Throttle({ default: { limit: 3, ttl: 900000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Solicitar recuperação de senha' })
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const hash = this.authService.encryptEmail(dto.email).hash;
    const user = await this.prisma.user.findUnique({ where: { emailHash: hash } });

    if (user) {
      const token = this.encryptionService.generateToken(32);
      const tokenHash = this.encryptionService.hash(token);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

      await this.prisma.passwordResetToken.create({
        data: {
          userId: user.id,
          token: tokenHash,
          expiresAt,
        },
      });

      const frontendUrl = this.configService.get<string>('FRONTEND_URL') || 'http://localhost:3001';
      const resetLink = `${frontendUrl}/auth/reset-password?token=${token}&userId=${user.id}`;

      const emailService = new (await import('../notifications/email.service')).EmailService(this.configService);
      await emailService.sendEmail({
        to: dto.email,
        subject: 'Recuperação de Senha — ClinicaFácil',
        html: `
          <h1>Recuperação de Senha</h1>
          <p>Olá, ${user.nomeCompleto}!</p>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetLink}" style="padding:12px 24px;background:#16a34a;color:#fff;border-radius:8px;text-decoration:none;display:inline-block;">Redefinir Senha</a>
          <p>Este link expira em 1 hora.</p>
          <p>Se você não solicitou esta recuperação, ignore este email.</p>
        `,
      });

      this.createAuditLog('FORGOT_PASSWORD_REQUEST', user.id);
    }

    return { message: 'Se o email existir, enviamos um link de recuperação.' };
  }

  @Post('reset-password')
  @Throttle({ default: { limit: 3, ttl: 900000 } })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Redefinir senha com token' })
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const tokenHash = this.encryptionService.hash(dto.token);
    
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { token: tokenHash },
      include: { user: true },
    });

    if (!resetToken || resetToken.usado || new Date() > resetToken.expiresAt) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    const newHash = await this.authService.hashPassword(dto.novaSenha);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { senhaHash: newHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usado: true },
      }),
    ]);

    await this.createAuditLog('RESET_PASSWORD', resetToken.userId);

    return { message: 'Senha redefinida com sucesso. Faça login com a nova senha.' };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Login com Google (redireciona)' })
  async googleLogin() {
    // Guard lida com o redirecionamento
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'Callback do Google OAuth' })
  async googleCallback(@CurrentUser() user: any, @Res() res: Response) {
    if (!user) return res.redirect('/login?error=google_auth_failed');

    const dbUser = await this.prisma.user.findUnique({ where: { id: user.sub } });
    if (!dbUser) return res.redirect('/login?error=user_not_found');

    const tokens = await this.authService.generateTokens({
      id: dbUser.id, tipo: dbUser.tipo, emailHash: dbUser.emailHash,
    });

    await this.prisma.user.update({
      where: { id: dbUser.id }, data: { ultimoAcessoEm: new Date() },
    });

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
    const redirect = `${frontendUrl}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}&tipo=${dbUser.tipo}`;
    return res.redirect(redirect);
  }

  @Get('status')
  @UseGuards(OptionalJwtGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Status da sessão atual' })
  async sessionStatus(@CurrentUser() user: any) {
    return {
      authenticated: !!user,
      tipo: user?.tipo || null,
      userId: user?.sub || null,
    };
  }

  @Get('health')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Health check da API' })
  async health() {
    const redis = this.redisService.getClient();
    let redisOk = false;
    try { redisOk = (await redis.ping()) === 'PONG'; } catch {}

    let dbOk = false;
    try { await this.prisma.$queryRaw`SELECT 1`; dbOk = true; } catch {}

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      redis: redisOk,
      database: dbOk,
      uptime: process.uptime(),
    };
  }
}