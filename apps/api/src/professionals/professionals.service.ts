import { Injectable, Logger, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ConselhoService } from './conselho.service';
import { ScoreService } from './score.service';
import { RedisService } from '../config/redis.service';
import slugify from 'slugify';
import { addDays, addMinutes, format, setHours, setMinutes, isBefore, isAfter, startOfDay } from 'date-fns';

@Injectable()
export class ProfessionalsService {
  private readonly logger = new Logger(ProfessionalsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly conselhoService: ConselhoService,
    private readonly scoreService: ScoreService,
    private readonly redisService: RedisService,
  ) {}

  async findBySlug(slug: string) {
    const prof = await this.prisma.profissional.findUnique({
      where: { slug, ativo: true },
      include: {
        user: { select: { nomeCompleto: true, emailEncrypted: true } },
        especialidades: true,
        planosAceitos: true,
        disponibilidades: true,
        excecoes: true,
        fotosConsultorio: { orderBy: { ordem: 'asc' } },
        avaliacoes: {
          where: { aprovada: true, denunciada: false },
          include: {
            notas: true,
            paciente: { include: { user: { select: { nomeCompleto: true } } } },
          },
          take: 10,
          orderBy: { criadoEm: 'desc' },
        },
        _count: { select: { avaliacoes: true, agendamentos: true } },
      },
    });

    if (!prof) throw new NotFoundException('Profissional não encontrado');

    const mediaEstrelas = prof.avaliacoes.length > 0
      ? prof.avaliacoes.reduce((s, a) => s + a.notaGeral, 0) / prof.avaliacoes.length
      : 0;

    const email = prof.user.emailEncrypted;

    return {
      ...prof,
      mediaEstrelas: Math.round(mediaEstrelas * 10) / 10,
      totalAvaliacoes: prof._count.avaliacoes,
      nomeCompleto: prof.user.nomeCompleto,
    };
  }

