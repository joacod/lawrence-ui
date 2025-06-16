import { useEffect } from 'preact/hooks'

interface MarkdownModalProps {
  isOpen: boolean
  onClose: () => void
  markdown: string
}

export function MarkdownModal({ isOpen, onClose, markdown }: MarkdownModalProps) {
  if (!isOpen) return null

  return (
    <>
      <input type="checkbox" id="markdown_modal" className="modal-toggle" checked={isOpen} onChange={onClose} />
      <div className="modal modal-bottom sm:modal-middle" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Markdown Content</h3>
          <div className="py-4">
            <pre className="whitespace-pre-wrap bg-base-200 p-4 rounded-lg overflow-x-auto">
              {markdown}
            </pre>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </form>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="markdown_modal" onClick={onClose}>Close</label>
      </div>
    </>
  )
} 