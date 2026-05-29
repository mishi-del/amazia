import { handleChatMessage } from '../server/handlers/chatHandler.js'
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
    const body = await readJsonBody(req)
    const data = handleChatMessage(body.message)
    sendJson(res, 200, data)
  } catch (err) {
    handleHandlerError(res, err, 'chat')
  }
}
