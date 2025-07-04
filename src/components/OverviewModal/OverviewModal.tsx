import { FeatureOverview } from '../../models/chat'
import { FeatureTabs } from './FeatureTabs'

interface OverviewModalProps {
  isOpen: boolean
  onClose: () => void
  overview: string
}

export function OverviewModal({
  isOpen,
  onClose,
  overview,
}: OverviewModalProps) {
  if (!isOpen) return null

  let featureOverview: FeatureOverview | null = null
  let backendTickets: any[] = []
  let frontendTickets: any[] = []
  try {
    const parsed = JSON.parse(overview)
    if (parsed && (parsed.feature_overview || parsed.tickets)) {
      featureOverview = parsed.feature_overview || null
      backendTickets = parsed.tickets?.backend || []
      frontendTickets = parsed.tickets?.frontend || []
    } else {
      featureOverview = parsed
    }
  } catch (error) {
    console.warn('Failed to parse feature overview JSON:', error)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      <input
        type="checkbox"
        id="overview_modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <div className="modal modal-open modal-bottom sm:modal-middle h-screen">
        <div className="modal-box !max-w-[95%] md:!max-w-[90%] lg:!max-w-[85%] w-full !h-[95vh] flex flex-col">
          <header className="font-bold text-lg mb-4 border-b pb-4">
            Feature Overview
          </header>
          <div className="flex-1 min-h-0 overflow-y-auto">
            <FeatureTabs
              featureOverview={featureOverview}
              backendTickets={backendTickets}
              frontendTickets={frontendTickets}
            />
          </div>
          <footer className="modal-action border-t pt-4 mt-4">
            <form method="dialog">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </form>
          </footer>
        </div>
        <label
          className="modal-backdrop"
          htmlFor="overview_modal"
          onClick={onClose}
        >
          Close
        </label>
      </div>
    </div>
  )
}
