'use client';

import { useEffect, useState } from 'react';
import { User, Camera, Shield, Wifi, MapPin, Clock, DollarSign } from 'lucide-react';

const ESPECIALIDADES = [
  'Psicologia', 'Psiquiatria', 'Nutrição', 'Fisioterapia', 'Fonoaudiologia',
  'Terapia Ocupacional', 'Educação Física', 'Enfermagem', 'Odontologia',
  'Dermatologia', 'Ginecologia', 'Cardiologia', 'Ortopedia', 'Neurologia',
  'Endocrinologia', 'Pediatria', 'Clínica Geral', 'Acupuntura', 'Osteopatia',
  'Homeopatia', 'Outros',
];

const PLANOS_SAUDE = [
  'Particular', 'Amil', 'Bradesco Saúde', 'SulAmérica', 'Unimed',
  'Porto Seguro', 'Hapvida', 'NotreDame', 'São Francisco', 'Outros',
];

export default function DashboardPerfilPage() {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()).then((data) => {
      setPerfil(data.profissional);
    }).finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('accessToken');
    if (!token || !perfil) return;

    const formData = new FormData(e.currentTarget);
    const data: any = {
      descricao: formData.get('descricao'),
      preco: Number(formData.get('preco')) || undefined,
      tempConsultaMinutos: Number(formData.get('tempConsultaMinutos')) || 60,
      atendeOnline: formData.get('atendeOnline') === 'on',
      atendeDomicilio: formData.get('atendeDomicilio') === 'on',
      telefone: formData.get('telefone') || undefined,
      formacaoAcademica: formData.get('formacaoAcademica') || undefined,
      certificacoes: formData.get('certificacoes') || undefined,
      sitePessoal: formData.get('sitePessoal') || undefined,
      anosExperiencia: Number(formData.get('anosExperiencia')) || undefined,
    };

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/profissionais/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      setMessage('Perfil atualizado com sucesso!');
    } catch {
      setMessage('Erro ao atualizar perfil.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="animate-pulse"><div className="h-96 bg-gray-200 rounded-xl" /></div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configurações do perfil</h1>

      {message && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 text-sm rounded-lg">{message}</div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-5 h-5 text-primary" />
            <span className="font-semibold">Foto de perfil</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
              {perfil?.fotoPerfil ? (
                <img src={perfil.fotoPerfil} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            <input type="file" accept="image/jpeg,image/png,image/webp" className="text-sm" />
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="font-semibold">Preço e atendimento</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Preço da consulta (R$)</label>
              <input name="preco" type="number" min={0} step="0.01" defaultValue={perfil?.preco || ''} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Duração (minutos)</label>
              <select name="tempConsultaMinutos" defaultValue={perfil?.tempConsultaMinutos || 60} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20">
                {[30, 45, 60, 90, 120].map((m) => <option key={m} value={m}>{m} min</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="atendeOnline" defaultChecked={perfil?.atendeOnline} className="rounded" />
              <Wifi className="w-4 h-4" /><span className="text-sm">Online</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="atendeDomicilio" defaultChecked={perfil?.atendeDomicilio} className="rounded" />
              <span className="text-sm">Domicílio</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-primary" />
            <span className="font-semibold">Sobre você</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descrição profissional</label>
            <textarea name="descricao" maxLength={1500} defaultValue={perfil?.descricao || ''} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Descreva sua experiência e abordagem (até 1500 caracteres)" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Formação acadêmica</label>
              <input name="formacaoAcademica" defaultValue={perfil?.formacaoAcademica || ''} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Curso, instituição" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Certificações</label>
              <input name="certificacoes" defaultValue={perfil?.certificacoes || ''} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Pós, especializações" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Anos de experiência</label>
              <input name="anosExperiencia" type="number" min={0} step="0.5" defaultValue={perfil?.anosExperiencia || ''} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Telefone / WhatsApp</label>
              <input name="telefone" defaultValue={perfil?.telefone || ''} className="w-full px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold">Plano e assinatura</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{perfil?.planoStatus === 'GRATUITO' ? 'Plano Gratuito' : 'Plano Pro'}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {perfil?.planoStatus === 'GRATUITO'
                    ? 'Até 10 agendamentos/mês, sem destaques'
                    : 'Agendamentos ilimitados, SMS, dashboard completo'}
                </p>
              </div>
              <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
                {perfil?.planoStatus === 'GRATUITO' ? 'Assinar Pro' : 'Gerenciar assinatura'}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50">
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>
    </div>
  );
}