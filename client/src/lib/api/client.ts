import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { IAuthTokens } from '@eventhub/shared'
import { env } from '@/config/env'
import { refreshSession } from '@/lib/api/refreshSession'
import { useAuthStore } from '@/store/slices/authStore'

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
})

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().tokens?.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshPromise: Promise<IAuthTokens> | null = null

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    const { tokens, setAuth, clearAuth } = useAuthStore.getState()
    if (!tokens?.refreshToken) {
      clearAuth()
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = refreshSession(tokens.refreshToken).then(
          ({ user, tokens: newTokens }) => {
            setAuth(user, newTokens)
            return newTokens
          },
        ).finally(() => {
            refreshPromise = null
          })
      }

      const newTokens = await refreshPromise
      originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      clearAuth()
      return Promise.reject(refreshError)
    }
  },
)
