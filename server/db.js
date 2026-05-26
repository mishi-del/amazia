import mongoose from 'mongoose'

let memoryServer = null

async function connectWithMemory() {
  const { MongoMemoryServer } = await import('mongodb-memory-server')
  memoryServer = await MongoMemoryServer.create()
  const uri = memoryServer.getUri('amazia')
  await mongoose.connect(uri)
  console.log('[db] Connected (temporary local database — data resets when you close the server)')
  console.log('[db] Fix Atlas in .env when cloud database is ready')
}

export async function connectDb() {
  let uri = process.env.MONGODB_URI?.trim()

  if (!uri || uri === 'memory') {
    mongoose.set('strictQuery', true)
    return connectWithMemory()
  }

  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(uri)
    console.log('[db] Connected to MongoDB Atlas')
  } catch (err) {
    console.warn('[db] Atlas connection failed:', err.message)
    console.warn('[db] Starting with temporary local database instead…')
    await mongoose.disconnect().catch(() => {})
    return connectWithMemory()
  }
}
