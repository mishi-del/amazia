const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID

export function initMetaPixel() {
  if (!PIXEL_ID || typeof window === 'undefined') return
  if (window.fbq) return

  /* eslint-disable */
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    }
    if (!f._fbq) f._fbq = n
    n.push = n
    n.loaded = !0
    n.version = '2.0'
    n.queue = []
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')
  /* eslint-enable */

  window.fbq('init', PIXEL_ID)
  window.fbq('track', 'PageView')
}

export function trackMetaEvent(eventName, params = {}, eventId) {
  if (typeof window === 'undefined' || !window.fbq) return

  window.fbq('track', eventName, params)

  const payload = {
    event_name: eventName,
    event_id: eventId || `${eventName}_${Date.now()}`,
    event_source_url: window.location.href,
    custom_data: params,
  }

  const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
  if (apiBase) {
    fetch(`${apiBase}/api/meta/event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  }
}

export function trackAddToCart(productName, value) {
  trackMetaEvent('AddToCart', {
    content_name: productName,
    content_type: 'product',
    value,
    currency: 'PKR',
  })
}

export function trackInitiateCheckout(value) {
  trackMetaEvent('InitiateCheckout', { value, currency: 'PKR' })
}

export function trackLead(source) {
  trackMetaEvent('Lead', { content_name: source })
}

export function initGA4() {
  const id = import.meta.env.VITE_GA4_ID
  if (!id || typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', id)
}
