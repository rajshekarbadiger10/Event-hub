import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/authStore'
import { bookingApi, type BookingStats } from '@/services/booking/booking.api'
import type { IBooking } from '@eventhub/shared'
import { Badge, fmtDate, fmtMoney } from './customer.utils'

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
}

export function CustomerDashboardPage() {
  const user = useAuthStore((s) => s.user)
  const [stats, setStats] = useState<BookingStats | null>(null)
  const [upcoming, setUpcoming] = useState<IBooking[]>([])
  const [recent, setRecent] = useState<IBooking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [s, u, r] = await Promise.allSettled([
          bookingApi.getBookingStats(),
          bookingApi.getUpcomingBookings(),
          bookingApi.getMyBookings({ limit: 5 }),
        ])
        if (s.status === 'fulfilled') setStats(s.value)
        else setStats({ total: 0, completed: 0, pending: 0, confirmed: 0, cancelled: 0, totalSpent: 0 })
        if (u.status === 'fulfilled') setUpcoming(u.value)
        if (r.status === 'fulfilled') setRecent(r.value.bookings)
      } finally { setLoading(false) }
    }
    load()
  }, [])

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="space-y-8">
      {/* Hero Welcome */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-xl sm:p-8">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <p className="text-sm font-medium text-blue-100">{greeting()}</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{firstName} 👋</h1>
          <p className="mt-2 max-w-lg text-sm text-blue-100 leading-relaxed">
            Welcome to your EventHub dashboard. Manage your event bookings, explore vendors, and keep track of everything in one place.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/customer/vendors" className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30">🔍 Browse Vendors</Link>
            <Link to="/customer/bookings" className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-blue-700 shadow-sm transition-all hover:shadow-md">📋 View Bookings</Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {loading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />) : (
          <>
            {[
              { icon: '📦', label: 'Total Bookings', value: stats?.total ?? 0, gradient: 'bg-gradient-to-br from-blue-500 to-blue-600', sub: 'All time' },
              { icon: '⏳', label: 'Pending', value: (stats?.pending ?? 0) + (stats?.confirmed ?? 0), gradient: 'bg-gradient-to-br from-amber-500 to-orange-500', sub: 'Awaiting action' },
              { icon: '✅', label: 'Completed', value: stats?.completed ?? 0, gradient: 'bg-gradient-to-br from-emerald-500 to-green-600', sub: 'Successfully done' },
              { icon: '💰', label: 'Total Spent', value: fmtMoney(stats?.totalSpent ?? 0), gradient: 'bg-gradient-to-br from-violet-500 to-purple-600', sub: 'Across all events' },
            ].map((c) => (
              <div key={c.label} className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                <div className={`absolute -right-4 -top-4 h-20 w-20 rounded-full opacity-10 blur-2xl ${c.gradient}`} />
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-slate-400">{c.label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">{c.value}</p>
                    <p className="mt-1 text-xs text-slate-500">{c.sub}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.gradient} text-lg text-white shadow-md`}>{c.icon}</div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div><h2 className="text-base font-semibold text-slate-900">Upcoming Events</h2><p className="mt-0.5 text-xs text-slate-500">Your next scheduled bookings</p></div>
            <Link to="/customer/bookings" className="text-xs font-medium text-blue-600 hover:text-blue-700">View all →</Link>
          </div>
          <div className="divide-y divide-slate-100">
            {loading ? Array.from({ length: 3 }).map((_, i) => <div key={i} className="flex items-center gap-4 p-5"><div className="h-12 w-12 animate-pulse rounded-xl bg-slate-100" /><div className="flex-1 space-y-2"><div className="h-4 w-32 animate-pulse rounded bg-slate-100" /><div className="h-3 w-48 animate-pulse rounded bg-slate-100" /></div></div>) : upcoming.length > 0 ? upcoming.map((b) => (
              <Link key={b._id} to={`/customer/bookings/${b._id}`} className="flex items-center gap-4 p-5 transition-colors hover:bg-slate-50">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-lg">🎉</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2"><p className="truncate text-sm font-semibold text-slate-900">{b.serviceName}</p><Badge status={b.status} /></div>
                  <p className="mt-0.5 text-xs text-slate-500">📅 {fmtDate(b.eventDate)}{b.eventLocation && ` · 📍 ${b.eventLocation}`}</p>
                </div>
                <p className="hidden text-sm font-semibold text-slate-900 sm:block">{fmtMoney(b.totalAmount)}</p>
              </Link>
            )) : (
              <div className="flex flex-col items-center px-6 py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">📅</div>
                <p className="mt-4 text-sm font-medium text-slate-700">No upcoming events</p>
                <p className="mt-1 text-xs text-slate-500">Browse vendors to create your first booking</p>
                <Link to="/customer/vendors" className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700">Browse Vendors</Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-slate-900">Quick Actions</h2>
          <p className="mt-0.5 text-xs text-slate-500">Get started quickly</p>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {[
              { icon: '🔍', title: 'Browse Vendors', desc: 'Find the perfect vendor for your event', to: '/customer/vendors', grad: 'bg-gradient-to-br from-blue-500 to-indigo-500' },
              { icon: '📋', title: 'My Bookings', desc: 'View and manage all your bookings', to: '/customer/bookings', grad: 'bg-gradient-to-br from-emerald-500 to-green-500' },
              { icon: '👤', title: 'My Profile', desc: 'Update your account information', to: '/customer/profile', grad: 'bg-gradient-to-br from-violet-500 to-purple-500' },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="group relative flex flex-col items-center rounded-2xl border-2 border-slate-200/80 bg-white p-5 text-center transition-all duration-300 hover:border-blue-300 hover:shadow-lg hover:-translate-y-1">
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${a.grad} text-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110`}>{a.icon}</div>
                <h3 className="text-sm font-semibold text-slate-900">{a.title}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{a.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div><h2 className="text-base font-semibold text-slate-900">Recent Activity</h2><p className="mt-0.5 text-xs text-slate-500">Your latest booking activity</p></div>
          <Link to="/customer/bookings" className="text-xs font-medium text-blue-600 hover:text-blue-700">See all →</Link>
        </div>
        {loading ? <div className="p-6">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="mb-4 flex items-center gap-3"><div className="h-10 w-10 animate-pulse rounded-xl bg-slate-100" /><div className="flex-1 space-y-2"><div className="h-3 w-40 animate-pulse rounded bg-slate-100" /><div className="h-3 w-24 animate-pulse rounded bg-slate-100" /></div></div>)}</div> : recent.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-slate-100 text-left">
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Service</th>
                <th className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 sm:table-cell">Date</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 text-right">Amount</th>
              </tr></thead>
              <tbody className="divide-y divide-slate-100">
                {recent.map((b) => (
                  <tr key={b._id} className="cursor-pointer transition-colors hover:bg-slate-50">
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`/customer/bookings/${b._id}`} className="block">
                        <p className="text-sm font-medium text-slate-900">{b.serviceName}</p>
                        {b.eventLocation && <p className="mt-0.5 text-xs text-slate-500">📍 {b.eventLocation}</p>}
                      </Link>
                    </td>
                    <td className="hidden whitespace-nowrap px-6 py-4 text-sm text-slate-600 sm:table-cell">
                      <Link to={`/customer/bookings/${b._id}`}>{fmtDate(b.eventDate)}</Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4"><Badge status={b.status} /></td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-slate-900">
                      <Link to={`/customer/bookings/${b._id}`}>{fmtMoney(b.totalAmount)}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl">📝</div>
            <p className="mt-4 text-sm font-medium text-slate-700">No activity yet</p>
            <p className="mt-1 text-xs text-slate-500">Your booking history will appear here</p>
          </div>
        )}
      </div>

      {/* Help Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-r from-slate-50 to-blue-50/50 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100 text-xl">💡</div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Need Help?</h3>
            <div className="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
              {['Browse vendor directory to find services', 'Create bookings from vendor profiles', 'Track bookings with real-time status', 'Leave reviews after events', 'Manage payments & cancellations', 'View your spending analytics'].map((t) => (
                <p key={t} className="flex items-start gap-1.5"><span className="mt-0.5 text-blue-400">•</span>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
