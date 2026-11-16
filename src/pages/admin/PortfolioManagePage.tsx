import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiSearch, HiPencil, HiTrash } from 'react-icons/hi'
import {
  agencyService,
  type PortfolioProject,
  type PublishStatus,
  type ServiceCategory,
  type SocialPlatform,
} from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import StringListEditor from '@/components/admin/StringListEditor'
import toast from 'react-hot-toast'

export default function PortfolioManagePage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<PortfolioProject | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<PortfolioProject | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState<{
    title: string
    clientName: string
    platformId: string
    categoryId: string
    description: string
    workPerformed: string
    beforeImage: string
    afterImage: string
    screenshots: string[]
    videos: string[]
    resultsAnalytics: Array<{ label: string; value: string }>
    completionDate: string
    projectUrl: string
    isFeatured: boolean
    status: PublishStatus
    displayOrder: number
  }>({
    title: '',
    clientName: '',
    platformId: '',
    categoryId: '',
    description: '',
    workPerformed: '',
    beforeImage: '',
    afterImage: '',
    screenshots: [],
    videos: [],
    resultsAnalytics: [],
    completionDate: '',
    projectUrl: '',
    isFeatured: false,
    status: 'PUBLISHED',
    displayOrder: 0,
  })

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [projRes, platRes, catRes] = await Promise.all([
        agencyService.getAdminPortfolio({ search: search || undefined }),
        agencyService.getAdminPlatforms(),
        agencyService.getAdminCategories(),
      ])
      setProjects(projRes.data.data)
      setPlatforms(platRes.data.data)
      setCategories(catRes.data.data)
    } catch {
      toast.error('Failed to load portfolio projects')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openCreate = () => {
    setEditing(null)
    setForm({
      title: '',
      clientName: '',
      platformId: '',
      categoryId: '',
      description: '',
      workPerformed: '',
      beforeImage: '',
      afterImage: '',
      screenshots: [],
      videos: [],
      resultsAnalytics: [],
      completionDate: '',
      projectUrl: '',
      isFeatured: false,
      status: 'PUBLISHED',
      displayOrder: projects.length + 1,
    })
    setModalOpen(true)
  }

  const openEdit = (p: PortfolioProject) => {
    setEditing(p)
    setForm({
      title: p.title,
      clientName: p.clientName || '',
      platformId: p.platformId || '',
      categoryId: p.categoryId || '',
      description: p.description,
      workPerformed: p.workPerformed,
      beforeImage: p.beforeImage || '',
      afterImage: p.afterImage || '',
      screenshots: p.screenshots || [],
      videos: p.videos || [],
      resultsAnalytics: p.resultsAnalytics || [],
      completionDate: p.completionDate ? p.completionDate.slice(0, 10) : '',
      projectUrl: p.projectUrl || '',
      isFeatured: p.isFeatured,
      status: p.status,
      displayOrder: p.displayOrder,
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        platformId: form.platformId || null,
        categoryId: form.categoryId || null,
        completionDate: form.completionDate || null,
        displayOrder: Number(form.displayOrder) || 0,
      }
      if (editing) {
        await agencyService.updateProject(editing.id, payload)
        toast.success('Project updated')
      } else {
        await agencyService.createProject(payload)
        toast.success('Project created')
      }
      setModalOpen(false)
      fetchData()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteProject(deleteTarget.id)
      toast.success('Project deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete project')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Portfolio / Completed Projects</h1>
          <p className="text-sm text-dark-muted mt-1">
            Showcase verified client work with screenshots, before/after visuals, video demos, and analytics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 text-sm w-48"
            />
          </div>
          <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
            <HiPlus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">Loading portfolio...</div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-20 text-center text-sm text-dark-muted">
            No portfolio projects yet. Click &ldquo;Add Project&rdquo; to showcase verified work.
          </div>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="glass-card-dark rounded-2xl border border-dark-border overflow-hidden flex flex-col">
              {(p.afterImage || p.screenshots?.[0]) && (
                <img
                  src={p.afterImage || p.screenshots?.[0]}
                  alt={p.title}
                  className="w-full h-40 object-cover border-b border-dark-border"
                />
              )}
              <div className="p-5 flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-secondary-300">
                    {p.platform?.name || p.category?.name || 'Agency Project'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white">{p.title}</h3>
                {p.clientName && <p className="text-xs text-dark-muted">Client: {p.clientName}</p>}
                <p className="text-xs text-dark-muted line-clamp-2 flex-1">{p.description}</p>
                <div className="flex justify-end gap-2 pt-3 border-t border-dark-border/60">
                  <button onClick={() => openEdit(p)} className="px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white flex items-center gap-1">
                    <HiPencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => setDeleteTarget(p)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs flex items-center gap-1">
                    <HiTrash className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Portfolio Project' : 'Add Portfolio Project'} size="xl">
        <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Project Name *</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Client / Brand Name (Optional)</label>
              <input type="text" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} className="input" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Platform</label>
              <select value={form.platformId} onChange={(e) => setForm({ ...form, platformId: e.target.value })} className="input">
                <option value="">Select platform...</option>
                {platforms.map((pl) => <option key={pl.id} value={pl.id}>{pl.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Project Category</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="input">
                <option value="">Select category...</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Project Description *</label>
            <textarea rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Work Performed *</label>
            <textarea rows={3} required value={form.workPerformed} onChange={(e) => setForm({ ...form, workPerformed: e.target.value })} className="input" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MediaUploader label="Before Image (Optional)" value={form.beforeImage} onChange={(beforeImage) => setForm({ ...form, beforeImage })} />
            <MediaUploader label="After / Cover Image (Optional)" value={form.afterImage} onChange={(afterImage) => setForm({ ...form, afterImage })} />
          </div>

          <StringListEditor
            label="Screenshot URLs (or upload via Before/After & paste)"
            items={form.screenshots}
            onChange={(screenshots) => setForm({ ...form, screenshots })}
            placeholder="https://..."
          />

          <StringListEditor
            label="Video Demonstration URLs"
            items={form.videos}
            onChange={(videos) => setForm({ ...form, videos })}
            placeholder="https://... (mp4 or YouTube link)"
          />

          {/* Verified Results & Analytics */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-dark-muted uppercase">Verified Results &amp; Analytics</label>
              <button
                type="button"
                onClick={() => setForm({ ...form, resultsAnalytics: [...form.resultsAnalytics, { label: '', value: '' }] })}
                className="text-xs text-secondary-400 font-semibold"
              >
                + Add Metric
              </button>
            </div>
            {form.resultsAnalytics.map((m, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Metric (e.g. Watch Hours)"
                  value={m.label}
                  onChange={(e) => {
                    const next = [...form.resultsAnalytics]
                    next[idx].label = e.target.value
                    setForm({ ...form, resultsAnalytics: next })
                  }}
                  className="input text-xs"
                />
                <input
                  type="text"
                  placeholder="Verified Value (e.g. 4,200 hrs)"
                  value={m.value}
                  onChange={(e) => {
                    const next = [...form.resultsAnalytics]
                    next[idx].value = e.target.value
                    setForm({ ...form, resultsAnalytics: next })
                  }}
                  className="input text-xs"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Completion Date</label>
              <input type="date" value={form.completionDate} onChange={(e) => setForm({ ...form, completionDate: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Project URL</label>
              <input type="text" value={form.projectUrl} onChange={(e) => setForm({ ...form, projectUrl: e.target.value })} className="input" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-white">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} /> Featured Project
            </label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PublishStatus })} className="input text-xs w-32 py-1">
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">{saving ? 'Saving...' : 'Save Project'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Portfolio Project"
        message={`Delete "${deleteTarget?.title}"?`}
        isLoading={deleting}
      />
    </div>
  )
}
