import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi'
import { agencyService, type WebsiteContentBlock } from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import toast from 'react-hot-toast'

export default function WebsiteContentManagePage() {
  const [blocks, setBlocks] = useState<WebsiteContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<WebsiteContentBlock | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState({
    sectionKey: '',
    title: '',
    subtitle: '',
    content: '',
    ctaText: '',
    ctaLink: '',
    imageUrl: '',
    isPublished: true,
  })

  const fetchBlocks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminContent()
      setBlocks(res.data.data)
    } catch {
      toast.error('Failed to load website content blocks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBlocks()
  }, [fetchBlocks])

  const openCreate = () => {
    setForm({ sectionKey: '', title: '', subtitle: '', content: '', ctaText: '', ctaLink: '', imageUrl: '', isPublished: true })
    setModalOpen(true)
  }

  const openEdit = (b: WebsiteContentBlock) => {
    setForm({
      sectionKey: b.sectionKey,
      title: b.title,
      subtitle: b.subtitle || '',
      content: b.content || '',
      ctaText: b.ctaText || '',
      ctaLink: b.ctaLink || '',
      imageUrl: b.imageUrl || '',
      isPublished: b.isPublished,
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await agencyService.upsertContentBlock(form)
      toast.success('Content block saved')
      setModalOpen(false)
      fetchBlocks()
    } catch {
      toast.error('Failed to save content block')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteContentBlock(deleteTarget.id)
      toast.success('Content block deleted')
      setDeleteTarget(null)
      fetchBlocks()
    } catch {
      toast.error('Failed to delete content block')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Website Content</h1>
          <p className="text-sm text-dark-muted mt-1">
            Manage dynamic headlines, disclaimers, banners, and call-to-action blocks across the public website.
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
          <HiPlus className="w-4 h-4" /> Add Content Block
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">Loading...</div>
        ) : (
          blocks.map((b) => (
            <div key={b.id} className="glass-card-dark rounded-2xl border border-dark-border p-5 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-secondary-500/20 text-secondary-300">
                  {b.sectionKey}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.isPublished ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                  {b.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <h3 className="font-display font-bold text-white">{b.title}</h3>
              {b.subtitle && <p className="text-xs text-secondary-300">{b.subtitle}</p>}
              {b.content && <p className="text-xs text-dark-muted line-clamp-3">{b.content}</p>}
              <div className="flex justify-end gap-2 pt-2 border-t border-dark-border/60">
                <button onClick={() => openEdit(b)} className="px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white flex items-center gap-1">
                  <HiPencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteTarget(b)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs flex items-center gap-1">
                  <HiTrash className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit Website Content Block" size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Section Key *</label>
              <input type="text" required value={form.sectionKey} onChange={(e) => setForm({ ...form, sectionKey: e.target.value })} placeholder="e.g. agency_hero" className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Title *</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Subtitle</label>
            <input type="text" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Content</label>
            <textarea rows={4} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="input" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">CTA Button Text</label>
              <input type="text" value={form.ctaText} onChange={(e) => setForm({ ...form, ctaText: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">CTA Link</label>
              <input type="text" value={form.ctaLink} onChange={(e) => setForm({ ...form, ctaLink: e.target.value })} className="input" />
            </div>
          </div>
          <MediaUploader label="Section Image (Optional)" value={form.imageUrl} onChange={(imageUrl) => setForm({ ...form, imageUrl })} />
          <label className="flex items-center gap-2 text-xs font-semibold text-white">
            <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Published
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">{saving ? 'Saving...' : 'Save Block'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Content Block"
        message={`Delete "${deleteTarget?.sectionKey}"?`}
        isLoading={deleting}
      />
    </div>
  )
}
