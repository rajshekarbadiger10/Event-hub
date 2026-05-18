import { AppError } from '../../utils/AppError.js'
import { verifyAccessToken } from '../../utils/token.js'
import { User } from '../../models/User.js'

export const authenticate = async (req, _res, next) => {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      throw new AppError('Authentication required', 401)
    }

    const token = header.split(' ')[1]
    const decoded = verifyAccessToken(token)

    const user = await User.findById(decoded.id)
    if (!user || !user.isActive) {
      throw new AppError('User not found or inactive', 401)
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
    }
    next()
  } catch (error) {
    if (error instanceof AppError) return next(error)
    next(new AppError('Invalid or expired token', 401))
  }
}
