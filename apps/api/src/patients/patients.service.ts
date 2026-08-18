import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(pacienteId: string, userId: string) {
    if (pacienteId !== userId) throw new ForbiddenException();
    return this.prisma.paciente.findUnique({
      where: { id: pacienteId },
      include: {
        user: { select: { nomeCompleto: true, emailEncrypted: true, verificado: true } },
        planosUsuario: true,
        favoritos: {
          include: {
            profissional: {
              include: {
                user: { select: { nomeCompleto: true } },
                avaliacoes: {
                  where: { aprovada: true },
                  select: { notaGeral: true },
                },
              },
            },
          },
        },
      },
    });
  }

  async updateProfile(pacienteId: string, userId: string, data: any) {
    if (pacienteId !== userId) throw new ForbiddenException();

    return this.prisma.paciente.update({
      where: { id: pacienteId },
      data,
    });
  }

  async adicionarFavorito(pacienteId: string, profissionalId: string, userId: string) {
    if (pacienteId !== userId) throw new ForbiddenException();

    return this.prisma.favorito.create({
      data: { pacienteId, profissionalId },
    }).catch(() => ({ message: 'Já está nos favoritos' }));
  }

  async removerFavorito(pacienteId: string, profissionalId: string, userId: string) {
    if (pacienteId !== userId) throw new ForbiddenException();

    return this.prisma.favorito.deleteMany({
      where: { pacienteId, profissionalId },
    });
  }

  async downloadDados(userId: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { userId } });
    if (!paciente) throw new NotFoundException();

    const [perfil, agendamentos, avaliacoes] = await Promise.all([
      this.prisma.paciente.findUnique({ where: { id: paciente.id } }),
      this.prisma.agendamento.findMany({
        where: { pacienteId: paciente.id },
        orderBy: { dataHora: 'desc' },
      }),
      this.prisma.avaliacao.findMany({
        where: { pacienteId: paciente.id },
        orderBy: { criadoEm: 'desc' },
      }),
    ]);

    return { perfil, agendamentos, avaliacoes };
  }

  async deletarConta(userId: string) {
    const paciente = await this.prisma.paciente.findUnique({ where: { userId } });
    if (!paciente) throw new NotFoundException();

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        emailEncrypted: `deleted_${Date.now()}@anonymized.local`,
        emailHash: `deleted_${Date.now()}`,
        senhaHash: '',
        nomeCompleto: 'Usuário Deletado',
        verificado: false,
      },
    });

    return { message: 'Conta anonimizada com sucesso' };
  }
}