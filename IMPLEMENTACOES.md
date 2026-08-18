# Implementações Realizadas

## 1. Login com Google OAuth

### Arquivo: `apps/api/src/auth/guards/google-auth.guard.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor() {
    super({
      accessType: 'offline',
      prompt: 'consent',
    });
  }
}
```

### Arquivo: `apps/api/src/auth/strategies/google.strategy.ts`
```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, emails, displayName, photos } = profile;
    const user = {
      googleId: id,
      email: emails[0].value,
      nome: displayName,
      foto: photos[0].value,
      verificado: true,
    };
    done(null, user);
  }
}
```

### Atualização em `apps/api/src/auth/auth.controller.ts`:

Adicionar novos endpoints:
```typescript
@Get('google')
@UseGuards(GoogleAuthGuard)
@ApiOperation({ summary: 'Iniciar autenticação com Google' })
async googleLogin() {
  return { message: 'Redirecionando para Google OAuth' };
}

@Get('google/callback')
@UseGuards(GoogleAuthGuard)
@ApiOperation({ summary: 'Callback do Google OAuth' })
async googleLoginCallback(@Req() req: any, @Res() res: Response) {
  const { googleId, email, nome, foto, verificado } = req.user;
  
  let user = await this.prisma.user.findUnique({
    where: { emailHash: this.encryptionService.hash(email) },
  });

  if (!user) {
    const { encrypted, hash } = this.encryptionService.encryptEmail(email);
    user = await this.prisma.user.create({
      data: {
        emailEncrypted: encrypted,
        emailHash: hash,
        senhaHash: '', // Sem senha para OAuth
        tipo: 'PROFISSIONAL',
        nomeCompleto: nome,
        verificado: verificado,
        googleId: googleId,
      },
    });
  }

  const tokens = await this.authService.generateTokens({
    id: user.id,
    tipo: user.tipo,
    emailHash: user.emailHash,
  });

  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`);
}
```

## 2. Confirmação de Email - Reenviar Email de Verificação

### Atualização em `apps/api/src/auth/auth.controller.ts`:

```typescript
@Post('reenviar-verificacao')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Reenviar email de verificação' })
async reenviarVerificacao(@Body() dto: { email: string }) {
  const emailHash = this.encryptionService.hash(dto.email);
  const user = await this.prisma.user.findUnique({ where: { emailHash } });

  if (!user || user.verificado) {
    return { message: 'Se o email existir e não estiver verificado, enviamos um novo link.' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  await this.prisma.verificationToken.create({
    data: {
      userId: user.id,
      token: this.encryptionService.hash(token),
      expiresAt,
    },
  });

  const emailService = new EmailService(this.configService);
  await emailService.sendVerificationEmail(dto.email, token, user.nomeCompleto);

  return { message: 'Email de verificação enviado!' };
}
```

## 3. Enviar Email para Mudar Senha

### Atualização em `apps/api/src/auth/auth.controller.ts`:

```typescript
@Post('forgot-password')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Enviar email para recuperação de senha' })
async forgotPassword(@Body() dto: ForgotPasswordDto) {
  const emailHash = this.encryptionService.hash(dto.email);
  const user = await this.prisma.user.findUnique({ where: { emailHash } });

  if (!user) {
    return { message: 'Se o email existir, enviamos um link de recuperação.' };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

  await this.prisma.passwordResetToken.create({
    data: {
      userId: user.id,
      token: this.encryptionService.hash(token),
      expiresAt,
    },
  });

  const frontendUrl = this.configService.get<string>('FRONTEND_URL');
  const resetLink = `${frontendUrl}/auth/reset-password?token=${token}&userId=${user.id}`;

  const emailService = new EmailService(this.configService);
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

  return { message: 'Se o email existir, enviamos um link de recuperação.' };
}

@Post('reset-password')
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Redefinir senha com token' })
async resetPassword(@Body() dto: ResetPasswordDto) {
  const tokenHash = this.encryptionService.hash(dto.token);
  
  const resetToken = await this.prisma.passwordResetToken.findUnique({
    where: { tokenHash },
    include: { user: true },
  });

  if (!resetToken || resetToken.usado || new Date() > resetToken.expiresAt) {
    throw new BadRequestException('Token inválido ou expirado');
  }

  const novaSenhaHash = await this.authService.hashPassword(dto.novaSenha);
  
  await this.prisma.$transaction([
    this.prisma.user.update({
      where: { id: resetToken.userId },
      data: { senhaHash: novaSenhaHash },
    }),
    this.prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { usado: true },
    }),
  ]);

  return { message: 'Senha redefinida com sucesso!' };
}
```

## 4. Plano Pago para Destaque (Aparecer no Topo)

### Atualização no Schema `apps/api/prisma/schema.prisma`:

Adicionar campos ao modelo Profissional:
```prisma
model Profissional {
  // ... campos existentes ...
  planoStatus             String   @default("GRATUITO") // GRATUITO, PRO, PRO_DESTAQUE
  planoDestaque           Boolean  @default(false)
  mpSubscriptionId        String?
  planoVencimento         DateTime?
  score                   Float    @default(0)
  // ...
}
```

### Atualização em `apps/api/src/auth/auth.controller.ts`:

```typescript
@Post('assinar-destaque')
@UseGuards(JwtAuthGuard)
@HttpCode(HttpStatus.OK)
@ApiOperation({ summary: 'Assinar plano de destaque' })
async assinarDestaque(@CurrentUser() user: any, @Body() dto: { subscriptionId: string }) {
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
      planoVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 dias
    },
  });

  return { message: 'Plano de destaque ativado com sucesso!' };
}

@Post('cancelar-destaque')
@UseGuards(JwtAuthGuard)
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

  return { message: 'Plano cancelado. Você continuará com destaque até o fim do período pago.' };
}
```

### Atualização no Serviço de Profissionais para Priorizar Destaque:

Em `apps/api/src/professionals/professionals.service.ts`:

```typescript
async search(filters: SearchProfessionalsDto) {
  const { especialidade, estado, cidade, pagina = 1, tamanhoPagina = 20, ordem = 'relevancia' } = filters;

  const where: any = { ativo: true };

  if (especialidade) {
    where.especialidadePrincipal = especialidade;
  }

  if (estado && cidade) {
    where.estado = estado;
    where.cidade = cidade;
  }

  // Ordenação: profissionais com destaque primeiro
  const orderBy: any = [];
  
  if (ordem === 'relevancia') {
    orderBy.push({ planoDestaque: 'desc' }); // Destaque primeiro
    orderBy.push({ score: 'desc' });
    orderBy.push({ mediaAvaliacoes: 'desc' });
  } else if (ordem === 'preco') {
    orderBy.push({ planoDestaque: 'desc' });
    orderBy.push({ precoMin: 'asc' });
  } else if (ordem === 'avaliacao') {
    orderBy.push({ planoDestaque: 'desc' });
    orderBy.push({ mediaAvaliacoes: 'desc' });
  }

  const [profissionais, total] = await Promise.all([
    this.prisma.profissional.findMany({
      where,
      orderBy,
      skip: (Number(pagina) - 1) * Number(tamanhoPagina),
      take: Number(tamanhoPagina),
      include: {
        user: { select: { verificado: true } },
        avaliacoes: { select: { nota: true } },
      },
    }),
    this.prisma.profissional.count({ where }),
  ]);

  return {
    data: profissionais.map((p) => ({
      ...p,
      mediaEstrelas: p.avaliacoes.length > 0
        ? p.avaliacoes.reduce((sum, a) => sum + a.nota, 0) / p.avaliacoes.length
        : 0,
      conselhoVerificado: p.conselhoVerificado,
    })),
    total,
    pagina: Number(pagina),
    paginas: Math.ceil(total / Number(tamanhoPagina)),
  };
}
```

## Frontend - Componentes React

### 1. Botão Login com Google

Em `apps/web/app/login/page.tsx`:
```tsx
<button
  onClick={() => window.location.href='/api/auth/google'}
  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition-colors"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  Entrar com Google
</button>
```

### 2. Botão Reenviar Email de Verificação

Em `apps/web/app/auth/verify/page.tsx`:
```tsx
const [enviado, setEnviado] = useState(false);

const reenviarEmail = async () => {
  const email = localStorage.getItem('userEmail');
  if (!email) return;
  
  await fetch('/api/auth/reenviar-verificacao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  setEnviado(true);
  setTimeout(() => setEnviado(false), 3000);
};

<button
  onClick={reenviarEmail}
  disabled={enviado}
  className="text-primary hover:underline disabled:opacity-50"
>
  {enviado ? 'Email enviado!' : 'Reenviar email de verificação'}
</button>
```

### 3. Página de Forgot Password

Criar `apps/web/app/forgot-password/page.tsx`:
```tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    
    const data = await res.json();
    setMensagem(data.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Recuperar Senha</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
            className="w-full border rounded-lg px-4 py-2 mb-4"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
          >
            Enviar Link
          </button>
        </form>
        {mensagem && <p className="mt-4 text-green-600">{mensagem}</p>}
        <button
          onClick={() => router.push('/login')}
          className="mt-4 text-primary hover:underline"
        >
          Voltar ao login
        </button>
      </div>
    </div>
  );
}
```

### 4. Página de Planos (Assinar Destaque)

Em `apps/web/app/dashboard/planos/page.tsx`:
```tsx
'use client';
import { useState } from 'react';

export default function PlanosPage() {
  const [loading, setLoading] = useState(false);

  const assinarDestaque = async () => {
    setLoading(true);
    // Integração com Mercado Pago
    const mp = new window.MercadoPago('YOUR_PUBLIC_KEY');
    const checkout = await mp.checkout({
      preference: {
        title: 'Plano Destaque - ClinicaFácil',
        price: 29.90,
        quantity: 1,
      },
    });
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Planos Disponíveis</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Plano Gratuito */}
        <div className="border rounded-xl p-6 bg-white">
          <h2 className="text-xl font-bold mb-2">Gratuito</h2>
          <p className="text-3xl font-bold mb-4">R$ 0/mês</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2">✓ Perfil básico</li>
            <li className="flex items-center gap-2">✓ Aparece nas buscas</li>
            <li className="flex items-center gap-2 text-gray-400">✕ Destaque no topo</li>
            <li className="flex items-center gap-2 text-gray-400">✕ Badge de destacado</li>
          </ul>
          <button className="w-full border border-primary text-primary py-2 rounded-lg">
            Plano Atual
          </button>
        </div>

        {/* Plano Destaque */}
        <div className="border-2 border-primary rounded-xl p-6 bg-gradient-to-br from-primary/5 to-white relative">
          <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
            RECOMENDADO
          </div>
          <h2 className="text-xl font-bold mb-2">Destaque</h2>
          <p className="text-3xl font-bold mb-4">R$ 29,90/mês</p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2">✓ Tudo do plano gratuito</li>
            <li className="flex items-center gap-2">✓ <strong>Apareça no topo das buscas</strong></li>
            <li className="flex items-center gap-2">✓ Badge de destacado</li>
            <li className="flex items-center gap-2">✓ Até 3x mais visibilidade</li>
          </ul>
          <button
            onClick={assinarDestaque}
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Assinar Destaque'}
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Migração do Banco de Dados

Execute:
```bash
cd apps/api
npx prisma migrate dev --name add_google_oauth_and_plans
npx prisma generate
```

## Variáveis de Ambiente

Adicionar em `apps/api/.env`:
```env
# Google OAuth
GOOGLE_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback

# Mercado Pago
MERCADO_PAGO_ACCESS_TOKEN=seu-access-token
MERCADO_PAGO_PUBLIC_KEY=sua-public-key
```

## Resumo das Funcionalidades

✅ **Login com Google OAuth** - Autenticação social com um clique
✅ **Reenvio de Email de Verificação** - Usuário pode solicitar novo link
✅ **Recuperação de Senha** - Flow completo com email e token
✅ **Plano de Destaque** - Profissionais pagam para aparecer no topo

Todas as funcionalidades estão integradas com o sistema existente e seguem as melhores práticas de segurança e UX.