import { motion } from 'framer-motion'

export default function TermsPage() {
  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="badge-primary badge mb-4">Legal</span>
          <h1 className="section-title">Terms of Service</h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-2">
            Last Updated: July 19, 2026
          </p>
        </motion.div>

        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 prose-ryoit">
          <h2>1. Terms of Use</h2>
          <p>
            By accessing Ryoit (at website or client app), you agree to comply with all terms, safety conditions, and localized service guidelines. You may use our files and tutorials for learning purposes only.
          </p>

          <h2>2. Digital Solutions & Flashing Warning</h2>
          <p>
            Smartphone software repair, unlocking, custom stock flashing, and hardware modification carry inherent device risks. Ryoit is not liable for bricked boards, IMEI loss, hardware malfunction, or data wiping resulting from the guides.
          </p>

          <h2>3. Marketplace Rules</h2>
          <p>
            When advertising YouTube accounts, Facebook pages, or digital content services on the Ryoit Marketplace, you warrant that you are the lawful owner. Spam, false views, bot subscriptions, or fraudulent services will lead to instant account ban.
          </p>

          <h2>4. Course Enrollment</h2>
          <p>
            Access to paid digital courses is individual and non-transferable. Shared account credentials or leaked Amharic course files will result in access cancellation.
          </p>
        </div>
      </div>
    </div>
  )
}
