import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';
import { EmailService } from '../notifications/email.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private mpClient: any;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {
    try {
      const mercadopago = require('mercadopago');
      mercadopago.configurations.setAccessToken(this.configService.get<string>('MP_ACCESS_TOKEN') || '');
      this.mpClient = mercadopago;
    } catch {
      this.logger.warn('Mercado Pago SDK não disponível — pagamentos desabilitados');
    }
  }

  async criarPreferenciaPagamento(agendamentoId: string, returnUrl: string) {
    if (!this.mpClient) throw new BadRequestException('Pagamentos indisponíveis');

    const ag = await this.prisma.agendamento.findUnique({
      where: { id: agendamentoId },
      include: {
        profissional: { include: { user: { select: { nomeCompleto: true } } } },
        paciente: { include: { user: { select: { nomeCompleto: true, emailEncrypted: true } } } },
      },
    });

    if (!ag) throw new BadRequestException('Agendamento não encontrado');
    if (ag.status !== 'PENDENTE_PAGAMENTO') throw new BadRequestException('Agendamento não pendente de pagamento');

    const preference = {
      items: [
        {
          title: `Consulta com ${ag.profissional.user.nomeCompleto}`,
          description: `Consulta ${ag.tipo === 'ONLINE' ? 'Online' : 'Presencial'} em ${ag.profissional.cidade}/${ag.profissional.estado}`,
          quantity: 1,
          unit_price: Number(ag.valorTotal),
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: ag.paciente.user.nomeCompleto,
      },
      payment_methods: {
        excluded_payment_types: [{ id: 'ticket' }],
        installments: 1,
      },
      notification_url: `${this.configService.get<string>('FRONTEND_URL')}/webhooks/mercadopago`,
      external_reference: agendamentoId,
      back_urls: {
        success: `${returnUrl}?status=success&agendamento=${agendamentoId}`,
        pending: `${returnUrl}?status=pending&agendamento=${agendamentoId}`,
        failure: `${returnUrl}?status=failure&agendamento=${agendamentoId}`,
      },
      auto_return: 'approved',
    };

    const result = await this.mpClient.preferences.create(preference);
    return { preferenceId: result.body.id, initPoint: result.body.init_point };
  }

  async criarAssinaturaPlano(profissionalId: string, plano: 'PRO' | 'PRO_DESTAQUE') {
    if (!this.mpClient) throw new BadRequestException('Pagamentos indisponíveis');

    const prof = await this.prisma.profissional.findUnique({
      where: { id: profissionalId },
      include: { user: true },
    });

    if (!prof) throw new BadRequestException('Profissional não encontrado');

    const valor =
      plano === 'PRO_DESTAQUE'
        ? parseFloat(this.configService.get<string>('MP_PLANO_DESTAQUE_VALOR') || '39.90')
        : parseFloat(this.configService.get<string>('MP_PLANO_PRO_VALOR') || '79.90');

    const planoData = plano === 'PRO_DESTAQUE' ? 'PRO_DESTAQUE' : 'PRO';

    const subscription = await this.mpClient.subscriptions.create({
      payer: {
        email: prof.user.emailEncrypted,
      },
      frequency: 1,
      frequency_unit: 'months',
      idempotency: `${profissionalId}-${plano}-${Date.now()}`,
      back_url: `${this.configService.get<string>('FRONTEND_URL')}/dashboard/plano/sucesso`,
      reason: plano === 'PRO_DESTAQUE' ? 'Plano Pro + Destaque ClinicaFácil' : 'Plano Pro ClinicaFácil',
      external_reference: `${prof.id}-${plano}`,
      auto_recurring: {
        value: valor,
        currency_id: 'BRL',
        frequency: 1,
        frequency_unit: 'month',
      },
    });

    return { subscriptionId: subscription.body.id, initPoint: subscription.body.init_point };
  }

  async processarWebhook(payload: any, signature: string): Promise<void> {
    const webhookSecret = this.configService.get<string>('MP_WEBHOOK_SECRET');

    const expectedSignature = this.hashSignature(JSON.stringify(payload), webhookSecret || '');
    if (signature !== expectedSignature && process.env.NODE_ENV === 'production') {
      this.logger.warn('Assinatura de webhook inválida');
      return;
    }

    const { type, data } = payload;

    if (type === 'subscription_authorized' || type === 'subscription_preapproval') {
      const [profId, plano] = (payload.external_reference || '').split('-');
      if (profId && plano) {
        await this.prisma.profissional.update({
          where: { id: profId },
          data: {
            planoStatus: plano as any,
            planoDestaque: plano === 'PRO_DESTAQUE',
            mpSubscriptionId: data?.id || payload.id,
          },
        });
        this.logger.log(`Plano ${plano} ativado para profissional ${profId}`);
      }
    }

    if (type === 'payment' && data?.id) {
      const payment = await this.mpClient.payment.findById(data.id);
      const agId = payment.body.external_reference;

      if (payment.body.status === 'approved') {
        await this.prisma.agendamento.update({
          where: { id: agId },
          data: { status: 'CONFIRMADO', mpPaymentId: String(data.id) },
        });
        this.logger.log(`Pagamento aprovado para agendamento ${agId}`);
      } else if (payment.body.status === 'rejected') {
        await this.prisma.agendamento.update({
          where: { id: agId },
          data: { status: 'CANCELADO' },
        });
        this.logger.warn(`Pagamento rejeitado para agendamento ${agId}`);
      }
    }
  }

  async reembolsar(agendamentoId: string, valor: number): Promise<void> {
    if (!this.mpClient) return;

    const ag = await this.prisma.agendamento.findUnique({ where: { id: agendamentoId } });
    if (!ag?.mpPaymentId) return;

    try {
      await this.mpClient.refund.create({
        payment_id: Number(ag.mpPaymentId),
        amount: valor,
      });
      this.logger.log(`Reembolso de ${valor} processado para agendamento ${agendamentoId}`);
    } catch (error: any) {
      this.logger.error(`Erro ao reembolsar: ${error.message}`);
    }
  }

  private hashSignature(payload: string, secret: string): string {
    const crypto = require('crypto');
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }
}