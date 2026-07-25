import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { HiPlus, HiTrash, HiPencil, HiRefresh, HiSearch } from 'react-icons/hi'
import { marketplaceService } from '@/services/marketplace.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import type { MarketplaceListing } from '@/types'

interface ListingFormData {
  title: string
  description: string
  price: number
}

const initialFormData: ListingFormData = {
  title: '',
  description: '',
  price: 0,
}

export default function MarketplaceManagePage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingListing, setEditingListing] = useState<MarketplaceListing | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<ListingFormData>(initialFormData)
  const [formError, setFormError] = useState<string | null>(null)

  // Fetch listings
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-marketplace', search],
    queryFn: async () => {
      const response = await marketplaceService.getAll({ search })
      return response.data
    },
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (newListing: ListingFormData) => marketplaceService.create(newListing as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-marketplace'] })
      closeModal()
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.message || 'Failed to create listing')
    },
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ListingFormData> }) =>
      marketplaceService.update(id, data as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-marketplace'] })
      closeModal()
    },
    onError: (err: any) => {
      setFormError(err.response?.data?.message || 'Failed to update listing')
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => marketplaceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-marketplace'] })
      setDeletingId(null)
    },
  })

  const openCreateModal = () => {
    setEditingListing(null)
    setFormData(initialFormData)
    setFormError(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item: MarketplaceListing) => {
    setEditingListing(item)
    setFormData({
      title: item.title || '',
      description: item.description || '',
      price: item.price || 0,
    })
    setFormError(null)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingListing(null)
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

    if (editingListing) {
      updateMutation.mutate({ id: editingListing.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const handleDeleteConfirm = () => {
    if (deletingId) {
      deleteMutation.mutate(deletingId)
    }
  }

  const listings = data?.data || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Manage Marketplace</h1>
          <p className="text-sm text-dark-muted mt-1">
            Manage classified accounts, services, and digital products.
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
            <HiPlus /> Add Listing
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search listings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="glass-card-dark rounded-2xl border border-dark-border p-6 shadow-lg overflow-x-auto">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400">Loading marketplace listings...</div>
        ) : isError ? (
          <div className="py-12 text-center text-rose-400">
            Failed to load listings. {(error as any)?.message}
          </div>
        ) : listings.length === 0 ? (
          <div className="py-12 text-center text-slate-400">
            No marketplace listings found. Click "Add Listing" to post one.
          </div>
        ) : (
          <table className="w-full text-left text-sm text-dark-muted">
            <thead>
              <tr className="border-b border-dark-border text-white font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Listing Title</th>
                <th className="pb-3 px-4">Seller</th>
                <th className="pb-3 px-4">Price</th>
                <th className="pb-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-border/40">
              {listings.map((item: MarketplaceListing) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 pr-4 font-semibold text-white max-w-xs truncate">
                    {item.title}
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-300">
                    {item.seller?.name || 'Verified Seller'}
                  </td>
                  <td className="py-4 px-4 font-bold text-secondary-400">
                    {item.price ? `${item.price} ETB` : 'Negotiable'}
                  </td>
                  <td className="py-4 pl-4 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded bg-slate-800 border border-slate-700 hover:text-white hover:border-primary-500 transition-colors"
                      title="Edit Listing"
                    >
                      <HiPencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 rounded bg-slate-800 border border-slate-700 hover:text-rose-400 hover:border-rose-500 transition-colors"
                      title="Delete Listing"
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
        title={editingListing ? 'Edit Listing' : 'Create Marketplace Listing'}
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
              placeholder="e.g. Verified Facebook Page with 50K Likes"
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
              placeholder="Full details about this listing..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Price (ETB)</label>
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white text-sm focus:outline-none focus:border-primary-500"
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
                : editingListing
                ? 'Update Listing'
                : 'Create Listing'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Listing"
        message="Are you sure you want to delete this listing? This action cannot be undone."
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
