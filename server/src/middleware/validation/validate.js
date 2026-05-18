import { AppError } from '../../utils/AppError.js'

export const validate =
  (schema, source = 'body') =>
  (req, _res, next) => {
    const result = schema.safeParse(req[source])
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return next(new AppError('Validation failed', 400, errors))
    }
    req[source] = result.data
    next()
  }
