import { Router } from 'express'
import { optionalAuth } from '../middleware/auth.js'
import { handleNewsletterSubscribe } from '../handlers/newsletterHandler.js'

const router = Router()

router.post('/', optionalAuth, async (req, res) => {
  try {
    const data = await handleNewsletterSubscribe({
      email: req.body?.email,
      source: req.body?.source,
      website: req.body?.website,
      user: req.user,
    })
    res.json(data)
  } catch (err) {
    console.error('[newsletter]', err.message)
    res.status(err.status || 500).json({
      error: err.status ? err.message : 'Failed to subscribe. Please try again.',
    })
  }
})

export default router
