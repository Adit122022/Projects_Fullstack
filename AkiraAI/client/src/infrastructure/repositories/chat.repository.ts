import type { ChatMessage } from '@domain/entities'

export interface IChatRepository {
  sendMessage(content: string): Promise<ChatMessage>
  loadHistory(): Promise<ChatMessage[]>
  clearHistory(): Promise<void>
}
