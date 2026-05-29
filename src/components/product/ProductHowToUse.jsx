import { motion } from 'framer-motion'
import { PRODUCT } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'

const icons = ['🫧', '💧', '☀️']

export default function ProductHowToUse() {
  return (
    <section id="how-to-use" className="section-padding bg-amazia-cream">
      <div className="container-content max-w-3xl">
        <div className="text-center">
          <p className="label-accent">How to use</p>
          <h2 className="mt-2 font-display text-3xl text-amazia-espresso">AM & PM routine</h2>
        </div>
        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 space-y-4"
        >
          {PRODUCT.howToUse.map((step, i) => (
            <motion.li
              key={i}
              variants={fadeUp}
              className="card-premium flex gap-4 p-5 md:p-6"
            >
              <span className="text-2xl" aria-hidden="true">
                {icons[i] || '✓'}
              </span>
              <p className="font-body text-sm leading-relaxed text-amazia-ink pt-1">{step}</p>
            </motion.li>
          ))}
        </motion.ol>
        <p className="mt-6 rounded-card border border-amazia-sand/60 bg-amazia-ivory p-4 font-body text-xs leading-relaxed text-amazia-ink-light">
          <strong className="text-amazia-ink">Patch test:</strong> Apply a small amount behind
          the ear for 24 hours before full-face use if you have highly reactive skin.
        </p>
      </div>
    </section>
  )
}
