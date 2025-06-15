import { useState } from 'preact/hooks'
import { chatApi } from '../../services/chatApi'
import { ChatMessages } from '../../components/ChatMessages'
import { ChatInput } from '../../components/ChatInput'

interface Message {
  id: string
  content: string
  isUser: boolean
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

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

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <ChatMessages messages={messages} isLoading={isLoading} />
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={setInput}
        onSend={handleSend}
      />
    </div>
  )
}
