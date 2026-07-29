import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
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
  HiTrendingUp,
  HiChevronLeft,
  HiChevronRight,
  HiLightningBolt,
  HiTag,
} from 'react-icons/hi'
import { cn } from '@/utils'
import { MARKET_LISTINGS, SELLER_PROFILES } from '@/data/mockDatabase'
import ListingCard from '@/components/marketplace/ListingCard'
import CategoryNav from '@/components/marketplace/CategoryNav'
import CreateListingModal from '@/components/marketplace/CreateListingModal'
import FeaturedCarousel from '@/components/marketplace/FeaturedCarousel'

const STATS = [
  { label: 'Active Listings', value: '2,400+', icon: HiShoppingBag, color: 'from-primary-500 to-primary-700' },
  { label: 'Verified Sellers', value: '850+', icon: HiBadgeCheck, color: 'from-secondary-500 to-secondary-700' },
  { label: 'Deals Completed', value: '12K+', icon: HiTrendingUp, color: 'from-accent-500 to-accent-700' },
  { label: 'Avg Delivery', value: '2 Days', icon: HiLightningBolt, color: 'from-yellow-500 to-orange-500' },
]

export default function MarketplacePage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'price-asc' | 'price-desc' | 'rating'>('latest')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [allListings, setAllListings] = useState(MARKET_LISTINGS)
  const sellersRef = useRef<HTMLDivElement>(null)

  // Filter listings
  const filtered = allListings.filter((item) => {
    let matchesCat = selectedCat === 'all'
    if (!matchesCat) {
      if (item.category === selectedCat) {
        matchesCat = true
      } else {
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
        if (catMap[selectedCat]?.includes(item.category)) matchesCat = true
      }
    }

    const query = searchQuery.toLowerCase()
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(query)))

    const itemPrice = item.price
    const matchesMin = !minPrice || itemPrice >= Number(minPrice)
    const matchesMax = !maxPrice || itemPrice <= Number(maxPrice)

    return matchesCat && matchesSearch && matchesMin && matchesMax
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'popular') return b.views - a.views
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'price-asc') return a.price - b.price
    if (sortBy === 'price-desc') return b.price - a.price
    return Number(b.id) - Number(a.id)
  })

  const featuredListings = allListings.filter((i) => i.isFeatured)

  const handleListingCreated = (newListing: any) => {
    setAllListings([newListing, ...allListings])
  }

  const scrollSellers = (dir: 'left' | 'right') => {
    if (!sellersRef.current) return
    sellersRef.current.scrollBy({ left: dir === 'right' ? 260 : -260, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  }

  return (
    <div className="py-8 bg-light-bg dark:bg-dark-bg min-h-screen relative overflow-hidden">
      {/* Gemini ambient mesh — full page background glow */}
      <div className="fixed inset-0 mesh-bg opacity-20 pointer-events-none" />

      <div className="container-custom relative z-10">

        {/* ═══ HERO BANNER — Gemini Aurora ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl mb-10 border border-white/10 shadow-2xl"
        >
          {/* Aurora gradient animated background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #0a0a1a 0%, #0d0d2b 30%, #0a1a0d 60%, #1a0a1a 100%)',
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: 'linear-gradient(135deg, rgba(0,102,255,0.25) 0%, rgba(124,58,237,0.2) 40%, rgba(0,212,170,0.15) 80%)',
              backgroundSize: '300% 300%',
              animation: 'gemini-aurora 10s ease infinite',
            }}
          />
          {/* Glow orbs */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-primary-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-secondary-500/15 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 top-1/2 w-64 h-64 rounded-full bg-accent-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 p-8 sm:p-12">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-md text-accent-400 text-xs font-bold mb-5"
                style={{ background: 'rgba(0,212,170,0.08)' }}
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
                Buy &amp; Sell{' '}
                <span className="gradient-text-gemini">Digital Services</span>
                , Accounts &amp; Products
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm sm:text-base text-gray-400 mb-8 max-w-2xl leading-relaxed"
              >
                Safely acquire YouTube channels, Facebook pages, graphic design services, web development, video editing, and digital templates from verified sellers across Ethiopia.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap items-center gap-3"
              >
                <a href="#marketplace-browse" className="btn-gemini btn-md gap-2 text-sm">
                  <HiShoppingBag className="w-5 h-5" /> Browse Marketplace
                </a>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="btn-md gap-2 text-sm text-white font-bold rounded-xl border border-white/20 backdrop-blur-md transition-all hover:bg-white/10 active:scale-95"
                >
                  <HiPlus className="w-5 h-5" /> Post a Service
                </button>
                <Link to="/register" className="text-white/70 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors">
                  Become a Seller <HiArrowRight />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ═══ STATS ROW ═══ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
              className="gemini-card rounded-2xl p-4 border border-white/10 flex items-center gap-3 cursor-default"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shrink-0 shadow-glow-sm`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-black text-xl text-white leading-none">{stat.value}</div>
                <div className="text-[11px] text-dark-muted mt-0.5">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ FEATURED GEMINI SPOTLIGHT CAROUSEL ═══ */}
        {featuredListings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10"
                style={{ background: 'linear-gradient(90deg, rgba(0,102,255,0.15), rgba(124,58,237,0.15), rgba(0,212,170,0.10))' }}>
                <HiSparkles className="text-accent-400 w-3.5 h-3.5" />
                <span className="gradient-text-gemini">Gemini Spotlight</span>
              </div>
              <span className="text-dark-muted text-xs">Featured & top-rated listings</span>
            </div>
            <FeaturedCarousel items={featuredListings} />
          </motion.div>
        )}

        {/* ═══ VERIFIED SELLERS — Horizontal Scroll Strip ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text flex items-center gap-2">
                <span>Verified Sellers</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-accent-400 border border-accent-400/30 bg-accent-400/10">Top Rated</span>
              </h2>
              <p className="text-xs text-light-muted dark:text-dark-muted mt-0.5">
                Trustworthy digital service providers
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scrollSellers('left')}
                className="p-2 rounded-xl border border-white/10 bg-dark-surface/60 hover:bg-white/10 text-white transition-all active:scale-95"
              >
                <HiChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollSellers('right')}
                className="p-2 rounded-xl border border-white/10 bg-dark-surface/60 hover:bg-white/10 text-white transition-all active:scale-95"
              >
                <HiChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            ref={sellersRef}
            className="flex gap-4 overflow-x-auto scrollbar-none pb-2"
          >
            {SELLER_PROFILES.map((seller, idx) => (
              <motion.div
                key={seller.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * idx }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="shrink-0"
              >
                <Link
                  to={`/marketplace/seller/${seller.id}`}
                  className="block w-52 gemini-card rounded-2xl p-4 border border-white/10 hover:border-primary-500/40 transition-all duration-300 group"
                >
                  {/* Seller avatar */}
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gradient-primary p-0.5 mx-auto mb-3">
                    <img
                      src={seller.avatar}
                      alt={seller.displayName}
                      className="w-full h-full object-cover rounded-[14px] bg-dark-card"
                    />
                    {seller.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-accent-500 border-2 border-dark-card flex items-center justify-center">
                        <HiBadgeCheck className="text-dark-bg w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-center text-dark-text group-hover:text-primary-400 transition-colors truncate">
                    {seller.displayName}
                  </h3>
                  <div className="flex items-center justify-center gap-1 text-xs text-yellow-400 mt-1">
                    <HiStar className="w-3.5 h-3.5 fill-yellow-400" />
                    <span className="font-bold">{seller.rating}</span>
                    <span className="text-dark-muted">({seller.totalReviews})</span>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[10px] text-dark-muted">View Profile →</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ SEARCH & FILTERS BAR ═══ */}
        <div id="marketplace-browse" className="mb-8 space-y-4">
          <div className="gemini-card rounded-2xl p-4 border border-white/10 flex flex-col md:flex-row gap-3 items-center">
            {/* Search Input */}
            <div className="relative w-full md:flex-1">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accounts, services, templates..."
                className="input pl-11 bg-dark-surface/80 border-white/10 text-white placeholder:text-dark-muted/50 focus:ring-primary-500/50"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-dark-muted hover:text-white"
                >
                  <HiX className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Price Inputs */}
            <div className="hidden lg:flex items-center gap-2">
              <HiTag className="text-dark-muted w-4 h-4 shrink-0" />
              <input
                type="number"
                placeholder="Min ETB"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input w-28 text-xs py-2 bg-dark-surface/80 border-white/10 text-white placeholder:text-dark-muted/50"
              />
              <span className="text-dark-muted text-xs">–</span>
              <input
                type="number"
                placeholder="Max ETB"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input w-28 text-xs py-2 bg-dark-surface/80 border-white/10 text-white placeholder:text-dark-muted/50"
              />
            </div>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input w-auto text-xs py-2 font-semibold bg-dark-surface/80 border-white/10 text-white shrink-0"
            >
              <option value="latest">Recently Added</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden border border-white/10 bg-dark-surface/80 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all hover:bg-white/10"
            >
              <HiFilter /> Filters
            </button>

            <button
              onClick={() => setCreateModalOpen(true)}
              className="btn-gemini text-xs px-5 py-2.5 rounded-xl font-bold gap-1.5 hidden sm:flex items-center shrink-0"
            >
              <HiPlus /> Add Listing
            </button>
          </div>
        </div>

        {/* ═══ MAIN MARKETPLACE LAYOUT ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* CATEGORIES SIDEBAR (Desktop) */}
          <div className="hidden md:block">
            <CategoryNav
              selectedCategory={selectedCat}
              onSelectCategory={(cat) => setSelectedCat(cat)}
            />
          </div>

          {/* MOBILE CATEGORY DRAWER */}
          <AnimatePresence>
            {mobileFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden col-span-1 mb-6 overflow-hidden"
              >
                <CategoryNav
                  selectedCategory={selectedCat}
                  onSelectCategory={(cat) => {
                    setSelectedCat(cat)
                    setMobileFilterOpen(false)
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* LISTINGS GRID */}
          <div className="md:col-span-3 space-y-6">
            {/* Active Filters Display */}
            <div className="flex items-center justify-between text-xs text-dark-muted">
              <span>
                Showing <strong className="text-white">{sorted.length}</strong> listings
                {selectedCat !== 'all' && (
                  <span>
                    {' '}in <strong className="text-primary-400 capitalize">{selectedCat.replace(/-/g, ' ')}</strong>
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
                  className="text-primary-400 hover:underline font-semibold"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Grid */}
            {sorted.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {sorted.map((item, index) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ListingCard item={item} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="gemini-card rounded-3xl p-12 text-center border border-white/10"
              >
                <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-4 text-primary-400">
                  <HiShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-2">No listings found</h3>
                <p className="text-xs text-dark-muted max-w-sm mx-auto mb-6">
                  Try adjusting your search filters or browse other categories.
                </p>
                <button
                  onClick={() => {
                    setSelectedCat('all')
                    setSearchQuery('')
                    setMinPrice('')
                    setMaxPrice('')
                  }}
                  className="btn-gemini text-xs px-5 py-2.5 rounded-xl font-bold"
                >
                  Reset Filters
                </button>
              </motion.div>
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
