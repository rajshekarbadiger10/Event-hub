import crypto from 'node:crypto'
import { User } from '../../models/User.js'
import { AppError } from '../../utils/AppError.js'
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../../utils/token.js'
import { USER_ROLES } from '../../constants/roles.js'

const hashToken = (token) =>
  crypto.createHash('sha256').update(token).digest('hex')

const buildTokens = (user) => {
  const payload = { id: user._id.toString(), role: user.role }
  const accessToken = signAccessToken(payload)
  const refreshToken = signRefreshToken(payload)
  return { accessToken, refreshToken }
}

export const registerUser = async ({ name, email, password, role, phone }) => {
  const existing = await User.findOne({ email })
  if (existing) {
    throw new AppError('Email is already registered', 409)
  }

  if (role === USER_ROLES.ADMIN) {
    throw new AppError('Admin accounts cannot be self-registered', 403)
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role ?? USER_ROLES.CUSTOMER,
    phone,
  })

  const tokens = buildTokens(user)
  user.refreshTokenHash = hashToken(tokens.refreshToken)
  await user.save({ validateBeforeSave: false })

  return { user: user.toPublicJSON(), tokens }
}

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password +refreshTokenHash')

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401)
  }

  if (!user.isActive) {
    throw new AppError('Account is deactivated. Contact support.', 403)
  }

  const tokens = buildTokens(user)
  user.refreshTokenHash = hashToken(tokens.refreshToken)
  await user.save({ validateBeforeSave: false })

  return { user: user.toPublicJSON(), tokens }
}

export const refreshUserTokens = async (refreshToken) => {
  let decoded
  try {
    decoded = verifyRefreshToken(refreshToken)
  } catch {
    throw new AppError('Invalid or expired refresh token', 401)
  }

  const user = await User.findById(decoded.id).select('+refreshTokenHash')
  if (!user || !user.refreshTokenHash) {
    throw new AppError('Session expired. Please log in again.', 401)
  }

  const incomingHash = hashToken(refreshToken)
  if (incomingHash !== user.refreshTokenHash) {
    throw new AppError('Invalid refresh token', 401)
  }

  const tokens = buildTokens(user)
  user.refreshTokenHash = hashToken(tokens.refreshToken)
  await user.save({ validateBeforeSave: false })

  return { user: user.toPublicJSON(), tokens }
}

export const logoutUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } })
}

export const getUserById = async (userId) => {
  const user = await User.findById(userId)
  if (!user) {
    throw new AppError('User not found', 404)
  }
  return user.toPublicJSON()
}

export const updateUser = async (userId, updates) => {
  const user = await User.findById(userId)
  if (!user) throw new AppError('User not found', 404)
  const allowed = ['name', 'phone']
  for (const f of allowed) {
    if (updates[f] !== undefined) user[f] = updates[f]
  }
  await user.save()
  return user.toPublicJSON()
}

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select('+password')
  if (!user) throw new AppError('User not found', 404)
  if (!(await user.comparePassword(currentPassword))) {
    throw new AppError('Current password is incorrect', 400)
  }
  user.password = newPassword
  await user.save()
}
