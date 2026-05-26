import { motion } from 'framer-motion'
import Button from '../ui/Button'
import ProductImage from '../ui/ProductImage'
import { ASSETS } from '../../constants/assets'
import { SHOP_URL, PRODUCT_PRICE } from '../../constants/links'
import styles from './Hero.module.css'

const ease = [0.22, 1, 0.36, 1]

const floatingTags = [
  { label: 'Ceramides', style: 'tagLeft' },
  { label: 'Ectoin', style: 'tagRight' },
  { label: 'Fragrance-free', style: 'tagBottom' },
]

function Line({ children, delay = 0, className = '' }) {
  return (
    <span className={styles.lineMask}>
      <motion.span
        className={`${styles.line} ${className}`}
        initial={{ y: '110%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.95, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg} aria-hidden="true">
        <motion.div
          className={styles.orb1}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={styles.orb2}
          animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className={styles.gridFade} />
      </div>

      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <span className={styles.eyebrowDot} />
            Barrier Support Serum · 30ml
          </motion.div>

          <h1 className={styles.heading}>
            <Line delay={0.2}>Your skin barrier,</Line>
            <Line delay={0.32} className={styles.headingAccent}>
              rebuilt.
            </Line>
          </h1>

          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            Ceramides, Ectoin & Centella — fragrance-free, pH-balanced,
            made in Pakistan.
          </motion.p>

          <motion.div
            className={styles.accentRule}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
          />

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease }}
          >
            <Button href={SHOP_URL} variant="teal" size="lg">
              Shop — {PRODUCT_PRICE}
            </Button>
            <a href="#product" className={styles.learn}>
              Explore the formula
            </a>
          </motion.div>

          <motion.div
            className={styles.chips}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.95 }}
          >
            <span>COD nationwide</span>
            <span>Free ship Rs. 4,500+</span>
          </motion.div>
        </div>

        <div className={styles.stage}>
          <motion.div
            className={styles.pedestal}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.25, ease }}
            aria-hidden="true"
          />
          <motion.div
            className={styles.productWrap}
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.35, ease }}
          >
            <motion.div
              className={styles.productFloat}
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <ProductImage
                src={ASSETS.hero}
                alt="AMAZIA Barrier Support Serum 30ml"
                variant="hero"
                priority
              />
            </motion.div>
          </motion.div>

          {floatingTags.map((tag, i) => (
            <motion.span
              key={tag.label}
              className={`${styles.tag} ${styles[tag.style]}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease }}
            >
              <motion.span
                animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {tag.label}
              </motion.span>
            </motion.span>
          ))}
        </div>
      </div>

      <motion.a
        href="#story"
        className={styles.scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-label="Scroll to learn more"
      >
        <motion.span
          className={styles.scrollLine}
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className={styles.scrollText}>Scroll</span>
      </motion.a>
    </section>
  )
}
