import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiSearch, HiClock, HiEye, HiArrowRight } from 'react-icons/hi'
import { cn } from '@/utils'
import { NEWS_DATA } from '@/data/mockDatabase'
const NEWS_CATEGORIES = [
  { name: 'All News', value: 'all' },
  { name: 'Mobile Repair', value: 'mobile-repair' },
  { name: 'GSM Tool Updates', value: 'gsm-tools' },
  { name: 'Android Updates', value: 'android-updates' },
  { name: 'Apple News', value: 'apple-news' },
  { name: 'Samsung News', value: 'samsung-news' },
  { name: 'Industry Updates', value: 'industry-updates' },
]


export default function TechNewsPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = NEWS_DATA.filter((art) => {
    const matchesCat = selectedCat === 'all' || art.category === selectedCat
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
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
            className="badge-primary badge mb-4"
          >
            News
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6 text-light-text dark:text-dark-text"
          >
            Technology & GSM <span className="gradient-text">News</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Stay informed with Android/iOS updates, GSM software boxes releases, diagnostic board changes, and digital market changes.
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
              placeholder="Search news..."
              className="input pl-11"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-6xl mx-auto">
          {/* Categories Sidebar */}
          <div className="hidden md:block glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border max-h-[80vh] overflow-y-auto">
            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex flex-col gap-1.5">
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={cn(
                    'text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    selectedCat === cat.value
                      ? 'bg-primary-500/10 text-primary-500 font-bold'
                      : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Articles list */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.length > 0 ? (
              filtered.map((art, index) => (
                <motion.div
                  key={art.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/news/${art.slug}`} className="block group">
                    <div className="card-hover h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                        <img
                          src={art.thumbnail}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-3 left-3 badge-primary badge text-xs">
                          {art.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-4 flex-1">
                          {art.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border pt-4">
                          <span className="flex items-center gap-1"><HiClock /> {art.readTime} min</span>
                          <span className="flex items-center gap-1"><HiEye /> {art.views.toLocaleString()}</span>
                          <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-light-muted dark:text-dark-muted">
                No articles found under this category.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
