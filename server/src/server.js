import app from './app.js'
import { connectDB } from './config/db.js'
import { env } from './config/env.js'

const start = async () => {
  try {
    await connectDB()
    app.listen(env.port, () => {
      console.log(`EventHub API running on http://localhost:${env.port}`)
      console.log(`API base: http://localhost:${env.port}/api/${env.apiVersion}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

start()
