export interface IApiSuccessResponse<T = unknown> {
  success: true
  message: string
  data: T
}

export interface IApiErrorResponse {
  success: false
  message: string
  errors?: Record<string, string[]>
}

export type IApiResponse<T = unknown> = IApiSuccessResponse<T> | IApiErrorResponse
