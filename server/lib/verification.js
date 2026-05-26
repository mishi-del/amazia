import crypto from 'crypto'

export function createEmailVerificationToken() {
  const rawToken = crypto.randomBytes(32).toString('hex')
  const hashed = crypto.createHash('sha256').update(rawToken).digest('hex')
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
  return { rawToken, hashed, expires }
}

export function hashVerificationToken(rawToken) {
  return crypto.createHash('sha256').update(String(rawToken)).digest('hex')
}
