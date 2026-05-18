import cors from 'cors'
import { env } from './env.js'

export const corsOptions = {
  origin: env.cors.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

export const corsMiddleware = cors(corsOptions)
