import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PRODUCT_PRICE, SHOP_URL } from '../../constants/links'
import { useReducedMotion } from '../../lib/useReducedMotion'

const questions = [
  {
    id: 'concern',
    q: 'What bothers your skin most right now?',
    options: ['Tightness & dryness', 'Redness & irritation', 'Sensitivity to products', 'Uneven, stressed texture'],
  },
  {
    id: 'routine',
    q: 'How would you describe your current routine?',
    options: ['Minimal — cleanser only', 'Moderate — cleanser + moisturiser', 'Active — acids or retinoids', 'Overwhelmed — too many products'],
  },
  {
    id: 'climate',
    q: 'Where do you spend most of your time?',
    options: ['Karachi — humid coastal', 'Lahore — hot dry summers', 'Islamabad — cooler & drier', 'Other — mixed climate'],
  },
  {
    id: 'goal',
    q: 'What result matters most to you?',
    options: ['Calmer, less reactive skin', 'More hydration & comfort', 'Stronger barrier before actives', 'Transparent, gentle formula'],
  },
]

const recommendation = {
  product: 'Barrier Support Serum',
  why: 'Ectoin 0.5% + Ceramide NP 2.5% + Centella 1.5% — CoA-verified percentages designed to strengthen a compromised barrier without fragrance or irritation.',
}

export default function SkinQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const prefersReduced = useReducedMotion()
  const done = step >= questions.length

  const select = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
    setStep((s) => s + 1)
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
  }

  return (
    <section id="skin-quiz" className="section-padding bg-amazia-teal text-white">
      <div className="container-content">
        <div className="mx-auto max-w-content text-center">
          <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-amazia-gold">
            Skin quiz
          </p>
          <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
            Find your barrier match
          </h2>
          <p className="mt-3 font-body text-sm text-white/80">
            Four quick questions — personalised recommendation in under a minute.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-lg rounded-card bg-white p-6 text-amazia-ink shadow-xl md:p-8">
          {!done ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={prefersReduced ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-body text-xs text-amazia-ink-light">
                  Question {step + 1} of {questions.length}
                </p>
                <h3 className="mt-2 font-headline text-xl text-amazia-espresso">
                  {questions[step].q}
                </h3>
                <ul className="mt-6 space-y-2">
                  {questions[step].options.map((opt) => (
                    <li key={opt}>
                      <button
                        type="button"
                        onClick={() => select(questions[step].id, opt)}
                        className="w-full rounded-button border border-amazia-sand/60 px-4 py-3 text-left font-body text-sm transition-colors hover:border-amazia-teal hover:bg-amazia-teal/[0.06]"
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div>
              <p className="label-accent">Your match</p>
              <h3 className="mt-2 font-display text-2xl text-amazia-espresso">
                {recommendation.product}
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed">{recommendation.why}</p>
              <p className="mt-2 font-body text-xs text-amazia-ink-light">
                Based on:{' '}
                {Object.values(answers).slice(0, 2).join(' · ') || 'your responses'}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href={SHOP_URL} className="btn-primary text-center">
                  Shop — {PRODUCT_PRICE}
                </a>
                <button type="button" onClick={reset} className="btn-secondary">
                  Retake quiz
                </button>
              </div>
              <p className="mt-4 font-body text-[11px] text-amazia-ink-light">
                AI-powered suggestion only. Not medical advice. Consult a dermatologist for
                persistent conditions.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
