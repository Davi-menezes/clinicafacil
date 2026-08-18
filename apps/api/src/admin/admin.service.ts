import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(private readonly prisma: PrismaService) {}

  async listarUsuarios(filtros: {
    tipo?: string;
    pagina?: number;
    tamanhoPagina?: number;
    busca?: string;
  }) {
    const page = filtros.pagina || 1;
    const pageSize = Math.min(filtros.tamanhoPagina || 20, 50);

    const where: any = {};
    if (filtros.tipo) where.tipo = filtros.tipo;

    if (filtros.busca) {
      where.OR = [
        { nomeCompleto: { contains: filtros.busca } },
        { emailHash: { contains: filtros.busca } },
      ];
    }

    const [usuarios, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          tipo: true,
          nomeCompleto: true,
          emailHash: true,
          verificado: true,
          lgpdConsent: true,
          totpAtivo: true,
          ultimoAcessoEm: true,
          criadoEm: true,
          atualizadoEm: true,
          profissional: {
            select: {
              id: true,
              slug: true,
              especialidadePrincipal: true,
              conselhoSigla: true,
              conselhoNumero: true,
              conselhoVerificado: true,
              pendenteValidacaoManual: true,
              ativo: true,
              planoStatus: true,
              planoDestaque: true,
            },
          },
          paciente: {
            select: {
              id: true,
              telefone: true,
              dataNasc: true,
              estado: true,
              cidade: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { criadoEm: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);

    return { usuarios, total, pagina: page, paginas: Math.ceil(total / pageSize) };
  }

  async resumoFinanceiro(mes?: string) {
    const where: any = {};
    if (mes) {
      const [year, month] = mes.split('-').map(Number);
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 0, 23, 59, 59, 999);
      where.criadoEm = { gte: start, lte: end };
    }

    const [statusCounts, receita, reembolsos, assinaturas] = await Promise.all([
      this.prisma.agendamento.groupBy({
        by: ['status'],
        where,
        _count: true,
      }),
      this.prisma.agendamento.aggregate({
        where: { ...where, status: { in: ['CONFIRMADO', 'CONCLUIDO'] } },
        _sum: { valorTotal: true, valorPlataforma: true, valorProfissional: true },
      }),
      this.prisma.agendamento.aggregate({
        where: { ...where, status: 'CANCELADO' },
        _sum: { valorPlataforma: true },
      }),
      this.prisma.profissional.count({
        where: { planoStatus: { in: ['ASSINANTE', 'TRIAL'] } },
      }),
    ]);

    const agendamentos = statusCounts.reduce(
      (acc, s) => ({ ...acc, [s.status]: s._count }),
      {} as Record<string, number>,
    );

    return {
      agendamentos,
      receitaTotalGMV: Number(receita._sum.valorTotal || 0),
      receitaPlataforma: Number(receita._sum.valorPlataforma || 0),
      receitaProfissionais: Number(receita._sum.valorProfissional || 0),
      reembolsos: Number(reembolsos._sum.valorPlataforma || 0),
      assinaturasAtivas: assinaturas,
    };
  }

  async logsAuditoria(pagina = 1, tamanhoPagina = 50) {
    const pageSize = Math.min(tamanhoPagina, 100);
    const skip = (pagina - 1) * pageSize;

    const [logs, total] = await Promise.all([
      this.prisma.logAuditoria.findMany({
        include: {
          user: { select: { nomeCompleto: true, tipo: true } },
        },
        orderBy: { criadoEm: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.logAuditoria.count(),
    ]);

    return {
      logs,
      total,
      pagina,
      tamanhoPagina: pageSize,
      paginas: Math.ceil(total / pageSize),
    };
  }

  async moderarAvaliacao(avaliacaoId: string, acao: 'aprovar' | 'rejeitar') {
    const avaliacao = await this.prisma.avaliacao.findUnique({ where: { id: avaliacaoId } });
    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');

    if (acao === 'aprovar') {
      return this.prisma.avaliacao.update({
        where: { id: avaliacaoId },
        data: { aprovada: true, denunciada: false },
      });
    }

    return this.prisma.avaliacao.delete({ where: { id: avaliacaoId } });
  }

  async validarConselho(profissionalId: string, valido: 'aprovar' | 'rejeitar') {
    const prof = await this.prisma.profissional.findUnique({
      where: { id: profissionalId },
      include: { user: { select: { nomeCompleto: true } } },
    });
    if (!prof) throw new NotFoundException('Profissional não encontrado');

    return this.prisma.profissional.update({
      where: { id: profissionalId },
      data: {
        conselhoVerificado: valido === 'aprovar',
        pendenteValidacaoManual: false,
      },
    });
  }

  async getConfiguracoes() {
    return {
      planoBasicoPreco: Number(process.env.PLANO_BASICO_PRECO || '0'),
      planoPremiumPreco: Number(process.env.PLANO_PREMIUM_PRECO || '0'),
      planoEmpresarialPreco: Number(process.env.PLANO_EMPRESARIAL_PRECO || '0'),
      taxaPlataformaPercentual: Number(process.env.TAXA_PLATAFORMA_PERCENTUAL || '0'),
      taxaMinima: Number(process.env.TAXA_MINIMA || '0'),
      versaoApi: process.env.API_VERSION || '1.0.0',
    };
  }

  async updateConfiguracoes(_data: any) {
    return {
      mensagem: 'Configurações são gerenciadas via variáveis de ambiente. Altere o .env e reinicie a aplicação.',
    };
  }

  async getPainelAdmin() {
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);

    const [totalUsuarios, totalProfissionais, totalPacientes, totalAgendamentos,
      validacoesPendentes, receita30dias] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.profissional.count(),
      this.prisma.paciente.count(),
      this.prisma.agendamento.count(),
      this.prisma.profissional.count({ where: { pendenteValidacaoManual: true } }),
      this.prisma.agendamento.aggregate({
        where: {
          criadoEm: { gte: trintaDiasAtras },
          status: { in: ['CONFIRMADO', 'CONCLUIDO'] },
        },
        _sum: { valorTotal: true, valorPlataforma: true },
      }),
    ]);

    return {
      totalUsuarios,
      totalProfissionais,
      totalPacientes,
      totalAgendamentos,
      validacoesConselhoPendentes: validacoesPendentes,
      receitaUltimos30Dias: {
        totalGMV: Number(receita30dias._sum.valorTotal || 0),
        plataforma: Number(receita30dias._sum.valorPlataforma || 0),
      },
    };
  }
}