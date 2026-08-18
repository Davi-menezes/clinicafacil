import { Injectable, Logger, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ConfigService } from '@nestjs/config';
import { addDays, addMinutes, format, parseISO, startOfDay, setHours, setMinutes, isAfter, isBefore, isSameDay } from 'date-fns';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class AppointmentsService {
  private readonly logger = new Logger(AppointmentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async getDisponibilidade(profissionalId: string, mes: string) {
    const prof = await this.prisma.profissional.findUnique({
      where: { id: profissionalId },
      include: {
        disponibilidades: { orderBy: { diaSemana: 'asc' } },
        excecoes: { where: { data: { gte: new Date(`${mes}-01`) } } },
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
    const fimJanela = addDays(hoje, prof.janelaAgendamentoDias);
    const mesDate = new Date(`${mes}-01`);
    const ultimoDia = new Date(mesDate.getFullYear(), mesDate.getMonth() + 1, 0);

    let current = startOfDay(mesDate);
    if (current < hoje) current = hoje;
    if (current > fimJanela) return resultado;

    while (current <= ultimoDia && current <= fimJanela) {
      const diaSemana = current.getDay();
      const excecao = prof.excecoes.find((e) => isSameDay(new Date(e.data), current));

      if (excecao?.tipo === 'BLOQUEIO') {
        current = addDays(current, 1);
        continue;
      }

      const horariosExcecao = excecao?.horaInicio && excecao?.horaFim
        ? this.generateTimeSlots(excecao.horaInicio, excecao.horaFim, prof.tempConsultaMinutos + prof.bufferMinutos)
        : null;

      const disponivelDia = prof.disponibilidades.find((d) => d.diaSemana === diaSemana);

      if (disponivelDia || horariosExcecao) {
        const slots = horariosExcecao || this.generateTimeSlots(
          disponivelDia!.horaInicio,
          disponivelDia!.horaFim,
          prof.tempConsultaMinutos + prof.bufferMinutos,
        );

        const agendadosDoDia = prof.agendamentos.filter((a) =>
          isSameDay(new Date(a.dataHora), current),
        );

        const slotsLivres = slots.filter((slot) => {
          const slotTime = parseISO(`${format(current, 'yyyy-MM-dd')}T${slot}:00`);
          const fimSlot = addMinutes(slotTime, prof.tempConsultaMinutos + prof.bufferMinutos);
          const agora = new Date();
          const antecedencia = addMinutes(agora, prof.antecedenciaMinHoras);

          if (isBefore(slotTime, antecedencia)) return false;
          if (isAfter(slotTime, fimJanela)) return false;

          const conflito = agendadosDoDia.some((ag) => {
            const agInicio = new Date(ag.dataHora);
            const agFim = addMinutes(agInicio, ag.duracaoMinutos);
            return (isBefore(slotTime, agFim) && isAfter(fimSlot, agInicio));
          });

          return !conflito;
        });

        if (slotsLivres.length > 0) {
          resultado[format(current, 'yyyy-MM-dd')] = slotsLivres;
        }
      }

      current = addDays(current, 1);
    }

    return resultado;
  }

  private generateTimeSlots(inicio: string, fim: string, duracaoMinutos: number): string[] {
    const [hIni, mIni] = inicio.split(':').map(Number);
    const [hFim, mFim] = fim.split(':').map(Number);

    const slots: string[] = [];
    let current = setMinutes(setHours(new Date(), hIni), mIni);
    const end = setMinutes(setHours(new Date(), hFim), mFim);

    while (isBefore(addMinutes(current, duracaoMinutos), end) ||
           addMinutes(current, duracaoMinutos).getTime() === end.getTime()) {
      slots.push(format(current, 'HH:mm'));
      current = addMinutes(current, duracaoMinutos);
    }

    return slots;
  }

  async criarAgendamento(
    pacienteId: string,
    profissionalId: string,
    data: {
      dataHora: Date;
      duracaoMinutos: number;
      tipo: string;
      valorTotal: number;
      formaPagamento: string;
    },
  ) {
    const prof = await this.prisma.profissional.findUnique({ where: { id: profissionalId } });
    const pac = await this.prisma.paciente.findUnique({ where: { id: pacienteId } });

    if (!prof || !pac) throw new NotFoundException();

    const taxa = parseFloat(this.configService.get<string>('MP_TAXA_PLATAFORMA_PERCENT') || '5') / 100;
    const valorPlataforma = parseFloat((data.valorTotal * taxa).toFixed(2));
    const valorProfissional = parseFloat((data.valorTotal - valorPlataforma).toFixed(2));

    const agendamento = await this.prisma.agendamento.create({
      data: {
        pacienteId,
        profissionalId,
        dataHora: data.dataHora,
        duracaoMinutos: data.duracaoMinutos,
        tipo: data.tipo,
        status: data.formaPagamento === 'ONLINE' ? 'PENDENTE_PAGAMENTO' : 'CONFIRMADO',
        valorTotal: data.valorTotal,
        valorPlataforma,
        valorProfissional,
        formaPagamento: data.formaPagamento,
      },
    });

    return agendamento;
  }

  async cancelarAgendamento(
    agendamentoId: string,
    userId: string,
    userType: string,
    motivo?: string,
  ) {
    const ag = await this.prisma.agendamento.findUnique({
      where: { id: agendamentoId },
      include: { profissional: true, paciente: true },
    });

    if (!ag) throw new NotFoundException('Agendamento não encontrado');

    const horasAntecedencia = (Date.now() - ag.dataHora.getTime()) / (1000 * 60 * 60);

    let reembolso = 0;
    if (horasAntecedencia > 24) reembolso = 100;
    else if (horasAntecedencia >= 2) reembolso = 50;

    const novoStatus = 'CANCELADO';
    const canceladoPor = userType === 'PROFISSIONAL' ? 'PROFISSIONAL' : 'PACIENTE';

    await this.prisma.agendamento.update({
      where: { id: agendamentoId },
      data: {
        status: novoStatus,
        motivoCancelamento: motivo,
        canceladoPor,
      },
    });

    if (reembolso > 0 && ag.mpPaymentId && ag.formaPagamento === 'ONLINE') {
      // Dispara job de reembolso via Mercado Pago
    }

    return { message: 'Agendamento cancelado', reembolsoPercentual: reembolso };
  }

  async reagendar(
    agendamentoId: string,
    pacienteId: string,
    novaDataHora: Date,
  ) {
    const ag = await this.prisma.agendamento.findUnique({
      where: { id: agendamentoId },
    });

    if (!ag) throw new NotFoundException();
    if (ag.pacienteId !== pacienteId) throw new ForbiddenException();
    if (ag.status !== 'CONFIRMADO') throw new BadRequestException('Apenas agendamentos confirmados podem ser reagendados');

    const horasAntecedencia = (Date.now() - ag.dataHora.getTime()) / (1000 * 60 * 60);
    if (horasAntecedencia < 24) throw new BadRequestException('Reagendamento deve ser feito com 24h de antecedência');
    if (ag.reagendamentos >= 2) throw new BadRequestException('Limite de reagendamentos atingido');

    const updated = await this.prisma.agendamento.update({
      where: { id: agendamentoId },
      data: {
        dataHora: novaDataHora,
        reagendamentos: { increment: 1 },
      },
    });

    return updated;
  }

  async listarAgendamentos(profissionalId: string, filtros?: { status?: string; mes?: string }) {
    const where: any = { profissionalId };
    if (filtros?.status) where.status = filtros.status;
    if (filtros?.mes) {
      const [year, month] = filtros.mes.split('-').map(Number);
      const inicio = new Date(year, month - 1, 1);
      const fim = new Date(year, month, 0, 23, 59, 59);
      where.dataHora = { gte: inicio, lte: fim };
    }

    return this.prisma.agendamento.findMany({
      where,
      include: {
        paciente: { include: { user: { select: { nomeCompleto: true, emailEncrypted: true } } } },
      },
      orderBy: { dataHora: 'asc' },
    });
  }

  async listarAgendamentosPaciente(pacienteId: string, status?: string) {
    const where: any = { pacienteId };
    if (status) where.status = status;

    return this.prisma.agendamento.findMany({
      where,
      include: {
        profissional: {
          select: {
            slug: true,
            fotoPerfil: true,
            cidade: true,
            estado: true,
            user: { select: { nomeCompleto: true } },
          },
        },
      },
      orderBy: { dataHora: 'desc' },
    });
  }

  async marcarNoShow(agendamentoId: string, profissionalId: string) {
    const ag = await this.prisma.agendamento.findUnique({ where: { id: agendamentoId } });
    if (!ag || ag.profissionalId !== profissionalId) throw new ForbiddenException();

    return this.prisma.agendamento.update({
      where: { id: agendamentoId },
      data: { status: 'NO_SHOW' },
    });
  }

  async concluir(agendamentoId: string, profissionalId: string) {
    const ag = await this.prisma.agendamento.findUnique({ where: { id: agendamentoId } });
    if (!ag || ag.profissionalId !== profissionalId) throw new ForbiddenException();

    return this.prisma.agendamento.update({
      where: { id: agendamentoId },
      data: { status: 'CONCLUIDO' },
    });
  }
}