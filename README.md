# ClinicaFácil

Marketplace de agendamento para profissionais de saúde independentes.

## Estrutura do Projeto

```
ClinicaFacil/
├── apps/
│   ├── web/                    # Frontend React (SSR/Next.js)
│   │   ├── app/                # Next.js App Router (SSR para SEO)
│   │   ├── components/         # Componentes reutilizáveis
│   │   ├── lib/                # Utilities, hooks, API client
│   │   ├── store/              # Zustand stores
│   │   └── styles/             # Tailwind + custom CSS
│   └── api/                    # Backend NestJS
│       ├── prisma/             # Schema, migrations, seeds
│       ├── src/
│       │   ├── auth/           # Módulo de autenticação
│       │   ├── professionals/  # Módulo profissionais
│       │   ├── patients/       # Módulo pacientes
│       │   ├── appointments/   # Módulo agendamento
│       │   ├── payments/       # Módulo pagamento (Mercado Pago)
│       │   ├── reviews/        # Módulo avaliações
│       │   ├── dashboard/      # Módulo dashboards
│       │   ├── admin/          # Módulo admin
│       │   ├── search/         # Módulo busca (PostGIS + pg_trgm)
│       │   ├── notifications/  # Módulo notificações (email/SMS)
│       │   ├── common/         # Utils, pipes, guards, decorators
│       │   └── main.ts         # Entry point
│       ├── test/               # Tests e2e
│       └── Dockerfile
├── packages/
│   ├── shared/                 # Types & utilities compartilhados
│   └── ui/                     # Componentes UI (design system)
├── docker-compose.yml
└── README.md
```

## Configuração do Ambiente

1. Instale as dependências em cada pasta `apps/*`:
   ```bash
   cd apps/api && npm install
   cd apps/web && npm install
   ```

2. Copie `.env.example` para `.env` em `apps/api/` e preencha as variáveis.

3. Inicie os serviços de infraestrutura:
   ```bash
   docker compose up -d
   ```

4. Execute as migrações do Prisma e gere o cliente:
   ```bash
   cd apps/api
   npx prisma migrate dev
   npx prisma generate
   ```

5. Inicie o backend e o frontend em terminais separados:
   ```bash
   # Terminal 1 (backend)
   cd apps/api && npm run start:dev

   # Terminal 2 (frontend)
   cd apps/web && npm run dev
   ```

## Scripts Disponíveis

- `npm run build` — Compila o projeto
- `npm run start:dev` — Inicia em modo de desenvolvimento com hot-reload
- `npm run start:prod` — Inicia em modo de produção
- `npm run test` — Executa os testes unitários
- `npm run test:e2e` — Executa os testes end-to-end
- `npm run prisma:studio` — Abre o Prisma Studio
- `npm run prisma:migrate` — Executa migrações do banco

## Dependências Principais

- **Backend:** NestJS, Prisma, PostgreSQL, Redis, BullMQ, JWT, Passport, Mercado Pago, Twilio
- **Frontend:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui, Zustand, React Query
- **DevOps:** Docker, Docker Compose

## Licença

MIT
