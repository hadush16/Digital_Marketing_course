import { useCallback, useEffect, useState } from 'react'
import { HiSearch, HiTrash, HiMail } from 'react-icons/hi'
import { FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { agencyService, type ContactInquiry, type InquiryStatus } from '@/services/agency.service'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import toast from 'react-hot-toast'

const STATUS_BADGE: Record<InquiryStatus, string> = {
  NEW: 'bg-rose-500/20 text-rose-300',
  IN_PROGRESS: 'bg-amber-500/20 text-amber-300',
  RESPONDED: 'bg-blue-500/20 text-blue-300',
  COMPLETED: 'bg-emerald-500/20 text-emerald-300',
  ARCHIVED: 'bg-slate-500/20 text-slate-400',
}

export default function InquiriesManagePage() {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<ContactInquiry | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchInquiries = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminInquiries({
        status: statusFilter,
        search: search || undefined,
      })
      setInquiries(res.data.data)
    } catch {
      toast.error('Failed to load contact inquiries')
    } finally {
      setLoading(false)
    }
  }, [statusFilter, search])

  useEffect(() => {
    fetchInquiries()
  }, [fetchInquiries])

  const updateStatus = async (id: string, status: InquiryStatus) => {
    try {
      await agencyService.updateInquiry(id, { status })
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, status } : inq)))
      toast.success(`Inquiry marked as ${status.replace('_', ' ')}`)
    } catch {
      toast.error('Failed to update inquiry status')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteInquiry(deleteTarget.id)
      toast.success('Inquiry deleted')
      setDeleteTarget(null)
      fetchInquiries()
    } catch {
      toast.error('Failed to delete inquiry')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Contact Inquiries</h1>
          <p className="text-sm text-dark-muted mt-1">
            Review service requests, update workflow statuses, and reply via Email, WhatsApp, or Telegram.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 text-sm w-48"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="input text-xs w-40">
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESPONDED">Responded</option>
            <option value="COMPLETED">Completed</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-20 text-center text-sm text-dark-muted">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="glass-card-dark rounded-2xl border border-dark-border py-20 text-center text-sm text-dark-muted">
            No inquiries match your filter.
          </div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="glass-card-dark rounded-2xl border border-dark-border p-5 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display font-bold text-white">{inq.customerName}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_BADGE[inq.status]}`}>
                      {inq.status.replace('_', ' ')}
                    </span>
                    {inq.requestedService && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-secondary-500/15 text-secondary-300">
                        {inq.requestedService}
                      </span>
                    )}
                    {inq.platform && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-dark-bg border border-dark-border text-dark-muted">
                        {inq.platform}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-dark-muted mt-1">
                    {inq.email} {inq.phone ? `• ${inq.phone}` : ''} • {new Date(inq.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={`mailto:${inq.email}?subject=${encodeURIComponent(`Re: ${inq.requestedService || 'Ryoit Inquiry'}`)}`}
                    className="p-2 rounded-lg bg-dark-bg border border-dark-border text-blue-400 hover:border-blue-400/50"
                    title="Reply via Email"
                  >
                    <HiMail className="w-4 h-4" />
                  </a>
                  {inq.phone && (
                    <a
                      href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg bg-dark-bg border border-dark-border text-emerald-400 hover:border-emerald-400/50"
                      title="Open WhatsApp"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href="https://t.me/HadushB12"
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-dark-bg border border-dark-border text-sky-400 hover:border-sky-400/50"
                    title="Telegram"
                  >
                    <FaTelegram className="w-4 h-4" />
                  </a>
                  <select
                    value={inq.status}
                    onChange={(e) => updateStatus(inq.id, e.target.value as InquiryStatus)}
                    className="bg-dark-bg border border-dark-border rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option value="NEW">New</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESPONDED">Responded</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                  <button
                    onClick={() => setDeleteTarget(inq)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Delete"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-white/90 bg-dark-bg/60 rounded-xl p-3.5 border border-dark-border/60 whitespace-pre-line">
                {inq.message}
              </p>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        message={`Delete inquiry from "${deleteTarget?.customerName}"?`}
        isLoading={deleting}
      />
    </div>
  )
}
