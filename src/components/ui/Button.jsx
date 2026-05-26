import { motion } from 'framer-motion'
import styles from './Button.module.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ opacity: 0.85 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ opacity: 0.85 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
