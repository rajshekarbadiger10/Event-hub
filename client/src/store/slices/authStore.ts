import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { IAuthTokens, IUserPublic } from '@eventhub/shared'

interface AuthState {
  user: IUserPublic | null
  tokens: IAuthTokens | null
  isAuthenticated: boolean
  isHydrated: boolean
  setAuth: (user: IUserPublic, tokens: IAuthTokens) => void
  setUser: (user: IUserPublic) => void
  clearAuth: () => void
  setHydrated: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isHydrated: false,
      setAuth: (user, tokens) =>
        set({ user, tokens, isAuthenticated: true }),
      setUser: (user) => set({ user }),
      clearAuth: () =>
        set({ user: null, tokens: null, isAuthenticated: false }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: 'eventhub-auth',
      partialize: (state) => ({
        user: state.user,
        tokens: state.tokens,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated()
      },
    },
  ),
)
