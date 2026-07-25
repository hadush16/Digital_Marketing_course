import { motion } from 'framer-motion'
import { HiCheckCircle, HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

export default function AboutPage() {
  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-primary badge mb-4"
          >
            About Us
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Empowering Digital & Repair Specialists in <span className="gradient-text">Ethiopia</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Ryoit is a professional educational and service marketplace platform designed to bridge the gap in digital marketing expertise and practical mobile hardware/software repair techniques.
          </motion.p>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold font-display text-light-text dark:text-dark-text">
              Our Vision & Mission
            </h2>
            <p className="text-light-muted dark:text-dark-muted leading-relaxed">
              We focus on practical education. Unlike traditional platforms that teach coding tutorials, we specialize in high-demand, real-world skills: Mobile diagnostics, micro-soldering, device flashing, unlocking, Google/Meta Advertising, SEO, and social platform growth.
            </p>
            <div className="space-y-3">
              {[
                'Practical Mobile Repair & Flashing Education',
                'No Coding/Software Development Bloat',
                'Direct Marketing Opportunity Connections',
                'Secure Digital Service & Account Marketplace',
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <HiCheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                  <span className="text-sm font-medium text-light-text dark:text-dark-text">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-video rounded-3xl overflow-hidden glass-card p-2">
              <img
                src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
                alt="Mobile Hardware Repair"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* Decors */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-500/10 rounded-full blur-xl pointer-events-none" />
          </motion.div>
        </div>

        {/* Contact Info Card */}
        <div className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-light-border dark:border-dark-border shadow-card dark:shadow-dark text-center">
          <h3 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-4">
            Connect With the Founder
          </h3>
          <p className="text-light-muted dark:text-dark-muted mb-8 max-w-xl mx-auto">
            Have questions regarding custom sponsorships, platform features, or courses? Reach out to Hadush Brhane directly.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            <a href="mailto:hadushmobilesoftware@gmail.com" className="flex items-center gap-3 text-light-text dark:text-dark-text hover:text-primary-500 transition-colors">
              <HiMail className="w-6 h-6 text-primary-500" />
              <span>hadushmobilesoftware@gmail.com</span>
            </a>
            <a href="tel:+251714224955" className="flex items-center gap-3 text-light-text dark:text-dark-text hover:text-primary-500 transition-colors">
              <HiPhone className="w-6 h-6 text-primary-500" />
              <span>+251 714 224 955</span>
            </a>
            <div className="flex items-center gap-3 text-light-text dark:text-dark-text">
              <HiLocationMarker className="w-6 h-6 text-primary-500" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
