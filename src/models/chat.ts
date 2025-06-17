export interface Message {
  id: string
  content: string
  isUser: boolean
  markdown: string
  questions?: string[]
}

export interface Session {
  id: string
}

export interface ChatResponse {
  session_id: string | null
  response: string
  markdown: string
  questions?: string[]
}

export interface HealthResponse {
  status: string
  service: string
}
