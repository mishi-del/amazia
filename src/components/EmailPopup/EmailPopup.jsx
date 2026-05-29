import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import { API } from '../../constants/links'
import { DEFAULT_PROMO_CODE } from '../../constants/promo'
import { postToApi } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import styles from './EmailPopup.module.css'

const STORAGE_KEY = 'amazia-email-popup'
const DISMISS_DAYS = 7

function shouldShowPopup() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return true
    const data = JSON.parse(raw)
    if (data.subscribed) return false
    if (data.dismissedAt) {
      const elapsed = Date.now() - data.dismissedAt
      return elapsed > DISMISS_DAYS * 24 * 60 * 60 * 1000
    }
    return true
  } catch {
    return true
  }
}

function savePopupState(partial) {
  try {
    const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prev, ...partial }))
  } catch {
    /* ignore */
  }
}

export default function EmailPopup() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState(user?.email || '')
  const [done, setDone] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [minimized, setMinimized] = useState(false)

  const close = useCallback((dismiss = true) => {
    setOpen(false)
    if (dismiss && !done) {
      savePopupState({ dismissedAt: Date.now() })
      setMinimized(true)
    }
  }, [done])

  useEffect(() => {
    if (!shouldShowPopup()) {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const data = JSON.parse(raw)
        if (data.subscribed) return
        if (data.dismissedAt) setMinimized(true)
      }
      return
    }

    const timer = setTimeout(() => setOpen(true), 4500)

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      if (scrolled > 0.22) {
        setOpen(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || sending) return

    setError('')
    setSending(true)

    try {
      const data = await postToApi(API.newsletter, {
        email: trimmed,
        source: 'popup',
      })
      setPromoCode(data.promoCode || DEFAULT_PROMO_CODE)
      setEmailSent(Boolean(data.emailSent))
      setDone(true)
      savePopupState({ subscribed: true, promoCode: data.promoCode || DEFAULT_PROMO_CODE })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const openFromTab = () => {
    setMinimized(false)
    setOpen(true)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => close()}
            role="presentation"
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="email-popup-title"
            >
              <button
                type="button"
                className={styles.close}
                onClick={() => close()}
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className={styles.accent} aria-hidden="true" />

              {!done ? (
                <>
                  <p className={styles.eyebrow}>Welcome offer</p>
                  <h2 id="email-popup-title" className={styles.title}>
                    10% off your first order
                  </h2>
                  <p className={styles.text}>
                    Join AMAZIA for barrier-care tips and an exclusive code —
                    delivered to your inbox. No spam, ever.
                  </p>

                  <form className={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="popup-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="popup-email"
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={sending}
                      autoFocus
                      className={styles.input}
                    />
                    <Button
                      type="submit"
                      variant="teal"
                      size="lg"
                      className={styles.submit}
                      disabled={sending}
                    >
                      {sending ? 'Sending…' : 'Get my 10% off'}
                    </Button>
                    {error ? <p className={styles.error}>{error}</p> : null}
                  </form>

                  <button type="button" className={styles.skip} onClick={() => close()}>
                    No thanks, I&apos;ll pay full price
                  </button>
                </>
              ) : (
                <motion.div
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <span className={styles.successIcon}>✓</span>
                  <h2 className={styles.title}>You&apos;re in.</h2>
                  {promoCode ? (
                    <>
                      <p className={styles.code} aria-label="Discount code">
                        {promoCode}
                      </p>
                      <p className={styles.text}>
                        {emailSent
                          ? 'We emailed this code too — check Gmail inbox and Spam.'
                          : 'Save this code for checkout. Email delivery is not set up on the server yet — the code above is your 10% off.'}
                      </p>
                    </>
                  ) : (
                    <p className={styles.text}>
                      Check your inbox for your 10% code. Your barrier will thank you.
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {minimized && !open && !done && (
          <motion.button
            type="button"
            className={styles.tab}
            onClick={openFromTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.03 }}
            aria-label="Open 10% off offer"
          >
            <span className={styles.tabLabel}>10% off</span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
