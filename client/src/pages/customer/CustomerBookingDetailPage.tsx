import { useState, useEffect, type FormEvent } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { bookingApi } from '@/services/booking/booking.api'
import type { IBooking } from '@eventhub/shared'
import { Badge, fmtDate, fmtMoney } from './customer.utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CustomerBookingDetailPage() {
  const { bookingId } = useParams<{ bookingId: string }>()
  const navigate = useNavigate()
  const [booking, setBooking] = useState<IBooking | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCancel, setShowCancel] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [submittingReview, setSubmittingReview] = useState(false)

  useEffect(() => {
    if (!bookingId) return
    bookingApi.getBookingDetails(bookingId)
      .then(setBooking)
      .catch(() => setError('Booking not found'))
      .finally(() => setLoading(false))
  }, [bookingId])

  const handleCancel = async (e: FormEvent) => {
    e.preventDefault()
    if (!bookingId || !cancelReason.trim()) return
    setCancelling(true)
    try {
      const updated = await bookingApi.cancelBooking(bookingId, cancelReason)
      setBooking(updated)
      setShowCancel(false)
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>
      setError(axiosErr.response?.data?.message ?? 'Failed to cancel booking')
    } finally {
      setCancelling(false)
    }
  }

  const handleReview = async (e: FormEvent) => {
    e.preventDefault()
    if (!bookingId || !review.trim()) return
    setSubmittingReview(true)
    try {
      const updated = await bookingApi.addReview(bookingId, rating, review)
      setBooking(updated)
      setShowReview(false)
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>
      setError(axiosErr.response?.data?.message ?? 'Failed to submit review')
    } finally {
      setSubmittingReview(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-slate-100" />
        <div className="h-64 animate-pulse rounded-2xl bg-slate-100" />
      </div>
    )
  }

  if (error && !booking) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <Button className="mt-4" variant="secondary" onClick={() => navigate('/customer/bookings')}>
          Back to Bookings
        </Button>
      </div>
    )
  }

  if (!booking) return null

  const canCancel = !['completed', 'cancelled'].includes(booking.status)
  const canReview = booking.status === 'completed' && !(booking as IBooking & { rating?: number }).rating

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-3">
        <Link to="/customer/bookings" className="text-sm text-blue-600 hover:text-blue-700">← Back to Bookings</Link>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{booking.serviceName}</h1>
            <p className="mt-1 text-sm text-slate-500">Booking ID: {booking._id.slice(-8).toUpperCase()}</p>
          </div>
          <Badge status={booking.status} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            { label: 'Event Date', value: fmtDate(booking.eventDate), icon: '📅' },
            { label: 'Location', value: booking.eventLocation || '—', icon: '📍' },
            { label: 'Guests', value: booking.guestCount?.toString() || '—', icon: '👥' },
            { label: 'Total Amount', value: fmtMoney(booking.totalAmount), icon: '💰' },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{item.icon} {item.label}</p>
              <p className="mt-1 text-sm font-semibold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>

        {booking.notes && (
          <div className="mt-6 rounded-xl bg-blue-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-blue-400">Notes</p>
            <p className="mt-1 text-sm text-slate-700">{booking.notes}</p>
          </div>
        )}

        {(booking as IBooking & { rating?: number }).rating && (
          <div className="mt-6 rounded-xl bg-green-50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-green-600">Your Review</p>
            <p className="mt-1 text-sm text-slate-700">
              {'⭐'.repeat((booking as IBooking & { rating?: number }).rating ?? 0)}
            </p>
            {(booking as IBooking & { review?: string }).review && (
              <p className="mt-2 text-sm text-slate-600">{(booking as IBooking & { review?: string }).review}</p>
            )}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {canCancel && (
            <Button variant="danger" onClick={() => setShowCancel(true)}>Cancel Booking</Button>
          )}
          {canReview && (
            <Button onClick={() => setShowReview(true)}>Leave a Review</Button>
          )}
        </div>
      </div>

      {/* Cancel modal */}
      {showCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Cancel Booking</h2>
            <p className="mt-1 text-sm text-slate-500">Please tell us why you want to cancel this booking.</p>
            <form onSubmit={handleCancel} className="mt-4 space-y-4">
              <textarea
                required
                rows={3}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Reason for cancellation..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex gap-3">
                <Button type="submit" variant="danger" isLoading={cancelling} className="flex-1">Confirm Cancel</Button>
                <Button type="button" variant="secondary" onClick={() => setShowCancel(false)} className="flex-1">Keep Booking</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review modal */}
      {showReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Leave a Review</h2>
            <p className="mt-1 text-sm text-slate-500">Share your experience with this vendor.</p>
            <form onSubmit={handleReview} className="mt-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Rating</label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRating(r)}
                      className={`text-2xl transition-transform hover:scale-110 ${r <= rating ? 'opacity-100' : 'opacity-30'}`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                required
                rows={3}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <div className="flex gap-3">
                <Button type="submit" isLoading={submittingReview} className="flex-1">Submit Review</Button>
                <Button type="button" variant="secondary" onClick={() => setShowReview(false)} className="flex-1">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
