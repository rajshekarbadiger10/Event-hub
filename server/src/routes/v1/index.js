import { Router } from 'express'
import authRoutes from './auth/auth.routes.js'
import vendorRoutes from './vendor/vendor.routes.js'
import bookingRoutes from './booking/booking.routes.js'

const router = Router()

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'EventHub API is running' })
})

router.use('/auth', authRoutes)
router.use('/vendors', vendorRoutes)
router.use('/bookings', bookingRoutes)

export default router
