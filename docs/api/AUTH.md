# Auth API & file map

Base URL: `http://localhost:5000/api/v1`

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register customer or vendor |
| POST | `/auth/login` | No | Login |
| POST | `/auth/refresh` | No | Refresh access token |
| POST | `/auth/logout` | Bearer | Invalidate refresh token |
| GET | `/auth/me` | Bearer | Current user profile |

## Register

```http
POST /auth/register
Content-Type: application/json

{
  "name": "Jane Customer",
  "email": "jane@example.com",
  "password": "password123",
  "role": "customer"
}
```

Roles allowed: `customer`, `vendor` (not `admin`).

## Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "password123"
}
```

## Response shape

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "...",
      "name": "Jane Customer",
      "email": "jane@example.com",
      "role": "customer",
      "isEmailVerified": false,
      "createdAt": "...",
      "updatedAt": "..."
    },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

## Authenticated requests

```http
GET /auth/me
Authorization: Bearer <accessToken>
```

## Refresh token

```http
POST /auth/refresh
Content-Type: application/json

{
  "refreshToken": "<refreshToken>"
}
```

---

## Where each file lives (MVC)

### Backend (`server/src/`)

| File | Role |
|------|------|
| `models/User.js` | Mongoose schema, bcrypt hash on save, `comparePassword`, public JSON |
| `utils/token.js` | `signAccessToken`, `signRefreshToken`, verify helpers |
| `services/auth/auth.service.js` | Business logic: register, login, refresh, logout, get profile |
| `controllers/auth/auth.controller.js` | HTTP handlers — thin, calls service only |
| `routes/v1/auth/auth.routes.js` | Maps URLs to controller + validation + middleware |
| `routes/v1/index.js` | Mounts `/auth` under `/api/v1` |
| `middleware/auth/authenticate.js` | Reads `Authorization: Bearer`, sets `req.user` |
| `middleware/role/authorize.js` | Restricts routes by role (use after `authenticate`) |
| `validators/auth/auth.validator.js` | Zod schemas for request bodies |
| `middleware/validation/validate.js` | Runs Zod and returns 400 errors |
| `config/env.js` | `JWT_SECRET`, `JWT_REFRESH_SECRET`, MongoDB URI |

**Flow:** Route → `validate` → `authenticate` (if protected) → Controller → Service → Model.

**Example protected route with roles:**

```js
router.get(
  '/admin-only',
  authenticate,
  authorize(USER_ROLES.ADMIN),
  someController.handler,
)
```

### Frontend (`client/src/`)

| File | Role |
|------|------|
| `services/auth/auth.service.ts` | `login`, `register`, `refresh`, `logout`, `getMe` |
| `lib/api/client.ts` | Axios instance + Bearer header + auto-refresh on 401 |
| `lib/api/refreshSession.ts` | Refresh call without interceptors (no loops) |
| `store/slices/authStore.ts` | Zustand + `localStorage` persist for user & tokens |
| `hooks/auth/useAuth.ts` | Login/register/logout + role redirects |
| `app/providers/AppProviders.tsx` | On load: `getMe()` if token exists |
| `pages/auth/LoginPage.tsx` | Login form + errors |
| `pages/auth/RegisterPage.tsx` | Register form + role picker |
| `components/common/ProtectedRoute/` | Blocks guests, saves `from` for redirect |
| `components/common/RoleGuard/` | Blocks wrong roles |
| `app/routes/GuestOnlyRoute.tsx` | Redirects logged-in users away from login |

### Shared (`shared/src/`)

| File | Role |
|------|------|
| `types/auth.types.ts` | `IAuthTokens`, `IAuthResponse` |
| `types/user.types.ts` | `IUserPublic`, `ILoginPayload`, `IRegisterPayload` |
| `constants/roles.ts` | `USER_ROLES` enum |

## Token storage (SPA)

Access and refresh tokens are stored in **Zustand persist** (`localStorage` key `eventhub-auth`). The access token is sent as `Authorization: Bearer`. On 401, the client refreshes once and retries. Logout clears the store and invalidates the refresh hash on the server.

For production hardening later: consider httpOnly cookies for refresh tokens.
