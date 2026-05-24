import type { AxiosError } from 'axios'

type ApiErrorBody = {
  message?: string
  errors?: Record<string, string[]>
}

export function getApiErrorMessage(
  err: unknown,
  fallback = 'Something went wrong. Please try again.',
) {
  const axiosErr = err as AxiosError<ApiErrorBody>
  const message = axiosErr.response?.data?.message
  if (message) return message

  const fieldErrors = axiosErr.response?.data?.errors
  if (fieldErrors) {
    return Object.values(fieldErrors).flat().join(', ')
  }

  return fallback
}
