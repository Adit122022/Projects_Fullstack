import { useState } from 'react'
import { Link } from 'react-router'
import {
  SquarePen,
  MessageSquare,
  Trash2,
  PanelLeft,
  LogOut,
  User as UserIcon,
  Sparkles,
} from 'lucide-react'
import type { ChatSession } from '../types/chat.types'

interface ChatSidebarProps {
  chats: ChatSession[]
  activeChatId: string | null
  onSelectChat: (chatId: string) => void
  onNewChat: () => void
  onDeleteChat: (chatId: string) => void
  isOpen: boolean
  onToggleSidebar: () => void
}

export function ChatSidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isOpen,
  onToggleSidebar,
}: ChatSidebarProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        onClick={onToggleSidebar}
      />

      <aside className="fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#171717] border-r border-[#262626] text-[#ececec] font-sans md:static shrink-0">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-3 border-b border-[#262626]">
          <Link to="/" className="flex items-center gap-2 px-1">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-white text-black font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm text-white">AkiraAi</span>
          </Link>
          <button
            type="button"
            onClick={onToggleSidebar}
            title="Close sidebar"
            className="p-1.5 text-[#8e8e8e] hover:text-white hover:bg-[#212121] rounded-lg transition-colors cursor-pointer"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            type="button"
            onClick={onNewChat}
            className="flex items-center justify-between w-full px-3 py-2.5 text-sm font-medium text-white bg-[#212121] hover:bg-[#2f2f2f] rounded-lg border border-[#303030] transition-colors shadow-sm cursor-pointer"
          >
            <span className="flex items-center gap-2.5">
              <SquarePen className="w-4 h-4 text-white" />
              New chat
            </span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#2f2f2f] text-[#8e8e8e]">
              ⌘K
            </span>
          </button>
        </div>

        {/* Chats History List */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5 custom-scrollbar">
          <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#676767] uppercase">
            Recent
          </div>

          {chats.length === 0 ? (
            <div className="px-3 py-4 text-xs text-center text-[#676767]">
              No conversations yet
            </div>
          ) : (
            chats.map((chat) => {
              const isActive = activeChatId === chat._id
              return (
                <div
                  key={chat._id}
                  className={`group relative flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#212121] text-white font-medium'
                      : 'text-[#b4b4b4] hover:bg-[#212121]/60 hover:text-white'
                  }`}
                  onClick={() => onSelectChat(chat._id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-4">
                    <MessageSquare className="w-4 h-4 shrink-0 text-[#8e8e8e]" />
                    <span className="truncate text-xs">
                      {chat.title || 'Untitled Chat'}
                    </span>
                  </div>

                  {/* Delete button on hover */}
                  <button
                    type="button"
                    title="Delete Chat"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (deletingId === chat._id) {
                        onDeleteChat(chat._id)
                        setDeletingId(null)
                      } else {
                        setDeletingId(chat._id)
                      }
                    }}
                    onMouseLeave={() => setDeletingId(null)}
                    className={`p-1 rounded transition-opacity ${
                      deletingId === chat._id
                        ? 'text-red-400 opacity-100'
                        : 'text-[#676767] hover:text-white opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-[#262626] bg-[#171717]">
          <div className="flex items-center justify-between p-2 rounded-lg hover:bg-[#212121] transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-black font-bold text-xs">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  Akira User
                </div>
                <div className="text-[10px] text-[#676767] truncate">
                  Free Plan
                </div>
              </div>
            </div>
            <Link
              to="/login"
              className="p-1.5 text-[#8e8e8e] hover:text-white rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
