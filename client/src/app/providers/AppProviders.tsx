import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { authService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/slices/authStore'

export function AppProviders({ children }: { children: ReactNode }) {
  const { tokens, setUser, clearAuth, isHydrated } = useAuthStore()

  useEffect(() => {
    if (!isHydrated || !tokens?.accessToken) return

    authService.getMe().then(setUser).catch(clearAuth)
  }, [isHydrated, tokens?.accessToken, setUser, clearAuth])

  return <>{children}</>
}
