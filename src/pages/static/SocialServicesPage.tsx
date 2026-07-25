import { motion } from 'framer-motion'
import { HiCheck, HiShoppingCart, HiBadgeCheck } from 'react-icons/hi'

const SERVICES = [
  {
    id: '1',
    title: 'YouTube channel boosting',
    desc: 'Get genuine views and watch hours to clear monetization requirements faster.',
    price: '4,500 ETB',
    features: ['Real views/subscribers', 'Safe monetization compliance', '24/7 delivery support'],
    badge: 'Popular',
  },
  {
    id: '2',
    title: 'Facebook Page Boosting',
    desc: 'Target local audiences across Ethiopia to gain real likes, message leads, and engagement.',
    price: '3,000 ETB',
    features: ['Specific demographic targeting', 'Advert manager setup', 'Weekly summary reporting'],
    badge: 'Best Value',
  },
  {
    id: '3',
    title: 'TikTok account management',
    desc: 'Weekly scheduling of content, interaction responses, and profile setup optimization.',
    price: '6,000 ETB',
    features: ['Video content strategy', 'Account growth optimization', 'Weekly performance audit'],
    badge: 'Enterprise',
  },
]

export default function SocialServicesPage() {
  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-primary badge mb-4"
          >
            Services
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Social Media <span className="gradient-text">Boosting & Services</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Grow your digital presence on YouTube, Facebook, TikTok, and Instagram with our premium promotion and management solutions.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {SERVICES.map((srv, i) => (
            <motion.div
              key={srv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border hover:border-primary-500/30 transition-all flex flex-col relative overflow-hidden"
            >
              {srv.badge && (
                <div className="absolute top-4 right-4">
                  <span className="badge badge-secondary">{srv.badge}</span>
                </div>
              )}
              <h3 className="font-display font-extrabold text-xl text-light-text dark:text-dark-text mb-2">
                {srv.title}
              </h3>
              <p className="text-sm text-light-muted dark:text-dark-muted mb-6">
                {srv.desc}
              </p>
              <div className="flex items-baseline gap-1 mb-8 border-b border-light-border dark:border-dark-border pb-6">
                <span className="text-3xl font-display font-black text-light-text dark:text-dark-text">{srv.price}</span>
                <span className="text-xs text-light-muted dark:text-dark-muted font-bold">/ package</span>
              </div>
              <ul className="space-y-4 flex-1 mb-8">
                {srv.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-light-text dark:text-dark-text">
                    <HiCheck className="w-5 h-5 text-accent-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary btn-md w-full flex items-center justify-center gap-2">
                <HiShoppingCart className="w-5 h-5" /> Order Package
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 glass-card rounded-3xl p-8 max-w-4xl mx-auto border border-light-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent-500/10 text-accent-500 shrink-0">
              <HiBadgeCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-1">
                Looking for Custom Social Media Management?
              </h4>
              <p className="text-sm text-light-muted dark:text-dark-muted">
                We handle complete social media strategy, graphic design, content schedules, and ad buying for local brands.
              </p>
            </div>
          </div>
          <button className="btn-outline btn-md whitespace-nowrap">
            Request Custom Quote
          </button>
        </div>
      </div>
    </div>
  )
}
