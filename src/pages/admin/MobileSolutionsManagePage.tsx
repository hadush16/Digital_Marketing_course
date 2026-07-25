import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { HiPlus, HiTrash, HiPencil, HiRefresh, HiSearch } from 'react-icons/hi'
import { mobileSolutionsService } from '@/services/mobileSolutions.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import type { MobileSolution } from '@/types'

interface SolutionFormData {
  title: string
  description: string
  downloadLinks: { label: string; url: string }[]
}

const initialFormData: SolutionFormData = {
  title: '',
  description: '',
  downloadLinks: [{ label: 'Primary Link', url: 'https://example.com/file.zip' }],
}

export default function MobileSolutionsManagePage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSolution, setEditingSolution] = useState<MobileSolution | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<SolutionFormData>(initialFormData)
  const [formError, setFormError] = useState<string | null>(null)

  // Fetch mobile solutions
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-mobile-solutions', search],
    queryFn: async () => {
      const response = await mobileSolutionsService.getAll({ search })
      return response.data
    },
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (newSolution: SolutionFormData) => mobileSolutionsService.create(newSolution as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-mobile-solutions'] })
      closeModal()
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.message || 'Failed to create solution')
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SolutionFormData> }) =>
      mobileSolutionsService.update(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-mobile-solutions'] })
      closeModal()
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.message || 'Failed to update solution')
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => mobileSolutionsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-mobile-solutions'] })
      setDeletingId(null)
    },
  })

  const openCreateModal = () => {
    setEditingSolution(null)
    setFormData(initialFormData)
    setFormError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item: MobileSolution) => {
    setEditingSolution(item)
    setFormData({
      title: item.title || '',
      description: item.description || '',
      downloadLinks: item.downloadLinks?.length
        ? item.downloadLinks.map((l) => ({ label: l.label, url: l.url }))
        : [{ label: 'Primary Link', url: '' }],
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingSolution(null)
    setFormData(initialFormData)
    setFormError(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (!formData.title.trim() || formData.title.length < 3) {
      setFormError('Title must be at least 3 characters.')
      return
    }

    if (!formData.description.trim() || formData.description.length < 10) {
      setFormError('Description must be at least 10 characters.')
      return
    }

    if (editingSolution) {
      updateMutation.mutate({ id: editingSolution.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId)
    }
  }

  const solutions = data?.data || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Manage Mobile Solutions</h1>
          <p className="text-sm text-dark-muted mt-1">
            Configure flashing procedures, GSM tools, firmware downloads, and device unlock guides.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Refresh list"
          >
            <HiRefresh className="w-5 h-5" />
          </button>
          <button onClick={openCreateModal} className="btn-primary btn-sm flex items-center gap-1.5">
            <HiPlus /> Add Solution
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search mobile solutions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      {/* Data Table */}
      <div className="glass-card-dark rounded-2xl border border-dark-border p-6 shadow-lg overflow-x-auto">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400">Loading mobile solutions...</div>
        ) : isError ? (
          <div className="py-12 text-center text-rose-400">
            Failed to load solutions. {(error as any)?.message}
          </div>
        ) : solutions.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            No mobile solutions found. Click "Add Solution" to add one.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-dark-muted">
            <thead>
              <tr className="border-b border-dark-border text-white font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Solution Title</th>
                <th className="pb-3 px-4">Download Links</th>
                <th className="pb-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/40">
              {solutions.map((item: MobileSolution) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300">
                    {item.downloadLinks?.length || 0} links attached
                  </td>
                  <td className="py-4 pl-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded bg-slate-800 border border-slate-700 hover:text-white hover:border-primary-500 transition-colors"
                      title="Edit Solution"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 rounded bg-slate-800 border border-slate-700 hover:text-rose-400 hover:border-rose-500 transition-colors"
                      title="Delete Solution"
                    >
                      <HiTrash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingSolution ? 'Edit Mobile Solution' : 'Create Mobile Solution'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 text-sm">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
              placeholder="e.g. Samsung FRP Bypass Tool & Guide"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
              placeholder="Step-by-step instructions or tool requirements..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="btn-primary btn-sm px-5"
            >
              {createMutation.isPending || updateMutation.isPending
                ? 'Saving...'
                : editingSolution
                ? 'Update Solution'
                : 'Create Solution'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Mobile Solution"
        message="Are you sure you want to delete this mobile solution? This action cannot be undone."
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
