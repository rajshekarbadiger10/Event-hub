import type { UserRole } from '../constants/roles'

export interface IUser {
  _id: string
  name: string
  email: string
  role: UserRole
  phone?: string
  avatar?: string
  isActive: boolean
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface IUserPublic extends Omit<IUser, 'isActive'> {}

export interface IRegisterPayload {
  name: string
  email: string
  password: string
  role: UserRole
  phone?: string
}

export interface ILoginPayload {
  email: string
  password: string
}
