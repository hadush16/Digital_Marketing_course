import { HiChartBar, HiEye, HiHeart, HiChatAlt2, HiShoppingBag, HiTrendingUp } from 'react-icons/hi'

export default function SellerAnalyticsPage() {
  const analyticsData = [
    { label: 'Total Listing Views', value: '12,450', change: '+18.4%', icon: HiEye, color: 'text-primary-500 bg-primary-500/10' },
    { label: 'Saved Favorites', value: '430', change: '+12.1%', icon: HiHeart, color: 'text-red-500 bg-red-500/10' },
    { label: 'Buyer Inquiries', value: '86', change: '+24.5%', icon: HiChatAlt2, color: 'text-secondary-500 bg-secondary-500/10' },
    { label: 'Active Listings', value: '12', change: '+2', icon: HiShoppingBag, color: 'text-accent-500 bg-accent-500/10' },
  ]

  const topPerforming = [
    { title: 'Facebook Page — 50K Followers', category: 'Facebook Pages', views: 2300, inquiries: 24, conversion: '10.4%' },
    { title: 'Professional Logo Design Package', category: 'Logo Design', views: 1200, inquiries: 32, conversion: '26.6%' },
    { title: 'YouTube Channel — 10K Subscribers', category: 'YouTube Channels', views: 5600, inquiries: 18, conversion: '3.2%' },
    { title: 'TikTok Account — 30K Followers', category: 'TikTok Accounts', views: 1800, inquiries: 12, conversion: '6.6%' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text flex items-center gap-2">
          <HiChartBar className="text-secondary-500" /> Seller Analytics & Metrics
        </h1>
        <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
          Monitor views, inquiry rates, conversion metrics, and listing performance.
        </p>
      </div>

      {/* STATS WIDGETS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData.map((st) => (
          <div
            key={st.label}
            className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-light-muted dark:text-dark-muted block mb-1 font-semibold">{st.label}</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-black text-2xl text-light-text dark:text-dark-text">{st.value}</span>
                <span className="text-[10px] font-bold text-green-500 flex items-center gap-0.5">
                  <HiTrendingUp className="w-3 h-3" /> {st.change}
                </span>
              </div>
            </div>
            <div className={`p-3.5 rounded-2xl ${st.color}`}>
              <st.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* TOP PERFORMING LISTINGS TABLE */}
      <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-sm">
        <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-4">
          Top Performing Marketplace Listings
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-light-muted dark:text-dark-muted">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border/40 text-light-text dark:text-dark-text font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Listing Title</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Views</th>
                <th className="pb-3 px-4">Inquiries</th>
                <th className="pb-3 pl-4 text-right">Inquiry Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border/40">
              {topPerforming.map((row, idx) => (
                <tr key={idx} className="hover:bg-light-border/20 dark:hover:bg-dark-border/20">
                  <td className="py-4 pr-4 font-semibold text-light-text dark:text-dark-text">
                    {row.title}
                  </td>
                  <td className="py-4 px-4 text-xs">{row.category}</td>
                  <td className="py-4 px-4 font-bold">{row.views.toLocaleString()}</td>
                  <td className="py-4 px-4 font-bold text-secondary-500">{row.inquiries}</td>
                  <td className="py-4 pl-4 text-right font-bold text-green-500">{row.conversion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
