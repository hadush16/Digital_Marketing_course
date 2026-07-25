import { useState } from 'react'

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Ryoit')
  const [siteDesc, setSiteDesc] = useState('Premium Learning & Marketplace Platform')
  const [success, setSuccess] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">Platform Settings</h1>
        <p className="text-sm text-dark-muted mt-1">Configure global branding variables, metadata, and controls.</p>
      </div>

      <div className="glass-card-dark rounded-2xl border border-dark-border p-6 shadow-lg">
        {success && (
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold mb-6">
            Settings saved successfully!
          </div>
        )}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-2 uppercase tracking-wider">
              Website Title
            </label>
            <input
              type="text"
              required
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="input"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-2 uppercase tracking-wider">
              Meta Description
            </label>
            <textarea
              rows={4}
              required
              value={siteDesc}
              onChange={(e) => setSiteDesc(e.target.value)}
              className="input h-24 resize-none"
            />
          </div>

          <button type="submit" className="btn-primary btn-md w-full">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  )
}
