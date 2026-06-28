import { apiClient } from '@/lib/api/client'
import type { IApiSuccessResponse, IBooking } from '@eventhub/shared'

export interface BookingStats {
  total: number
  completed: number
  pending: number
  confirmed: number
  cancelled: number
  totalSpent: number
}

export interface BookingsResponse {
  bookings: IBooking[]
  pagination: { page: number; limit: number; total: number; pages: number }
}

export const bookingApi = {
  getMyBookings: async (filters?: { status?: string; page?: number; limit?: number }) => {
    const res = await apiClient.get<IApiSuccessResponse<BookingsResponse>>('/bookings', { params: filters })
    return res.data.data
  },
  getBookingDetails: async (bookingId: string) => {
    const res = await apiClient.get<IApiSuccessResponse<IBooking>>(`/bookings/${bookingId}`)
    return res.data.data
  },
  cancelBooking: async (bookingId: string, cancellationReason: string) => {
    const res = await apiClient.put<IApiSuccessResponse<IBooking>>(`/bookings/${bookingId}/cancel`, { cancellationReason })
    return res.data.data
  },
  getUpcomingBookings: async () => {
    const res = await apiClient.get<IApiSuccessResponse<IBooking[]>>('/bookings/upcoming')
    return res.data.data
  },
  getBookingStats: async () => {
    const res = await apiClient.get<IApiSuccessResponse<BookingStats>>('/bookings/stats')
    return res.data.data
  },

  createBooking: async (payload: {
    vendorId: string
    serviceName: string
    eventDate: string
    eventLocation: string
    guestCount: number
    totalAmount: number
    notes?: string
  }) => {
    const res = await apiClient.post<IApiSuccessResponse<IBooking>>('/bookings', payload)
    return res.data.data
  },

  addReview: async (bookingId: string, rating: number, review: string) => {
    const res = await apiClient.post<IApiSuccessResponse<IBooking>>(`/bookings/${bookingId}/review`, { rating, review })
    return res.data.data
  },
}
