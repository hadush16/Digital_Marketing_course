import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiSearch, HiClock, HiEye, HiArrowRight, HiBookOpen, HiTag, HiSparkles } from 'react-icons/hi'
import { cn } from '@/utils'
import { NEWS_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'

const NEWS_CATEGORIES = [
  { name: 'All Guides & News', value: 'all' },
  { name: 'Mobile Hardware & Diagnostics', value: 'mobile-repair' },
  { name: 'GSM & Software Box Flashing', value: 'gsm-tools' },
  { name: 'Android OS Engineering', value: 'android-updates' },
  { name: 'Digital Marketing & Ads', value: 'digital-marketing' },
  { name: 'Technical SEO', value: 'technical-seo' },
  { name: 'Industry Benchmarks', value: 'industry-updates' },
]

export default function TechNewsPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = NEWS_DATA.filter((art) => {
    const matchesCat = selectedCat === 'all' || art.category === selectedCat
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const featuredGuide = NEWS_DATA[0]

  return (
    <>
      <Helmet>
        <title>Technical Guides, Mobile Diagnostics & GSM Engineering Hub — Ryoit</title>
        <meta
          name="description"
          content="Explore authoritative technical guides, GSM flashing workflows, Android OS repair teardowns, and digital advertising optimization strategies on Ryoit."
        />
        <link rel="canonical" href="https://ryoit.com/news" />
        <meta property="og:title" content="Technical Guides, Mobile Diagnostics & GSM Engineering Hub — Ryoit" />
        <meta
          property="og:description"
          content="Explore authoritative technical guides, GSM flashing workflows, Android OS repair teardowns, and digital advertising optimization strategies on Ryoit."
        />
        <meta property="og:url" content="https://ryoit.com/news" />
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-primary badge mb-4"
            >
              Knowledge & Engineering Hub
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6 text-light-text dark:text-dark-text"
            >
              Engineering Guides & <span className="gradient-text">GSM Research</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              In-depth technical manuals, hardware diagnostic workflows, GSM box protocols, Android security analyses, and performance marketing frameworks.
            </motion.p>
          </div>

          {/* Featured Editorial Banner (if showing all and no search query) */}
          {selectedCat === 'all' && !searchQuery && featuredGuide && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 max-w-6xl mx-auto"
            >
              <Link
                to={`/news/${featuredGuide.slug}`}
                className="glass-card rounded-3xl p-6 sm:p-8 border border-primary-500/30 hover:border-primary-500 transition-all duration-300 block group shadow-lg"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 aspect-video rounded-2xl overflow-hidden relative">
                    <img
                      src={featuredGuide.thumbnail}
                      alt={featuredGuide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="badge-primary badge flex items-center gap-1 shadow-md">
                        <HiSparkles className="w-3.5 h-3.5" /> Featured Deep Dive
                      </span>
                    </div>
                  </div>
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center gap-3 text-xs text-light-muted dark:text-dark-muted">
                      <span className="capitalize text-primary-500 font-bold">{featuredGuide.category.replace(/-/g, ' ')}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><HiClock /> {featuredGuide.readTime} min read</span>
                    </div>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-light-text dark:text-dark-text group-hover:text-primary-500 transition-colors leading-snug">
                      {featuredGuide.title}
                    </h2>
                    <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed line-clamp-3">
                      {featuredGuide.excerpt}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-primary-500 font-bold text-sm">
                      Read Full Engineering Guide <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8 max-w-6xl mx-auto">
            {/* Category Select Pills (Mobile Scrollable) */}
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {NEWS_CATEGORIES.slice(0, 5).map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border',
                    selectedCat === cat.value
                      ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                      : 'bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:max-w-xs">
              <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search technical guides..."
                className="input pl-11"
              />
            </div>
          </div>

          {/* Catalog Grid with Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-6xl mx-auto">
            {/* Categories Sidebar */}
            <div className="hidden md:block glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border sticky top-24">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-light-text dark:text-dark-text mb-4">
                Browse by Topic
              </h3>
              <div className="flex flex-col gap-1.5">
                {NEWS_CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCat(cat.value)}
                    className={cn(
                      'text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between',
                      selectedCat === cat.value
                        ? 'bg-primary-500/10 text-primary-500 font-bold border border-primary-500/30'
                        : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                    )}
                  >
                    <span>{cat.name}</span>
                    {selectedCat === cat.value && <HiArrowRight className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>

              {/* Sidebar Quality Assurance Box */}
              <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border/60">
                <h4 className="font-display font-bold text-xs text-light-text dark:text-dark-text mb-2 flex items-center gap-1.5">
                  <HiBookOpen className="text-primary-500 w-4 h-4" /> Editorial Standards
                </h4>
                <p className="text-[11px] text-light-muted dark:text-dark-muted leading-relaxed">
                  All repair guides and software walkthroughs are verified by certified technicians on real workshop hardware.
                </p>
              </div>
            </div>

            {/* Articles List */}
            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.length > 0 ? (
                filtered.map((art, index) => (
                  <motion.div
                    key={art.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/news/${art.slug}`} className="block group h-full">
                      <div className="card-hover h-full flex flex-col rounded-2xl overflow-hidden border border-light-border dark:border-dark-border">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={art.thumbnail}
                            alt={art.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute bottom-3 left-3 badge-primary badge text-[10px] uppercase font-bold tracking-wider">
                            {art.category.replace(/-/g, ' ')}
                          </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors leading-snug">
                            {art.title}
                          </h3>
                          <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-3 mb-4 flex-1 leading-relaxed">
                            {art.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border/40 pt-3">
                            <span className="flex items-center gap-1"><HiClock /> {art.readTime} min read</span>
                            <span className="flex items-center gap-1"><HiEye /> {art.views.toLocaleString()}</span>
                            <span>{new Date(art.publishedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-2 text-center py-16 glass-card rounded-2xl border border-light-border dark:border-dark-border">
                  <p className="text-light-muted dark:text-dark-muted text-sm mb-4">
                    No technical guides found matching your current filter.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCat('all')
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
