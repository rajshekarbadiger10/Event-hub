import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { authService } from '@/services/auth/auth.service'
import { useAuthStore } from '@/store/slices/authStore'

export function AppProviders({ children }: { children: ReactNode }) {
  const { tokens, setUser, clearAuth, isHydrated, setHydrated } = useAuthStore()

  useEffect(() => {
    if (!isHydrated) return

    const bootstrap = async () => {
      if (!tokens?.accessToken) return
      try {
        const user = await authService.getMe()
        setUser(user)
      } catch {
        clearAuth()
      }
    }

    bootstrap()
  }, [isHydrated, tokens?.accessToken, setUser, clearAuth])

  useEffect(() => {
    const unsub = useAuthStore.persist.onFinishHydration(() => {
      setHydrated()
    })
    if (useAuthStore.persist.hasHydrated()) {
      setHydrated()
    }
    return unsub
  }, [setHydrated])

  return <>{children}</>
}
