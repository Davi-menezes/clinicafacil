'use client';

import { useEffect, useState } from 'react';
import { format, addDays, startOfWeek, getDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
const DIA_NOMES_COMPLETOS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

const HORARIOS = [
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
  '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
];

export default function DashboardAgendaPage() {
  const [semana, setSemana] = useState(startOfWeek(new Date(), { weekStartsOn: 0 }));
  const [disponibilidade, setDisponibilidade] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const dias = Array.from({ length: 7 }, (_, i) => addDays(semana, i));

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    const mes = format(semana, 'yyyy-MM');
    const userRes = fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json());

    userRes.then((user) => {
      if (user.profissional) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/profissionais/${user.profissional.id}/disponibilidade?mes=${mes}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((r) => r.json()).then((d) => setDisponibilidade(d)).finally(() => setLoading(false));
      }
    });
  }, [semana]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Agenda</h1>

      <div className="bg-white rounded-xl border p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setSemana(addDays(semana, -7))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">
            {format(dias[0], "d 'de' MMM", { locale: ptBR })} — {format(dias[6], "d 'de' MMM yyyy", { locale: ptBR })}
          </span>
          <button onClick={() => setSemana(addDays(semana, 7))} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-8 gap-1">
          <div className="text-xs font-medium text-muted-foreground p-2 text-center">Horário</div>
          {dias.map((dia, i) => (
            <div key={i} className="text-xs font-medium p-2 text-center border-b">
              {DIAS_SEMANA[i]}
              <div className="text-muted-foreground">{format(dia, 'd')}</div>
            </div>
          ))}

          {HORARIOS.map((hora) => (
            <div key={hora} className="contents">
              <div className="text-xs text-muted-foreground p-2 text-right border-r pr-3">{hora}</div>
              {dias.map((dia, di) => {
                const key = format(dia, 'yyyy-MM-dd');
                const slots = disponibilidade[key];
                const disponivel = slots && slots.includes(hora);
                return (
                  <div
                    key={di}
                    className={`p-1 border text-center text-xs ${
                      disponivel ? 'bg-green-50 cursor-pointer hover:bg-green-100' : 'bg-gray-50'
                    }`}
                  >
                    {disponivel && <span className="text-green-700 font-medium">Livre</span>}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6">
        <h2 className="font-semibold mb-4">Configurar grade semanal</h2>
        {DIA_NOMES_COMPLETOS.map((dia, i) => (
          <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
            <div className="w-24 font-medium text-sm">{dia}</div>
            <div className="flex items-center gap-2 flex-1">
              <select className="border rounded px-2 py-1.5 text-sm" defaultValue="">
                <option value="">--</option>
                {HORARIOS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              <span className="text-muted-foreground">até</span>
              <select className="border rounded px-2 py-1.5 text-sm" defaultValue="">
                <option value="">--</option>
                {HORARIOS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
          </div>
        ))}
        <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
          Salvar grade
        </button>
      </div>
    </div>
  );
}