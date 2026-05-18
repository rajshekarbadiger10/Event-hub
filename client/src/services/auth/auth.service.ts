import type {
  IApiSuccessResponse,
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
  IUserPublic,
} from '@eventhub/shared'
import { apiClient } from '@/lib/api/client'

type AuthData = IAuthResponse

export const authService = {
  register: async (payload: IRegisterPayload) => {
    const { data } = await apiClient.post<IApiSuccessResponse<AuthData>>(
      '/auth/register',
      payload,
    )
    return data.data
  },

  login: async (payload: ILoginPayload) => {
    const { data } = await apiClient.post<IApiSuccessResponse<AuthData>>(
      '/auth/login',
      payload,
    )
    return data.data
  },

  logout: async () => {
    await apiClient.post('/auth/logout')
  },

  getMe: async () => {
    const { data } = await apiClient.get<
      IApiSuccessResponse<{ user: IUserPublic }>
    >('/auth/me')
    return data.data.user
  },
}
