import { motion } from 'framer-motion'
import FormulationBadge from '../trust/FormulationBadge'
import { FOUNDERS } from '../../constants/brand'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function FounderSection() {
  const prefersReduced = useReducedMotion()
  const { founder, reviewers, disclaimer } = FOUNDERS

  const content = (
    <>
      <div className="mx-auto mb-10 max-w-content text-center md:mb-14">
        <p className="label-accent">The people behind AMAZIA</p>
        <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
          Built by a developer and two formulation reviewers who wanted the truth on every label
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <article className="card-premium p-6 md:p-8 lg:col-span-1">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amazia-teal/10 font-display text-2xl text-amazia-teal">
            A
          </div>
          <h3 className="font-headline text-xl font-bold text-amazia-espresso">
            {founder.name}
          </h3>
          <p className="label-accent mt-1">{founder.role}</p>
          <p className="mt-4 font-body text-sm leading-relaxed text-amazia-ink">
            {founder.bio}
          </p>
        </article>

        {reviewers.map((person) => (
          <article key={person.name} className="card-premium p-6 md:p-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amazia-cream font-display text-2xl text-amazia-espresso">
              {person.name.charAt(0)}
            </div>
            <h3 className="font-headline text-lg font-bold text-amazia-espresso">
              {person.name}
            </h3>
            <p className="mt-1 font-body text-xs text-amazia-ink-light">{person.role}</p>
            <p className="mt-3 font-body text-sm text-amazia-ink">{person.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <FormulationBadge size="medium" />
      </div>
      <p className="mx-auto mt-6 max-w-content text-center font-body text-xs leading-relaxed text-amazia-ink-light">
        {disclaimer}
      </p>
    </>
  )

  return (
    <section id="about" className="section-padding-lg bg-amazia-ivory">
      <div className="container-content max-w-5xl">
        {prefersReduced ? (
          content
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
          >
            <motion.div variants={fadeUp}>{content}</motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
