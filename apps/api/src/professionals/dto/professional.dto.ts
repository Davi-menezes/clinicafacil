import { IsString, IsOptional, IsNumber, IsBoolean, IsArray, MinLength, MaxLength, IsEnum } from 'class-validator';

export class UpdateProfissionalDto {
  @IsOptional()
  @IsString()
  @MaxLength(1500)
  descricao?: string;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsNumber()
  precoMin?: number;

  @IsOptional()
  @IsNumber()
  precoMax?: number;

  @IsOptional()
  @IsNumber()
  tempConsultaMinutos?: number;

  @IsOptional()
  @IsNumber()
  bufferMinutos?: number;

  @IsOptional()
  @IsBoolean()
  atendeOnline?: boolean;

  @IsOptional()
  @IsBoolean()
  atendeDomicilio?: boolean;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  enderecoCompleto?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  formacaoAcademica?: string;

  @IsOptional()
  @IsString()
  certificacoes?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  idiomasAtendimento?: string[];

  @IsOptional()
  @IsString()
  sitePessoal?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  cbo?: string;

  @IsOptional()
  @IsNumber()
  maxAgendamentosDia?: number;

  @IsOptional()
  @IsNumber()
  antecedenciaMinHoras?: number;

  @IsOptional()
  @IsNumber()
  janelaAgendamentoDias?: number;

  @IsOptional()
  @IsNumber()
  anosExperiencia?: number;
}

export class AddEspecialidadeDto {
  @IsString()
  especialidade!: string;
}

export class AddPlanoSaudeDto {
  @IsString()
  planoSaude!: string;
}

export class UploadFileDto {
  @IsString()
  fieldname!: string;
}