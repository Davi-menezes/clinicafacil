'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock, Wifi, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardPacientePage() {
  const router = useRouter();
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) { router.push('/login'); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/agendamentos/paciente`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then(setAgendamentos).catch(() => {}).finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="animate-pulse space-y-4 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <button onClick={() => { localStorage.removeItem('accessToken'); localStorage.removeItem('refreshToken'); router.push('/login'); }} className="text-sm text-muted-foreground hover:text-foreground">
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Minhas consultas</h1>

        {agendamentos.length === 0 ? (
          <div className="bg-white rounded-xl border p-12 text-center">
            <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-lg font-semibold mb-2">Nenhuma consulta agendada</h2>
            <p className="text-muted-foreground text-sm mb-6">Encontre um profissional e agende sua primeira consulta.</p>
            <Link href="/busca" className="inline-block px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90">
              Buscar profissionais
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {agendamentos.map((ag) => (
              <div key={ag.id} className="bg-white rounded-xl border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                      {ag.profissional?.fotoPerfil ? (
                        <img src={ag.profissional.fotoPerfil} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-gray-400">
                          {ag.profissional?.user?.nomeCompleto?.charAt(0) || 'P'}
                        </div>
                      )}
                    </div>
                    <div>
                      <Link href={`/profissionais/${ag.profissional?.slug}`} className="font-semibold hover:text-primary">
                        {ag.profissional?.user?.nomeCompleto}
                      </Link>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {format(new Date(ag.dataHora), "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                        <span className="flex items-center gap-1">
                          {ag.tipo === 'ONLINE' ? <Wifi className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          {ag.tipo === 'ONLINE' ? 'Online' : 'Presencial'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      ag.status === 'CONFIRMADO' ? 'bg-green-100 text-green-700' :
                      ag.status === 'CONCLUIDO' ? 'bg-blue-100 text-blue-700' :
                      ag.status === 'CANCELADO' ? 'bg-red-100 text-red-700' :
                      ag.status === 'NO_SHOW' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {ag.status === 'CONFIRMADO' && 'Confirmado'}
                      {ag.status === 'CONCLUIDO' && 'Concluído'}
                      {ag.status === 'CANCELADO' && 'Cancelado'}
                      {ag.status === 'NO_SHOW' && 'Não compareceu'}
                      {ag.status === 'PENDENTE_PAGAMENTO' && 'Aguardando pagamento'}
                    </span>
                    <p className="text-sm font-medium mt-2">R$ {Number(ag.valorTotal).toFixed(2)}</p>
                  </div>
                </div>

                {ag.status === 'CONFIRMADO' && (
                  <div className="flex gap-3 mt-4 pt-4 border-t">
                    <button className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 text-red-600">
                      Cancelar
                    </button>
                    <button className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-50">
                      Reagendar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}