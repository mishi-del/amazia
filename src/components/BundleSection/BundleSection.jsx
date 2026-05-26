import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import Button from '../ui/Button'
import { ASSETS } from '../../constants/assets'
import { SHOP_URL } from '../../constants/links'
import styles from './BundleSection.module.css'

const bundles = [
  {
    name: 'Serum only',
    price: 'Rs. 3,800',
    note: 'Barrier Support Serum · 30ml',
    tag: null,
    cta: 'Shop serum',
  },
  {
    name: 'Serum + cream',
    price: 'Rs. 6,900',
    note: 'Save Rs. 700 · Full AM/PM routine',
    tag: 'Most popular',
    cta: 'Shop duo',
  },
  {
    name: 'Full routine kit',
    price: 'Rs. 9,800',
    note: 'Save Rs. 1,600 · Serum, cream, cleanser & SPF',
    tag: null,
    cta: 'Shop kit',
  },
]

export default function BundleSection() {
  return (
    <section className={styles.section} id="bundles">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className="label">Shop</p>
          <h2 className={styles.heading}>Choose your routine.</h2>
        </div>

        <motion.div
          className={styles.productPreview}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <ProductImage
            src={ASSETS.bundle}
            alt="AMAZIA barrier repair routine bundle"
            variant="product"
          />
        </motion.div>

        <div className={styles.grid}>
          {bundles.map((b, i) => (
            <motion.article
              key={b.name}
              className={`${styles.card} ${b.tag ? styles.featured_card : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              {b.tag && <span className={styles.tag}>{b.tag}</span>}
              <h3 className={styles.name}>{b.name}</h3>
              <p className={styles.price}>{b.price}</p>
              <p className={styles.note}>{b.note}</p>
              <Button
                href={SHOP_URL}
                variant={b.tag ? 'primary' : 'secondary'}
                size="md"
                className={styles.cta}
              >
                {b.cta}
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
