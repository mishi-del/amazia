import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import Button from '../ui/Button'
import { ASSETS } from '../../constants/assets'
import { SHOP_URL } from '../../constants/links'
import styles from './FinalCTA.module.css'

export default function FinalCTA() {
  return (
    <section className={styles.section} id="shop">
      <div className={styles.inner}>
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <ProductImage
            src={ASSETS.hero}
            alt="AMAZIA Barrier Support Serum"
            variant="product"
          />
        </motion.div>

        <motion.div
          className={styles.copy}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.heading}>
            Ready when
            <br />
            you are.
          </h2>
          <p className={styles.sub}>
            Join 1,200+ customers. Barrier Support Serum — Rs. 3,800.
            <br />
            COD · Free shipping over Rs. 4,500.
          </p>
          <Button href={SHOP_URL} variant="light" size="lg">
            Shop now
          </Button>
        </motion.div>
      </div>

      <footer className={styles.footer}>
        <span className={styles.brand}>AMAZIA</span>
        <p>© {new Date().getFullYear()} · Made in Pakistan</p>
      </footer>
    </section>
  )
}
