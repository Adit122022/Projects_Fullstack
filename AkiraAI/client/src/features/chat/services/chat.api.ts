import axios from 'axios'
import type {
  GetChatsResponse,
  GetMessagesResponse,
  SendMessageResponse,
  UpdateMessageResponse,
} from '../types/chat.types'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * GET /api/chat/
 * Retrieves all chat sessions for the authenticated user.
 */
export const getChats = async (): Promise<GetChatsResponse> => {
  const res = await api.get<GetChatsResponse>('/chat/')
  return res.data
}

/**
 * GET /api/chat/:chat_id
 * Retrieves messages for a specific conversation.
 */
export const getMessages = async (chatId: string): Promise<GetMessagesResponse> => {
  const res = await api.get<GetMessagesResponse>(`/chat/${chatId}`)
  return res.data
}

/**
 * POST /api/chat/message
 * Sends a message to the chatbot. Creates a new chat session if chatId is not provided.
 */
export const sendMessage = async (
  message: string,
  chatId?: string
): Promise<SendMessageResponse> => {
  const res = await api.post<SendMessageResponse>('/chat/message', {
    message,
    chat: chatId,
  })
  return res.data
}

/**
 * DELETE /api/chat/:chat_id
 * Deletes a chat session and all its messages.
 */
export const deleteChat = async (chatId: string): Promise<{ message: string }> => {
  const res = await api.delete<{ message: string }>(`/chat/${chatId}`)
  return res.data
}

/**
 * PATCH /api/chat/:message_id
 * Updates a user message and regenerates the AI response.
 */
export const updateMessage = async (
  messageId: string,
  content: string
): Promise<UpdateMessageResponse> => {
  const res = await api.patch<UpdateMessageResponse>(`/chat/${messageId}`, {
    content,
  })
  return res.data
}
