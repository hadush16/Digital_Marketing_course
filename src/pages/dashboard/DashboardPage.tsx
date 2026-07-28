import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import {
  HiBookOpen,
  HiShoppingBag,
  HiHeart,
  HiStar,
  HiChatAlt2,
  HiPlus,
  HiChartBar,
  HiArrowRight,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import CreateListingModal from '@/components/marketplace/CreateListingModal'

export default function DashboardPage() {
  const { user } = useAuth()
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const stats = [
    { label: 'Active Listings', value: '4', icon: HiShoppingBag, color: 'text-secondary-500 bg-secondary-500/10' },
    { label: 'Buyer Inquiries', value: '12', icon: HiChatAlt2, color: 'text-primary-500 bg-primary-500/10' },
    { label: 'Saved Favorites', value: '8', icon: HiHeart, color: 'text-red-500 bg-red-500/10' },
    { label: 'Seller Rating', value: '4.9', icon: HiStar, color: 'text-yellow-500 bg-yellow-500/10' },
  ]

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-light-border dark:border-dark-border shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-light-text dark:text-dark-text">
            Welcome back, {user?.name || 'Seller'}!
          </h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Manage your digital marketplace listings, check buyer inquiries, and monitor performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCreateModalOpen(true)}
            className="btn-primary btn-md gap-2"
          >
            <HiPlus className="w-5 h-5" /> Post New Service
          </button>
        </div>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => (
          <div
            key={st.label}
            className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-light-muted dark:text-dark-muted block mb-1 font-semibold">
                {st.label}
              </span>
              <span className="font-display font-black text-2xl text-light-text dark:text-dark-text">
                {st.value}
              </span>
            </div>
            <div className={`p-3.5 rounded-2xl ${st.color}`}>
              <st.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/dashboard/my-listings"
          className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-secondary-500/40 transition-all block group"
        >
          <div className="flex items-center justify-between mb-3">
            <HiShoppingBag className="w-8 h-8 text-secondary-500" />
            <HiArrowRight className="w-5 h-5 text-light-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">
            Manage Listings
          </h3>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            Add, edit, or toggle your marketplace services and digital assets.
          </p>
        </Link>

        <Link
          to="/dashboard/messages"
          className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-primary-500/40 transition-all block group"
        >
          <div className="flex items-center justify-between mb-3">
            <HiChatAlt2 className="w-8 h-8 text-primary-500" />
            <HiArrowRight className="w-5 h-5 text-light-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">
            Buyer Inquiries
          </h3>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            Check direct messages and customized offers sent by buyers.
          </p>
        </Link>

        <Link
          to="/dashboard/analytics"
          className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-accent-500/40 transition-all block group"
        >
          <div className="flex items-center justify-between mb-3">
            <HiChartBar className="w-8 h-8 text-accent-500" />
            <HiArrowRight className="w-5 h-5 text-light-muted group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">
            Sales & Analytics
          </h3>
          <p className="text-xs text-light-muted dark:text-dark-muted">
            View total listing impressions, conversion rates, and engagement.
          </p>
        </Link>
      </div>

      {/* Recent Studies & Active Listings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrolled Courses */}
        <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm">
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-4">
            Recent Enrolled Courses
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&q=80"
                  alt="FB"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-light-text dark:text-dark-text truncate">
                  Facebook Marketing Mastery
                </h4>
                <div className="w-full bg-light-border dark:bg-dark-border/40 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary-500 h-full w-[35%]" />
                </div>
              </div>
              <span className="text-xs font-semibold text-light-muted shrink-0">35%</span>
            </div>
          </div>
        </div>

        {/* Active Marketplace Items */}
        <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm">
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-4">
            Active Marketplace Items
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-light-text dark:text-dark-text">
                  Facebook Page — 50K Followers
                </h4>
                <p className="text-xs text-light-muted">Price: 25,000 ETB</p>
              </div>
              <span className="badge-success badge">Active</span>
            </div>
          </div>
        </div>
      </div>

      <CreateListingModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  )
}
