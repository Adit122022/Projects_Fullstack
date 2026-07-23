export interface NavLink {
  label: string
  path: string
}

export interface Feature {
  id: string
  title: string
  description: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatSession {
  id: string
  messages: ChatMessage[]
  createdAt: Date
}
