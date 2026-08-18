import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'LGPD — Seus Direitos | ClinicaFácil',
  description: 'Saiba como exercer seus direitos de titular de dados conforme a LGPD.',
};

export default function LGPDPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
        </div>
      </div>
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">LGPD — Lei Geral de Proteção de Dados</h1>

        <div className="grid gap-6">
          {[
            { titulo: 'Acesso aos dados', desc: 'Solicite uma cópia completa dos seus dados armazenados na plataforma. Disponível no painel do paciente em "Baixar meus dados".' },
            { titulo: 'Correção de dados', desc: 'Se algum dado estiver incorreto ou desatualizado, você pode corrigi-lo diretamente no seu perfil.' },
            { titulo: 'Exclusão de conta', desc: 'Você pode solicitar a anonimização dos seus dados. Dados financeiros são retidos por 5 anos por obrigação legal.' },
            { titulo: 'Revogação de consentimento', desc: 'Você pode revogar consentimentos a qualquer momento. Isso pode limitar o uso de algumas funcionalidades.' },
            { titulo: 'Portabilidade', desc: 'Solicite a exportação dos seus dados em formato estruturado para transferência a outro serviço.' },
          ].map((item) => (
            <div key={item.titulo} className="bg-white rounded-xl border p-6">
              <h2 className="font-semibold text-lg mb-2">{item.titulo}</h2>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-xl">
          <h3 className="font-semibold mb-2">Para exercer seus direitos:</h3>
          <p className="text-sm text-blue-800">Envie um email para <strong>dpo@clinicafacil.com.br</strong> com o assunto "LGPD - [DIREITO DESEJADO]". Responderemos em até 15 dias.</p>
        </div>
      </main>
    </div>
  );
}