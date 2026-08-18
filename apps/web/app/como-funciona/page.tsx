import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Como funciona | ClinicaFácil',
  description: 'Entenda como agendar consultas, encontrar profissionais e usar a plataforma.',
};

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Como funciona</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-3">Para pacientes</h2>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">1.</span>
                <div><strong>Crie sua conta gratuita</strong> — em menos de 2 minutos, com email e senha.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">2.</span>
                <div><strong>Busque o profissional ideal</strong> — filtre por especialidade, cidade, plano de saúde, preço e avaliações.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">3.</span>
                <div><strong>Escolha data e horário</strong> — veja a agenda disponível e selecione o melhor momento.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">4.</span>
                <div><strong>Pague com segurança</strong> — cartão, PIX ou débito via Mercado Pago.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">5.</span>
                <div><strong>Receba lembretes</strong> — email e SMS 24h e 2h antes da consulta.</div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Para profissionais</h2>
            <ol className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">1.</span>
                <div><strong>Crie seu perfil profissional</strong> — com registro do conselho validado.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">2.</span>
                <div><strong>Configure sua agenda</strong> — dias, horários e preço da consulta.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">3.</span>
                <div><strong>Receba agendamentos</strong> — pacientes agendam diretamente pelo seu perfil.</div>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-primary text-lg">4.</span>
                <div><strong>Acompanhe pelo dashboard</strong> — métricas, faturamento, avaliações.</div>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Cancelamento e reembolso</h2>
            <ul className="space-y-2 text-muted-foreground list-disc pl-5">
              <li>Cancelamento com +24h de antecedência: reembolso de 100%</li>
              <li>Cancelamento entre 2h e 24h de antecedência: reembolso de 50%</li>
              <li>Cancelamento com menos de 2h: sem reembolso</li>
              <li>Cancelamento pelo profissional: reembolso de 100%</li>
              <li>Reagendamento gratuito com até 24h de antecedência (máximo 2 por consulta)</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}