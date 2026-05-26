import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library'
import { User } from '../models/User.js'
import { signToken } from '../lib/tokens.js'
import { sendPasswordResetEmail, sendVerificationEmail } from '../lib/email.js'
import { createEmailVerificationToken, hashVerificationToken } from '../lib/verification.js'
import { requireAuth } from '../middleware/auth.js'
import crypto from 'crypto'

const router = Router()

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function frontendUrl() {
  return (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')
}

function apiBaseUrl(req) {
  if (process.env.API_PUBLIC_URL) {
    return process.env.API_PUBLIC_URL.replace(/\/$/, '')
  }
  return `${req.protocol}://${req.get('host')}`
}

function authResponse(user) {
  const token = signToken(user._id.toString())
  return { ok: true, token, user: user.toSafeObject() }
}

async function issueVerification(user) {
  const { rawToken, hashed, expires } = createEmailVerificationToken()
  user.emailVerificationToken = hashed
  user.emailVerificationExpires = expires
  user.emailVerified = false
  await user.save()

  const verifyUrl = `${frontendUrl()}/?verify=${rawToken}`
  await sendVerificationEmail(user.email, verifyUrl)
  return verifyUrl
}

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body || {}
    const trimmedName = String(name || '').trim()
    const trimmedEmail = String(email || '').trim().toLowerCase()

    if (!trimmedName || trimmedName.length < 2) {
      return res.status(400).json({ error: 'Please enter your name.' })
    }
    if (!isEmail(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email.' })
    }
    if (!password || String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' })
    }

    const existing = await User.findOne({ email: trimmedEmail })
    if (existing) {
      if (existing.googleId && !existing.passwordHash) {
        return res.status(409).json({
          error: 'This email uses Google sign-in. Continue with Google instead.',
        })
      }
      if (!existing.emailVerified) {
        await issueVerification(existing)
        return res.json({
          ok: true,
          needsVerification: true,
          message: `We sent a verification link to ${trimmedEmail}. Check your inbox (and spam).`,
        })
      }
      return res.status(409).json({ error: 'An account with this email already exists.' })
    }

    const passwordHash = await bcrypt.hash(String(password), 12)
    const user = await User.create({
      name: trimmedName,
      email: trimmedEmail,
      passwordHash,
      emailVerified: false,
    })

    await issueVerification(user)

    res.status(201).json({
      ok: true,
      needsVerification: true,
      message: `Account created! We sent a verification link to ${trimmedEmail}. Open it to sign in.`,
    })
  } catch (err) {
    console.error('[auth/signup]', err.message)
    res.status(500).json({ error: 'Could not create account. Please try again.' })
  }
})

