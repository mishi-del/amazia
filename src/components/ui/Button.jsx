import { motion } from 'framer-motion'

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  teal: 'btn-primary',
  light:
    'inline-block w-full rounded-button bg-white px-6 py-3.5 text-center font-body text-[13px] font-semibold uppercase tracking-wide text-amazia-teal transition-shadow sm:w-auto sm:px-8 sm:py-4',
  outline: 'btn-secondary',
}

const sizes = {
  sm: 'text-xs px-4 py-2',
  md: '',
  lg: '',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  const classes = [
    variants[variant] || variants.primary,
    sizes[size],
    disabled ? 'pointer-events-none opacity-60' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.02 },
    whileTap: disabled ? undefined : { scale: 0.98 },
    ...props,
  }

  if (href && !disabled) {
    return (
      <motion.a href={href} className={classes} {...motionProps}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
