export const USER_ROLES = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const USER_ROLE_LIST: UserRole[] = [
  USER_ROLES.CUSTOMER,
  USER_ROLES.VENDOR,
  USER_ROLES.ADMIN,
]
