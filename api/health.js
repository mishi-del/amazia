import { connectDb } from './_lib/connect.js'
import { handleHandlerError, sendJson, setCors } from './_lib/http.js'

export default async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  try {
    if (process.env.MONGODB_URI) {
      await connectDb()
    }
    sendJson(res, 200, {
      ok: true,
      service: 'amazia-api',
      version: 3,
      features: ['reviews', 'newsletter', 'chat'],
      auth: 'firebase',
      host: 'vercel',
    })
  } catch (err) {
    handleHandlerError(res, err, 'health')
  }
}
