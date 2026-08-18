import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

interface ScoreInput {
  mediaEstrelas: number;
  totalAvaliacoes: number;
  conselhoVerificado: boolean;
  perfilCompleto: boolean;
  planoDestaque: boolean;
  planoPro: boolean;
  atendeOnline: boolean;
  totalFotosConsultorio: number;
  ultimoAcessoEm: Date | null;
  anosExperiencia: number;
}

@Injectable()
export class ScoreService {
  private readonly logger = new Logger(ScoreService.name);

  constructor(private readonly prisma: PrismaService) {}

  async calcular(profissionalId: string): Promise<number> {
    const prof = await this.prisma.profissional.findUnique({
      where: { id: profissionalId },
      include: {
        avaliacoes: { select: { notaGeral: true } },
        fotosConsultorio: { select: { id: true } },
        user: { select: { ultimoAcessoEm: true } },
        especialidades: true,
      },
    });

    if (!prof) return 0;

    const mediaEstrelas = prof.avaliacoes.length > 0
      ? prof.avaliacoes.reduce((s, a) => s + a.notaGeral, 0) / prof.avaliacoes.length
      : 0;

    const totalAvaliacoes = prof.avaliacoes.length;
    const totalFotosConsultorio = prof.fotosConsultorio.length;

    const diasDesdeAcesso = prof.user?.ultimoAcessoEm
      ? Math.floor((Date.now() - prof.user.ultimoAcessoEm.getTime()) / (1000 * 60 * 60 * 24))
      : 999;

    let scoreAcesso = 0;
    if (diasDesdeAcesso < 7) scoreAcesso = 10;
    else if (diasDesdeAcesso < 30) scoreAcesso = 5;

    const scoreExperiencia = prof.anosExperiencia > 0
      ? Math.min(prof.anosExperiencia, 20) * 0.5
      : 0;

    const score =
      mediaEstrelas * 25 +
      totalAvaliacoes * 2 +
      (prof.conselhoVerificado ? 20 : 0) +
      (this.isPerfilCompleto(prof) ? 15 : 0) +
      (prof.planoDestaque ? 35 : 0) +
      (prof.planoStatus !== 'GRATUITO' ? 10 : 0) +
      (prof.atendeOnline ? 5 : 0) +
      totalFotosConsultorio * 1 +
      scoreAcesso +
      scoreExperiencia;

    return Math.round(score * 100) / 100;
  }

  private isPerfilCompleto(prof: any): boolean {
    return !!(
      prof.fotoPerfil &&
      prof.descricao &&
      prof.descricao.length > 200 &&
      (prof.preco || prof.precoMin) &&
      prof.estado &&
      prof.cidade
    );
  }

  async recalcularEAtualizar(profissionalId: string): Promise<number> {
    const score = await this.calcular(profissionalId);
    await this.prisma.profissional.update({
      where: { id: profissionalId },
      data: { score },
    });
    return score;
  }
}