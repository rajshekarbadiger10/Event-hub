import { asyncHandler } from '../../utils/asyncHandler.js'
import { sendSuccess } from '../../utils/apiResponse.js'
import * as authService from '../../services/auth/auth.service.js'

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body)
  sendSuccess(res, {
    statusCode: 201,
    message: 'Registration successful',
    data: result,
  })
})

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body)
  sendSuccess(res, {
    message: 'Login successful',
    data: result,
  })
})

export const refresh = asyncHandler(async (req, res) => {
  const result = await authService.refreshUserTokens(req.body.refreshToken)
  sendSuccess(res, {
    message: 'Token refreshed',
    data: result,
  })
})

export const logout = asyncHandler(async (req, res) => {
  await authService.logoutUser(req.user.id)
  sendSuccess(res, { message: 'Logged out successfully', data: null })
})

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user.id)
  sendSuccess(res, { message: 'Profile fetched', data: { user } })
})
