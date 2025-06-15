interface ChatResponse {
  session_id: string | null;
  response: string;
}

export const mockApi = {
  async processFeature(feature: string): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      session_id: crypto.randomUUID(),
      response: `I understand you want to implement: "${feature}". Let me help you with that. What specific requirements or constraints do you have in mind?`
    };
  }
}; 