import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'ClinicaFácil — Agende Consultas com Profissionais de Saúde',
  description:
    'Encontre psicólogos, nutricionistas, fisioterapeutas e outros profissionais verificados na sua cidade. Agende online, pague com segurança.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://clinicafacil.com.br',
    siteName: 'ClinicaFácil',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}