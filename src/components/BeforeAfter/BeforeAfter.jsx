import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ASSETS } from '../../constants/assets'
import styles from './BeforeAfter.module.css'

const stories = [
  {
    name: 'Sana M.',
    skinType: 'Sensitive · Combination',
    city: 'Lahore',
    days: 21,
    quote: 'Redness around my nose calmed within two weeks. Skin feels less reactive.',
  },
  {
    name: 'Ayesha K.',
    skinType: 'Dry · Barrier-damaged',
    city: 'Karachi',
    days: 14,
    quote: 'The tight feeling after washing finally went away.',
  },
  {
    name: 'Fatima R.',
    skinType: 'Oily · Acne-prone',
    city: 'Islamabad',
    days: 28,
    quote: 'One serum did more for my irritation than five others combined.',
  },
]

export default function BeforeAfter() {
  const [active, setActive] = useState(0)
  const [pos, setPos] = useState(50)
  const story = stories[active]

  return (
    <section className={styles.section} id="results">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className="label">Results</p>
          <h2 className={styles.heading}>Real skin. Real stories.</h2>
          <p className={styles.sub}>
            Drag the slider to compare. Individual results vary with consistent use.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.compare}>
            <div className={styles.sliderOverlay}>
              <div className={styles.before}>
                <img src={ASSETS.before} alt="Skin before barrier repair routine" />
              </div>
              <div
                className={styles.after}
                style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
              >
                <img src={ASSETS.after} alt="Skin after barrier repair routine" />
              </div>
              <input
                type="range"
                min="5"
                max="95"
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                className={styles.range}
                aria-label="Compare before and after"
              />
              <div className={styles.handle} style={{ left: `${pos}%` }} />
              <span className={styles.labelBefore}>Before</span>
              <span className={styles.labelAfter}>After</span>
            </div>
          </div>

          <div className={styles.story}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <blockquote className={styles.quote}>&ldquo;{story.quote}&rdquo;</blockquote>
                <footer className={styles.meta}>
                  <cite>{story.name}</cite>
                  <span>{story.skinType}</span>
                  <span>{story.city} · {story.days} days</span>
                </footer>
              </motion.div>
            </AnimatePresence>

            <div className={styles.tabs}>
              {stories.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  className={`${styles.tab} ${i === active ? styles.tabActive : ''}`}
                  onClick={() => setActive(i)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
