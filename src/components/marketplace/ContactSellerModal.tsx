import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiMail, HiPhone, HiUser, HiChatAlt2, HiCheckCircle } from 'react-icons/hi'

interface ContactSellerModalProps {
  isOpen: boolean
  onClose: () => void
  sellerName: string
  listingTitle: string
}

export default function ContactSellerModal({
  isOpen,
  onClose,
  sellerName,
  listingTitle,
}: ContactSellerModalProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setForm({ name: '', email: '', phone: '', message: '' })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-xl text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text transition-colors"
            >
              <HiX className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <HiCheckCircle className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted">
                  Your message has been sent to <strong>{sellerName}</strong>. They will contact you soon.
                </p>
                <button onClick={handleClose} className="btn-primary btn-md mt-6">
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text">
                    Contact Seller
                  </h3>
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-1 line-clamp-1">
                    Re: {listingTitle}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Your Name *
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted w-4 h-4" />
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                        className="input pl-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <div className="relative">
                      <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted w-4 h-4" />
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="name@domain.com"
                        className="input pl-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Phone Number <span className="normal-case font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted w-4 h-4" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+251 9XX XXX XXX"
                        className="input pl-10 text-sm"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <div className="relative">
                      <HiChatAlt2 className="absolute left-3 top-3 text-light-muted w-4 h-4" />
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder={`Hi ${sellerName}, I'm interested in your listing...`}
                        className="input pl-10 resize-none text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-secondary btn-md w-full"
                  >
                    {loading ? 'Sending...' : 'Send Inquiry'}
                  </button>
                </form>

                <p className="text-[10px] text-light-muted dark:text-dark-muted text-center mt-4">
                  Your contact details are never shared publicly without your consent.
                </p>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
