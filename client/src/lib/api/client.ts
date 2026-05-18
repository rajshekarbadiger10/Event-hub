import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
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

let isRefreshing = false
let refreshQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  refreshQueue.forEach((promise) => {
    if (error) promise.reject(error)
    else if (token) promise.resolve(token)
  })
  refreshQueue = []
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
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

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(apiClient(originalRequest))
          },
          reject,
        })
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post<{
        success: boolean
        data: { user: unknown; tokens: { accessToken: string; refreshToken: string } }
      }>(`${env.apiBaseUrl}/auth/refresh`, {
        refreshToken: tokens.refreshToken,
      })

      const { user, tokens: newTokens } = data.data
      setAuth(user as Parameters<typeof setAuth>[0], newTokens)
      processQueue(null, newTokens.accessToken)
      originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`
      return apiClient(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      clearAuth()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)
