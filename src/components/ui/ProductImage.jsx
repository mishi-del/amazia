import { useState } from 'react'

const variantClasses = {
  hero: 'aspect-[3/4] max-h-[min(80vh,720px)]',
  product: 'aspect-[3/4] max-w-md mx-auto',
  lifestyle: 'aspect-[4/5] w-full',
}

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
    <div
      className={`relative overflow-hidden rounded-card bg-amazia-cream/50 ${variantClasses[variant] || ''} ${className}`}
    >
      {!showPlaceholder ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className="flex h-full min-h-[280px] w-full flex-col items-center justify-center gap-2 p-8 text-center"
          role="img"
          aria-label={alt}
        >
          <span className="font-display text-3xl text-amazia-teal">AMAZIA</span>
          <span className="font-body text-xs text-amazia-ink-light">
            Add image to public/assets
          </span>
        </div>
      )}
    </div>
  )
}
