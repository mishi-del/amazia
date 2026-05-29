import { connectDb } from './_lib/connect.js'
import { handleReviewSubmit } from '../server/handlers/reviewHandler.js'
import {
  handleHandlerError,
  readJsonBody,
  sendJson,
  setCors,
} from './_lib/http.js'

export default async function handler(req, res) {
  setCors(res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' })
  }

  try {
    await connectDb()
    const body = await readJsonBody(req)
    const data = await handleReviewSubmit(body, null)
    sendJson(res, 200, data)
  } catch (err) {
    handleHandlerError(res, err, 'reviews')
  }
}
