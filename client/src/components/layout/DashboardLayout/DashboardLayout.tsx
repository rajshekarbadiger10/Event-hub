import { useState } from 'react'
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { env } from '@/config/env'
import { useAuth } from '@/hooks/auth/useAuth'
import { useAuthStore } from '@/store/slices/authStore'
import { Button } from '@/components/ui/button'

const customerNav = [
  { label: 'Dashboard', path: '/customer/dashboard', icon: '📊' },
  { label: 'My Bookings', path: '/customer/bookings', icon: '📋' },
  { label: 'Browse Vendors', path: '/customer/vendors', icon: '🔍' },
  { label: 'Profile', path: '/customer/profile', icon: '👤' },
]
const vendorNav = [{ label: 'Dashboard', path: '/vendor/dashboard', icon: '📊' }]
const adminNav = [{ label: 'Dashboard', path: '/admin/dashboard', icon: '📊' }]

export function DashboardLayout() {
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = user?.role === 'vendor' ? vendorNav : user?.role === 'admin' ? adminNav : customerNav
  const isActive = (p: string) => location.pathname === p || location.pathname.startsWith(p + '/')
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || '??'

  const sidebar = (mobile: boolean) => (
    <>
      <div className="border-b border-slate-200/80 px-6 py-5">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => mobile && setMobileOpen(false)}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md shadow-blue-200">E</div>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{env.appName}</span>
        </Link>
      </div>
      <div className="border-b border-slate-200/80 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-semibold text-white shadow-sm">{initials}</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Navigation</p>
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} onClick={() => mobile && setMobileOpen(false)}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
            <span className="text-base">{item.icon}</span>
            {item.label}
            {isActive(item.path) && <div className="ml-auto h-2 w-2 rounded-full bg-blue-600" />}
          </Link>
        ))}
      </nav>
      <div className="border-t border-slate-200/80 p-4">
        <button onClick={() => { setMobileOpen(false); logout() }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600">
          <span className="text-base">🚪</span> Sign Out
        </button>
      </div>
    </>
  )

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <aside className="hidden w-72 flex-shrink-0 flex-col border-r border-slate-200/80 bg-white md:flex">{sidebar(false)}</aside>

      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <button className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
          <div className="hidden md:block">
            <p className="text-sm text-slate-500">Welcome back</p>
            <p className="font-semibold text-slate-900">{user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>🏠 Home</Button>
            <button onClick={() => logout()} className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600 md:hidden">Sign Out</button>
          </div>
        </header>

        {/* Mobile Overlay */}
        {mobileOpen && <div className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />}

        {/* Mobile Sidebar Drawer */}
        <div className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-2xl transition-transform duration-300 md:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {sidebar(true)}
        </div>

        <main className="flex-1 p-4 sm:p-6 lg:p-8"><Outlet /></main>
      </div>
    </div>
  )
}
