import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  HiCheckCircle,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiShieldCheck,
  HiAcademicCap,
  HiCog,
  HiTrendingUp,
} from 'react-icons/hi'

export default function AboutPage() {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Ryoit',
    url: 'https://ryoit.com',
    logo: 'https://ryoit.com/logo.png',
    description:
      'Professional training academy and technical repair hub specializing in digital advertising, SEO, smartphone firmware flashing, and hardware diagnostics.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Addis Ababa',
      addressCountry: 'ET',
    },
    founder: {
      '@type': 'Person',
      name: 'Hadush Brhane Belay',
      jobTitle: 'Founder & Technical Director',
    },
  }

  return (
    <>
      <Helmet>
        <title>About Ryoit — Digital Marketing Academy & Mobile Repair Diagnostics Hub</title>
        <meta
          name="description"
          content="Learn about Ryoit, founded by Hadush Brhane Belay in Addis Ababa, Ethiopia. We provide hands-on digital marketing education and verified mobile hardware/software repair solutions."
        />
        <link rel="canonical" href="https://ryoit.com/about" />
        <meta property="og:title" content="About Ryoit — Digital Marketing Academy & Mobile Repair Diagnostics Hub" />
        <meta
          property="og:description"
          content="Learn about Ryoit, founded by Hadush Brhane Belay in Addis Ababa, Ethiopia. We provide hands-on digital marketing education and verified mobile hardware/software repair solutions."
        />
        <meta property="og:url" content="https://ryoit.com/about" />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-5xl">
          {/* Hero Section */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-primary badge mb-4"
            >
              Our Mission & Philosophy
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title mb-6 text-light-text dark:text-dark-text"
            >
              Practical Skills for Modern <span className="gradient-text">Technicians & Marketers</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-subtitle mx-auto"
            >
              Ryoit is a specialized educational academy and engineering portal bridging the gap between digital growth strategies and deep smartphone electronics repair.
            </motion.p>
          </div>

          {/* Core Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border">
              <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-4">
                <HiTrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
                Performance Marketing
              </h3>
              <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                Step-by-step frameworks on Meta Ads, Google PPC campaigns, TikTok scaling, technical SEO, and conversion tracking without academic fluff.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border">
              <div className="w-12 h-12 rounded-2xl bg-accent-500/10 text-accent-500 flex items-center justify-center mb-4">
                <HiCog className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
                GSM & Flashing Engineering
              </h3>
              <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                Workshop-tested software unlocking, baseband calibration, Samsung Odin flashing, and Qualcomm emergency download (EDL) repair guides.
              </p>
            </div>

            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <HiShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
                Editorial Rigor & Verification
              </h3>
              <p className="text-xs sm:text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                Every guide is tested on actual bench hardware or active ad spend accounts before publication to ensure 100% safety and accuracy.
              </p>
            </div>
          </div>

          {/* Story & Background Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-light-text dark:text-dark-text">
                The Story Behind Ryoit
              </h2>
              <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted leading-relaxed">
                Founded in Addis Ababa, Ethiopia, Ryoit emerged from hands-on repair bench experience and active digital marketing consultancy. Seeing countless technicians struggle with outdated guides, corrupted firmware mirrors, and generic advertising advice, we established Ryoit as an authoritative, verified knowledge base.
              </p>
              <p className="text-sm sm:text-base text-light-muted dark:text-dark-muted leading-relaxed">
                Our dual focus reflects the modern tech entrepreneur: mastering local and international digital monetization channels while maintaining technical proficiency in electronics, smartphone diagnostics, and GSM tools.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  '100% Workshop-tested repair workflows & stock ROM links',
                  'Practical ad campaign setups with real metrics & ROAS tracking',
                  'Localized instruction tailored for Ethiopian & international markets',
                  'Transparent legal terms and zero misleading content',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <HiCheckCircle className="w-5 h-5 text-primary-500 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-light-text dark:text-dark-text">{point}</span>
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
              <div className="aspect-square sm:aspect-video rounded-3xl overflow-hidden glass-card p-2 border border-light-border dark:border-dark-border">
                <img
                  src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80"
                  alt="Mobile Hardware Repair Laboratory"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
          </div>

          {/* Founder Profile Card */}
          <div className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-light-border dark:border-dark-border shadow-card dark:shadow-dark text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-primary mx-auto flex items-center justify-center text-white text-2xl font-bold font-display mb-4 shadow-md">
              HB
            </div>
            <h3 className="font-display font-bold text-2xl text-light-text dark:text-dark-text mb-1">
              Hadush Brhane Belay
            </h3>
            <p className="text-xs uppercase tracking-wider text-primary-500 font-bold mb-4">
              Founder, Lead Instructor & GSM Diagnostics Specialist
            </p>
            <p className="text-sm text-light-muted dark:text-dark-muted mb-8 max-w-2xl mx-auto leading-relaxed">
              With extensive experience in smartphone board-level diagnostics, GSM flashing utilities, and digital campaign architecture, Hadush oversees all technical guides, curriculum standards, and marketplace moderation on Ryoit.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-10 pt-4 border-t border-light-border dark:border-dark-border/60">
              <a
                href="mailto:hadushmobilesoftware@gmail.com"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-light-text dark:text-dark-text hover:text-primary-500 transition-colors"
              >
                <HiMail className="w-5 h-5 text-primary-500" />
                <span>hadushmobilesoftware@gmail.com</span>
              </a>
              <a
                href="tel:+251714224955"
                className="flex items-center gap-2.5 text-xs sm:text-sm text-light-text dark:text-dark-text hover:text-primary-500 transition-colors"
              >
                <HiPhone className="w-5 h-5 text-primary-500" />
                <span>+251 714 224 955</span>
              </a>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-light-text dark:text-dark-text">
                <HiLocationMarker className="w-5 h-5 text-primary-500" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
