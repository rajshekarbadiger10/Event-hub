import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/authStore'
import { LoadingScreen } from '@/components/common/LoadingScreen/LoadingScreen'

export function ProtectedRoute() {
  const location = useLocation()
  const { isAuthenticated, isHydrated } = useAuthStore()

  if (!isHydrated) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
