import { Link, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SiteChrome from '../components/layout/SiteChrome'
import { ENTITY_PAGES } from '../constants/brand'
import { ENTITY_CONTENT } from '../constants/entityContent'
import { PRODUCT } from '../constants/brand'
import { SHOP_URL } from '../constants/links'

export default function EntityPage() {
  const slug = useLocation().pathname.replace(/^\//, '')
  const meta = ENTITY_PAGES.find((p) => p.slug === slug)
  const content = ENTITY_CONTENT[slug]

  if (!meta || !content) {
    return <Navigate to="/404" replace />
  }

  const url = `https://amaziagrid.com/${slug}`

  return (
    <SiteChrome showStickyCta={false}>
      <Helmet>
        <title>{meta.title} | AMAZIA</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={url} />
      </Helmet>
      <main className="section-padding-lg bg-amazia-ivory pt-24">
        <article className="container-content max-w-3xl">
          <Link to="/" className="label-accent hover:text-amazia-teal-light">
            ← Back to home
          </Link>
          <h1 className="mt-6 font-display text-4xl leading-tight text-amazia-espresso md:text-5xl">
            {meta.title}
          </h1>
          <p className="mt-6 font-body text-base leading-relaxed text-amazia-ink">
            {content.intro}
          </p>
          {content.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="font-headline text-2xl font-bold text-amazia-espresso">
                {section.heading}
              </h2>
              <p className="mt-3 font-body text-sm leading-relaxed text-amazia-ink md:text-base">
                {section.body}
              </p>
            </section>
          ))}
          <div className="card-premium mt-12 p-6 md:p-8">
            <h2 className="font-headline text-xl font-bold text-amazia-espresso">
              How AMAZIA helps
            </h2>
            <p className="mt-3 font-body text-sm text-amazia-ink">
              {PRODUCT.name} — {PRODUCT.price}. CoA-verified ectoin, ceramides, and centella.
              COD nationwide.
            </p>
            <a href={SHOP_URL} className="btn-primary mt-6 inline-block">
              Shop {PRODUCT.name}
            </a>
          </div>
        </article>
      </main>
    </SiteChrome>
  )
}
