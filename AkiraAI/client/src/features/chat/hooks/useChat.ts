import { useState, useEffect, useCallback } from 'react'
import type { ChatMessage, ChatSession } from '../types/chat.types'
import {
  getChats,
  getMessages,
  sendMessage as apiSendMessage,
  deleteChat as apiDeleteChat,
} from '../services/chat.api'

export function useChat() {
  const [chats, setChats] = useState<ChatSession[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingChats, setIsFetchingChats] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ─── Fetch All Chats History ───
  const fetchChats = useCallback(async () => {
    setIsFetchingChats(true)
    try {
      const res = await getChats()
      setChats(res.chats || [])
    } catch (err: unknown) {
      console.error('Failed to load chats history:', err)
    } finally {
      setIsFetchingChats(false)
    }
  }, [])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  // ─── Select Chat & Fetch Messages ───
  const selectChat = useCallback(async (chatId: string) => {
    setActiveChatId(chatId)
    setIsLoading(true)
    setError(null)
    try {
      const res = await getMessages(chatId)
      setMessages(res.messages || [])
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Failed to load chat messages'
      setError(msg)
      setMessages([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ─── Start New Chat Session ───
  const startNewChat = useCallback(() => {
    setActiveChatId(null)
    setMessages([])
    setError(null)
  }, [])

  // ─── Send Message ───
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return
      setError(null)
      setIsLoading(true)

      const tempUserMsg: ChatMessage = {
        _id: `temp_${Date.now()}`,
        chat: activeChatId || '',
        content: text.trim(),
        role: 'user',
        createdAt: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, tempUserMsg])

      try {
        const res = await apiSendMessage(text.trim(), activeChatId || undefined)

        // Set returned real user message and AI response message
        setMessages((prev) => {
          const filtered = prev.filter((m) => m._id !== tempUserMsg._id)
          return [...filtered, res.user_message, res.message]
        })

        // If this created a new chat session, update activeChatId & chats list
        if (!activeChatId && res.chat_id) {
          setActiveChatId(res.chat_id)
        }

        // Refresh sidebar conversation list
        fetchChats()
      } catch (err: unknown) {
        const msg = (err as { message?: string })?.message || 'Failed to send message'
        setError(msg)
      } finally {
        setIsLoading(false)
      }
    },
    [activeChatId, isLoading, fetchChats]
  )

  // ─── Delete Chat Session ───
  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      try {
        await apiDeleteChat(chatId)
        setChats((prev) => prev.filter((c) => c._id !== chatId))
        if (activeChatId === chatId) {
          startNewChat()
        }
      } catch (err: unknown) {
        console.error('Failed to delete chat:', err)
      }
    },
    [activeChatId, startNewChat]
  )

  return {
    chats,
    activeChatId,
    messages,
    isLoading,
    isFetchingChats,
    error,
    selectChat,
    startNewChat,
    sendMessage: handleSendMessage,
    deleteChat: handleDeleteChat,
    fetchChats,
  }
}
