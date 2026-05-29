import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { initGA4, initMetaPixel, trackMetaEvent } from '../../lib/analytics'

export default function AnalyticsProvider({ children }) {
  const location = useLocation()

  useEffect(() => {
    initMetaPixel()
    initGA4()
  }, [])

  useEffect(() => {
    trackMetaEvent('PageView')
    if (window.gtag && import.meta.env.VITE_GA4_ID) {
      window.gtag('config', import.meta.env.VITE_GA4_ID, {
        page_path: location.pathname + location.search,
      })
    }
  }, [location])

  return children
}
