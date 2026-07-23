import type { ChatMessage } from '@domain/entities'

export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export function createUserMessage(content: string): ChatMessage {
  return {
    id: generateMessageId(),
    role: 'user',
    content: content.trim(),
    timestamp: new Date(),
  }
}

export function validateMessage(content: string): boolean {
  return content.trim().length > 0 && content.trim().length <= 2000
}
