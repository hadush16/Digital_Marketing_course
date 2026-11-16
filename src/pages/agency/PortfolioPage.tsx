import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft, HiExternalLink } from 'react-icons/hi'
import { agencyService, type PortfolioProject } from '@/services/agency.service'

export default function PortfolioPage() {
  const { slug } = useParams<{ slug?: string }>()
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [selected, setSelected] = useState<PortfolioProject | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    if (slug) {
      agencyService
        .getProjectBySlug(slug)
        .then((res) => setSelected(res.data.data))
        .catch(() => setSelected(null))
        .finally(() => setLoading(false))
    } else {
      agencyService
        .getPublicPortfolio({ limit: 30 })
        .then((res) => setProjects(res.data.data))
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
          <title>{selected.title} — Ryoit Portfolio</title>
          <meta name="description" content={selected.description} />
        </Helmet>
        <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
          <div className="container-custom max-w-5xl space-y-8">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline font-semibold">
              <HiArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>

            <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                {selected.platform && <span className="badge badge-primary">{selected.platform.name}</span>}
                {selected.category && <span className="badge bg-secondary-500/15 text-secondary-300">{selected.category.name}</span>}
                {selected.clientName && <span className="text-xs text-dark-muted">Client: {selected.clientName}</span>}
              </div>
              <h1 className="text-3xl font-display font-black text-light-text dark:text-dark-text">{selected.title}</h1>
              <p className="text-light-muted dark:text-dark-muted whitespace-pre-line">{selected.description}</p>

              <div>
                <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">Work Performed</h2>
                <p className="text-sm text-light-muted dark:text-dark-muted whitespace-pre-line">{selected.workPerformed}</p>
              </div>

              {selected.resultsAnalytics && selected.resultsAnalytics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selected.resultsAnalytics.map((m, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-dark-bg/50 border border-dark-border text-center">
                      <p className="text-xl font-display font-black text-primary-500">{m.value}</p>
                      <p className="text-xs text-dark-muted mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {(selected.beforeImage || selected.afterImage) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selected.beforeImage && (
                    <div>
                      <p className="text-xs font-bold text-dark-muted mb-2 uppercase">Before</p>
                      <img src={selected.beforeImage} alt="Before" className="w-full rounded-2xl border border-dark-border" />
                    </div>
                  )}
                  {selected.afterImage && (
                    <div>
                      <p className="text-xs font-bold text-dark-muted mb-2 uppercase">After</p>
                      <img src={selected.afterImage} alt="After" className="w-full rounded-2xl border border-dark-border" />
                    </div>
                  )}
                </div>
              )}

              {selected.screenshots && selected.screenshots.length > 0 && (
                <div className="space-y-2">
                  <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text">Project Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selected.screenshots.map((url, i) => (
                      <img key={i} src={url} alt={`Screenshot ${i + 1}`} className="w-full rounded-2xl border border-dark-border object-cover" />
                    ))}
                  </div>
                </div>
              )}

              {selected.projectUrl && (
                <a href={selected.projectUrl} target="_blank" rel="noreferrer" className="btn-outline btn-sm inline-flex items-center gap-2">
                  Visit Project <HiExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Portfolio &amp; Completed Projects — Ryoit Digital Marketing Agency</title>
        <meta name="description" content="Verified client projects, social media management case studies, and creator monetization work by Ryoit Digital Marketing Agency." />
      </Helmet>
      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-black text-light-text dark:text-dark-text mb-4">
              Completed <span className="gradient-text">Agency Projects</span>
            </h1>
            <p className="text-light-muted dark:text-dark-muted">
              Verified work delivered by Ryoit Digital Marketing Agency across social media management, monetization readiness, and digital campaigns.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="glass-card rounded-3xl p-12 text-center text-light-muted dark:text-dark-muted">
              No published portfolio projects yet. Add projects in the Admin Console to display them here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((p) => (
                <Link
                  key={p.id}
                  to={`/portfolio/${p.slug}`}
                  className="glass-card rounded-2xl border border-light-border dark:border-dark-border overflow-hidden hover:border-primary-500/40 transition-all flex flex-col"
                >
                  {(p.afterImage || p.screenshots?.[0]) && (
                    <img src={p.afterImage || p.screenshots?.[0]} alt={p.title} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-6 flex-1 flex flex-col gap-2">
                    <span className="text-xs font-bold text-primary-500">
                      {p.platform?.name || p.category?.name || 'Agency Project'}
                    </span>
                    <h2 className="font-display font-bold text-lg text-light-text dark:text-dark-text">{p.title}</h2>
                    <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-3 flex-1">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

