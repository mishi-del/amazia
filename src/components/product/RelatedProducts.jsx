import { motion } from 'framer-motion'
import { RELATED_PRODUCTS } from '../../constants/brand'
import { trackAddToCart } from '../../lib/analytics'
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/animations'

export default function RelatedProducts() {
  return (
    <section className="section-padding bg-amazia-ivory">
      <div className="container-content max-w-5xl">
        <p className="label-accent text-center">Pair with</p>
        <h2 className="mt-2 text-center font-display text-2xl text-amazia-espresso md:text-3xl">
          Complete your barrier routine
        </h2>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-8 grid gap-4 md:grid-cols-3"
        >
          {RELATED_PRODUCTS.map((p) => (
            <motion.a
              key={p.name}
              href={p.href}
              variants={fadeUp}
              className="card-premium relative block p-5 transition-shadow hover:shadow-lg"
              onClick={() => trackAddToCart(p.name, 0)}
            >
              {p.tag && (
                <span className="absolute -top-2 right-4 rounded-pill bg-amazia-gold px-2 py-0.5 font-body text-[10px] font-bold uppercase text-amazia-espresso">
                  {p.tag}
                </span>
              )}
              <h3 className="font-headline text-lg font-bold text-amazia-espresso">{p.name}</h3>
              <p className="mt-1 font-display text-xl text-amazia-teal">{p.price}</p>
              <p className="mt-2 font-body text-xs text-amazia-ink-light">{p.note}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
