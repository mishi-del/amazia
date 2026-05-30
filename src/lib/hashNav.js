/** Sticky header + announcement bar clearance */
export function getNavScrollOffset() {
  const header = document.querySelector('header')
  return (header?.offsetHeight ?? 56) + 8
}

/**
 * @param {string} hash - e.g. "#product" or "product"
 * @param {ScrollBehavior} [behavior='smooth']
 */
export function scrollToSection(hash, behavior = 'smooth') {
  const id = String(hash || '').replace(/^#/, '')
  if (!id) return false

  const el = document.getElementById(id)
  if (!el) return false

  const top = el.getBoundingClientRect().top + window.scrollY - getNavScrollOffset()
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

/** @param {string} to - e.g. "/#product" or "#bundles" */
export function parseSectionTo(to) {
  const raw = String(to || '')
  const hashIndex = raw.indexOf('#')
  if (hashIndex === -1) {
    return { pathname: raw || '/', hash: '' }
  }
  const pathname = raw.slice(0, hashIndex) || '/'
  const hash = raw.slice(hashIndex)
  return { pathname: pathname === '' ? '/' : pathname, hash }
}
