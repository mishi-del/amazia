import { motion } from 'framer-motion'
import styles from './HowItWorks.module.css'

const steps = [
  {
    num: '01',
    title: 'Cleanse + apply',
    desc: '2–3 pumps on damp skin after cleansing. Press gently into face and neck.',
  },
  {
    num: '02',
    title: 'Repair — day 7',
    desc: 'Ceramides and Ectoin reinforce your barrier. Redness and tightness ease.',
  },
  {
    num: '03',
    title: 'Strong & calm',
    desc: 'Consistent use leaves skin resilient, balanced, and ready for actives again.',
  },
]

export default function HowItWorks() {
  return (
    <section className={styles.section} id="how-it-works">
      <div className={styles.inner}>
        <p className="label">How it works</p>
        <h2 className={styles.heading}>Three steps. One routine.</h2>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <motion.article
              key={step.num}
              className={styles.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span className={styles.num}>{step.num}</span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
