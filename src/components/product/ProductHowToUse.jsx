import { motion } from 'framer-motion'
import { HOW_TO_USE } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'

function StepList({ steps }) {
  return (
    <ol className="list-decimal space-y-3 pl-5 font-body text-sm text-amazia-ink">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  )
}

export default function ProductHowToUse() {
  return (
    <section id="how-to-use" className="section-padding bg-amazia-cream">
      <div className="container-content max-w-5xl">
        <div className="text-center">
          <p className="label-accent">How to use</p>
          <h2 className="mt-2 font-display text-3xl text-amazia-espresso">AM & PM routine</h2>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2"
        >
          <motion.div variants={fadeUp} className="card-premium p-6 md:p-8">
            <h3 className="font-body text-base font-semibold text-amazia-teal">
              <span aria-hidden="true">☀️ </span>
              Morning
            </h3>
            <div className="mt-4">
              <StepList steps={HOW_TO_USE.morning} />
            </div>
          </motion.div>
          <motion.div variants={fadeUp} className="card-premium p-6 md:p-8">
            <h3 className="font-body text-base font-semibold text-amazia-teal">
              <span aria-hidden="true">🌙 </span>
              Night
            </h3>
            <div className="mt-4">
              <StepList steps={HOW_TO_USE.evening} />
            </div>
          </motion.div>
        </motion.div>
        <p className="mt-6 rounded-card border border-amazia-sand/60 bg-amazia-ivory p-4 font-body text-xs leading-relaxed text-amazia-ink-light">
          <strong className="text-amazia-ink">Patch test:</strong> Apply a small amount behind
          the ear for 24 hours before full-face use if you have highly reactive skin.
        </p>
      </div>
    </section>
  )
}
