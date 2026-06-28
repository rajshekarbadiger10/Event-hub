import { useState, useEffect, type FormEvent } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'
import { vendorApi } from '@/services/vendor/vendor.api'
import { bookingApi } from '@/services/booking/booking.api'
import type { IVendor } from '@eventhub/shared'
import { CATEGORY_ICONS, fmtMoney } from './customer.utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function CustomerVendorDetailPage() {
  const { vendorId } = useParams<{ vendorId: string }>()
  const navigate = useNavigate()
  const [vendor, setVendor] = useState<IVendor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showBook, setShowBook] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [bookError, setBookError] = useState('')
  const [form, setForm] = useState({
    serviceName: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    totalAmount: '',
    notes: '',
  })

  useEffect(() => {
    if (!vendorId) return
    vendorApi.getVendorProfile(vendorId)
      .then(setVendor)
      .catch(() => setError('Vendor not found'))
      .finally(() => setLoading(false))
  }, [vendorId])

  const handleBook = async (e: FormEvent) => {
    e.preventDefault()
    if (!vendorId) return
    setBookError('')
    setSubmitting(true)
    try {
      const booking = await bookingApi.createBooking({
        vendorId,
        serviceName: form.serviceName,
        eventDate: form.eventDate,
        eventLocation: form.eventLocation,
        guestCount: parseInt(form.guestCount, 10),
        totalAmount: parseFloat(form.totalAmount),
        notes: form.notes || undefined,
      })
      navigate(`/customer/bookings/${booking._id}`)
    } catch (err) {
      const axiosErr = err as AxiosError<{ message?: string }>
      setBookError(axiosErr.response?.data?.message ?? 'Failed to create booking')
    } finally {
      setSubmitting(false)
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

  if (error || !vendor) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <p className="text-sm text-red-600">{error || 'Vendor not found'}</p>
        <Link to="/customer/vendors" className="mt-4 text-sm text-blue-600 hover:text-blue-700">← Back to Vendors</Link>
      </div>
    )
  }

  const rating = (vendor as IVendor & { rating?: number }).rating ?? vendor.profile.rating ?? 0

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link to="/customer/vendors" className="text-sm text-blue-600 hover:text-blue-700">← Back to Vendors</Link>

      {/* Vendor header */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-3xl text-white shadow-md">
              {CATEGORY_ICONS[vendor.profile.category] || '✨'}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{vendor.profile.businessName}</h1>
              <p className="mt-1 text-sm text-slate-500">{vendor.profile.category}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                <span>⭐ {rating.toFixed(1)}</span>
                {vendor.profile.city && <span>📍 {vendor.profile.city}{vendor.profile.state ? `, ${vendor.profile.state}` : ''}</span>}
              </div>
            </div>
          </div>
          <Button onClick={() => setShowBook(true)} className="w-full sm:w-auto">Book This Vendor</Button>
        </div>

        {vendor.profile.description && (
          <div className="mt-6 border-t border-slate-100 pt-6">
            <h2 className="text-sm font-semibold text-slate-900">About</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">{vendor.profile.description}</p>
          </div>
        )}

        <div className="mt-6 grid gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          {vendor.profile.address && (
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Address</p>
              <p className="mt-1 text-sm text-slate-700">{vendor.profile.address}</p>
            </div>
          )}
          {vendor.profile.pincode && (
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Pincode</p>
              <p className="mt-1 text-sm text-slate-700">{vendor.profile.pincode}</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking modal */}
      {showBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Book {vendor.profile.businessName}</h2>
            <p className="mt-1 text-sm text-slate-500">Fill in your event details to request a booking.</p>

            {bookError && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{bookError}</p>}

            <form onSubmit={handleBook} className="mt-4 space-y-4">
              <Input
                label="Service Name"
                required
                placeholder="e.g. Wedding Photography Package"
                value={form.serviceName}
                onChange={(e) => setForm({ ...form, serviceName: e.target.value })}
              />
              <Input
                label="Event Date"
                type="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={form.eventDate}
                onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
              />
              <Input
                label="Event Location"
                required
                placeholder="Venue or address"
                value={form.eventLocation}
                onChange={(e) => setForm({ ...form, eventLocation: e.target.value })}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Guest Count"
                  type="number"
                  required
                  min={1}
                  placeholder="100"
                  value={form.guestCount}
                  onChange={(e) => setForm({ ...form, guestCount: e.target.value })}
                />
                <Input
                  label="Estimated Budget (₹)"
                  type="number"
                  required
                  min={1}
                  placeholder="50000"
                  value={form.totalAmount}
                  onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Additional Notes</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any special requirements..."
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button type="submit" isLoading={submitting} className="flex-1">Submit Booking</Button>
                <Button type="button" variant="secondary" onClick={() => setShowBook(false)} className="flex-1">Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
