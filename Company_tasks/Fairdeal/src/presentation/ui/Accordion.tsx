import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export interface AccordionItem {
  id: string
  question: string
  answer: string
}

export interface AccordionProps {
  items: AccordionItem[]
  defaultOpenIndex?: number
  allowMultiple?: boolean
  className?: string
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
  className,
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex >= 0 ? [defaultOpenIndex] : []
  )

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndices((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setOpenIndices((prev) => (prev.includes(index) ? [] : [index]))
    }
  }

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index)
        const headerId = `accordion-header-${item.id}`
        const panelId = `accordion-panel-${item.id}`

        return (
          <div
            key={item.id}
            className={cn(
              'border rounded-2xl transition-all duration-200 overflow-hidden',
              isOpen
                ? 'bg-[#F3F8FF]/50 border-[#2959A3]/30 shadow-sm'
                : 'bg-white border-gray-200 hover:border-gray-300'
            )}
          >
            <button
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2959A3]"
            >
              <span className="text-base font-semibold text-[#111827] pr-4">
                {item.question}
              </span>
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200',
                  isOpen
                    ? 'rotate-180 bg-[#2959A3] text-white'
                    : 'bg-gray-100 text-gray-500'
                )}
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="px-5 pb-5 text-sm text-[#4B5563] leading-relaxed border-t border-gray-100/60 pt-3"
              >
                {item.answer}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
