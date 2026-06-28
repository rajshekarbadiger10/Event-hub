import cors from 'cors'
import { env } from './env.js'

const isDev = env.nodeEnv === 'development'

export const corsOptions = {
  origin: isDev
    ? (origin, callback) => {
        if (!origin || /^http:\/\/localhost:\d+$/.test(origin)) {
          callback(null, true)
        } else {
          callback(null, env.cors.clientUrl)
        }
      }
    : env.cors.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

export const corsMiddleware = cors(corsOptions)
