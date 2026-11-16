import { useEffect, useState } from 'react'
import { agencyService } from '@/services/agency.service'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Ryoit Digital Marketing Agency')
  const [siteDesc, setSiteDesc] = useState('Learn. Repair. Market. — Digital Marketing, Creator Monetization & Mobile Solutions.')
  const [supportEmail, setSupportEmail] = useState('hadushmobilesoftware@gmail.com')
  const [defaultCurrency, setDefaultCurrency] = useState('ETB')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    agencyService
      .getSettings()
      .then((res) => {
        const map = res.data.data || {}
        if (map.siteName) setSiteName(map.siteName)
        if (map.siteDesc) setSiteDesc(map.siteDesc)
        if (map.supportEmail) setSupportEmail(map.supportEmail)
        if (map.defaultCurrency) setDefaultCurrency(map.defaultCurrency)
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await agencyService.updateSettings({
        siteName,
        siteDesc,
        supportEmail,
        defaultCurrency,
      })
      toast.success('Platform settings saved to database!')
    } catch {
      toast.error('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">Platform Settings</h1>
        <p className="text-sm text-dark-muted mt-1">Configure global branding variables, metadata, and defaults.</p>
      </div>

      <div className="glass-card-dark rounded-2xl border border-dark-border p-6 shadow-lg">
        {loading ? (
          <div className="py-12 text-center text-xs text-dark-muted">Loading settings...</div>
        ) : (
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-2 uppercase tracking-wider">
                  Support Email
                </label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-2 uppercase tracking-wider">
                  Default Display Currency
                </label>
                <input
                  type="text"
                  value={defaultCurrency}
                  onChange={(e) => setDefaultCurrency(e.target.value.toUpperCase())}
                  className="input"
                />
              </div>
            </div>

            <button type="submit" disabled={saving} className="btn-primary btn-md w-full">
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
