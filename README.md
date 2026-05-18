# EventHub

A scalable MERN stack **Event Services Booking Platform** — customers book vendors, vendors manage services, admins oversee the platform.

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite 8, Tailwind CSS 4, React Router 7, Zustand 5, Axios |
| Backend | Node.js, Express 5, Mongoose, JWT, Zod |
| Shared | TypeScript types & constants (`shared/`) |
| Planned | Cloudinary, Razorpay, Socket.io, AI |

## Project structure

```
EventHub/
├── client/          # React frontend
├── server/          # Express API
├── shared/          # Shared types & constants
├── docs/            # Architecture & API docs
└── CONTRIBUTING.md  # Developer onboarding
```

## Quick start

**Prerequisites:** Node.js 20+, npm 10+, [Docker Desktop](https://www.docker.com/products/docker-desktop/) (recommended)

```bash
# 1. Install dependencies
npm run install:all
npm install   # root — installs concurrently for `npm run dev`

# 2. Environment
cp server/.env.example server/.env
cp client/.env.example client/.env

# 3. Start MongoDB (Docker)
npm run docker:up

# 4. Run client + API
npm run dev
```

Without Docker, use a local MongoDB instance and set `MONGODB_URI` in `server/.env`.

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:5000/api/v1 |
| Health | http://localhost:5000/api/v1/health |
| MongoDB | `mongodb://127.0.0.1:27017/eventhub` (via Docker) |

## Auth & roles

| Role | Register | Dashboard route |
|------|----------|-----------------|
| Customer | `/register` (role: customer) | `/customer/dashboard` |
| Vendor | `/register` (role: vendor) | `/vendor/dashboard` |
| Admin | Seed script only | `/admin/dashboard` |

```bash
# Create local admin (after MongoDB is running)
cd server && node scripts/seedAdmin.js
```

Default admin: `admin@eventhub.local` / `Admin@12345`

API reference: [docs/api/AUTH.md](docs/api/AUTH.md)

## For collaborators

Read **[CONTRIBUTING.md](CONTRIBUTING.md)** for branch workflow, conventions, and layer rules.

### What's implemented

- JWT auth (register, login, refresh, logout, me)
- Role-based protected routes (customer / vendor / admin)
- Shared TypeScript contracts (`User`, `Vendor`, `Booking`)
- Express middleware scaffold (auth, roles, validation, errors, rate limit)
- Zustand auth store with persistence & token refresh

### What's next (pick a branch)

- Vendor profile & listings CRUD
- Booking flow
- Reviews & ratings
- Cloudinary uploads
- Razorpay payments
- Socket.io notifications

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run client + server concurrently |
| `npm run dev:client` | Frontend only |
| `npm run dev:server` | Backend only |
| `npm run build` | Build frontend for production |
| `npm run docker:up` | Start MongoDB container in background |
| `npm run docker:down` | Stop MongoDB container |
| `npm run docker:logs` | Tail MongoDB logs |
| `npm run docker:reset` | Stop MongoDB and delete persisted data |
