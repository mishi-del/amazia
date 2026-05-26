/** Where Firebase sends users after they click email links */
export function getActionCodeSettings() {
  const origin =
    import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') ||
    (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173')

  return {
    url: `${origin}/`,
    handleCodeInApp: true,
  }
}
