# Contributing to EventHub

Thank you for contributing. This guide helps you get productive quickly.

## Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (recommended) — or MongoDB 6+ installed locally / Atlas

## Quick start

```bash
# Install all dependencies
npm run install:all
npm install

# Copy environment files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Start MongoDB with Docker (default URI in server/.env works as-is)
npm run docker:up

# Run both apps (from repo root)
npm run dev
```

### MongoDB without Docker

Point `MONGODB_URI` in `server/.env` at your instance, for example:

- Local: `mongodb://127.0.0.1:27017/eventhub`
- Atlas: `mongodb+srv://<user>:<pass>@<cluster>/eventhub`

### Docker commands

| Command | Description |
|---------|-------------|
| `npm run docker:up` | Start MongoDB (`mongo:7` on port `27017`) |
| `npm run docker:down` | Stop container |
| `npm run docker:logs` | View logs |
| `npm run docker:reset` | Stop and wipe database volume (fresh DB) |

Data is stored in the Docker volume `eventhub_mongo_data` so restarts keep your dev data.

- Frontend: http://localhost:5173
- API: http://localhost:5000/api/v1

## Repository layout

| Path | Purpose |
|------|---------|
| `client/` | React + Vite + Tailwind + Router + Zustand |
| `server/` | Express + Mongoose + JWT auth |
| `shared/` | Shared TypeScript types & constants |
| `docs/` | Architecture and API docs |

## Branch workflow

1. Create a feature branch from `main`: `feature/booking-flow`
2. Keep PRs focused (one domain per PR when possible)
3. Run `npm run build` in `client/` before opening PR
4. Test auth flows manually after auth-related changes

## Code conventions

### Naming

- React components: `PascalCase` (`VendorCard.tsx`)
- Hooks: `useSomething.ts`
- Server files: `camelCase.service.js`, `camelCase.controller.js`
- API routes: plural REST nouns (`/api/v1/bookings`)

### Architecture rules

- **Frontend**: Pages compose features; API calls only in `services/`; global state in Zustand `store/slices/`
- **Backend**: Routes → Controllers → Services → Models (never skip layers)
- **Shared**: Update `shared/src/constants` and `shared/src/types` when contracts change; keep `server/src/constants/roles.js` in sync

### Auth & roles

Roles: `customer` | `vendor` | `admin`

- Customers and vendors self-register via `POST /api/v1/auth/register`
- Admin accounts must be created via seed script (not self-registration)

## Creating an admin user (local dev)

```bash
cd server
node scripts/seedAdmin.js
```

Default credentials are printed once — change them in production.

## API testing

See [docs/api/AUTH.md](docs/api/AUTH.md) for auth endpoints and example payloads.

## Questions?

Open a draft PR early for architectural changes (booking, payments, sockets) so the team can align before large diffs.
