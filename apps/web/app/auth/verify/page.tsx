'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    }).then((res) => {
      setStatus(res.ok ? 'success' : 'error');
    }).catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white rounded-xl border p-8 max-w-md w-full text-center">
        <Link href="/" className="text-2xl font-bold text-primary mb-6 block">ClinicaFácil</Link>

        {status === 'loading' && (
          <>
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="font-medium">Verificando seu email...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Email verificado!</h2>
            <p className="text-muted-foreground text-sm mb-6">Sua conta foi ativada. Faça login para começar.</p>
            <Link href="/login" className="inline-block px-8 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90">
              Fazer login
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Link inválido ou expirado</h2>
            <p className="text-muted-foreground text-sm mb-6">O link de verificação expirou. Solicite um novo.</p>
            <Link href="/login" className="text-primary hover:underline text-sm">Voltar ao login</Link>
          </>
        )}
      </div>
    </div>
  );
}