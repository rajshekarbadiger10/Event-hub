import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { ILoginPayload, IRegisterPayload } from '@eventhub/shared'
import { USER_ROLES, type UserRole } from '@eventhub/shared'
import { authService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/slices/authStore'

const roleDashboardPath: Record<UserRole, string> = {
  [USER_ROLES.CUSTOMER]: '/customer/dashboard',
  [USER_ROLES.VENDOR]: '/vendor/dashboard',
  [USER_ROLES.ADMIN]: '/admin/dashboard',
}

const isSafeRedirect = (path?: string) =>
  Boolean(
    path?.startsWith('/') &&
      !path.startsWith('/login') &&
      !path.startsWith('/register'),
  )

export const useAuth = () => {
  const navigate = useNavigate()
  const { user, isAuthenticated, setAuth, clearAuth } = useAuthStore()

  const redirectByRole = useCallback(
    (role: UserRole) => {
      navigate(roleDashboardPath[role], { replace: true })
    },
    [navigate],
  )

  const login = useCallback(
    async (payload: ILoginPayload, returnTo?: string) => {
      const { user: loggedInUser, tokens } = await authService.login(payload)
      setAuth(loggedInUser, tokens)
      if (isSafeRedirect(returnTo)) {
        navigate(returnTo!, { replace: true })
      } else {
        redirectByRole(loggedInUser.role)
      }
    },
    [setAuth, redirectByRole, navigate],
  )

  const register = useCallback(
    async (payload: IRegisterPayload) => {
      const { user: newUser, tokens } = await authService.register(payload)
      setAuth(newUser, tokens)
      redirectByRole(newUser.role)
    },
    [setAuth, redirectByRole],
  )

  const logout = useCallback(async () => {
    try {
      if (useAuthStore.getState().tokens) {
        await authService.logout()
      }
    } finally {
      clearAuth()
      navigate('/login', { replace: true })
    }
  }, [clearAuth, navigate])

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    redirectByRole,
  }
}
