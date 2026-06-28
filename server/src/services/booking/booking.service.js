import { Booking, BOOKING_STATUSES } from '../../models/Booking.js'
import { Vendor } from '../../models/Vendor.js'
import { AppError } from '../../utils/AppError.js'

export const bookingService = {
  async createBooking(customerId, data) {
    const vendor = await Vendor.findById(data.vendorId)
    if (!vendor || !vendor.isApproved) throw new AppError('Vendor not found or not available', 404)

    const booking = await Booking.create({ customerId, ...data, currency: data.currency || 'INR' })
    return booking
  },

  async getCustomerBookings(customerId, filters = {}) {
    const query = { customerId }
    if (filters.status) query.status = filters.status
    const page = filters.page || 1
    const limit = filters.limit || 10
    const skip = (page - 1) * limit

    const [bookings, total] = await Promise.all([
      Booking.find(query).populate('vendorId', 'profile rating').skip(skip).limit(limit).sort({ createdAt: -1 }),
      Booking.countDocuments(query),
    ])

    return { bookings, pagination: { page, limit, total, pages: Math.ceil(total / limit) } }
  },

  async getBookingById(bookingId, customerId) {
    const booking = await Booking.findById(bookingId).populate('vendorId', 'profile rating')
    if (!booking) throw new AppError('Booking not found', 404)
    if (booking.customerId.toString() !== customerId.toString()) throw new AppError('Forbidden', 403)
    return booking
  },

  async cancelBooking(bookingId, customerId, reason) {
    const booking = await Booking.findById(bookingId)
    if (!booking) throw new AppError('Booking not found', 404)
    if (booking.customerId.toString() !== customerId.toString()) throw new AppError('Forbidden', 403)
    if (['completed', 'cancelled'].includes(booking.status)) throw new AppError(`Cannot cancel a ${booking.status} booking`, 400)

    booking.status = BOOKING_STATUSES.CANCELLED
    booking.cancellationReason = reason
    booking.cancelledAt = new Date()
    await booking.save()
    return booking
  },

  async addReview(bookingId, customerId, rating, review) {
    const booking = await Booking.findById(bookingId)
    if (!booking) throw new AppError('Booking not found', 404)
    if (booking.customerId.toString() !== customerId.toString()) throw new AppError('Forbidden', 403)
    if (booking.status !== BOOKING_STATUSES.COMPLETED) throw new AppError('Can only review completed bookings', 400)

    booking.rating = rating
    booking.review = review
    booking.reviewedAt = new Date()
    await booking.save()
    return booking
  },

  async getUpcomingBookings(customerId) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Booking.find({
      customerId,
      eventDate: { $gte: today },
      status: { $ne: BOOKING_STATUSES.CANCELLED },
    }).populate('vendorId', 'profile').sort({ eventDate: 1 }).limit(5)
  },

  async getBookingStats(customerId) {
    const mongoose = await import('mongoose')
    const stats = await Booking.aggregate([
      { $match: { customerId: new mongoose.default.Types.ObjectId(customerId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
          pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          confirmed: { $sum: { $cond: [{ $eq: ['$status', 'confirmed'] }, 1, 0] } },
          cancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } },
          totalSpent: { $sum: '$totalAmount' },
        },
      },
    ])
    return stats[0] || { total: 0, completed: 0, pending: 0, confirmed: 0, cancelled: 0, totalSpent: 0 }
  },
}
