import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ScoreService } from '../professionals/score.service';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly scoreService: ScoreService,
  ) {}

  async criar(pacienteId: string, data: {
    profissionalId: string;
    agendamentoId: string;
    notaGeral: number;
    comentario: string;
    tipoConsulta: string;
    problemaResolvido?: string;
    recomendaria?: boolean;
    notas?: { categoria: string; nota: number }[];
  }) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id: data.agendamentoId },
    });

    if (!agendamento || agendamento.pacienteId !== pacienteId) {
      throw new ForbiddenException('Agendamento não pertence a este paciente');
    }

    if (agendamento.status !== 'CONCLUIDO') {
      throw new BadRequestException('Apenas consultas concluídas podem ser avaliadas');
    }

    const existing = await this.prisma.avaliacao.findUnique({
      where: { pacienteId_profissionalId: { pacienteId, profissionalId: data.profissionalId } },
    });

    if (existing) {
      throw new BadRequestException('Você já avaliou este profissional');
    }

    const avaliacao = await this.prisma.avaliacao.create({
      data: {
        pacienteId,
        profissionalId: data.profissionalId,
        agendamentoId: data.agendamentoId,
        notaGeral: data.notaGeral,
        comentario: data.comentario,
        tipoConsulta: data.tipoConsulta,
        problemaResolvido: data.problemaResolvido,
        recomendaria: data.recomendaria,
        notas: {
          create: data.notas?.map((n) => ({ categoria: n.categoria, nota: n.nota })) || [],
        },
      },
    });

    await this.scoreService.recalcularEAtualizar(data.profissionalId);

    return avaliacao;
  }

  async editar(avaliacaoId: string, pacienteId: string, data: {
    notaGeral?: number;
    comentario?: string;
    problemaResolvido?: string;
    recomendaria?: boolean;
    notas?: { categoria: string; nota: number }[];
  }) {
    const avaliacao = await this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } });

    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');
    if (avaliacao.pacienteId !== pacienteId) throw new ForbiddenException();

    const diasCriacao = (Date.now() - avaliacao.criadoEm.getTime()) / (1000 * 60 * 60 * 24);
    if (diasCriacao > 30) throw new BadRequestException('Edição permitida apenas em até 30 dias');

    const updated = await this.prisma.avaliacao.update({
      where: { id: avaliacaoId },
      data: {
        notaGeral: data.notaGeral,
        comentario: data.comentario,
        problemaResolvido: data.problemaResolvido,
        recomendaria: data.recomendaria,
      },
    });

    if (data.notas) {
      await this.prisma.notaCategoria.deleteMany({ where: { avaliacaoId } });
      await this.prisma.notaCategoria.createMany({
        data: data.notas.map((n) => ({ avaliacaoId, categoria: n.categoria, nota: n.nota })),
      });
    }

    await this.scoreService.recalcularEAtualizar(avaliacao.profissionalId);

    return updated;
  }

  async deletar(avaliacaoId: string, pacienteId: string) {
    const avaliacao = await this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } });
    if (!avaliacao) throw new NotFoundException();
    if (avaliacao.pacienteId !== pacienteId) throw new ForbiddenException();

    const diasCriacao = (Date.now() - avaliacao.criadoEm.getTime()) / (1000 * 60 * 60 * 24);
    if (diasCriacao > 30) throw new BadRequestException('Exclusão permitida apenas em até 30 dias');

    const profissionalId = avaliacao.profissionalId;

    await this.prisma.avaliacao.delete({ where: { id: avaliacaoId } });

    await this.scoreService.recalcularEAtualizar(profissionalId);
  }

  async responder(avaliacaoId: string, profissionalId: string, resposta: string) {
    const avaliacao = await this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } });
    if (!avaliacao) throw new NotFoundException();
    if (avaliacao.profissionalId !== profissionalId) throw new ForbiddenException();

    return this.prisma.avaliacao.update({
      where: { id: avaliacaoId },
      data: { resposta, respostaEditadaEm: new Date() },
    });
  }

  async denunciar(avaliacaoId: string, usuarioId: string, motivo: string) {
    const avaliacao = await this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } });
    if (!avaliacao) throw new NotFoundException();

    await this.prisma.avaliacao.update({
      where: { id: avaliacaoId },
      data: { denunciada: true },
    });

    return { message: 'Denúncia enviada para análise' };
  }

  async listarPorProfissional(slug: string, pagina = 1, tamanhoPagina = 10) {
    const prof = await this.prisma.profissional.findUnique({ where: { slug } });
    if (!prof) throw new NotFoundException();

    const skip = (pagina - 1) * tamanhoPagina;

    const [avaliacoes, total] = await Promise.all([
      this.prisma.avaliacao.findMany({
        where: { profissionalId: prof.id, aprovada: true, denunciada: false },
        include: {
          paciente: { include: { user: { select: { nomeCompleto: true } } } },
          notas: true,
        },
        orderBy: { criadoEm: 'desc' },
        skip,
        take: tamanhoPagina,
      }),
      this.prisma.avaliacao.count({
        where: { profissionalId: prof.id, aprovada: true, denunciada: false },
      }),
    ]);

    return {
      avaliacoes,
      total,
      paginas: Math.ceil(total / tamanhoPagina),
      pagina,
    };
  }
}