import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import ReviewForm from '../ReviewForm/ReviewForm'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    quote: 'Finally a serum that does not sting. My routine starts here now.',
    name: 'Hira A.',
    meta: 'Sensitive · Lahore',
    rating: 5,
  },
  {
    quote: 'The texture, the calm, the results — I was skeptical until week two.',
    name: 'Zainab T.',
    meta: 'Combination · Karachi',
    rating: 5,
  },
  {
    quote: 'Fragrance-free actually means fragrance-free. My rosacea-prone skin finally relaxed.',
    name: 'Maryam S.',
    meta: 'Rosacea-prone · Rawalpindi',
    rating: 5,
  },
  {
    quote: 'COD made it easy to try. Now on my third bottle.',
    name: 'Nadia H.',
    meta: 'Dry · Islamabad',
    rating: 5,
  },
]

function Stars({ count }) {
  return (
    <div className={styles.stars} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="var(--gold)" stroke="var(--gold)" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const t = testimonials[index]

  return (
    <section className={styles.section} id="testimonials">
      <div className={styles.inner}>
        <p className="label">Reviews</p>
        <h2 className={styles.heading}>Loved by real customers.</h2>

        <div className={styles.desktop}>
          {testimonials.map((item) => (
            <blockquote key={item.name} className={styles.card}>
              <Stars count={item.rating} />
              <p className={styles.quote}>&ldquo;{item.quote}&rdquo;</p>
              <footer>
                <cite>{item.name}</cite>
                <span>{item.meta}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className={styles.mobile}>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              className={styles.card}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Stars count={t.rating} />
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <footer>
                <cite>{t.name}</cite>
                <span>{t.meta}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
                onClick={() => setIndex(i)}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <ReviewForm />
      </div>
    </section>
  )
}
