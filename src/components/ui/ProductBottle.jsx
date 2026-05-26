import { motion } from 'framer-motion'
import styles from './ProductBottle.module.css'

export default function ProductBottle({ className = '', animate = true }) {
  const Wrapper = animate ? motion.div : 'div'
  const wrapperProps = animate
    ? {
        initial: { opacity: 0, scale: 0.92 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
      }
    : {}

  return (
    <Wrapper className={`${styles.wrapper} ${className}`} {...wrapperProps}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.bottle}>
        <div className={styles.cap} />
        <div className={styles.neck} />
        <div className={styles.body}>
          <div className={styles.label}>
            <span className={styles.brand}>AMAZIA</span>
            <span className={styles.productName}>Barrier Support</span>
            <span className={styles.productType}>Serum</span>
            <span className={styles.size}>30ml</span>
          </div>
          <div className={styles.liquid} />
        </div>
        <div className={styles.base} />
      </div>
      {animate && (
        <motion.div
          className={styles.floatNote}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          Ceramides
        </motion.div>
      )}
      {animate && (
        <motion.div
          className={`${styles.floatNote} ${styles.noteRight}`}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          Ectoin
        </motion.div>
      )}
    </Wrapper>
  )
}
