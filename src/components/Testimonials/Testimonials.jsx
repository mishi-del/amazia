import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import ReviewForm from '../ReviewForm/ReviewForm'
import { TESTIMONIALS } from '../../constants/brand'
import { useReducedMotion } from '../../lib/useReducedMotion'

function Stars({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#C9963A" stroke="#C9963A" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const prefersReduced = useReducedMotion()
  const t = TESTIMONIALS[index]

  useEffect(() => {
    if (prefersReduced) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(id)
  }, [prefersReduced])

  return (
    <section id="testimonials" className="section-padding bg-amazia-cream">
      <div className="container-content max-w-5xl">
        <div className="mx-auto mb-10 max-w-content text-center">
          <p className="label-accent">Reviews</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
            Loved by real customers.
          </h2>
        </div>

        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((item) => (
            <blockquote
              key={item.name}
              className="card-premium flex flex-col p-5 md:p-6"
            >
              <Stars count={item.rating} />
              <p className="mt-4 flex-grow font-headline text-sm italic leading-relaxed text-amazia-ink">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="mt-4 border-t border-amazia-sand/40 pt-4">
                <cite className="not-italic font-body text-sm font-semibold text-amazia-espresso">
                  {item.name}
                </cite>
                <p className="font-body text-xs text-amazia-ink-light">{item.meta}</p>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="card-premium p-6"
            >
              <Stars count={t.rating} />
              <p className="mt-4 font-headline text-lg italic leading-relaxed text-amazia-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4">
                <cite className="not-italic font-body font-semibold text-amazia-espresso">
                  {t.name}
                </cite>
                <p className="font-body text-sm text-amazia-ink-light">{t.meta}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
          <div className="mt-4 flex justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-amazia-teal' : 'w-2 bg-amazia-sand'
                }`}
                aria-label={`Review ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-14">
          <ReviewForm />
        </div>
      </div>
    </section>
  )
}
