import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '@/app/app.store'
import type { ChatMessage } from '../types/chat.types'
import {
  getChats,
  getMessages,
  sendMessage as apiSendMessage,
  deleteChat as apiDeleteChat,
} from '../services/chat.api'
import {
  setChats,
  setActiveChatId,
  setMessagesForChat,
  addMessageToChat,
  replaceTempMessageInChat,
  setLoading,
  setIsFetchingChats,
  setError,
  deleteChatInStore,
  clearActiveChat,
} from '../chat.slice'

export function useChat() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    chats,
    activeChatId,
    messagesByChatId,
    isLoading,
    isFetchingChats,
    error,
  } = useSelector((state: RootState) => state.chat)

  // Derive current active chat's messages from the Redux messagesByChatId cache map
  const messages: ChatMessage[] = activeChatId
    ? messagesByChatId[activeChatId] || []
    : []

  // ─── Fetch All Chats History ───
  const fetchChats = useCallback(async () => {
    dispatch(setIsFetchingChats(true))
    try {
      const res = await getChats()
      dispatch(setChats(res.chats || []))
    } catch (err: unknown) {
      console.error('Failed to load chats history:', err)
    } finally {
      dispatch(setIsFetchingChats(false))
    }
  }, [dispatch])

  useEffect(() => {
    fetchChats()
  }, [fetchChats])

  // ─── Select Chat & Fetch Messages (with Instant Cache Lookup) ───
  const selectChat = useCallback(
    async (chatId: string) => {
      dispatch(setActiveChatId(chatId))
      dispatch(setError(null))

      // If messages for this chat are already in Redux cache, render instantly!
      const hasCachedMessages = Boolean(messagesByChatId[chatId])
      if (!hasCachedMessages) {
        dispatch(setLoading(true))
      }

      try {
        const res = await getMessages(chatId)
        dispatch(
          setMessagesForChat({
            chatId,
            messages: res.messages || [],
          })
        )
      } catch (err: unknown) {
        const msg = (err as { message?: string })?.message || 'Failed to load chat messages'
        dispatch(setError(msg))
      } finally {
        dispatch(setLoading(false))
      }
    },
    [dispatch, messagesByChatId]
  )

  // ─── Start New Chat Session ───
  const startNewChat = useCallback(() => {
    dispatch(clearActiveChat())
    dispatch(setError(null))
  }, [dispatch])

  // ─── Send Message ───
  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return
      dispatch(setError(null))
      dispatch(setLoading(true))

      const currentChatKey = activeChatId || 'temp_session'

      const tempUserMsg: ChatMessage = {
        _id: `temp_${Date.now()}`,
        chat: activeChatId || '',
        content: text.trim(),
        role: 'user',
        createdAt: new Date().toISOString(),
      }

      // Optimistically add temp user message
      dispatch(
        addMessageToChat({
          chatId: currentChatKey,
          message: tempUserMsg,
        })
      )

      try {
        const res = await apiSendMessage(text.trim(), activeChatId || undefined)
        const realChatId = res.chat_id || activeChatId || currentChatKey

        // Replace temp message with real backend user & AI messages
        dispatch(
          replaceTempMessageInChat({
            chatId: realChatId,
            tempId: tempUserMsg._id,
            userMsg: res.user_message,
            aiMsg: res.message,
          })
        )

        // If this created a new chat session, switch activeChatId to the new real ID
        if (!activeChatId && res.chat_id) {
          dispatch(setActiveChatId(res.chat_id))
        }

        fetchChats()
      } catch (err: unknown) {
        const msg = (err as { message?: string })?.message || 'Failed to send message'
        dispatch(setError(msg))
      } finally {
        dispatch(setLoading(false))
      }
    },
    [activeChatId, isLoading, fetchChats, dispatch]
  )

  // ─── Delete Chat Session ───
  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      try {
        await apiDeleteChat(chatId)
        dispatch(deleteChatInStore(chatId))
      } catch (err: unknown) {
        console.error('Failed to delete chat:', err)
      }
    },
    [dispatch]
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
