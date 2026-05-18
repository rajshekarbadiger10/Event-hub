import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export const signAccessToken = (payload) =>
  jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn })

export const signRefreshToken = (payload) =>
  jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: env.jwt.refreshExpiresIn,
  })

export const verifyAccessToken = (token) =>
  jwt.verify(token, env.jwt.secret)

export const verifyRefreshToken = (token) =>
  jwt.verify(token, env.jwt.refreshSecret)
