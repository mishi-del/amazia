import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import { PROBLEM_COPY } from '../../constants/brand'
import { ASSETS } from '../../constants/assets'
import { fadeUp, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function ProblemStatement() {
  const prefersReduced = useReducedMotion()

  const copy = (
    <div className="space-y-6">
      <p className="label-accent">The problem</p>
      <h2 className="font-display text-4xl leading-tight text-amazia-espresso md:text-5xl lg:text-[56px]">
        {PROBLEM_COPY.headline}
      </h2>
      <p className="max-w-[620px] font-headline text-lg italic leading-relaxed text-amazia-ink md:text-[22px]">
        {PROBLEM_COPY.body}
      </p>
      <div className="flex max-w-content items-start gap-3 rounded-card border border-amazia-teal/15 bg-amazia-teal/[0.06] p-4 md:p-5">
        <span className="text-amazia-teal" aria-hidden="true">
          ◆
        </span>
        <p className="font-body text-sm leading-relaxed text-amazia-teal md:text-sm">
          {PROBLEM_COPY.callout}
        </p>
      </div>
    </div>
  )

  return (
    <section id="story" className="section-padding-lg bg-amazia-ivory">
      <div className="container-content">
        <div className="layout-55-45 items-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={prefersReduced ? undefined : { opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <ProductImage
              src={ASSETS.lifestyle}
              alt="Calm, healthy skin after barrier care"
              variant="lifestyle"
              className="rounded-card"
            />
          </motion.div>

          {prefersReduced ? (
            <div className="order-1 lg:order-2">{copy}</div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              {copy}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
