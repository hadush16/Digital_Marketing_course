import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { HiArrowRight, HiSearch } from 'react-icons/hi'
import {
  agencyService,
  type AgencyService,
  type ServiceCategory,
  type SocialPlatform,
} from '@/services/agency.service'

export default function AgencyServicesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [services, setServices] = useState<AgencyService[]>([])
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const selectedCategory = searchParams.get('category') || ''
  const selectedPlatform = searchParams.get('platform') || ''

  useEffect(() => {
    Promise.all([agencyService.getPublicCategories(), agencyService.getPublicPlatforms()])
      .then(([catRes, platRes]) => {
        setCategories(catRes.data.data)
        setPlatforms(platRes.data.data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    agencyService
      .getPublicServices({
        limit: 60,
        search: search || undefined,
        category: selectedCategory || undefined,
        platform: selectedPlatform || undefined,
      })
      .then((res) => setServices(res.data.data))
      .finally(() => setLoading(false))
  }, [search, selectedCategory, selectedPlatform])

  const setFilter = (key: 'category' | 'platform', value: string) => {
    const next = new URLSearchParams(searchParams)
    if (value) next.set(key, value)
    else next.delete(key)
    setSearchParams(next)
  }

  return (
    <>
      <Helmet>
        <title>Agency Services — Ryoit Digital Marketing Agency</title>
        <meta
          name="description"
          content="Explore dynamic digital marketing, social media management, creator monetization guidance, and payment assistance services from Ryoit."
        />
      </Helmet>

      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom space-y-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-sm font-semibold mb-4">
              Ryoit Digital Marketing Agency
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-light-text dark:text-dark-text mb-4">
              Digital Growth &amp; <span className="gradient-text">Creator Services</span>
            </h1>
            <p className="text-light-muted dark:text-dark-muted text-base">
              Learn. Repair. Market. — Browse our dynamic service catalog managed in real time.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <div className="glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border space-y-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <HiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-muted w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search services (e.g. Facebook, YouTube, AdSense, SEO)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input pl-10 text-sm"
                />
              </div>
              <select
                value={selectedPlatform}
                onChange={(e) => setFilter('platform', e.target.value)}
                className="input md:w-52 text-sm"
              >
                <option value="">All Platforms</option>
                {platforms.map((p) => (
                  <option key={p.id} value={p.slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilter('category', '')}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    !selectedCategory
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-bg/40 text-light-muted dark:text-dark-muted hover:text-white border border-dark-border'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter('category', cat.slug)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-bg/40 text-light-muted dark:text-dark-muted hover:text-white border border-dark-border'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Services Grid */}
          {loading ? (
            <div className="py-20 text-center text-dark-muted">Loading services...</div>
          ) : services.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center text-light-muted dark:text-dark-muted">
              No matching published services found. Try clearing your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border flex flex-col hover:border-primary-500/40 transition-colors"
                >
                  {service.image && (
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                  )}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.platform && (
                      <span className="badge badge-primary text-[11px]">{service.platform.name}</span>
                    )}
                    {service.categories?.slice(0, 2).map((c) => (
                      <span key={c.category.id} className="badge bg-secondary-500/10 text-secondary-400 text-[11px]">
                        {c.category.name}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-display font-bold text-light-text dark:text-dark-text mb-2">
                    {service.title}
                  </h2>
                  <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed mb-4 flex-1">
                    {service.shortDescription}
                  </p>
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-1.5 mb-5">
                      {service.features.slice(0, 4).map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link
                    to={`/services/${service.slug}`}
                    className="btn-outline btn-sm flex items-center justify-center gap-2"
                  >
                    View Service Details <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
