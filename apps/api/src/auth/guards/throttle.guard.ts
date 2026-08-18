import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class ThrottleGuard implements CanActivate {
  private readonly attempts = new Map<string, { count: number; resetAt: number }>();

  constructor(
    private readonly windowMs: number = 15 * 60 * 1000,
    private readonly maxAttempts: number = 5,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const key = request.ip || 'unknown';

    const now = Date.now();
    const entry = this.attempts.get(key);

    if (!entry || now > entry.resetAt) {
      this.attempts.set(key, { count: 1, resetAt: now + this.windowMs });
      return true;
    }

    if (entry.count >= this.maxAttempts) {
      throw new UnauthorizedException('Muitas tentativas. Aguarde 15 minutos.');
    }

    entry.count++;
    return true;
  }
}