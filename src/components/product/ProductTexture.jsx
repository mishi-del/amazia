import { useState } from 'react'
import { motion } from 'framer-motion'
import { ASSETS } from '../../constants/assets'
import { PRODUCT_TEXTURE } from '../../constants/brand'
import { viewportOnce } from '../../lib/animations'

export default function ProductTexture() {
  const [imgOk, setImgOk] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <section className="section-padding bg-amazia-ivory">
      <div className="container-content max-w-5xl">
        <div className="layout-40-60 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="order-2 lg:order-1"
          >
            <div className="overflow-hidden rounded-card bg-amazia-cream">
              {!imgFailed && (
                <img
                  src={ASSETS.texture}
                  alt="AMAZIA serum texture — lightweight absorption"
                  className={`h-64 w-full object-cover md:h-80 ${imgOk ? 'block' : 'hidden'}`}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => setImgOk(true)}
                  onError={() => setImgFailed(true)}
                />
              )}
              {!imgOk && !imgFailed && (
                <div className="flex h-64 items-center justify-center md:h-80">
                  <span className="font-body text-sm text-amazia-ink-light">Loading…</span>
                </div>
              )}
              {imgFailed && (
                <div className="flex h-64 flex-col items-center justify-center gap-2 p-6 md:h-80">
                  <span className="font-display text-2xl text-amazia-teal">AMAZIA</span>
                  <span className="font-body text-xs text-amazia-ink-light">
                    Add texture.jpg to public/assets
                  </span>
                </div>
              )}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            className="order-1 space-y-4 lg:order-2"
          >
            <p className="label-accent">{PRODUCT_TEXTURE.headline}</p>
            <ul className="space-y-3">
              {PRODUCT_TEXTURE.points.map((point) => (
                <li key={point} className="flex gap-3 font-body text-sm text-amazia-ink">
                  <span className="text-amazia-gold">◆</span>
                  {point}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
