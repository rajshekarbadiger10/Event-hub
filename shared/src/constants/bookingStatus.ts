export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  REJECTED: 'rejected',
} as const

export type BookingStatus =
  (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS]

export const BOOKING_STATUS_LIST: BookingStatus[] = [
  BOOKING_STATUS.PENDING,
  BOOKING_STATUS.CONFIRMED,
  BOOKING_STATUS.CANCELLED,
  BOOKING_STATUS.COMPLETED,
  BOOKING_STATUS.REJECTED,
]
