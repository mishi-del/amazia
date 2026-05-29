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
  globalCache.__amaziaMongoose = await mongoose.connect(uri, {
    bufferCommands: false,
    maxPoolSize: 5,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
  })
  return globalCache.__amaziaMongoose
}
