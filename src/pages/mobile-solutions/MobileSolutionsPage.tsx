import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiSearch, HiStar, HiEye, HiDownload, HiFilter, HiX } from 'react-icons/hi'
import { cn } from '@/utils'
import { SOLUTIONS_DATA } from '@/data/mockDatabase'
const MOBILE_CATEGORIES = [
  { name: 'All Solutions', value: 'all' },
  { name: 'Hardware Repair', value: 'hardware-repair' },
  { name: 'Software Repair', value: 'software-repair' },
  { name: 'Phone Flashing', value: 'phone-flashing' },
  { name: 'Unlocking', value: 'unlocking' },
  { name: 'FRP Bypass', value: 'frp-bypass' },
  { name: 'IMEI Repair', value: 'imei-repair' },
  { name: 'Firmware Stock ROM', value: 'firmware' },
  { name: 'Mobile Diagnostics', value: 'diagnostics' },
  { name: 'Chip Level Repair', value: 'chip-level' },
  { name: 'GSM Tools & Setup', value: 'gsm-tools' },
]

const BRANDS = ['All Brands', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Tecno', 'Infinix', 'Realme', 'Huawei']


export default function MobileSolutionsPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  const filtered = SOLUTIONS_DATA.filter((sol) => {
    const matchesCat = selectedCat === 'all' || sol.category === selectedCat
    const matchesBrand = selectedBrand === 'All Brands' || sol.brand === selectedBrand
    const matchesSearch = sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sol.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesBrand && matchesSearch
  })

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-accent badge mb-4"
          >
            Mobile Solutions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6 text-light-text dark:text-dark-text"
          >
            Mobile Repair & <span className="gradient-text-accent">GSM Solutions</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Guides, tools configuration, custom ROMs, screen replacement tutorial videos, and GSM firmware downloads.
          </motion.p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8 max-w-6xl mx-auto">
          {/* Brand select */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {BRANDS.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors border',
                  selectedBrand === brand
                    ? 'bg-accent-500/10 text-accent-600 border-accent-500'
                    : 'bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted'
                )}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:max-w-xs">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search solutions, tools..."
              className="input pl-11"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-6xl mx-auto">
          {/* Categories list sidebar (Desktop) */}
          <div className="hidden md:block glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border max-h-[80vh] overflow-y-auto">
            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex flex-col gap-1.5">
              {MOBILE_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={cn(
                    'text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    selectedCat === cat.value
                      ? 'bg-accent-500/10 text-accent-600 font-bold'
                      : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Solutions items */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.length > 0 ? (
              filtered.map((sol, index) => (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/mobile-solutions/${sol.slug}`} className="block group">
                    <div className="card-hover h-full flex flex-col">
                      <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                        <img
                          src={sol.thumbnail}
                          alt={sol.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute bottom-3 left-3 badge bg-accent-500/20 text-accent-600 border border-accent-500/30 text-xs">
                          {sol.category.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-accent-500 transition-colors">
                          {sol.title}
                        </h3>
                        <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-4 flex-1">
                          {sol.shortDescription}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {sol.tools.map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded bg-light-border dark:bg-dark-border text-[10px] text-light-muted font-semibold">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border pt-4">
                          <span className="flex items-center gap-1 text-yellow-500"><HiStar /> {sol.rating}</span>
                          <span className="flex items-center gap-1"><HiEye /> {sol.views.toLocaleString()}</span>
                          <span className="flex items-center gap-1 text-accent-500 font-semibold"><HiDownload /> Links</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-light-muted dark:text-dark-muted">
                No mobile repair solutions found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
