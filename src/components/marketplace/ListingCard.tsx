import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiStar, HiHeart, HiEye, HiBadgeCheck, HiClock, HiSparkles } from 'react-icons/hi'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { toggleFavorite } from '@/redux/slices/favoritesSlice'
import { cn } from '@/utils'

interface ListingCardProps {
  item: {
    id: string
    title: string
    description: string
    thumbnail?: string
    category: string
    price: number
    currency: string
    priceType?: string
    seller: { name: string; verified?: boolean }
    rating: number
    likes: number
    views: number
    isFeatured?: boolean
    deliveryTime?: string
    features?: string[]
  }
  index?: number
}

export default function ListingCard({ item, index = 0 }: ListingCardProps) {
  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector((s) => s.favorites.items.map((f) => f.listingId))
  const isFav = favoriteIds.includes(item.id)

  const categoryLabel = item.category.replace(/-/g, ' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative"
    >
      {/* Glow border on hover */}
      <div className="absolute -inset-0.5 rounded-[20px] bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/30 group-hover:via-secondary-500/20 group-hover:to-accent-500/20 blur transition-all duration-500 pointer-events-none" />

      <Link to={`/marketplace/${item.id}`} className="block h-full relative z-10">
        <div className="relative h-full flex flex-col overflow-hidden rounded-[18px] bg-dark-card/90 border border-white/8 group-hover:border-white/20 shadow-lg group-hover:shadow-[0_12px_40px_rgba(0,102,255,0.15)] transition-all duration-400 backdrop-blur-sm">

          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={item.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80'}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              loading="lazy"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-card/80 via-transparent to-transparent" />

            {/* Shimmer sweep on hover */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />

            {/* Featured badge */}
            {item.isFeatured && (
              <span className="absolute top-2.5 left-2.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-dark-bg"
                style={{ background: 'linear-gradient(90deg, #00D4AA, #0066FF)' }}>
                <HiSparkles className="w-3 h-3" /> Featured
              </span>
            )}
            {/* Category badge */}
            <span className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/55 text-white backdrop-blur-sm text-[10px] capitalize border border-white/10">
              {categoryLabel}
            </span>

            {/* Favorite button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                dispatch(toggleFavorite(item.id))
              }}
              className={cn(
                'absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center',
                'backdrop-blur-md border transition-all duration-200',
                isFav
                  ? 'bg-red-500/25 border-red-400/40 text-red-400 scale-110'
                  : 'bg-black/40 border-white/10 text-white/60 hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/15 hover:scale-110'
              )}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HiHeart className={cn('w-4 h-4 transition-transform', isFav && 'fill-red-400 scale-110')} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Seller row */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0"
                style={{ background: 'linear-gradient(135deg, #0066FF, #7C3AED)' }}>
                {item.seller.name[0]}
              </div>
              <span className="text-xs text-dark-muted truncate flex items-center gap-1">
                {item.seller.name}
                {item.seller.verified && <HiBadgeCheck className="text-accent-400 w-3.5 h-3.5 shrink-0" />}
              </span>
            </div>

            <h3 className="font-display font-bold text-sm text-dark-text mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors leading-snug flex-1">
              {item.title}
            </h3>

            {/* Delivery time */}
            {item.deliveryTime && (
              <div className="flex items-center gap-1 text-[10px] text-dark-muted mb-3">
                <HiClock className="w-3 h-3 text-accent-400" />
                <span>{item.deliveryTime}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/8 pt-3 mt-auto">
              <div>
                <span className="font-display font-black text-sm text-accent-400 group-hover:text-accent-300 transition-colors">
                  {item.currency} {item.price.toLocaleString()}
                </span>
                {item.priceType === 'negotiable' && (
                  <span className="text-[10px] text-dark-muted block">Negotiable</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-dark-muted">
                <span className="flex items-center gap-0.5 text-yellow-400 font-semibold">
                  <HiStar className="w-3 h-3 fill-yellow-400" />
                  {item.rating}
                </span>
                <span className="flex items-center gap-0.5">
                  <HiEye className="w-3 h-3" />
                  {item.views > 999 ? `${(item.views / 1000).toFixed(1)}k` : item.views}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
