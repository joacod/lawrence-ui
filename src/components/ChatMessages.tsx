import { useRef, useEffect } from 'preact/hooks'

interface Message {
  id: string
  content: string
  isUser: boolean
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

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
                } max-w-[80%]`}
              >
                {message.content}
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
    </div>
  )
} 