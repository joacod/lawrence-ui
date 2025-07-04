interface TicketListProps {
  tickets: any[]
}

export function TicketList({ tickets }: TicketListProps) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        No tickets available.
      </div>
    )
  }
  return (
    <>
      {tickets.map((ticket, idx) => (
        <div
          key={idx}
          className={`mb-6 pb-4${
            idx !== tickets.length - 1 ? ' border-b' : ''
          }`}
        >
          <h5 className="font-semibold text-base mb-1">{ticket.title}</h5>
          <p className="text-sm mb-2">{ticket.description}</p>
          {ticket.technical_details && (
            <div className="text-xs text-gray-500 mb-1">
              <strong>Technical Details:</strong> {ticket.technical_details}
            </div>
          )}
          {ticket.acceptance_criteria &&
            ticket.acceptance_criteria.length > 0 && (
              <ul className="list-disc list-inside text-xs ml-4">
                {ticket.acceptance_criteria.map((ac: string, i: number) => (
                  <li key={i}>{ac}</li>
                ))}
              </ul>
            )}
        </div>
      ))}
    </>
  )
}
