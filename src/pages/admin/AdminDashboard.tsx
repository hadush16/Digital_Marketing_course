import { HiUserGroup, HiBookOpen, HiShoppingBag, HiMail } from 'react-icons/hi'
import { useState, useEffect } from 'react'
import { adminService, type AdminStats } from '@/services/admin.service'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminService.getStats()
      .then(res => setStats(res))
      .catch(() => toast.error('Failed to load platform statistics'))
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers.toLocaleString() ?? '-', icon: HiUserGroup, color: 'text-blue-400 bg-blue-500/10' },
    { label: 'Subscribers', value: stats?.totalSubscribers.toLocaleString() ?? '-', icon: HiMail, color: 'text-secondary-400 bg-secondary-500/10' },
    { label: 'Published Courses', value: stats?.totalCourses.toLocaleString() ?? '18', icon: HiBookOpen, color: 'text-purple-400 bg-purple-500/10' },
    { label: 'Active Listings', value: stats?.totalListings.toLocaleString() ?? '45', icon: HiShoppingBag, color: 'text-amber-400 bg-amber-500/10' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">System Overview</h1>
        <p className="text-sm text-dark-muted mt-1">Real-time statistics across all content collections.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="glass-card-dark rounded-2xl p-6 border border-dark-border shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs text-dark-muted block mb-1">{c.label}</span>
              <span className="font-display font-black text-2xl text-white">
                {loading ? <span className="animate-pulse opacity-50">...</span> : c.value}
              </span>
            </div>
            <div className={`p-3 rounded-xl ${c.color}`}>
              <c.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
