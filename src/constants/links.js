export const SHOP_URL = '#bundles'
export const WHATSAPP_URL = ''
export const PRODUCT_PRICE = 'Rs. 3,800'

/**
 * Backend API — reviews, newsletter, chat (auth is Firebase on the frontend)
 */

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export const API = {
  health: `${API_BASE}/api/health`,
  reviews: `${API_BASE}/api/reviews`,
  newsletter: `${API_BASE}/api/newsletter`,
  chat: `${API_BASE}/api/chat`,
}

/** @deprecated Use API.reviews */
export const REVIEW_FORM_ENDPOINT = API.reviews

/** @deprecated Use API.newsletter */
export const EMAIL_FORM_ENDPOINT = API.newsletter
