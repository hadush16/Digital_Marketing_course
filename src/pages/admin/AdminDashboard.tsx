import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  HiUserGroup,
  HiBookOpen,
  HiEnvelope,
  HiBriefcase,
  HiSquares2X2,
  HiShare,
  HiPhoto,
  HiInbox,
  HiCheckCircle,
  HiDocumentText,
} from 'react-icons/hi2'
import { agencyService, type AdminOverviewResponse } from '@/services/agency.service'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [data, setData] = useState<AdminOverviewResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agencyService
      .getOverview()
      .then((res) => setData(res.data.data))
      .catch(() => toast.error('Failed to load platform statistics'))
      .finally(() => setLoading(false))
  }, [])

  const stats = data?.stats

  const cards = [
    { label: 'Total Users', value: stats?.totalUsers ?? 0, icon: HiUserGroup, color: 'text-blue-400 bg-blue-500/10', href: '/admin/users' },
    { label: 'Subscribers', value: stats?.totalSubscribers ?? 0, icon: HiEnvelope, color: 'text-secondary-400 bg-secondary-500/10', href: '/admin/subscribers' },
    { label: 'Courses', value: stats?.totalCourses ?? 0, icon: HiBookOpen, color: 'text-purple-400 bg-purple-500/10', href: '/admin/courses' },
    { label: 'Active Services', value: stats?.totalActiveServices ?? 0, icon: HiBriefcase, color: 'text-emerald-400 bg-emerald-500/10', href: '/admin/services' },
    { label: 'Service Categories', value: stats?.totalCategories ?? 0, icon: HiSquares2X2, color: 'text-pink-400 bg-pink-500/10', href: '/admin/service-categories' },
    { label: 'Social Platforms', value: stats?.totalPlatforms ?? 0, icon: HiShare, color: 'text-cyan-400 bg-cyan-500/10', href: '/admin/platforms' },
    { label: 'Portfolio Projects', value: stats?.totalProjects ?? 0, icon: HiPhoto, color: 'text-amber-400 bg-amber-500/10', href: '/admin/portfolio' },
    { label: 'Total Inquiries', value: stats?.totalInquiries ?? 0, sub: stats?.newInquiriesCount ? `${stats.newInquiriesCount} new` : undefined, icon: HiInbox, color: 'text-rose-400 bg-rose-500/10', href: '/admin/inquiries' },
    { label: 'Published Content', value: stats?.publishedContent ?? 0, icon: HiCheckCircle, color: 'text-green-400 bg-green-500/10', href: '/admin/services' },
    { label: 'Draft Content', value: stats?.draftContent ?? 0, icon: HiDocumentText, color: 'text-slate-400 bg-slate-500/10', href: '/admin/services' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-white">System Overview</h1>
        <p className="text-sm text-dark-muted mt-1">
          Real-time database statistics across Ryoit Digital Marketing Agency &amp; Platform collections.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.href}
            className="glass-card-dark rounded-2xl p-5 border border-dark-border hover:border-secondary-500/40 transition-colors shadow-md flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-dark-muted block mb-1">{c.label}</span>
              <span className="font-display font-black text-2xl text-white">
                {loading ? <span className="animate-pulse opacity-50">...</span> : c.value.toLocaleString()}
              </span>
              {c.sub && !loading && (
                <span className="block text-[11px] font-semibold text-rose-400 mt-0.5">{c.sub}</span>
              )}
            </div>
            <div className={`p-3 rounded-xl ${c.color}`}>
              <c.icon className="w-5 h-5" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="glass-card-dark rounded-2xl border border-dark-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-base text-white">Recent Customer Inquiries</h2>
            <Link to="/admin/inquiries" className="text-xs text-secondary-400 hover:underline font-semibold">
              View all →
            </Link>
          </div>
          {loading ? (
            <div className="py-10 text-center text-xs text-dark-muted">Loading inquiries...</div>
          ) : !data?.recentInquiries.length ? (
            <div className="py-10 text-center text-xs text-dark-muted">No inquiries received yet.</div>
          ) : (
            <div className="space-y-3">
              {data.recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-3.5 rounded-xl bg-dark-bg/70 border border-dark-border/70 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{inq.customerName}</p>
                    <p className="text-xs text-dark-muted truncate">
                      {inq.requestedService || 'General Inquiry'} {inq.platform ? `• ${inq.platform}` : ''}
                    </p>
                    <p className="text-xs text-dark-muted/80 mt-1 line-clamp-1">{inq.message}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary-500/20 text-secondary-300 shrink-0">
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Admin Activity */}
        <div className="glass-card-dark rounded-2xl border border-dark-border p-6">
          <h2 className="font-display font-bold text-base text-white mb-4">Recent Admin Activity</h2>
          {loading ? (
            <div className="py-10 text-center text-xs text-dark-muted">Loading activity...</div>
          ) : !data?.recentActivity.length ? (
            <div className="py-10 text-center text-xs text-dark-muted">No recent admin actions logged yet.</div>
          ) : (
            <div className="space-y-2.5">
              {data.recentActivity.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-dark-bg/70 border border-dark-border/70 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <span className="font-bold text-secondary-400 mr-2">{log.action}</span>
                    <span className="text-white font-semibold">{log.entityType}</span>
                    {log.details && <p className="text-dark-muted truncate mt-0.5">{log.details}</p>}
                  </div>
                  <span className="text-[11px] text-dark-muted shrink-0">
                    {new Date(log.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
