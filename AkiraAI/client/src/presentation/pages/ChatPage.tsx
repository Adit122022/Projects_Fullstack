import { useState, useRef, useEffect, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useChat } from '@application/hooks/useChat'
import { APP_NAME } from '@domain/constants/app.constants'
import styles from './ChatPage.module.css'

const SUGGESTED_PROMPTS = [
  'Help me design a microservice architecture',
  'Write a TypeScript function to balance a BST',
  'Explain JWT authentication & HttpOnly cookies',
  'Optimize SQL queries for high throughput',
]

export function ChatPage() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const msg = input
    setInput('')
    sendMessage(msg)
  }

  const handlePromptClick = (promptText: string) => {
    if (isLoading) return
    sendMessage(promptText)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titlePixel}>Chat with {APP_NAME}</span>
        </h1>
        {messages.length > 0 && (
          <button className={styles.clearBtn} onClick={clearChat} type="button">
            Clear Chat
          </button>
        )}
      </div>

      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {messages.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyPixel}>AKIRA_AI</span>
              <p>Start a conversation. Ready for custom backend integration.</p>

              <div className={styles.promptsGrid}>
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className={styles.promptBtn}
                    onClick={() => handlePromptClick(prompt)}
                  >
                    {prompt} →
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                className={`${styles.message} ${styles[msg.role]}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className={styles.role}>
                  {msg.role === 'user' ? 'YOU' : 'AKIRA'}
                </span>
                <p className={styles.content}>{msg.content}</p>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className={styles.typing}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <form className={styles.inputBar} onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className={styles.input}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
