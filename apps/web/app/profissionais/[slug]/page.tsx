import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Shield, MapPin, Wifi, Phone, Globe, Clock, Calendar, ChevronRight, Award } from 'lucide-react';
import { api } from '@/lib/api';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const prof = await api.professionals.getBySlug(params.slug);
    const url = `https://clinicafacil.com.br/profissionais/${params.slug}`;

    return {
      title: `${prof.nomeCompleto} — ${prof.especialidadePrincipal} em ${prof.cidade}-${prof.estado} | ClinicaFácil`,
      description: `${prof.nomeCompleto} é ${prof.especialidadePrincipal} em ${prof.cidade}/${prof.estado}, ${prof.conselhoSigla} ${prof.conselhoNumero}. ${prof.mediaEstrelas} estrelas em ${prof.totalAvaliacoes} avaliações. Agende online agora.`,
      alternates: { canonical: url },
      openGraph: {
        type: 'profile',
        url,
        title: `${prof.nomeCompleto} — ${prof.especialidadePrincipal} | ClinicaFácil`,
        description: `${prof.mediaEstrelas} estrelas • ${prof.totalAvaliacoes} avaliações • ${prof.cidade}/${prof.estado}`,
      },
    };
  } catch {
    return { title: 'Profissional não encontrado | ClinicaFácil' };
  }
}

