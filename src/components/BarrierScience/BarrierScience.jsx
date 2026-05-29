import { motion } from 'framer-motion'
import { BARRIER_SCIENCE } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function BarrierScience() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="science" className="section-padding bg-amazia-cream">
      <div className="container-content">
        <div className="mx-auto mb-10 max-w-content text-center md:mb-14">
          <p className="label-accent">Barrier science</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl lg:text-5xl">
            Why modern barrier care uses ectoin
          </h2>
        </div>

        {prefersReduced ? (
          <div className="grid gap-6 md:grid-cols-3">
            {BARRIER_SCIENCE.map((card) => (
              <article key={card.title} className="card-premium p-6 md:p-8">
                <h3 className="font-headline text-xl font-bold text-amazia-espresso">
                  {card.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-amazia-ink">
                  {card.desc}
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
            {BARRIER_SCIENCE.map((card, i) => (
              <motion.article
                key={card.title}
                variants={fadeUp}
                className="card-premium p-6 md:p-8"
              >
                <span className="font-body text-2xl font-bold text-amazia-teal/30">
                  0{i + 1}
                </span>
                <h3 className="mt-2 font-headline text-xl font-bold text-amazia-espresso">
                  {card.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-amazia-ink">
                  {card.desc}
                </p>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
