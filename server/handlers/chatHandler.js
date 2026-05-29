import { guideReply } from '../lib/chatKnowledge.js'

export function handleChatMessage(message) {
  const trimmed = String(message || '').trim()

  if (!trimmed) {
    const err = new Error('Message is required.')
    err.status = 400
    throw err
  }
  if (trimmed.length > 2000) {
    const err = new Error('Message is too long.')
    err.status = 400
    throw err
  }

  const reply = guideReply(trimmed)
  return { ok: true, reply, source: 'guide' }
}
