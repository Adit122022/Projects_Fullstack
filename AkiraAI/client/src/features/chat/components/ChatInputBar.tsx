import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react'
import { ArrowUp, Paperclip, Globe } from 'lucide-react'

interface ChatInputBarProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function ChatInputBar({ onSendMessage, isLoading }: ChatInputBarProps) {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isLoading) return
    onSendMessage(input.trim())
    setInput('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 pt-2">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col w-full bg-[#2f2f2f] border border-[#383838] focus-within:border-[#555555] rounded-2xl shadow-xl transition-colors overflow-hidden"
      >
        {/* Text Area Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          rows={1}
          disabled={isLoading}
          className="w-full px-4 pt-3.5 pb-2 text-sm text-[#ececec] placeholder-[#8e8e8e] bg-transparent resize-none outline-none focus:outline-none max-h-48 overflow-y-auto"
        />

        {/* Input Bar Bottom Toolbar */}
        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              title="Attach File"
              className="p-1.5 text-[#8e8e8e] hover:text-white hover:bg-[#383838] rounded-full transition-colors cursor-pointer"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              title="Search Web"
              className="p-1.5 text-[#8e8e8e] hover:text-white hover:bg-[#383838] rounded-full transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
            </button>
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all cursor-pointer ${
              input.trim() && !isLoading
                ? 'bg-white text-black hover:opacity-90 shadow'
                : 'bg-[#676767]/40 text-[#8e8e8e] cursor-not-allowed'
            }`}
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </form>

      {/* ChatGPT Footer Note */}
      <div className="mt-2 text-center text-[11px] text-[#676767]">
        AkiraAi can make mistakes. Verify important info.
      </div>
    </div>
  )
}
