import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import { ASSETS } from '../../constants/assets'
import styles from './ProblemStatement.module.css'

export default function ProblemStatement() {
  return (
    <section className={styles.section} id="story">
      <div className={styles.inner}>
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
        >
          <ProductImage
            src={ASSETS.lifestyle}
            alt="Calm, healthy skin"
            variant="lifestyle"
          />
        </motion.div>

        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <p className="label">The problem</p>
          <h2 className={styles.heading}>
            When your barrier breaks,
            <br />
            everything feels harder.
          </h2>
          <div className={styles.body}>
            <p>
              Redness that won&apos;t fade. Tightness after washing. Sensitivity to
              products you once trusted. Over-exfoliation, harsh actives, fragrance —
              modern routines often strip faster than skin can recover.
            </p>
            <p>
              That isn&apos;t failure. It&apos;s your barrier asking for repair — not
              another product on the shelf.
            </p>
          </div>
          <ul className={styles.list}>
            <li>Damaged moisture barrier</li>
            <li>Persistent irritation & redness</li>
            <li>Product overload & confusion</li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
