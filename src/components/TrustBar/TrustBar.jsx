import { motion } from 'framer-motion'
import styles from './TrustBar.module.css'

const items = [
  { title: 'Fragrance-free', sub: 'Zero scent, zero compromise' },
  { title: 'Ceramides + Ectoin', sub: 'Barrier science' },
  { title: 'pH 5.2–5.5', sub: 'Skin-balanced' },
  { title: 'Made in Pakistan', sub: 'Local craft, global standard' },
]

export default function TrustBar() {
  return (
    <section className={styles.bar} aria-label="Product highlights">
      <div className={styles.inner}>
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            className={styles.item}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.title}>{item.title}</span>
            <span className={styles.sub}>{item.sub}</span>
            {i < items.length - 1 && <span className={styles.divider} aria-hidden="true" />}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
