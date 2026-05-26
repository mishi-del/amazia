import { Router } from 'express'
import { Review } from '../models/Review.js'
import { optionalAuth } from '../middleware/auth.js'

const router = Router()

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

router.post('/', optionalAuth, async (req, res) => {
  try {
    const {
      name,
      city,
      skin_type: skinType,
      days_of_use: daysOfUse,
      rating,
      review,
      email,
      website,
    } = req.body || {}

    if (website) {
      return res.json({ ok: true })
    }

    const trimmedName = String(name || '').trim()
    const trimmedCity = String(city || '').trim()
    const trimmedSkin = String(skinType || '').trim()
    const trimmedReview = String(review || '').trim()
    const trimmedEmail = String(email || '').trim()

    if (!trimmedName || !trimmedCity || !trimmedSkin) {
      return res.status(400).json({ error: 'Name, city, and skin type are required.' })
    }
    if (!rating) {
      return res.status(400).json({ error: 'Rating is required.' })
    }
    if (trimmedReview.length < 20) {
      return res.status(400).json({ error: 'Review must be at least 20 characters.' })
    }
    if (trimmedEmail && !isEmail(trimmedEmail)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    await Review.create({
      userId: req.user?._id || null,
      name: trimmedName,
      city: trimmedCity,
      skinType: trimmedSkin,
      daysOfUse: daysOfUse || 'Not specified',
      rating,
      review: trimmedReview,
      email: trimmedEmail || req.user?.email || 'Not provided',
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('[reviews]', err.message)
    res.status(500).json({ error: 'Failed to submit review. Please try again.' })
  }
})

export default router
