import { useRef, useEffect, useState } from 'preact/hooks'
import { OverviewModal } from './OverviewModal/OverviewModal'
import { Message } from '../models/chat'
import { ClipboardIcon } from '../icons/Clipboard'
import { Questions } from './Questions'

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [selectedMarkdown, setSelectedMarkdown] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getBubbleClass = (message: Message) => {
    if (message.isUser) {
      return 'chat-bubble-secondary'
    }
    if (message.isError) {
      return 'chat-bubble-error'
    }
    if (message.isWarning) {
      return 'chat-bubble-warning'
    }
    return 'chat-bubble-accent'
  }

  return (
    <>
      <div id="chat-messages" className="flex-1 overflow-y-auto p-4 pt-20">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat ${message.isUser ? 'chat-end' : 'chat-start'}`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`chat-bubble ${getBubbleClass(
                      message
                    )} max-w-[80%]`}
                  >
                    {message.content}
                    {message.questions && message.questions.length > 0 && (
                      <Questions
                        questions={message.questions}
                        progress={message.progress}
                      />
                    )}
                  </div>
                  {!message.isUser && message.markdown && (
                    <button
                      className="btn btn-soft btn-sm"
                      onClick={() => setSelectedMarkdown(message.markdown)}
                    >
                      <ClipboardIcon />
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-accent">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      <OverviewModal
        isOpen={selectedMarkdown !== null}
        onClose={() => setSelectedMarkdown(null)}
        overview={selectedMarkdown || ''}
      />
    </>
  )
}
