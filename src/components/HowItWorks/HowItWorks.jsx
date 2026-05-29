import { motion } from 'framer-motion'
import { ROUTINE_STEPS } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function HowItWorks() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="how-it-works" className="section-padding bg-amazia-cream">
      <div className="container-content max-w-5xl">
        <div className="mx-auto mb-10 max-w-content text-center md:mb-14">
          <p className="label-accent">The 3-step routine</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
            Three steps. One barrier routine.
          </h2>
        </div>

        {prefersReduced ? (
          <div className="grid gap-6 md:grid-cols-3">
            {ROUTINE_STEPS.map((step) => (
              <article key={step.num} className="card-premium p-6 md:p-8">
                <span className="font-display text-4xl text-amazia-gold/60">{step.num}</span>
                <h3 className="mt-2 font-headline text-xl font-bold text-amazia-espresso">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-amazia-ink">
                  {step.desc}
                </p>
              </article>
            ))}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid gap-6 md:grid-cols-3"
          >
            {ROUTINE_STEPS.map((step) => (
              <motion.article
                key={step.num}
                variants={fadeUp}
                className="card-premium p-6 md:p-8"
              >
                <span className="font-display text-4xl text-amazia-gold/60">{step.num}</span>
                <h3 className="mt-2 font-headline text-xl font-bold text-amazia-espresso">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-amazia-ink">
                  {step.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
