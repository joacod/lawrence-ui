import { useState } from 'preact/hooks'
import { chatApi } from '../services/chatApi'

interface GenerateFeatureButtonProps {
  sessionId: string
}

export function GenerateFeatureButton({
  sessionId,
}: GenerateFeatureButtonProps) {
  const [generating, setGenerating] = useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      await chatApi.generateFeature(sessionId)
      // TODO: After generating feature, display the final feature/epic and tickets associated (redirect to a simplified kanban board)
    } catch (error) {
      // Optionally handle error
      console.error('Failed to generate feature:', error)
    } finally {
      setGenerating(false)
    }
  }

  return (
    <button
      className="btn btn-primary mt-4"
      onClick={handleGenerate}
      disabled={generating}
    >
      {generating ? 'Generating...' : 'Generate Feature'}
    </button>
  )
}
