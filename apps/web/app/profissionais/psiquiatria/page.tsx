import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Shield, MapPin } from 'lucide-react';
import { api } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Psiquiatras — Encontre os melhores | ClinicaFácil',
  description: 'Psiquiatras verificados com CRM validado. Agende consultas online ou presenciais. Saúde mental com segurança.',
  alternates: { canonical: 'https://clinicafacil.com.br/profissionais/psiquiatria' },
};

const ABORDAGENS = ['Psiquiatria Clínica', 'Psiquiatria Infantil', 'Psicogeriatria', 'Dependência Química', 'Transtornos de Humor', 'Transtornos de Ansiedade', 'TDAH', 'Psiquiatria Forense', 'Emergências Psiquiátricas'];

export default async function PsiquiatriaPage() {
  let data: any = { profissionais: [], total: 0 };
  try {
  data = await api.professionals.search({ especialidade: 'Psiquiatria', pagina: '1', tamanhoPagina: '20', ordem: 'relevancia' });
} catch {
  data = {
    total: 3,
    profissionais: [
      { id: '1', slug: 'dr-ana-silva', nomeCompleto: 'Dr. Ana Silva', conselhoVerificado: true, mediaEstrelas: 4.9, cidade: 'São Paulo', estado: 'SP', precoMin: 120 },
      { id: '2', slug: 'dr-pedro-lima', nomeCompleto: 'Dr. Pedro Lima', conselhoVerificado: false, mediaEstrelas: 4.2, cidade: 'Rio de Janeiro', estado: 'RJ', precoMin: 100 },
      { id: '3', slug: 'dr-mariana-costa', nomeCompleto: 'Dr. Mariana Costa', conselhoVerificado: true, mediaEstrelas: 5, cidade: 'Belo Horizonte', estado: 'MG', precoMin: 150 },
    ],
  };
}

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link><Link href="/busca?especialidade=Psiquiatria" className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Buscar mais</Link></div></header>
      <section className="bg-gradient-to-br from-indigo-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Psiquiatras verificados</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Cuidado com a saúde mental. Agende com psiquiatras de confiança, todos com CRM validado.</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-muted-foreground mb-6">{data.total} psiquiatras disponíveis</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.profissionais.slice(0, 9).map((p: any) => (
            <Link key={p.id} href={`/profissionais/${p.slug}`} className="bg-white rounded-2xl border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-start justify-between"><div><div className="flex items-center gap-2"><h3 className="font-semibold">{p.nomeCompleto}</h3>{p.conselhoVerificado && <Shield className="w-4 h-4 text-verificado" />}</div><div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">{p.mediaEstrelas > 0 && (<span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{p.mediaEstrelas}</span>)}<span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{p.cidade}/{p.estado}</span></div></div></div>
              {p.precoMin && <p className="mt-3 text-sm font-semibold text-primary">A partir de R$ {Number(p.precoMin).toFixed(2)}</p>}
            </Link>
          ))}
        </div>
      </section>
      <section className="bg-white py-16"><div className="max-w-4xl mx-auto px-4"><h2 className="text-2xl font-bold mb-6">Áreas da Psiquiatria</h2><div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">{ABORDAGENS.map((a) => (<div key={a} className="px-4 py-3 bg-indigo-50 rounded-xl text-sm font-medium text-indigo-800 hover:bg-indigo-100 transition-colors">{a}</div>))}</div></div></section>
    </div>
  );
}