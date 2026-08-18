import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidade | ClinicaFácil',
  description: 'Como a ClinicaFácil coleta, usa e protege seus dados pessoais.',
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Política de Privacidade</h1>
        <p className="text-sm text-muted-foreground mb-8">Em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)</p>

        <div className="prose prose-sm max-w-none space-y-6 bg-white rounded-xl border p-8">
          <section>
            <h2 className="text-lg font-semibold">1. Dados coletados</h2>
            <p className="text-muted-foreground">Coletamos: nome completo, email, CPF (opcional), telefone, data de nascimento, endereço, registro profissional, foto de perfil e dados de navegação. Dados sensíveis (email, CPF) são criptografados com AES-256-GCM.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">2. Finalidade</h2>
            <p className="text-muted-foreground">Os dados são usados para: criar e gerenciar sua conta, intermediar agendamentos, processar pagamentos, enviar comunicações essenciais, melhorar a plataforma e cumprir obrigações legais.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">3. Compartilhamento</h2>
            <p className="text-muted-foreground">Compartilhamos dados apenas com: Mercado Pago (processamento de pagamentos), Twilio/Zenvia (envio de SMS), serviços de email, e quando exigido por lei.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">4. Segurança</h2>
            <p className="text-muted-foreground">Utilizamos: TLS 1.3 em trânsito, AES-256-GCM em repouso, bcrypt para senhas, JWT com tokens de curta duração, firewall, rate limiting e monitoramento de acessos.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">5. Seus direitos (LGPD)</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              <li>Acessar seus dados (download via painel)</li>
              <li>Corrigir dados incompletos ou desatualizados</li>
              <li>Anonimizar dados (deleção de conta)</li>
              <li>Revogar consentimento</li>
              <li>Solicitar portabilidade dos dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold">6. Retenção</h2>
            <p className="text-muted-foreground">Dados financeiros são retidos por 5 anos (obrigação legal). Demais dados podem ser anonimizados mediante solicitação.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">7. Cookies</h2>
            <p className="text-muted-foreground">Utilizamos cookies essenciais para funcionamento da plataforma e cookies de análise (anônimos) para melhorar a experiência.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">8. Contato do DPO</h2>
            <p className="text-muted-foreground">Encarregado de Proteção de Dados: dpo@clinicafacil.com.br</p>
          </section>
        </div>
      </main>
    </div>
  );
}