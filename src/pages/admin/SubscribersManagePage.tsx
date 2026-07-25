import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { HiSearch, HiTrash, HiChevronLeft, HiChevronRight, HiMail } from 'react-icons/hi'
import { HiArrowDownTray } from 'react-icons/hi2'
import { adminService, type Subscriber } from '@/services/admin.service'
import toast from 'react-hot-toast'

export default function SubscribersManagePage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const fetchSubscribers = useCallback(async () => {
    setLoading(true)
    try {
      const res = await adminService.getSubscribers(page, 20)
      setSubscribers(res.data.data)
      setTotalPages(res.data.pagination.pages)
      setTotal(res.data.pagination.total)
    } catch {
      toast.error('Failed to load subscribers')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => { fetchSubscribers() }, [fetchSubscribers])

  const handleDelete = async (email: string) => {
    try {
      await adminService.deleteSubscriber(email)
      setSubscribers(prev => prev.filter(s => s.email !== email))
      setTotal(t => t - 1)
      setConfirmDelete(null)
      toast.success('Subscriber removed')
    } catch {
      toast.error('Failed to remove subscriber')
      setConfirmDelete(null)
    }
  }

  const handleExportCSV = () => {
    const header = 'Name,Email,Subscribed At\n'
    const rows = subscribers.map(s =>
      `"${s.name || ''}","${s.email}","${new Date(s.subscribedAt).toLocaleDateString()}"`
    ).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ryoit-subscribers-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('CSV exported!')
  }

  const filtered = subscribers.filter(s =>
    search === '' ||
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.name || '').toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Subscribers</h1>
          <p className="text-sm text-dark-muted mt-1">
            {total.toLocaleString()} newsletter subscribers in total.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-9 text-sm w-52"
            />
          </div>
          <button
            onClick={handleExportCSV}
            disabled={subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-dark-border text-dark-muted hover:text-white hover:border-secondary-500/50 transition-colors text-sm font-semibold disabled:opacity-30"
          >
            <HiArrowDownTray className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Subscribers', value: total.toLocaleString(), color: 'text-secondary-400' },
          { label: 'This Page', value: filtered.length.toString(), color: 'text-primary-400' },
          { label: 'Pages', value: totalPages.toString(), color: 'text-accent-400' },
        ].map(s => (
          <div key={s.label} className="glass-card-dark rounded-xl border border-dark-border p-4">
            <p className="text-xs text-dark-muted uppercase font-bold tracking-wider mb-1">{s.label}</p>
            <p className={`font-display font-black text-2xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card-dark rounded-2xl border border-dark-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-secondary-500/30 border-t-secondary-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <HiMail className="w-12 h-12 text-dark-border mx-auto mb-4" />
            <p className="text-dark-muted text-sm">
              {search ? 'No subscribers match your search.' : 'No subscribers yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">#</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider hidden md:table-cell">Name</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider hidden lg:table-cell">Subscribed</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-dark-muted uppercase tracking-wider">Remove</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {filtered.map((sub, i) => (
                  <motion.tr
                    key={sub.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="hover:bg-white/3 transition-colors"
                  >
                    <td className="px-6 py-4 text-dark-muted tabular-nums">
                      {(page - 1) * 20 + i + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary-500/20 flex items-center justify-center shrink-0">
                          <HiMail className="w-4 h-4 text-secondary-400" />
                        </div>
                        <span className="text-white font-medium truncate max-w-[200px]">{sub.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-dark-muted hidden md:table-cell">
                      {sub.name || <span className="italic opacity-50">—</span>}
                    </td>
                    <td className="px-6 py-4 text-dark-muted hidden lg:table-cell">
                      {new Date(sub.subscribedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {confirmDelete === sub.email ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-dark-muted">Remove?</span>
                          <button
                            onClick={() => handleDelete(sub.email)}
                            className="px-2.5 py-1 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-400 transition-colors"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setConfirmDelete(null)}
                            className="px-2.5 py-1 rounded-lg bg-dark-border text-dark-muted text-xs font-bold hover:text-white transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDelete(sub.email)}
                          className="p-2 rounded-lg text-dark-muted hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Remove subscriber"
                        >
                          <HiTrash className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-dark-muted">
            Page {page} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-lg border border-dark-border text-dark-muted hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-lg border border-dark-border text-dark-muted hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
