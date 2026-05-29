import { Router } from 'express'

const router = Router()

const PIXEL_ID = process.env.META_PIXEL_ID || process.env.VITE_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN

router.post('/event', async (req, res) => {
  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(204).end()
  }

  const { event_name, event_id, event_source_url, custom_data } = req.body || {}
  if (!event_name) {
    return res.status(400).json({ error: 'event_name required' })
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: [
            {
              event_name,
              event_time: Math.floor(Date.now() / 1000),
              event_id: event_id || `${event_name}_${Date.now()}`,
              event_source_url: event_source_url || 'https://amaziagrid.com',
              action_source: 'website',
              custom_data: custom_data || {},
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.warn('[meta CAPI]', err)
      return res.status(502).json({ error: 'Meta API error' })
    }

    res.json({ ok: true })
  } catch (err) {
    console.warn('[meta CAPI]', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
