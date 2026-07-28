import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  HiSearch,
  HiFilter,
  HiX,
  HiArrowRight,
  HiSparkles,
  HiPlus,
  HiBadgeCheck,
  HiStar,
  HiShoppingBag,
  HiTag,
  HiTrendingUp,
} from 'react-icons/hi'
import { cn } from '@/utils'
import { MARKET_LISTINGS, SELLER_PROFILES } from '@/data/mockDatabase'
import ListingCard from '@/components/marketplace/ListingCard'
import CategoryNav from '@/components/marketplace/CategoryNav'
import CreateListingModal from '@/components/marketplace/CreateListingModal'

export default function MarketplacePage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'price-asc' | 'price-desc' | 'rating'>('latest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [allListings, setAllListings] = useState(MARKET_LISTINGS)

  // Filter listings
  const filtered = allListings.filter((item) => {
    // category filter
    let matchesCat = selectedCat === 'all'
    if (!matchesCat) {
      if (item.category === selectedCat) {
        matchesCat = true
      } else {
        // match parent category groupings if needed
        const catMap: Record<string, string[]> = {
          'social-accounts': ['youtube-channels', 'facebook-pages', 'tiktok-accounts', 'instagram-accounts', 'telegram-channels', 'telegram-groups', 'whatsapp-business'],
          'digital-marketing': ['facebook-boosting', 'youtube-promotion', 'seo-services', 'email-marketing', 'tiktok-marketing', 'linkedin-marketing', 'instagram-marketing', 'telegram-marketing'],
          'social-services': ['social-media-management', 'page-management', 'content-scheduling', 'audience-growth', 'community-management', 'brand-management'],
          'creative': ['graphic-design', 'logo-design', 'ui-ux-design', 'video-editing', 'motion-graphics', 'thumbnail-design'],
          'development': ['website-development', 'react-development', 'flutter-development', 'mobile-apps', 'backend-apis', 'wordpress'],
          'technology': ['cloud-computing', 'cybersecurity', 'ai-services', 'automation', 'technical-support'],
          'training': ['computer-training', 'digital-skills', 'technology-courses', 'freelancing-coaching'],
          'digital-products': ['templates', 'ebooks', 'source-code', 'ui-kits', 'icons', 'presentations'],
        }
        if (catMap[selectedCat]?.includes(item.category)) {
          matchesCat = true
        }
      }
    }

    // search query
    const query = searchQuery.toLowerCase()
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)))

    // price filter
    const itemPrice = item.price
    const matchesMin = !minPrice || itemPrice >= Number(minPrice)
    const matchesMax = !maxPrice || itemPrice <= Number(maxPrice)

    return matchesCat && matchesSearch && matchesMin && matchesMax
  })

  // Sort listings
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return Number(b.id) - Number(a.id) // latest
  })

  const featuredListings = allListings.filter((i) => i.isFeatured)

  const handleListingCreated = (newListing: any) => {
    setAllListings([newListing, ...allListings])
  }

  return (
    <div className="py-8 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* HERO BANNER */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-dark-surface to-secondary-900 p-8 sm:p-12 mb-12 border border-white/10 shadow-2xl">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-accent-400 text-xs font-bold mb-4"
            >
              <HiSparkles className="w-4 h-4" />
              <span>RYOIT Digital Marketplace Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-black text-3xl sm:text-5xl text-white leading-tight mb-4"
            >
              Buy & Sell <span className="gradient-text-accent">Digital Services</span>, Accounts & Products
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 mb-8 max-w-2xl leading-relaxed"
            >
              Safely acquire YouTube channels, Facebook pages, graphic design services, web development, video editing, and digital templates from verified sellers across Ethiopia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="#marketplace-browse" className="btn-primary btn-md gap-2">
                <HiShoppingBag className="w-5 h-5" /> Browse Marketplace
              </a>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn-secondary btn-md gap-2"
              >
                <HiPlus className="w-5 h-5" /> Post a Service
              </button>
              <Link to="/register" className="btn-ghost text-white hover:bg-white/10 btn-md gap-2">
                Become a Seller <HiArrowRight />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* FEATURED SELLERS ROW */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text flex items-center gap-2">
                <span>Verified Sellers</span>
                <span className="badge-accent badge text-[10px]">Top Rated</span>
              </h2>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">
                Trustworthy digital service providers and asset managers
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SELLER_PROFILES.map((seller) => (
              <Link
                key={seller.id}
                to={`/marketplace/seller/${seller.id}`}
                className="glass-card rounded-2xl p-4 border border-light-border dark:border-dark-border hover:border-primary-500/40 transition-all duration-300 hover:-translate-y-1 block group"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gradient-primary p-0.5">
                    <img
                      src={seller.avatar}
                      alt={seller.displayName}
                      className="w-full h-full object-cover rounded-full bg-dark-card"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text truncate group-hover:text-primary-500 transition-colors flex items-center gap-1">
                      <span>{seller.displayName}</span>
                      {seller.verified && <HiBadgeCheck className="text-accent-500 shrink-0 w-4 h-4" />}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted mt-0.5">
                      <span className="flex items-center gap-0.5 text-yellow-500 font-semibold">
                        <HiStar className="w-3.5 h-3.5 fill-yellow-500" />
                        {seller.rating}
                      </span>
                      <span>({seller.totalReviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div id="marketplace-browse" className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accounts, services, templates..."
                className="input pl-11"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-light-muted hover:text-light-text"
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="md:hidden btn-outline btn-md gap-2"
              >
                <HiFilter /> Categories & Filters
              </button>

              {/* Price Filter Inputs */}
              <div className="hidden lg:flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min ETB"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="input w-28 text-xs py-2"
                />
                <span className="text-light-muted dark:text-dark-muted text-xs">-</span>
                <input
                  type="number"
                  placeholder="Max ETB"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input w-28 text-xs py-2"
                />
              </div>

              {/* Sort Select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="input w-auto text-xs py-2 font-semibold"
              >
                <option value="latest">Sort: Recently Added</option>
                <option value="popular">Sort: Most Popular</option>
                <option value="rating">Sort: Top Rated</option>
                <option value="price-asc">Sort: Price (Low to High)</option>
                <option value="price-desc">Sort: Price (High to Low)</option>
              </select>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="btn-primary btn-md gap-1.5 shrink-0 hidden sm:inline-flex"
              >
                <HiPlus /> Add Listing
              </button>
            </div>
          </div>
        </div>

        {/* MAIN MARKETPLACE LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* CATEGORIES SIDEBAR (Desktop) */}
          <div className="hidden md:block">
            <CategoryNav
              selectedCategory={selectedCat}
              onSelectCategory={(cat) => setSelectedCat(cat)}
            />
          </div>

          {/* MOBILE CATEGORY DRAWER */}
          {mobileFilterOpen && (
            <div className="md:hidden col-span-1 mb-6">
              <CategoryNav
                selectedCategory={selectedCat}
                onSelectCategory={(cat) => {
                  setSelectedCat(cat)
                  setMobileFilterOpen(false)
                }}
              />
            </div>
          )}

          {/* LISTINGS GRID */}
          <div className="md:col-span-3 space-y-6">
            {/* Active Filters Display */}
            <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted">
              <span>
                Showing <strong>{sorted.length}</strong> listings
                {selectedCat !== 'all' && (
                  <span>
                    {' '}in <strong className="capitalize">{selectedCat.replace(/-/g, ' ')}</strong>
                  </span>
                )}
              </span>
              {(selectedCat !== 'all' || searchQuery || minPrice || maxPrice) && (
                <button
                  onClick={() => {
                    setSelectedCat('all')
                    setSearchQuery('')
                    setMinPrice('')
                    setMaxPrice('')
                  }}
                  className="text-primary-500 hover:underline font-semibold"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {/* Grid */}
            {sorted.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((item, index) => (
                  <ListingCard key={item.id} item={item} index={index} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-12 text-center border border-light-border dark:border-dark-border">
                <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4 text-primary-500">
                  <HiShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
                  No listings found
                </h3>
                <p className="text-xs text-light-muted dark:text-dark-muted max-w-sm mx-auto mb-6">
                  Try adjusting your search filters or browse other categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCat('all')
                    setSearchQuery('')
                    setMinPrice('')
                    setMaxPrice('')
                  }}
                  className="btn-primary btn-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CREATE LISTING MODAL */}
      <CreateListingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSuccess={handleListingCreated}
      />
    </div>
  )
}
