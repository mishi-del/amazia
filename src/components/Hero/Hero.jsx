import { motion } from 'framer-motion'
import ProductImage from '../ui/ProductImage'
import FormulationBadge from '../trust/FormulationBadge'
import SecureCheckoutNote from '../ui/SecureCheckoutNote'
import { ASSETS } from '../../constants/assets'
import {
  FLOATING_INGREDIENTS,
  HERO_ASPIRATION,
  HERO_HEADLINE,
  HERO_PROBLEM,
  HERO_SUBHEADLINE,
  TRUST_BADGES,
} from '../../constants/brand'
import { PRODUCT_PRICE, SHOP_URL } from '../../constants/links'
import { trackAddToCart } from '../../lib/analytics'
import { scaleIn, staggerContainer, wordReveal } from '../../lib/animations'
import { useReducedMotion } from '../../lib/useReducedMotion'

function HeroCopy({ motionProps = {} }) {
  const Tag = motionProps.variants ? motion.p : 'p'
  const TagDiv = motionProps.variants ? motion.div : 'div'
  const TagH1 = motionProps.variants ? motion.h1 : 'h1'
  const TagSpan = motionProps.variants ? motion.span : 'span'

  return (
    <div className="space-y-6 lg:space-y-8">
      <TagDiv
        {...(motionProps.variants ? { variants: wordReveal, custom: 0 } : {})}
        className="trust-bar-scroll flex-wrap gap-3"
      >
        {TRUST_BADGES.map((b) => (
          <span key={b.id} className="trust-badge">
            {b.label}
          </span>
        ))}
        <FormulationBadge size="small" />
      </TagDiv>

      <TagH1 className="font-display leading-tight">
        <TagSpan
          {...(motionProps.variants ? { variants: wordReveal, custom: 0 } : {})}
          className="mb-3 block font-body text-lg font-medium normal-case tracking-normal text-amazia-ink xs:text-xl sm:text-2xl md:text-2xl"
        >
          {HERO_PROBLEM}
        </TagSpan>
        <TagSpan
          {...(motionProps.variants ? { variants: wordReveal, custom: 1 } : {})}
          className="mb-3 block font-headline text-xl italic text-amazia-teal xs:text-2xl sm:text-3xl"
        >
          {HERO_ASPIRATION}
        </TagSpan>
        {motionProps.variants ? (
          <motion.span
            variants={wordReveal}
            custom={2}
            className="gold-gradient block text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            {HERO_HEADLINE}
          </motion.span>
        ) : (
          <span className="gold-gradient block text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl">
            {HERO_HEADLINE}
          </span>
        )}
      </TagH1>

      <Tag
        {...(motionProps.variants ? { variants: wordReveal, custom: 3 } : {})}
        className="max-w-content font-headline text-base italic text-amazia-ink sm:text-lg lg:text-xl"
      >
        {HERO_SUBHEADLINE}
      </Tag>

      <TagDiv
        {...(motionProps.variants ? { variants: wordReveal, custom: 4 } : {})}
        className="flex flex-col gap-3 sm:flex-row sm:gap-4"
      >
        <a
          href={SHOP_URL}
          className="btn-primary"
          onClick={() => trackAddToCart('Barrier Support Serum', 3800)}
        >
          Shop Barrier Serum — {PRODUCT_PRICE}
        </a>
        <a href="#skin-quiz" className="btn-secondary">
          Take the Skin Quiz
        </a>
      </TagDiv>

      <SecureCheckoutNote />

      <TagDiv
        {...(motionProps.variants ? { variants: wordReveal, custom: 5 } : {})}
        className="cod-callout"
      >
        <span className="text-xl text-amazia-sage sm:text-2xl" aria-hidden="true">
          ✓
        </span>
        <div>
          <p className="font-body text-sm font-semibold text-amazia-sage sm:text-base">
            Cash on Delivery — No advance payment
          </p>
          <p className="mt-1 font-body text-xs text-amazia-ink-light sm:text-sm">
            Nationwide delivery in 3–5 business days · 7-day returns
          </p>
        </div>
      </TagDiv>
    </div>
  )
}

function HeroVisual({ animated }) {
  const ImgWrap = animated ? motion.div : 'div'
  const imgProps = animated
    ? { variants: scaleIn, initial: 'hidden', animate: 'show' }
    : {}

  return (
    <ImgWrap {...imgProps} className="relative mt-8 lg:mt-0">
      <ProductImage
        src={ASSETS.hero}
        alt="AMAZIA Barrier Support Serum — Pakistan"
        variant="hero"
        priority
        className="mx-auto w-full max-w-xs drop-shadow-2xl sm:max-w-sm md:max-w-md lg:max-w-full"
      />
      {FLOATING_INGREDIENTS.map((b, i) => {
        const Badge = animated ? motion.div : 'div'
        const badgeProps = animated
          ? {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { delay: 0.8 + i * 0.2, duration: 0.5 },
            }
          : {}
        return (
          <Badge
            key={b.text}
            {...badgeProps}
            style={{
              position: 'absolute',
              top: b.top,
              bottom: b.bottom,
              left: b.left,
              right: b.right,
            }}
            className="hidden rounded-pill border border-amazia-teal/20 bg-white px-3 py-1.5 shadow-lg md:block lg:px-4 lg:py-2"
          >
            <span className="font-body text-xs font-bold text-amazia-teal lg:text-sm">
              {b.text}
            </span>
          </Badge>
        )
      })}
    </ImgWrap>
  )
}

export default function Hero() {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <section id="hero" className="flex min-h-screen items-center bg-amazia-ivory section-padding">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <HeroCopy />
            <HeroVisual />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="hero" className="flex min-h-screen items-center bg-amazia-ivory section-padding">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <HeroCopy motionProps={{ variants: wordReveal }} />
          </motion.div>
          <HeroVisual animated />
        </div>
      </div>
    </section>
  )
}
