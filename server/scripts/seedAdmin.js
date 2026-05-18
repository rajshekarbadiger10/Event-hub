/**
 * Seed a local admin user for development.
 * Usage: node scripts/seedAdmin.js
 */
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { User } from '../src/models/User.js'
import { USER_ROLES } from '../src/constants/roles.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const ADMIN = {
  name: 'EventHub Admin',
  email: 'admin@eventhub.local',
  password: 'Admin@12345',
  role: USER_ROLES.ADMIN,
}

const run = async () => {
  const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/eventhub'
  await mongoose.connect(uri)

  const existing = await User.findOne({ email: ADMIN.email })
  if (existing) {
    console.log('Admin already exists:', ADMIN.email)
    process.exit(0)
  }

  await User.create(ADMIN)
  console.log('Admin created successfully')
  console.log('  Email:', ADMIN.email)
  console.log('  Password:', ADMIN.password)
  console.log('Change these credentials before any shared deployment.')

  await mongoose.disconnect()
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
