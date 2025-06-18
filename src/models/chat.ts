export interface Message {
  id: string
  content: string
  isUser: boolean
  markdown: string
  questions?: string[]
}

export interface Session {
  id: string
  title: string
  created_at: string
  updated_at: string
}

export interface ChatResponse {
  session_id: string | null
  title: string
  created_at: string
  updated_at: string
  response: string
  markdown: string
  questions?: string[]
}

export interface HealthResponse {
  status: string
  service: string
}
