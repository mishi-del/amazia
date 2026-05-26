import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import { ASSETS } from '../../constants/assets'
import styles from './ProductReveal.module.css'

const ingredients = [
  { name: 'Ectoin', benefit: 'Stress protection & deep hydration' },
  { name: 'Ceramide Complex', benefit: 'Rebuilds your lipid barrier' },
  { name: 'Centella Asiatica', benefit: 'Calms redness & irritation' },
  { name: 'Panthenol', benefit: 'Softens tight, dehydrated skin' },
]

export default function ProductReveal() {
  return (
    <section className={styles.section} id="product">
      <div className={styles.inner}>
        <div className={styles.top}>
          <motion.div
            className={styles.visual}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <ProductImage
              src={ASSETS.product}
              alt="Barrier Support Serum"
              variant="product"
            />
          </motion.div>

          <motion.div
            className={styles.intro}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="label">The serum</p>
            <h2 className={styles.heading}>
              One formula.
              <br />
              Four actives.
            </h2>
            <p className={styles.desc}>
              Barrier Support Serum is intentional skincare — nothing you don&apos;t
              need, everything your barrier does. 30ml airless pump. Rs. 3,800.
            </p>
          </motion.div>
        </div>

        <div className={styles.grid}>
          {ingredients.map((ing, i) => (
            <motion.div
              key={ing.name}
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.name}>{ing.name}</h3>
              <p className={styles.benefit}>{ing.benefit}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
