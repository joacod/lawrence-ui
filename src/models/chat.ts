export interface Message {
  id: string
  content: string
  isUser: boolean
  markdown: string
  questions?: string[]
  isWarning?: boolean
  isError?: boolean
}

export interface Session {
  id: string
  title: string
  created_at: string
  updated_at: string
}

export interface ChatResponseData {
  session_id: string | null
  title: string
  created_at: string
  updated_at: string
  response: string
  markdown: string
  questions?: string[]
}

export interface HealthResponseData {
  status: string
  message: string
}

export interface ConversationMessage {
  type: 'user' | 'assistant'
  content: string | null
  response: string | null
  markdown: string | null
  questions: string[]
  timestamp: string
}

export interface SessionHistoryData {
  session_id: string
  title: string
  created_at: string
  updated_at: string
  conversation: ConversationMessage[]
}
