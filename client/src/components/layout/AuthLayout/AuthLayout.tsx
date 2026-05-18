import { Link, Outlet } from 'react-router-dom'
import { env } from '@/config/env'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-12">
      <Link to="/" className="mb-8 text-2xl font-bold text-blue-600">
        {env.appName}
      </Link>
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  )
}
