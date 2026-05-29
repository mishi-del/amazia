import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import Button from '../ui/Button'
import { ASSETS } from '../../constants/assets'
import { PRODUCT, TAGLINE } from '../../constants/brand'
import { SHOP_URL } from '../../constants/links'
import { viewportOnce } from '../../lib/animations'

export default function FinalCTA() {
  return (
    <section id="shop" className="section-padding-lg bg-amazia-espresso text-white">
      <div className="container-content max-w-5xl">
        <div className="layout-55-45 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
            <ProductImage
              src={ASSETS.hero}
              alt={`AMAZIA ${PRODUCT.name}`}
              variant="product"
              className="mx-auto max-w-xs opacity-95 lg:max-w-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8 }}
            className="order-1 space-y-6 text-center lg:order-2 lg:text-left"
          >
            <p className="font-body text-xs uppercase tracking-[0.2em] text-amazia-gold">
              {TAGLINE}
            </p>
            <h2 className="font-display text-4xl leading-tight text-white md:text-5xl">
              Ready when you are.
            </h2>
            <p className="font-body text-sm leading-relaxed text-white/80">
              {PRODUCT.name} — {PRODUCT.price}.
              <br />
              COD nationwide · Free shipping over Rs. 4,500 · CoA on every batch.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button href={SHOP_URL} variant="light">
                Shop now
              </Button>
              <a
                href="#skin-quiz"
                className="btn-secondary !border-white/40 !text-white hover:!bg-white hover:!text-amazia-espresso"
              >
                Take the skin quiz
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
