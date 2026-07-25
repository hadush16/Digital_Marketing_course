import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiDownload, HiStar, HiEye } from 'react-icons/hi'
import { FaMobileAlt } from 'react-icons/fa'

const solutions = [
  {
    id: '1', slug: 'samsung-frp-bypass-2024', title: 'Samsung FRP Bypass — All Models 2024',
    shortDescription: 'Complete guide to bypass Google account verification on all Samsung models without a PC.',
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    category: 'frp-bypass', brand: 'Samsung', tools: ['ADB', 'Samsung Tool Pro'],
    rating: 4.9, totalRatings: 480, views: 12300,
  },
  {
    id: '2', slug: 'xiaomi-imei-repair-guide', title: 'Xiaomi IMEI Repair — MTK & Qualcomm',
    shortDescription: 'Step-by-step IMEI repair for Xiaomi phones using UFI Box and Infinity CM2.',
    thumbnail: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=800&q=80',
    category: 'imei-repair', brand: 'Xiaomi', tools: ['UFI Box', 'Infinity CM2'],
    rating: 4.8, totalRatings: 220, views: 8700,
  },
  {
    id: '3', slug: 'sp-flash-tool-complete-guide', title: 'SP Flash Tool — Complete Flashing Guide',
    shortDescription: 'Flash stock ROM, fix bootloop, and repair software issues on MTK Android phones.',
    thumbnail: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80',
    category: 'phone-flashing', tools: ['SP Flash Tool', 'MTK Tools'],
    rating: 4.9, totalRatings: 650, views: 21000,
  },
  {
    id: '4', slug: 'lcd-replacement-guide', title: 'LCD Screen Replacement — Hardware Guide',
    shortDescription: 'Professional LCD replacement and diagnostics guide for all major smartphone brands.',
    thumbnail: 'https://images.unsplash.com/photo-1612831455359-970e23a1e4e9?w=800&q=80',
    category: 'lcd-repair', tools: ['Screwdrivers', 'Heat Gun', 'Glue'],
    rating: 4.7, totalRatings: 180, views: 6400,
  },
]

export default function MobileSolutionsSection() {
  return (
    <section className="section bg-dark-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="absolute inset-0 mesh-bg opacity-50" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="badge-accent badge mb-4">
              <FaMobileAlt className="w-3 h-3" /> Mobile Solutions
            </div>
            <h2 className="section-title mb-3 text-white">
              Fix Any Phone with{' '}
              <span className="gradient-text-accent">Expert Guides</span>
            </h2>
            <p className="section-subtitle text-dark-muted">
              Video tutorials, downloads, and step-by-step instructions for every mobile repair challenge.
            </p>
          </div>
          <Link
            to="/mobile-solutions"
            id="mobile-solutions-view-all"
            className="btn-outline btn-md shrink-0 group border-accent-500/50 text-accent-400 hover:bg-accent-500 hover:text-dark-bg hover:border-accent-500"
          >
            All Solutions
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/mobile-solutions/${solution.slug}`} className="block group">
                <div className="glass-card-dark rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-accent-500/30 transition-all duration-300">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={solution.thumbnail}
                      alt={solution.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="badge bg-accent-500/20 text-accent-400 border border-accent-500/30 text-xs">
                        {solution.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-bold text-sm text-white mb-2 line-clamp-2 group-hover:text-accent-400 transition-colors">
                      {solution.title}
                    </h3>
                    <p className="text-xs text-dark-muted line-clamp-2 mb-4">
                      {solution.shortDescription}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {solution.tools.slice(0, 2).map((tool) => (
                        <span key={tool} className="px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-xs text-dark-muted">
                          {tool}
                        </span>
                      ))}
                      {solution.tools.length > 2 && (
                        <span className="px-2 py-0.5 rounded-md bg-dark-bg border border-dark-border text-xs text-dark-muted">
                          +{solution.tools.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-dark-muted">
                      <span className="flex items-center gap-1 text-yellow-400">
                        <HiStar className="w-3.5 h-3.5" /> {solution.rating}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiEye className="w-3.5 h-3.5" /> {solution.views.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-accent-400">
                        <HiDownload className="w-3.5 h-3.5" /> Download
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Categories grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {[
            'FRP Bypass', 'IMEI Repair', 'Phone Flashing',
            'Unlocking', 'Software Repair', 'Hardware Repair',
          ].map((cat, i) => (
            <Link
              key={cat}
              to={`/mobile-solutions?category=${cat.toLowerCase().replace(/ /g, '-')}`}
              className="flex items-center justify-center px-3 py-3 rounded-xl border border-dark-border bg-dark-card hover:border-accent-500/50 hover:bg-accent-500/10 text-xs font-medium text-dark-muted hover:text-accent-400 transition-all duration-200 text-center"
            >
              {cat}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
