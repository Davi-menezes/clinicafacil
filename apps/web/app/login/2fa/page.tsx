'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Login2FAPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/login/2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, token: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Código inválido');
        return;
      }

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/me`, {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });
      const user = await userRes.json();

      if (user.tipo === 'PROFISSIONAL') router.push('/dashboard');
      else router.push('/dashboard/paciente');
    } catch {
      setError('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <h2 className="mt-6 text-2xl font-bold">Verificação em dois fatores</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Digite o código do seu aplicativo autenticador.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Código de 6 dígitos</label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              maxLength={6}
              minLength={6}
              className="w-full px-3 py-2 border rounded-lg text-sm text-center text-2xl tracking-widest outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="000000"
              autoComplete="one-time-code"
              autoFocus
            />
          </div>

          <button type="submit" disabled={loading || code.length !== 6 || !userId} className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
            {loading ? 'Verificando...' : 'Verificar'}
          </button>

          <Link href="/login" className="block text-center text-sm text-primary hover:underline">
            Voltar para login
          </Link>
        </form>
      </div>
    </div>
  );
}