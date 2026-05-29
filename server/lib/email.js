import nodemailer from 'nodemailer'

function getTransport() {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!host || !user || !pass) return null
  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  })
}

async function sendMail({ to, subject, text, html, logLabel, logUrl }) {
  const from = process.env.EMAIL_FROM || 'AMAZIA <noreply@amazia.pk>'
  const transport = getTransport()

  if (!transport) {
    console.log(`[email] SMTP not configured — ${logLabel} for`, to)
    console.log('[email]', logUrl)
    return { dev: true, logged: true }
  }

  await transport.sendMail({ from, to, subject, text, html })
  return { sent: true }
}

export async function sendVerificationEmail(to, verifyUrl) {
  return sendMail({
    to,
    subject: 'Verify your AMAZIA account',
    text: `Welcome to AMAZIA!\n\nConfirm your email to sign in:\n${verifyUrl}\n\nThis link expires in 24 hours.`,
    html: `
      <p>Welcome to <strong>AMAZIA</strong>!</p>
      <p>Please confirm your email to activate your account:</p>
      <p><a href="${verifyUrl}" style="display:inline-block;padding:12px 24px;background:#1a5c52;color:#fff;text-decoration:none;">Verify my email</a></p>
      <p>Or copy this link:<br><a href="${verifyUrl}">${verifyUrl}</a></p>
      <p>This link expires in 24 hours.</p>
    `,
    logLabel: 'verification link',
    logUrl: verifyUrl,
  })
}

export async function sendPasswordResetEmail(to, resetUrl) {
  return sendMail({
    to,
    subject: 'Reset your AMAZIA password',
    text: `You requested a password reset for AMAZIA.\n\nOpen this link (valid for 1 hour):\n${resetUrl}\n\nIf you did not request this, ignore this email.`,
    html: `
      <p>You requested a password reset for <strong>AMAZIA</strong>.</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>This link expires in 1 hour. If you did not request this, you can ignore this email.</p>
    `,
    logLabel: 'password reset link',
    logUrl: resetUrl,
  })
}

export function isSmtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
}

export function getNewsletterPromoCode() {
  return (process.env.NEWSLETTER_PROMO_CODE || 'BARRIER10').trim() || 'BARRIER10'
}

export async function sendNewsletterOfferEmail(to) {
  const code = getNewsletterPromoCode()
  const shopUrl = (process.env.FRONTEND_URL || 'https://amazia.pk').replace(/\/$/, '')

  return sendMail({
    to,
    subject: 'Your 10% off — AMAZIA',
    text: `Thanks for joining AMAZIA.\n\nYour first-order code: ${code}\n\nUse it at checkout on ${shopUrl}\n\nBarrier care, thoughtfully.`,
    html: `
      <p>Thanks for joining <strong>AMAZIA</strong>.</p>
      <p>Your first-order code:</p>
      <p style="font-size:1.35em;letter-spacing:0.12em;font-weight:700;color:#1a5c52;">${code}</p>
      <p>Enter it at checkout on <a href="${shopUrl}">${shopUrl}</a>.</p>
      <p style="color:#666;font-size:0.9em;">One use per customer. Cannot be combined with other offers.</p>
    `,
    logLabel: '10% welcome code',
    logUrl: code,
  })
}
