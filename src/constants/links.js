import { PRODUCT } from './brand'

export const SHOP_URL = '#bundles'
export const PRODUCT_PRICE = PRODUCT.price

/** Set VITE_WHATSAPP_NUMBER in .env e.g. 923001234567 */
const wa = (import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '')
export const WHATSAPP_URL = wa
  ? `https://wa.me/${wa}?text=${encodeURIComponent('Hi AMAZIA — I have a question about the Barrier Support Serum.')}`
  : ''

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
