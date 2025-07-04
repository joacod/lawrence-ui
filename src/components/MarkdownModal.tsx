import { FeatureOverview } from '../models/chat'

interface MarkdownModalProps {
  isOpen: boolean
  onClose: () => void
  markdown: string
}

export function MarkdownModal({
  isOpen,
  onClose,
  markdown,
}: MarkdownModalProps) {
  if (!isOpen) return null

  let featureOverview: FeatureOverview | null = null
  try {
    featureOverview = JSON.parse(markdown)
  } catch (error) {
    // Fallback to displaying raw markdown if parsing fails
    console.warn('Failed to parse feature overview JSON:', error)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
      <input
        type="checkbox"
        id="markdown_modal"
        className="modal-toggle"
        checked={isOpen}
        onChange={onClose}
      />
      <div className="modal modal-open modal-bottom sm:modal-middle h-screen">
        <div className="modal-box !max-w-[95%] md:!max-w-[90%] lg:!max-w-[85%] w-full !h-[95vh] overflow-y-auto flex flex-col">
          <header className="font-bold text-lg mb-4 border-b pb-4">
            Feature Overview
          </header>
          <div id="modal-content" className="py-4 flex-1 flex flex-col">
            {featureOverview ? (
              <>
                <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                  <section>
                    <h4 className="font-semibold text-base mb-2">Description</h4>
                    <p className="text-sm leading-relaxed">
                      {featureOverview.description}
                    </p>
                  </section>

                  <section>
                    <h4 className="font-semibold text-base mb-2">
                      Acceptance Criteria
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm">
                      {featureOverview.acceptance_criteria.map(
                        (criteria, index) => (
                          <li key={index} className="leading-relaxed">
                            {criteria}
                          </li>
                        )
                      )}
                    </ul>
                  </section>
                </div>
                <section className="mt-6">
                  <h4 className="font-semibold text-base mb-2">Progress</h4>
                  <div className="flex items-center gap-2">
                    <progress
                      className="progress progress-primary w-full"
                      value={featureOverview.progress_percentage}
                      max="100"
                    ></progress>
                    <span className="text-sm font-medium">
                      {featureOverview.progress_percentage}%
                    </span>
                  </div>
                </section>
              </>
            ) : (
              <div className="text-center text-sm text-gray-500 py-8">
                No feature overview available.
              </div>
            )}
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
          htmlFor="markdown_modal"
          onClick={onClose}
        >
          Close
        </label>
      </div>
    </div>
  )
}
