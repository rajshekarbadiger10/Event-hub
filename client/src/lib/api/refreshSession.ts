import axios from 'axios'
import type { IApiSuccessResponse, IAuthResponse } from '@eventhub/shared'
import { env } from '@/config/env'

/** Calls /auth/refresh without the api client (avoids interceptor loops). */
export async function refreshSession(refreshToken: string) {
  const { data } = await axios.post<IApiSuccessResponse<IAuthResponse>>(
    `${env.apiBaseUrl}/auth/refresh`,
    { refreshToken },
  )
  return data.data
}
