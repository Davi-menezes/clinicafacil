'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {} finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <h2 className="mt-6 text-2xl font-bold">Recuperar senha</h2>
          <p className="text-muted-foreground text-sm mt-1">
            Digite seu email para receber o link de recuperação.
          </p>
        </div>

        {sent ? (
          <div className="bg-white rounded-xl border p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <p className="font-medium mb-2">Email enviado!</p>
            <p className="text-sm text-muted-foreground mb-4">
              Verifique sua caixa de entrada. O link expira em 15 minutos.
            </p>
            <Link href="/login" className="text-primary hover:underline text-sm">Voltar ao login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="seu@email.com" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
              {loading ? 'Enviando...' : 'Enviar link'}
            </button>
            <Link href="/login" className="block text-center text-sm text-primary hover:underline">Voltar ao login</Link>
          </form>
        )}
      </div>
    </div>
  );
}