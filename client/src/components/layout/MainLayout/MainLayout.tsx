import { Link, Outlet } from 'react-router-dom'
import { env } from '@/config/env'
import { useAuth } from '@/hooks/auth/useAuth'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/slices/authStore'

export function MainLayout() {
  const { isAuthenticated } = useAuthStore()
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="text-xl font-bold text-blue-600">
            {env.appName}
          </Link>
          <nav className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
                  Dashboard
                </Link>
                <Button variant="ghost" size="sm" onClick={() => logout()}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {env.appName}. All rights reserved.
      </footer>
    </div>
  )
}
