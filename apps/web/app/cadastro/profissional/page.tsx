'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Shield, User, ArrowRight } from 'lucide-react';

const ESPECIALIDADES = [
  'Psicologia', 'Psiquiatria', 'Nutrição', 'Fisioterapia',
  'Fonoaudiologia', 'Terapia Ocupacional', 'Educação Física',
  'Enfermagem', 'Odontologia', 'Dermatologia', 'Ginecologia',
  'Cardiologia', 'Ortopedia', 'Neurologia', 'Endocrinologia',
  'Pediatria', 'Clínica Geral', 'Acupuntura', 'Osteopatia',
  'Homeopatia', 'Outros',
];

const CONSELHOS = [
  { sigla: 'CRM', nome: 'Medicina' },
  { sigla: 'CRP', nome: 'Psicologia' },
  { sigla: 'CRN', nome: 'Nutrição' },
  { sigla: 'CREFITO', nome: 'Fisioterapia' },
  { sigla: 'CRFa', nome: 'Fonoaudiologia' },
  { sigla: 'COREN', nome: 'Enfermagem' },
  { sigla: 'CRO', nome: 'Odontologia' },
];

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
];

export default function CadastroProfissionalPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data: any = {
      nomeCompleto: formData.get('nomeCompleto'),
      email: formData.get('email'),
      senha: formData.get('senha'),
      tipoPessoa: 'FISICA',
      especialidadePrincipal: formData.get('especialidade'),
      conselhoNumero: formData.get('conselhoNumero'),
      conselhoSigla: formData.get('conselho'),
      conselhoUf: formData.get('conselhoUf'),
      estado: formData.get('estado'),
      cidade: formData.get('cidade'),
      bairro: formData.get('bairro') || undefined,
      atendeOnline: formData.get('atendeOnline') === 'on',
      atendeDomicilio: formData.get('atendeDomicilio') === 'on',
      preco: formData.get('preco') ? Number(formData.get('preco')) : undefined,
      telefone: formData.get('telefone') || undefined,
      lgpdConsent: true,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/registro-profissional`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.message || 'Erro ao cadastrar');
        return;
      }

      router.push(`/auth/verify?userId=${result.userId}&email=${data.email}`);
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-primary">
            Já tem conta? Entrar
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Cadastro de Profissional</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Crie seu perfil e comece a atender pacientes pela ClinicaFácil.
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {error && (
          <div className="mb-6 p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border p-6 space-y-6">
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b">
                <User className="w-5 h-5 text-primary" />
                <span className="font-semibold">Dados pessoais</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nome completo</label>
                <input name="nomeCompleto" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ex: Ana Lima Silva" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input name="email" type="email" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="ana@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Telefone / WhatsApp</label>
                  <input name="telefone" type="tel" className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="(11) 99999-9999" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Senha</label>
                <div className="relative">
                  <input name="senha" type={showPassword ? 'text' : 'password'} required minLength={8} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 pr-10" placeholder="Mínimo 8 caracteres" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Validação do conselho profissional</p>
                    <p>Seu registro será validado automaticamente. Caso a validação não seja possível, será revisado manualmente.</p>
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => setStep(2)} className="w-full py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 flex items-center justify-center gap-2">
                Continuar <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex items-center gap-3 pb-4 border-b">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold">Dados profissionais</span>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Especialidade principal</label>
                <select name="especialidade" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20">
                  <option value="">Selecione</option>
                  {ESPECIALIDADES.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Conselho</label>
                  <select name="conselho" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Selecione</option>
                    {CONSELHOS.map((c) => <option key={c.sigla} value={c.sigla}>{c.sigla} - {c.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nº do registro</label>
                  <input name="conselhoNumero" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="00000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">UF do conselho</label>
                  <select name="conselhoUf" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">UF</option>
                    {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Estado de atendimento</label>
                  <select name="estado" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Selecione</option>
                    {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cidade</label>
                  <input name="cidade" required className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="São Paulo" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bairro (opcional)</label>
                <input name="bairro" className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Centro" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Preço da consulta (R$)</label>
                <input name="preco" type="number" min={0} step="0.01" className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="150.00" />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" name="atendeOnline" className="rounded text-primary focus:ring-primary" />
                  <span className="text-sm">Atendo online / teleconsulta</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" name="atendeDomicilio" className="rounded text-primary focus:ring-primary" />
                  <span className="text-sm">Atendo a domicílio</span>
                </label>
              </div>

              <label className="flex items-start gap-3 pt-4 border-t">
                <input type="checkbox" name="lgpd" required className="mt-0.5 rounded text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">
                  Concordo com a <Link href="/privacidade" className="text-primary hover:underline">Política de Privacidade</Link> e autorizo o tratamento dos meus dados pessoais nos termos da LGPD.
                </span>
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="px-4 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50">
                  Voltar
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 disabled:opacity-50">
                  {loading ? 'Cadastrando...' : 'Criar perfil'}
                </button>
              </div>
            </>
          )}
        </form>
      </main>
    </div>
  );
}