import { connectDb } from './_lib/connect.js'
import {
  handleHandlerError,
  readJsonBody,
  sendJson,
  setCors,
} from './_lib/http.js'
import { handleNewsletterSubscribe } from '../server/handlers/newsletterHandler.js'
import {
  getNewsletterPromoCode,
  isSmtpConfigured,
  sendNewsletterOfferEmail,
} from '../server/lib/email.js'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export default async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  try {
    const body = await readJsonBody(req)

    if (body?.website) {
      return sendJson(res, 200, { ok: true })
    }

    const trimmed = String(body?.email || '')
      .trim()
      .toLowerCase()

    if (!trimmed || !isEmail(trimmed)) {
      return sendJson(res, 400, { error: 'A valid email is required.' })
    }

    let dbSaved = false
    try {
      await connectDb()
      await handleNewsletterSubscribe({
        email: trimmed,
        source: body.source,
        website: body.website,
        user: null,
      })
      dbSaved = true
    } catch (dbErr) {
      console.error('[newsletter/db]', dbErr.message)
    }

    const promoCode = getNewsletterPromoCode()
    let emailSent = false
    try {
      const mailResult = await sendNewsletterOfferEmail(trimmed)
      emailSent = Boolean(mailResult?.sent)
    } catch (mailErr) {
      console.error('[newsletter/email]', mailErr.message)
    }

    sendJson(res, 200, {
      ok: true,
      promoCode,
      emailSent,
      dbSaved,
      smtpConfigured: isSmtpConfigured(),
    })
  } catch (err) {
    console.error('[newsletter]', err.message, err.stack)
    handleHandlerError(res, err, 'newsletter')
  }
}
