import React from 'react'
import { cn } from '@/shared/utils/cn'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none'

    const variants = {
      primary:
        'bg-[#2959A3] text-white hover:bg-[#1E437C] active:bg-[#163462] focus-visible:ring-[#2959A3] shadow-sm',
      secondary:
        'bg-[#363E51] text-white hover:bg-[#282F3E] active:bg-[#1C212D] focus-visible:ring-[#363E51] shadow-sm',
      outline:
        'border border-[#2959A3] text-[#2959A3] bg-transparent hover:bg-[#F3F8FF] active:bg-[#E5EFFE] focus-visible:ring-[#2959A3]',
      ghost:
        'text-[#363E51] hover:bg-[#F1F5F9] active:bg-[#E2E8F0] focus-visible:ring-[#363E51]',
      accent:
        'bg-[#63C7ED] text-[#0A2540] font-semibold hover:bg-[#4FB7DF] active:bg-[#3FA0C7] focus-visible:ring-[#63C7ED] shadow-sm',
      danger:
        'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600 shadow-sm',
    }

    const sizes = {
      sm: 'h-9 px-3 text-xs rounded-lg gap-1.5',
      md: 'h-11 px-5 text-sm rounded-xl gap-2',
      lg: 'h-13 px-7 text-base rounded-2xl gap-2.5',
      icon: 'h-10 w-10 p-0 rounded-xl justify-center',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'
