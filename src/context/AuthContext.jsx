import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, googleProvider, isFirebaseConfigured } from '../firebase'
import { getActionCodeSettings } from '../lib/firebaseActionSettings'

const AuthContext = createContext(null)

function mapFirebaseUser(fbUser) {
  if (!fbUser) return null
  const isGoogle = fbUser.providerData.some((p) => p.providerId === 'google.com')
  return {
    id: fbUser.uid,
    name: fbUser.displayName || fbUser.email?.split('@')[0] || 'AMAZIA',
    email: fbUser.email,
    emailVerified: fbUser.emailVerified,
    avatar: fbUser.photoURL,
    authProvider: isGoogle ? 'google' : 'email',
  }
}

function friendlyFirebaseError(code) {
  const messages = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/invalid-email': 'Please enter a valid email.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/wrong-password': 'Invalid email or password.',
    'auth/user-not-found': 'Invalid email or password.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Wait a few minutes and try again.',
    'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
    'auth/popup-blocked':
      'Pop-up was blocked. Allow pop-ups for this site, or try again — we will use a full-page sign-in.',
    'auth/unauthorized-domain':
      'This site URL is not allowed in Firebase. Add it under Authentication → Settings → Authorized domains.',
    'auth/operation-not-allowed':
      'Google sign-in is off in Firebase. Enable Google under Authentication → Sign-in method.',
    'auth/account-exists-with-different-credential':
      'This email is registered another way. Try email/password or Google.',
  }
  return messages[code] || 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authModal, setAuthModal] = useState(null)

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false)
      return undefined
    }

    let cancelled = false

    getRedirectResult(auth)
      .then((cred) => {
        if (cancelled || !cred?.user) return
        setUser(mapFirebaseUser(cred.user))
        setAuthModal(null)
      })
      .catch((err) => {
        if (!cancelled && err?.code) {
          console.warn('[auth] Google redirect:', err.code)
        }
      })

    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(mapFirebaseUser(fbUser))
      setLoading(false)
    })
    return () => {
      cancelled = true
      unsub()
    }
  }, [])

  const ensureConfigured = () => {
    if (!isFirebaseConfigured) {
      throw new Error(
        'Firebase is not set up. Add keys to .env (see SETUP-FIREBASE.txt) and restart.'
      )
    }
  }

  const openAuth = useCallback((view = 'login') => {
    setAuthModal(view)
  }, [])

  const closeAuth = useCallback(() => {
    setAuthModal(null)
  }, [])

  const signup = useCallback(
    async ({ name, email, password }) => {
      ensureConfigured()
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (name.trim()) {
        await updateProfile(cred.user, { displayName: name.trim() })
      }
      await sendEmailVerification(cred.user, getActionCodeSettings())
      await signOut(auth)
      return {
        ok: true,
        needsVerification: true,
        message: `We sent a verification link to ${email}. Open it in Gmail (check Spam), then sign in here.`,
      }
    },
    []
  )

  const login = useCallback(async ({ email, password }) => {
    ensureConfigured()
    const cred = await signInWithEmailAndPassword(auth, email, password)
    if (!cred.user.emailVerified) {
      await sendEmailVerification(cred.user, getActionCodeSettings())
      await signOut(auth)
      throw new Error(
        'Please verify your email first. We sent a new link — check Gmail and Spam.'
      )
    }
    closeAuth()
    return mapFirebaseUser(cred.user)
  }, [closeAuth])

  const loginWithGoogle = useCallback(async () => {
    ensureConfigured()

    const preferRedirect =
      typeof navigator !== 'undefined' &&
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (preferRedirect) {
      await signInWithRedirect(auth, googleProvider)
      return null
    }

    try {
      const cred = await signInWithPopup(auth, googleProvider)
      closeAuth()
      return mapFirebaseUser(cred.user)
    } catch (err) {
      const useRedirect =
        err?.code === 'auth/popup-blocked' ||
        err?.code === 'auth/cancelled-popup-request' ||
        err?.code === 'auth/operation-not-supported-in-this-environment'
      if (useRedirect) {
        await signInWithRedirect(auth, googleProvider)
        return null
      }
      throw err
    }
  }, [closeAuth])

  const logout = useCallback(async () => {
    if (auth) await signOut(auth)
    setUser(null)
  }, [])

  const forgotPassword = useCallback(async (email) => {
    ensureConfigured()
    await sendPasswordResetEmail(auth, email, getActionCodeSettings())
    return {
      ok: true,
      message: 'If that email exists, Firebase sent password reset instructions.',
    }
  }, [])

  const resendVerification = useCallback(async (email, password) => {
    ensureConfigured()
    const cred = await signInWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(cred.user, getActionCodeSettings())
    await signOut(auth)
    return {
      ok: true,
      message: `Verification email sent to ${email}.`,
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      authModal,
      openAuth,
      closeAuth,
      setAuthModal,
      signup,
      login,
      logout,
      forgotPassword,
      resendVerification,
      loginWithGoogle,
      isAuthenticated: Boolean(user),
      isFirebaseConfigured,
    }),
    [
      user,
      loading,
      authModal,
      openAuth,
      closeAuth,
      signup,
      login,
      logout,
      forgotPassword,
      resendVerification,
      loginWithGoogle,
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { friendlyFirebaseError }
