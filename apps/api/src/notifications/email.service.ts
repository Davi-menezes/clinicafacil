import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'localhost'),
      port: this.configService.get<number>('SMTP_PORT', 1025),
      secure: false,
      auth:
        this.configService.get<string>('SMTP_USER')
          ? {
              user: this.configService.get<string>('SMTP_USER'),
              pass: this.configService.get<string>('SMTP_PASS'),
            }
          : undefined,
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_FROM', 'noreply@clinicafacil.com.br'),
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      this.logger.log(`Email enviado para ${options.to}: ${options.subject}`);
    } catch (error: any) {
      this.logger.error(`Falha ao enviar email para ${options.to}: ${error.message}`);
    }
  }

  async sendVerificationEmail(email: string, token: string, nome: string): Promise<void> {
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');
    const link = `${frontendUrl}/auth/verify?token=${token}`;
    await this.sendEmail({
      to: email,
      subject: 'Verifique seu email — ClinicaFácil',
      html: `
        <h1>Bem-vindo à ClinicaFácil, ${nome}!</h1>
        <p>Clique no link abaixo para ativar sua conta:</p>
        <a href="${link}" style="padding:12px 24px;background:#16a34a;color:#fff;border-radius:8px;text-decoration:none;display:inline-block;">Verificar Email</a>
        <p>Este link expira em 15 minutos.</p>
        <p>Se você não criou esta conta, ignore este email.</p>
      `,
    });
  }

  async sendAppointmentConfirmation(
    email: string,
    data: {
      nomePaciente: string;
      nomeProfissional: string;
      especialidade: string;
      dataHora: string;
      endereco: string;
      tipo: string;
    },
  ): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: `Consulta confirmada — ${data.dataHora}`,
      html: `
        <h1>Consulta Confirmada!</h1>
        <p>Olá, ${data.nomePaciente}!</p>
        <p>Sua consulta com <strong>${data.nomeProfissional}</strong> (${data.especialidade}) está confirmada.</p>
        <ul>
          <li><strong>Data/Hora:</strong> ${data.dataHora}</li>
          <li><strong>Tipo:</strong> ${data.tipo === 'ONLINE' ? 'Online' : 'Presencial'}</li>
          <li><strong>Local:</strong> ${data.endereco}</li>
        </ul>
        <p>Em caso de imprevisto, cancele com pelo menos 2h de antecedência.</p>
      `,
    });
  }

  async sendReminder(email: string, nome: string, dataHora: string): Promise<void> {
    await this.sendEmail({
      to: email,
      subject: `Lembrete: sua consulta é amanhã às ${dataHora}`,
      html: `
        <h1>Lembrete de Consulta</h1>
        <p>Olá, ${nome}!</p>
        <p>Você tem uma consulta agendada para <strong>${dataHora}</strong>.</p>
        <p>Se precisar cancelar ou reagendar, acesse seu painel.</p>
      `,
    });
  }
}