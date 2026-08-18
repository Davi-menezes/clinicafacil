'use client';

import { useEffect, useState } from 'react';
import { DollarSign, ArrowDown, ArrowUp, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function DashboardFaturasPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/profissionais/dashboard/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((d) => setMetrics(d)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Faturas e pagamentos</h1>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => <div key={i} className="h-24 bg-gray-200 rounded-xl" />)}
        </div>
      ) : (
        <>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <DollarSign className="w-4 h-4" />
                Faturamento bruto (30d)
              </div>
              <p className="text-2xl font-bold">
                R$ {(metrics?.faturamento?.bruto || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <ArrowDown className="w-4 h-4 text-green-600" />
                Faturamento líquido (30d)
              </div>
              <p className="text-2xl font-bold text-green-600">
                R$ {(metrics?.faturamento?.liquido || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
            <div className="bg-white rounded-xl border p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <ArrowUp className="w-4 h-4 text-red-600" />
                Taxa da plataforma (5%)
              </div>
              <p className="text-2xl font-bold text-red-600">
                R$ {((metrics?.faturamento?.bruto || 0) * 0.05).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4">Histórico de repasses</h2>
            <div className="text-center py-8">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-sm">
                Os repasses são processados automaticamente via Mercado Pago (D+2 para cartão, D+1 para PIX).
              </p>
              <button className="mt-4 px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
                Exportar relatório (CSV)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}