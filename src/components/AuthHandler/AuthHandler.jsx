import { useEffect, useState } from 'react'
import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../../firebase'
import { useAuth } from '../../context/AuthContext'
import { friendlyFirebaseError } from '../../context/AuthContext'

/**
 * Handles Firebase email links: ?mode=verifyEmail&oobCode=...
 * Must run on the same site URL as in Firebase → Authorized domains (localhost).
 */
export default function AuthHandler() {
  const { openAuth, setAuthModal } = useAuth()
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) return

    const params = new URLSearchParams(window.location.search)
    const mode = params.get('mode')
    const oobCode = params.get('oobCode')

    if (!mode || !oobCode) return

    const cleanUrl = () => {
      const url = new URL(window.location.href)
      url.searchParams.delete('mode')
      url.searchParams.delete('oobCode')
      url.searchParams.delete('apiKey')
      url.searchParams.delete('lang')
      url.searchParams.delete('oobLink')
      window.history.replaceState({}, '', url.pathname + url.hash)
    }

    async function run() {
      try {
        if (mode === 'verifyEmail') {
          await applyActionCode(auth, oobCode)
          setBanner({
            type: 'success',
            text: 'Email verified! You can sign in now.',
          })
          openAuth('login')
        } else if (mode === 'resetPassword') {
          await verifyPasswordResetCode(auth, oobCode)
          sessionStorage.setItem('amazia_firebase_reset_code', oobCode)
          setAuthModal('reset')
          setBanner({
            type: 'info',
            text: 'Choose a new password below.',
          })
        }
      } catch (err) {
        const code = err?.code
        setBanner({
          type: 'error',
          text: code ? friendlyFirebaseError(code) : 'This link is invalid or has expired.',
        })
      } finally {
        cleanUrl()
      }
    }

    run()
  }, [openAuth, setAuthModal])

  if (!banner) return null

  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        top: 'calc(var(--header-offset, 88px) + 0.5rem)',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1100,
        maxWidth: 'min(420px, 92vw)',
        padding: '0.85rem 1.1rem',
        fontSize: '0.9rem',
        lineHeight: 1.45,
        textAlign: 'center',
        background: banner.type === 'success' ? '#eaf4f2' : '#fff5f5',
        color: banner.type === 'success' ? '#1a5c52' : '#8b2e2e',
        border: `1px solid ${banner.type === 'success' ? '#1a5c52' : '#d88'}`,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }}
    >
      {banner.text}
      <button
        type="button"
        onClick={() => setBanner(null)}
        style={{
          display: 'block',
          margin: '0.5rem auto 0',
          background: 'none',
          border: 'none',
          textDecoration: 'underline',
          cursor: 'pointer',
          color: 'inherit',
          fontSize: '0.8rem',
        }}
      >
        Dismiss
      </button>
    </div>
  )
}

export async function completeFirebasePasswordReset(oobCode, newPassword) {
  if (!auth) throw new Error('Firebase is not configured.')
  await confirmPasswordReset(auth, oobCode, newPassword)
  sessionStorage.removeItem('amazia_firebase_reset_code')
}
