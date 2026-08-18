'use client';

import { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardAvaliacoesPage() {
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [respondendo, setRespondendo] = useState<string | null>(null);
  const [resposta, setResposta] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/profissionais/dashboard/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((d) => {
      if (d.avaliacoesRecentes) setAvaliacoes(d.avaliacoesRecentes);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  async function handleResponder(avaliacaoId: string) {
    const token = localStorage.getItem('accessToken');
    if (!token || !resposta) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/avaliacoes/${avaliacaoId}/resposta`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ resposta }),
    });

    setAvaliacoes((prev) =>
      prev.map((a) => a.id === avaliacaoId ? { ...a, resposta } : a),
    );
    setRespondendo(null);
    setResposta('');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Avaliações</h1>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2].map((i) => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}
        </div>
      ) : avaliacoes.length === 0 ? (
        <div className="bg-white rounded-xl border p-12 text-center">
          <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg font-semibold mb-2">Nenhuma avaliação ainda</p>
          <p className="text-sm text-muted-foreground">Suas avaliações aparecerão aqui.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {avaliacoes.map((av) => (
            <div key={av.id} className="bg-white rounded-xl border p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold">{av.paciente?.user?.nomeCompleto}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className={`w-4 h-4 ${n <= av.notaGeral ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(av.criadoEm), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{av.comentario}</p>

                  {av.resposta ? (
                    <div className="mt-3 pl-4 border-l-2 border-primary/30">
                      <p className="text-xs font-medium text-primary mb-1">Sua resposta:</p>
                      <p className="text-sm text-muted-foreground">{av.resposta}</p>
                    </div>
                  ) : respondendo === av.id ? (
                    <div className="mt-3">
                      <textarea
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/20 mb-2"
                        placeholder="Responder ao paciente..."
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleResponder(av.id)} className="text-xs px-4 py-1.5 bg-primary text-white rounded-lg">Enviar</button>
                        <button onClick={() => { setRespondendo(null); setResposta(''); }} className="text-xs px-4 py-1.5 border rounded-lg">Cancelar</button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => setRespondendo(av.id)} className="text-xs text-primary mt-2 hover:underline">
                      Responder
                    </button>
                  )}
                </div>

                {av.notas?.length > 0 && (
                  <div className="text-xs text-muted-foreground space-y-1 min-w-[120px] text-right">
                    {av.notas.map((n: any) => (
                      <div key={n.categoria} className="flex items-center justify-end gap-1">
                        <span>{n.categoria}:</span>
                        <Star className={`w-3 h-3 ${n.nota >= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                        <span>{n.nota}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}