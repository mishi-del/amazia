import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import Button from '../ui/Button'
import { ASSETS } from '../../constants/assets'
import { PRODUCT } from '../../constants/brand'
import SecureCheckoutNote from '../ui/SecureCheckoutNote'
import { SHOP_URL } from '../../constants/links'
import { trackAddToCart, trackInitiateCheckout } from '../../lib/analytics'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

export default function ProductReveal() {
  const prefersReduced = useReducedMotion()

  return (
    <section id="product" className="section-padding-lg bg-amazia-ivory">
      <div className="container-content max-w-5xl">
        <div className="layout-55-45 items-center">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0 }}
            whileInView={prefersReduced ? undefined : { opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1 }}
          >
            <ProductImage
              src={ASSETS.product}
              alt={`AMAZIA ${PRODUCT.name}`}
              variant="product"
            />
          </motion.div>

          <motion.div
            variants={prefersReduced ? undefined : staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <p className="label-accent">Featured product</p>
              <h2 className="mt-2 font-display text-4xl text-amazia-espresso md:text-5xl">
                {PRODUCT.name}
              </h2>
              <p className="mt-2 font-body text-sm text-amazia-ink-light">
                {PRODUCT.size} · {PRODUCT.price} · Airless pump
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {PRODUCT.badges.map((b) => (
                <span key={b} className="trust-badge">
                  {b}
                </span>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="font-body text-sm leading-relaxed text-amazia-ink">
              Intentional barrier care — nothing you do not need, everything your barrier
              does. CoA-verified actives at published percentages.
            </motion.p>

            <motion.div variants={fadeUp} className="cod-callout">
              <span className="text-xl text-amazia-sage">✓</span>
              <div>
                <p className="font-body text-sm font-semibold text-amazia-sage">
                  Cash on Delivery · No advance payment
                </p>
                <p className="mt-1 font-body text-xs text-amazia-ink-light">
                  7-day returns · 3–5 day delivery nationwide
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-3 border-t border-amazia-sand/50 pt-6">
              <p className="label-accent">The science — brief</p>
              {PRODUCT.science.map((item) => (
                <div key={item.name} className="flex gap-3">
                  <span className="font-body text-sm font-bold text-amazia-teal">
                    {item.name} {item.pct}
                  </span>
                  <span className="font-body text-sm text-amazia-ink">{item.desc}</span>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-3 sm:flex-row">
              <Button
                href={SHOP_URL}
                variant="teal"
                size="lg"
                onClick={() => {
                  trackAddToCart(PRODUCT.name, 3800)
                  trackInitiateCheckout(3800)
                }}
              >
                Shop Barrier Serum — {PRODUCT.price}
              </Button>
              <Button href="#coa" variant="secondary" size="lg">
                View CoA transparency
              </Button>
            </motion.div>
            <motion.div variants={fadeUp}>
              <SecureCheckoutNote />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
