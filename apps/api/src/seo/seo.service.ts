import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RedisService } from '../config/redis.service';

@Injectable()
export class SeoService {
  private readonly logger = new Logger(SeoService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async generateSitemap(origin: string): Promise<string> {
    const cacheKey = 'seo:sitemap';
    const redis = this.redisService.getClient();
    const cached = await redis.get(cacheKey);
    if (cached) return cached;

    const [profissionais, especialidades, estados] = await Promise.all([
      this.prisma.profissional.findMany({
        where: { ativo: true },
        select: { slug: true, atualizadoEm: true },
      }),
      this.prisma.profissional.findMany({
        where: { ativo: true },
        select: { especialidadePrincipal: true },
        distinct: ['especialidadePrincipal'],
      }),
      this.prisma.profissional.findMany({
        where: { ativo: true },
        select: { estado: true },
        distinct: ['estado'],
      }),
    ]);

    const staticUrls = [
      { path: '', changefreq: 'daily', priority: '1.0' },
      { path: '/busca', changefreq: 'daily', priority: '0.9' },
      { path: '/planos', changefreq: 'weekly', priority: '0.7' },
      { path: '/como-funciona', changefreq: 'monthly', priority: '0.6' },
      { path: '/faq', changefreq: 'monthly', priority: '0.6' },
      { path: '/privacidade', changefreq: 'monthly', priority: '0.4' },
      { path: '/termos', changefreq: 'monthly', priority: '0.4' },
      { path: '/lgpd', changefreq: 'monthly', priority: '0.4' },
    ];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    for (const url of staticUrls) {
      xml += `  <url>\n    <loc>${origin}${url.path}</loc>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>\n`;
    }

    for (const esp of especialidades) {
      const slug = esp.especialidadePrincipal.toLowerCase()
        .replace(/ /g, '-').replace(/ç/g, 'c').replace(/ã/g, 'a')
        .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
        .replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ê/g, 'e')
        .replace(/ô/g, 'o').replace(/â/g, 'a');
      xml += `  <url>\n    <loc>${origin}/profissionais/${slug}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }

    for (const estado of estados) {
      const cidadeSlug = estado.estado.toLowerCase();
      xml += `  <url>\n    <loc>${origin}/profissionais/${cidadeSlug}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    }

    for (const prof of profissionais) {
      const lastmod = prof.atualizadoEm ? new Date(prof.atualizadoEm).toISOString().split('T')[0] : '';
      xml += `  <url>\n    <loc>${origin}/profissionais/${prof.slug}</loc>\n    ${lastmod ? `<lastmod>${lastmod}</lastmod>\n    ` : ''}<changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    xml += '</urlset>';

    await redis.set(cacheKey, xml, 'EX', 3600);
    return xml;
  }

  async generateRobotsTxt(origin: string): Promise<string> {
    return `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin
Disallow: /api
Disallow: /auth
Disallow: /login
Disallow: /cadastro

Sitemap: ${origin}/sitemap.xml

User-agent: GPTBot
Disallow: /
User-agent: CCBot
Disallow: /
User-agent: anthropic-ai
Disallow: /`;
  }

  async getLandingPageData(slug: string) {
    const cleanSlug = slug.toLowerCase().replace(/-/g, ' ');

    const [profissionais, especialidades] = await Promise.all([
      this.prisma.profissional.findMany({
        where: {
          ativo: true,
          OR: [
            { especialidadePrincipal: { contains: cleanSlug } },
            { cidade: { contains: cleanSlug } },
            { estado: cleanSlug.toUpperCase() },
          ],
        },
        include: {
          user: { select: { nomeCompleto: true } },
          avaliacoes: {
            where: { aprovada: true, denunciada: false },
            select: { notaGeral: true },
          },
          _count: { select: { avaliacoes: true } },
        },
        take: 20,
        orderBy: { score: 'desc' },
      }),
      this.prisma.profissional.groupBy({
        by: ['especialidadePrincipal', 'estado'],
        where: { ativo: true },
        _count: true,
      }),
    ]);

    const profissionaisFormatados = profissionais.map((p) => ({
      id: p.id,
      slug: p.slug,
      nomeCompleto: p.user.nomeCompleto,
      fotoPerfil: p.fotoPerfil,
      especialidadePrincipal: p.especialidadePrincipal,
      estado: p.estado,
      cidade: p.cidade,
      preco: p.preco,
      precoMin: p.precoMin,
      precoMax: p.precoMax,
      atendeOnline: p.atendeOnline,
      conselhoVerificado: p.conselhoVerificado,
      planoDestaque: p.planoDestaque,
      planoStatus: p.planoStatus,
      mediaEstrelas: p.avaliacoes.length > 0
        ? Math.round(p.avaliacoes.reduce((s, a) => s + a.notaGeral, 0) / p.avaliacoes.length * 10) / 10
        : 0,
      totalAvaliacoes: p._count.avaliacoes,
    }));

    return {
      total: profissionais.length,
      profissionais: profissionaisFormatados,
    };
  }
}