# GEPT Backend

Backend da plataforma GEPT reescrito em **NestJS**, com arquitetura em camadas, autenticação JWT e persistência em PostgreSQL via TypeORM.

## Visão geral

- API REST para gestão de trabalhadores, projetos, famílias e dashboard.
- Estrutura modular por contexto (`authentication`, `worker`, `project`, `family`, `dashboard`).
- Separação de responsabilidades em camadas: `@domain`, `@data` e `@infra`.
- Validações com `class-validator` + `ValidationPipe` global.
- Migrations versionadas para evolução do banco.

## Stack

- NestJS 10
- TypeScript
- TypeORM 0.3
- PostgreSQL
- JSON Web Token (`jsonwebtoken`)
- `class-validator` / `class-transformer`
- Jest

## Arquitetura

```text
src/
  @domain/             # Entidades, contratos de repositório e contratos de use case
  @data/               # Implementações dos casos de uso
  @infra/              # Repositórios TypeORM, DTOs, middleware JWT, serviços de criptografia/token
  authentication/      # Módulo de login
  worker/              # Módulo de trabalhadores
  project/             # Módulo de projetos
  family/              # Módulo de famílias
  dashboard/           # Módulo de contadores
  app.module.ts
  main.ts
```

## Pré-requisitos

- Node.js `16+` (pipeline atual usa Node 16)
- npm
- PostgreSQL `13+` (local ou via Docker)

## Configuração do ambiente

1. Instale dependências:

```bash
npm install
```

2. Crie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Configure as variáveis:

| Variável | Descrição | Exemplo |
| --- | --- | --- |
| `PORT` | Porta da API | `3000` |
| `DB_HOST` | Host do PostgreSQL | `localhost` |
| `DB_PORT` | Porta do PostgreSQL | `5432` |
| `DB_NAME` | Nome do banco | `gept_db` |
| `DB_USER` | Usuário do banco | `postgres` |
| `DB_PASSWORD` | Senha do banco | `postgres` |
| `JWT_SECRET` | Chave de assinatura do token JWT | `sua-chave-segura` |

## Banco de dados (opcional com Docker)

O `docker-compose.yml` sobe apenas o PostgreSQL:

```bash
docker compose up -d
```

## Migrations

Após configurar o banco, execute:

```bash
npx typeorm-ts-node-commonjs migration:run -d ./src/@infra/typeorm/database.source.ts
```

Para desfazer a última migration:

```bash
npx typeorm-ts-node-commonjs migration:revert -d ./src/@infra/typeorm/database.source.ts
```

## Executando a aplicação

Desenvolvimento:

```bash
npm run start:dev
```

Produção local:

```bash
npm run build
npm run start:prod
```

Base URL local: `http://localhost:3000/api`

## Scripts úteis

| Script | Descrição |
| --- | --- |
| `npm run start` | Inicia aplicação |
| `npm run start:dev` | Inicia com watch |
| `npm run build` | Gera build em `dist/` |
| `npm run lint` | Executa ESLint |
| `npm run format` | Formata com Prettier |
| `npm run test` | Testes unitários |
| `npm run test:e2e` | Testes end-to-end |
| `npm run test:cov` | Cobertura de testes |

## Autenticação

- `POST /api/login` é a única rota pública.
- As demais rotas exigem header:

```http
Authorization: Bearer <token>
```

Exemplo de login:

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@email.com","password":"senha"}'
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/health` | Health check da aplicação |
| `POST` | `/api/login` | Autenticação e geração de token |
| `GET` | `/api/dashboard` | Contadores de famílias, trabalhadores e projetos |
| `POST` | `/api/worker` | Cria trabalhador |
| `GET` | `/api/worker` | Lista trabalhadores (paginação via headers) |
| `GET` | `/api/worker/:id` | Busca trabalhador por id |
| `PATCH` | `/api/worker/:id` | Atualiza trabalhador |
| `DELETE` | `/api/worker/:id` | Remove trabalhador |
| `POST` | `/api/project` | Cria projeto |
| `GET` | `/api/project` | Lista projetos (paginação via headers) |
| `GET` | `/api/project/:id` | Busca projeto por id |
| `PATCH` | `/api/project/:id` | Atualiza projeto |
| `DELETE` | `/api/project/:id` | Remove projeto |
| `POST` | `/api/family` | Cria família |
| `GET` | `/api/family` | Lista famílias (paginação via headers) |
| `GET` | `/api/family/:id` | Busca família por id |
| `PATCH` | `/api/family/:id` | Atualiza família |
| `DELETE` | `/api/family/:id` | Remove família |

Paginação nas rotas de listagem:

```http
page: 1
perPage: 10
```

## Contratos importantes

Valores aceitos em `CreateWorkerDto`:

- `accessLevel`: `administrator`, `maintainer`, `visitor`
- `position`: `president`, `vice-president`, `secretary`, `treasurer`, `worker`

Valores aceitos em `CreateProjectDto.daysOfWork`:

- `monday`, `tuesday`, `wednesday`, `thursday`, `friday`, `saturday`, `sunday`

## Boas práticas adotadas

- Arquitetura orientada a casos de uso.
- Repositórios desacoplados por contratos de domínio.
- Criptografia de senha com `bcrypt`.
- JWT com expiração.
- Versionamento de esquema com migrations.
- Organização por módulos de negócio no NestJS.

## Melhorias recomendadas

- Substituir middleware de autenticação por `Guard` NestJS.
- Padronizar validações com decorators em todos os DTOs.
- Corrigir scripts de migration no `package.json` para usar `database.source.ts`.
- Atualizar Dockerfile para `dist/main.js` (estrutura Nest atual).

## Diagrama ERD

![GEPT ERD](./.github/images/GEPT%20-%20ERD.png)

## Contribuidores

[Lucas Tavares](https://www.linkedin.com/in/lucas-tavares-a25323116/)
