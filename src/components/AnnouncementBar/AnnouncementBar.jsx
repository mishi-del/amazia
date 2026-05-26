import styles from './AnnouncementBar.module.css'

const items = [
  'Free shipping on orders above Rs. 4,500',
  'Cash on delivery nationwide',
  '100% fragrance-free',
  'Made in Pakistan',
]

export default function AnnouncementBar() {
  const line = items.join(' · ')

  return (
    <div className={styles.bar} aria-hidden="true">
      <div className={styles.track}>
        <span>{line}</span>
        <span>{line}</span>
      </div>
    </div>
  )
}
