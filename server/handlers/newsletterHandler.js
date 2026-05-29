import { Newsletter } from '../models/Newsletter.js'
import { User } from '../models/User.js'
import {
  getNewsletterPromoCode,
  isSmtpConfigured,
  sendNewsletterOfferEmail,
} from '../lib/email.js'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function handleNewsletterSubscribe({ email, source, website, user }) {
  if (website) {
    return { ok: true }
  }

  const trimmed = String(email || user?.email || '')
    .trim()
    .toLowerCase()

  if (!trimmed || !isEmail(trimmed)) {
    const err = new Error('A valid email is required.')
    err.status = 400
    throw err
  }

  const signupSource = source === 'popup' ? 'popup' : 'footer_section'

  await Newsletter.findOneAndUpdate(
    { email: trimmed },
    {
      email: trimmed,
      source: signupSource,
      userId: user?._id || null,
    },
    { upsert: true, new: true }
  )

  if (user) {
    user.newsletterSubscribed = true
    await user.save()
  } else {
    try {
      await User.updateOne({ email: trimmed }, { $set: { newsletterSubscribed: true } })
    } catch {
      /* guest signup — newsletter record is enough */
    }
  }

  const promoCode = getNewsletterPromoCode()
  let emailSent = false
  try {
    const mailResult = await sendNewsletterOfferEmail(trimmed)
    emailSent = Boolean(mailResult?.sent)
  } catch (mailErr) {
    console.error('[newsletter/email]', mailErr.message)
  }

  return {
    ok: true,
    promoCode,
    emailSent,
    smtpConfigured: isSmtpConfigured(),
  }
}
