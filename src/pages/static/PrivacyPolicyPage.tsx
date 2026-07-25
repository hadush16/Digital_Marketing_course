import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="badge-primary badge mb-4">Legal</span>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-2">
            Last Updated: July 19, 2026
          </p>
        </motion.div>

        <div className="glass-card rounded-3xl p-8 md:p-12 space-y-6 prose-ryoit">
          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information that you provide to us directly when registering on Ryoit, enrolling in digital marketing courses, listing items on the marketplace, or contacting support. This includes name, email address, phone number, and transaction logs.
          </p>

          <h2>2. How We Use Your Information</h2>
          <p>
            Ryoit uses the information to manage course access, coordinate digital marketplace purchases, improve repair tutorial displays, analyze web traffic (via Google Analytics), and run advertisements. We will never sell your details to third parties.
          </p>

          <h2>3. Cookies & Adsense</h2>
          <p>
            Our website uses cookies to store user dark/light preference settings and support Google Analytics and Google AdSense advertisement placements.
          </p>

          <h2>4. Data Security</h2>
          <p>
            We deploy secure JWT credentials, clean sanitization middleware, and store database assets behind robust cloud access blocks on Neon PostgreSQL servers to protect your data.
          </p>
        </div>
      </div>
    </div>
  )
}
