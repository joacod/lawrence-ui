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
    <>
      <input type="checkbox" id="healthcheck_modal" className="modal-toggle" checked={isOpen} onChange={onClose} />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Service Health Status</h3>
          <div className="py-4">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="inline-grid *:[grid-area:1/1]">
                    <div className="status status-info animate-ping"></div>
                    <div className="status status-info"></div>
                  </div>
                  <span className="font-semibold">Status:</span>
                  <span className="badge badge-info">
                    checking{' '}
                    <span className="loading loading-bars loading-sm ml-1"></span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Message:</span>
                  <span className="badge badge-info">
                    Checking service health...
                  </span>
                </div>
              </div>
            ) : error ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="inline-grid *:[grid-area:1/1]">
                    <div className="status status-error animate-ping"></div>
                    <div className="status status-error"></div>
                  </div>
                  <span className="font-semibold">Status:</span>
                  <span className="badge badge-error">error</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Message:</span>
                  <span className="badge badge-error">{error}</span>
                </div>
              </div>
            ) : (
              healthStatus && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="inline-grid *:[grid-area:1/1]">
                      <div
                        className={`status ${
                          healthStatus.status === 'healthy'
                            ? 'status-success'
                            : 'status-error'
                        } animate-ping`}
                      ></div>
                      <div
                        className={`status ${
                          healthStatus.status === 'healthy'
                            ? 'status-success'
                            : 'status-error'
                        }`}
                      ></div>
                    </div>
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`badge ${
                        healthStatus.status === 'healthy'
                          ? 'badge-success'
                          : 'badge-error'
                      }`}
                    >
                      {healthStatus.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Service:</span>
                    <span className="badge badge-info">
                      {healthStatus.service}
                    </span>
                  </div>
                </div>
              )
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
        <label className="modal-backdrop" htmlFor="healthcheck_modal" onClick={onClose}>Close</label>
      </div>
    </>
  )
}
