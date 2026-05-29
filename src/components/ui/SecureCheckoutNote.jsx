import { Lock } from 'lucide-react'

export default function SecureCheckoutNote({ className = '' }) {
  return (
    <p
      className={`flex items-center justify-center gap-2 font-body text-xs text-amazia-ink-light lg:justify-start ${className}`}
    >
      <Lock size={14} className="text-amazia-teal" aria-hidden="true" />
      <span>256-bit SSL secure checkout · COD available nationwide</span>
    </p>
  )
}
