import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import { API } from '../../constants/links'
import { postToApi } from '../../utils/api'
import { useAuth } from '../../context/AuthContext'
import { viewportOnce } from '../../lib/animations'
import { trackLead } from '../../lib/analytics'

export default function EmailCapture() {
  const { user } = useAuth()
  const [email, setEmail] = useState(user?.email || '')
  const [done, setDone] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.email) setEmail(user.email)
  }, [user?.email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed || sending) return

    setError('')
    setSending(true)

    try {
      const data = await postToApi(API.newsletter, {
        email: trimmed,
        source: 'footer_section',
      })
      setPromoCode(data.promoCode || '')
      setEmailSent(Boolean(data.emailSent))
      setDone(true)
      trackLead('footer_section')
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
    <section id="offer" className="section-padding bg-amazia-cream">
      <div className="container-content max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card-premium overflow-hidden"
        >
          <div className="grid gap-8 p-6 md:grid-cols-2 md:gap-12 md:p-10 lg:p-12">
            <div>
              <p className="label-accent">Lead magnet</p>
              <h2 className="mt-2 font-display text-3xl text-amazia-espresso md:text-4xl">
                10% off your first order.
              </h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-amazia-ink">
                Barrier care tips, restock alerts, and the Skin Barrier Guide PDF —
                only from AMAZIA.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              {done ? (
                <div className="space-y-2">
                  {promoCode ? (
                    <>
                      <p className="font-headline text-lg text-amazia-teal">
                        Your code:{' '}
                        <span className="font-mono tracking-wider">{promoCode}</span>
                      </p>
                      <p className="font-body text-sm text-amazia-ink">
                        {emailSent
                          ? 'We also emailed this code to you — check your inbox and spam folder.'
                          : 'Use this code at checkout on your first order.'}
                      </p>
                    </>
                  ) : (
                    <p className="font-headline text-lg italic text-amazia-teal">
                      Thank you — check your inbox soon.
                    </p>
                  )}
                </div>
              ) : (
                <form className="space-y-3" onSubmit={handleSubmit}>
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
                    className="w-full rounded-button border border-amazia-sand/80 bg-amazia-ivory px-4 py-3.5 font-body text-sm text-amazia-ink outline-none focus:border-amazia-teal"
                  />
                  <Button type="submit" variant="teal" disabled={sending} className="w-full">
                    {sending ? 'Subscribing…' : 'Get 10% off'}
                  </Button>
                  {error ? (
                    <p className="font-body text-xs text-amazia-red">{error}</p>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
