import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termos de Uso | ClinicaFácil',
  description: 'Termos e condições de uso da plataforma ClinicaFácil.',
};

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Termos de Uso</h1>
        <p className="text-sm text-muted-foreground mb-8">Última atualização: julho de 2026</p>

        <div className="prose prose-sm max-w-none space-y-6 bg-white rounded-xl border p-8">
          <section>
            <h2 className="text-lg font-semibold">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">Ao utilizar a ClinicaFácil, você concorda com estes Termos de Uso. Se não concordar, não utilize a plataforma.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Definições</h2>
            <p className="text-muted-foreground"><strong>Plataforma:</strong> marketplace ClinicaFácil. <strong>Profissional:</strong> prestador de serviços de saúde cadastrado. <strong>Paciente:</strong> usuário que busca e agenda consultas. <strong>Consulta:</strong> serviço agendado entre profissional e paciente.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Cadastro</h2>
            <p className="text-muted-foreground">O cadastro exige informações verdadeiras e atualizadas. O profissional deve fornecer número de registro no conselho profissional válido. A ClinicaFácil se reserva o direito de recusar ou remover cadastros que violem estes termos.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Responsabilidades</h2>
            <p className="text-muted-foreground">A ClinicaFácil é uma plataforma de intermediação. Não presta serviços de saúde. O profissional é responsável pela qualidade do atendimento. O paciente é responsável por comparecer no horário agendado.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Cancelamento e Reembolso</h2>
            <p className="text-muted-foreground">Seguimos a política de cancelamento descrita na página Como Funciona. Reembolsos são processados automaticamente via Mercado Pago conforme as regras da plataforma.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Planos de Assinatura</h2>
            <p className="text-muted-foreground">Os planos Pro e Pro + Destaque são cobrados mensalmente via Mercado Pago Assinaturas. O cancelamento pode ser feito a qualquer momento, sem multa, e o acesso ao plano vigente continua até o fim do ciclo de cobrança.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Privacidade</h2>
            <p className="text-muted-foreground">O tratamento de dados segue nossa Política de Privacidade, em conformidade com a LGPD.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. Modificações</h2>
            <p className="text-muted-foreground">Estes termos podem ser atualizados. Alterações significativas serão comunicadas por email com 15 dias de antecedência.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">9. Contato</h2>
            <p className="text-muted-foreground">Dúvidas: contato@clinicafacil.com.br</p>
          </section>
        </div>
      </main>
    </div>
  );
}