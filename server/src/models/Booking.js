import mongoose from 'mongoose'

const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
}

const bookingSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    serviceName: { type: String, required: true },
    eventDate: { type: Date, required: true },
    eventLocation: { type: String, required: true },
    guestCount: { type: Number, required: true, min: 1 },
    notes: { type: String },
    status: { type: String, enum: Object.values(BOOKING_STATUSES), default: 'pending' },
    totalAmount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
    completedAt: { type: Date },
    rating: { type: Number, min: 1, max: 5 },
    review: { type: String },
    reviewedAt: { type: Date },
  },
  { timestamps: true },
)

bookingSchema.index({ customerId: 1 })
bookingSchema.index({ vendorId: 1 })
bookingSchema.index({ eventDate: 1 })
bookingSchema.index({ status: 1 })

export { BOOKING_STATUSES }
export const Booking = mongoose.model('Booking', bookingSchema)
