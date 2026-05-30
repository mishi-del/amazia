import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { SHOP_URL, PRODUCT_PRICE, WHATSAPP_URL } from '../../constants/links'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/#product', label: 'Serum' },
  { to: '/#science', label: 'Science' },
  { to: '/#ingredients', label: 'Ingredients' },
  { to: '/#coa', label: 'CoA' },
  { to: '/#skin-quiz', label: 'Skin Quiz' },
  { to: '/#write-review', label: 'Reviews' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, loading, openAuth, logout, isAuthenticated } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const headerClass = scrolled
    ? 'bg-amazia-ivory/95 shadow-sm backdrop-blur-md'
    : 'bg-transparent'

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${headerClass}`}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link
          to="/"
          className="font-display text-2xl tracking-wide text-amazia-espresso"
          onClick={() => setMenuOpen(false)}
        >
          AMAZIA
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-body text-sm text-amazia-ink transition-colors hover:text-amazia-teal"
            >
              {link.label}
            </Link>
          ))}
          {!loading && (
            <div className="flex items-center gap-3 border-l border-amazia-sand/60 pl-4">
              {isAuthenticated ? (
                <>
                  <span
                    className="font-body text-sm text-amazia-ink-light"
                    title={user.email}
                  >
                    {user.name.split(' ')[0]}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="font-body text-sm text-amazia-teal hover:underline"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="font-body text-sm text-amazia-teal hover:underline"
                >
                  Sign in
                </button>
              )}
            </div>
          )}
          <a href={SHOP_URL} className="btn-primary !py-2.5 !text-xs">
            Shop — {PRODUCT_PRICE}
          </a>
        </nav>

        <button
          type="button"
          className="rounded-button p-2 text-amazia-espresso lg:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-0 z-30 bg-amazia-ivory pt-14 lg:hidden">
          <nav className="flex flex-col gap-1 px-6 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="border-b border-amazia-sand/30 py-4 font-headline text-xl text-amazia-espresso"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!loading && (
              <button
                type="button"
                className="py-4 text-left font-body text-amazia-teal"
                onClick={() => {
                  setMenuOpen(false)
                  isAuthenticated ? logout() : openAuth('login')
                }}
              >
                {isAuthenticated ? 'Sign out' : 'Sign in'}
              </button>
            )}
            <a
              href={SHOP_URL}
              className="btn-primary mt-4 text-center"
              onClick={() => setMenuOpen(false)}
            >
              Shop — {PRODUCT_PRICE}
            </a>
            {WHATSAPP_URL && (
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-center gap-2 rounded-button border-2 border-[#25D366] py-3 font-body text-sm font-semibold text-[#25D366]"
                onClick={() => setMenuOpen(false)}
              >
                WhatsApp support
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
