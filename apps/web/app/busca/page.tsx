import { Metadata } from 'next';
import Link from 'next/link';
import { Search, MapPin, Star, Shield, Wifi, Clock } from 'lucide-react';
import { api } from '@/lib/api';

interface BuscaPageProps {
  searchParams: {
    q?: string;
    especialidade?: string;
    estado?: string;
    cidade?: string;
    online?: string;
    planoSaude?: string;
    precoMax?: string;
    notaMinima?: string;
    ordem?: string;
    pagina?: string;
  };
}

export async function generateMetadata({ searchParams }: BuscaPageProps): Promise<Metadata> {
  const estado = searchParams.estado || '';
  const especialidade = searchParams.especialidade || '';
  const cidade = searchParams.cidade || '';

  const title = especialidade && estado
    ? `${especialidade} em ${estado} | ClinicaFácil`
    : especialidade
    ? `${especialidade} | ClinicaFácil`
    : 'Buscar profissionais | ClinicaFácil';

  const description = estado || cidade
    ? `Encontre profissionais de saúde em ${[cidade, estado].filter(Boolean).join(', ')}. Perfis verificados, avaliações reais, agendamento online.`
    : 'Encontre os melhores profissionais de saúde. Busca por especialidade, localização e disponibilidade.';

  return { title, description };
}

export default async function BuscaPage({ searchParams }: BuscaPageProps) {
  const params: Record<string, string> = {};
  if (searchParams.q) params.q = searchParams.q;
  if (searchParams.especialidade) params.especialidade = searchParams.especialidade;
  if (searchParams.estado) params.estado = searchParams.estado;
  if (searchParams.cidade) params.cidade = searchParams.cidade;
  if (searchParams.online) params.online = searchParams.online;
  if (searchParams.planoSaude) params.planoSaude = searchParams.planoSaude;
  if (searchParams.precoMax) params.precoMax = searchParams.precoMax;
  if (searchParams.notaMinima) params.notaMinima = searchParams.notaMinima;
  params.ordem = searchParams.ordem || 'relevancia';
  params.pagina = searchParams.pagina || '1';
  params.tamanhoPagina = '20';

  let data = { profissionais: [], total: 0, paginas: 0, filtrosAtivos: [] as string[] };

  try {
    data = await api.professionals.search(params);
  } catch {
    // Silently fail for better UX
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">Entrar</Link>
            <Link href="/cadastro" className="text-sm font-medium px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90">
              Cadastrar
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-xl border p-6 sticky top-24">
              <h2 className="font-semibold mb-4">Filtros</h2>
              <form action="/busca" method="GET" className="space-y-4">
                {searchParams.q && <input type="hidden" name="q" value={searchParams.q} />}

                <div>
                  <label className="block text-sm font-medium mb-1">Especialidade</label>
                  <select name="especialidade" defaultValue={searchParams.especialidade} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="">Todas</option>
                    <option value="Psicologia">Psicologia</option>
                    <option value="Nutricao">Nutrição</option>
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Psiquiatria">Psiquiatria</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Estado</label>
                  <select name="estado" defaultValue={searchParams.estado} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="">Qualquer</option>
                    <option value="SP">São Paulo</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="RS">Rio Grande do Sul</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de atendimento</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" name="online" value="true" defaultChecked={searchParams.online === 'true'} className="rounded" />
                      Online / Teleconsulta
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nota mínima</label>
                  <select name="notaMinima" defaultValue={searchParams.notaMinima} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="">Qualquer</option>
                    <option value="4">4+ estrelas</option>
                    <option value="3">3+ estrelas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Ordenação</label>
                  <select name="ordem" defaultValue={searchParams.ordem || 'relevancia'} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="relevancia">Mais relevantes</option>
                    <option value="estrelas">Melhor avaliados</option>
                    <option value="preco_asc">Menor preço</option>
                    <option value="preco_desc">Maior preço</option>
                    <option value="recente">Mais recentes</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90">
                  Aplicar filtros
                </button>
              </form>
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {data.total > 0 ? `${data.total} profissionais encontrados` : 'Nenhum resultado'}
              </p>
              {data.filtrosAtivos.length > 0 && (
                <span className="text-xs text-muted-foreground">
                  Filtros: {data.filtrosAtivos.join(', ')}
                </span>
              )}
            </div>

            {data.profissionais.length === 0 ? (
              <div className="bg-white rounded-xl border p-12 text-center">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg mb-2">Nenhum profissional encontrado</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Tente ajustar os filtros ou buscar por outro termo.
                </p>
                <Link href="/busca" className="text-sm font-medium text-primary hover:underline">
                  Limpar filtros
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {data.profissionais.map((prof: any) => (
                  <Link
                    key={prof.id}
                    href={`/profissionais/${prof.slug}`}
                    className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden shrink-0">
                        {prof.fotoPerfil ? (
                          <img src={prof.fotoPerfil} alt={prof.nomeCompleto} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                            {prof.nomeCompleto?.charAt(0)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold truncate">{prof.nomeCompleto}</h3>
                          {prof.conselhoVerificado && (
                            <span className="shrink-0 flex items-center gap-1 text-xs text-verificado font-medium">
                              <Shield className="w-3 h-3" /> Verificado
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-muted-foreground">{prof.especialidadePrincipal}</p>

                        <div className="flex items-center gap-3 mt-2">
                          {prof.mediaEstrelas > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">{prof.mediaEstrelas}</span>
                              <span className="text-xs text-muted-foreground">({prof.totalAvaliacoes})</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {prof.cidade} / {prof.estado}
                          </div>
                        </div>

                        {prof.atendeOnline && (
                          <div className="flex items-center gap-1 mt-2">
                            <Wifi className="w-3 h-3 text-primary" />
                            <span className="text-xs text-primary font-medium">Atende online</span>
                          </div>
                        )}

                        {(prof.planoDestaque || prof.planoStatus !== 'GRATUITO') && (
                          <div className="flex gap-2 mt-2">
                            {prof.planoDestaque && (
                              <span className="text-xs px-2 py-0.5 bg-destaque/10 text-destaque rounded-full font-medium">
                                Destaque
                              </span>
                            )}
                            {prof.planoStatus !== 'GRATUITO' && (
                              <span className="text-xs px-2 py-0.5 bg-pro/10 text-pro rounded-full font-medium">
                                Pro
                              </span>
                            )}
                          </div>
                        )}

                        {(prof.precoMin || prof.preco) && (
                          <p className="mt-2 text-sm font-semibold text-foreground">
                            {prof.preco
                              ? `R$ ${Number(prof.preco).toFixed(2)}`
                              : prof.precoMin && prof.precoMax
                              ? `R$ ${Number(prof.precoMin)} – R$ ${Number(prof.precoMax)}`
                              : prof.precoMin
                              ? `A partir de R$ ${Number(prof.precoMin).toFixed(2)}`
                              : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {data.paginas > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: data.paginas }, (_, i) => {
                  const p = i + 1;
                  return (
                    <Link
                      key={p}
                      href={`/busca?${new URLSearchParams({ ...searchParams, pagina: String(p) }).toString()}`}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        String(searchParams.pagina || '1') === String(p)
                          ? 'bg-primary text-white'
                          : 'bg-white border hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}