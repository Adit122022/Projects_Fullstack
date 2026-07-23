import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ChatMessage, ChatSession } from './types/chat.types'

export interface ChatState {
  chats: ChatSession[]
  activeChatId: string | null
  messagesByChatId: Record<string, ChatMessage[]>
  isLoading: boolean
  isFetchingChats: boolean
  error: string | null
}

const initialState: ChatState = {
  chats: [],
  activeChatId: null,
  messagesByChatId: {},
  isLoading: false,
  isFetchingChats: false,
  error: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<ChatSession[]>) => {
      state.chats = action.payload
    },
    setActiveChatId: (state, action: PayloadAction<string | null>) => {
      state.activeChatId = action.payload
    },
    setMessagesForChat: (
      state,
      action: PayloadAction<{ chatId: string; messages: ChatMessage[] }>
    ) => {
      state.messagesByChatId[action.payload.chatId] = action.payload.messages
    },
    addMessageToChat: (
      state,
      action: PayloadAction<{ chatId: string; message: ChatMessage }>
    ) => {
      const { chatId, message } = action.payload
      if (!state.messagesByChatId[chatId]) {
        state.messagesByChatId[chatId] = []
      }
      state.messagesByChatId[chatId].push(message)
    },
    replaceTempMessageInChat: (
      state,
      action: PayloadAction<{
        chatId: string
        tempId: string
        userMsg: ChatMessage
        aiMsg: ChatMessage
      }>
    ) => {
      const { chatId, tempId, userMsg, aiMsg } = action.payload
      if (state.messagesByChatId[chatId]) {
        state.messagesByChatId[chatId] = state.messagesByChatId[chatId].filter(
          (m) => m._id !== tempId
        )
        state.messagesByChatId[chatId].push(userMsg, aiMsg)
      } else {
        state.messagesByChatId[chatId] = [userMsg, aiMsg]
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsFetchingChats: (state, action: PayloadAction<boolean>) => {
      state.isFetchingChats = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    deleteChatInStore: (state, action: PayloadAction<string>) => {
      const chatId = action.payload
      state.chats = state.chats.filter((c) => c._id !== chatId)
      delete state.messagesByChatId[chatId]
      if (state.activeChatId === chatId) {
        state.activeChatId = null
      }
    },
    clearActiveChat: (state) => {
      state.activeChatId = null
    },
  },
})

export const {
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
} = chatSlice.actions

export default chatSlice.reducer
