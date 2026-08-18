const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiFetch<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Erro desconhecido' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  professionals: {
    search: (params: Record<string, string>) => {
      const query = new URLSearchParams(params).toString();
      return apiFetch(`/busca/profissionais?${query}`);
    },
    getBySlug: (slug: string) => apiFetch(`/profissionais/${slug}`),
    disponibilidade: (id: string, mes: string) =>
      apiFetch(`/profissionais/${id}/disponibilidade?mes=${mes}`),
  },
  auth: {
    me: () => apiFetch('/auth/me'),
    login: (data: any) =>
      apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
    registroProfissional: (data: any) =>
      apiFetch('/auth/registro-profissional', { method: 'POST', body: JSON.stringify(data) }),
    registroPaciente: (data: any) =>
      apiFetch('/auth/registro-paciente', { method: 'POST', body: JSON.stringify(data) }),
  },
  appointments: {
    create: (data: any) =>
      apiFetch('/agendamentos', { method: 'POST', body: JSON.stringify(data) }),
    listPaciente: (status?: string) =>
      apiFetch(`/agendamentos/paciente${status ? `?status=${status}` : ''}`),
    listProfissional: (params?: any) => {
      const q = new URLSearchParams(params || {}).toString();
      return apiFetch(`/agendamentos/profissional${q ? `?${q}` : ''}`);
    },
    cancel: (id: string, data: any) =>
      apiFetch(`/agendamentos/${id}/cancelar`, { method: 'POST', body: JSON.stringify(data) }),
  },
  reviews: {
    getByProfissional: (slug: string, pagina = 1) =>
      apiFetch(`/avaliacoes/profissional/${slug}?pagina=${pagina}&tamanhoPagina=10`),
    create: (data: any) =>
      apiFetch('/avaliacoes', { method: 'POST', body: JSON.stringify(data) }),
    respond: (id: string, data: any) =>
      apiFetch(`/avaliacoes/${id}/resposta`, { method: 'POST', body: JSON.stringify(data) }),
  },
};