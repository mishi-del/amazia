import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDb } from './db.js'
import reviewRoutes from './routes/reviews.js'
import newsletterRoutes from './routes/newsletter.js'
import chatRoutes from './routes/chat.js'
import metaRoutes from './routes/meta.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const app = express()
const PORT = Number(process.env.PORT) || 3001

const corsOrigin = process.env.CORS_ORIGIN
app.use(
  cors(
    corsOrigin
      ? { origin: corsOrigin.split(',').map((o) => o.trim()), credentials: true }
      : { origin: true, credentials: true }
  )
)
app.use(express.json({ limit: '32kb' }))

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'amazia-api',
    version: 3,
    features: ['reviews', 'newsletter', 'chat'],
    auth: 'firebase',
  })
})

app.use('/api/reviews', reviewRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/meta', metaRoutes)

async function start() {
  await connectDb()
  app.listen(PORT, () => {
    console.log(`AMAZIA API listening on http://localhost:${PORT}`)
  })
}

start().catch((err) => {
  console.error('[server] Failed to start:', err.message)
  process.exit(1)
})
