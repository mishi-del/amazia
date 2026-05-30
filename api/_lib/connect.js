import mongoose from 'mongoose'

const globalCache = globalThis

export async function connectDb() {
  if (globalCache.__amaziaMongoose?.connection?.readyState === 1) {
    return globalCache.__amaziaMongoose
  }

  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('MONGODB_URI is not set. Add it in Vercel → Settings → Environment Variables.')
  }

  mongoose.set('strictQuery', true)

  const opts = {
    bufferCommands: false,
    maxPoolSize: 1,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 10000,
    family: 4,
  }

  globalCache.__amaziaMongoose = await mongoose.connect(uri, opts)

  const { ensureIndexes } = await import('../../server/lib/ensureIndexes.js')
  await ensureIndexes().catch((err) => {
    console.warn('[db] ensureIndexes:', err.message)
  })

  return globalCache.__amaziaMongoose
}
