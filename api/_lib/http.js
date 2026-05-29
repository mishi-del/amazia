export function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
}

export function sendJson(res, status, data) {
  res.status(status).setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body
  }
  const chunks = []
  for await (const chunk of req) {
    chunks.push(chunk)
  }
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  return JSON.parse(raw)
}

export function handleHandlerError(res, err, logLabel) {
  console.error(`[${logLabel}]`, err.message)
  const status = err.status || 500
  const message =
    status === 500 ? 'Something went wrong. Please try again.' : err.message
  sendJson(res, status, { error: message })
}
