import { useEffect, useState } from 'react'
import { agencyService, type CompanyProfile } from '@/services/agency.service'
import MediaUploader from '@/components/admin/MediaUploader'
import StringListEditor from '@/components/admin/StringListEditor'
import toast from 'react-hot-toast'

export default function CompanyProfileManagePage() {
  const [form, setForm] = useState<Partial<CompanyProfile>>({
    companyName: 'Ryoit Digital Marketing Agency',
    tagline: 'Learn. Repair. Market.',
    description: '',
    mission: '',
    vision: '',
    coreValues: [],
    logo: '',
    bannerImage: '',
    heroImages: [],
    websiteUrl: 'https://ryoit.com',
    email: '',
    phone: '',
    whatsapp: '',
    telegram: '',
    location: '',
    openingHours: '',
    socialLinks: {},
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    agencyService
      .getCompanyProfile()
      .then((res) => {
        const p = res.data.data
        setForm({
          ...p,
          coreValues: p.coreValues || [],
          heroImages: p.heroImages || [],
          socialLinks: p.socialLinks || {},
        })
      })
      .catch(() => toast.error('Failed to load company profile'))
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await agencyService.updateCompanyProfile(form)
      setForm({
        ...res.data.data,
        coreValues: res.data.data.coreValues || [],
        heroImages: res.data.data.heroImages || [],
        socialLinks: res.data.data.socialLinks || {},
      })
      toast.success('Company profile updated!')
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save company profile')
    } finally {
      setSaving(false)
    }
  }

  const updateSocial = (key: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: { ...(prev.socialLinks || {}), [key]: value },
    }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 rounded-full border-2 border-secondary-500/30 border-t-secondary-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">Company Profile</h1>
        <p className="text-sm text-dark-muted mt-1">
          Manage Ryoit Digital Marketing Agency branding, mission, contact channels, and social accounts.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="glass-card-dark rounded-2xl border border-dark-border p-6 space-y-4">
          <h2 className="font-display font-bold text-base text-white">Core Identity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">
                Company Name
              </label>
              <input
                type="text"
                required
                value={form.companyName || ''}
                onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">
                Brand Tagline
              </label>
              <input
                type="text"
                required
                value={form.tagline || ''}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">
              Company Description
            </label>
            <textarea
              rows={5}
              required
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">
                Mission
              </label>
              <textarea
                rows={3}
                value={form.mission || ''}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
                className="input resize-y"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">
                Vision
              </label>
              <textarea
                rows={3}
                value={form.vision || ''}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="input resize-y"
              />
            </div>
          </div>

          <StringListEditor
            label="Core Values"
            items={form.coreValues || []}
            onChange={(coreValues) => setForm({ ...form, coreValues })}
            placeholder="e.g. Transparency & Policy Compliance"
          />
        </div>

        <div className="glass-card-dark rounded-2xl border border-dark-border p-6 space-y-4">
          <h2 className="font-display font-bold text-base text-white">Media &amp; Banners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MediaUploader
              label="Company Logo"
              value={form.logo || ''}
              onChange={(logo) => setForm({ ...form, logo })}
            />
            <MediaUploader
              label="Company Banner Image"
              value={form.bannerImage || ''}
              onChange={(bannerImage) => setForm({ ...form, bannerImage })}
            />
          </div>
          <StringListEditor
            label="Additional Company Image URLs"
            items={form.heroImages || []}
            onChange={(heroImages) => setForm({ ...form, heroImages })}
            placeholder="https://..."
          />
        </div>

        <div className="glass-card-dark rounded-2xl border border-dark-border p-6 space-y-4">
          <h2 className="font-display font-bold text-base text-white">Contact &amp; Business Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">Website URL</label>
              <input type="text" value={form.websiteUrl || ''} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">Company Email</label>
              <input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">Phone</label>
              <input type="text" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">WhatsApp</label>
              <input type="text" value={form.whatsapp || ''} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">Telegram</label>
              <input type="text" value={form.telegram || ''} onChange={(e) => setForm({ ...form, telegram: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">Location</label>
              <input type="text" value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} className="input" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">Business Opening Hours</label>
            <input type="text" value={form.openingHours || ''} onChange={(e) => setForm({ ...form, openingHours: e.target.value })} className="input" />
          </div>
        </div>

        <div className="glass-card-dark rounded-2xl border border-dark-border p-6 space-y-4">
          <h2 className="font-display font-bold text-base text-white">Social Media Accounts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['facebook', 'instagram', 'tiktok', 'youtube', 'telegram', 'twitter', 'linkedin'].map((net) => (
              <div key={net}>
                <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase tracking-wider">{net}</label>
                <input
                  type="text"
                  value={form.socialLinks?.[net] || ''}
                  onChange={(e) => updateSocial(net, e.target.value)}
                  placeholder={`https://${net}.com/...`}
                  className="input text-xs"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" disabled={saving} className="btn-primary btn-md px-8">
            {saving ? 'Saving Profile...' : 'Save Company Profile'}
          </button>
        </div>
      </form>
    </div>
  )
}

