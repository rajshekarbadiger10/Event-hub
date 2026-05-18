import { Navigate, Outlet } from 'react-router-dom'
import type { UserRole } from '@eventhub/shared'
import { useAuthStore } from '@/store/slices/authStore'

interface RoleGuardProps {
  allowedRoles: UserRole[]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const user = useAuthStore((s) => s.user)

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}
