import { useState, useEffect } from 'preact/hooks'
import { chatApi } from '../services/chatApi'

interface HealthcheckModalProps {
  isOpen: boolean
  onClose: () => void
}

interface HealthStatus {
  status: string
  service: string
}

export function HealthcheckModal({ isOpen, onClose }: HealthcheckModalProps) {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await chatApi.checkHealth()
      setHealthStatus(data)
    } catch (error) {
      setError('Failed to check service health')
      setHealthStatus(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      checkHealth()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <dialog className="modal modal-bottom sm:modal-middle" open={isOpen}>
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">Service Health Status</h3>
        <div className="py-4">
          {isLoading ? (
            <div className="flex flex-col items-center gap-2">
              <span className="loading loading-spinner loading-lg"></span>
              <p>Checking service health...</p>
            </div>
          ) : error ? (
            <div className="alert alert-error">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          ) : healthStatus && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${healthStatus.status === 'healthy' ? 'bg-success' : 'bg-error'}`}></div>
                <span className="font-semibold">Status:</span>
                <span className={`badge ${healthStatus.status === 'healthy' ? 'badge-success' : 'badge-error'}`}>
                  {healthStatus.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Service:</span>
                <span className="badge badge-info">{healthStatus.service}</span>
              </div>
            </div>
          )}
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  )
}
