import React from 'react'
import { cn } from '@/shared/utils/cn'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'outline' | 'warning'
  size?: 'sm' | 'md'
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium select-none rounded-full'

  const variants = {
    primary: 'bg-[#F3F8FF] text-[#2959A3] border border-[#D4E3FC]',
    secondary: 'bg-[#F1F5F9] text-[#363E51] border border-gray-200',
    accent: 'bg-[#63C7ED]/15 text-[#0369A1] border border-[#63C7ED]/40',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    outline: 'border border-gray-300 text-gray-700 bg-transparent',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
  }

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  }

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  )
}
