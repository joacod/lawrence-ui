interface ChatInputProps {
  input: string
  isLoading: boolean
  onInputChange: (value: string) => void
  onSend: () => void
}

export function ChatInput({ input, isLoading, onInputChange, onSend }: ChatInputProps) {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div id="chat-input" className="sticky bottom-0 p-4 bg-base-100 border-t border-base-300">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-2 items-center">
          <textarea
            className="textarea textarea-bordered flex-1"
            placeholder="Type your message..."
            value={input}
            onInput={(e) => onInputChange((e.target as HTMLTextAreaElement).value)}
            onKeyPress={handleKeyPress}
            rows={1}
          />
          <button
            className="btn btn-primary"
            onClick={onSend}
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
} 