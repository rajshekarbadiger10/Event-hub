import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-400',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-400',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Please wait...' : children}
    </button>
  )
}
