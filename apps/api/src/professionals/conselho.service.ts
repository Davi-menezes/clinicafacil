import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

export interface ConselhoValidacao {
  valido: boolean;
  status: 'VERIFICADO' | 'INVALIDO' | 'PENDENTE';
  mensagem?: string;
  dados?: {
    nome?: string;
    situacao?: string;
    especialidade?: string;
  };
}

@Injectable()
export class ConselhoService {
  private readonly logger = new Logger(ConselhoService.name);
  private readonly TIMEOUT_MS = 5000;

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async validar(numero: string, sigla: string, uf: string): Promise<ConselhoValidacao> {
    const siglaNormalizada = sigla.toUpperCase().trim();
    const numeroLimpo = numero.replace(/\D/g, '');
    const ufNormalizada = uf.toUpperCase().trim();

    if (numeroLimpo.length < 4) {
      return { valido: false, status: 'INVALIDO', mensagem: 'Número de registro inválido' };
    }

    if (!ufNormalizada || ufNormalizada.length !== 2) {
      return { valido: false, status: 'INVALIDO', mensagem: 'UF inválida' };
    }

    try {
      const resultado = await Promise.race([
        this.validarPorConselho(numeroLimpo, siglaNormalizada, ufNormalizada),
        this.timeout(),
      ]);
      return resultado;
    } catch (error: any) {
      this.logger.warn(
        `Validação automática falhou para ${siglaNormalizada} ${numeroLimpo}/${ufNormalizada}: ${error.message}`,
      );
      return {
        valido: false,
        status: 'PENDENTE',
        mensagem: 'Validação automática indisponível. Seu cadastro será analisado manualmente em até 48h.',
      };
    }
  }

  private timeout(): Promise<never> {
    return new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout na validação')), this.TIMEOUT_MS),
    );
  }

  private async validarPorConselho(
    numero: string,
    sigla: string,
    uf: string,
  ): Promise<ConselhoValidacao> {
    switch (sigla) {
      case 'CRM':
        return this.validarCRM(numero, uf);
      case 'CRP':
        return this.validarCRP(numero, uf);
      case 'CRN':
        return this.validarCRN(numero, uf);
      case 'CREFITO':
        return this.validarCREFITO(numero, uf);
      case 'COREN':
        return this.validarCOREN(numero, uf);
      case 'CRO':
        return this.validarCRO(numero, uf);
      case 'CRFa':
        return this.validarCRFa(numero, uf);
      default:
        return this.validarGenerico(numero, sigla, uf);
    }
  }

  private async validarCRM(numero: string, uf: string): Promise<ConselhoValidacao> {
    const url = `https://portal.cfm.org.br/api/medicos?uf=${uf}&numero=${numero}`;
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: any = await response.json();
      if (data?.situacao === 'Ativo' && data?.numero === numero) {
        return {
          valido: true,
          status: 'VERIFICADO',
          dados: { nome: data.nome, situacao: data.situacao, especialidade: data.especialidade },
        };
      }
      return { valido: false, status: 'INVALIDO' };
    } catch (e: any) {
      return this.fallbackValidacao(numero, 'CRM');
    }
  }

  private async validarCRP(numero: string, uf: string): Promise<ConselhoValidacao> {
    return this.fallbackValidacao(numero, 'CRP', uf);
  }

  private async validarCRN(numero: string, uf: string): Promise<ConselhoValidacao> {
    return this.fallbackValidacao(numero, 'CRN', uf);
  }

  private async validarCREFITO(numero: string, uf: string): Promise<ConselhoValidacao> {
    return this.fallbackValidacao(numero, 'CREFITO', uf);
  }

  private async validarCOREN(numero: string, uf: string): Promise<ConselhoValidacao> {
    return this.fallbackValidacao(numero, 'COREN', uf);
  }

  private async validarCRO(numero: string, uf: string): Promise<ConselhoValidacao> {
    return this.fallbackValidacao(numero, 'CRO', uf);
  }

  private async validarCRFa(numero: string, uf: string): Promise<ConselhoValidacao> {
    return this.fallbackValidacao(numero, 'CRFa', uf);
  }

  private async validarGenerico(numero: string, sigla: string, uf: string): Promise<ConselhoValidacao> {
    return {
      valido: false,
      status: 'PENDENTE',
      mensagem: `Conselho ${sigla} requer validação manual.`,
    };
  }

  private fallbackValidacao(numero: string, sigla: string, uf?: string): ConselhoValidacao {
    this.logger.log(`${sigla} API offline — marcando como pendente`);
    return {
      valido: false,
      status: 'PENDENTE',
      mensagem: 'Validação automática indisponível. Será revisada manualmente.',
    };
  }
}
