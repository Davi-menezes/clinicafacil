import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { RedisService } from '../config/redis.service';

interface BuscaParams {
  especialidade?: string[];
  estado?: string;
  cidade?: string;
  bairro?: string;
  lat?: number;
  lng?: number;
  raioKm?: number;
  online?: boolean;
  planoSaude?: string;
  precoMax?: number;
  notaMinima?: number;
  ordem?: string;
  pagina?: number;
  tamanhoPagina?: number;
  q?: string;
}

interface ResultadoBusca {
  profissionais: any[];
  total: number;
  paginas: number;
  filtrosAtivos: string[];
}

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async buscar(params: BuscaParams): Promise<ResultadoBusca> {
    const cacheKey = this.buildCacheKey(params);
    const redis = this.redisService.getClient();
    const cached = await redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const page = params.pagina || 1;
    const pageSize = Math.min(params.tamanhoPagina || 20, 20);
    const skip = (page - 1) * pageSize;

    const orderBy = this.buildOrderBy(params.ordem);
    const filtrosAtivos: string[] = [];

    if (params.especialidade?.length) filtrosAtivos.push('especialidade');
    if (params.estado) filtrosAtivos.push('estado');
    if (params.cidade) filtrosAtivos.push('cidade');
    if (params.online !== undefined) filtrosAtivos.push('online');
    if (params.planoSaude) filtrosAtivos.push('planoSaude');
    if (params.precoMax) filtrosAtivos.push('precoMax');
    if (params.notaMinima) filtrosAtivos.push('notaMinima');
    if (params.q) filtrosAtivos.push('texto');

    const destaquesLimit = 3;
    const [destaques, total, profissionais] = await Promise.all([
      this.prisma.profissional.findMany({
        where: {
          ativo: true,
          planoDestaque: true,
          ...this.buildWhereClause(params),
        },
        include: this.professionalIncludes(),
        orderBy: { criadoEm: 'asc' },
        take: destaquesLimit,
      }),
      this.prisma.profissional.count({
        where: {
          ativo: true,
          planoDestaque: false,
          ...this.buildWhereClause(params),
        },
      }),
      this.prisma.profissional.findMany({
        where: {
          ativo: true,
          planoDestaque: false,
          ...this.buildWhereClause(params),
        },
        include: this.professionalIncludes(),
        orderBy,
        skip,
        take: pageSize,
      }),
    ]);

    const allProfissionais = [...destaques, ...profissionais];
    const profissionaisComAvaliacoes = await this.enrichWithRatings(allProfissionais);

    const resultado: ResultadoBusca = {
      profissionais: profissionaisComAvaliacoes,
      total: total + destaques.length,
      paginas: Math.ceil((total + destaques.length) / pageSize),
      filtrosAtivos,
    };

    await redis.set(cacheKey, JSON.stringify(resultado), 'EX', 180);
    return resultado;
  }

  private buildWhereClause(params: BuscaParams): any {
    const where: any = {};

    if (params.especialidade?.length) {
      where.especialidades = {
        some: { especialidade: { in: params.especialidade } },
      };
    }

    if (params.estado) {
      where.estado = params.estado;
    }

    if (params.cidade) {
      where.cidade = { contains: params.cidade, mode: 'insensitive' };
    }

    if (params.online !== undefined) {
      where.atendeOnline = params.online;
    }

    if (params.planoSaude) {
      where.planosAceitos = {
        some: { planoSaude: { equals: params.planoSaude } },
      };
    }

    if (params.precoMax) {
      where.OR = [
        { preco: { lte: params.precoMax } },
        { precoMax: { lte: params.precoMax } },
      ];
    }

    if (params.q) {
      where.OR = [
        { nomeCompleto: { contains: params.q, mode: 'insensitive' } },
        { descricao: { contains: params.q, mode: 'insensitive' } },
        { cidade: { contains: params.q, mode: 'insensitive' } },
      ];
    }

    return where;
  }

  private buildOrderBy(ordem?: string): any {
    switch (ordem) {
      case 'estrelas':
        return { score: 'desc' };
      case 'preco_asc':
        return { preco: 'asc' };
      case 'preco_desc':
        return { preco: 'desc' };
      case 'recente':
        return { criadoEm: 'desc' };
      default:
        return { score: 'desc' };
    }
  }

  private professionalIncludes() {
    return {
      user: { select: { nomeCompleto: true } },
      especialidades: true,
      planosAceitos: true,
      avaliacoes: {
        where: { aprovada: true, denunciada: false },
        select: { notaGeral: true },
      },
      _count: { select: { avaliacoes: true } },
    };
  }

  private async enrichWithRatings(profissionais: any[]) {
    return profissionais.map((prof) => {
      const notas = prof.avaliacoes || [];
      const mediaEstrelas = notas.length > 0
        ? notas.reduce((s: number, a: any) => s + a.notaGeral, 0) / notas.length
        : 0;

      return {
        id: prof.id,
        slug: prof.slug,
        nomeCompleto: prof.user?.nomeCompleto,
        fotoPerfil: prof.fotoPerfil,
        especialidadePrincipal: prof.especialidadePrincipal,
        estado: prof.estado,
        cidade: prof.cidade,
        bairro: prof.bairro,
        preco: prof.preco,
        precoMin: prof.precoMin,
        precoMax: prof.precoMax,
        atendeOnline: prof.atendeOnline,
        planoDestaque: prof.planoDestaque,
        planoStatus: prof.planoStatus,
        conselhoVerificado: prof.conselhoVerificado,
        score: prof.score,
        mediaEstrelas: Math.round(mediaEstrelas * 10) / 10,
        totalAvaliacoes: prof._count?.avaliacoes || 0,
        planoSaudeAceitos: prof.planosAceitos?.map((p: any) => p.planoSaude) || [],
      };
    });
  }

  private buildCacheKey(params: BuscaParams): string {
    return `search:${JSON.stringify(params)}`;
  }

  async invalidateCache(): Promise<void> {
    const redis = this.redisService.getClient();
    const keys = await redis.keys('search:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}