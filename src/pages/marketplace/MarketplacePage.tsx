import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiSearch, HiStar, HiFilter, HiX, HiHeart, HiArrowRight } from 'react-icons/hi'
import { cn } from '@/utils'
import { MARKET_LISTINGS } from '@/data/mockDatabase'
const MARKET_CATEGORIES = [
  { name: 'All Services', value: 'all' },
  { name: 'YouTube Channels', value: 'youtube-channels' },
  { name: 'Facebook Pages', value: 'facebook-pages' },
  { name: 'TikTok Accounts', value: 'tiktok-accounts' },
  { name: 'Telegram Channels/Groups', value: 'telegram-channels' },
  { name: 'Facebook Boosting', value: 'facebook-boosting' },
  { name: 'YouTube Promotion', value: 'youtube-promotion' },
  { name: 'SEO Services', value: 'seo-services' },
  { name: 'Graphic & Logo Design', value: 'logo-design' },
  { name: 'Video Editing', value: 'video-editing' },
]


export default function MarketplacePage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = MARKET_LISTINGS.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-secondary badge mb-4"
          >
            Marketplace
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6 text-light-text dark:text-dark-text"
          >
            Digital Services <span className="gradient-text">Marketplace</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Safely buy or sell YouTube channels, social accounts, graphic designs, video editing services and consultation.
          </motion.p>
        </div>

        {/* Search */}
        <div className="flex gap-4 items-center mb-8 max-w-5xl mx-auto">
          <div className="relative flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="input pl-11"
            />
          </div>
          <button className="btn-primary btn-md shrink-0">
            Sell a Service
          </button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-6xl mx-auto">
          {/* Categories list sidebar */}
          <div className="hidden md:block glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border max-h-[80vh] overflow-y-auto">
            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex flex-col gap-1.5">
              {MARKET_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={cn(
                    'text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    selectedCat === cat.value
                      ? 'bg-secondary-500/10 text-secondary-500 font-bold'
                      : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Listings list items */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/marketplace/${item.id}`} className="block group">
                    <div className="card-hover h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-3 left-3 badge bg-secondary-500/20 text-secondary-600 border border-secondary-500/30 text-xs">
                          {item.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-secondary-500 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-4 flex-1">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between border-t border-light-border dark:border-dark-border pt-4">
                          <span className="font-display font-bold text-sm text-secondary-500">
                            {item.currency} {item.price.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-yellow-500"><HiStar /> {item.rating}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-light-muted dark:text-dark-muted">
                No marketplace listings found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
