import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SiteChrome from '../components/layout/SiteChrome'

export default function NotFound() {
  return (
    <SiteChrome showStickyCta={false}>
      <Helmet>
        <title>Page not found | AMAZIA</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <main className="flex min-h-[70vh] items-center justify-center section-padding">
        <div className="text-center">
          <p className="font-display text-7xl text-amazia-gold">404</p>
          <h1 className="mt-4 font-headline text-2xl text-amazia-espresso">
            This page does not exist
          </h1>
          <p className="mt-2 font-body text-sm text-amazia-ink-light">
            The link may be broken or the page was moved.
          </p>
          <Link to="/" className="btn-primary mt-8 inline-block">
            Return home
          </Link>
        </div>
      </main>
    </SiteChrome>
  )
}
