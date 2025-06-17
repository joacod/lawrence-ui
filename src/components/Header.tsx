import { useLocation } from 'preact-iso'
import { useState } from 'preact/hooks'
import { HealthcheckModal } from './HealthcheckModal'

export function Header() {
  const { url } = useLocation()
  const [isHealthcheckOpen, setIsHealthcheckOpen] = useState(false)

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-sm sticky top-0 z-50">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          Lawrence AI
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button
              className="btn btn-primary"
              onClick={() => setIsHealthcheckOpen(true)}
            >
              Healthcheck
            </button>
          </li>
        </ul>
      </div>
      <HealthcheckModal
        isOpen={isHealthcheckOpen}
        onClose={() => setIsHealthcheckOpen(false)}
      />
    </div>
  )
}
