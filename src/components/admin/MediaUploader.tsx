import { useRef, useState } from 'react'
import { HiUpload, HiX } from 'react-icons/hi'
import { agencyService } from '@/services/agency.service'
import toast from 'react-hot-toast'

interface MediaUploaderProps {
  label: string
  value: string
  onChange: (url: string) => void
  accept?: string
  allowVideo?: boolean
  placeholder?: string
}

export default function MediaUploader({
  label,
  value,
  onChange,
  accept = 'image/*',
  allowVideo = false,
  placeholder = 'https://... or upload a file',
}: MediaUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const res = allowVideo
        ? await agencyService.uploadMedia(file)
        : await agencyService.uploadImage(file)
      onChange(res.data.data.url)
      toast.success('Uploaded successfully')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-dark-muted uppercase tracking-wider">
        {label}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input flex-1 text-xs"
        />
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFile}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-3 py-2 rounded-xl bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 hover:bg-secondary-500/30 text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors"
        >
          <HiUpload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20"
            title="Clear"
          >
            <HiX className="w-4 h-4" />
          </button>
        )}
      </div>
      {value && !allowVideo && (
        <img
          src={value}
          alt={label}
          className="h-16 w-auto rounded-lg object-cover border border-dark-border mt-1"
          onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
        />
      )}
    </div>
  )
}

