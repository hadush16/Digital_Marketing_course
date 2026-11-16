import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi'
import { agencyService, type SocialPlatform } from '@/services/agency.service'

export default function PlatformsPage() {
  const { slug } = useParams<{ slug?: string }>()
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([])
  const [selected, setSelected] = useState<SocialPlatform | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (slug) {
      agencyService
        .getPlatformBySlug(slug)
        .then((res) => setSelected(res.data.data))
        .catch(() => setSelected(null))
        .finally(() => setLoading(false))
    } else {
      agencyService
        .getPublicPlatforms()
        .then((res) => setPlatforms(res.data.data))
        .finally(() => setLoading(false))
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
        <div className="w-10 h-10 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" />
      </div>
    )
  }

  if (slug && selected) {
    return (
      <>
        <Helmet>
          <title>{selected.name} Services &amp; Monetization — Ryoit Digital Marketing Agency</title>
          <meta name="description" content={selected.description || `Explore ${selected.name} services at Ryoit.`} />
        </Helmet>
        <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
          <div className="container-custom max-w-6xl space-y-10">
            <Link to="/platforms" className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline font-semibold">
              <HiArrowLeft className="w-4 h-4" /> All Social Media Platforms
            </Link>

            <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border">
              <div className="flex items-center gap-4 mb-4">
                {selected.logo && <img src={selected.logo} alt={selected.name} className="w-14 h-14 rounded-2xl object-cover" />}
                <div>
                  <h1 className="text-3xl font-display font-black text-light-text dark:text-dark-text">{selected.name}</h1>
                  {selected.platformUrl && (
                    <a href={selected.platformUrl} target="_blank" rel="noreferrer" className="text-xs text-primary-500 hover:underline">
                      {selected.platformUrl}
                    </a>
                  )}
                </div>
              </div>
              <p className="text-light-muted dark:text-dark-muted mb-6">{selected.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                {selected.monetizationOptions && selected.monetizationOptions.length > 0 && (
                  <div className="p-4 rounded-2xl bg-dark-bg/40 border border-dark-border">
                    <h3 className="font-bold text-white mb-2">Monetization Options</h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-dark-muted">
                      {selected.monetizationOptions.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                )}
                {selected.requirements && selected.requirements.length > 0 && (
                  <div className="p-4 rounded-2xl bg-dark-bg/40 border border-dark-border">
                    <h3 className="font-bold text-white mb-2">Key Requirements</h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-dark-muted">
                      {selected.requirements.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
                {selected.supportedCountries && selected.supportedCountries.length > 0 && (
                  <div className="p-4 rounded-2xl bg-dark-bg/40 border border-dark-border">
                    <h3 className="font-bold text-white mb-2">Supported Regions</h3>
                    <ul className="list-disc pl-4 space-y-1 text-xs text-dark-muted">
                      {selected.supportedCountries.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {selected.services && selected.services.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-light-text dark:text-dark-text">
                  Available {selected.name} Services
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {selected.services.map((srv) => (
                    <Link
                      key={srv.id}
                      to={`/services/${srv.slug}`}
                      className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-primary-500/40 transition-colors flex flex-col"
                    >
                      <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">{srv.title}</h3>
                      <p className="text-xs text-light-muted dark:text-dark-muted flex-1 mb-4">{srv.shortDescription}</p>
                      <span className="text-xs font-bold text-primary-500 inline-flex items-center gap-1">
                        View Details <HiArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Social Media Platforms — Ryoit Digital Marketing Agency</title>
        <meta name="description" content="Explore Facebook, YouTube, TikTok, Instagram, Telegram, WhatsApp, X, and LinkedIn services and monetization guidance." />
      </Helmet>
      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-black text-light-text dark:text-dark-text mb-4">
              Supported <span className="gradient-text">Social Media Platforms</span>
            </h1>
            <p className="text-light-muted dark:text-dark-muted">
              Select a platform to view monetization options, requirements, and Ryoit agency services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platforms.map((p) => (
              <Link
                key={p.id}
                to={`/platforms/${p.slug}`}
                className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-primary-500/40 transition-all flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  {p.logo ? (
                    <img src={p.logo} alt={p.name} className="w-10 h-10 rounded-xl object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-primary text-white font-bold flex items-center justify-center">
                      {p.name.charAt(0)}
                    </div>
                  )}
                  <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text">{p.name}</h2>
                </div>
                <p className="text-xs text-light-muted dark:text-dark-muted flex-1 line-clamp-3">{p.description}</p>
                <div className="text-xs font-semibold text-primary-500 flex items-center justify-between pt-2 border-t border-light-border dark:border-dark-border">
                  <span>{p._count?.services ?? 0} services</span>
                  <HiArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

