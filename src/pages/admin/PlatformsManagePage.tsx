import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiPencil, HiTrash, HiSearch } from 'react-icons/hi'
import { agencyService, type SocialPlatform } from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import StringListEditor from '@/components/admin/StringListEditor'
import toast from 'react-hot-toast'

const EMPTY_PLATFORM: Partial<SocialPlatform> = {
  name: '',
  slug: '',
  logo: '',
  description: '',
  platformUrl: '',
  monetizationOptions: [],
  requirements: [],
  supportedCountries: [],
  faqs: [],
  displayOrder: 0,
  isActive: true,
  isPublished: true,
}

export default function PlatformsManagePage() {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<SocialPlatform | null>(null)
  const [form, setForm] = useState<Partial<SocialPlatform>>(EMPTY_PLATFORM)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<SocialPlatform | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchPlatforms = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminPlatforms({ search: search || undefined })
      setPlatforms(res.data.data)
    } catch {
      toast.error('Failed to load social platforms')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchPlatforms()
  }, [fetchPlatforms])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...EMPTY_PLATFORM, displayOrder: platforms.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (p: SocialPlatform) => {
    setEditing(p)
    setForm({
      ...p,
      monetizationOptions: p.monetizationOptions || [],
      requirements: p.requirements || [],
      supportedCountries: p.supportedCountries || [],
      faqs: p.faqs || [],
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, displayOrder: Number(form.displayOrder) || 0 }
      if (editing) {
        await agencyService.updatePlatform(editing.id, payload)
        toast.success('Platform updated')
      } else {
        await agencyService.createPlatform(payload)
        toast.success('Platform created')
      }
      setModalOpen(false)
      fetchPlatforms()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save platform')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deletePlatform(deleteTarget.id)
      toast.success('Platform deleted')
      setDeleteTarget(null)
      fetchPlatforms()
    } catch {
      toast.error('Failed to delete platform')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Social Media Platforms</h1>
          <p className="text-sm text-dark-muted mt-1">
            Manage Facebook, YouTube, TikTok, Instagram, Telegram, WhatsApp, X, LinkedIn, and custom platforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search platforms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 text-sm w-52"
            />
          </div>
          <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
            <HiPlus className="w-4 h-4" /> Add Platform
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">Loading platforms...</div>
        ) : platforms.length === 0 ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">No platforms found.</div>
        ) : (
          platforms.map((p) => (
            <div key={p.id} className="glass-card-dark rounded-2xl border border-dark-border p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-dark-border" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-secondary-500/20 text-secondary-300 flex items-center justify-center font-bold">
                      {p.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-display font-bold text-white">{p.name}</h3>
                    <span className="text-[11px] text-dark-muted">
                      {p._count?.services ?? 0} services • {p._count?.projects ?? 0} projects
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                  {p.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

              <p className="text-xs text-dark-muted line-clamp-2 flex-1">{p.description || 'No description'}</p>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-dark-border/60">
                <button onClick={() => openEdit(p)} className="px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white hover:border-secondary-500/40 flex items-center gap-1">
                  <HiPencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteTarget(p)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs hover:bg-red-500/20 flex items-center gap-1">
                  <HiTrash className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit Platform: ${editing.name}` : 'Add Social Media Platform'}
        size="xl"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Platform Name *</label>
              <input type="text" required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Platform URL</label>
              <input type="text" value={form.platformUrl || ''} onChange={(e) => setForm({ ...form, platformUrl: e.target.value })} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MediaUploader label="Platform Logo" value={form.logo || ''} onChange={(logo) => setForm({ ...form, logo })} />
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Display Order</label>
              <input type="number" value={form.displayOrder ?? 0} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} className="input" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Description</label>
            <textarea rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input resize-y" />
          </div>

          <StringListEditor
            label="Monetization Options"
            items={form.monetizationOptions || []}
            onChange={(monetizationOptions) => setForm({ ...form, monetizationOptions })}
            placeholder="e.g. In-Stream Ads, Stars..."
          />

          <StringListEditor
            label="Platform Requirements"
            items={form.requirements || []}
            onChange={(requirements) => setForm({ ...form, requirements })}
            placeholder="e.g. 1,000 subscribers..."
          />

          <StringListEditor
            label="Supported Countries / Regions"
            items={form.supportedCountries || []}
            onChange={(supportedCountries) => setForm({ ...form, supportedCountries })}
            placeholder="e.g. Ethiopia, Global..."
          />

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
              <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
              Active
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
              <input type="checkbox" checked={!!form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
              Published
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">
              {saving ? 'Saving...' : editing ? 'Update Platform' : 'Create Platform'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Social Platform"
        message={`Delete "${deleteTarget?.name}"? Associated services will remain but lose their platform link.`}
        isLoading={deleting}
      />
    </div>
  )
}
