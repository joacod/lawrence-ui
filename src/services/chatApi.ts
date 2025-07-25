import { ApiResponse } from '../models/api'
import {
  ChatResponseData,
  HealthResponseData,
  SessionHistoryData,
} from '../models/chat'

const API_URL = 'http://0.0.0.0:8000'

export const chatApi = {
  async processFeature(
    feature: string,
    sessionId: string | null = null
  ): Promise<ApiResponse<ChatResponseData>> {
    const response = await fetch(`${API_URL}/process_feature`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feature, session_id: sessionId }),
    })

    const data = await response.json()

    // Handle different status codes
    switch (response.status) {
      case 200:
        // Success - return the data as-is
        return data
      case 400:
        // Bad Request (security_rejection, context_deviation) - return as warning
        return {
          data: null,
          error: {
            type: data.error?.type || 'security_rejection',
            message: data.error?.message || 'Invalid request',
          },
        }
      case 500:
        // Internal Server Error - return as error
        return {
          data: null,
          error: {
            type: 'internal_server_error',
            message: data.error?.message || 'Internal server error',
          },
        }
      case 503:
        // Service Unavailable (internal_server_error) - return as error
        return {
          data: null,
          error: {
            type: 'internal_server_error',
            message: data.error?.message || 'Service temporarily unavailable',
          },
        }
      default:
        // Any other status code - throw for connectivity issues
        throw new Error('Failed to process feature')
    }
  },

  async checkHealth(): Promise<ApiResponse<HealthResponseData>> {
    const response = await fetch(`${API_URL}/health`)

    if (!response.ok) {
      throw new Error('Health check failed')
    }

    return response.json()
  },

  async getSessionHistory(
    sessionId: string
  ): Promise<ApiResponse<SessionHistoryData[]>> {
    const response = await fetch(`${API_URL}/session/${sessionId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch session history')
    }

    return response.json()
  },

  async getSessions(): Promise<
    { id: string; title: string; created_at: string; updated_at: string }[]
  > {
    const response = await fetch(`${API_URL}/sessions`)
    if (!response.ok) {
      throw new Error('Failed to fetch sessions')
    }
    const data = await response.json()

    return data.map((session: any) => ({
      id: session.session_id,
      title: session.title,
      created_at: session.created_at || '',
      updated_at: session.updated_at,
    }))
  },
}
