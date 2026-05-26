import { useState } from 'react'
import styles from './ProductImage.module.css'

export default function ProductImage({
  src,
  alt,
  className = '',
  variant = 'product',
  priority = false,
}) {
  const [failed, setFailed] = useState(false)
  const showPlaceholder = failed || !src

  return (
    <div className={`${styles.frame} ${styles[variant]} ${className}`}>
      {!showPlaceholder ? (
        <img
          src={src}
          alt={alt}
          className={styles.img}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <div className={styles.placeholderInner}>
            <span className={styles.placeholderBrand}>AMAZIA</span>
            <span className={styles.placeholderHint}>Add image to public/assets</span>
          </div>
        </div>
      )}
    </div>
  )
}
