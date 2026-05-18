import { Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/slices/authStore'
import { LoadingScreen } from '@/components/common/LoadingScreen/LoadingScreen'
import { DashboardRedirectPage } from '@/pages/errors/DashboardRedirectPage'

export function GuestOnlyRoute() {
  const { isAuthenticated, isHydrated } = useAuthStore()

  if (!isHydrated) return <LoadingScreen />
  if (isAuthenticated) return <DashboardRedirectPage />

  return <Outlet />
}
