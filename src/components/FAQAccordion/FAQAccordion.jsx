import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQS } from '../../constants/brand'

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section-padding-lg bg-amazia-ivory">
      <div className="container-content max-w-3xl">
        <div className="mb-10 text-center">
          <p className="label-accent">FAQ</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
            Questions, answered.
          </h2>
          <p className="mt-3 font-body text-sm text-amazia-ink-light">
            {FAQS.length} answers covering ingredients, COD, returns, and skin types.
          </p>
        </div>

        <div className="divide-y divide-amazia-sand/60 border-y border-amazia-sand/60">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span className="font-headline text-base font-semibold text-amazia-espresso md:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-amazia-sand font-body text-lg text-amazia-teal"
                    aria-hidden="true"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 font-body text-sm leading-relaxed text-amazia-ink">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
