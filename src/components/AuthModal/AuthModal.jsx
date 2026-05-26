import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Button from '../ui/Button'
import { useAuth, friendlyFirebaseError } from '../../context/AuthContext'
import { completeFirebasePasswordReset } from '../AuthHandler/AuthHandler'
import styles from './AuthModal.module.css'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

const TITLES = {
  login: 'Welcome back',
  signup: 'Create your account',
  forgot: 'Reset password',
  reset: 'Choose a new password',
}

export default function AuthModal() {
  const {
    authModal,
    closeAuth,
    setAuthModal,
    login,
    signup,
    forgotPassword,
    loginWithGoogle,
    isFirebaseConfigured,
  } = useAuth()

  const view = authModal
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')

  useEffect(() => {
    if (!view) return
    setError('')
    setInfo('')
    setPassword('')
    setConfirm('')
    if (view !== 'signup') setName('')
  }, [view])

  useEffect(() => {
    if (!view) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeAuth()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [view, closeAuth])

  if (!view) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)

    try {
      if (!isFirebaseConfigured) {
        setError('Add Firebase keys to .env — see SETUP-FIREBASE.txt')
        return
      }

      if (view === 'signup') {
        if (password !== confirm) {
          setError('Passwords do not match.')
          return
        }
        const data = await signup({ name, email, password })
        setInfo(data.message)
      } else if (view === 'login') {
        await login({ email, password })
      } else if (view === 'forgot') {
        const data = await forgotPassword(email)
        setInfo(data.message)
      } else if (view === 'reset') {
        const oobCode = sessionStorage.getItem('amazia_firebase_reset_code')
        if (!oobCode) {
          setError('Reset link is missing or expired. Request a new one from Forgot password.')
          return
        }
        if (password !== confirm) {
          setError('Passwords do not match.')
          return
        }
        await completeFirebasePasswordReset(oobCode, password)
        setInfo('Password updated. You can sign in now.')
        setAuthModal('login')
      }
    } catch (err) {
      const code = err?.code
      setError(code ? friendlyFirebaseError(code) : err.message)
    } finally {
      setBusy(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    setBusy(true)
    try {
      if (!isFirebaseConfigured) {
        setError('Add Firebase keys to .env — see SETUP-FIREBASE.txt')
        return
      }
      await loginWithGoogle()
    } catch (err) {
      const code = err?.code
      setError(code ? friendlyFirebaseError(code) : err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAuth}
        role="presentation"
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="auth-modal-title"
        >
          <button type="button" className={styles.close} onClick={closeAuth} aria-label="Close">
            <X size={20} />
          </button>

          <p className={styles.eyebrow}>AMAZIA account</p>
          <h2 id="auth-modal-title" className={styles.title}>
            {TITLES[view] || 'AMAZIA account'}
          </h2>
          {view === 'signup' && (
            <p className={styles.subtitle}>
              Firebase sends a verification email automatically. Click the link, then sign in.
            </p>
          )}
          {view === 'forgot' && (
            <p className={styles.subtitle}>Firebase will email you a password reset link.</p>
          )}
          {view === 'reset' && (
            <p className={styles.subtitle}>Enter a new password for your account.</p>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            {view === 'signup' && (
              <div className={styles.field}>
                <label htmlFor="auth-name">Name</label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  disabled={busy}
                />
              </div>
            )}

            {(view === 'login' || view === 'signup' || view === 'forgot') && (
              <div className={styles.field}>
                <label htmlFor="auth-email">Email</label>
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={busy}
                />
              </div>
            )}

            {(view === 'login' || view === 'signup' || view === 'reset') && (
              <div className={styles.field}>
                <label htmlFor="auth-password">
                  {view === 'reset' ? 'New password' : 'Password'}
                </label>
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={view === 'login' ? 'current-password' : 'new-password'}
                  disabled={busy}
                />
              </div>
            )}

            {(view === 'signup' || view === 'reset') && (
              <div className={styles.field}>
                <label htmlFor="auth-confirm">Confirm password</label>
                <input
                  id="auth-confirm"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  disabled={busy}
                />
              </div>
            )}

            {error && <p className={styles.error}>{error}</p>}
            {info && (
              <p className={view === 'signup' ? styles.infoBox : styles.success}>{info}</p>
            )}

            <Button type="submit" variant="teal" size="lg" className={styles.submit} disabled={busy}>
              {busy
                ? 'Please wait…'
                : view === 'login'
                  ? 'Sign in'
                  : view === 'signup'
                    ? 'Create account'
                    : view === 'reset'
                      ? 'Update password'
                      : 'Send reset email'}
            </Button>
          </form>

          {(view === 'login' || view === 'signup') && (
            <>
              <div className={styles.divider}>or</div>
              <button
                type="button"
                className={styles.googleBtn}
                onClick={handleGoogle}
                disabled={busy}
              >
                <GoogleIcon />
                Continue with Google
              </button>
            </>
          )}

          <p className={styles.footer}>
            {view === 'login' && (
              <>
                <button type="button" onClick={() => setAuthModal('forgot')}>
                  Forgot password?
                </button>
                {' · '}
                No account?{' '}
                <button type="button" onClick={() => setAuthModal('signup')}>
                  Sign up
                </button>
              </>
            )}
            {view === 'signup' && (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => setAuthModal('login')}>
                  Sign in
                </button>
              </>
            )}
            {view === 'forgot' && (
              <button type="button" onClick={() => setAuthModal('login')}>
                Back to sign in
              </button>
            )}
            {view === 'reset' && (
              <button type="button" onClick={() => setAuthModal('login')}>
                Back to sign in
              </button>
            )}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
