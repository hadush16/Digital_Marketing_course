import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  HiChevronLeft,
  HiChevronRight,
  HiSparkles,
  HiStar,
  HiHeart,
  HiBadgeCheck,
  HiArrowRight,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { toggleFavorite } from '@/redux/slices/favoritesSlice'
import { cn } from '@/utils'

interface FeaturedCarouselProps {
  items: Array<{
    id: string
    title: string
    description: string
    thumbnail?: string
    category: string
    price: number
    currency: string
    seller: { name: string; verified?: boolean }
    rating: number
    deliveryTime?: string
    isFeatured?: boolean
  }>
}

export default function FeaturedCarousel({ items }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector((s) => s.favorites.items.map((f) => f.listingId))

  const total = items.length

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }

  // Autoplay timer
  useEffect(() => {
    if (total <= 1) return
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [currentIndex, total])

  if (!items || items.length === 0) return null

  const currentItem = items[currentIndex]
  const isFav = favoriteIds.includes(currentItem.id)

  return (
    <div className="relative mb-12 rounded-3xl overflow-hidden gemini-card p-1">
      {/* Background Aurora Mesh Glow */}
      <div className="absolute inset-0 mesh-bg opacity-50 pointer-events-none" />

      {/* Main Slide Card */}
      <div className="relative z-10 bg-dark-surface/95 dark:bg-dark-card/95 rounded-[22px] p-6 sm:p-8 md:p-10 border border-white/10 overflow-hidden backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Text Details Side */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-gemini text-xs flex items-center gap-1">
                <HiSparkles className="w-3.5 h-3.5 text-accent-400" />
                <span>Featured Gemini Spotlight</span>
              </span>
              <span className="badge bg-secondary-500/20 text-secondary-300 border border-secondary-500/30 text-xs capitalize">
                {currentItem.category.replace(/-/g, ' ')}
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-3"
              >
                <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white leading-snug">
                  {currentItem.title}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                  {currentItem.description}
                </p>

                {/* Seller & Price Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold font-display text-sm shrink-0">
                      {currentItem.seller.name[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white flex items-center gap-1">
                        {currentItem.seller.name}
                        {currentItem.seller.verified && (
                          <HiBadgeCheck className="text-accent-400 w-4 h-4" />
                        )}
                      </h4>
                      <div className="flex items-center gap-1 text-[11px] text-yellow-400">
                        <HiStar className="fill-yellow-400 w-3 h-3" />
                        <span>{currentItem.rating} Seller Rating</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] text-dark-muted block uppercase tracking-wider">
                      Special Offer Price
                    </span>
                    <span className="font-display font-black text-2xl text-accent-400">
                      {currentItem.currency} {currentItem.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex items-center gap-3 pt-4">
                  <Link
                    to={`/marketplace/${currentItem.id}`}
                    className="btn-gemini btn-md text-xs sm:text-sm gap-2"
                  >
                    View Details & Offer <HiArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => dispatch(toggleFavorite(currentItem.id))}
                    className={cn(
                      'p-3 rounded-xl border transition-all duration-200',
                      isFav
                        ? 'bg-red-500/20 border-red-500/40 text-red-400'
                        : 'border-white/10 text-white/70 hover:text-red-400 hover:border-red-400/30'
                    )}
                    title={isFav ? 'Remove from Saved' : 'Save to Favorites'}
                  >
                    <HiHeart className={cn('w-5 h-5', isFav && 'fill-red-400')} />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Image Side */}
          <div className="md:col-span-5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group"
              >
                <img
                  src={
                    currentItem.thumbnail ||
                    'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80'
                  }
                  alt={currentItem.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Carousel Controls Footer */}
        <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/10">
          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all active:scale-95"
              aria-label="Previous slide"
            >
              <HiChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/15 text-white transition-all active:scale-95"
              aria-label="Next slide"
            >
              <HiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
