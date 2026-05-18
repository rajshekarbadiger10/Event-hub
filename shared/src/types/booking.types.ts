import type { BookingStatus } from '../constants/bookingStatus'

export interface IBooking {
  _id: string
  customerId: string
  vendorId: string
  serviceName: string
  eventDate: string
  eventLocation?: string
  guestCount?: number
  notes?: string
  status: BookingStatus
  totalAmount: number
  currency: string
  createdAt: string
  updatedAt: string
}
