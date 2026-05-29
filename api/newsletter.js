import { connectDb } from './_lib/connect.js'
import {
  handleHandlerError,
  readJsonBody,
  sendJson,
  setCors,
} from './_lib/http.js'
import { handleNewsletterSubscribe } from '../server/handlers/newsletterHandler.js'

export default async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  try {
    await connectDb()
    const body = await readJsonBody(req)
    const data = await handleNewsletterSubscribe({
      email: body.email,
      source: body.source,
      website: body.website,
      user: null,
    })
    sendJson(res, 200, data)
  } catch (err) {
    console.error('[newsletter]', err.message, err.stack)
    handleHandlerError(res, err, 'newsletter')
  }
}
