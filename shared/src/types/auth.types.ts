import type { IUserPublic } from './user.types'

export interface IAuthTokens {
  accessToken: string
  refreshToken: string
}

export interface IAuthResponse {
  user: IUserPublic
  tokens: IAuthTokens
}

export interface IRefreshTokenPayload {
  refreshToken: string
}
