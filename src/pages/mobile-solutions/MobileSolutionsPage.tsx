import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiSearch, HiStar, HiEye, HiDownload, HiShieldCheck, HiCog } from 'react-icons/hi'
import { cn } from '@/utils'
import { SOLUTIONS_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'

const MOBILE_CATEGORIES = [
  { name: 'All Solutions', value: 'all' },
  { name: 'Hardware Repair', value: 'hardware-repair' },
  { name: 'Software Repair', value: 'software-repair' },
  { name: 'Phone Flashing', value: 'phone-flashing' },
  { name: 'Unlocking & Network', value: 'unlocking' },
  { name: 'FRP Bypass', value: 'frp-bypass' },
  { name: 'IMEI & Baseband Repair', value: 'imei-repair' },
  { name: 'Firmware Stock ROM', value: 'firmware' },
  { name: 'Mobile Diagnostics', value: 'diagnostics' },
  { name: 'Chip Level Micro-Soldering', value: 'chip-level' },
  { name: 'GSM Tools & Setup', value: 'gsm-tools' },
]

const BRANDS = ['All Brands', 'Samsung', 'Xiaomi', 'Oppo', 'Vivo', 'Tecno', 'Infinix', 'Realme', 'MediaTek', 'Qualcomm']

export default function MobileSolutionsPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = SOLUTIONS_DATA.filter((sol) => {
    const matchesCat = selectedCat === 'all' || sol.category === selectedCat
    const matchesBrand = selectedBrand === 'All Brands' || sol.brand.toLowerCase() === selectedBrand.toLowerCase()
    const matchesSearch =
      sol.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sol.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCat && matchesBrand && matchesSearch
  })

  return (
    <>
      <Helmet>
        <title>Mobile Phone Repair, GSM Tools & Firmware Flashing Guides — Ryoit</title>
        <meta
          name="description"
          content="Find verified smartphone hardware diagnostics, Samsung FRP bypass, Xiaomi QCN repair, MediaTek SP Flash Tool tutorials, and tested GSM tool mirrors on Ryoit."
        />
        <link rel="canonical" href="https://ryoit.com/mobile-solutions" />
        <meta property="og:title" content="Mobile Phone Repair, GSM Tools & Firmware Flashing Guides — Ryoit" />
        <meta
          property="og:description"
          content="Find verified smartphone hardware diagnostics, Samsung FRP bypass, Xiaomi QCN repair, MediaTek SP Flash Tool tutorials, and tested GSM tool mirrors on Ryoit."
        />
        <meta property="og:url" content="https://ryoit.com/mobile-solutions" />
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-accent badge mb-4"
            >
              GSM & Hardware Workshop
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
              Technical troubleshooting manuals, official flashing tool setups, stock ROM archives, baseband diagnostics, and micro-soldering standards.
            </motion.p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 max-w-6xl mx-auto">
            {/* Brand select pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {BRANDS.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={cn(
                    'px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-colors border',
                    selectedBrand === brand
                      ? 'bg-accent-500 text-white border-accent-500 shadow-sm'
                      : 'bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
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
                placeholder="Search solutions, tools, models..."
                className="input pl-11"
              />
            </div>
          </div>

          {/* Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-6xl mx-auto">
            {/* Categories sidebar */}
            <div className="hidden md:block glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border sticky top-24">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
                Categories
              </h3>
              <div className="flex flex-col gap-1.5">
                {MOBILE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCat(cat.value)}
                    className={cn(
                      'text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between',
                      selectedCat === cat.value
                        ? 'bg-accent-500/10 text-accent-600 font-bold border border-accent-500/30'
                        : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    )}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Safety notice in sidebar */}
              <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border/60">
                <h4 className="font-display font-bold text-xs text-light-text dark:text-dark-text mb-2 flex items-center gap-1.5">
                  <HiShieldCheck className="text-accent-500 w-4 h-4" /> Lab Verification
                </h4>
                <p className="text-[11px] text-light-muted dark:text-dark-muted leading-relaxed">
                  All procedures follow industry ESD precautions and safe flashing protocols.
                </p>
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
                    <Link to={`/mobile-solutions/${sol.slug}`} className="block group h-full">
                      <div className="card-hover h-full flex flex-col rounded-2xl overflow-hidden border border-light-border dark:border-dark-border">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={sol.thumbnail}
                            alt={sol.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-3 left-3 badge bg-black/60 backdrop-blur-sm text-white border border-white/20 text-[10px] uppercase font-bold">
                            {sol.brand} • {sol.category.replace(/-/g, ' ')}
                          </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-accent-500 transition-colors leading-snug">
                            {sol.title}
                          </h3>
                          <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-4 flex-1 leading-relaxed">
                            {sol.shortDescription}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {sol.tools.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-md bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-[10px] text-light-muted font-medium"
                              >
                                {t}
                              </span>
                            ))}
                            {sol.tools.length > 3 && (
                              <span className="px-1.5 py-0.5 text-[10px] text-light-muted font-medium">
                                +{sol.tools.length - 3} more
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between text-xs text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border/50 pt-3">
                            <span className="flex items-center gap-1 text-yellow-500 font-bold">
                              <HiStar className="fill-yellow-500" /> {sol.rating}
                            </span>
                            <span className="flex items-center gap-1">
                              <HiEye /> {sol.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1 text-accent-600 dark:text-accent-400 font-semibold">
                              <HiDownload className="w-3.5 h-3.5" /> Downloads
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-16 glass-card rounded-2xl border border-light-border dark:border-dark-border">
                  <p className="text-light-muted dark:text-dark-muted text-sm mb-4">
                    No mobile repair solutions match your current filter.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCat('all')
                      setSelectedBrand('All Brands')
                      setSearchQuery('')
                    }}
                    className="btn-primary btn-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Ad Unit */}
          <div className="mt-14 max-w-6xl mx-auto">
            <AdSenseAd slotId="4047270762" />
          </div>
        </div>
      </div>
    </>
  )
}
