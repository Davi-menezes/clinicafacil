import { IsString, IsNumber, IsDateString, IsOptional, IsEnum, Min, Max } from 'class-validator';

export class CriarAgendamentoDto {
  @IsString()
  profissionalId!: string;

  @IsDateString()
  dataHora!: string;

  @IsString()
  tipo!: string;

  @IsString()
  formaPagamento!: string;
}

export class ReagendarDto {
  @IsDateString()
  novaDataHora!: string;
}

export class CancelarDto {
  @IsOptional()
  @IsString()
  motivo?: string;
}

export class ListarAgendamentosDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  mes?: string;
}

export class DisponibilidadeQueryDto {
  @IsString()
  mes!: string;
}