import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiSearch, HiPencil, HiTrash, HiEye, HiEyeOff } from 'react-icons/hi'
import { agencyService, type ServiceCategory } from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import toast from 'react-hot-toast'

const EMPTY_FORM: Partial<ServiceCategory> = {
  name: '',
  slug: '',
  description: '',
  image: '',
  icon: '',
  parentId: null,
  displayOrder: 0,
  isActive: true,
  isPublished: true,
}

export default function ServiceCategoriesManagePage() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceCategory | null>(null)
  const [form, setForm] = useState<Partial<ServiceCategory>>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<ServiceCategory | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminCategories({ search: search || undefined })
      setCategories(res.data.data)
    } catch {
      toast.error('Failed to load service categories')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const openCreate = () => {
    setEditing(null)
    setForm({ ...EMPTY_FORM, displayOrder: categories.length + 1 })
    setModalOpen(true)
  }

  const openEdit = (cat: ServiceCategory) => {
    setEditing(cat)
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      icon: cat.icon || '',
      parentId: cat.parentId || null,
      displayOrder: cat.displayOrder,
      isActive: cat.isActive,
      isPublished: cat.isPublished,
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        parentId: form.parentId || null,
        displayOrder: Number(form.displayOrder) || 0,
      }
      if (editing) {
        await agencyService.updateCategory(editing.id, payload)
        toast.success('Category updated')
      } else {
        await agencyService.createCategory(payload)
        toast.success('Category created')
      }
      setModalOpen(false)
      fetchCategories()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save category')
    } finally {
      setSaving(false)
    }
  }

  const toggleField = async (cat: ServiceCategory, field: 'isActive' | 'isPublished') => {
    try {
      await agencyService.updateCategory(cat.id, { [field]: !cat[field] })
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? { ...c, [field]: !cat[field] } : c)))
      toast.success('Category updated')
    } catch {
      toast.error('Failed to update category')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteCategory(deleteTarget.id, false)
      toast.success('Category deleted')
      setDeleteTarget(null)
      fetchCategories()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Cannot delete category')
      setDeleteTarget(null)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Service Categories</h1>
          <p className="text-sm text-dark-muted mt-1">
            Create unlimited categories &amp; subcategories, manage display order, and control visibility.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 text-sm w-56"
            />
          </div>
          <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
            <HiPlus className="w-4 h-4" /> New Category
          </button>
        </div>
      </div>

      <div className="glass-card-dark rounded-2xl border border-dark-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-secondary-500/30 border-t-secondary-500 animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 text-dark-muted text-sm">
            No service categories found. Click &ldquo;New Category&rdquo; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Order</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase hidden md:table-cell">Parent</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Services</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-dark-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-dark-border/20">
                    <td className="px-6 py-4 text-xs text-dark-muted font-mono">{cat.displayOrder}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {cat.image && (
                          <img src={cat.image} alt={cat.name} className="w-9 h-9 rounded-lg object-cover border border-dark-border" />
                        )}
                        <div>
                          <p className="font-bold text-white">{cat.name}</p>
                          <p className="text-xs text-dark-muted line-clamp-1">{cat.description || cat.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-dark-muted hidden md:table-cell">
                      {cat.parent ? cat.parent.name : '— Top Level —'}
                    </td>
                    <td className="px-6 py-4 text-xs font-semibold text-white">
                      {cat._count?.services ?? 0}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          onClick={() => toggleField(cat, 'isActive')}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            cat.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {cat.isActive ? 'Active' : 'Inactive'}
                        </button>
                        <button
                          onClick={() => toggleField(cat, 'isPublished')}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                            cat.isPublished ? 'bg-secondary-500/20 text-secondary-300' : 'bg-slate-500/20 text-slate-400'
                          }`}
                        >
                          {cat.isPublished ? <HiEye className="w-3 h-3" /> : <HiEyeOff className="w-3 h-3" />}
                          {cat.isPublished ? 'Published' : 'Draft'}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => openEdit(cat)}
                          className="p-2 rounded-lg bg-dark-bg border border-dark-border text-dark-muted hover:text-white"
                          title="Edit"
                        >
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(cat)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          title="Delete"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Service Category' : 'Create Service Category'}
        size="lg"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Category Name *</label>
              <input
                type="text"
                required
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Parent Category (Optional)</label>
              <select
                value={form.parentId || ''}
                onChange={(e) => setForm({ ...form, parentId: e.target.value || null })}
                className="input"
              >
                <option value="">None (Top-Level Category)</option>
                {categories
                  .filter((c) => c.id !== editing?.id)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Description</label>
            <textarea
              rows={3}
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <MediaUploader
              label="Category Image"
              value={form.image || ''}
              onChange={(image) => setForm({ ...form, image })}
            />
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Icon Name / Emoji</label>
                <input
                  type="text"
                  value={form.icon || ''}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  placeholder="e.g. HiSparkles or 📱"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Display Order</label>
                <input
                  type="number"
                  value={form.displayOrder ?? 0}
                  onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                  className="input"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              />
              Active
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-white cursor-pointer">
              <input
                type="checkbox"
                checked={!!form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              />
              Published on Public Site
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">
              {saving ? 'Saving...' : editing ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Service Category"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? Categories with assigned services or subcategories are protected from accidental deletion.`}
        isLoading={deleting}
      />
    </div>
  )
}
