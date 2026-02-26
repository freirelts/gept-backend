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
docker-compose build
docker-compose up -d
```

**3. Start usando npm**

- Necessário uma conexão com o PostgreSQL, configurar no .env do projeto antes de executar

```bash
npm install
npm start
```

Aplicação estará disponível em <http://localhost:4000>.

**4. Testes com Jest**

```bash
npm run test
```

## Contribuidores

[Lucas Tavares](https://www.linkedin.com/in/lucas-tavares-a25323116/)
