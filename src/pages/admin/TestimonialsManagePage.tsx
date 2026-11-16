import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiPencil, HiTrash, HiStar } from 'react-icons/hi'
import { agencyService, type PublishStatus, type Testimonial } from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import toast from 'react-hot-toast'

export default function TestimonialsManagePage() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState<{
    clientName: string
    clientRole: string
    companyName: string
    avatar: string
    content: string
    rating: number
    isFeatured: boolean
    status: PublishStatus
  }>({
    clientName: '',
    clientRole: '',
    companyName: '',
    avatar: '',
    content: '',
    rating: 5,
    isFeatured: false,
    status: 'PUBLISHED',
  })

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminTestimonials()
      setItems(res.data.data)
    } catch {
      toast.error('Failed to load testimonials')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const openCreate = () => {
    setEditing(null)
    setForm({ clientName: '', clientRole: '', companyName: '', avatar: '', content: '', rating: 5, isFeatured: false, status: 'PUBLISHED' })
    setModalOpen(true)
  }

  const openEdit = (t: Testimonial) => {
    setEditing(t)
    setForm({
      clientName: t.clientName,
      clientRole: t.clientRole || '',
      companyName: t.companyName || '',
      avatar: t.avatar || '',
      content: t.content,
      rating: t.rating,
      isFeatured: t.isFeatured,
      status: t.status,
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await agencyService.updateTestimonial(editing.id, form)
        toast.success('Testimonial updated')
      } else {
        await agencyService.createTestimonial(form)
        toast.success('Testimonial created')
      }
      setModalOpen(false)
      fetchItems()
    } catch {
      toast.error('Failed to save testimonial')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteTestimonial(deleteTarget.id)
      toast.success('Testimonial deleted')
      setDeleteTarget(null)
      fetchItems()
    } catch {
      toast.error('Failed to delete testimonial')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Testimonials</h1>
          <p className="text-sm text-dark-muted mt-1">Manage verified client reviews and feedback.</p>
        </div>
        <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
          <HiPlus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">Loading...</div>
        ) : items.length === 0 ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">No testimonials added yet.</div>
        ) : (
          items.map((t) => (
            <div key={t.id} className="glass-card-dark rounded-2xl border border-dark-border p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => <HiStar key={i} className="w-4 h-4" />)}
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${t.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                  {t.status}
                </span>
              </div>
              <p className="text-xs text-dark-muted flex-1">&ldquo;{t.content}&rdquo;</p>
              <div>
                <p className="text-sm font-bold text-white">{t.clientName}</p>
                {(t.clientRole || t.companyName) && (
                  <p className="text-[11px] text-dark-muted">{[t.clientRole, t.companyName].filter(Boolean).join(' • ')}</p>
                )}
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-dark-border/60">
                <button onClick={() => openEdit(t)} className="px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white flex items-center gap-1">
                  <HiPencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button onClick={() => setDeleteTarget(t)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs flex items-center gap-1">
                  <HiTrash className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Client Name *</label>
              <input type="text" required value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Role / Title</label>
              <input type="text" value={form.clientRole} onChange={(e) => setForm({ ...form, clientRole: e.target.value })} className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Company / Channel</label>
              <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Rating (1-5)</label>
              <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="input" />
            </div>
          </div>
          <MediaUploader label="Client Avatar" value={form.avatar} onChange={(avatar) => setForm({ ...form, avatar })} />
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Review Content *</label>
            <textarea rows={4} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="input" />
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-white">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured
            </label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PublishStatus })} className="input text-xs w-32 py-1">
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">{saving ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Testimonial"
        message={`Delete testimonial from "${deleteTarget?.clientName}"?`}
        isLoading={deleting}
      />
    </div>
  )
}
