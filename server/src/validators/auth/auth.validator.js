import { z } from 'zod'
import { USER_ROLE_LIST, USER_ROLES } from '../../constants/roles.js'

const registerableRoles = USER_ROLE_LIST.filter((r) => r !== USER_ROLES.ADMIN)

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128),
  role: z.enum(registerableRoles).default(USER_ROLES.CUSTOMER),
  phone: z.string().trim().optional(),
})

export const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
})
