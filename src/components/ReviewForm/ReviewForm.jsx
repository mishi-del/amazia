import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Button from '../ui/Button'
import { API } from '../../constants/links'
import { postToApi } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import styles from './ReviewForm.module.css'

const SKIN_TYPES = [
  'Sensitive',
  'Dry',
  'Oily',
  'Combination',
  'Normal',
  'Acne-prone',
  'Rosacea-prone',
  'Barrier-damaged',
]

export default function ReviewForm() {
  const { user } = useAuth()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    city: '',
    skinType: '',
    daysOfUse: '',
    review: '',
    email: '',
    website: '', // honeypot
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
        className={styles.successBox}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className={styles.successIcon}>✓</div>
        <h3 className={styles.successTitle}>Thank you for your review</h3>
        <p className={styles.successText}>
          We received your feedback. Once approved, it may appear on this page. We
          appreciate you helping other customers trust AMAZIA.
        </p>
        <button
          type="button"
          className={styles.resetBtn}
          onClick={() => setStatus('idle')}
        >
          Submit another review
        </button>
      </motion.div>
    )
  }

  return (
    <div className={styles.wrap} id="write-review">
      <div className={styles.header}>
        <p className={styles.eyebrow}>Share your experience</p>
        <h3 className={styles.title}>Leave a review</h3>
        <p className={styles.intro}>
          Used Barrier Support Serum? Tell us honestly — your skin type, city, and
          results help others decide.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={update('website')}
          className={styles.honeypot}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className={styles.ratingBlock}>
          <span className={styles.label}>Your rating *</span>
          <div className={styles.stars} role="group" aria-label="Star rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={styles.starBtn}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
                aria-pressed={rating === star}
              >
                <Star
                  size={28}
                  strokeWidth={1.25}
                  fill={star <= displayRating ? 'var(--gold)' : 'transparent'}
                  stroke={star <= displayRating ? 'var(--gold)' : 'var(--line)'}
                  className={styles.starIcon}
                />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="review-name">Name *</label>
            <input
              id="review-name"
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="e.g. Sana M."
              required
              maxLength={80}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="review-city">City *</label>
            <input
              id="review-city"
              type="text"
              value={form.city}
              onChange={update('city')}
              placeholder="e.g. Lahore"
              required
              maxLength={60}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="review-skin">Skin type *</label>
            <select
              id="review-skin"
              value={form.skinType}
              onChange={update('skinType')}
              required
            >
              <option value="">Select…</option>
              {SKIN_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="review-days">Days of use</label>
            <input
              id="review-days"
              type="number"
              min="1"
              max="365"
              value={form.daysOfUse}
              onChange={update('daysOfUse')}
              placeholder="e.g. 14"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="review-email">Email (optional)</label>
          <input
            id="review-email"
            type="email"
            value={form.email}
            onChange={update('email')}
            placeholder="Only if we need to verify your order"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="review-text">Your review *</label>
          <textarea
            id="review-text"
            value={form.review}
            onChange={update('review')}
            placeholder="What changed for your skin? Texture, redness, barrier feel…"
            required
            rows={4}
            maxLength={600}
          />
          <span className={styles.charCount}>{form.review.length}/600</span>
        </div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <Button
          type="submit"
          variant="teal"
          size="lg"
          className={styles.submit}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? 'Sending…' : 'Submit review'}
        </Button>

        <p className={styles.privacy}>
          By submitting, you agree we may display your first name, city, and review
          on our website after moderation.
        </p>
      </form>
    </div>
  )
}
