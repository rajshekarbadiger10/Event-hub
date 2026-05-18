import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  title?: string
  description?: string
}

export function Card({
  children,
  title,
  description,
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}
      {...props}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && <h2 className="text-lg font-semibold text-slate-900">{title}</h2>}
          {description && (
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
