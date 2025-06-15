import { h } from 'preact'
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
    <div className={`relative flex flex-col h-full border-r border-base-300 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 btn btn-circle btn-sm bg-base-100 border border-base-300 hover:bg-base-200 z-10"
      >
        {isCollapsed ? '→' : '←'}
      </button>

      <div className="flex-none bg-base-100 p-4">
        <button
          onClick={onNewChat}
          className={`btn btn-primary ${isCollapsed ? 'btn-circle' : 'w-full'}`}
          title={isCollapsed ? 'New Feature' : undefined}
        >
          {isCollapsed ? '+' : 'New Feature'}
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
            {isCollapsed ? session.id.slice(0, 1) : session.id}
          </div>
        ))}
      </div>
    </div>
  )
} 