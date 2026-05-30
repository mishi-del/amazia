import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '../../constants/assets'
import { BEFORE_AFTER_STORIES } from '../../constants/brand'
export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const story = BEFORE_AFTER_STORIES[active]

  return (
    <section id="results" className="section-padding-lg bg-amazia-ivory">
      <div className="container-content max-w-5xl">
        <div className="mx-auto mb-10 max-w-content text-center md:mb-14">
          <p className="label-accent">Results</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
            Real skin. Real stories.
          </h2>
          <p className="mt-3 font-body text-sm text-amazia-ink-light">
            Drag the slider to compare. Individual results vary with consistent use.
          </p>
        </div>

        <div className="layout-55-45 items-start gap-10">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card bg-amazia-cream">
            <div className="absolute inset-0">
              <img
                src={ASSETS.before}
                alt={`Skin before AMAZIA — ${story.city}`}
                className="h-full w-full object-cover"
              />
            </div>
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
            >
              <img
                src={ASSETS.after}
                alt={`Skin after AMAZIA — ${story.city}, ${story.days} days`}
                className="h-full w-full object-cover"
              />
            </div>
            <input
              type="range"
              min="5"
              max="95"
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
              aria-label="Compare before and after"
            />
            <div
              className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white shadow-lg"
              style={{ left: `${pos}%` }}
            />
            <span className="absolute left-3 top-3 rounded bg-amazia-espresso/80 px-2 py-1 font-body text-[10px] font-bold uppercase text-white">
              Before
            </span>
            <span className="absolute right-3 top-3 rounded bg-amazia-teal/90 px-2 py-1 font-body text-[10px] font-bold uppercase text-white">
              After · {story.days}d
            </span>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className="font-headline text-xl italic leading-relaxed text-amazia-espresso md:text-2xl">
                  &ldquo;{story.quote}&rdquo;
                </blockquote>
                <footer className="mt-4 space-y-1 font-body text-sm text-amazia-ink-light">
                  <cite className="not-italic font-semibold text-amazia-ink">
                    {story.name}
                  </cite>
                  <p>{story.skinType}</p>
                  <p>
                    {story.city} · {story.days} days
                  </p>
                </footer>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap gap-2">
              {BEFORE_AFTER_STORIES.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`rounded-pill border px-4 py-2 font-body text-xs transition-colors ${
                    i === active
                      ? 'border-amazia-teal bg-amazia-teal text-white'
                      : 'border-amazia-sand text-amazia-ink hover:border-amazia-teal'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 text-center font-body text-[10px] leading-relaxed text-amazia-ink-light">
          Individual results may vary. Photos from user testing with written consent. Not edited
          or filtered.
        </p>
      </div>
    </section>
  )
}
