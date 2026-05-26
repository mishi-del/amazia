import { Router } from 'express'
import { guideReply } from '../lib/chatKnowledge.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { message } = req.body || {}
    const trimmed = String(message || '').trim()

    if (!trimmed) {
      return res.status(400).json({ error: 'Message is required.' })
    }
    if (trimmed.length > 2000) {
      return res.status(400).json({ error: 'Message is too long.' })
    }

    const reply = guideReply(trimmed)
    res.json({ ok: true, reply, source: 'guide' })
  } catch (err) {
    console.error('[chat]', err.message)
    res.status(500).json({ error: 'Guide is temporarily unavailable.' })
  }
})

export default router
