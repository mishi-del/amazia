import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { API } from '../../constants/links'
import { postToApi } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import styles from './EmailCapture.module.css'

export default function EmailCapture() {
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (user?.email) setEmail(user.email)
  }, [user?.email])
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || sending) return

    setError('')
    setSending(true)

    try {
      await postToApi(API.newsletter, {
        email: trimmed,
        source: 'footer_section',
      })
      setDone(true)
      try {
        localStorage.setItem('amazia-email-popup', JSON.stringify({ subscribed: true }))
      } catch {
        /* ignore */
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className={styles.section} id="offer">
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.split}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Stay in touch</p>
            <h2 className={styles.heading}>10% off your first order.</h2>
            <p className={styles.text}>
              Barrier care tips, restock alerts, and exclusive offers — only from AMAZIA.
            </p>
          </div>

          <div className={styles.formWrap}>
            {done ? (
              <p className={styles.success}>Thank you — check your inbox soon.</p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <label htmlFor="section-email" className="sr-only">
                  Email
                </label>
                <input
                  id="section-email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={sending}
                  className={styles.input}
                />
                <Button type="submit" variant="teal" size="md" disabled={sending}>
                  {sending ? 'Subscribing…' : 'Subscribe'}
                </Button>
                {error ? <p className={styles.error}>{error}</p> : null}
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
