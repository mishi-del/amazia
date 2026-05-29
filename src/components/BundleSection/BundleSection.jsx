import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import Button from '../ui/Button'
import { ASSETS } from '../../constants/assets'
import { BUNDLES } from '../../constants/brand'
import { SHOP_URL } from '../../constants/links'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'

export default function BundleSection() {
  return (
    <section id="bundles" className="section-padding-lg bg-amazia-ivory">
      <div className="container-content max-w-5xl">
        <div className="mx-auto mb-10 max-w-content text-center">
          <p className="label-accent">Shop bundles</p>
          <h2 className="mt-3 font-display text-3xl text-amazia-espresso md:text-4xl">
            Complete your barrier routine.
          </h2>
          <p className="mt-3 font-body text-sm text-amazia-ink-light">
            Highest value on bundles — routine completion logic.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          className="mb-10"
        >
          <ProductImage
            src={ASSETS.bundle}
            alt="AMAZIA barrier care routine bundle"
            variant="product"
            className="mx-auto max-w-sm"
          />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-3"
        >
          {BUNDLES.map((b) => (
            <motion.article
              key={b.name}
              variants={fadeUp}
              className={`card-premium relative flex flex-col p-6 md:p-8 ${
                b.tag ? 'ring-2 ring-amazia-gold' : ''
              }`}
            >
              {b.tag && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-pill bg-amazia-gold px-3 py-1 font-body text-[10px] font-bold uppercase tracking-wide text-amazia-espresso">
                  {b.tag}
                </span>
              )}
              <h3 className="font-headline text-xl font-bold text-amazia-espresso">
                {b.name}
              </h3>
              <p className="mt-2 font-display text-2xl text-amazia-teal">{b.price}</p>
              <p className="mt-2 flex-grow font-body text-sm text-amazia-ink-light">
                {b.note}
              </p>
              <Button
                href={SHOP_URL}
                variant={b.tag ? 'teal' : 'secondary'}
                className="mt-6 w-full !block text-center"
              >
                {b.cta}
              </Button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
