import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Button from '../ui/Button'
import { API } from '../../constants/links'
import { postToApi } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'

const SKIN_TYPES = [
  'Sensitive',
  'Dry',
  'Oily',
  'Combination',
  'Normal',
  'Acne-prone',
  'Rosacea-prone',
  'Barrier-stressed',
]

const inputClass =
  'w-full rounded-button border border-amazia-sand/80 bg-amazia-ivory px-4 py-3 font-body text-sm text-amazia-ink outline-none focus:border-amazia-teal'

export default function ReviewForm() {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    city: '',
    skinType: '',
    daysOfUse: '',
    review: '',
    email: '',
    website: '',
  })

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const displayRating = hoverRating || rating

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')
    if (form.website) return
    if (rating < 1) {
      setErrorMsg('Please select a star rating.')
      return
    }
    if (form.review.trim().length < 20) {
      setErrorMsg('Please write at least 20 characters in your review.')
      return
    }

    setStatus('sending')
    try {
      await postToApi(API.reviews, {
        name: (form.name.trim() || user?.name) ?? '',
        city: form.city.trim(),
        skin_type: form.skinType,
        days_of_use: form.daysOfUse || 'Not specified',
        rating: `${rating} / 5`,
        review: form.review.trim(),
        email: form.email.trim() || user?.email || '',
        website: form.website,
      })
      setStatus('success')
      setForm({
        name: '',
        city: '',
        skinType: '',
        daysOfUse: '',
        review: '',
        email: '',
        website: '',
      })
      setRating(0)
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err.message || 'Something went wrong. Please try again or message us on WhatsApp.'
      )
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-premium mx-auto max-w-lg p-8 text-center"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amazia-sage/20 text-2xl text-amazia-sage">
          ✓
        </div>
        <h3 className="mt-4 font-headline text-xl font-bold text-amazia-espresso">
          Thank you for your review
        </h3>
        <p className="mt-2 font-body text-sm text-amazia-ink-light">
          We received your feedback. Once approved, it may appear on this page.
        </p>
        <button
          type="button"
          className="mt-6 font-body text-sm text-amazia-teal underline"
          onClick={() => setStatus('idle')}
        >
          Submit another review
        </button>
      </motion.div>
    )
  }

  return (
    <div id="write-review" className="card-premium mx-auto max-w-2xl p-6 md:p-10">
      <div className="mb-8 text-center">
        <p className="label-accent">Share your experience</p>
        <h3 className="mt-2 font-display text-2xl text-amazia-espresso">Leave a review</h3>
        <p className="mt-2 font-body text-sm text-amazia-ink-light">
          Used Barrier Support Serum? Your city and skin type help others decide.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={update('website')}
          className="sr-only"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div>
          <span className="label-accent">Your rating *</span>
          <div className="mt-2 flex gap-1" role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} stars`}
                aria-pressed={rating === star}
              >
                <Star
                  size={28}
                  strokeWidth={1.25}
                  fill={star <= displayRating ? '#C9963A' : 'transparent'}
                  stroke={star <= displayRating ? '#C9963A' : '#D4B896'}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="review-name" className="label-accent mb-1 block">
              Name *
            </label>
            <input
              id="review-name"
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="e.g. Sana M."
              required
              maxLength={80}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="review-city" className="label-accent mb-1 block">
              City *
            </label>
            <input
              id="review-city"
              type="text"
              value={form.city}
              onChange={update('city')}
              placeholder="e.g. Lahore"
              required
              maxLength={60}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="review-skin" className="label-accent mb-1 block">
              Skin type *
            </label>
            <select
              id="review-skin"
              value={form.skinType}
              onChange={update('skinType')}
              required
              className={inputClass}
            >
              <option value="">Select…</option>
              {SKIN_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="review-days" className="label-accent mb-1 block">
              Days of use
            </label>
            <input
              id="review-days"
              type="number"
              min="1"
              max="365"
              value={form.daysOfUse}
              onChange={update('daysOfUse')}
              placeholder="e.g. 14"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="review-email" className="label-accent mb-1 block">
            Email (optional)
          </label>
          <input
            id="review-email"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="For order verification only"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="review-text" className="label-accent mb-1 block">
            Your review *
          </label>
          <textarea
            id="review-text"
            value={form.review}
            onChange={update('review')}
            placeholder="What changed for your skin? Texture, redness, barrier feel…"
            required
            rows={4}
            maxLength={600}
            className={`${inputClass} resize-y`}
          />
          <span className="mt-1 block text-right font-body text-xs text-amazia-ink-light">
            {form.review.length}/600
          </span>
        </div>

        {errorMsg && (
          <p className="font-body text-sm text-amazia-red">{errorMsg}</p>
        )}

        <Button type="submit" variant="teal" size="lg" className="w-full" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Submit review'}
        </Button>

        <p className="text-center font-body text-[11px] text-amazia-ink-light">
          By submitting, you agree we may display your name, city, and review after moderation.
        </p>
      </form>
    </div>
  )
}
