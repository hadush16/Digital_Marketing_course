import { useState } from 'react'
import { HiPlus, HiX } from 'react-icons/hi'

interface StringListEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}

export default function StringListEditor({
  label,
  items,
  onChange,
  placeholder = 'Add item...',
}: StringListEditorProps) {
  const [draft, setDraft] = useState('')

  const addItem = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    onChange([...items, trimmed])
    setDraft('')
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-dark-muted uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addItem()
            }
          }}
          placeholder={placeholder}
          className="input flex-1 text-xs"
        />
        <button
          type="button"
          onClick={addItem}
          className="px-3 py-2 rounded-xl bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 hover:bg-secondary-500/30 text-xs font-semibold flex items-center gap-1"
        >
          <HiPlus className="w-4 h-4" /> Add
        </button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {items.map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-bg border border-dark-border text-xs text-white"
            >
              {item}
              <button
                type="button"
                onClick={() => onChange(items.filter((_, i) => i !== idx))}
                className="text-dark-muted hover:text-red-400"
              >
                <HiX className="w-3.5 h-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