router.post('/verify-email', async (req, res) => {
  try {
    const { token } = req.body || {}
    if (!token) {
      return res.status(400).json({ error: 'Verification token is required.' })
    }

    const hashed = hashVerificationToken(token)
    const user = await User.findOne({
      emailVerificationToken: hashed,
      emailVerificationExpires: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({ error: 'Verification link is invalid or has expired.' })
    }

    user.emailVerified = true
    user.emailVerificationToken = null
    user.emailVerificationExpires = null
    user.lastLoginAt = new Date()
    await user.save()

    res.json(authResponse(user))
  } catch (err) {
    console.error('[auth/verify-email]', err.message)
    res.status(500).json({ error: 'Could not verify email. Please try again.' })
  }
})

router.post('/resend-verification', async (req, res) => {
  try {
    const trimmedEmail = String(req.body?.email || '').trim().toLowerCase()
    if (!isEmail(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email.' })
    }

    const user = await User.findOne({ email: trimmedEmail })
    if (user && user.passwordHash && !user.emailVerified) {
      await issueVerification(user)
    }

    res.json({
      ok: true,
      message:
        'If an unverified account exists, we sent a new verification link to that email.',
    })
  } catch (err) {
    console.error('[auth/resend-verification]', err.message)
    res.status(500).json({ error: 'Could not resend verification. Please try again.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    const trimmedEmail = String(email || '').trim().toLowerCase()

    if (!isEmail(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email.' })
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required.' })
    }

    const user = await User.findOne({ email: trimmedEmail })
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }
    if (!user.passwordHash) {
      return res.status(401).json({
        error: 'This account uses Google. Continue with Google to sign in.',
      })
    }

    const match = await bcrypt.compare(String(password), user.passwordHash)
    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password.' })
    }

    if (user.emailVerified === false) {
      await issueVerification(user)
      return res.status(403).json({
        error: 'Please verify your email first. We just sent you a new verification link.',
        needsVerification: true,
      })
    }

    user.lastLoginAt = new Date()
    await user.save()

    res.json(authResponse(user))
  } catch (err) {
    console.error('[auth/login]', err.message)
    res.status(500).json({ error: 'Could not sign in. Please try again.' })
  }
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ ok: true, user: req.user.toSafeObject() })
})

router.post('/forgot-password', async (req, res) => {
  try {
    const trimmedEmail = String(req.body?.email || '')
      .trim()
      .toLowerCase()

    if (!isEmail(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email.' })
    }

    const user = await User.findOne({ email: trimmedEmail })

    if (user && user.passwordHash) {
      const rawToken = crypto.randomBytes(32).toString('hex')
      const hashed = crypto.createHash('sha256').update(rawToken).digest('hex')
      user.resetPasswordToken = hashed
      user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000)
      await user.save()

      const resetUrl = `${frontendUrl()}/?reset=${rawToken}`
      await sendPasswordResetEmail(user.email, resetUrl)
    }

    res.json({
      ok: true,
      message:
        'If an account exists with that email, we sent password reset instructions.',
    })
  } catch (err) {
    console.error('[auth/forgot-password]', err.message)
    res.status(500).json({ error: 'Could not process request. Please try again.' })
  }
})

router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body || {}
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password are required.' })
    }
    if (String(password).length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' })
    }

    const hashed = crypto.createHash('sha256').update(String(token)).digest('hex')
    const user = await User.findOne({
      resetPasswordToken: hashed,
      resetPasswordExpires: { $gt: new Date() },
    })

    if (!user) {
      return res.status(400).json({ error: 'Reset link is invalid or has expired.' })
    }

    user.passwordHash = await bcrypt.hash(String(password), 12)
    user.resetPasswordToken = null
    user.resetPasswordExpires = null
    user.emailVerified = true
    user.lastLoginAt = new Date()
    await user.save()

    res.json(authResponse(user))
  } catch (err) {
    console.error('[auth/reset-password]', err.message)
    res.status(500).json({ error: 'Could not reset password. Please try again.' })
  }
})

router.get('/google', (req, res) => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  if (!clientId) {
    return res.status(503).json({
      error: 'Google sign-in is not configured. Add GOOGLE_CLIENT_ID to .env (see SETUP-GMAIL-GOOGLE.txt).',
    })
  }

  const redirectUri = `${apiBaseUrl(req)}/api/auth/google/callback`
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'online',
    prompt: 'select_account',
  })

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`)
})

router.get('/google/callback', async (req, res) => {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    if (!clientId || !clientSecret) {
      return res.redirect(`${frontendUrl()}/?auth_error=google_not_configured`)
    }

    const { code, error } = req.query
    if (error || !code) {
      return res.redirect(`${frontendUrl()}/?auth_error=google_cancelled`)
    }

    const redirectUri = `${apiBaseUrl(req)}/api/auth/google/callback`
    const client = new OAuth2Client(clientId, clientSecret, redirectUri)
    const { tokens } = await client.getToken(String(code))
    client.setCredentials(tokens)

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: clientId,
    })
    const payload = ticket.getPayload()
    if (!payload?.email) {
      return res.redirect(`${frontendUrl()}/?auth_error=google_no_email`)
    }

    const email = payload.email.toLowerCase()
    let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email }] })

    if (user) {
      if (!user.googleId) user.googleId = payload.sub
      if (!user.avatar && payload.picture) user.avatar = payload.picture
      if (payload.name && user.name === 'AMAZIA User') user.name = payload.name
      user.emailVerified = true
      user.emailVerificationToken = null
      user.emailVerificationExpires = null
      user.lastLoginAt = new Date()
      await user.save()
    } else {
      user = await User.create({
        name: payload.name || email.split('@')[0],
        email,
        googleId: payload.sub,
        avatar: payload.picture || null,
        emailVerified: true,
        lastLoginAt: new Date(),
      })
    }

    const token = signToken(user._id.toString())
    res.redirect(`${frontendUrl()}/?auth_token=${encodeURIComponent(token)}`)
  } catch (err) {
    console.error('[auth/google/callback]', err.message)
    res.redirect(`${frontendUrl()}/?auth_error=google_failed`)
  }
})

export default router
