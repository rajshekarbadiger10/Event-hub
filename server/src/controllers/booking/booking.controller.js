import { asyncHandler } from '../../utils/asyncHandler.js'
import { sendSuccess } from '../../utils/apiResponse.js'
import { bookingService } from '../../services/booking/booking.service.js'

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.createBooking(req.user.id, req.body)
  sendSuccess(res, { statusCode: 201, message: 'Booking created', data: booking })
})

export const getMyBookings = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query
  const result = await bookingService.getCustomerBookings(req.user.id, { status, page: +page, limit: +limit })
  sendSuccess(res, { message: 'Bookings retrieved', data: result })
})

export const getBookingDetails = asyncHandler(async (req, res) => {
  const booking = await bookingService.getBookingById(req.params.bookingId, req.user.id)
  sendSuccess(res, { message: 'Booking details', data: booking })
})

export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await bookingService.cancelBooking(req.params.bookingId, req.user.id, req.body.cancellationReason)
  sendSuccess(res, { message: 'Booking cancelled', data: booking })
})

export const addReview = asyncHandler(async (req, res) => {
  const booking = await bookingService.addReview(req.params.bookingId, req.user.id, req.body.rating, req.body.review)
  sendSuccess(res, { message: 'Review added', data: booking })
})

export const getUpcomingBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingService.getUpcomingBookings(req.user.id)
  sendSuccess(res, { message: 'Upcoming bookings', data: bookings })
})

export const getBookingStats = asyncHandler(async (req, res) => {
  const stats = await bookingService.getBookingStats(req.user.id)
  sendSuccess(res, { message: 'Stats', data: stats })
})
