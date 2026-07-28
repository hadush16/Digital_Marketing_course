import { useState } from 'react'
import { HiPlus, HiPencil, HiTrash, HiCheck, HiX, HiShoppingBag } from 'react-icons/hi'
import { MARKET_LISTINGS } from '@/data/mockDatabase'
import CreateListingModal from '@/components/marketplace/CreateListingModal'

export default function MyListingsPage() {
  const [listings, setListings] = useState<any[]>(MARKET_LISTINGS.slice(0, 4))
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const toggleStatus = (id: string) => {
    setListings(
      listings.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'archived' ? 'published' : 'archived' }
          : item
      )
    )
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter((item) => item.id !== id))
    }
  }

  const handleCreated = (newListing: any) => {
    setListings([newListing, ...listings])
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text flex items-center gap-2">
            <HiShoppingBag className="text-secondary-500" /> My Marketplace Listings
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Manage your ads, channels, graphic services, digital products, and inquiries.
          </p>
        </div>
        <button
          onClick={() => setCreateModalOpen(true)}
          className="btn-primary btn-md flex items-center gap-1.5 whitespace-nowrap shrink-0"
        >
          <HiPlus /> Create New Listing
        </button>
      </div>

      <div className="glass-card rounded-3xl border border-light-border dark:border-dark-border p-6 shadow-sm">
        {listings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-light-muted dark:text-dark-muted">
              <thead>
                <tr className="border-b border-light-border dark:border-dark-border/40 text-light-text dark:text-dark-text font-bold text-xs uppercase tracking-wider">
                  <th className="pb-3 pr-4">Item details</th>
                  <th className="pb-3 px-4">Category</th>
                  <th className="pb-3 px-4">Price</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Views</th>
                  <th className="pb-3 pl-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light-border dark:divide-dark-border/40">
                {listings.map((item) => {
                  const isArchived = item.status === 'archived'
                  return (
                    <tr key={item.id} className="hover:bg-light-border/20 dark:hover:bg-dark-border/20">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.thumbnail}
                            alt=""
                            className="w-12 h-10 rounded-lg object-cover bg-dark-card shrink-0"
                          />
                          <span className="font-semibold text-light-text dark:text-dark-text line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs capitalize whitespace-nowrap">
                        {item.category.replace(/-/g, ' ')}
                      </td>
                      <td className="py-4 px-4 font-bold text-secondary-500 whitespace-nowrap">
                        {item.currency} {item.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        {isArchived ? (
                          <span className="badge-muted badge">Disabled</span>
                        ) : (
                          <span className="badge-success badge">Active</span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-bold whitespace-nowrap">
                        {item.views}
                      </td>
                      <td className="py-4 pl-4 text-right space-x-3 whitespace-nowrap">
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className="text-xs font-semibold text-light-muted hover:text-light-text dark:hover:text-dark-text"
                        >
                          {isArchived ? 'Enable' : 'Disable'}
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-xs font-semibold text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-light-muted">
            No listings yet. Click "Create New Listing" to publish your first service or asset.
          </div>
        )}
      </div>

      {/* CREATE MODAL */}
      <CreateListingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleCreated}
      />
    </div>
  )
}
