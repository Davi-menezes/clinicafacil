import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dúvidas Frequentes | ClinicaFácil',
  description: 'Perguntas e respostas sobre agendamento, pagamento, planos e cadastro.',
};

const FAQS = [
  {
    q: 'Como criar meu perfil de profissional?',
    a: 'Clique em "Cadastrar" e selecione "Sou profissional de saúde". Preencha seus dados, número do conselho profissional, especialidade e cidade de atendimento. Seu registro será validado automaticamente.',
  },
  {
    q: 'Quanto custa para ser paciente?',
    a: 'Nada! O paciente usa a ClinicaFácil gratuitamente. Paga apenas o valor da consulta diretamente ao profissional.',
  },
  {
    q: 'Como funcionam os planos para profissionais?',
    a: 'Temos 3 níveis: Gratuito (até 10 agendamentos/mês), Pro (R$79/mês, ilimitado) e Pro + Destaque (R$118/mês, aparece nas primeiras posições). Veja em /planos.',
  },
  {
    q: 'Posso cancelar uma consulta?',
    a: 'Sim. Com mais de 24h de antecedência: reembolso de 100%. Entre 2h e 24h: 50%. Menos de 2h: sem reembolso.',
  },
  {
    q: 'Como recebo o pagamento das consultas?',
    a: 'O Mercado Pago processa automaticamente e repassa ao profissional: D+2 para cartão, D+1 para PIX. A taxa da plataforma é de 5%.',
  },
  {
    q: 'Meus dados estão seguros?',
    a: 'Sim. Emails e dados sensíveis são criptografados com AES-256-GCM. Senhas usam bcrypt. Conexão TLS 1.3. Seguimos a LGPD.',
  },
  {
    q: 'Como funciona a busca de profissionais?',
    a: 'Busque por especialidade, cidade, estado ou nome. Filtre por plano de saúde, preço, nota e atendimento online. Os resultados são ordenados por relevância.',
  },
  {
    q: 'Preciso ter CNPJ para me cadastrar como profissional?',
    a: 'Não. Você pode se cadastrar como Pessoa Física, usando seu número de registro no conselho profissional.',
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Dúvidas frequentes</h1>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="bg-white rounded-xl border group">
              <summary className="p-6 cursor-pointer font-semibold list-none flex items-center justify-between">
                {faq.q}
                <span className="text-muted-foreground group-open:rotate-180 transition-transform text-lg">▼</span>
              </summary>
              <div className="px-6 pb-6 text-muted-foreground text-sm">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </main>
    </div>
  );
}