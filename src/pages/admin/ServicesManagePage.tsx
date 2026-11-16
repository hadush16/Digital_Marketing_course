import { useCallback, useEffect, useState } from 'react'
import { HiPlus, HiSearch, HiPencil, HiTrash } from 'react-icons/hi'
import {
  agencyService,
  type AgencyService,
  type PublishStatus,
  type ServiceCategory,
  type ServiceType,
  type SocialPlatform,
} from '@/services/agency.service'
import { Modal } from '@/components/ui/Modal'
import { ConfirmDialog } from '@/components/ui/ConfirmDialog'
import MediaUploader from '@/components/admin/MediaUploader'
import StringListEditor from '@/components/admin/StringListEditor'
import toast from 'react-hot-toast'

interface ServicesManagePageProps {
  defaultType?: ServiceType | 'ALL'
  pageTitle?: string
  pageSubtitle?: string
}

export default function ServicesManagePage({
  defaultType = 'ALL',
  pageTitle = 'Services Management',
  pageSubtitle = 'Create, edit, publish, and organize all agency services across categories and platforms.',
}: ServicesManagePageProps) {
  const [services, setServices] = useState<AgencyService[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<ServiceType | 'ALL'>(defaultType)
  const [statusFilter, setStatusFilter] = useState<PublishStatus | 'ALL'>('ALL')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<AgencyService | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<AgencyService | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [form, setForm] = useState<{
    title: string
    serviceType: ServiceType
    shortDescription: string
    fullDescription: string
    image: string
    platformId: string
    categoryIds: string[]
    primaryCategoryId: string
    features: string[]
    benefits: string[]
    requirements: string[]
    whoCanBenefit: string
    eligibilityRequirements: string[]
    supportedRegions: string[]
    accountPreparation: string[]
    commonProblems: string[]
    paymentOptions: string[]
    pricing: string
    duration: string
    isAvailable: boolean
    isFeatured: boolean
    seoTitle: string
    seoDescription: string
    displayOrder: number
    status: PublishStatus
    faqs: Array<{ question: string; answer: string }>
    processSteps: Array<{ title: string; description: string }>
  }>({
    title: '',
    serviceType: defaultType === 'ALL' ? 'GENERAL' : defaultType,
    shortDescription: '',
    fullDescription: '',
    image: '',
    platformId: '',
    categoryIds: [],
    primaryCategoryId: '',
    features: [],
    benefits: [],
    requirements: [],
    whoCanBenefit: '',
    eligibilityRequirements: [],
    supportedRegions: [],
    accountPreparation: [],
    commonProblems: [],
    paymentOptions: [],
    pricing: '',
    duration: '',
    isAvailable: true,
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
    displayOrder: 0,
    status: 'PUBLISHED',
    faqs: [],
    processSteps: [],
  })

  useEffect(() => {
    setTypeFilter(defaultType)
  }, [defaultType])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [srvRes, catRes, platRes] = await Promise.all([
        agencyService.getAdminServices({
          limit: 100,
          search: search || undefined,
          serviceType: typeFilter === 'ALL' ? undefined : typeFilter,
          status: statusFilter === 'ALL' ? undefined : statusFilter,
        }),
        agencyService.getAdminCategories(),
        agencyService.getAdminPlatforms(),
      ])
      setServices(srvRes.data.data)
      setCategories(catRes.data.data)
      setPlatforms(platRes.data.data)
    } catch {
      toast.error('Failed to load services')
    } finally {
      setLoading(false)
    }
  }, [search, typeFilter, statusFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const openCreate = () => {
    setEditing(null)
    setForm({
      title: '',
      serviceType: defaultType === 'ALL' ? 'GENERAL' : defaultType,
      shortDescription: '',
      fullDescription: '',
      image: '',
      platformId: '',
      categoryIds: [],
      primaryCategoryId: '',
      features: [],
      benefits: [],
      requirements: [],
      whoCanBenefit: '',
      eligibilityRequirements: [],
      supportedRegions: [],
      accountPreparation: [],
      commonProblems: [],
      paymentOptions: [],
      pricing: '',
      duration: '',
      isAvailable: true,
      isFeatured: false,
      seoTitle: '',
      seoDescription: '',
      displayOrder: services.length + 1,
      status: 'PUBLISHED',
      faqs: [],
      processSteps: [],
    })
    setModalOpen(true)
  }

  const openEdit = (s: AgencyService) => {
    setEditing(s)
    const catIds = s.categories?.map((c) => c.category.id) || []
    const primary = s.categories?.find((c) => c.isPrimary)?.category.id || catIds[0] || ''
    setForm({
      title: s.title,
      serviceType: s.serviceType,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      image: s.image || '',
      platformId: s.platformId || '',
      categoryIds: catIds,
      primaryCategoryId: primary,
      features: s.features || [],
      benefits: s.benefits || [],
      requirements: s.requirements || [],
      whoCanBenefit: s.whoCanBenefit || '',
      eligibilityRequirements: s.eligibilityRequirements || [],
      supportedRegions: s.supportedRegions || [],
      accountPreparation: s.accountPreparation || [],
      commonProblems: s.commonProblems || [],
      paymentOptions: s.paymentOptions || [],
      pricing: s.pricing || '',
      duration: s.duration || '',
      isAvailable: s.isAvailable,
      isFeatured: s.isFeatured,
      seoTitle: s.seoTitle || '',
      seoDescription: s.seoDescription || '',
      displayOrder: s.displayOrder,
      status: s.status,
      faqs: s.faqs || [],
      processSteps: (s.processSteps || []).map((p) => ({ title: p.title, description: p.description })),
    })
    setModalOpen(true)
  }

  const toggleCategory = (id: string) => {
    setForm((prev) => {
      const exists = prev.categoryIds.includes(id)
      const nextIds = exists ? prev.categoryIds.filter((c) => c !== id) : [...prev.categoryIds, id]
      const nextPrimary = nextIds.includes(prev.primaryCategoryId) ? prev.primaryCategoryId : nextIds[0] || ''
      return { ...prev, categoryIds: nextIds, primaryCategoryId: nextPrimary }
    })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        platformId: form.platformId || null,
        primaryCategoryId: form.primaryCategoryId || null,
        displayOrder: Number(form.displayOrder) || 0,
        processSteps: form.processSteps.map((p, idx) => ({ step: idx + 1, ...p })),
      }
      if (editing) {
        await agencyService.updateService(editing.id, payload)
        toast.success('Service updated')
      } else {
        await agencyService.createService(payload)
        toast.success('Service created')
      }
      setModalOpen(false)
      fetchData()
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to save service')
    } finally {
      setSaving(false)
    }
  }

  const quickStatusChange = async (s: AgencyService, status: PublishStatus) => {
    try {
      await agencyService.updateService(s.id, { status })
      setServices((prev) => prev.map((item) => (item.id === s.id ? { ...item, status } : item)))
      toast.success(`Service marked as ${status}`)
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await agencyService.deleteService(deleteTarget.id)
      toast.success('Service deleted')
      setDeleteTarget(null)
      fetchData()
    } catch {
      toast.error('Failed to delete service')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-white">{pageTitle}</h1>
          <p className="text-sm text-dark-muted mt-1">{pageSubtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-9 text-sm w-48"
            />
          </div>
          {defaultType === 'ALL' && (
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as ServiceType | 'ALL')}
              className="input text-xs w-44"
            >
              <option value="ALL">All Types</option>
              <option value="GENERAL">General / Digital Marketing</option>
              <option value="SOCIAL_MEDIA">Social Media Management</option>
              <option value="MONETIZATION">Monetization</option>
              <option value="PAYMENT_WITHDRAWAL">Payment &amp; Withdrawal</option>
            </select>
          )}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as PublishStatus | 'ALL')}
            className="input text-xs w-36"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="ARCHIVED">Archived</option>
          </select>
          <button onClick={openCreate} className="btn-primary btn-sm flex items-center gap-1.5">
            <HiPlus className="w-4 h-4" /> New Service
          </button>
        </div>
      </div>

      <div className="glass-card-dark rounded-2xl border border-dark-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 rounded-full border-2 border-secondary-500/30 border-t-secondary-500 animate-spin" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-dark-muted text-sm">
            No services found. Click &ldquo;New Service&rdquo; to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border">
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Service</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase hidden md:table-cell">Type &amp; Platform</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase hidden lg:table-cell">Categories</th>
                  <th className="text-left px-6 py-4 text-xs font-bold text-dark-muted uppercase">Status</th>
                  <th className="text-right px-6 py-4 text-xs font-bold text-dark-muted uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/50">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-dark-border/20">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">{s.title}</p>
                      <p className="text-xs text-dark-muted line-clamp-1">{s.shortDescription}</p>
                    </td>
                    <td className="px-6 py-4 text-xs hidden md:table-cell">
                      <span className="px-2 py-0.5 rounded-md bg-secondary-500/15 text-secondary-300 font-semibold">
                        {s.serviceType.replace('_', ' ')}
                      </span>
                      {s.platform && <span className="block text-dark-muted mt-1">{s.platform.name}</span>}
                    </td>
                    <td className="px-6 py-4 text-xs hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {s.categories?.map((c) => (
                          <span key={c.category.id} className="px-2 py-0.5 rounded bg-dark-bg border border-dark-border text-[11px]">
                            {c.category.name}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={s.status}
                        onChange={(e) => quickStatusChange(s, e.target.value as PublishStatus)}
                        className="bg-dark-bg border border-dark-border rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button onClick={() => openEdit(s)} className="p-2 rounded-lg bg-dark-bg border border-dark-border text-dark-muted hover:text-white">
                          <HiPencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => setDeleteTarget(s)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20">
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? `Edit Service: ${editing.title}` : 'Create New Service'}
        size="xl"
      >
        <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Service Title *</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Service Type</label>
              <select
                value={form.serviceType}
                onChange={(e) => setForm({ ...form, serviceType: e.target.value as ServiceType })}
                className="input"
              >
                <option value="GENERAL">General / Digital Marketing</option>
                <option value="SOCIAL_MEDIA">Social Media Management</option>
                <option value="MONETIZATION">Social Media Monetization</option>
                <option value="PAYMENT_WITHDRAWAL">Payment &amp; Withdrawal Assistance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Platform (Optional)</label>
              <select value={form.platformId} onChange={(e) => setForm({ ...form, platformId: e.target.value })} className="input">
                <option value="">All / Platform-Independent</option>
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Pricing (Opt.)</label>
                <input type="text" value={form.pricing} onChange={(e) => setForm({ ...form, pricing: e.target.value })} placeholder="e.g. Custom / 3,500 ETB" className="input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Duration (Opt.)</label>
                <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="e.g. Monthly" className="input" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1.5 uppercase">Assign Categories</label>
            <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-dark-bg border border-dark-border">
              {categories.map((cat) => {
                const selected = form.categoryIds.includes(cat.id)
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                      selected
                        ? 'bg-secondary-500 text-white'
                        : 'bg-dark-surface text-dark-muted border border-dark-border hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Short Description *</label>
            <input type="text" required value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} className="input" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Full Description *</label>
            <textarea rows={4} required value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} className="input resize-y" />
          </div>

          <MediaUploader label="Service Image" value={form.image} onChange={(image) => setForm({ ...form, image })} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StringListEditor label="Features" items={form.features} onChange={(features) => setForm({ ...form, features })} />
            <StringListEditor label="Benefits" items={form.benefits} onChange={(benefits) => setForm({ ...form, benefits })} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StringListEditor label="Requirements" items={form.requirements} onChange={(requirements) => setForm({ ...form, requirements })} />
            <StringListEditor label="Supported Regions / Countries" items={form.supportedRegions} onChange={(supportedRegions) => setForm({ ...form, supportedRegions })} />
          </div>

          {(form.serviceType === 'MONETIZATION' || form.serviceType === 'PAYMENT_WITHDRAWAL') && (
            <div className="space-y-4 p-4 rounded-xl bg-dark-bg/60 border border-secondary-500/20">
              <p className="text-xs font-bold text-secondary-300 uppercase">Monetization &amp; Payment Guidance Details</p>
              <div>
                <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">Who Can Benefit</label>
                <input type="text" value={form.whoCanBenefit} onChange={(e) => setForm({ ...form, whoCanBenefit: e.target.value })} className="input" />
              </div>
              <StringListEditor label="Eligibility Requirements" items={form.eligibilityRequirements} onChange={(eligibilityRequirements) => setForm({ ...form, eligibilityRequirements })} />
              <StringListEditor label="Required Account Preparation" items={form.accountPreparation} onChange={(accountPreparation) => setForm({ ...form, accountPreparation })} />
              <StringListEditor label="Common Problems Solved" items={form.commonProblems} onChange={(commonProblems) => setForm({ ...form, commonProblems })} />
              <StringListEditor label="Available Payment Options" items={form.paymentOptions} onChange={(paymentOptions) => setForm({ ...form, paymentOptions })} />
            </div>
          )}

          {/* Process Steps */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-dark-muted uppercase">Service Process Steps</label>
              <button
                type="button"
                onClick={() => setForm({ ...form, processSteps: [...form.processSteps, { title: '', description: '' }] })}
                className="text-xs text-secondary-400 font-semibold"
              >
                + Add Step
              </button>
            </div>
            {form.processSteps.map((step, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder={`Step ${idx + 1} Title`}
                  value={step.title}
                  onChange={(e) => {
                    const next = [...form.processSteps]
                    next[idx].title = e.target.value
                    setForm({ ...form, processSteps: next })
                  }}
                  className="input text-xs"
                />
                <input
                  type="text"
                  placeholder="Step description"
                  value={step.description}
                  onChange={(e) => {
                    const next = [...form.processSteps]
                    next[idx].description = e.target.value
                    setForm({ ...form, processSteps: next })
                  }}
                  className="input text-xs sm:col-span-2"
                />
              </div>
            ))}
          </div>

          {/* FAQs */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-dark-muted uppercase">Service FAQs</label>
              <button
                type="button"
                onClick={() => setForm({ ...form, faqs: [...form.faqs, { question: '', answer: '' }] })}
                className="text-xs text-secondary-400 font-semibold"
              >
                + Add FAQ
              </button>
            </div>
            {form.faqs.map((faq, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => {
                    const next = [...form.faqs]
                    next[idx].question = e.target.value
                    setForm({ ...form, faqs: next })
                  }}
                  className="input text-xs"
                />
                <input
                  type="text"
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => {
                    const next = [...form.faqs]
                    next[idx].answer = e.target.value
                    setForm({ ...form, faqs: next })
                  }}
                  className="input text-xs"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">SEO Title</label>
              <input type="text" value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} className="input text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-dark-muted mb-1 uppercase">SEO Description</label>
              <input type="text" value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })} className="input text-xs" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-white">
              <input type="checkbox" checked={form.isAvailable} onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })} />
              Available
            </label>
            <label className="flex items-center gap-2 text-xs font-semibold text-white">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
              Featured
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-dark-muted">Status:</span>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as PublishStatus })} className="input text-xs w-32 py-1">
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-dark-muted">Order:</span>
              <input type="number" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })} className="input text-xs w-20 py-1" />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-dark-border">
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline btn-sm">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary btn-sm">
              {saving ? 'Saving...' : editing ? 'Update Service' : 'Create Service'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Service"
        message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
        isLoading={deleting}
      />
    </div>
  )
}
