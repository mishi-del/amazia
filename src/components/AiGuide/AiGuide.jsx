import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send } from 'lucide-react'
import { API } from '../../constants/links'
import { postToApi } from '../../utils/api'
import styles from './AiGuide.module.css'

const WELCOME =
  'Hi! I am AMAZIA Guide — your free assistant on this page. Ask about the serum, ingredients, how to use it, shipping, or where to find a section.'

const QUICK_PROMPTS = [
  'Is it safe for sensitive skin?',
  'How do I use it?',
  'Price and bundles?',
  'Shipping and COD?',
]

export default function AiGuide() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: WELCOME }])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const listRef = useRef(null)

  const hasUserMessage = messages.some((m) => m.role === 'user')
  const showQuickPrompts = open && !hasUserMessage && !sending
  const expanded = open && (hasUserMessage || sending)

  const closeChat = () => setOpen(false)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, sending, open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeChat()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const sendMessage = async (text) => {
    const trimmed = text.trim()
    if (!trimmed || sending) return

    const userMsg = { role: 'user', content: trimmed }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setSending(true)

    try {
      const history = nextMessages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .slice(-10)
        .map((m) => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content,
        }))

      const data = await postToApi(API.chat, {
        message: trimmed,
        history: history.slice(0, -1),
      })

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            err.message ||
            'Sorry, I could not respond right now. Try again in a moment.',
        },
      ])
    } finally {
      setSending(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {!open && (
        <motion.button
          type="button"
          className={styles.fab}
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          aria-label="Open AMAZIA Guide chat"
        >
          <MessageCircle size={20} strokeWidth={1.5} />
          <span>AMAZIA Guide</span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className={`${styles.panel} ${expanded ? styles.panelExpanded : ''}`}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="AMAZIA Guide chat"
          >
            <div className={styles.header}>
              <div className={styles.headerText}>
                <h3>AMAZIA Guide</h3>
                <p>Free help · barrier serum · this page</p>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={closeChat}
                aria-label="Close chat"
              >
                <X size={18} strokeWidth={2} />
                <span className={styles.closeLabel}>Close</span>
              </button>
            </div>

            <AnimatePresence>
              {showQuickPrompts && (
                <motion.div
                  className={styles.chips}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className={styles.chip}
                      onClick={() => sendMessage(q)}
                      disabled={sending}
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className={styles.messages} ref={listRef}>
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.content.slice(0, 12)}`}
                  className={`${styles.bubble} ${
                    m.role === 'user' ? styles.bubbleUser : styles.bubbleBot
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {sending && <p className={styles.typing}>Replying…</p>}
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                className={styles.input}
                placeholder="Ask anything about AMAZIA…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={sending}
                maxLength={500}
                aria-label="Message"
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={sending || !input.trim()}
                aria-label="Send"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
