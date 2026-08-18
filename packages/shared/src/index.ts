export enum TipoUsuario {
  PROFISSIONAL = 'PROFISSIONAL',
  PACIENTE = 'PACIENTE',
  ADMIN = 'ADMIN',
}

export enum EspecialidadeEnum {
  Psicologia = 'Psicologia',
  Psiquiatria = 'Psiquiatria',
  Nutricao = 'Nutrição',
  Fisioterapia = 'Fisioterapia',
  Fonoaudiologia = 'Fonoaudiologia',
  TerapiaOcupacional = 'Terapia Ocupacional',
  EducacaoFisica = 'Educação Física',
  Enfermagem = 'Enfermagem',
  Odontologia = 'Odontologia',
  Dermatologia = 'Dermatologia',
  Ginecologia = 'Ginecologia',
  Cardiologia = 'Cardiologia',
  Ortopedia = 'Ortopedia',
  Neurologia = 'Neurologia',
  Endocrinologia = 'Endocrinologia',
  Pediatria = 'Pediatria',
  ClinicaGeral = 'Clínica Geral',
  Acupuntura = 'Acupuntura',
  Osteopatia = 'Osteopatia',
  Homeopatia = 'Homeopatia',
  Outros = 'Outros',
}

export enum StatusAgendamento {
  PENDENTE_PAGAMENTO = 'PENDENTE_PAGAMENTO',
  CONFIRMADO = 'CONFIRMADO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
  NO_SHOW = 'NO_SHOW',
  REAGENDADO = 'REAGENDADO',
}

export enum StatusPlano {
  GRATUITO = 'GRATUITO',
  PRO = 'PRO',
  PRO_DESTAQUE = 'PRO_DESTAQUE',
}

export enum ConselhoSigla {
  CRM = 'CRM',
  CRP = 'CRP',
  CRN = 'CRN',
  CREFITO = 'CREFITO',
  CRFa = 'CRFa',
  COREN = 'COREN',
  CRO = 'CRO',
}

export interface UserPublic {
  id: string;
  tipo: TipoUsuario;
  nomeCompleto: string;
  verificado: boolean;
}

export interface ProfissionalCard {
  id: string;
  slug: string;
  nomeCompleto: string;
  fotoPerfil: string | null;
  especialidadePrincipal: EspecialidadeEnum;
  estado: string;
  cidade: string;
  preco: number | null;
  precoMin: number | null;
  precoMax: number | null;
  atendeOnline: boolean;
  planoDestaque: boolean;
  planoStatus: StatusPlano;
  conselhoVerificado: boolean;
  score: number;
  mediaEstrelas: number;
  totalAvaliacoes: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  pagina: number;
  paginas: number;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  requiresTwoFactor?: boolean;
  userId?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}