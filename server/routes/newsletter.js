import { Router } from 'express'
import { Newsletter } from '../models/Newsletter.js'
import { User } from '../models/User.js'
import { optionalAuth } from '../middleware/auth.js'

const router = Router()

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

router.post('/', optionalAuth, async (req, res) => {
  try {
    const { email, source, website } = req.body || {}

    if (website) {
      return res.json({ ok: true })
    }

    const trimmed = String(email || req.user?.email || '')
      .trim()
      .toLowerCase()

    if (!trimmed || !isEmail(trimmed)) {
      return res.status(400).json({ error: 'A valid email is required.' })
    }

    const signupSource = source === 'popup' ? 'popup' : 'footer_section'

    await Newsletter.findOneAndUpdate(
      { email: trimmed },
      {
        email: trimmed,
        source: signupSource,
        userId: req.user?._id || null,
      },
      { upsert: true, new: true }
    )

    if (req.user) {
      req.user.newsletterSubscribed = true
      await req.user.save()
    } else {
      await User.updateOne(
        { email: trimmed },
        { $set: { newsletterSubscribed: true } }
      )
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('[newsletter]', err.message)
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' })
  }
})

export default router
