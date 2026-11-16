import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiCheck, HiArrowRight } from 'react-icons/hi'
import { agencyService, type AgencyService } from '@/services/agency.service'

export default function SocialServicesPage() {
  const [services, setServices] = useState<AgencyService[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    agencyService
      .getPublicServices({ serviceType: 'SOCIAL_MEDIA', limit: 30 })
      .then((res) => setServices(res.data.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-primary badge mb-4"
          >
            Social Media Services
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Social Media <span className="gradient-text">Management &amp; Growth</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Grow your digital presence on YouTube, Facebook, TikTok, and Instagram with Ryoit Digital Marketing Agency.
          </motion.p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-dark-muted">Loading social media services...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((srv, i) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border hover:border-primary-500/30 transition-all flex flex-col relative overflow-hidden"
              >
                {srv.platform && (
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-secondary">{srv.platform.name}</span>
                  </div>
                )}
                <h3 className="font-display font-extrabold text-xl text-light-text dark:text-dark-text mb-2 pr-16">
                  {srv.title}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted mb-5">{srv.shortDescription}</p>
                {srv.pricing && (
                  <div className="text-2xl font-display font-black text-primary-500 mb-5">{srv.pricing}</div>
                )}
                {srv.features && srv.features.length > 0 && (
                  <ul className="space-y-2 mb-6 flex-1">
                    {srv.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
                        <HiCheck className="w-4 h-4 text-primary-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                <Link to={`/services/${srv.slug}`} className="btn-primary btn-sm flex items-center justify-center gap-2 mt-auto">
                  Learn More &amp; Request <HiArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
