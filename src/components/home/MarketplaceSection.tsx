import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiArrowRight, HiStar, HiHeart } from 'react-icons/hi'
import { FiExternalLink } from 'react-icons/fi'

const LISTINGS = [
  {
    id: '1', title: 'Facebook Page — 50K Followers (Ethiopia)',
    description: 'Active Facebook page with 50K+ genuine Ethiopian followers. Perfect for business promotion.',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    category: 'facebook-pages', price: 25000, currency: 'ETB',
    seller: { name: 'TechMarket ET', verified: true },
    rating: 4.8, likes: 145, views: 2300,
  },
  {
    id: '2', title: 'Professional Logo Design Package',
    description: '3 unique logo concepts + unlimited revisions + all files. 24-48hr delivery.',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    category: 'logo-design', price: 500, currency: 'ETB',
    seller: { name: 'DesignPro Studio', verified: true },
    rating: 5.0, likes: 89, views: 1200,
  },
  {
    id: '3', title: 'YouTube Channel — 10K Subscribers + Monetized',
    description: 'Monetized YouTube channel, Tech niche, 10K subs, 4000+ watch hours.',
    thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    category: 'youtube-channels', price: 80000, currency: 'ETB',
    seller: { name: 'YouTubePro', verified: false },
    rating: 4.6, likes: 230, views: 5600,
  },
  {
    id: '4', title: 'TikTok Account — 30K Followers (Tech)',
    description: 'Tech-focused TikTok account with 30K followers and high engagement rate.',
    thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
    category: 'tiktok-accounts', price: 15000, currency: 'ETB',
    seller: { name: 'SocialBoost ET', verified: true },
    rating: 4.7, likes: 67, views: 1800,
  },
]

export default function MarketplaceSection() {
  return (
    <section className="section bg-dark-surface dark:bg-dark-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary-500/50 to-transparent" />
      <div className="absolute inset-0 mesh-bg opacity-30" />

      <div className="container-custom relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="badge-secondary badge mb-4">🛍️ Marketplace</div>
            <h2 className="section-title mb-3 text-white">
              Buy & Sell{' '}
              <span className="gradient-text">Digital Services</span>
            </h2>
            <p className="section-subtitle text-dark-muted">
              Find YouTube channels, Facebook pages, design services, and more in our digital marketplace.
            </p>
          </div>
          <Link
            to="/marketplace"
            id="marketplace-view-all"
            className="btn-outline btn-md shrink-0 group border-secondary-500/50 text-secondary-400 hover:bg-secondary-500 hover:text-white hover:border-secondary-500"
          >
            Browse Marketplace
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LISTINGS.map((listing, i) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link to={`/marketplace/${listing.id}`} className="block group">
                <div className="glass-card-dark rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-secondary-500/30 transition-all duration-300">
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={listing.thumbnail}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/70 to-transparent" />
                    <div className="absolute top-2 right-2">
                      <button className="w-7 h-7 rounded-full bg-dark-bg/60 backdrop-blur flex items-center justify-center text-dark-muted hover:text-red-400 transition-colors">
                        <HiHeart className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span className="badge bg-secondary-500/20 text-secondary-400 border border-secondary-500/30 text-xs">
                        {listing.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-display font-bold text-sm text-white line-clamp-2 group-hover:text-secondary-400 transition-colors">
                        {listing.title}
                      </h3>
                      <FiExternalLink className="w-4 h-4 text-dark-muted shrink-0 mt-0.5" />
                    </div>
                    <p className="text-xs text-dark-muted line-clamp-2 mb-3">{listing.description}</p>

                    {/* Seller */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                        {listing.seller.name[0]}
                      </div>
                      <span className="text-xs text-dark-muted">{listing.seller.name}</span>
                      {listing.seller.verified && (
                        <span className="text-xs text-accent-400">✓</span>
                      )}
                    </div>

                    {/* Price + Rating */}
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-secondary-400">
                        {listing.currency} {listing.price.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-yellow-400">
                        <HiStar className="w-3.5 h-3.5" /> {listing.rating}
                      </span>
                    </div>
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
