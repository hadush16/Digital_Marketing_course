import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft, HiCheckCircle, HiShieldCheck } from 'react-icons/hi'
import { agencyService, type AgencyService } from '@/services/agency.service'
import toast from 'react-hot-toast'

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [service, setService] = useState<AgencyService | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [inquiry, setInquiry] = useState({ customerName: '', email: '', phone: '', message: '' })

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    agencyService
      .getServiceBySlug(slug)
      .then((res) => setService(res.data.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false))
  }, [slug])

  const handleInquiry = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!service) return
    setSubmitting(true)
    try {
      await agencyService.submitInquiry({
        customerName: inquiry.customerName,
        email: inquiry.email,
        phone: inquiry.phone || undefined,
        requestedService: service.title,
        serviceId: service.id,
        platform: service.platform?.name || undefined,
        message: inquiry.message,
      })
      toast.success('Inquiry submitted! Our team will contact you shortly.')
      setInquiry({ customerName: '', email: '', phone: '', message: '' })
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to submit inquiry')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="w-10 h-10 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-light-bg dark:bg-dark-bg px-4 text-center">
        <h1 className="text-2xl font-display font-bold text-light-text dark:text-dark-text mb-3">Service Not Found</h1>
        <Link to="/services" className="btn-primary btn-sm">Back to Services</Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{service.seoTitle || `${service.title} — Ryoit Digital Marketing Agency`}</title>
        <meta name="description" content={service.seoDescription || service.shortDescription} />
        <meta property="og:title" content={service.seoTitle || service.title} />
        <meta property="og:description" content={service.seoDescription || service.shortDescription} />
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-6xl space-y-10">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline font-semibold">
            <HiArrowLeft className="w-4 h-4" /> All Agency Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border">
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.platform && (
                    <span className="badge badge-primary">{service.platform.name}</span>
                  )}
                  {service.categories?.map((c) => (
                    <Link
                      key={c.category.id}
                      to={`/services?category=${c.category.slug}`}
                      className="badge bg-secondary-500/10 text-secondary-400"
                    >
                      {c.category.name}
                    </Link>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-display font-black text-light-text dark:text-dark-text mb-4">
                  {service.title}
                </h1>
                <p className="text-lg text-light-muted dark:text-dark-muted mb-6">{service.shortDescription}</p>

                {service.image && (
                  <img src={service.image} alt={service.title} className="w-full max-h-80 object-cover rounded-2xl mb-6 border border-dark-border" />
                )}

                <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line text-light-text dark:text-dark-text">
                  {service.fullDescription}
                </div>

                {(service.pricing || service.duration) && (
                  <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border flex flex-wrap gap-6 text-sm">
                    {service.pricing && <div><span className="text-dark-muted">Pricing:</span> <strong className="text-primary-500">{service.pricing}</strong></div>}
                    {service.duration && <div><span className="text-dark-muted">Duration:</span> <strong className="text-light-text dark:text-dark-text">{service.duration}</strong></div>}
                  </div>
                )}
              </div>

              {/* Features & Benefits */}
              {((service.features && service.features.length > 0) || (service.benefits && service.benefits.length > 0)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {service.features && service.features.length > 0 && (
                    <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border">
                      <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-4">What&apos;s Included</h2>
                      <ul className="space-y-2.5 text-sm">
                        {service.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-light-muted dark:text-dark-muted">
                            <HiCheckCircle className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {service.benefits && service.benefits.length > 0 && (
                    <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border">
                      <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-4">Key Benefits</h2>
                      <ul className="space-y-2.5 text-sm">
                        {service.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2 text-light-muted dark:text-dark-muted">
                            <HiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Monetization / Payment Guidance Details */}
              {(service.whoCanBenefit ||
                (service.eligibilityRequirements && service.eligibilityRequirements.length > 0) ||
                (service.accountPreparation && service.accountPreparation.length > 0) ||
                (service.commonProblems && service.commonProblems.length > 0)) && (
                <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border space-y-6">
                  {service.whoCanBenefit && (
                    <div>
                      <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">Who Can Benefit</h2>
                      <p className="text-sm text-light-muted dark:text-dark-muted">{service.whoCanBenefit}</p>
                    </div>
                  )}
                  {service.eligibilityRequirements && service.eligibilityRequirements.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">Eligibility Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-light-muted dark:text-dark-muted">
                        {service.eligibilityRequirements.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {service.supportedRegions && service.supportedRegions.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">Supported Regions</h3>
                      <p className="text-sm text-light-muted dark:text-dark-muted">{service.supportedRegions.join(' • ')}</p>
                    </div>
                  )}
                  {service.accountPreparation && service.accountPreparation.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">Required Account Preparation</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-light-muted dark:text-dark-muted">
                        {service.accountPreparation.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}
                  {service.commonProblems && service.commonProblems.length > 0 && (
                    <div>
                      <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2">Common Problems Addressed</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-light-muted dark:text-dark-muted">
                        {service.commonProblems.map((item, i) => <li key={i}>{item}</li>)}
                      </ul>
                    </div>
                  )}

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
                    <HiShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>
                      Policy &amp; Security Notice: Eligibility, monetization approval, and payouts depend strictly on the official platform&apos;s policies. Ryoit Digital Marketing Agency never collects passwords, full card numbers, PINs, or private banking credentials.
                    </span>
                  </div>
                </div>
              )}

              {/* Process Steps */}
              {service.processSteps && service.processSteps.length > 0 && (
                <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border space-y-4">
                  <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text">How It Works</h2>
                  <div className="space-y-4">
                    {service.processSteps.map((st, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-500 font-bold text-sm flex items-center justify-center shrink-0">
                          {st.step || idx + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-light-text dark:text-dark-text">{st.title}</h3>
                          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">{st.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border space-y-4">
                  <h2 className="font-display font-bold text-xl text-light-text dark:text-dark-text">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b border-light-border dark:border-dark-border pb-4 last:border-0 last:pb-0">
                        <h3 className="font-bold text-sm text-light-text dark:text-dark-text mb-1">{faq.question}</h3>
                        <p className="text-xs text-light-muted dark:text-dark-muted">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Inquiry Form */}
            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border sticky top-24">
              <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-1">
                Request This Service
              </h2>
              <p className="text-xs text-light-muted dark:text-dark-muted mb-4">
                Send an inquiry to Ryoit Digital Marketing Agency and our team will respond with next steps.
              </p>
              <form onSubmit={handleInquiry} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Full Name *"
                  value={inquiry.customerName}
                  onChange={(e) => setInquiry({ ...inquiry, customerName: e.target.value })}
                  className="input text-sm"
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address *"
                  value={inquiry.email}
                  onChange={(e) => setInquiry({ ...inquiry, email: e.target.value })}
                  className="input text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone / WhatsApp (Optional)"
                  value={inquiry.phone}
                  onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                  className="input text-sm"
                />
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your page, channel, or goals..."
                  value={inquiry.message}
                  onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                  className="input text-sm resize-y"
                />
                <button type="submit" disabled={submitting} className="btn-primary btn-md w-full">
                  {submitting ? 'Submitting...' : 'Submit Service Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

