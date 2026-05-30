import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '../../lib/hashNav'

/** Scroll to #section after route change (e.g. policy page → home#product). */
export default function HashScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = hash.replace(/^#/, '')
    let attempts = 0

    const tryScroll = () => {
      if (scrollToSection(id, 'smooth')) return
      attempts += 1
      if (attempts < 12) {
        requestAnimationFrame(tryScroll)
      }
    }

    const t = window.setTimeout(tryScroll, 50)
    return () => window.clearTimeout(t)
  }, [pathname, hash])

  return null
}
