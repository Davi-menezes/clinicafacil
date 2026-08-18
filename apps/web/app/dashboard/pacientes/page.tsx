'use client';

import { useEffect, useState } from 'react';
import { Search, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardPacientesPage() {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/agendamentos/profissional`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((data) => {
      const unique = Array.from(new Map(data.map((a: any) => [a.paciente.id, a])).values());
      setPacientes(unique);
    }).catch(() => {});
  }, []);

  const filtrados = pacientes.filter((p: any) =>
    !busca || p.paciente?.user?.nomeCompleto?.toLowerCase().includes(busca.toLowerCase()),
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Pacientes</h1>

      <div className="bg-white rounded-xl border p-6">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-5 h-5 text-muted-foreground" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar paciente..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {filtrados.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum paciente encontrado</p>
        ) : (
          <div className="space-y-3">
            {filtrados.map((ag: any) => (
              <div key={ag.paciente.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-lg font-bold text-gray-500 shrink-0">
                  {ag.paciente?.user?.nomeCompleto?.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{ag.paciente?.user?.nomeCompleto}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    {ag.paciente?.telefone && (
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {ag.paciente.telefone}</span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Última: {format(new Date(ag.dataHora), 'dd/MM/yy', { locale: ptBR })}
                    </span>
                  </div>
                </div>
                <button className="text-sm px-4 py-2 border rounded-lg hover:bg-gray-50 text-primary shrink-0">
                  Ver histórico
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}