import { Router } from 'express'
import { authenticate } from '../../../middleware/auth/authenticate.js'
import * as bc from '../../../controllers/booking/booking.controller.js'

const router = Router()
router.use(authenticate)

router.post('/', bc.createBooking)
router.get('/', bc.getMyBookings)
router.get('/upcoming', bc.getUpcomingBookings)
router.get('/stats', bc.getBookingStats)
router.get('/:bookingId', bc.getBookingDetails)
router.put('/:bookingId/cancel', bc.cancelBooking)
router.post('/:bookingId/review', bc.addReview)

export default router
