import jwt from 'jsonwebtoken'

const SECRET = () => {
  const s = process.env.JWT_SECRET
  if (!s) throw new Error('JWT_SECRET is required in .env')
  return s
}

export function signToken(userId) {
  return jwt.sign({ sub: userId }, SECRET(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET())
}
