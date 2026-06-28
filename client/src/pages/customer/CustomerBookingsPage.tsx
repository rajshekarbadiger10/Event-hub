import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { bookingApi } from '@/services/booking/booking.api'
import type { IBooking } from '@eventhub/shared'
import { Badge, fmtDate, fmtMoney } from './customer.utils'
import { Button } from '@/components/ui/button'

const STATUS_FILTERS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
]

export function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([])
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const result = await bookingApi.getMyBookings({ status: status || undefined, page, limit: 10 })
        setBookings(result.bookings)
        setTotalPages(result.pagination.pages)
      } catch {
        setBookings([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [status, page])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Bookings</h1>
          <p className="mt-1 text-sm text-slate-500">View and manage all your event bookings</p>
        </div>
        <Link to="/customer/vendors">
          <Button>+ New Booking</Button>
        </Link>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => { setStatus(f.value); setPage(1) }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              status === f.value
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Bookings list */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        {loading ? (
          <div className="divide-y divide-slate-100">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 animate-pulse rounded bg-slate-100" />
                  <div className="h-3 w-56 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <>
            <div className="divide-y divide-slate-100">
              {bookings.map((b) => (
                <Link
                  key={b._id}
                  to={`/customer/bookings/${b._id}`}
                  className="flex flex-col gap-3 p-5 transition-colors hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-xl">
                    🎉
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{b.serviceName}</p>
                      <Badge status={b.status} />
                    </div>
                    <p className="mt-1 text-xs text-slate-500">
                      📅 {fmtDate(b.eventDate)}
                      {b.eventLocation && ` · 📍 ${b.eventLocation}`}
                      {b.guestCount && ` · 👥 ${b.guestCount} guests`}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-900">{fmtMoney(b.totalAmount)}</p>
                </Link>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 border-t border-slate-100 px-6 py-4">
                <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                  Previous
                </Button>
                <span className="text-sm text-slate-600">Page {page} of {totalPages}</span>
                <Button variant="secondary" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                  Next
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">📋</div>
            <p className="mt-4 text-sm font-medium text-slate-700">No bookings found</p>
            <p className="mt-1 text-xs text-slate-500">
              {status ? 'Try a different filter or browse vendors to book' : 'Browse vendors to create your first booking'}
            </p>
            <Link to="/customer/vendors" className="mt-4">
              <Button>Browse Vendors</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
