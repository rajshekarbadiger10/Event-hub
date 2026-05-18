import { Navigate } from 'react-router-dom'
import { USER_ROLES } from '@eventhub/shared'
import { useAuthStore } from '@/store/slices/authStore'
import { LoadingScreen } from '@/components/common/LoadingScreen/LoadingScreen'

export function DashboardRedirectPage() {
  const { user, isHydrated } = useAuthStore()

  if (!isHydrated) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />

  const paths = {
    [USER_ROLES.CUSTOMER]: '/customer/dashboard',
    [USER_ROLES.VENDOR]: '/vendor/dashboard',
    [USER_ROLES.ADMIN]: '/admin/dashboard',
  } as const

  return <Navigate to={paths[user.role]} replace />
}
