-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "emailEncrypted" TEXT NOT NULL,
    "emailHash" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "totpSecret" TEXT,
    "totpAtivo" BOOLEAN NOT NULL DEFAULT false,
    "lgpdConsent" BOOLEAN NOT NULL DEFAULT false,
    "ultimoAcessoEm" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "familia" TEXT NOT NULL,
    "usado" BOOLEAN NOT NULL DEFAULT false,
    "expiraEm" DATETIME NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profissional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "especialidadePrincipal" TEXT NOT NULL,
    "conselhoNumero" TEXT NOT NULL,
    "conselhoSigla" TEXT NOT NULL,
    "conselhoUf" TEXT NOT NULL,
    "conselhoVerificado" BOOLEAN NOT NULL DEFAULT false,
    "pendenteValidacaoManual" BOOLEAN NOT NULL DEFAULT false,
    "fotoPerfil" TEXT,
    "descricao" TEXT,
    "preco" REAL,
    "precoMin" REAL,
    "precoMax" REAL,
    "tempConsultaMinutos" INTEGER NOT NULL DEFAULT 60,
    "bufferMinutos" INTEGER NOT NULL DEFAULT 0,
    "atendeOnline" BOOLEAN NOT NULL DEFAULT false,
    "atendeDomicilio" BOOLEAN NOT NULL DEFAULT false,
    "estado" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT,
    "enderecoCompleto" TEXT,
    "lat" REAL,
    "lng" REAL,
    "score" REAL NOT NULL DEFAULT 0,
    "planoStatus" TEXT NOT NULL DEFAULT 'GRATUITO',
    "planoDestaque" BOOLEAN NOT NULL DEFAULT false,
    "mpSubscriptionId" TEXT,
    "planoVencimento" DATETIME,
    "ultimoAcessoEm" DATETIME,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "anosExperiencia" REAL NOT NULL DEFAULT 0,
    "formacaoAcademica" TEXT,
    "certificacoes" TEXT,
    "idiomasAtendimento" TEXT NOT NULL DEFAULT '',
    "telefone" TEXT,
    "sitePessoal" TEXT,
    "linkedin" TEXT,
    "cbo" TEXT,
    "maxAgendamentosDia" INTEGER NOT NULL DEFAULT 20,
    "antecedenciaMinHoras" INTEGER NOT NULL DEFAULT 2,
    "janelaAgendamentoDias" INTEGER NOT NULL DEFAULT 30,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Profissional_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EspecialidadeProfissional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profissionalId" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    CONSTRAINT "EspecialidadeProfissional_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlanoSaudeProfissional" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profissionalId" TEXT NOT NULL,
    "planoSaude" TEXT NOT NULL,
    CONSTRAINT "PlanoSaudeProfissional_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlanoSaudePaciente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pacienteId" TEXT NOT NULL,
    "planoSaude" TEXT NOT NULL,
    CONSTRAINT "PlanoSaudePaciente_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "fotoPerfil" TEXT,
    "telefone" TEXT,
    "dataNasc" DATETIME,
    "cpfEncrypted" TEXT,
    "cpfHash" TEXT,
    "estado" TEXT,
    "cidade" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Paciente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DisponibilidadeSemanal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profissionalId" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    CONSTRAINT "DisponibilidadeSemanal_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ExcecaoAgenda" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profissionalId" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "motivo" TEXT,
    "tipo" TEXT NOT NULL,
    "horaInicio" TEXT,
    "horaFim" TEXT,
    CONSTRAINT "ExcecaoAgenda_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profissionalId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "dataHora" DATETIME NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "valorTotal" REAL NOT NULL,
    "valorPlataforma" REAL NOT NULL,
    "valorProfissional" REAL NOT NULL,
    "formaPagamento" TEXT,
    "mpPaymentId" TEXT,
    "motivoCancelamento" TEXT,
    "canceladoPor" TEXT,
    "reagendamentos" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Agendamento_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Avaliacao" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pacienteId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "agendamentoId" TEXT NOT NULL,
    "notaGeral" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "tipoConsulta" TEXT NOT NULL,
    "problemaResolvido" TEXT,
    "recomendaria" BOOLEAN,
    "resposta" TEXT,
    "respostaEditadaEm" DATETIME,
    "denunciada" BOOLEAN NOT NULL DEFAULT false,
    "aprovada" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "Avaliacao_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Avaliacao_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NotaCategoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "avaliacaoId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    CONSTRAINT "NotaCategoria_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "Avaliacao" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FotoConsultorio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "profissionalId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FotoConsultorio_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pacienteId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorito_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorito_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DocumentoPaciente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "pacienteId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "nomeDocumento" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentoPaciente_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DocumentoPaciente_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "Profissional" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LogAuditoria" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "acao" TEXT NOT NULL,
    "entidade" TEXT,
    "entidadeId" TEXT,
    "detalhes" TEXT,
    "ip" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LogAuditoria_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailHash_key" ON "User"("emailHash");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_tokenHash_key" ON "RefreshToken"("tokenHash");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_familia_idx" ON "RefreshToken"("familia");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_userId_key" ON "Profissional"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Profissional_slug_key" ON "Profissional"("slug");

