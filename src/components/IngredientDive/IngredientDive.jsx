import { motion } from 'framer-motion'
import styles from './IngredientDive.module.css'

const ingredients = [
  {
    name: 'Ectoin',
    what: 'A cellular protectant from extremophile microorganisms.',
    does: 'Forms a hydration shield — reduces water loss under stress.',
    why: 'Calms over-treated skin without weight or residue.',
  },
  {
    name: 'Ceramide Complex',
    what: 'Lipids identical to those in a healthy skin barrier.',
    does: 'Seals gaps in compromised barriers, reducing TEWL and irritation.',
    why: 'The foundation of every barrier repair formula we make.',
  },
  {
    name: 'Centella Asiatica',
    what: 'A botanical used in dermatology for decades.',
    does: 'Soothes inflammation and supports even, calm skin tone.',
    why: 'Essential for redness-prone skin in humid climates.',
  },
  {
    name: 'Panthenol',
    what: 'Pro-Vitamin B5 — a proven humectant and healer.',
    does: 'Draws moisture in while accelerating surface repair.',
    why: 'Immediate comfort while deeper actives take effect.',
  },
]

export default function IngredientDive() {
  return (
    <section className={styles.section} id="ingredients">
      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.label}>Ingredients</p>
          <h2 className={styles.heading}>What&apos;s inside — and why.</h2>
        </div>

        <div className={styles.list}>
          {ingredients.map((ing, i) => (
            <motion.article
              key={ing.name}
              className={styles.item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <h3 className={styles.name}>{ing.name}</h3>
              <div className={styles.cols}>
                <div>
                  <span className={styles.colLabel}>What it is</span>
                  <p>{ing.what}</p>
                </div>
                <div>
                  <span className={styles.colLabel}>What it does</span>
                  <p>{ing.does}</p>
                </div>
                <div>
                  <span className={styles.colLabel}>Why AMAZIA</span>
                  <p className={styles.why}>{ing.why}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
