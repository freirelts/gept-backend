# GEPT Backend

API REST para gestão de projetos sociais, trabalhadores, famílias e pessoas vinculadas.

## Sumário

1. [Visão geral](#visão-geral)
2. [Tecnologias](#tecnologias)
3. [Estrutura do projeto](#estrutura-do-projeto)
4. [Pré-requisitos](#pré-requisitos)
5. [Setup rápido](#setup-rápido)
6. [Variáveis de ambiente](#variáveis-de-ambiente)
7. [Scripts disponíveis](#scripts-disponíveis)
8. [Guia da API](#guia-da-api)
9. [Diagrama ERD](#diagrama-erd)
10. [Autor](#autor)

## Visão geral

- Padrão arquitetural: Clean Architecture (camadas `domain`, `data`, `infra`, `presentation`, `main`)
- Banco de dados relacional com TypeORM + migrations
- Autenticação via JWT
- Módulos de endpoint: `auth` (login), `dashboard`, `worker`, `project` e `family`

## Tecnologias

- Node.js 16+
- TypeScript 3.9
- Express 4
- TypeORM 0.3
- PostgreSQL
- Yup (validação)
- JWT (`jsonwebtoken`)
- Docker / Docker Compose (opcional para banco)

## Estrutura do projeto

```text
src/
  config/         # Configurações de app, segurança e banco
  data/           # Use cases, validações e erros
  domain/         # Regras de domínio, contratos e modelos
  infra/          # Implementações (TypeORM, entidades, repositórios, migrations)
  loaders/        # Bootstrap da aplicação (dotenv, app, db, logger)
  main/           # Factories
  presentation/   # Controllers e middlewares HTTP
  routes.ts       # Rotas da API
  server.ts       # Entry point
```

## Pré-requisitos

- Node.js `16.x` (recomendado)
- npm `6+`
- PostgreSQL `13+` (local ou via Docker)

> Observação: o build com Webpack 4 pode falhar em Node 17+ (`ERR_OSSL_EVP_UNSUPPORTED`). Use Node 16 ou exporte `NODE_OPTIONS=--openssl-legacy-provider` antes de `npm run build`.

## Setup rápido

### 1) Clonar e instalar dependências

```bash
git clone <url-do-repositorio>
cd gept-backend
npm install
```

### 2) Configurar ambiente

```bash
cp .env.example .env
```

### 3) Subir PostgreSQL com Docker (opcional)

Este `docker-compose.yml` sobe apenas o banco (`postgres-db`).

```bash
docker compose up -d postgresdb
```

### 4) Executar migrations

```bash
npm run migration:run
```

### 5) Rodar API em desenvolvimento

```bash
npm run dev
```

API disponível em `http://localhost:3000/api`.

### 6) Validar saúde do serviço

```bash
curl http://localhost:3000/api/health
```

## Variáveis de ambiente

| Variável      | Padrão      | Descrição                       |
|---------------|-------------|---------------------------------|
| `PORT`        | `3000`      | Porta da API                    |
| `DB_HOST`     | `localhost` | Host do PostgreSQL              |
| `DB_PORT`     | `5432`      | Porta do PostgreSQL             |
| `DB_NAME`     | `gept_db`   | Nome do banco                   |
| `DB_USER`     | `postgres`  | Usuário do banco                |
| `DB_PASSWORD` | `postgres`  | Senha do banco                  |
| `JWT_SECRET`  | `123`       | Segredo de assinatura do JWT    |

## Scripts disponíveis

| Script                  | Descrição |
|-------------------------|-----------|
| `npm run dev`           | Executa a API com `ts-node-dev` |
| `npm run build`         | Compila para `dist/` (Babel + Webpack) |
| `npm start`             | Inicia a API em modo produção (`dist/server.js`) |
| `npm run migration:create` | Cria uma nova migration |
| `npm run migration:run` | Aplica migrations pendentes |
| `npm run migration:undo` | Reverte a última migration |

## Guia da API

### Base URL

`http://localhost:3000/api`

### Formato de resposta

```json
{
  "status": "OK",
  "data": {},
  "message": "opcional",
  "errors": ["opcional"]
}
```

### Autenticação

1. Faça login em `POST /login`
2. Use o token retornado no header:

```http
Authorization: Bearer <token>
```

### Paginação

As rotas de listagem (`GET /worker`, `GET /project`, `GET /family`) leem paginação via headers:

- `page` (padrão `1`)
- `perpage` (padrão `10`)

### Endpoints

| Método | Rota | Auth | Descrição |
|--------|------|------|-----------|
| `GET` | `/health` | Não | Healthcheck |
| `POST` | `/login` | Não | Login e geração de token |
| `GET` | `/dashboard` | Sim | Totais de famílias, trabalhadores e projetos |
| `POST` | `/worker` | Sim | Criar trabalhador |
| `GET` | `/worker` | Sim | Listar trabalhadores |
| `GET` | `/worker/:id` | Sim | Buscar trabalhador por ID |
| `PATCH` | `/worker/:id` | Sim | Atualizar trabalhador |
| `DELETE` | `/worker/:id` | Sim | Remover trabalhador |
| `POST` | `/project` | Sim | Criar projeto |
| `GET` | `/project` | Sim | Listar projetos |
| `GET` | `/project/:id` | Sim | Buscar projeto por ID |
| `PATCH` | `/project/:id` | Sim | Atualizar projeto |
| `DELETE` | `/project/:id` | Sim | Remover projeto |
| `POST` | `/family` | Sim | Criar família |
| `GET` | `/family` | Sim | Listar famílias |
| `GET` | `/family/:id` | Sim | Buscar família por ID |
| `PATCH` | `/family/:id` | Sim | Atualizar família |
| `DELETE` | `/family/:id` | Sim | Remover família |

### Exemplos de payload

#### Login

```json
{
  "email": "admin@dominio.com",
  "password": "123456"
}
```

#### Criar projeto

```json
{
  "name": "Projeto Acolher",
  "description": "Atendimento social semanal",
  "daysOfWork": ["monday", "wednesday", "friday"]
}
```

#### Criar trabalhador

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "123456",
  "birthdate": "1990-01-15T00:00:00.000Z",
  "position": "worker",
  "accessLevel": "maintainer",
  "phone": "88999999999",
  "isWhatsApp": true,
  "street": "Rua A",
  "number": "123",
  "neighborhood": "Centro",
  "city": "Juazeiro do Norte",
  "postalCode": "63000000",
  "projects": []
}
```

#### Criar família

```json
{
  "street": "Rua B",
  "number": "45",
  "neighborhood": "Bairro C",
  "complement": "Casa 2",
  "isRented": true,
  "rentPrice": 750,
  "projects": [],
  "persons": [
    {
      "name": "João Souza",
      "email": "joao@email.com",
      "isOwner": true,
      "document": "00000000000",
      "kin": "Responsável",
      "occupation": "Autônomo",
      "wage": 1200,
      "wageSources": "Serviços",
      "nis": "12345678900",
      "schooling": "Ensino Médio",
      "birthdate": "1985-03-20T00:00:00.000Z",
      "phone": "88988888888",
      "isWhatsApp": true,
      "phone2": "88977777777",
      "isWhatsApp2": false
    }
  ]
}
```

### Observações importantes

- `projects` deve ser enviado como array em `POST /worker` e `POST /family` (use `[]` quando não houver vínculo).
- Em `PATCH /worker/:id` e `PATCH /family/:id`, envie o estado completo de `projects` para evitar perda de vínculo.
- A migration cria um usuário padrão com email `geptadmin@email.com`, mas a senha não é exposta no projeto.
- A configuração do Jest existe, mas a pasta `tests/` não está no repositório atualmente.

#### Definir senha local para o usuário seed (opcional)

Para facilitar desenvolvimento local, você pode definir uma senha conhecida (`123456`) no usuário seed:

```sql
UPDATE worker
SET password = '$2b$10$.cEI6r/QEPcTcEwiGvktGuppKo56TtzGIo6BQZZaaJV8MkeV8O6KS'
WHERE email = 'geptadmin@email.com';
```

Após isso, faça login com:

```json
{
  "email": "geptadmin@email.com",
  "password": "123456"
}
```

## Diagrama ERD

<img src="./.github/images/GEPT - ERD.png" alt="Diagrama de entidade e relacionamento (GEPT)" />

## Autor

[Lucas Tavares](https://www.linkedin.com/in/lucas-tavares-a25323116/)
