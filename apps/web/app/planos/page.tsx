import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Star, Zap, Check, ArrowRight, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Planos e Preços para Profissionais | ClinicaFácil',
  description: 'Conheça os planos Gratuito, Pro e Destaque. Compare recursos e escolha o melhor para sua prática.',
};

const PLANOS = [
  {
    nome: 'Gratuito',
    preco: 'R$ 0',
    cor: 'border-gray-200',
    badge: '',
    descricao: 'Perfil básico no marketplace',
    recursos: [
      'Perfil profissional no marketplace',
      'Até 10 agendamentos por mês',
      'Aparece nas buscas',
      'Badge de conselho verificado',
    ],
    naoInclui: [
      'Sem lembretes SMS',
      'Sem dashboard avançado',
      'Sem relatórios',
      'Sem link público personalizado',
    ],
  },
  {
    nome: 'Pro',
    preco: 'R$ 79/mês',
    cor: 'border-primary',
    badge: 'Recomendado',
    descricao: 'Para profissionais estabelecidos',
    recursos: [
      'Agendamentos ilimitados',
      'Lembretes SMS automáticos',
      'Dashboard completo com métricas',
      'Badge "Pro" no perfil',
      'Link público personalizado',
      'Exportação de relatórios',
      'Histórico completo de pacientes',
      'Estatísticas de perfil',
    ],
    naoInclui: ['Destaque nas primeiras posições'],
  },
  {
    nome: 'Pro + Destaque',
    preco: 'R$ 118/mês',
    cor: 'border-destaque',
    badge: 'Popular',
    descricao: 'Máxima visibilidade',
    recursos: [
      'Tudo do Plano Pro',
      'Aparece nas primeiras posições da busca',
      'Badge dourado "Destaque"',
      '+35 pontos no score de relevância',
      'Rotação entre destaques da categoria',
      'Relatório de posição nas buscas',
    ],
    naoInclui: [],
  },
];

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <nav className="flex items-center gap-4">
            <Link href="/cadastro/profissional" className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">Criar perfil</Link>
            <Link href="/login" className="text-sm font-medium hover:text-primary">Entrar</Link>
          </nav>
        </div>
      </header>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Planos para profissionais</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o plano ideal para sua prática. Cancele a qualquer momento, sem multa.
          </p>
        </div>
      </section>

      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {PLANOS.map((plano) => (
            <div key={plano.nome} className={`bg-white rounded-xl border-2 ${plano.cor} p-8 flex flex-col`}>
              {plano.badge && (
                <span className="self-start text-xs px-3 py-1 bg-primary text-white rounded-full font-semibold mb-4">
                  {plano.badge}
                </span>
              )}
              <h2 className="text-xl font-bold mb-1">{plano.nome}</h2>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plano.preco}</span>
                <span className="text-muted-foreground text-sm ml-1">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">{plano.descricao}</p>

              <div className="flex-1">
                <ul className="space-y-3 mb-6">
                  {plano.recursos.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/cadastro/profissional"
                className={`block w-full py-3 text-center font-semibold rounded-lg transition-colors ${
                  plano.nome === 'Gratuito'
                    ? 'border-2 border-primary text-primary hover:bg-primary/5'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                {plano.nome === 'Gratuito' ? 'Começar grátis' : 'Assinar agora'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Precisa de ajuda para escolher?</h2>
          <p className="text-muted-foreground mb-6">
            Fale com nossa equipe sobre qual plano atende melhor às suas necessidades.
          </p>
          <a href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'contato@clinicafacil.com.br'}`} className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90">
            <Mail className="w-4 h-4" /> Falar com consultor
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} ClinicaFácil
        </div>
      </footer>
    </div>
  );
}