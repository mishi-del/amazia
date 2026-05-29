import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { KEY_INGREDIENTS, FULL_INCI, PRODUCT } from '../../constants/brand'
import { useReducedMotion } from '../../lib/useReducedMotion'

const TABS = [
  { id: 'key', label: 'Key ingredients' },
  { id: 'inci', label: 'Full INCI' },
  { id: 'use', label: 'How to use' },
]

export default function IngredientDive() {
  const [tab, setTab] = useState('key')
  const prefersReduced = useReducedMotion()

  return (
    <section id="ingredients" className="section-padding-lg bg-amazia-cream">
      <div className="container-content max-w-5xl">
        <div className="mx-auto mb-8 max-w-content text-center md:mb-12">
          <p className="label-accent">Ingredient transparency</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
            What&apos;s inside — and why.
          </h2>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-2 border-b border-amazia-sand/50 pb-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-pill px-4 py-2 font-body text-xs font-semibold uppercase tracking-wide transition-colors ${
                tab === t.id
                  ? 'bg-amazia-teal text-white'
                  : 'text-amazia-ink-light hover:bg-amazia-teal/10 hover:text-amazia-teal'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {tab === 'key' && (
              <div className="space-y-4">
                {KEY_INGREDIENTS.map((ing, i) => (
                  <article
                    key={ing.name}
                    className="card-premium p-5 md:p-6"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-headline text-lg font-bold text-amazia-espresso">
                        {ing.name}
                      </h3>
                      <span className="trust-badge">{ing.pct}</span>
                    </div>
                    <p className="mt-1 font-body text-xs font-medium text-amazia-teal">
                      {ing.function}
                    </p>
                    <div className="mt-4 grid gap-4 sm:grid-cols-3">
                      <div>
                        <span className="label-accent">What it is</span>
                        <p className="mt-1 font-body text-sm text-amazia-ink">{ing.what}</p>
                      </div>
                      <div>
                        <span className="label-accent">What it does</span>
                        <p className="mt-1 font-body text-sm text-amazia-ink">{ing.does}</p>
                      </div>
                      <div>
                        <span className="label-accent">Why AMAZIA</span>
                        <p className="mt-1 font-body text-sm text-amazia-ink">{ing.why}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {tab === 'inci' && (
              <div className="card-premium p-6 md:p-8">
                <p className="label-accent">Full INCI list — {PRODUCT.name}</p>
                <p className="mt-4 font-body text-sm leading-relaxed text-amazia-ink">
                  {FULL_INCI}
                </p>
                <p className="mt-4 font-body text-xs text-amazia-ink-light">
                  Batch-specific CoA with verified percentages available in the{' '}
                  <a href="#coa" className="text-amazia-teal underline">
                    CoA section
                  </a>
                  .
                </p>
              </div>
            )}

            {tab === 'use' && (
              <div className="card-premium p-6 md:p-8">
                <p className="label-accent">How to use</p>
                <ol className="mt-4 space-y-4">
                  {PRODUCT.howToUse.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-amazia-teal font-body text-sm font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="font-body text-sm leading-relaxed text-amazia-ink pt-1">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
