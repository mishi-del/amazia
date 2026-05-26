import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './FAQAccordion.module.css'

const faqs = [
  {
    q: 'Is this safe for sensitive skin?',
    a: 'Yes — fragrance-free, pH-balanced, and free of common irritants. Patch test behind the ear for 24 hours if highly reactive.',
  },
  {
    q: 'Is it truly fragrance-free?',
    a: '100%. No synthetic perfume, no essential oils used to mask scent.',
  },
  {
    q: 'How long until I see results?',
    a: 'Many notice less tightness within 7–14 days. Full barrier repair typically takes 4–6 weeks of twice-daily use.',
  },
  {
    q: 'Who should use this?',
    a: 'Anyone with a compromised barrier — redness, sensitivity, dehydration, or post-treatment irritation.',
  },
  {
    q: 'Shipping & COD?',
    a: 'We ship across Pakistan. Free shipping above Rs. 4,500. COD available nationwide.',
  },
  {
    q: 'Where in my routine?',
    a: 'After cleansing, before moisturizer — AM and PM. Use SPF in the morning.',
  },
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className={styles.section} id="faq">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className="label">FAQ</p>
          <h2 className={styles.heading}>Questions, answered.</h2>
        </div>

        <div className={styles.list}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q} className={styles.item}>
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenIndex(i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className={styles.panel}
                    >
                      <p>{faq.a}</p>
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
