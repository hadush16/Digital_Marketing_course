import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiExclamationCircle, HiCheckCircle, HiCash, HiPhotograph, HiDocumentText } from 'react-icons/hi'

export default function DV2027Page() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission for now, as backend is pending
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-primary badge mb-4"
          >
            DV-2027 Assistance
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text leading-tight mb-4"
          >
            DV-2027 — Instructions & USD 1 Payment Assistance
          </motion.h1>
          <p className="text-light-muted dark:text-dark-muted mb-6">
            Official site: <a href="https://dvprogram.state.gov/" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">dvprogram.state.gov</a>
          </p>
          <div className="rounded-3xl overflow-hidden border border-light-border dark:border-dark-border shadow-lg">
            {/* You can replace this with the actual banner image if available */}
            <img src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=80" alt="DV 2027 banner" className="w-full h-64 object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Main Info Column */}
          <div className="lg:col-span-3 space-y-8">
            <section className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border">
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                <HiExclamationCircle className="text-yellow-500" /> Quick Facts
              </h2>
              <p className="text-light-muted dark:text-dark-muted mb-4">
                Expected entry window: early Oct 2025 → early Nov 2025 (likely ~Nov 5). Results: typically announced in May the following year. Confirm exact dates on the official DV Program website.
              </p>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-xl">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>Note:</strong> Official DV entry fee is $1. Digital SunriseAds provides advisory help and will assist with the USD 1 entry payment on client request.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                  <HiDocumentText className="text-primary-500" /> What You Must Do
                </h3>
                <ul className="space-y-3">
                  {[
                    'Provide your details using the contact form (full name, email, country of birth).',
                    'Send a recent passport-style photo that meets DV specs (we\'ll validate it).',
                    'Send the equivalent payment for $1 entry handling/payment via the secure payment link or bank transfer.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-light-muted dark:text-dark-muted">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-sm font-bold mt-0.5">{i + 1}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                  <HiCheckCircle className="text-green-500" /> What We Will Do
                </h3>
                <ul className="space-y-3">
                  {[
                    'Fill the DV entry form based on the details you provided (we will share the completed draft for confirmation).',
                    'Check and confirm photo eligibility against DV requirements; request a replacement if needed.',
                    'Process the USD 1 entry handling payment securely.',
                    'Return payment confirmation and a summary of the submitted entry.'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-light-muted dark:text-dark-muted">
                      <HiCheckCircle className="flex-shrink-0 w-5 h-5 text-green-500 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border sticky top-24 shadow-lg">
              <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">Request Assistance</h2>
              
              {submitted ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-4 rounded-xl text-center">
                  <HiCheckCircle className="w-12 h-12 mx-auto mb-2 opacity-80" />
                  <p className="font-medium">Request Sent Successfully!</p>
                  <p className="text-sm mt-1">We will contact you shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Full Name</label>
                    <input type="text" required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="As in passport" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Gender</label>
                      <select required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                        <option value="">Select</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Date of Birth</label>
                      <input type="date" required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Country of Birth</label>
                      <input type="text" required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Country" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Marital Status</label>
                      <select required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                        <option value="">Select</option>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                        <option>Widowed</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Contact Details</label>
                    <div className="space-y-2">
                      <input type="email" required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Email Address" />
                      <input type="tel" className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all" placeholder="Phone Number (Optional)" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Service Required</label>
                    <select required className="w-full px-4 py-2 rounded-xl border border-light-border dark:border-dark-border bg-white dark:bg-dark-bg/50 focus:ring-2 focus:ring-primary-500 outline-none transition-all">
                      <option>Payment assistance (USD 1)</option>
                      <option>Form review</option>
                      <option>Photo check</option>
                      <option>Full package</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-1">Photograph (Optional here)</label>
                    <input type="file" accept="image/*" className="w-full text-sm text-light-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                  </div>

                  <button type="submit" className="btn-primary btn-md w-full mt-2">
                    Submit Request
                  </button>
                  <p className="text-xs text-light-muted text-center mt-3">
                    We will reply with secure payment instructions and next steps. We never ask for your confirmation number.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
