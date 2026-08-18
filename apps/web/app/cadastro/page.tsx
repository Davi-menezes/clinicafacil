'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function CadastroPacientePage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data: any = {
      nomeCompleto: formData.get('nomeCompleto'),
      email: formData.get('email'),
      senha: formData.get('senha'),
      telefone: formData.get('telefone') || undefined,
      dataNascimento: formData.get('dataNascimento') || undefined,
      estado: formData.get('estado') || undefined,
      cidade: formData.get('cidade') || undefined,
      lgpdConsent: true,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/registro-paciente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || 'Erro ao cadastrar');
        return;
      }

      router.push(`/auth/verify?userId=${result.userId}&email=${data.email}`);
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-white">
          <h1 className="text-4xl font-bold mb-4">Encontre o profissional ideal</h1>
          <p className="text-primary-foreground/80 text-lg">
            Cadastre-se gratuitamente e agende consultas com profissionais de saúde verificados perto de você.
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
            <h2 className="mt-6 text-2xl font-bold">Criar conta de paciente</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Já tem conta?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">Entrar</Link>
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nomeCompleto" className="block text-sm font-medium mb-1">Nome completo</label>
              <input id="nomeCompleto" name="nomeCompleto" required minLength={3} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Seu nome completo" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="seu@email.com" />
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium mb-1">Senha</label>
              <div className="relative">
                <input id="senha" name="senha" type={showPassword ? 'text' : 'password'} required minLength={8} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 pr-10" placeholder="Mínimo 8 caracteres" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Telefone (opcional)</label>
                <input name="telefone" type="tel" className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="(11) 99999-9999" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Data de nascimento</label>
                <input name="dataNascimento" type="date" className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <input name="estado" maxLength={2} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="SP" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cidade</label>
                <input name="cidade" className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="São Paulo" />
              </div>
            </div>

            <label className="flex items-start gap-3">
              <input type="checkbox" name="lgpd" required className="mt-0.5 rounded text-primary focus:ring-primary" />
              <span className="text-sm text-muted-foreground">
                Concordo com a <Link href="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link> e autorizo o tratamento dos meus dados conforme a LGPD.
              </span>
            </label>

            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}