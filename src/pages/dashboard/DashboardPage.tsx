import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { HiBookOpen, HiShoppingBag, HiHeart, HiStar } from 'react-icons/hi'

export default function DashboardPage() {
  const { user } = useAuth()

  const stats = [
    { label: 'Enrolled Courses', value: '2', icon: HiBookOpen, color: 'text-primary-500 bg-primary-500/10' },
    { label: 'Active Listings', value: '1', icon: HiShoppingBag, color: 'text-secondary-500 bg-secondary-500/10' },
    { label: 'Liked Items', value: '12', icon: HiHeart, color: 'text-red-500 bg-red-500/10' },
    { label: 'Average Ratings', value: '4.8', icon: HiStar, color: 'text-yellow-500 bg-yellow-500/10' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
          Monitor your study path, check active ads, and coordinate marketing orders.
        </p>
      </div>

      {/* Stats Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st) => (
          <div key={st.label} className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs text-light-muted block mb-1">{st.label}</span>
              <span className="font-display font-black text-2xl text-light-text dark:text-dark-text">{st.value}</span>
            </div>
            <div className={`p-3 rounded-xl ${st.color}`}>
              <st.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Studies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm">
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-4">
            Recent Enrolled Courses
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-10 rounded-lg overflow-hidden shrink-0">
                <img src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=120&q=80" alt="FB" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-light-text dark:text-dark-text truncate">Facebook Marketing Mastery</h4>
                <div className="w-full bg-light-border dark:bg-dark-border/40 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-primary-500 h-full w-[35%]" />
                </div>
              </div>
              <span className="text-xs font-semibold text-light-muted shrink-0">35%</span>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm">
          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-4">
            Your Active Marketplace Items
          </h3>
          <div className="space-y-4">
            <div className="flex gap-4 items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-light-text dark:text-dark-text">Facebook Page — 50K Followers</h4>
                <p className="text-xs text-light-muted">Price: 25,000 ETB</p>
              </div>
              <span className="badge-success badge">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
