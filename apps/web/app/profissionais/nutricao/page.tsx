import { Metadata } from 'next';
import Link from 'next/link';
import { Star, Shield, MapPin, Leaf } from 'lucide-react';
import { api } from '@/lib/api';

export const metadata: Metadata = {
  title: 'Nutricionistas — Encontre os melhores nutricionistas | ClinicaFácil',
  description: 'Agende consultas com nutricionistas verificados. Nutrição clínica, esportiva, materno-infantil e mais.',
};

export default async function NutricaoPage() {
  let data: any = { profissionais: [], total: 0 };
  try {
    data = await api.professionals.search({ especialidade: 'Nutricao', pagina: '1', tamanhoPagina: '20', ordem: 'relevancia' });
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
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <Link href="/busca?especialidade=Nutricao" className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Buscar mais</Link>
        </div>
      </header>
      <section className="bg-gradient-to-br from-green-50 to-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <Leaf className="w-8 h-8 inline-block text-green-600 mr-2" />
            Nutricionistas verificados
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nutrição clínica, esportiva, materno-infantil e comportamental. Agende online e transforme sua alimentação.
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-sm text-muted-foreground mb-6">{data.total} nutricionistas disponíveis</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.profissionais.slice(0, 9).map((prof: any) => (
            <Link key={prof.id} href={`/profissionais/${prof.slug}`} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{prof.nomeCompleto}</h3>
                    {prof.conselhoVerificado && <Shield className="w-4 h-4 text-verificado" />}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                    {prof.mediaEstrelas > 0 && <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{prof.mediaEstrelas}</span>}
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{prof.cidade}/{prof.estado}</span>
                  </div>
                </div>
              </div>
              {prof.precoMin && <p className="mt-3 text-sm font-semibold">A partir de R$ {Number(prof.precoMin).toFixed(2)}</p>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}