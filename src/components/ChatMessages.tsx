import { useRef, useEffect, useState } from 'preact/hooks'
import { MarkdownModal } from './MarkdownModal'
import { Message } from '../models/chat'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedMarkdown, setSelectedMarkdown] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div id="chat-messages" className="flex-1 overflow-y-auto p-4 pt-20">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat ${message.isUser ? 'chat-end' : 'chat-start'}`}
            >
              <div
                className={`chat-bubble ${
                  message.isUser
                    ? 'chat-bubble-primary'
                    : message.content.includes("Sorry, I'm having trouble")
                    ? 'chat-bubble-error'
                    : 'chat-bubble-secondary'
                } max-w-[80%] relative group`}
              >
                {message.content}
                {!message.isUser && (
                  <button
                    className="btn btn-ghost btn-sm absolute -right-12 top-1/2 -translate-y-1/2"
                    onClick={() => setSelectedMarkdown(message.markdown)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-secondary">
                <span className="loading loading-dots loading-sm"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <MarkdownModal
        isOpen={selectedMarkdown !== null}
        onClose={() => setSelectedMarkdown(null)}
        markdown={selectedMarkdown || ''}
      />
    </div>
  )
} 