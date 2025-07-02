import { useState, useEffect } from 'preact/hooks'
import { chatApi } from '../../services/chatApi'
import { ChatMessages } from '../../components/ChatMessages'
import { ChatInput } from '../../components/ChatInput'
import { ChatSidebar } from '../../components/ChatSidebar'
import { Message, Session, ConversationMessage } from '../../models/chat'

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessions, setSessions] = useState<Session[]>([])

  useEffect(() => {
    async function fetchSessions() {
      try {
        const sessions = await chatApi.getSessions()
        setSessions(sessions)
      } catch (error) {
        console.error('Failed to load sessions:', error)
      }
    }
    fetchSessions()
  }, [])

  const handleNewChat = () => {
    setMessages([])
    setSessionId(null)
  }

  const handleSessionClick = async (sessionId: string) => {
    setIsLoading(true)
    try {
      const response = await chatApi.getSessionHistory(sessionId)

      if (!response.data || response.data.length === 0) {
        console.error('No session data found')
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          content:
            'Unable to load session history. The session may have been deleted or is no longer available.',
          isUser: false,
          markdown: '',
          isError: true,
        }
        setMessages([errorMessage])
        return
      }

      const sessionData = response.data[0]
      setSessionId(sessionId)

      // Convert conversation messages to the Message format
      const convertedMessages: Message[] = sessionData.conversation.map(
        (msg: ConversationMessage) => {
          const isUser = msg.type === 'user'
          return {
            id: crypto.randomUUID(),
            content: isUser ? msg.content || '' : msg.chat?.response || '',
            isUser,
            markdown: msg.feature_overview
              ? JSON.stringify(msg.feature_overview)
              : '',
            questions: msg.chat?.questions || [],
            ...(isUser ? {} : { progress: msg.chat?.progress }),
            isWarning: false,
            isError: false,
          }
        }
      )

      setMessages(convertedMessages)
    } catch (error) {
      console.error('Error loading session history:', error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content:
          'Failed to load session history. Please check your connection and try again.',
        isUser: false,
        markdown: '',
        isError: true,
      }
      setMessages([errorMessage])
    } finally {
      setIsLoading(false)
    }
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

      if (!response.data) {
        // Handle API response error
        const isInternalError = response.error?.type === 'internal_server_error'
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          content: response.error?.message || 'An unexpected error occurred',
          isUser: false,
          markdown: '',
          isError: isInternalError,
          isWarning: !isInternalError,
        }
        setMessages((prev) => [...prev, errorMessage])
        return
      }

      const newSessionId = response.data.session_id
      setSessionId(newSessionId)

      // Add new session to the list if it doesn't exist
      if (newSessionId && !sessions.some((s) => s.id === newSessionId)) {
        setSessions((prev) => [
          ...prev,
          {
            id: newSessionId,
            title: response.data.title,
            created_at: response.data.created_at,
            updated_at: response.data.updated_at,
          },
        ])
      } else if (newSessionId) {
        // Update the existing session's updated_at timestamp, newest interactions on top
        setSessions((prev) =>
          prev.map((session) =>
            session.id === newSessionId
              ? { ...session, updated_at: response.data.updated_at }
              : session
          )
        )
      }

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: response.data.chat.response,
        isUser: false,
        markdown: JSON.stringify(response.data.feature_overview),
        questions: response.data.chat.questions,
        progress: response.data.chat.progress,
        isWarning: false,
        isError: false,
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      // Handle service/connectivity errors with error bubble
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content:
          "Sorry, I'm having trouble connecting to the service. Please try again later.",
        isUser: false,
        markdown: '',
        isError: true,
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-base-200">
      <div className="flex-1 flex min-h-0">
        <ChatSidebar
          sessions={sessions}
          onNewChat={handleNewChat}
          onSessionClick={handleSessionClick}
          activeSessionId={sessionId}
        />
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
