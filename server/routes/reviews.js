import { Router } from 'express'
import { optionalAuth } from '../middleware/auth.js'
import { handleReviewSubmit } from '../handlers/reviewHandler.js'

const router = Router()

router.post('/', optionalAuth, async (req, res) => {
  try {
    const data = await handleReviewSubmit(req.body, req.user)
    res.json(data)
  } catch (err) {
    console.error('[reviews]', err.message)
    res.status(err.status || 500).json({
      error: err.status ? err.message : 'Failed to submit review. Please try again.',
    })
  }
})

export default router
