import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  HiStar,
  HiBadgeCheck,
  HiClock,
  HiLocationMarker,
  HiMail,
  HiGlobe,
  HiArrowLeft,
  HiShoppingBag,
  HiUserGroup,
  HiCheckCircle,
} from 'react-icons/hi'
import { SELLER_PROFILES, MARKET_LISTINGS } from '@/data/mockDatabase'
import ListingCard from '@/components/marketplace/ListingCard'
import ContactSellerModal from '@/components/marketplace/ContactSellerModal'

export default function SellerProfilePage() {
  const { id } = useParams()
  const seller = SELLER_PROFILES.find((s) => s.id === id) || SELLER_PROFILES[0]
  const sellerListings = MARKET_LISTINGS.filter(
    (item) => item.seller.name === seller.displayName || item.seller.id === seller.id
  )

  const [contactModalOpen, setContactModalOpen] = useState(false)

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

        {/* PROFILE HEADER CARD */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-light-border dark:border-dark-border shadow-xl mb-10 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 bg-gradient-primary p-1 shadow-lg">
                <img
                  src={seller.avatar}
                  alt={seller.displayName}
                  className="w-full h-full object-cover rounded-full bg-dark-card"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-light-text dark:text-dark-text">
                    {seller.displayName}
                  </h1>
                  {seller.verified && (
                    <span className="badge-accent badge text-xs flex items-center gap-1">
                      <HiBadgeCheck className="w-4 h-4" /> Verified Seller
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-light-muted dark:text-dark-muted">
                  {seller.location && (
                    <span className="flex items-center gap-1">
                      <HiLocationMarker /> {seller.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <HiClock /> Response Time: <strong>{seller.responseTime}</strong>
                  </span>
                  <span>Member since {seller.memberSince}</span>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-1 text-sm font-bold text-yellow-500">
                    <HiStar className="fill-yellow-500 w-4 h-4" />
                    <span>{seller.rating}</span>
                    <span className="text-xs text-light-muted dark:text-dark-muted font-normal">
                      ({seller.totalReviews} reviews)
                    </span>
                  </div>
                  <span className="text-light-border dark:text-dark-border">•</span>
                  <span className="text-xs font-semibold text-light-text dark:text-dark-text">
                    {seller.completedOrders || 50}+ Orders Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setContactModalOpen(true)}
                className="btn-primary btn-md gap-2"
              >
                <HiMail className="w-5 h-5" /> Contact Seller
              </button>
            </div>
          </div>

          {/* BIO & SKILLS */}
          <div className="mt-8 pt-6 border-t border-light-border dark:border-dark-border/60 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text">
                About {seller.displayName}
              </h3>
              <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                {seller.bio}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text">
                Skills & Expertise
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {seller.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="badge bg-secondary-500/10 text-secondary-500 text-xs py-1 px-2.5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVE LISTINGS GRID */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text flex items-center gap-2">
              <HiShoppingBag className="text-primary-500" />
              <span>Active Services & Listings ({sellerListings.length})</span>
            </h2>
          </div>

          {sellerListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sellerListings.map((item, index) => (
                <ListingCard key={item.id} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-8 text-center border border-light-border dark:border-dark-border">
              <p className="text-sm text-light-muted dark:text-dark-muted">
                This seller has no active listings currently.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CONTACT MODAL */}
      <ContactSellerModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        sellerName={seller.displayName}
        listingTitle={`Inquiry to ${seller.displayName}`}
      />
    </div>
  )
}
