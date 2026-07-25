import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiClock, HiEye } from 'react-icons/hi'

const NEWS = [
  {
    id: '1', slug: 'qualcomm-snapdragon-8-elite-2025', title: 'Qualcomm Snapdragon 8 Elite: Everything You Need to Know',
    excerpt: 'The new Snapdragon 8 Elite brings massive AI improvements and a new CPU architecture that changes mobile repair diagnostics.',
    thumbnail: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80',
    category: 'industry-updates', readTime: 5, views: 4300, publishedAt: '2025-07-15',
  },
  {
    id: '2', slug: 'samsung-odin-new-version', title: 'Samsung Odin 3.14.4 Released — New Flash Features',
    excerpt: 'Samsung releases an updated version of its official flashing tool with support for One UI 6 and improved error recovery.',
    thumbnail: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80',
    category: 'samsung-news', readTime: 3, views: 8900, publishedAt: '2025-07-12',
  },
  {
    id: '3', slug: 'android-15-new-features', title: 'Android 15 Brings Major Security & Repair Mode Updates',
    excerpt: 'Google\'s Android 15 includes a built-in repair mode that wipes user data while keeping the OS for safe diagnostics.',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    category: 'android-updates', readTime: 4, views: 15600, publishedAt: '2025-07-08',
  },
]

const categoryColors: Record<string, string> = {
  'industry-updates': 'badge-primary',
  'samsung-news':     'badge-secondary',
  'android-updates':  'badge-accent',
  'gsm-tools':        'badge-success',
  'apple-news':       'badge-muted',
  'google-news':      'badge-warning',
}

export default function TechNewsSection() {
  return (
    <section className="section bg-light-bg dark:bg-dark-bg">
      <div className="container-custom">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="badge-secondary badge mb-4">📰 Tech News</div>
            <h2 className="section-title mb-3">
              Latest in{' '}
              <span className="gradient-text">Technology</span>
            </h2>
            <p className="section-subtitle">
              Stay updated with GSM tool releases, Android updates, and mobile repair news.
            </p>
          </div>
          <Link
            to="/news"
            id="news-view-all"
            className="btn-outline btn-md shrink-0 group"
          >
            All News <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {NEWS.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/news/${article.slug}`} className="block group card-hover h-full">
                <div className="relative overflow-hidden rounded-t-2xl aspect-video">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`badge ${categoryColors[article.category] ?? 'badge-muted'} text-xs`}>
                      {article.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-3 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted">
                    <span className="flex items-center gap-1">
                      <HiClock className="w-3.5 h-3.5" /> {article.readTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <HiEye className="w-3.5 h-3.5" /> {article.views.toLocaleString()}
                    </span>
                    <span className="ml-auto">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
