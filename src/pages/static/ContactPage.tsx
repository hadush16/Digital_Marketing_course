import { motion } from 'framer-motion'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { HiMail, HiPhone, HiLocationMarker, HiPaperAirplane, HiClock, HiCheckCircle } from 'react-icons/hi'

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
    }, 4000)
  }

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Ryoit',
    url: 'https://ryoit.com/contact',
    description: 'Contact Ryoit support, instructors, and technical advisors.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Ryoit',
      email: 'hadushmobilesoftware@gmail.com',
      telephone: '+251714224955',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Addis Ababa',
        addressCountry: 'ET',
      },
    },
  }

  return (
    <>
      <Helmet>
        <title>Contact Us — Ryoit Technical & Training Support</title>
        <meta
          name="description"
          content="Get in touch with Ryoit founder Hadush Brhane Belay and the technical team for course inquiries, GSM tool support, and marketplace questions."
        />
        <link rel="canonical" href="https://ryoit.com/contact" />
        <meta property="og:title" content="Contact Us — Ryoit Technical & Training Support" />
        <meta
          property="og:description"
          content="Get in touch with Ryoit founder Hadush Brhane Belay and the technical team for course inquiries, GSM tool support, and marketplace questions."
        />
        <meta property="og:url" content="https://ryoit.com/contact" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-6xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-accent badge mb-4"
            >
              Support & Inquiries
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6 text-light-text dark:text-dark-text"
            >
              Get in Touch with <span className="gradient-text-accent">Our Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Have questions regarding course registration, phone flashing procedures, GSM box activation, or marketplace listing policies? We are available to assist you.
            </motion.p>
          </div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
            {/* Info Panels */}
            <div className="space-y-4 lg:col-span-1">
              <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-primary-500/10 text-primary-500 shrink-0">
                  <HiMail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">Direct Email</h3>
                  <a
                    href="mailto:hadushmobilesoftware@gmail.com"
                    className="text-xs sm:text-sm text-light-muted dark:text-dark-muted hover:text-primary-500 transition-colors break-all"
                  >
                    hadushmobilesoftware@gmail.com
                  </a>
                  <span className="block text-[11px] text-light-muted mt-1">Average response: Under 24h</span>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-accent-500/10 text-accent-500 shrink-0">
                  <HiPhone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">Phone / Telegram</h3>
                  <a
                    href="tel:+251714224955"
                    className="text-xs sm:text-sm text-light-muted dark:text-dark-muted hover:text-accent-500 transition-colors font-medium"
                  >
                    +251 714 224 955
                  </a>
                  <span className="block text-[11px] text-light-muted mt-1">Monday – Saturday: 9:00 AM – 6:00 PM (EAT)</span>
                </div>
              </div>

              <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-sm flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-secondary-500/10 text-secondary-500 shrink-0">
                  <HiLocationMarker className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">Office Location</h3>
                  <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted">
                    Addis Ababa, Ethiopia
                  </p>
                  <span className="block text-[11px] text-light-muted mt-1">Tech workshop & training lab</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-3xl p-6 sm:p-10 border border-light-border dark:border-dark-border shadow-md">
                <h2 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-2">
                  Send Us a Direct Message
                </h2>
                <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted mb-6">
                  Fill in your details below and our team will get back to you with guidance or technical support.
                </p>

                {submitted && (
                  <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-sm font-medium mb-6 flex items-center gap-2">
                    <HiCheckCircle className="w-5 h-5 shrink-0" />
                    Thank you! Your message has been received. A member of our technical team will reply shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Abebe Kebede"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Subject / Area of Interest *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Course Enrollment, GSM Tool License, or Advertising"
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please explain your question or technical requirements in detail..."
                      className="input h-32 resize-none"
                    />
                  </div>

                  <button type="submit" className="btn-primary btn-md w-full flex items-center justify-center gap-2">
                    <span>Submit Message</span>
                    <HiPaperAirplane className="w-4 h-4 rotate-45" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
