import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane } from 'react-icons/hi'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-accent badge mb-4"
          >
            Contact
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Get in Touch with <span className="gradient-text-accent">Our Team</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Have any questions about Ryoit classes, phone flashing procedures, GSM tools licensing, or marketplace listings? We're here to help.
          </motion.p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          {/* Info Panels */}
          <div className="space-y-4 lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary-500/10 text-primary-500 shrink-0">
                <HiMail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">Email Us</h3>
                <a href="mailto:hadushmobilesoftware@gmail.com" className="text-sm text-light-muted dark:text-dark-muted hover:text-primary-500 transition-colors">
                  hadushmobilesoftware@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-accent-500/10 text-accent-500 shrink-0">
                <HiPhone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">Call Us</h3>
                <a href="tel:+251714224955" className="text-sm text-light-muted dark:text-dark-muted hover:text-accent-500 transition-colors">
                  +251 714 224 955
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-start gap-4">
              <div className="p-3 rounded-xl bg-secondary-500/10 text-secondary-500 shrink-0">
                <HiLocationMarker className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">Location</h3>
                <p className="text-sm text-light-muted dark:text-dark-muted">
                  Addis Ababa, Ethiopia
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-md">
              <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-6">
                Send us a Message
              </h2>
              {submitted ? (
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium mb-6">
                  Thank you! Your message has been sent successfully. We will get back to you shortly.
                </div>
              ) : null}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Hadush Brhane"
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.com"
                      className="input"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="GSM Tool licenses, course registration..."
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Explain your request in detail..."
                    className="input h-32 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary btn-md w-full"
                >
                  Send Message
                  <HiPaperAirplane className="w-5 h-5 rotate-45" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
