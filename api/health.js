import { connectDb } from './_lib/connect.js'
import { sendJson, setCors } from './_lib/http.js'

export default async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  let dbOk = false
  if (process.env.MONGODB_URI) {
    try {
      await connectDb()
      dbOk = true
    } catch (err) {
      console.warn('[health/db]', err.message)
    }
  }

  sendJson(res, 200, {
    ok: true,
    service: 'amazia-api',
    version: 3,
    features: ['reviews', 'newsletter', 'chat'],
    auth: 'firebase',
    host: 'vercel',
    db: dbOk ? 'connected' : 'unavailable',
    smtp: Boolean(
      process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
    ),
  })
}
