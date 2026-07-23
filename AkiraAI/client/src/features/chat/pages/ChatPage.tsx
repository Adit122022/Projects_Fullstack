import { useState, useRef, useEffect } from 'react'
import {
  PanelLeft,
  SquarePen,
  ChevronDown,
  Sparkles,
  Code2,
  BookOpen,
  Lightbulb,
  Compass,
} from 'lucide-react'
import { useChat } from '../hooks/useChat'
import { ChatSidebar } from '../components/ChatSidebar'
import { ChatMessageItem } from '../components/ChatMessageItem'
import { ChatInputBar } from '../components/ChatInputBar'

const QUICK_PROMPTS = [
  {
    icon: Code2,
    title: 'Write code & scripts',
    subtitle: 'Build a fullstack REST API with Express & React',
  },
  {
    icon: Lightbulb,
    title: 'Brainstorm ideas',
    subtitle: 'Generate creative product features & concepts',
  },
  {
    icon: BookOpen,
    title: 'Summarize & analyze',
    subtitle: 'Explain complex topics in plain simple english',
  },
  {
    icon: Compass,
    title: 'Architect systems',
    subtitle: 'Design scalable microservices & databases',
  },
]

export function ChatPage() {
  const {
    chats,
    activeChatId,
    messages,
    isLoading,
    error,
    selectChat,
    startNewChat,
    sendMessage,
    deleteChat,
  } = useChat()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#212121] text-[#ececec] font-sans">
      {/* 1. Left Sidebar */}
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={(id) => selectChat(id)}
        onNewChat={startNewChat}
        onDeleteChat={deleteChat}
        isOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />

      {/* 2. Main Chat Container */}
      <div className="flex flex-col flex-1 h-full min-w-0 bg-[#212121]">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between h-14 px-4 border-b border-[#2d2d2d] bg-[#212121] shrink-0 z-10">
          <div className="flex items-center gap-2">
            {!sidebarOpen && (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="p-2 text-[#8e8e8e] hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors cursor-pointer"
                title="Open Sidebar"
              >
                <PanelLeft className="w-5 h-5" />
              </button>
            )}

            {/* Model Selector Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#2f2f2f] transition-colors cursor-pointer text-sm font-semibold text-white">
              <span>AkiraAi 4.0</span>
              <ChevronDown className="w-4 h-4 text-[#8e8e8e]" />
            </div>
          </div>

          <button
            type="button"
            onClick={startNewChat}
            className="p-2 text-[#8e8e8e] hover:text-white hover:bg-[#2f2f2f] rounded-lg transition-colors cursor-pointer"
            title="New Chat"
          >
            <SquarePen className="w-5 h-5" />
          </button>
        </header>

        {/* Scrollable Messages Stream / Empty Prompt State */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {messages.length === 0 ? (
            /* ChatGPT Centered Empty State */
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-8 text-center max-w-2xl mx-auto">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black mb-6 shadow-lg">
                <Sparkles className="w-6 h-6 text-black" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-8 font-sans">
                What can I help with today?
              </h1>

              {/* Quick Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {QUICK_PROMPTS.map((prompt) => {
                  const Icon = prompt.icon
                  return (
                    <button
                      key={prompt.title}
                      type="button"
                      onClick={() => sendMessage(prompt.subtitle)}
                      className="flex flex-col items-start p-4 text-left bg-[#2f2f2f]/60 hover:bg-[#2f2f2f] border border-[#383838] hover:border-[#555] rounded-2xl transition-all group cursor-pointer"
                    >
                      <Icon className="w-5 h-5 text-[#8e8e8e] group-hover:text-white mb-2 transition-colors" />
                      <span className="text-sm font-medium text-white font-sans">
                        {prompt.title}
                      </span>
                      <span className="text-xs text-[#8e8e8e] mt-1 line-clamp-1 font-sans">
                        {prompt.subtitle}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            /* Message Stream */
            <div className="flex flex-col py-4">
              {messages.map((msg) => (
                <ChatMessageItem key={msg._id} message={msg} />
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="w-full py-4 max-w-3xl mx-auto px-4 flex gap-4">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#212121] border border-[#333] text-white">
                    <Sparkles className="w-4 h-4 animate-pulse text-white" />
                  </div>
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="w-2 h-2 rounded-full bg-[#8e8e8e] animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-[#8e8e8e] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-[#8e8e8e] animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {error && (
            <div className="max-w-3xl mx-auto px-4 py-2 text-xs text-red-400 text-center font-sans">
              {error}
            </div>
          )}
        </div>

        {/* Bottom ChatGPT Prompt Input Bar */}
        <ChatInputBar onSendMessage={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
