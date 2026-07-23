import { useState } from 'react'
import { Sparkles, User, Copy, Check } from 'lucide-react'
import type { ChatMessage } from '../types/chat.types'

interface ChatMessageItemProps {
  message: ChatMessage
}

export function ChatMessageItem({ message }: ChatMessageItemProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={`w-full py-4 text-[#ececec] transition-colors ${
        isUser ? 'flex justify-end' : 'flex justify-start'
      }`}
    >
      <div
        className={`max-w-3xl w-full flex gap-4 px-4 ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar */}
        <div className="shrink-0 mt-0.5">
          {isUser ? (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black font-semibold text-xs shadow">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#212121] border border-[#333333] text-white shadow">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          )}
        </div>

        {/* Message Content Container */}
        <div
          className={`flex-1 min-w-0 ${
            isUser
              ? 'bg-[#2f2f2f] text-white px-4 py-3 rounded-2xl max-w-[80%]'
              : 'text-[#ececec] pt-1'
          }`}
        >
          {/* Role Title Header */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-[#8e8e8e] uppercase tracking-wider">
              {isUser ? 'You' : 'AkiraAi'}
            </span>

            {/* Action Bar for Copy */}
            {!isUser && (
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-[#676767] hover:text-white transition-colors px-1.5 py-0.5 rounded hover:bg-[#212121]"
                title="Copy message"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-green-400" />
                    <span className="text-green-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Text Content */}
          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words font-sans">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  )
}