export default async function ProfissionalPage({ params }: Props) {
  let prof: any;
  try {
    prof = await api.professionals.getBySlug(params.slug);
  } catch {
    notFound();
  }

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: prof.nomeCompleto,
    description: prof.descricao,
    medicalSpecialty: prof.especialidadePrincipal,
    address: {
      '@type': 'PostalAddress',
      addressLocality: prof.cidade,
      addressRegion: prof.estado,
      addressCountry: 'BR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(prof.mediaEstrelas),
      reviewCount: String(prof.totalAvaliacoes),
      bestRating: '5',
      worstRating: '1',
    },
    priceRange: prof.precoMin && prof.precoMax
      ? `R$${Number(prof.precoMin)}–R$${Number(prof.precoMax)}`
      : prof.preco
      ? `R$${Number(prof.preco)}`
      : '$$',
    url: `https://clinicafacil.com.br/profissionais/${prof.slug}`,
    image: prof.fotoPerfil,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-primary">ClinicaFácil</Link>
            <div className="flex items-center gap-4">
              <Link href="/busca" className="text-sm font-medium hover:text-primary">Buscar profissionais</Link>
              <Link href="/login" className="text-sm font-medium hover:text-primary">Entrar</Link>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl border p-6">
                <div className="flex gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-xl overflow-hidden shrink-0">
                    {prof.fotoPerfil ? (
                      <img src={prof.fotoPerfil} alt={prof.nomeCompleto} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-400">
                        {prof.nomeCompleto?.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start flex-wrap gap-2">
                      <h1 className="text-2xl font-bold">{prof.nomeCompleto}</h1>
                      {prof.conselhoVerificado && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-verificado/10 text-verificado rounded-full font-semibold">
                          <Shield className="w-3 h-3" /> Verificado
                        </span>
                      )}
                      {prof.planoDestaque && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-destaque/10 text-destaque rounded-full font-semibold">
                          <Award className="w-3 h-3" /> Destaque
                        </span>
                      )}
                      {prof.planoStatus !== 'GRATUITO' && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-pro/10 text-pro rounded-full font-semibold">
                          Pro
                        </span>
                      )}
                    </div>

                    <p className="text-muted-foreground mt-1">
                      {prof.conselhoSigla} {prof.conselhoNumero} — {prof.especialidadePrincipal}
                    </p>

                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      {prof.mediaEstrelas > 0 && (
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                              key={n}
                              className={`w-5 h-5 ${
                                n <= Math.round(prof.mediaEstrelas)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-sm font-semibold ml-1">{prof.mediaEstrelas}</span>
                          <span className="text-sm text-muted-foreground">({prof.totalAvaliacoes} avaliações)</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {prof.cidade}, {prof.estado}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      {prof.atendeOnline && (
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                          <Wifi className="w-3 h-3" /> Online
                        </span>
                      )}
                      {prof.atendeDomicilio && (
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                          À domicílio
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {prof.descricao && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="font-semibold text-lg mb-3">Sobre</h2>
                  <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                    {prof.descricao}
                  </p>
                </div>
              )}

              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold text-lg mb-3">Informações da consulta</h2>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>Tempo médio: {prof.tempConsultaMinutos || 60} min</span>
                  </div>
                  {(prof.precoMin || prof.preco) && (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-primary">
                        {prof.preco
                          ? `R$ ${Number(prof.preco).toFixed(2)}`
                          : `R$ ${Number(prof.precoMin).toFixed(2)} – R$ ${Number(prof.precoMax || prof.precoMin).toFixed(2)}`}
                      </span>
                    </div>
                  )}
                  {prof.planosAceitos?.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Aceita: </span>
                      <span>{prof.planosAceitos.map((p: any) => p.planoSaude).join(', ')}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Visível apenas para pacientes</span>
                  </div>
                </div>
              </div>

              {prof.fotosConsultorio?.length > 0 && (
                <div className="bg-white rounded-xl border p-6">
                  <h2 className="font-semibold text-lg mb-3">Fotos do consultório</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {prof.fotosConsultorio.map((foto: any) => (
                      <img
                        key={foto.id}
                        src={foto.url}
                        alt="Foto do consultório"
                        className="w-full aspect-square object-cover rounded-lg"
                        loading="lazy"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-xl border p-6">
                <h2 className="font-semibold text-lg mb-3">
                  Avaliações ({prof.totalAvaliacoes})
                </h2>
                {prof.avaliacoes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Nenhuma avaliação ainda. Seja o primeiro!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {prof.avaliacoes.map((av: any) => (
                      <div key={av.id} className="border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-500">
                              {av.paciente?.user?.nomeCompleto?.charAt(0) || 'A'}
                            </div>
                            <div>
                              <p className="text-sm font-medium">{av.paciente?.user?.nomeCompleto}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(av.criadoEm), "d 'de' MMM 'de' yyyy", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                className={`w-4 h-4 ${
                                  n <= av.notaGeral ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{av.comentario}</p>
                        {av.resposta && (
                          <div className="mt-2 ml-4 pl-4 border-l-2 border-primary/20">
                            <p className="text-xs font-medium text-primary">Resposta do profissional:</p>
                            <p className="text-sm text-muted-foreground mt-1">{av.resposta}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl border p-6 sticky top-24">
                <div className="text-center mb-6">
                  {(prof.precoMin || prof.preco) ? (
                    <div>
                      <span className="text-3xl font-bold text-primary">
                        {prof.preco
                          ? `R$ ${Number(prof.preco).toFixed(2)}`
                          : `R$ ${Number(prof.precoMin).toFixed(2)}`}
                      </span>
                      {prof.precoMin && prof.precoMax && (
                        <span className="text-muted-foreground"> – R$ {Number(prof.precoMax).toFixed(2)}</span>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">por consulta</p>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-primary">A definir</div>
                  )}
                </div>

                <div className="space-y-3">
                  <Link
                    href={`/agendar/${prof.id}`}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Calendar className="w-5 h-5" />
                    Agendar consulta
                  </Link>

                  <button
                    type="button"
                    className="w-full py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors"
                  >
                    Ver disponibilidade
                  </button>
                </div>

                <div className="mt-6 pt-6 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-verificado" />
                    <span>Conselho profissional verificado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{prof.mediaEstrelas} de 5 ({prof.totalAvaliacoes} avaliações)</span>
                  </div>
                  {prof.atendeOnline && (
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-primary" />
                      <span>Atendimento online disponível</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  className="w-full mt-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compartilhar perfil
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ClinicaFácil — Marketplace de saúde
          </div>
        </footer>
      </div>
    </>
  );
}