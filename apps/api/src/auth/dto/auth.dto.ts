import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  senha!: string;

  ip?: string;
}

const EspecialidadesValidas = [
  'Psicologia', 'Psiquiatria', 'Nutrição', 'Nutricao',
  'Fisioterapia', 'Fonoaudiologia', 'Terapia Ocupacional',
  'Educação Física', 'Educacao Fisica', 'Enfermagem',
  'Odontologia', 'Dermatologia', 'Ginecologia', 'Cardiologia',
  'Ortopedia', 'Neurologia', 'Endocrinologia', 'Pediatria',
  'Clínica Geral', 'Clinica Geral', 'Acupuntura',
  'Osteopatia', 'Homeopatia', 'Outros',
];

const ConselhosValidos = [
  'CRM', 'CRP', 'CRN', 'CREFITO', 'CRFa', 'COREN', 'CRO',
  'CFO', 'CFF', 'Crefono', 'Crefito',
];

export class CadastroProfissionalDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  nomeCompleto!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  senha!: string;

  @IsString()
  tipoPessoa!: 'FISICA' | 'JURIDICA';

  @IsString()
  especialidadePrincipal!: string;

  @IsString()
  @MinLength(4)
  conselhoNumero!: string;

  @IsString()
  conselhoSigla!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  conselhoUf!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(2)
  estado!: string;

  @IsString()
  @MinLength(2)
  cidade!: string;

  @IsOptional()
  @IsString()
  bairro?: string;

  @IsOptional()
  @IsString()
  enderecoCompleto?: string;

  @IsOptional()
  @IsBoolean()
  atendeOnline?: boolean;

  @IsOptional()
  @IsBoolean()
  atendeDomicilio?: boolean;

  @IsOptional()
  @IsNumber()
  preco?: number;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsBoolean()
  lgpdConsent!: boolean;
}

export class CadastroPacienteDto {
  @IsString()
  @MinLength(3)
  @MaxLength(120)
  nomeCompleto!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  senha!: string;

  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @IsOptional()
  @IsString()
  telefone?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  estado?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  planosSaude?: string[];

  @IsBoolean()
  lgpdConsent!: boolean;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken!: string;
}

export class VerifyEmailDto {
  @IsString()
  token!: string;
}

export class SetupTotpDto {
  @IsString()
  token!: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(8)
  senhaAtual!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  senhaNova!: string;
}

export class ForgotPasswordDto {
  @IsEmail()
  email!: string;
}

export class ResetPasswordDto {
  @IsString()
  token!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  novaSenha!: string;
}