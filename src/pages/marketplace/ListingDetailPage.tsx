import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  HiStar,
  HiHeart,
  HiEye,
  HiBadgeCheck,
  HiMail,
  HiPhone,
  HiChatAlt,
  HiShare,
  HiCheck,
  HiClock,
  HiArrowLeft,
  HiSparkles,
} from 'react-icons/hi'
import { MARKET_LISTINGS, SELLER_PROFILES } from '@/data/mockDatabase'
import ListingCard from '@/components/marketplace/ListingCard'
import ContactSellerModal from '@/components/marketplace/ContactSellerModal'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { toggleFavorite } from '@/redux/slices/favoritesSlice'

export default function ListingDetailPage() {
  const { id } = useParams()
  const listing = MARKET_LISTINGS.find((item) => item.id === id) || MARKET_LISTINGS[0]

  const dispatch = useAppDispatch()
  const favoriteIds = useAppSelector((s) => s.favorites.items.map((f) => f.listingId))
  const isFav = favoriteIds.includes(listing.id)

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const sellerProfile = SELLER_PROFILES.find((s) => s.displayName === listing.seller.name) || SELLER_PROFILES[0]

  const images = listing.images && listing.images.length > 0 ? listing.images : [listing.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80']

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const relatedListings = MARKET_LISTINGS.filter(
    (item) => item.id !== listing.id && (item.category === listing.category || item.seller.name === listing.seller.name)
  ).slice(0, 3)

  return (
    <div className="py-8 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-6xl">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 text-xs font-semibold text-light-muted dark:text-dark-muted hover:text-primary-500 transition-colors"
          >
            <HiArrowLeft className="w-4 h-4" /> Back to Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="glass-card rounded-3xl overflow-hidden border border-light-border dark:border-dark-border p-2 shadow-lg">
                <div className="aspect-video rounded-2xl overflow-hidden relative bg-black/40">
                  <img
                    src={images[activeImageIndex]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                  {listing.isFeatured && (
                    <span className="absolute top-4 left-4 badge bg-accent-500 text-dark-bg font-black uppercase text-xs">
                      ⭐ Featured Listing
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails row if multiple */}
              {images.length > 1 && (
                <div className="flex items-center gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-primary-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge bg-secondary-500/20 text-secondary-600 border border-secondary-500/30 capitalize text-xs">
                  {listing.category.replace(/-/g, ' ')}
                </span>
                {listing.deliveryTime && (
                  <span className="badge bg-light-border dark:bg-dark-border text-light-muted dark:text-dark-muted text-xs flex items-center gap-1">
                    <HiClock className="w-3.5 h-3.5" /> Delivery: {listing.deliveryTime}
                  </span>
                )}
              </div>

              <h1 className="font-display font-black text-2xl sm:text-4xl text-light-text dark:text-dark-text leading-tight">
                {listing.title}
              </h1>

              {/* Stats & Actions row */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-light-border dark:border-dark-border/60 text-xs text-light-muted dark:text-dark-muted">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5 text-yellow-500 font-semibold">
                    <HiStar className="fill-yellow-500 w-4 h-4" /> {listing.rating} Rating
                  </span>
                  <span className="flex items-center gap-1.5">
                    <HiEye className="w-4 h-4" /> {listing.views.toLocaleString()} views
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(toggleFavorite(listing.id))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                      isFav ? 'bg-red-500/10 text-red-500 border-red-500/30 font-bold' : 'border-light-border dark:border-dark-border hover:text-red-500'
                    }`}
                  >
                    <HiHeart className={isFav ? 'fill-red-500' : ''} /> {isFav ? 'Saved' : 'Favorite'}
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-light-border dark:border-dark-border hover:text-primary-500 transition-colors"
                  >
                    <HiShare /> {copied ? 'Link Copied!' : 'Share'}
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 space-y-3">
                <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text">
                  Service / Item Description
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {/* Features List */}
              {listing.features && listing.features.length > 0 && (
                <div className="pt-6 border-t border-light-border dark:border-dark-border/60">
                  <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-4">
                    What's Included / Key Features
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {listing.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border">
                        <HiCheck className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                        <span className="text-xs text-light-text dark:text-dark-text font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="pt-8 border-t border-light-border dark:border-dark-border/60 space-y-4">
              <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text">
                Buyer Reviews ({listing.rating})
              </h3>

              <div className="space-y-3">
                <div className="glass-card rounded-2xl p-4 border border-light-border dark:border-dark-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-light-text dark:text-dark-text">Dawit M.</span>
                    <span className="flex items-center gap-1 text-xs text-yellow-500"><HiStar className="fill-yellow-500" /> 5.0</span>
                  </div>
                  <p className="text-xs text-light-muted dark:text-dark-muted">
                    Great service and fast communication. Transfer went smoothly with complete proof provided.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* SIDEBAR: PRICE & SELLER CARD */}
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            {/* Price Box */}
            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-xl space-y-6">
              <div>
                <span className="text-xs text-light-muted dark:text-dark-muted font-bold uppercase tracking-wider block mb-1">
                  Asking Price
                </span>
                <div className="font-display font-black text-3xl text-secondary-500">
                  {listing.currency} {listing.price.toLocaleString()}
                </div>
                {listing.priceType === 'negotiable' && (
                  <span className="badge-warning badge text-[10px] mt-2">Open to Offers</span>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="btn-primary btn-md w-full gap-2 text-sm"
                >
                  <HiChatAlt className="w-5 h-5" /> Contact Seller
                </button>
                <button
                  onClick={() => dispatch(toggleFavorite(listing.id))}
                  className="btn-outline btn-md w-full gap-2 text-sm"
                >
                  <HiHeart className={isFav ? 'text-red-500 fill-red-500' : ''} />
                  {isFav ? 'Remove from Saved' : 'Save to Favorites'}
                </button>
              </div>

              {/* Seller Profile Card */}
              <div className="border-t border-light-border dark:border-dark-border/60 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={sellerProfile.avatar}
                    alt={listing.seller.name}
                    className="w-12 h-12 rounded-full object-cover bg-gradient-primary p-0.5"
                  />
                  <div className="min-w-0">
                    <Link
                      to={`/marketplace/seller/${sellerProfile.id}`}
                      className="font-display font-bold text-sm text-light-text dark:text-dark-text hover:text-primary-500 transition-colors flex items-center gap-1.5 truncate"
                    >
                      <span>{listing.seller.name}</span>
                      {listing.seller.verified && <HiBadgeCheck className="text-accent-500 shrink-0 w-4 h-4" />}
                    </Link>
                    <p className="text-[11px] text-light-muted dark:text-dark-muted">
                      Member since {sellerProfile.memberSince || '2023'}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-light-muted dark:text-dark-muted space-y-1.5 pt-2">
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <strong className="text-light-text dark:text-dark-text">{sellerProfile.responseTime}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Listings:</span>
                    <strong className="text-light-text dark:text-dark-text">{sellerProfile.totalListings}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Seller Rating:</span>
                    <strong className="text-yellow-500 font-bold flex items-center gap-0.5">
                      <HiStar className="fill-yellow-500" /> {sellerProfile.rating}
                    </strong>
                  </div>
                </div>

                <Link
                  to={`/marketplace/seller/${sellerProfile.id}`}
                  className="btn-ghost btn-sm w-full text-center text-xs text-primary-500 hover:underline block"
                >
                  View Seller Profile & Other Listings →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED LISTINGS */}
        {relatedListings.length > 0 && (
          <div className="mt-16 pt-12 border-t border-light-border dark:border-dark-border/60">
            <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-6">
              Similar Digital Listings
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedListings.map((item, index) => (
                <ListingCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CONTACT SELLER MODAL */}
      <ContactSellerModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        sellerName={listing.seller.name}
        listingTitle={listing.title}
      />
    </div>
  )
}
