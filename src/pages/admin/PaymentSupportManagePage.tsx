import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiPencil, HiTrash } from 'react-icons/hi'
import { agencyService, type PaymentMethod } from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import StringListEditor from '@/components/admin/StringListEditor'
import ServicesManagePage from './ServicesManagePage'
import toast from 'react-hot-toast'

export default function PaymentSupportManagePage() {
  const [tab, setTab] = useState<'services' | 'methods'>('services')
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<PaymentMethod | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<PaymentMethod | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState<Partial<PaymentMethod>>({
    name: '',
    description: '',
    logo: '',
    supportedCountries: [],
    supportedCurrencies: [],
    requirements: [],
    processingTime: '',
    feesInfo: '',
    instructions: '',
    displayOrder: 0,
    isActive: true,
    isPublished: true,
  })

  const fetchMethods = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminPaymentMethods()
      setMethods(res.data.data)
    } catch {
      toast.error('Failed to load payment methods')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMethods()
  }, [fetchMethods])

  const openCreate = () => {
    setEditing(null)
    setForm({
      name: '',
      description: '',
      logo: '',
      supportedCountries: [],
      supportedCurrencies: [],
      requirements: [],
      processingTime: '',
      feesInfo: '',
      instructions: '',
      displayOrder: methods.length + 1,
      isActive: true,
      isPublished: true,
    })
    setModalOpen(true)
  }

  const openEdit = (m: PaymentMethod) => {
    setEditing(m)
    setForm({
      ...m,
      supportedCountries: m.supportedCountries || [],
      supportedCurrencies: m.supportedCurrencies || [],
      requirements: m.requirements || [],
    })
    setModalOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) {
        await agencyService.updatePaymentMethod(editing.id, form)
        toast.success('Payment method updated')
      } else {
        await agencyService.createPaymentMethod(form)
        toast.success('Payment method created')
      }
      setModalOpen(false)
      fetchMethods()
    } catch {
      toast.error('Failed to save payment method')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deletePaymentMethod(deleteTarget.id)
      toast.success('Payment method deleted')
      setDeleteTarget(null)
      fetchMethods()
    } catch {
      toast.error('Failed to delete payment method')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2 border-b border-dark-border pb-3">
        <button
          onClick={() => setTab('services')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            tab === 'services'
              ? 'bg-secondary-500 text-white'
              : 'bg-dark-surface text-dark-muted hover:text-white border border-dark-border'
          }`}
        >
          Payment &amp; Withdrawal Services
        </button>
        <button
          onClick={() => setTab('methods')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            tab === 'methods'
              ? 'bg-secondary-500 text-white'
              : 'bg-dark-surface text-dark-muted hover:text-white border border-dark-border'
          }`}
        >
          Supported Payment Methods ({methods.length})
        </button>
      </div>

      {tab === 'services' ? (
        <ServicesManagePage
          defaultType="PAYMENT_WITHDRAWAL"
          pageTitle="Payment & Withdrawal Support"
          pageSubtitle="Manage AdSense, Meta, YouTube, TikTok payout guidance & international payment troubleshooting."
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-extrabold text-2xl text-white">Supported Payment Methods</h1>
              <p className="text-sm text-dark-muted mt-1">
                Configure available payout methods, supported countries, and verification requirements.
              </p>
            </div>
            <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
              <HiPlus className="w-4 h-4" /> Add Payment Method
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-full py-16 text-center text-sm text-dark-muted">Loading...</div>
            ) : (
              methods.map((m) => (
                <div key={m.id} className="glass-card-dark rounded-2xl border border-dark-border p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-white">{m.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${m.isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {m.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-xs text-dark-muted line-clamp-2 flex-1">{m.description}</p>
                  {m.processingTime && (
                    <p className="text-[11px] text-secondary-300">Processing: {m.processingTime}</p>
                  )}
                  <div className="flex justify-end gap-2 pt-2 border-t border-dark-border/60">
                    <button onClick={() => openEdit(m)} className="px-3 py-1.5 rounded-lg bg-dark-bg border border-dark-border text-xs text-white flex items-center gap-1">
                      <HiPencil className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => setDeleteTarget(m)} className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs flex items-center gap-1">
                      <HiTrash className="w-3.5 h-3.5" /> Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Payment Method' : 'Add Payment Method'} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Method Name *</label>
            <input type="text" required value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Description</label>
            <textarea rows={3} value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input" />
          </div>
          <MediaUploader label="Logo / Icon" value={form.logo || ''} onChange={(logo) => setForm({ ...form, logo })} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Processing Time</label>
              <input type="text" value={form.processingTime || ''} onChange={(e) => setForm({ ...form, processingTime: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Fees Info</label>
              <input type="text" value={form.feesInfo || ''} onChange={(e) => setForm({ ...form, feesInfo: e.target.value })} className="input" />
            </div>
          </div>
          <StringListEditor label="Supported Countries" items={form.supportedCountries || []} onChange={(supportedCountries) => setForm({ ...form, supportedCountries })} />
          <StringListEditor label="Supported Currencies" items={form.supportedCurrencies || []} onChange={(supportedCurrencies) => setForm({ ...form, supportedCurrencies })} />
          <StringListEditor label="Requirements" items={form.requirements || []} onChange={(requirements) => setForm({ ...form, requirements })} />
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs font-semibold text-white">
              <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-white">
              <input type="checkbox" checked={!!form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} /> Published
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">{saving ? 'Saving...' : 'Save Method'}</button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Payment Method"
        message={`Delete "${deleteTarget?.name}"?`}
        isLoading={deleting}
      />
    </div>
  )
}
