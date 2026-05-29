import { Link, useLocation, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SiteChrome from '../components/layout/SiteChrome'
import { POLICIES } from '../constants/policies'

export default function PolicyPage() {
  const slug = useLocation().pathname.replace(/^\//, '')
  const policy = POLICIES[slug]

  if (!policy) {
    return <Navigate to="/404" replace />
  }

  const url = `https://amaziagrid.com/${slug}`

  return (
    <SiteChrome showStickyCta={false}>
      <Helmet>
        <title>{policy.title} | AMAZIA</title>
        <link rel="canonical" href={url} />
      </Helmet>
      <main className="section-padding-lg bg-amazia-ivory pt-24">
        <article className="container-content max-w-3xl">
          <Link to="/" className="label-accent">
            ← Home
          </Link>
          <h1 className="mt-6 font-display text-4xl text-amazia-espresso">{policy.title}</h1>
          <p className="mt-2 font-body text-sm text-amazia-ink-light">
            Last updated: {new Date().getFullYear()} · AMAZIA Grid (Pvt.) Ltd.
          </p>
          {policy.sections.map((s) => (
            <section key={s.heading} className="mt-8">
              <h2 className="font-headline text-xl font-bold text-amazia-espresso">
                {s.heading}
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-amazia-ink">{s.body}</p>
            </section>
          ))}
        </article>
      </main>
    </SiteChrome>
  )
}
