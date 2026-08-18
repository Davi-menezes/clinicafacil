import { Controller, Post, Body, Param, Get, Query, UseGuards, HttpCode, HttpStatus, Headers, RawBodyRequest, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../database/prisma.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('pagamentos')
export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('agendamento/:id/checkout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async checkoutAgendamento(
    @Param('id') agendamentoId: string,
    @Body() body: { returnUrl: string },
    @CurrentUser() user: any,
  ) {
    const ag = await this.prisma.agendamento.findUnique({
      where: { id: agendamentoId },
      include: { paciente: true },
    });
    if (!ag) throw new Error('Agendamento não encontrado');
    if (ag.paciente.userId !== user.sub) throw new Error('Acesso negado');

    return this.paymentsService.criarPreferenciaPagamento(agendamentoId, body.returnUrl);
  }

  @Post('plano/:plano/assinar')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROFISSIONAL')
  @HttpCode(HttpStatus.OK)
  async assinarPlano(@Param('plano') plano: string, @CurrentUser() user: any): Promise<any> {    const prof = await this.prisma.profissional.findUnique({ where: { userId: user.sub } });
    if (!prof) throw new Error('Profissional não encontrado');
    if (plano !== 'PRO' && plano !== 'PRO_DESTAQUE') throw new Error('Plano inválido');

    return this.paymentsService.criarAssinaturaPlano(prof.id, plano as 'PRO' | 'PRO_DESTAQUE');
  }

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async webhook(@Body() payload: any, @Headers('x-signature') signature: string): Promise<any> {    return this.paymentsService.processarWebhook(payload, signature || '');
  }
}