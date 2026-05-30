import { User } from '../models/User.js'
import { Review } from '../models/Review.js'
import { Newsletter } from '../models/Newsletter.js'

let indexesReady = false

/** Idempotent — safe on serverless cold starts. */
export async function ensureIndexes() {
  if (indexesReady) return

  await Promise.all([
    User.createIndexes(),
    Review.createIndexes(),
    Newsletter.createIndexes(),
  ])

  await Review.collection.createIndex({ status: 1, createdAt: -1 })
  await Review.collection.createIndex({ email: 1 })

  indexesReady = true
}