  async updateProfile(
    profissionalId: string,
    userId: string,
    data: {
      descricao?: string;
      preco?: number;
      precoMin?: number;
      precoMax?: number;
      tempConsultaMinutos?: number;
      bufferMinutos?: number;
      atendeOnline?: boolean;
      atendeDomicilio?: boolean;
      bairro?: string;
      enderecoCompleto?: string;
      telefone?: string;
      formacaoAcademica?: string;
      certificacoes?: string;
      idiomasAtendimento?: string[];
      sitePessoal?: string;
      linkedin?: string;
      cbo?: string;
      maxAgendamentosDia?: number;
      antecedenciaMinHoras?: number;
      janelaAgendamentoDias?: number;
      anosExperiencia?: number;
    },
  ) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof) throw new NotFoundException();
    if (prof.userId !== userId) throw new ForbiddenException();

    const updateData: any = { ...data };
    if (data.idiomasAtendimento) {
      updateData.idiomasAtendimento = Array.isArray(data.idiomasAtendimento)
        ? data.idiomasAtendimento.join(', ')
        : data.idiomasAtendimento;
    }

    const updated = await this.prisma.profissional.update({
      where: { id: profissionalId },
      data: updateData,
    });

    this.scoreService.recalcularEAtualizar(profissionalId);
    this.invalidateSearchCache();
    this.createAuditLog(userId, 'UPDATE_PROFILE', 'Profissional', profissionalId, 'Perfil atualizado');

    return updated;
  }

  async processarRegistroProfissional(
    userId: string,
    data: {
      conselhoNumero: string;
      conselhoSigla: string;
      conselhoUf: string;
      especialidadePrincipal: string;
      estado: string;
      cidade: string;
      nomeCompleto: string;
    },
  ) {
    const validacao = await this.conselhoService.validar(
      data.conselhoNumero,
      data.conselhoSigla,
      data.conselhoUf,
    );

    if (validacao.status === 'INVALIDO') {
      throw new BadRequestException(
        `Registro no ${data.conselhoSigla} inválido: ${validacao.mensagem || 'Não verificado'}`,
      );
    }

    const slug = this.generateSlug(
      data.nomeCompleto,
      data.especialidadePrincipal,
      data.estado,
      data.conselhoSigla,
      data.conselhoNumero,
    );

    const conselhoVerificado = validacao.status === 'VERIFICADO';
    const pendenteValidacaoManual = validacao.status === 'PENDENTE';

    const profissional = await this.prisma.profissional.create({
      data: {
        userId,
        slug,
        especialidadePrincipal: data.especialidadePrincipal as any,
        conselhoNumero: data.conselhoNumero,
        conselhoSigla: data.conselhoSigla,
        conselhoUf: data.conselhoUf,
        conselhoVerificado,
        pendenteValidacaoManual,
        estado: data.estado,
        cidade: data.cidade,
      },
    });

    this.createAuditLog(
      userId,
      'REGISTER_PROFESSIONAL',
      'Profissional',
      profissional.id,
      `Conselho ${data.conselhoSigla}: ${validacao.status}`,
    );

    return profissional;
  }

  async addEspecialidade(profissionalId: string, especialidade: string, userId: string) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof || prof.userId !== userId) throw new ForbiddenException();

    return this.prisma.especialidadeProfissional.create({
      data: { profissionalId, especialidade: especialidade as any },
    });
  }

  async removeEspecialidade(profissionalId: string, especialidade: string, userId: string) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof || prof.userId !== userId) throw new ForbiddenException();

    return this.prisma.especialidadeProfissional.deleteMany({
      where: { profissionalId, especialidade: especialidade as any },
    });
  }

  async addPlanoSaude(profissionalId: string, plano: string, userId: string) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof || prof.userId !== userId) throw new ForbiddenException();

    return this.prisma.planoSaudeProfissional.create({
      data: { profissionalId, planoSaude: plano },
    });
  }

  async removePlanoSaude(profissionalId: string, plano: string, userId: string) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof || prof.userId !== userId) throw new ForbiddenException();

    return this.prisma.planoSaudeProfissional.deleteMany({
      where: { profissionalId, planoSaude: plano },
    });
  }

  async uploadFotoPerfil(profissionalId: string, userId: string, filename: string) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof || prof.userId !== userId) throw new ForbiddenException();

    const updated = await this.prisma.profissional.update({
      where: { id: profissionalId },
      data: { fotoPerfil: filename },
    });

    this.scoreService.recalcularEAtualizar(profissionalId);
    this.invalidateSearchCache();
    this.createAuditLog(userId, 'UPLOAD_FOTO_PERFIL', 'Profissional', profissionalId, filename);

    return updated;
  }

  async uploadFotosConsultorio(profissionalId: string, userId: string, filenames: string[]) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    if (!prof || prof.userId !== userId) throw new ForbiddenException();

    const existing = await this.prisma.fotoConsultorio.count({ where: { profissionalId } });
    if (existing + filenames.length > 6) {
      throw new BadRequestException('Máximo de 6 fotos do consultório');
    }

    const fotos = await Promise.all(
      filenames.map((url, i) =>
        this.prisma.fotoConsultorio.create({
          data: { profissionalId, url, ordem: existing + i },
        }),
      ),
    );

    this.scoreService.recalcularEAtualizar(profissionalId);
    this.invalidateSearchCache();
    this.createAuditLog(
      userId,
      'UPLOAD_FOTOS_CONSULTORIO',
      'Profissional',
      profissionalId,
      `${filenames.length} fotos adicionadas`,
    );

    return fotos;
  }

  async getDisponibilidade(profissionalId: string, mes: string) {
    const prof = await this.prisma.profissional.findUnique({
      where: { id: profissionalId },
      include: {
        disponibilidades: { orderBy: { diaSemana: 'asc' } },
        excecoes: {
          where: {
            data: { gte: new Date(`${mes}-01`) },
          },
        },
        agendamentos: {
          where: {
            status: { in: ['CONFIRMADO', 'PENDENTE_PAGAMENTO'] },
            dataHora: { gte: new Date(`${mes}-01`) },
          },
        },
      },
    });

    if (!prof) throw new NotFoundException('Profissional não encontrado');

    const resultado: Record<string, string[]> = {};
    const hoje = startOfDay(new Date());
    const fimJanela = addDays(hoje, prof.janelaAgendamentoDias || 30);
    const mesDate = new Date(`${mes}-01`);
    const ultimoDia = new Date(mesDate.getFullYear(), mesDate.getMonth() + 1, 0);

    let current = startOfDay(mesDate);
    if (current < hoje) current = hoje;
    if (current > fimJanela) return resultado;

    const duracao = prof.tempConsultaMinutos + prof.bufferMinutos;

    while (current <= ultimoDia && current <= fimJanela) {
      const diaSemana = current.getDay();
      const diaFormatado = format(current, 'yyyy-MM-dd');

      const excecao = prof.excecoes.find((e) => {
        const eDate = new Date(e.data);
        return (
          eDate.getFullYear() === current.getFullYear() &&
          eDate.getMonth() === current.getMonth() &&
          eDate.getDate() === current.getDate()
        );
      });

      if (excecao?.tipo === 'BLOQUEIO') {
        current = addDays(current, 1);
        continue;
      }

      const horariosExcecao =
        excecao?.horaInicio && excecao?.horaFim
          ? this.generateTimeSlots(excecao.horaInicio, excecao.horaFim, duracao)
          : null;

      const disponivelDia = prof.disponibilidades.find((d) => d.diaSemana === diaSemana);

      if (disponivelDia || horariosExcecao) {
        const slots =
          horariosExcecao ||
          this.generateTimeSlots(disponivelDia!.horaInicio, disponivelDia!.horaFim, duracao);

        const agendadosDoDia = prof.agendamentos.filter((a) => {
          const aDate = new Date(a.dataHora);
          return (
            aDate.getFullYear() === current.getFullYear() &&
            aDate.getMonth() === current.getMonth() &&
            aDate.getDate() === current.getDate()
          );
        });

        const agora = new Date();
        const antecedencia = addMinutes(agora, prof.antecedenciaMinHoras);

        const slotsLivres = slots.filter((slot) => {
          const [h, m] = slot.split(':').map(Number);
          const slotTime = new Date(current.getFullYear(), current.getMonth(), current.getDate(), h, m);
          const fimSlot = addMinutes(slotTime, duracao);

          if (isBefore(slotTime, antecedencia)) return false;
          if (isAfter(slotTime, fimJanela)) return false;

          const conflito = agendadosDoDia.some((ag) => {
            const agInicio = new Date(ag.dataHora);
            const agFim = addMinutes(agInicio, ag.duracaoMinutos || duracao);
            return isBefore(slotTime, agFim) && isAfter(fimSlot, agInicio);
          });

          return !conflito;
        });

        if (slotsLivres.length > 0) {
          resultado[diaFormatado] = slotsLivres;
        }
      }

      current = addDays(current, 1);
    }

    return resultado;
  }

  async getDashboardMetrics(profissionalId: string) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [agendamentos, faturamento, ocupacao, recentes] = await Promise.all([
      this.prisma.agendamento.groupBy({
        by: ['status'],
        where: { profissionalId, criadoEm: { gte: thirtyDaysAgo } },
        _count: true,
      }),
      this.prisma.agendamento.aggregate({
        where: { profissionalId, status: 'CONFIRMADO', criadoEm: { gte: thirtyDaysAgo } },
        _sum: { valorTotal: true, valorProfissional: true },
        _count: true,
      }),
      this.prisma.agendamento.count({
        where: { profissionalId, status: { in: ['CONFIRMADO', 'CONCLUIDO'] }, criadoEm: { gte: thirtyDaysAgo } },
      }),
      this.prisma.avaliacao.findMany({
        where: { profissionalId, aprovada: true },
        orderBy: { criadoEm: 'desc' },
        take: 5,
        include: {
          paciente: { include: { user: { select: { nomeCompleto: true } } } },
        },
      }),
    ]);

    const statusCounts = agendamentos.reduce((acc, a) => ({ ...acc, [a.status]: a._count }), {});

    return {
      agendamentos: statusCounts,
      faturamento: {
        bruto: Number(faturamento._sum.valorTotal || 0),
        liquido: Number(faturamento._sum.valorProfissional || 0),
        total: faturamento._count,
      },
      ocupacao,
      avaliacoesRecentes: recentes,
    };
  }

  generateSlug(nome: string, especialidade: string, estado: string, conselhoSigla: string, numero: string): string {
    return slugify(
      `${nome}-${especialidade}-${estado}-${conselhoSigla}-${numero}`,
      { lower: true, strict: true },
    );
  }

  /**
   * Generates time slots between inicio and fim with the given duration in minutes.
   */
  private generateTimeSlots(inicio: string, fim: string, duracaoMinutos: number): string[] {
    const [hIni, mIni] = inicio.split(':').map(Number);
    const [hFim, mFim] = fim.split(':').map(Number);

    const slots: string[] = [];
    let current = setMinutes(setHours(new Date(), hIni), mIni);
    const end = setMinutes(setHours(new Date(), hFim), mFim);

    while (
      isBefore(addMinutes(current, duracaoMinutos), end) ||
      addMinutes(current, duracaoMinutos).getTime() === end.getTime()
    ) {
      slots.push(format(current, 'HH:mm'));
      current = addMinutes(current, duracaoMinutos);
    }

    return slots;
  }

  /**
   * Invalidates the search cache in Redis after profile changes that affect search results.
   */
  private async invalidateSearchCache(): Promise<void> {
    try {
      const redis = this.redisService.getClient();
      const keys = await redis.keys('search:*');
      if (keys.length > 0) {
        await redis.del(...keys);
      }
    } catch (error: any) {
      this.logger.warn(`Falha ao invalidar cache de busca: ${error.message}`);
    }
  }

  /**
   * Creates an audit log entry for critical operations.
   */
  private createAuditLog(
    userId: string,
    acao: string,
    entidade: string,
    entidadeId: string,
    detalhes?: string,
  ): void {
    this.prisma.logAuditoria
      .create({
        data: {
          userId,
          acao,
          entidade,
          entidadeId,
          detalhes,
        },
      })
      .catch((err) => {
        this.logger.warn(`Falha ao criar log de auditoria: ${err.message}`);
      });
  }
}