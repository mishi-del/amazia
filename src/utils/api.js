export async function apiFetch(url, { method = 'GET', body } = {}) {
  // If VITE_API_URL is not set in production, calls like "/api/newsletter" will 404 on the frontend host.
  // Keep the local-dev hint for localhost, but show a production-friendly message on live sites.
  if (typeof window !== 'undefined') {
    const host = window.location?.hostname || ''
    const isLocalhost = host === 'localhost' || host === '127.0.0.1'
    if (!isLocalhost && typeof url === 'string' && url.startsWith('/api/')) {
      throw new Error('Service temporarily unavailable. Please try again in a moment.')
    }
  }

  const headers = {
    Accept: 'application/json',
  }
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    if (res.status === 404) {
      if (typeof window !== 'undefined') {
        const host = window.location?.hostname || ''
        const isLocalhost = host === 'localhost' || host === '127.0.0.1'
        if (!isLocalhost) {
          throw new Error('Service temporarily unavailable. Please try again in a moment.')
        }
      }
      throw new Error('Backend is not running. Double-click RESTART-AMAZIA.bat in the amazia folder.')
    }
    throw new Error(data.error || data.message || 'Request failed')
  }
  return data
}

export async function postToApi(url, payload) {
  return apiFetch(url, { method: 'POST', body: payload })
}
