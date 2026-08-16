import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  HiShieldCheck,
  HiLockClosed,
  HiDatabase,
  HiEye,
  HiMail,
  HiGlobeAlt,
} from 'react-icons/hi'

const sections = [
  {
    icon: HiDatabase,
    title: '1. Information We Collect',
    content: `We collect personal information that you provide directly when registering on Ryoit, enrolling in digital marketing courses, listing items on the marketplace, or contacting support. This includes:
    
• Name and email address
• Phone number (optional)
• Profile avatar and bio
• Payment and transaction logs
• Course progress and activity data
• Marketplace listings and purchase history
• IP address and device information for security purposes`,
  },
  {
    icon: HiGlobeAlt,
    title: '2. How We Use Your Information',
    content: `Ryoit uses the information collected to:

• Manage course access and track learning progress
• Coordinate digital marketplace purchases and communications
• Analyze web and app traffic via Google Analytics
• Deliver personalized course recommendations
• Process payments and prevent fraud
• Send transactional and marketing emails (with your consent)
• Improve platform performance and user experience

We will never sell your personal data to third parties.`,
  },
  {
    icon: HiEye,
    title: '3. Cookies & Tracking Technologies',
    content: `Our website uses cookies and similar technologies to:

• Store your dark/light mode preference
• Keep you logged in securely between sessions
• Support Google Analytics for traffic analysis
• Power Google AdSense advertisement placements
• Enable essential platform functionality

You may accept or reject non-essential cookies via our cookie consent banner. Rejecting cookies may limit certain platform features.`,
  },
  {
    icon: HiLockClosed,
    title: '4. Data Security',
    content: `We are committed to protecting your personal data. Our security measures include:

• Secure JWT-based authentication with refresh token rotation
• Passwords hashed using bcrypt with industry-standard salt rounds
• All data transmitted over HTTPS/TLS encryption
• Database hosted on Neon PostgreSQL with encrypted connections
• Regular security audits and dependency updates
• Rate limiting and request sanitization middleware`,
  },
  {
    icon: HiShieldCheck,
    title: '5. Your Rights & Data Control',
    content: `You have the right to:

• Access, update, or delete your personal account data at any time
• Request a copy of the data we hold about you
• Opt out of marketing communications
• Withdraw cookie consent at any time
• Request data portability

To exercise any of these rights, contact us at hadushmobilesoftware@gmail.com.`,
  },
  {
    icon: HiMail,
    title: '6. Contact Us',
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

• Email: hadushmobilesoftware@gmail.com
• Phone: +251 714 224 955
• Location: Ethiopia

This policy was last updated on August 2026. We reserve the right to update this policy and will notify users of any significant changes.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — Ryoit</title>
        <meta
          name="description"
          content="Learn how Ryoit collects, uses, and protects your personal information across our courses, marketplace, and digital services."
        />
      </Helmet>

      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-semibold mb-6">
              <HiShieldCheck className="w-4 h-4" />
              Legal Document
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-dark-text mb-4">
              Privacy Policy
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-lg">
              Last updated: <strong>August 2026</strong>
            </p>
            <p className="text-light-muted dark:text-dark-muted mt-4 max-w-2xl mx-auto">
              Ryoit is committed to transparency. This policy explains what data we collect, how we use it, 
              and the rights you have over your information.
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <h2 className="text-xl font-display font-bold text-light-text dark:text-dark-text">
                    {section.title}
                  </h2>
                </div>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
