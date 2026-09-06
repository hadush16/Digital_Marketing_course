import { motion } from 'framer-motion'
import { HiBriefcase, HiCurrencyDollar, HiLocationMarker, HiSearch } from 'react-icons/hi'
import { useState } from 'react'
import { AdSenseAd } from '@/components/ads'

const OPPS = [
  {
    id: '1',
    title: 'Remote Social Media Manager',
    company: 'ET Growth Digital',
    description: 'Manage Facebook page, Instagram profile, and Telegram announcements. Run weekly promotional boosting campaigns and respond to client inquiries.',
    location: 'Remote (Addis Ababa)',
    salary: '8,000 - 12,000 ETB / month',
    type: 'Full-time',
    tags: ['Facebook', 'Telegram', 'Copywriting'],
  },
  {
    id: '2',
    title: 'TikTok Content Creator',
    company: 'Amanuel Accessories & Shop',
    description: 'Create engaging short-form TikTok video clips promoting mobile phones, chargers, and premium cases. Basic CapCut or Premiere editing required.',
    location: 'Bole, Addis Ababa',
    salary: '6,000 - 10,000 ETB / month',
    type: 'Contract',
    tags: ['TikTok', 'CapCut', 'Video-Production'],
  },
  {
    id: '3',
    title: 'Google Ads & SEO Expert',
    company: 'Alpha Trading PLC',
    description: 'Optimize Google Search Console, keyword index ranking, and build highly targeted Google Ads campaigns to drive import lead generation.',
    location: 'Hybrid',
    salary: '15,000 - 20,000 ETB / month',
    type: 'Part-time',
    tags: ['Google-Ads', 'SEO', 'Lead-Generation'],
  },
]

export default function OpportunitiesPage() {
  const [search, setSearch] = useState('')

  const filtered = OPPS.filter(
    (o) =>
      o.title.toLowerCase().includes(search.toLowerCase()) ||
      o.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="badge-primary badge mb-4"
          >
            Opportunities
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Marketing <span className="gradient-text">Opportunities</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Find full-time jobs, freelance gigs, and project opportunities in social media management, media buying, and SEO across Ethiopia.
          </motion.p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search jobs, titles, or companies..."
              className="input pl-11"
            />
          </div>
        </div>

        {/* Opportunities List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filtered.length > 0 ? (
            filtered.map((opp, i) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-primary-500/30 transition-colors shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-1">
                      {opp.title}
                    </h3>
                    <p className="text-sm font-semibold text-primary-500 mb-4">{opp.company}</p>
                    <p className="text-sm text-light-muted dark:text-dark-muted mb-4 leading-relaxed">
                      {opp.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {opp.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-primary-500/10 text-primary-500 dark:text-primary-400 text-xs font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="sm:text-right shrink-0 space-y-2 border-t sm:border-t-0 border-light-border dark:border-dark-border pt-4 sm:pt-0">
                    <span className="badge badge-secondary">{opp.type}</span>
                    <div className="flex sm:justify-end items-center gap-1.5 text-xs text-light-muted dark:text-dark-muted">
                      <HiLocationMarker className="w-4 h-4 text-primary-500" />
                      <span>{opp.location}</span>
                    </div>
                    <div className="flex sm:justify-end items-center gap-1.5 text-xs text-light-muted dark:text-dark-muted">
                      <HiCurrencyDollar className="w-4 h-4 text-accent-500" />
                      <span className="font-bold text-light-text dark:text-dark-text">{opp.salary}</span>
                    </div>
                    <button className="btn-primary btn-sm w-full sm:w-auto mt-2">
                      Apply Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-light-muted dark:text-dark-muted">
              No marketing opportunities found.
            </div>
          )}
        </div>

        {/* Ad Unit */}
        <div className="mt-12 max-w-4xl mx-auto">
          <AdSenseAd slotId="4047270762" />
        </div>
      </div>
    </div>
  )
}
