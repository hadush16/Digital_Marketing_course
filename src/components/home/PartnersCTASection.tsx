import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HiArrowRight } from 'react-icons/hi'

const PARTNERS = [
  { name: 'UFI Box', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&q=80' },
  { name: 'Easy JTAG', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&q=80' },
  { name: 'Infinity CM2', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&q=80' },
  { name: 'Unlock Tool', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&q=80' },
  { name: 'Octoplus Box', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&q=80' },
  { name: 'Chimera Tool', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&q=80' },
]

export default function PartnersCTASection() {
  return (
    <>
      {/* Partners Section */}
      <section className="py-12 border-y border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface overflow-hidden">
        <div className="container-custom">
          <p className="text-center text-xs font-semibold text-light-muted dark:text-dark-muted uppercase tracking-wider mb-8">
            Trusted by Professional GSM & Marketing Teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 dark:opacity-40">
            {PARTNERS.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center text-white text-xs font-bold font-display group-hover:scale-110 transition-transform">
                  {partner.name[0]}
                </div>
                <span className="font-display font-bold text-sm text-light-text dark:text-dark-text group-hover:text-primary-500 transition-colors">
                  {partner.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section className="section bg-light-bg dark:bg-dark-bg relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-primary p-8 md:p-16 text-center text-white shadow-glow-lg relative overflow-hidden">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-secondary-500/10 blur-3xl pointer-events-none" />

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl mb-6 leading-tight"
            >
              Start Your Digital Success Journey Today
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Join thousands of professionals mastering digital marketing, phone flashing, software repairs, and building online service stores.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-card hover:bg-light-bg active:scale-95 transition-all inline-flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-primary-600/30 border border-white/20 text-white font-bold rounded-xl hover:bg-primary-600/50 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
              >
                Contact Support
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
