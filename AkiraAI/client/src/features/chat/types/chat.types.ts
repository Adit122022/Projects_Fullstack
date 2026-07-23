export interface ChatMessage {
  _id: string
  chat: string
  content: string
  role: 'user' | 'ai'
  createdAt?: string
  updatedAt?: string
}

export interface ChatSession {
  _id: string
  title: string
  user: string
  createdAt: string
  updatedAt: string
}

export interface SendMessagePayload {
  message: string
  chat?: string
}

export interface SendMessageResponse {
  title: string | null
  chat_id: string
  user_message: ChatMessage
  message: ChatMessage
}

export interface GetChatsResponse {
  message: string
  chats: ChatSession[]
}

export interface GetMessagesResponse {
  message: string
  messages: ChatMessage[]
}

export interface UpdateMessageResponse {
  message: string
  user_message: ChatMessage
  ai_message: ChatMessage
}
