export interface Question {
  question: string
  status: string
  user_answer: string | null
}

export interface Message {
  id: string
  content: string
  isUser: boolean
  markdown: string
  questions?: Question[]
  isWarning?: boolean
  isError?: boolean
}

export interface Session {
  id: string
  title: string
  created_at: string
  updated_at: string
}

export interface FeatureOverview {
  description: string
  acceptance_criteria: string[]
  progress_percentage: number
}

export interface ChatData {
  response: string
  questions: Question[]
  suggestions: string[] | null
  progress: {
    answered_questions: number
    total_questions: number
  }
}

export interface ChatResponseData {
  session_id: string | null
  title: string
  created_at: string
  updated_at: string
  chat: ChatData
  feature_overview: FeatureOverview
  tickets?: {
    backend: Ticket[]
    frontend: Ticket[]
  }
}

export interface Ticket {
  title: string
  description: string
  technical_details: string | null
  acceptance_criteria: string[] | null
  cursor_prompt: string | null
}

export interface HealthResponseData {
  status: string
  message: string
}

export interface ConversationMessage {
  type: 'user' | 'assistant'
  content: string | null
  timestamp: string
  chat: ChatData | null
  feature_overview: FeatureOverview | null
  tickets: {
    backend: Ticket[]
    frontend: Ticket[]
  } | null
}

export interface SessionHistoryData {
  session_id: string
  title: string
  created_at: string
  updated_at: string
  conversation: ConversationMessage[]
}
