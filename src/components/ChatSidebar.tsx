import { useState } from 'preact/hooks'

interface ChatSidebarProps {
  sessions: { id: string }[]
  onNewChat: () => void
}

export function ChatSidebar({ sessions, onNewChat }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Sort sessions by ID (assuming newer sessions have higher IDs)
  const sortedSessions = [...sessions].sort((a, b) => b.id.localeCompare(a.id))

  return (
    <div
      className={`relative flex flex-col h-full transition-all duration-300 ${
        isCollapsed ? 'w-0' : 'w-64'
      }`}
    >
      <div
        className={`absolute right-0 top-0 bottom-0 w-[1px] bg-base-300 transition-opacity duration-300 ${
          isCollapsed ? 'opacity-0' : 'opacity-100'
        }`}
      />
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute left-4 top-4 btn btn-circle btn-sm bg-base-100 border border-base-300 hover:bg-base-200 z-10"
        >
          →
        </button>
      ) : (
        <>
          <button
            onClick={() => setIsCollapsed(true)}
            className="absolute -right-3 top-4 btn btn-circle btn-sm bg-base-100 border border-base-300 hover:bg-base-200 z-10"
          >
            ←
          </button>

          <div className="flex-none bg-base-100 p-4 pr-8">
            <button
              onClick={onNewChat}
              className="btn btn-primary w-full overflow-hidden"
            >
              <span className="whitespace-nowrap">New Feature</span>
            </button>
          </div>

          <div className="flex-none">
            <div className="divider mx-4" />
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {sortedSessions.map((session) => (
              <div
                key={session.id}
                className="px-4 py-2 hover:bg-base-200 cursor-pointer truncate"
                title={session.id}
              >
                {session.id}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
