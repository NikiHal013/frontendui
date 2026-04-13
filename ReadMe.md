# frontendui-Exam (monorepo)

Monorepo pro frontendové aplikace postavené na **React + Vite**. Repo používá **npm workspaces** a obsahuje:
- `apps/*` – spustitelné aplikace (Vite dev server / build)
- `packages/*` – sdílené balíčky (UI/template, dynamic store, GQL sdílené věci a doménové moduly)

V této repozitáři je pro zkoušku/ukázku důležitá aplikace:

- **`@nik-kb-sp/app_exam`** (adresář `apps/app_exam`) – UI nad GraphQL endpointem, používá routing a sdílené komponenty/balíčky z `packages/*`.

## Požadavky

- Node.js + npm (doporučeno aktuální LTS)
- (Volitelně) Docker + Docker Compose pro lokální backend stack

## Struktura repozitáře (zkráceně)

- `apps/`
  - `app_exam` – **@nik-kb-sp/app_exam** (Vite + React)
  - další aplikace (např. `app_dynamic`, `app_admissions`, …)
- `packages/`
  - `exam` – **@nik-kb-sp/pck_exam** (balíček s routami/stránkami pro „Exam“ část)
  - `_template`, `dynamic`, `shared`, `gql_shared`, … (sdílené balíčky)
- `docker-compose.yml` – lokální stack služeb (frontend, Apollo federation a GQL služby + Postgres)

## Instalace

V rootu monorepa:

```bash
npm install
```

Repo používá npm workspaces (`apps/*`, `packages/*`), takže instalace se dělá z rootu.

## Spuštění aplikace `@nik-kb-sp/app_exam`

Z rootu monorepa spusť dev server workspacu:

```bash
npm run dev -w @nik-kb-sp/app_exam
```

Aplikace běží jako Vite projekt. V konfiguraci má:
- GraphQL endpoint v aplikaci defaultně nastavený na `"/api/gql"`
- dev proxy: požadavky na `/api/gql` se proxyují na `http://localhost:33001`

> Pozn.: Pokud ti na pozadí neběží služba na `localhost:33001`, GraphQL volání nebudou fungovat.

## Backend / API (Docker Compose)

Repo obsahuje `docker-compose.yml`, který zvedá služby potřebné pro GraphQL:
- `frontend` (port mapovaný na `33001:8000`)
- `apollo` (federation gateway)
- více `gql_*` služeb (ug/office/granting/admissions)
- databáze `postgres_*` + `pgadmin`

Spuštění stacku:

```bash
docker compose up -d
```

Potom znovu spusť frontend aplikaci:

```bash
npm run dev -w @nik-kb-sp/app_exam
```

## Build (produkční sestavení) pro `@nik-kb-sp/app_exam`

```bash
npm run build -w @nik-kb-sp/app_exam
```

## Užitočné root skripty

V root `package.json` jsou mimo jiné:
- `npm run build:apps` – build všech apps ve workspaces (`apps/*`)
- generátory/utility skripty (např. `create:component`, `create:filter`, …)

## Poznámky k implementaci `app_exam`

- Vstup aplikace je `apps/app_exam/src/main.jsx`, který renderuje `<App />`.
- `<App />` obaluje router do `RootProviders` (store / klient) a používá endpoint `"/api/gql"`.
- Routing (`AppRouter`) skládá stránky z:
  - `packages/exam/src/ExamGQLModel/Pages/RouterSegment` (Exam sekce)
  - `packages/_template/src/Base/Pages/RouterSegment` (základní stránky / layout)
- Vite konfigurace je monorepo-friendly (aliasy do `packages/*` a `preserveSymlinks: true`).

---

## První projektový den

- První kroky projektu
- Základní funkčnost a zkoumání možností
