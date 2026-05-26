import styles from './Section.module.css'

export default function Section({
  id,
  children,
  className = '',
  variant = 'ivory',
  narrow = false,
}) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${narrow ? styles.narrow : ''} ${className}`}
    >
      <div className={styles.inner}>{children}</div>
    </section>
  )
}