-- CreateIndex
CREATE INDEX "Profissional_especialidadePrincipal_idx" ON "Profissional"("especialidadePrincipal");

-- CreateIndex
CREATE INDEX "Profissional_estado_cidade_idx" ON "Profissional"("estado", "cidade");

-- CreateIndex
CREATE INDEX "Profissional_score_idx" ON "Profissional"("score");

-- CreateIndex
CREATE INDEX "Profissional_planoDestaque_planoStatus_idx" ON "Profissional"("planoDestaque", "planoStatus");

-- CreateIndex
CREATE INDEX "Profissional_ativo_idx" ON "Profissional"("ativo");

-- CreateIndex
CREATE UNIQUE INDEX "EspecialidadeProfissional_profissionalId_especialidade_key" ON "EspecialidadeProfissional"("profissionalId", "especialidade");

-- CreateIndex
CREATE UNIQUE INDEX "PlanoSaudeProfissional_profissionalId_planoSaude_key" ON "PlanoSaudeProfissional"("profissionalId", "planoSaude");

-- CreateIndex
CREATE UNIQUE INDEX "PlanoSaudePaciente_pacienteId_planoSaude_key" ON "PlanoSaudePaciente"("pacienteId", "planoSaude");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_userId_key" ON "Paciente"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DisponibilidadeSemanal_profissionalId_diaSemana_horaInicio_horaFim_key" ON "DisponibilidadeSemanal"("profissionalId", "diaSemana", "horaInicio", "horaFim");

-- CreateIndex
CREATE UNIQUE INDEX "ExcecaoAgenda_profissionalId_data_key" ON "ExcecaoAgenda"("profissionalId", "data");

-- CreateIndex
CREATE INDEX "Agendamento_profissionalId_dataHora_idx" ON "Agendamento"("profissionalId", "dataHora");

-- CreateIndex
CREATE INDEX "Agendamento_pacienteId_idx" ON "Agendamento"("pacienteId");

-- CreateIndex
CREATE INDEX "Agendamento_status_idx" ON "Agendamento"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_agendamentoId_key" ON "Avaliacao"("agendamentoId");

-- CreateIndex
CREATE INDEX "Avaliacao_profissionalId_criadoEm_idx" ON "Avaliacao"("profissionalId", "criadoEm");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_pacienteId_profissionalId_key" ON "Avaliacao"("pacienteId", "profissionalId");

-- CreateIndex
CREATE UNIQUE INDEX "NotaCategoria_avaliacaoId_categoria_key" ON "NotaCategoria"("avaliacaoId", "categoria");

-- CreateIndex
CREATE UNIQUE INDEX "Favorito_pacienteId_profissionalId_key" ON "Favorito"("pacienteId", "profissionalId");

-- CreateIndex
CREATE INDEX "LogAuditoria_userId_idx" ON "LogAuditoria"("userId");

-- CreateIndex
CREATE INDEX "LogAuditoria_acao_criadoEm_idx" ON "LogAuditoria"("acao", "criadoEm");
