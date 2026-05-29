import { useState, useEffect } from 'react'
import { PRODUCT } from '../../constants/brand'
import { SHOP_URL } from '../../constants/links'
import { trackAddToCart } from '../../lib/analytics'

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const product = document.getElementById('product')
      if (!product) return
      const rect = product.getBoundingClientRect()
      setVisible(rect.top < window.innerHeight * 0.5)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-amazia-sand/60 bg-amazia-ivory/95 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Quick shop"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-body text-xs font-semibold text-amazia-espresso">
            {PRODUCT.name}
          </p>
          <p className="font-body text-sm font-bold text-amazia-teal">{PRODUCT.price}</p>
        </div>
        <a
          href={SHOP_URL}
          className="btn-primary !inline-block !w-auto flex-shrink-0 !py-3 !text-xs"
          onClick={() => trackAddToCart(PRODUCT.name, 3800)}
        >
          Add to cart
        </a>
      </div>
      <p className="mt-1 text-center font-body text-[10px] text-amazia-ink-light">
        COD available · Pay when it arrives
      </p>
    </div>
  )
}
