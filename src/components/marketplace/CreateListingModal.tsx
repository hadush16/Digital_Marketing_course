import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiPlus, HiTrash, HiCamera, HiCheckCircle } from 'react-icons/hi'
import { MARKETPLACE_CATEGORIES } from '@/data/mockDatabase'
import type { MarketplaceCategory } from '@/types'

interface CreateListingModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (newListing: any) => void
}

export default function CreateListingModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateListingModalProps) {
  const [form, setForm] = useState({
    title: '',
    category: 'facebook-pages' as MarketplaceCategory,
    price: '',
    currency: 'ETB',
    priceType: 'fixed' as 'fixed' | 'negotiable' | 'contact',
    deliveryTime: '2 Days',
    description: '',
    thumbnail: '',
  })
  const [featureInput, setFeatureInput] = useState('')
  const [features, setFeatures] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [created, setCreated] = useState(false)

  const addFeature = () => {
    if (featureInput.trim()) {
      setFeatures([...features, featureInput.trim()])
      setFeatureInput('')
    }
  }

  const removeFeature = (idx: number) => {
    setFeatures(features.filter((_, i) => i !== idx))
  }

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput.trim().toLowerCase()])
      setTagInput('')
    }
  }

  const removeTag = (idx: number) => {
    setTags(tags.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setCreated(true)

    const newListing = {
      id: String(Date.now()),
      title: form.title,
      description: form.description,
      thumbnail: form.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80',
      images: [form.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80'],
      category: form.category,
      price: Number(form.price) || 0,
      currency: form.currency,
      priceType: form.priceType,
      seller: { id: 'seller-current', name: 'My Business Profile', verified: true, joined: '2024' },
      rating: 5.0,
      likes: 0,
      views: 1,
      deliveryTime: form.deliveryTime,
      features,
      tags,
      createdAt: new Date().toISOString(),
    }

    if (onSuccess) onSuccess(newListing)
  }

  const handleClose = () => {
    setCreated(false)
    setForm({
      title: '',
      category: 'facebook-pages',
      price: '',
      currency: 'ETB',
      priceType: 'fixed',
      deliveryTime: '2 Days',
      description: '',
      thumbnail: '',
    })
    setFeatures([])
    setTags([])
    onClose()
  }

  // Flatten subcategories for select
  const allSubcategories: { label: string; value: string }[] = []
  MARKETPLACE_CATEGORIES.forEach((cat) => {
    if (cat.subcategories) {
      cat.subcategories.forEach((sub) => {
        allSubcategories.push(sub)
      })
    }
  })

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 border border-light-border dark:border-dark-border shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text transition-colors"
            >
              <HiX className="w-5 h-5" />
            </button>

            {created ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <HiCheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-2">
                  Listing Published!
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted max-w-md mx-auto">
                  Your digital service or account listing is now live on the marketplace. Buyers can contact you directly through your listing page.
                </p>
                <button onClick={handleClose} className="btn-primary btn-md mt-6">
                  Back to Dashboard
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-display font-bold text-2xl text-light-text dark:text-dark-text">
                    Create New Marketplace Listing
                  </h3>
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-1">
                    Post digital services, social accounts, design packages, or digital products for sale.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Listing Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Facebook Page — 50K Followers (Monetized)"
                      className="input"
                    />
                  </div>

                  {/* Category & Price Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                        Category *
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value as MarketplaceCategory })}
                        className="input"
                      >
                        {allSubcategories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                        Price (ETB) *
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        placeholder="e.g. 5000"
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Price Type & Delivery Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                        Pricing Type
                      </label>
                      <select
                        value={form.priceType}
                        onChange={(e) => setForm({ ...form, priceType: e.target.value as any })}
                        className="input"
                      >
                        <option value="fixed">Fixed Price</option>
                        <option value="negotiable">Negotiable</option>
                        <option value="contact">Contact for Quote</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                        Delivery Time / Method
                      </label>
                      <input
                        type="text"
                        value={form.deliveryTime}
                        onChange={(e) => setForm({ ...form, deliveryTime: e.target.value })}
                        placeholder="e.g. Instant Transfer / 2 Days"
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Thumbnail URL */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Featured Image URL <span className="normal-case font-normal">(optional image link)</span>
                    </label>
                    <div className="relative">
                      <HiCamera className="absolute left-3.5 top-1/2 -translate-y-1/2 text-light-muted w-4 h-4" />
                      <input
                        type="url"
                        value={form.thumbnail}
                        onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="input pl-10"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Detailed Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe what you are offering, specs, metrics, audience demographics, terms, and what's included..."
                      className="input resize-none"
                    />
                  </div>

                  {/* Key Features */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Key Highlights / Included Features
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addFeature()
                          }
                        }}
                        placeholder="Add feature e.g. 50,000 Real Followers"
                        className="input flex-1"
                      />
                      <button
                        type="button"
                        onClick={addFeature}
                        className="btn-secondary btn-sm shrink-0"
                      >
                        <HiPlus /> Add
                      </button>
                    </div>
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="badge bg-secondary-500/10 text-secondary-500 text-xs py-1 px-3 flex items-center gap-1.5"
                          >
                            <span>{feat}</span>
                            <button type="button" onClick={() => removeFeature(idx)}>
                              <HiTrash className="w-3 h-3 hover:text-red-500" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Search Tags
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            addTag()
                          }
                        }}
                        placeholder="Add tag e.g. facebook, ethiopia, page"
                        className="input flex-1"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="btn-outline btn-sm shrink-0"
                      >
                        <HiPlus /> Tag
                      </button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="badge bg-light-border dark:bg-dark-border text-light-muted dark:text-dark-muted text-xs py-0.5 px-2.5 flex items-center gap-1"
                          >
                            #{tag}
                            <button type="button" onClick={() => removeTag(idx)}>
                              <HiX className="w-3 h-3 hover:text-red-500" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-light-border dark:border-dark-border flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="btn-ghost btn-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary btn-md min-w-[140px]"
                    >
                      {loading ? 'Publishing...' : 'Publish Listing'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
