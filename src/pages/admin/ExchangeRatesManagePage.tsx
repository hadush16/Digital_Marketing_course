import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiRefresh, HiPencil, HiTrash, HiClock } from 'react-icons/hi'
import {
  agencyService,
  type CurrencyPair,
  type ExchangeRateHistoryItem,
  type RateSourceType,
} from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import toast from 'react-hot-toast'

const SOURCE_BADGE: Record<RateSourceType, string> = {
  OFFICIAL: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  PROVIDER: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  MANUAL: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
}

export default function ExchangeRatesManagePage() {
  const [pairs, setPairs] = useState<CurrencyPair[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<CurrencyPair | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<CurrencyPair | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [historyPair, setHistoryPair] = useState<CurrencyPair | null>(null)
  const [historyItems, setHistoryItems] = useState<ExchangeRateHistoryItem[]>([])

  // Calculator state
  const [calcAmount, setCalcAmount] = useState('100')
  const [calcPairId, setCalcPairId] = useState('')

  const [form, setForm] = useState<{
    baseCurrency: string
    targetCurrency: string
    rate: number
    rateType: RateSourceType
    providerName: string
    sourceUrl: string
    isEnabled: boolean
    notes: string
  }>({
    baseCurrency: 'USD',
    targetCurrency: 'ETB',
    rate: 125,
    rateType: 'MANUAL',
    providerName: 'Admin Reference Rate',
    sourceUrl: '',
    isEnabled: true,
    notes: '',
  })

  const fetchPairs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await agencyService.getAdminExchangeRates()
      setPairs(res.data.data)
      if (!calcPairId && res.data.data.length > 0) {
        setCalcPairId(res.data.data[0].id)
      }
    } catch {
      toast.error('Failed to load exchange rates')
    } finally {
      setLoading(false)
    }
  }, [calcPairId])

  useEffect(() => {
    fetchPairs()
  }, [fetchPairs])

  const handleSync = async () => {
    setSyncing(true)
    try {
      const res = await agencyService.syncLiveRates('USD', false)
      toast.success(res.data.message)
      fetchPairs()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Live rate sync failed')
    } finally {
      setSyncing(false)
    }
  }

  const openCreate = () => {
    setEditing(null)
    setForm({
      baseCurrency: 'USD',
      targetCurrency: '',
      rate: 1,
      rateType: 'MANUAL',
      providerName: 'Admin Reference Rate',
      sourceUrl: '',
      isEnabled: true,
      notes: '',
    })
    setModalOpen(true)
  }

  const openEdit = (p: CurrencyPair) => {
    setEditing(p)
    setForm({
      baseCurrency: p.baseCurrency,
      targetCurrency: p.targetCurrency,
      rate: p.rate,
      rateType: p.rateType,
      providerName: p.providerName || '',
      sourceUrl: p.sourceUrl || '',
      isEnabled: p.isEnabled,
      notes: p.notes || '',
    })
    setModalOpen(true)
  }

  const openHistory = async (p: CurrencyPair) => {
    setHistoryPair(p)
    try {
      const res = await agencyService.getRateHistory(p.id)
      setHistoryItems(res.data.data)
    } catch {
      setHistoryItems(p.history || [])
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, rate: Number(form.rate) }
      if (editing) {
        await agencyService.updateCurrencyPair(editing.id, payload)
        toast.success('Currency pair updated')
      } else {
        await agencyService.createCurrencyPair(payload)
        toast.success('Currency pair added')
      }
      setModalOpen(false)
      fetchPairs()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save currency pair')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteCurrencyPair(deleteTarget.id)
      toast.success('Currency pair deleted')
      setDeleteTarget(null)
      fetchPairs()
    } catch {
      toast.error('Failed to delete currency pair')
    } finally {
      setDeleting(false)
    }
  }

  const activeCalcPair = pairs.find((p) => p.id === calcPairId) || pairs[0]
  const convertedValue = activeCalcPair ? (Number(calcAmount || 0) * activeCalcPair.rate).toFixed(2) : '0.00'

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">Exchange Rates</h1>
          <p className="text-sm text-dark-muted mt-1">
            Manage official, provider-synced, and manual reference rates with full history tracking.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="btn-outline btn-sm flex items-center gap-1.5"
          >
            <HiRefresh className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync Provider Rates'}
          </button>
          <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
            <HiPlus className="w-4 h-4" /> Add Currency Pair
          </button>
        </div>
      </div>

      {/* Quick Converter */}
      {activeCalcPair && (
        <div className="glass-card-dark rounded-2xl border border-dark-border p-5 flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-bold text-secondary-300 uppercase">Quick Currency Converter</p>
            <p className="text-xs text-dark-muted mt-0.5">
              Source: <span className="text-white font-semibold">{activeCalcPair.rateType}</span> ({activeCalcPair.providerName || 'Admin'})
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="number"
              min="0"
              step="any"
              value={calcAmount}
              onChange={(e) => setCalcAmount(e.target.value)}
              className="input w-32 text-sm"
            />
            <select
              value={calcPairId}
              onChange={(e) => setCalcPairId(e.target.value)}
              className="input w-44 text-sm"
            >
              {pairs.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.baseCurrency} → {p.targetCurrency}
                </option>
              ))}
            </select>
            <div className="px-4 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-sm font-bold text-white">
              = {Number(convertedValue).toLocaleString()} {activeCalcPair.targetCurrency}
            </div>
          </div>
        </div>
      )}

      <div className="glass-card-dark rounded-2xl border border-dark-border overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-sm text-dark-muted">Loading exchange rates...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Pair</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Rate</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Source Type</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase hidden md:table-cell">Updated</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Enabled</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-dark-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {pairs.map((p) => (
                  <tr key={p.id} className="hover:bg-dark-border/20">
                    <td className="px-6 py-4 font-display font-bold text-white">
                      {p.baseCurrency} / {p.targetCurrency}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-secondary-300">
                      {p.rate}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${SOURCE_BADGE[p.rateType]}`}>
                        {p.rateType}
                      </span>
                      {p.providerName && <span className="block text-[11px] text-dark-muted mt-1">{p.providerName}</span>}
                    </td>
                    <td className="px-6 py-4 text-xs text-dark-muted hidden md:table-cell">
                      {new Date(p.lastUpdatedAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={async () => {
                          await agencyService.updateCurrencyPair(p.id, { isEnabled: !p.isEnabled })
                          fetchPairs()
                        }}
                        className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          p.isEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {p.isEnabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => openHistory(p)} className="p-2 rounded-lg bg-dark-bg border border-dark-border text-dark-muted hover:text-white" title="History">
                          <HiClock className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEdit(p)} className="p-2 rounded-lg bg-dark-bg border border-dark-border text-dark-muted hover:text-white" title="Edit">
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(p)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20" title="Delete">
                          <HiTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Currency Pair' : 'Add Currency Pair'} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Base Currency *</label>
              <input type="text" required value={form.baseCurrency} onChange={(e) => setForm({ ...form, baseCurrency: e.target.value.toUpperCase() })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Target Currency *</label>
              <input type="text" required value={form.targetCurrency} onChange={(e) => setForm({ ...form, targetCurrency: e.target.value.toUpperCase() })} className="input" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Exchange Rate *</label>
              <input type="number" step="any" required value={form.rate} onChange={(e) => setForm({ ...form, rate: Number(e.target.value) })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Rate Source Type</label>
              <select value={form.rateType} onChange={(e) => setForm({ ...form, rateType: e.target.value as RateSourceType })} className="input">
                <option value="MANUAL">MANUAL (Admin Reference)</option>
                <option value="OFFICIAL">OFFICIAL (Central Bank / Pegged)</option>
                <option value="PROVIDER">PROVIDER (Live API)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Provider / Source Name</label>
            <input type="text" value={form.providerName} onChange={(e) => setForm({ ...form, providerName: e.target.value })} className="input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Notes / Disclaimer</label>
            <textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="input" />
          </div>
          <label className="flex items-center gap-2 text-xs font-semibold text-white">
            <input type="checkbox" checked={form.isEnabled} onChange={(e) => setForm({ ...form, isEnabled: e.target.checked })} />
            Enabled on Public Website
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">{saving ? 'Saving...' : 'Save Pair'}</button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={!!historyPair} onClose={() => setHistoryPair(null)} title={`Rate History: ${historyPair?.baseCurrency}/${historyPair?.targetCurrency}`} size="md">
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {historyItems.length === 0 ? (
            <p className="text-xs text-dark-muted text-center py-6">No historical changes recorded yet.</p>
          ) : (
            historyItems.map((h) => (
              <div key={h.id} className="p-3 rounded-xl bg-dark-bg border border-dark-border flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-white">{h.rate}</span>
                  <span className="ml-2 text-dark-muted">({h.rateType})</span>
                  {h.changedBy && <p className="text-[11px] text-dark-muted">By: {h.changedBy}</p>}
                </div>
                <span className="text-dark-muted">{new Date(h.recordedAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Currency Pair"
        message={`Delete ${deleteTarget?.baseCurrency}/${deleteTarget?.targetCurrency}?`}
        isLoading={deleting}
      />
    </div>
  )
}
