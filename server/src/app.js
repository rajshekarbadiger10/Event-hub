import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { corsMiddleware } from './config/cors.js'
import { env } from './config/env.js'
import v1Routes from './routes/v1/index.js'
import { notFound } from './middleware/error/notFound.js'
import { errorHandler } from './middleware/error/errorHandler.js'

const app = express()

app.use(helmet())
app.use(corsMiddleware)
app.use(morgan(env.isProduction ? 'combined' : 'dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'EventHub API',
    version: env.apiVersion,
  })
})

app.use(`/api/${env.apiVersion}`, v1Routes)

app.use(notFound)
app.use(errorHandler)

export default app
