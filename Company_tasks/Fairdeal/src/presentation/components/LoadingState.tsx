import React from 'react'

export const LoadingState: React.FC<{ message?: string }> = ({
  message = 'Loading Fairdeal wholesale data...',
}) => {
  return (
    <div
      className="w-full min-h-[50vh] flex flex-col items-center justify-center p-8 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
        <div className="absolute inset-0 rounded-full border-4 border-[#2959A3] border-t-transparent animate-spin" />
      </div>
      <p className="text-xs font-bold text-gray-700 tracking-wide">{message}</p>
      <span className="text-[10px] text-gray-400 mt-1">Connecting to nearest dark store hub</span>
    </div>
  )
}
