export async function apiFetch(url, { method = 'GET', body } = {}) {
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
    if (res.status === 404 || res.status === 502 || res.status === 503) {
      if (typeof window !== 'undefined') {
        const host = window.location?.hostname || ''
        const isLocalhost = host === 'localhost' || host === '127.0.0.1'
        if (!isLocalhost) {
          throw new Error(
            'The AMAZIA server is not responding. Add MONGODB_URI in Vercel → Settings → Environment Variables, then redeploy.'
          )
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
