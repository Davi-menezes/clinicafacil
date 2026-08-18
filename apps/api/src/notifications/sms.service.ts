import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  private twilioClient: any = null;

  constructor(private readonly configService: ConfigService) {
    try {
      const twilio = require('twilio');
      const sid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
      const token = this.configService.get<string>('TWILIO_AUTH_TOKEN');
      if (sid && token && sid !== 'AC...') {
        this.twilioClient = twilio(sid, token);
      }
    } catch {
      this.logger.warn('SDK Twilio não disponível — SMS desativados');
    }
  }

  async sendSms(to: string, message: string): Promise<void> {
    if (!this.twilioClient) {
      this.logger.warn(`SMS não enviado (sem client Twilio) para ${to}: ${message}`);
      return;
    }
    try {
      await this.twilioClient.messages.create({
        body: message,
        from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
        to,
      });
      this.logger.log(`SMS enviado para ${to}`);
    } catch (error: any) {
      this.logger.error(`Falha ao enviar SMS para ${to}: ${error.message}`);
    }
  }

  async sendAppointmentReminder(telefone: string, nomeProfissional: string, dataHora: string): Promise<void> {
    await this.sendSms(
      telefone,
      `ClinicaFácil: Lembrete! Sua consulta com ${nomeProfissional} é em ${dataHora}. Cancele se necessário pelo app.`,
    );
  }
}