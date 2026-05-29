import { Review } from '../models/Review.js'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function handleReviewSubmit(body, user) {
  const {
    name,
    city,
    skin_type: skinType,
    days_of_use: daysOfUse,
    rating,
    review,
    email,
    website,
  } = body || {}

  if (website) {
    return { ok: true }
  }

  const trimmedName = String(name || '').trim()
  const trimmedCity = String(city || '').trim()
  const trimmedSkin = String(skinType || '').trim()
  const trimmedReview = String(review || '').trim()
  const trimmedEmail = String(email || '').trim()

  if (!trimmedName || !trimmedCity || !trimmedSkin) {
    const err = new Error('Name, city, and skin type are required.')
    err.status = 400
    throw err
  }
  if (!rating) {
    const err = new Error('Rating is required.')
    err.status = 400
    throw err
  }
  if (trimmedReview.length < 20) {
    const err = new Error('Review must be at least 20 characters.')
    err.status = 400
    throw err
  }
  if (trimmedEmail && !isEmail(trimmedEmail)) {
    const err = new Error('Invalid email address.')
    err.status = 400
    throw err
  }

  await Review.create({
    userId: user?._id || null,
    name: trimmedName,
    city: trimmedCity,
    skinType: trimmedSkin,
    daysOfUse: daysOfUse || 'Not specified',
    rating,
    review: trimmedReview,
    email: trimmedEmail || user?.email || 'Not provided',
  })

  return { ok: true }
}
