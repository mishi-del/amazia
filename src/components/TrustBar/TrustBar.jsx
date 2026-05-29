import { motion } from 'framer-motion'
import { TRUST_BADGES } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

const details = [
  { title: 'GMP Certified', sub: 'Nubra Labs, Pakistan' },
  { title: 'ISO 9001:2015', sub: 'Quality management system' },
  { title: 'Halal Certified', sub: 'PNAC-accredited halal body' },
  { title: 'CoA on Every Batch', sub: 'Certificate of Analysis available' },
  { title: 'Fragrance-Free', sub: 'pH 5.2–5.5 · Skin-balanced' },
]

export default function TrustBar() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      className="border-y border-amazia-sand/40 bg-amazia-cream/50 py-6 md:py-8"
      aria-label="Certifications and trust signals"
    >
      <div className="container-content">
        {prefersReduced ? (
          <div className="trust-bar-scroll">
            {details.map((item) => (
              <div
                key={item.title}
                className="card-premium min-w-[200px] flex-shrink-0 px-5 py-4 md:min-w-0 md:flex-1"
              >
                <p className="font-body text-sm font-semibold text-amazia-espresso">
                  {item.title}
                </p>
                <p className="mt-1 font-body text-xs text-amazia-ink-light">{item.sub}</p>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="trust-bar-scroll"
          >
            {details.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="card-premium min-w-[200px] flex-shrink-0 px-5 py-4 md:min-w-0 md:flex-1"
              >
                <p className="font-body text-sm font-semibold text-amazia-espresso">
                  {item.title}
                </p>
                <p className="mt-1 font-body text-xs text-amazia-ink-light">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        <p className="sr-only">
          Certifications: {TRUST_BADGES.map((b) => b.label).join(', ')}
        </p>
      </div>
    </section>
  )
}
