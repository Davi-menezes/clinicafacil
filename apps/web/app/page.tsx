import { Suspense } from 'react';
import Link from 'next/link';
import { Search, Shield, Calendar, CreditCard, Star, MapPin } from 'lucide-react';

const ESPECIALIDADES = [
  { nome: 'Psicologia', slug: 'psicologia', cor: 'bg-purple-100 text-purple-800' },
  { nome: 'Nutrição', slug: 'nutricao', cor: 'bg-green-100 text-green-800' },
  { nome: 'Fisioterapia', slug: 'fisioterapia', cor: 'bg-blue-100 text-blue-800' },
  { nome: 'Psiquiatria', slug: 'psiquiatria', cor: 'bg-indigo-100 text-indigo-800' },
  { nome: 'Fonoaudiologia', slug: 'fonoaudiologia', cor: 'bg-pink-100 text-pink-800' },
  { nome: 'Terapia Ocupacional', slug: 'terapia-ocupacional', cor: 'bg-orange-100 text-orange-800' },
  { nome: 'Educ. Física', slug: 'educacao-fisica', cor: 'bg-red-100 text-red-800' },
  { nome: 'Enfermagem', slug: 'enfermagem', cor: 'bg-teal-100 text-teal-800' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ClinicaFácil
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/busca" className="text-sm font-medium hover:text-primary">
              Buscar profissionais
            </Link>
            <Link href="/profissionais/psicologia" className="text-sm font-medium hover:text-primary">
              Psicologia
            </Link>
            <Link href="/profissionais/nutricao" className="text-sm font-medium hover:text-primary">
              Nutrição
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary/5 via-white to-primary/10 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Cuide da sua saúde com os<br />
            <span className="text-primary">melhores profissionais</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Agende consultas com psicólogos, nutricionistas, fisioterapeutas e muito mais.
            Profissionais verificados, avaliações reais e pagamento seguro.
          </p>

          <form action="/busca" method="GET" className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-xl shadow-lg border">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                <input
                  name="q"
                  placeholder="Nome, especialidade ou cidade..."
                  className="flex-1 py-3 outline-none text-sm bg-transparent"
                />
              </div>
              <select
                name="estado"
                className="px-4 py-3 border-l bg-transparent text-sm outline-none text-muted-foreground"
              >
                <option value="">Estado</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="PR">Paraná</option>
                <option value="BA">Bahia</option>
                <option value="DF">Distrito Federal</option>
                <option value="SC">Santa Catarina</option>
                <option value="GO">Goiás</option>
                <option value="PE">Pernambuco</option>
              </select>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center">Especialidades disponíveis</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ESPECIALIDADES.map((esp) => (
            <Link
              key={esp.slug}
              href={`/profissionais/${esp.slug}`}
              className={`p-4 rounded-xl text-center font-medium transition-transform hover:scale-105 ${esp.cor}`}
            >
              {esp.nome}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">Por que escolher a ClinicaFácil?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Profissionais verificados</h3>
              <p className="text-muted-foreground text-sm">
                Todos os profissionais têm seu registro no conselho profissional validado automaticamente.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Agenda online 24h</h3>
              <p className="text-muted-foreground text-sm">
                Marque consultas a qualquer momento. Receba lembretes por email e SMS.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Pagamento seguro</h3>
              <p className="text-muted-foreground text-sm">
                Pague com cartão, PIX ou boleto. Seu dinheiro só é repassado após a consulta.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-xl font-bold mb-4">ClinicaFácil</div>
              <p className="text-gray-400 text-sm">
                Marketplace de saúde que conecta pacientes a profissionais independentes.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-4">Para pacientes</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/busca" className="hover:text-white">Buscar profissionais</Link></li>
                <li><Link href="/como-funciona" className="hover:text-white">Como funciona</Link></li>
                <li><Link href="/faq" className="hover:text-white">Dúvidas frequentes</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Para profissionais</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/cadastro/profissional" className="hover:text-white">Criar perfil</Link></li>
                <li><Link href="/planos" className="hover:text-white">Planos e preços</Link></li>
                <li><Link href="/blog/profissionais" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-4">Legal</div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacidade" className="hover:text-white">Política de privacidade</Link></li>
                <li><Link href="/termos" className="hover:text-white">Termos de uso</Link></li>
                <li><Link href="/lgpd" className="hover:text-white">LGPD</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ClinicaFácil. Todos os direitos reservados. CNPJ 00.000.000/0001-00
          </div>
        </div>
      </footer>
    </div>
  );
}