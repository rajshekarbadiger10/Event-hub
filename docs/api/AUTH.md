# Auth API

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
