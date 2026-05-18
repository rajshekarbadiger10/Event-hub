import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const required = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET']

for (const key of required) {
  if (!process.env[key]) {
    console.warn(`[env] Warning: ${key} is not set`)
  }
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT) || 5000,
  apiVersion: process.env.API_VERSION ?? 'v1',
  mongodbUri:
    process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/eventhub',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-access-secret-change-me',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
    refreshSecret:
      process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret-change-me',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '30d',
  },
  cors: {
    clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
  },
  isProduction: process.env.NODE_ENV === 'production',
}
