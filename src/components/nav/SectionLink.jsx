import { useLocation, useNavigate } from 'react-router-dom'
import { parseSectionTo, scrollToSection } from '../../lib/hashNav'

/**
 * Hash-aware nav link — React Router Link does not scroll to #sections.
 */
export default function SectionLink({ to, className, children, onNavigate, ...rest }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { pathname, hash } = parseSectionTo(to)
  const href = `${pathname}${hash}`

  const handleClick = (e) => {
    e.preventDefault()
    onNavigate?.()

    if (hash) {
      if (location.pathname === pathname) {
        window.history.pushState(null, '', href)
        scrollToSection(hash)
      } else {
        navigate({ pathname, hash })
      }
    } else {
      navigate(pathname)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <a href={href} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
