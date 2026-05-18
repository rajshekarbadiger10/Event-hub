import { Link, Outlet, useNavigate } from 'react-router-dom'
import { env } from '@/config/env'
import { useAuth } from '@/hooks/auth/useAuth'
import { useAuthStore } from '@/store/slices/authStore'
import { Button } from '@/components/ui/button'

export function DashboardLayout() {
  const user = useAuthStore((s) => s.user)
  const { logout } = useAuth()
  const navigate = useNavigate()

  const dashboardPath =
    user?.role === 'vendor'
      ? '/vendor/dashboard'
      : user?.role === 'admin'
        ? '/admin/dashboard'
        : '/customer/dashboard'

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white md:block">
        <div className="border-b border-slate-200 px-6 py-5">
          <Link to="/" className="text-lg font-bold text-blue-600">
            {env.appName}
          </Link>
          <p className="mt-1 text-xs capitalize text-slate-500">{user?.role} portal</p>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            to={dashboardPath}
            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
          >
            Dashboard
          </Link>
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm text-slate-500">Welcome back</p>
            <p className="font-semibold text-slate-900">{user?.name}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              Home
            </Button>
            <Button variant="secondary" size="sm" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
