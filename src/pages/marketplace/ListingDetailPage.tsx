import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiStar, HiHeart, HiEye, HiBadgeCheck, HiMail, HiPhone, HiChatAlt } from 'react-icons/hi'

import { MARKET_LISTINGS } from '@/data/mockDatabase'

export default function ListingDetailPage() {
  const { id } = useParams()
  const DETAIL_MOCK = MARKET_LISTINGS.find((item) => item.id === id)

  const [likes, setLikes] = useState(DETAIL_MOCK?.likes || 0)
  const [isLiked, setIsLiked] = useState(false)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
    } else {
      setLikes(likes + 1)
    }
    setIsLiked(!isLiked)
  }

  if (!DETAIL_MOCK) {
    return (
      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
          <Link to="/marketplace" className="btn-primary btn-md">Back to Marketplace</Link>
        </div>
      </div>
    )
  }

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setMessage('')
    }, 3000)
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl overflow-hidden border border-light-border dark:border-dark-border p-2">
              <div className="aspect-video rounded-2xl overflow-hidden relative">
                <img
                  src={DETAIL_MOCK.thumbnail}
                  alt={DETAIL_MOCK.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <span className="badge bg-secondary-500/20 text-secondary-600 border border-secondary-500/30 capitalize">
                {DETAIL_MOCK.category.replace(/-/g, ' ')}
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-light-text dark:text-dark-text leading-tight">
                {DETAIL_MOCK.title}
              </h1>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-light-muted dark:text-dark-muted py-3 border-y border-light-border dark:border-dark-border/40">
                <span className="flex items-center gap-1.5 text-yellow-500"><HiStar className="fill-yellow-500" /> {DETAIL_MOCK.rating} Rating</span>
                <span className="flex items-center gap-1.5"><HiEye /> {DETAIL_MOCK.views.toLocaleString()} views</span>
                <button onClick={handleLike} className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                  <HiHeart className={isLiked ? 'text-red-500 fill-red-500' : ''} /> {likes} likes
                </button>
              </div>

              {/* Description */}
              <div className="pt-2">
                <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3">Description</h3>
                <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                  {DETAIL_MOCK.description}
                </p>
              </div>
            </div>
          </div>

          {/* Pricing & Contact Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Price Box */}
            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-lg">
              <span className="text-xs text-light-muted dark:text-dark-muted font-bold uppercase tracking-wider block mb-1">Asking Price</span>
              <div className="font-display font-black text-3xl text-secondary-500 mb-6">
                {DETAIL_MOCK.currency} {DETAIL_MOCK.price.toLocaleString()}
              </div>

              {/* Seller info */}
              <div className="flex items-center gap-3 border-t border-light-border dark:border-dark-border/40 pt-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold font-display">
                  {DETAIL_MOCK.seller.name[0]}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text flex items-center gap-1.5">
                    {DETAIL_MOCK.seller.name}
                    {DETAIL_MOCK.seller.verified && <HiBadgeCheck className="text-accent-500" />}
                  </h4>
                  <p className="text-[10px] text-light-muted">Member since {DETAIL_MOCK.seller.joined}</p>
                </div>
              </div>

              {/* Contact Seller Form */}
              <div className="space-y-4">
                <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text">Send Offer/Inquiry</h4>
                {submitted && (
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-xs font-semibold">
                    Message sent! The seller will contact you.
                  </div>
                )}
                <form onSubmit={handleContact} className="space-y-3">
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask details, check page proof or send a custom offer..."
                    className="input h-24 resize-none"
                  />
                  <button type="submit" className="btn-secondary btn-md w-full flex items-center justify-center gap-2">
                    <HiChatAlt className="w-5 h-5" /> Send Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
