interface ChatResponse {
  session_id: string | null
  response: string
}

interface HealthResponse {
  status: string
  service: string
}

const API_URL = 'http://0.0.0.0:8000'

export const chatApi = {
  async processFeature(feature: string): Promise<ChatResponse> {
    const response = await fetch(`${API_URL}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feature }),
    })

    if (!response.ok) {
      throw new Error('Failed to process feature')
    }

    return response.json()
  },

  async checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${API_URL}/health`)

    if (!response.ok) {
      throw new Error('Health check failed')
    }

    return response.json()
  },
}
