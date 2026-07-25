import { HiPlus } from 'react-icons/hi'

export default function MyListingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-light-text dark:text-dark-text">My Marketplace Listings</h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1">
            Manage your ads, channels, services, and sales.
          </p>
        </div>
        <button className="btn-primary btn-sm flex items-center gap-1.5 whitespace-nowrap">
          <HiPlus /> Create Listing
        </button>
      </div>

      <div className="glass-card rounded-2xl border border-light-border dark:border-dark-border p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-light-muted dark:text-dark-muted">
            <thead>
              <tr className="border-b border-light-border dark:border-dark-border/40 text-light-text dark:text-dark-text font-bold text-xs uppercase tracking-wider">
                <th className="pb-3 pr-4">Item details</th>
                <th className="pb-3 px-4">Category</th>
                <th className="pb-3 px-4">Price</th>
                <th className="pb-3 px-4">Status</th>
                <th className="pb-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-border dark:divide-dark-border/40">
              <tr>
                <td className="py-4 pr-4 font-semibold text-light-text dark:text-dark-text">Facebook Page — 50K Followers</td>
                <td className="py-4 px-4 text-xs">Facebook Pages</td>
                <td className="py-4 px-4 font-bold">25,000 ETB</td>
                <td className="py-4 px-4"><span className="badge-success badge">Active</span></td>
                <td className="py-4 pl-4 text-right space-x-2">
                  <button className="text-xs font-semibold text-primary-500 hover:underline">Edit</button>
                  <button className="text-xs font-semibold text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
