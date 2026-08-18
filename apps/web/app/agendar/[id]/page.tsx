'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function AgendarPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const token = localStorage.getItem('accessToken');
    if (!token) { router.push('/login'); return; }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/agendamentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          profissionalId: id,
          dataHora: new Date().toISOString(),
          tipo: 'PRESENCIAL',
          formaPagamento: 'ONLINE',
        }),
      });
      if (res.ok) {
        const data = await res.json();
        router.push(`/dashboard/paciente?agendado=${data.id}`);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-8">Agendar consulta</h1>

        <div className="flex gap-4 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Selecione a data e horário</h2>
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 10 }, (_, i) => {
                const d = new Date();
                d.setDate(d.getDate() + i + 1);
                return (
                  <button key={i} onClick={() => setStep(2)} className="p-3 border rounded-lg text-center hover:border-primary hover:bg-primary/5 text-sm">
                    <div className="font-medium">{d.toLocaleDateString('pt-BR', { weekday: 'short' })}</div>
                    <div className="text-muted-foreground">{d.getDate()}/{d.getMonth() + 1}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-semibold">Horários disponíveis</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((h) => (
                <button key={h} onClick={() => setStep(3)} className="p-3 border rounded-lg text-center hover:border-primary hover:bg-primary/5">
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                  <span className="font-medium">{h}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Confirmar agendamento</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-muted-foreground" /><span className="font-medium">Data: 08/07/2026</span></div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /><span className="font-medium">Horário: 14:00</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><span>Consulta presencial</span></div>
            </div>
            <button onClick={handleConfirm} disabled={loading} className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50">
              {loading ? 'Processando...' : 'Confirmar e pagar'}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}