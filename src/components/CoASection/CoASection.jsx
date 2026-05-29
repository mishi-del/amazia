import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { COA_SECTION } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function CoASection() {
  const prefersReduced = useReducedMotion()

  const inner = (
    <div className="layout-40-60 items-center">
      <div className="space-y-6">
        <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-amazia-gold">
          Trust anchor
        </p>
        <h2 className="font-display text-3xl leading-tight text-white md:text-4xl lg:text-5xl">
          {COA_SECTION.headline}
        </h2>
        <p className="font-body text-sm leading-relaxed text-white/90 md:text-base">
          {COA_SECTION.body}
        </p>
        <ul className="space-y-3">
          {COA_SECTION.points.map((point) => (
            <li key={point} className="flex gap-3 font-body text-sm text-white/90">
              <span className="text-amazia-gold" aria-hidden="true">
                ✓
              </span>
              {point}
            </li>
          ))}
        </ul>
        <Button href="#product" variant="light">
          Shop CoA-verified serum
        </Button>
        <p className="font-body text-[11px] text-white/60">
          CoA download links will be added per batch when live. Contact WhatsApp for
          current batch documentation.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {COA_SECTION.certs.map((cert) => (
          <div
            key={cert.label}
            className="rounded-card border border-white/20 bg-white/10 p-5 backdrop-blur-sm"
          >
            <p className="font-display text-2xl text-amazia-gold">{cert.label}</p>
            <p className="mt-2 font-body text-xs leading-relaxed text-white/80">
              {cert.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <section id="coa" className="section-padding-lg bg-amazia-teal">
      <div className="container-content max-w-5xl">
        {prefersReduced ? (
          inner
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp}>{inner}</motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
