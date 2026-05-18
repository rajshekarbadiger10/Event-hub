import { Router } from 'express'
import * as authController from '../../../controllers/auth/auth.controller.js'
import { validate } from '../../../middleware/validation/validate.js'
import {
  loginSchema,
  refreshTokenSchema,
  registerSchema,
} from '../../../validators/auth/auth.validator.js'
import { authenticate } from '../../../middleware/auth/authenticate.js'
import { authLimiter } from '../../../middleware/rateLimit/authLimiter.js'

const router = Router()

router.use(authLimiter)

router.post('/register', validate(registerSchema), authController.register)
router.post('/login', validate(loginSchema), authController.login)
router.post('/refresh', validate(refreshTokenSchema), authController.refresh)
router.post('/logout', authenticate, authController.logout)
router.get('/me', authenticate, authController.getMe)

export default router
