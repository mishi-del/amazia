import { motion } from 'framer-motion'
import { PRODUCT_BENEFITS } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'

export default function ProductBenefits() {
  return (
    <section className="border-t border-amazia-sand/40 bg-amazia-cream/40 py-12 md:py-16">
      <div className="container-content max-w-5xl">
        <p className="label-accent text-center">Benefits</p>
        <h2 className="mt-2 text-center font-display text-2xl text-amazia-espresso md:text-3xl">
          Why Barrier Support Serum works
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid gap-4 sm:grid-cols-2"
        >
          {PRODUCT_BENEFITS.map((b) => (
            <motion.article key={b.title} variants={fadeUp} className="card-premium p-5 md:p-6">
              <h3 className="font-headline text-lg font-bold text-amazia-espresso">{b.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-amazia-ink">{b.desc}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
