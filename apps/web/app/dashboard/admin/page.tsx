'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Stethoscope, UserCheck, CalendarCheck, DollarSign, Shield, Activity } from 'lucide-react';

export default function DashboardAdminPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) { router.push('/login'); return; }

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((user) => {
      if (user.tipo !== 'ADMIN') { router.push('/login'); return; }

      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()).then(setMetrics).catch(() => {}).finally(() => setLoading(false));
    });
  }, [router]);

  const cards = [
    { title: 'Total de usuários', value: metrics?.totalUsuarios || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Profissionais', value: metrics?.totalProfissionais || 0, icon: Stethoscope, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pacientes', value: metrics?.totalPacientes || 0, icon: UserCheck, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Agendamentos', value: metrics?.totalAgendamentos || 0, icon: CalendarCheck, color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Validações pendentes', value: metrics?.validacoesConselhoPendentes || 0, icon: Shield, color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'Receita 30d', value: metrics?.receitaUltimos30Dias ? `R$ ${metrics.receitaUltimos30Dias.plataforma.toLocaleString('pt-BR')}` : 'R$ 0', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  if (loading) {
    return <div className="animate-pulse p-8">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
      <div className="grid grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((i) => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <div className="flex items-center gap-4">
            <Link href="/admin/usuarios" className="text-sm text-muted-foreground hover:text-primary">Usuários</Link>
            <Link href="/admin/financeiro" className="text-sm text-muted-foreground hover:text-primary">Financeiro</Link>
            <Link href="/admin/logs" className="text-sm text-muted-foreground hover:text-primary">Auditoria</Link>
            <button onClick={() => { localStorage.clear(); router.push('/login'); }} className="text-sm text-muted-foreground hover:text-foreground">Sair</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Activity className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </main>
    </div>
  );
}