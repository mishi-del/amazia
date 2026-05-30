import { Link } from 'react-router-dom'
import { TAGLINE, BRAND_NAME, DOMAIN, ENTITY_PAGES } from '../../constants/brand'
import { WHATSAPP_URL } from '../../constants/links'
import SectionLink from '../nav/SectionLink'

const homeLinks = {
  Shop: [
    { label: 'Barrier Serum', to: '/#product' },
    { label: 'Bundles', to: '/#bundles' },
    { label: 'Ingredients', to: '/#ingredients' },
  ],
  Learn: [
    { label: 'Barrier Science', to: '/#science' },
    { label: 'CoA Transparency', to: '/#coa' },
    { label: 'Skin Quiz', to: '/#skin-quiz' },
    { label: 'Skin Barrier Guide', to: '/what-is-skin-barrier' },
  ],
  Legal: [
    { label: 'Shipping', to: '/shipping-policy' },
    { label: 'Returns', to: '/refund-policy' },
    { label: 'Privacy', to: '/privacy-policy' },
    { label: 'Terms', to: '/terms-of-service' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-amazia-sand/50 bg-amazia-espresso text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-3xl tracking-wide text-white">
              {BRAND_NAME}
            </Link>
            <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-amazia-gold">
              {TAGLINE}
            </p>
            <p className="mt-4 font-body text-sm text-white/70">
              GMP · ISO 9001:2015 · Halal · CoA on every batch
            </p>
            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block font-body text-sm text-amazia-gold hover:text-white"
              >
                WhatsApp support →
              </a>
            )}
          </div>

          {Object.entries(homeLinks).map(([group, items]) => (
            <div key={group}>
              <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-amazia-gold">
                {group}
              </p>
              <ul className="mt-4 space-y-2">
                {items.map((link) => (
                  <li key={link.to}>
                    <SectionLink
                      to={link.to}
                      className="font-body text-sm text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </SectionLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-[0.14em] text-amazia-gold">
              Guides
            </p>
            <ul className="mt-4 space-y-2">
              {ENTITY_PAGES.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/${p.slug}`}
                    className="font-body text-sm text-white/80 hover:text-white"
                  >
                    {p.keyword}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-white/50">
            © {year} AMAZIA Grid (Pvt.) Ltd. · {DOMAIN}
          </p>
          <p className="max-w-md font-body text-xs text-white/50">
            Cosmetic skincare only. Not medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
