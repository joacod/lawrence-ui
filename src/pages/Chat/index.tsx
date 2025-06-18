import { useState } from 'preact/hooks'
import { chatApi } from '../../services/chatApi'
import { ChatMessages } from '../../components/ChatMessages'
import { ChatInput } from '../../components/ChatInput'
import { ChatSidebar } from '../../components/ChatSidebar'
import { Message, Session } from '../../models/chat'

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])

  const handleNewChat = () => {
    setMessages([])
    setSessionId(null)
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: input,
      isUser: true,
      markdown: '',
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await chatApi.processFeature(input, sessionId)
      const newSessionId = response.session_id
      setSessionId(newSessionId)

      // Add new session to the list if it doesn't exist
      if (newSessionId && !sessions.some((s) => s.id === newSessionId)) {
        setSessions((prev) => [...prev, { id: newSessionId, title: response.title }])
      }

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: response.response,
        isUser: false,
        markdown: response.markdown,
        questions: response.questions,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content:
          "Sorry, I'm having trouble connecting to the service. Please try again later.",
        isUser: false,
        markdown: '',
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-base-200">
      <div className="flex-1 flex min-h-0">
        <ChatSidebar sessions={sessions} onNewChat={handleNewChat} />
        <div className="flex-1 overflow-y-auto">
          <ChatMessages messages={messages} isLoading={isLoading} />
        </div>
      </div>
      <div className="flex-none border-t border-base-300">
        <ChatInput
          input={input}
          isLoading={isLoading}
          onInputChange={setInput}
          onSend={handleSend}
        />
      </div>
    </div>
  )
}
