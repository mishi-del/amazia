import { verifyToken } from '../lib/tokens.js'
import { User } from '../models/User.js'

export async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (!token) {
      return res.status(401).json({ error: 'Please sign in to continue.' })
    }
    const payload = verifyToken(token)
    const user = await User.findById(payload.sub)
    if (!user) {
      return res.status(401).json({ error: 'Session expired. Please sign in again.' })
    }
    req.user = user
    next()
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session.' })
  }
}

export async function optionalAuth(req, _res, next) {
  try {
    const header = req.headers.authorization || ''
    const token = header.startsWith('Bearer ') ? header.slice(7) : null
    if (token) {
      const payload = verifyToken(token)
      req.user = await User.findById(payload.sub)
    }
  } catch {
    req.user = null
  }
  next()
}
