import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import {
  HiTrendingUp,
  HiCursorClick,
  HiCode,
  HiColorSwatch,
  HiLightBulb,
  HiChatAlt2,
  HiArrowRight,
} from 'react-icons/hi'

const services = [
  {
    icon: HiTrendingUp,
    tag: 'Popular',
    tagColor: 'bg-green-500/10 text-green-500',
    title: 'SEO & Organic Growth Acceleration',
    desc: 'Complete technical SEO audit, high-intent keyword mapping, backlink building, and content strategy to grow your organic traffic sustainably.',
    features: ['Technical SEO Audit', 'Keyword Research', 'Link Building', 'Content Strategy'],
  },
  {
    icon: HiCursorClick,
    tag: 'Featured',
    tagColor: 'bg-blue-500/10 text-blue-500',
    title: 'PPC & Performance Meta Ads',
    desc: 'Data-driven paid ad campaigns across Google Ads, Meta, TikTok, and LinkedIn with full ROI tracking and optimization.',
    features: ['Google Ads', 'Meta Ads', 'TikTok Campaigns', 'ROI Reporting'],
  },
  {
    icon: HiCode,
    tag: 'Agency',
    tagColor: 'bg-primary-500/10 text-primary-500',
    title: 'Custom Mobile App & Web Development',
    desc: 'Enterprise React dashboards, cross-platform Flutter applications, and production-ready REST/GraphQL API backends.',
    features: ['React / Next.js', 'Flutter Mobile', 'REST & GraphQL APIs', 'Cloud Deployment'],
  },
  {
    icon: HiColorSwatch,
    tag: 'Creative',
    tagColor: 'bg-pink-500/10 text-pink-500',
    title: 'Brand Strategy & Design System',
    desc: 'Logo design, complete brand identity guidelines, visual assets, UI prototyping, and design systems for your business.',
    features: ['Logo Design', 'Brand Guidelines', 'UI/UX Prototyping', 'Visual Assets'],
  },
  {
    icon: HiLightBulb,
    tag: 'Strategy',
    tagColor: 'bg-yellow-500/10 text-yellow-500',
    title: 'Social Media Management',
    desc: 'Full social media account management including content calendars, scheduling, community management, and growth analytics.',
    features: ['Content Calendar', 'Posting & Scheduling', 'Community Management', 'Growth Analytics'],
  },
  {
    icon: HiChatAlt2,
    tag: 'Consulting',
    tagColor: 'bg-orange-500/10 text-orange-500',
    title: 'Digital Marketing Consulting',
    desc: 'One-on-one consulting sessions, marketing audits, funnel optimization, and custom growth strategies for your business.',
    features: ['Marketing Audit', 'Funnel Optimization', '1-on-1 Sessions', 'Custom Strategy'],
  },
]

export default function AgencyServicesPage() {
  return (
    <>
      <Helmet>
        <title>Agency Services — Ryoit</title>
        <meta
          name="description"
          content="Ryoit offers professional digital marketing, SEO, PPC, web development, and brand strategy services for businesses in Ethiopia and beyond."
        />
      </Helmet>

      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-semibold mb-6">
              Agency Services
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-dark-text mb-6">
              Grow Your Business with{' '}
              <span className="gradient-text">Expert Agency Services</span>
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-lg max-w-2xl mx-auto">
              From SEO and paid ads to full custom app development — Ryoit's agency team delivers 
              measurable results for businesses ready to scale.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-8 flex flex-col group hover:border-primary-500/40 transition-colors"
              >
                {/* Icon & Tag Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center">
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${service.tagColor}`}>
                    {service.tag}
                  </span>
                </div>

                <h2 className="text-lg font-display font-bold text-light-text dark:text-dark-text mb-3">
                  {service.title}
                </h2>
                <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed mb-6 flex-1">
                  {service.desc}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-light-muted dark:text-dark-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/contact"
                  id={`service-consult-${service.tag.toLowerCase()}`}
                  className="btn-outline btn-sm flex items-center justify-center gap-2 group-hover:btn-primary transition-all"
                >
                  Request Consultation
                  <HiArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-20 text-center glass-card rounded-3xl p-12"
          >
            <h2 className="text-3xl font-display font-bold text-light-text dark:text-dark-text mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-light-muted dark:text-dark-muted mb-8 max-w-xl mx-auto">
              Book a free 30-minute discovery call with our agency team. We'll audit your current 
              digital presence and recommend the best path forward.
            </p>
            <a
              href="/contact"
              id="agency-free-discovery-cta"
              className="btn-primary btn-lg inline-flex items-center gap-2"
            >
              Book Free Discovery Call
              <HiArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </>
  )
}
