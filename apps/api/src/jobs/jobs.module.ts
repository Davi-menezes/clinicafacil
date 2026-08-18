import { Module, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { BullMQService } from '../config/bullmq.service';
import { PrismaService } from '../database/prisma.service';
import { DatabaseModule } from '../database/database.module';
import { EmailService } from '../notifications/email.service';
import { SmsService } from '../notifications/sms.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { ScoreService } from '../professionals/score.service';
import { ProfessionalsModule } from '../professionals/professionals.module';
import { PaymentsService } from '../payments/payments.service';
import { PaymentsModule } from '../payments/payments.module';
import { format } from 'date-fns';

@Injectable()
export class JobsProcessor implements OnModuleInit {
  private readonly logger = new Logger(JobsProcessor.name);

  constructor(
    private readonly bullmqService: BullMQService,
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly smsService: SmsService,
    private readonly scoreService: ScoreService,
    private readonly paymentsService: PaymentsService,
  ) {}

  onModuleInit() {
    this.registerJobs();
  }

  private registerJobs() {
    this.bullmqService.registerWorker('score', async (job: any) => {
      const { profissionalId } = job.data;
      await this.scoreService.recalcularEAtualizar(profissionalId);
      this.logger.log(`Score recalculado para profissional ${profissionalId}`);
    });

    this.bullmqService.registerWorker('lembrete-email', async (job: any) => {
      const { agendamentoId, tipo } = job.data;
      const ag = await this.prisma.agendamento.findUnique({
        where: { id: agendamentoId },
        include: {
          paciente: { include: { user: true } },
          profissional: { include: { user: true } },
        },
      });
      if (!ag || ag.status !== 'CONFIRMADO') return;

      const dataFormatada = format(new Date(ag.dataHora), "dd/MM/yyyy 'às' HH:mm");
      await this.emailService.sendReminder(
        'paciente@placeholder',
        ag.paciente.user.nomeCompleto,
        dataFormatada,
      );
      this.logger.log(`Lembrete ${tipo} enviado para agendamento ${agendamentoId}`);
    });

    this.bullmqService.registerWorker('lembrete-sms', async (job: any) => {
      const { agendamentoId, tipo } = job.data;
      const ag = await this.prisma.agendamento.findUnique({
        where: { id: agendamentoId },
        include: { paciente: { include: { user: true } }, profissional: { include: { user: true } } },
      });
      if (!ag || ag.status !== 'CONFIRMADO' || !ag.paciente.telefone) return;

      if (tipo === '24h') {
        const dataFormatada = format(new Date(ag.dataHora), "dd/MM/yyyy 'às' HH:mm");
        await this.smsService.sendAppointmentReminder(
          ag.paciente.telefone,
          ag.profissional.user.nomeCompleto,
          dataFormatada,
        );
        this.logger.log(`SMS 24h enviado para ${ag.paciente.telefone}`);
      }
    });

    this.bullmqService.registerWorker('reembolso', async (job: any) => {
      const { agendamentoId, valor } = job.data;
      await this.paymentsService.reembolsar(agendamentoId, valor);
      this.logger.log(`Reembolso processado: R$${valor} para agendamento ${agendamentoId}`);
    });

    this.bullmqService.registerWorker('email-profissional', async (job: any) => {
      const { agendamentoId } = job.data;
      const ag = await this.prisma.agendamento.findUnique({
        where: { id: agendamentoId },
        include: { paciente: { include: { user: true } }, profissional: { include: { user: true } } },
      });
      if (!ag) return;

      const dataFormatada = format(new Date(ag.dataHora), "dd/MM/yyyy 'às' HH:mm");
      await this.emailService.sendAppointmentConfirmation(
        'profissional@placeholder',
        {
          nomePaciente: ag.paciente.user.nomeCompleto,
          nomeProfissional: ag.profissional.user.nomeCompleto,
          especialidade: ag.profissional.especialidadePrincipal,
          dataHora: dataFormatada,
          endereco: ag.profissional.cidade + '/' + ag.profissional.estado,
          tipo: ag.tipo,
        },
      );
      this.logger.log(`Email de confirmação para profissional do agendamento ${agendamentoId}`);
    });

    this.logger.log('Workers BullMQ registrados: score, lembrete-email, lembrete-sms, reembolso, email-profissional');
  }
}

@Module({
  imports: [DatabaseModule, NotificationsModule, ProfessionalsModule, PaymentsModule],
  providers: [JobsProcessor],
})
export class JobsModule {}