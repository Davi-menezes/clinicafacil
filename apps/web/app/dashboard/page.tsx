'use client';

import { useEffect, useState } from 'react';
import { Calendar, DollarSign, Users, Star, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) return;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/profissionais/dashboard/metrics`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        if (res.ok) {
          const data = await res.json();
          setMetrics(data);
        }
      } catch {
        // Auth redirect handled by middleware
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 bg-gray-200 rounded" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Agendamentos (30d)',
      value: metrics?.agendamentos
        ? Object.values(metrics.agendamentos).reduce((a: number, b: any) => a + (typeof b === 'number' ? b : 0), 0)
        : 0,
      icon: Calendar,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Faturamento (30d)',
      value: metrics?.faturamento
        ? `R$ ${metrics.faturamento.liquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
        : 'R$ 0,00',
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Taxa de ocupação',
      value: metrics?.ocupacao ? `${metrics.ocupacao}%` : '0%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Avaliações recentes',
      value: metrics?.avaliacoesRecentes?.length || 0,
      icon: Star,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Visão geral</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.title} className="bg-white rounded-xl border p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{card.title}</span>
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </div>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {metrics?.avaliacoesRecentes?.length > 0 && (
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-lg mb-4">Avaliações recentes</h2>
          <div className="space-y-4">
            {metrics.avaliacoesRecentes.map((av: any) => (
              <div key={av.id} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{av.paciente?.user?.nomeCompleto}</span>
                  <div className="flex items-center gap-0.5 ml-auto">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        className={`w-3 h-3 ${n <= av.notaGeral ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{av.comentario}</p>
                {!av.resposta && (
                  <button className="text-xs text-primary mt-2 hover:underline">
                    Responder
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}