import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiStar, HiHeart, HiEye, HiBadgeCheck, HiClock } from 'react-icons/hi'
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative"
    >
      <Link to={`/marketplace/${item.id}`} className="block h-full">
        <div className="card-hover h-full flex flex-col overflow-hidden">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <img
              src={item.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80'}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {/* Overlays */}
            {item.isFeatured && (
              <span className="absolute top-3 left-3 badge bg-accent-500/90 text-dark-bg text-[10px] font-black uppercase tracking-wider">
                ⭐ Featured
              </span>
            )}
            <span className="absolute bottom-3 left-3 badge bg-black/60 text-white backdrop-blur-sm text-[10px] capitalize border-0">
              {categoryLabel}
            </span>
            {/* Favorite */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                dispatch(toggleFavorite(item.id))
              }}
              className={cn(
                'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center',
                'bg-black/50 backdrop-blur-sm border border-white/10',
                'transition-all duration-200 hover:scale-110',
                isFav ? 'text-red-400' : 'text-white/70 hover:text-red-400'
              )}
              title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
              <HiHeart className={cn('w-4 h-4', isFav && 'fill-red-400')} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-1">
            {/* Seller row */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-[10px] shrink-0">
                {item.seller.name[0]}
              </div>
              <span className="text-xs text-light-muted dark:text-dark-muted truncate flex items-center gap-1">
                {item.seller.name}
                {item.seller.verified && <HiBadgeCheck className="text-accent-500 w-3.5 h-3.5 shrink-0" />}
              </span>
            </div>

            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors leading-snug flex-1">
              {item.title}
            </h3>

            {/* Delivery time */}
            {item.deliveryTime && (
              <div className="flex items-center gap-1 text-[10px] text-light-muted dark:text-dark-muted mb-3">
                <HiClock className="w-3 h-3" />
                <span>{item.deliveryTime}</span>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-light-border dark:border-dark-border pt-3 mt-auto">
              <div>
                <span className="font-display font-black text-sm text-secondary-500">
                  {item.currency} {item.price.toLocaleString()}
                </span>
                {item.priceType === 'negotiable' && (
                  <span className="text-[10px] text-light-muted dark:text-dark-muted block">Negotiable</span>
                )}
              </div>
              <div className="flex items-center gap-2 text-[10px] text-light-muted dark:text-dark-muted">
                <span className="flex items-center gap-0.5 text-yellow-500 font-semibold">
                  <HiStar className="w-3 h-3 fill-yellow-500" />
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
