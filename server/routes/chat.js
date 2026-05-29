import { Router } from 'express'
import { handleChatMessage } from '../handlers/chatHandler.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const data = handleChatMessage(req.body?.message)
    res.json(data)
  } catch (err) {
    console.error('[chat]', err.message)
    res.status(err.status || 500).json({
      error: err.status ? err.message : 'Guide is temporarily unavailable.',
    })
  }
})

export default router
