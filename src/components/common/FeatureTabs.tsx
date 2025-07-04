import { FeatureOverview } from '../../models/chat'

interface FeatureTabsProps {
  featureOverview: FeatureOverview | null
  backendTickets: any[]
  frontendTickets: any[]
}

export function FeatureTabs({
  featureOverview,
  backendTickets,
  frontendTickets,
}: FeatureTabsProps) {
  const hasBackend = backendTickets && backendTickets.length > 0
  const hasFrontend = frontendTickets && frontendTickets.length > 0
  const tabGroup = 'feature_overview_tabs'

  return (
    <div className="tabs tabs-border w-full mb-4">
      {/* Main Tab */}
      <input
        type="radio"
        name={tabGroup}
        className="tab"
        aria-label="Main"
        id="tab-main"
        defaultChecked
      />
      <div className="tab-content border-base-300 bg-base-100 p-4">
        <div className="max-h-[60vh] overflow-y-auto">
          {featureOverview ? (
            <>
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
                  {featureOverview.acceptance_criteria.map((criteria, index) => (
                    <li key={index} className="leading-relaxed">
                      {criteria}
                    </li>
                  ))}
                </ul>
              </section>
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
      </div>
      {/* Backend Tab */}
      {hasBackend && (
        <>
          <input
            type="radio"
            name={tabGroup}
            className="tab"
            aria-label="Backend Tickets"
            id="tab-backend"
          />
          <div className="tab-content border-base-300 bg-base-100 p-4">
            <div className="max-h-[60vh] overflow-y-auto">
              {backendTickets.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-8">
                  No backend tickets available.
                </div>
              ) : (
                backendTickets.map((ticket, idx) => (
                  <div key={idx} className="mb-6 border-b pb-4">
                    <h5 className="font-semibold text-base mb-1">
                      {ticket.title}
                    </h5>
                    <p className="text-sm mb-2">{ticket.description}</p>
                    {ticket.technical_details && (
                      <div className="text-xs text-gray-500 mb-1">
                        <strong>Technical Details:</strong>{' '}
                        {ticket.technical_details}
                      </div>
                    )}
                    {ticket.acceptance_criteria &&
                      ticket.acceptance_criteria.length > 0 && (
                        <ul className="list-disc list-inside text-xs ml-4">
                          {ticket.acceptance_criteria.map((ac, i) => (
                            <li key={i}>{ac}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
      {/* Frontend Tab */}
      {hasFrontend && (
        <>
          <input
            type="radio"
            name={tabGroup}
            className="tab"
            aria-label="Frontend Tickets"
            id="tab-frontend"
          />
          <div className="tab-content border-base-300 bg-base-100 p-4">
            <div className="max-h-[60vh] overflow-y-auto">
              {frontendTickets.length === 0 ? (
                <div className="text-center text-sm text-gray-500 py-8">
                  No frontend tickets available.
                </div>
              ) : (
                frontendTickets.map((ticket, idx) => (
                  <div key={idx} className="mb-6 border-b pb-4">
                    <h5 className="font-semibold text-base mb-1">
                      {ticket.title}
                    </h5>
                    <p className="text-sm mb-2">{ticket.description}</p>
                    {ticket.technical_details && (
                      <div className="text-xs text-gray-500 mb-1">
                        <strong>Technical Details:</strong>{' '}
                        {ticket.technical_details}
                      </div>
                    )}
                    {ticket.acceptance_criteria &&
                      ticket.acceptance_criteria.length > 0 && (
                        <ul className="list-disc list-inside text-xs ml-4">
                          {ticket.acceptance_criteria.map((ac, i) => (
                            <li key={i}>{ac}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
