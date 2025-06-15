import { useState, useRef, useEffect } from 'preact/hooks'
import { chatApi } from '../../services/chatApi'

interface Message {
  id: string
  content: string
  isUser: boolean
}

export function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await chatApi.processFeature(input, sessionId)
      setSessionId(response.session_id)
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: response.response,
        isUser: false,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content:
          "Sorry, I'm having trouble connecting to the service. Please try again later.",
        isUser: false,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-base-200">
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

      <div id="chat-input" className="sticky bottom-0 p-4 bg-base-100 border-t border-base-300">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-2">
            <textarea
              className="textarea textarea-bordered flex-1"
              placeholder="Type your message..."
              value={input}
              onInput={(e) => setInput((e.target as HTMLTextAreaElement).value)}
              onKeyPress={handleKeyPress}
              rows={1}
            />
            <button
              className="btn btn-primary"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
