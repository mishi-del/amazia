/** Show Formulation-Reviewed only when formal written statements are received. */
const HAS_DOCTOR_REVIEW = false

const padding = {
  small: 'px-3 py-1.5',
  medium: 'px-4 py-2',
  large: 'px-5 py-2.5',
}

export default function FormulationBadge({ size = 'medium' }) {
  const pad = padding[size] || padding.medium

  if (!HAS_DOCTOR_REVIEW) {
    return (
      <span
        className={`trust-badge inline-flex items-center gap-2 border-amazia-sand bg-amazia-sand/10 text-amazia-ink-light ${pad}`}
      >
        <span aria-hidden="true">◷</span>
        <span>Formulation-Reviewed (Pending)</span>
      </span>
    )
  }

  return (
    <span className={`trust-badge ${pad}`}>
      <span aria-hidden="true">✓</span>
      <span>Formulation-Reviewed</span>
    </span>
  )
}
