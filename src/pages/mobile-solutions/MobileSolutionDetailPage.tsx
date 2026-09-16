import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  HiStar,
  HiEye,
  HiDownload,
  HiChevronRight,
  HiCheck,
  HiExclamation,
  HiShieldCheck,
  HiCog,
  HiChip,
  HiArrowLeft,
  HiSparkles,
} from 'react-icons/hi'
import { SOLUTIONS_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'

export default function MobileSolutionDetailPage() {
  const { slug } = useParams()
  const solution = SOLUTIONS_DATA.find((s) => s.slug === slug)

  const [comments, setComments] = useState(solution?.comments || [])
  const [newComment, setNewComment] = useState('')

  if (!solution) {
    return (
      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Solution Not Found</h2>
          <p className="text-light-muted dark:text-dark-muted mb-6">The mobile repair solution you are looking for does not exist or has been relocated.</p>
          <Link to="/mobile-solutions" className="btn-primary btn-md">
            <HiArrowLeft className="w-4 h-4 mr-2" /> Back to Mobile Solutions
          </Link>
        </div>
      </div>
    )
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setComments([
      ...comments,
      { id: Date.now().toString(), author: 'GSM Tech', text: newComment, date: 'Just now' },
    ])
    setNewComment('')
  }

  const relatedSolutions = SOLUTIONS_DATA.filter((s) => s.id !== solution.id).slice(0, 3)

  // JSON-LD HowTo Schema
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: solution.title,
    description: solution.shortDescription,
    image: solution.thumbnail,
    tool: solution.tools.map((t) => ({ '@type': 'HowToTool', name: t })),
    supply: solution.requirements.map((r) => ({ '@type': 'HowToSupply', name: r })),
    step: solution.instructions.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      text: step,
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://ryoit.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Mobile Solutions',
        item: 'https://ryoit.com/mobile-solutions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: solution.title,
        item: `https://ryoit.com/mobile-solutions/${solution.slug}`,
      },
    ],
  }

  return (
    <>
      <Helmet>
        <title>{`${solution.title} | Mobile Repair Guide — Ryoit`}</title>
        <meta name="description" content={solution.shortDescription} />
        <link rel="canonical" href={`https://ryoit.com/mobile-solutions/${solution.slug}`} />
        <meta property="og:title" content={solution.title} />
        <meta property="og:description" content={solution.shortDescription} />
        <meta property="og:image" content={solution.thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ryoit.com/mobile-solutions/${solution.slug}`} />
        <script type="application/ld+json">{JSON.stringify(howToSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-6xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted mb-6">
            <Link to="/" className="hover:text-accent-500 transition-colors">Home</Link>
            <HiChevronRight className="w-3.5 h-3.5" />
            <Link to="/mobile-solutions" className="hover:text-accent-500 transition-colors">Mobile Solutions</Link>
            <HiChevronRight className="w-3.5 h-3.5" />
            <span className="text-light-text dark:text-dark-text font-medium truncate max-w-[240px] sm:max-w-md">
              {solution.title}
            </span>
          </div>

          {/* Banner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-accent badge capitalize">
                  {solution.brand} • {solution.category.replace(/-/g, ' ')}
                </span>
                <span className="badge bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 text-xs font-semibold flex items-center gap-1">
                  <HiShieldCheck className="w-3.5 h-3.5" /> Workshop Tested
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text leading-tight">
                {solution.title}
              </h1>

              <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                {solution.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-light-muted dark:text-dark-muted py-4 border-y border-light-border dark:border-dark-border/40">
                <span className="flex items-center gap-1.5 text-yellow-500 font-bold">
                  <HiStar className="fill-yellow-500" /> {solution.rating} Rating
                </span>
                <span className="flex items-center gap-1.5">
                  <HiEye /> {solution.views.toLocaleString()} verified views
                </span>
                <span className="text-accent-600 dark:text-accent-400 font-semibold">
                  Compatibility: {solution.brand} Devices
                </span>
              </div>

              {/* Technical Overview */}
              <div className="pt-2">
                <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3 flex items-center gap-2">
                  <HiChip className="text-accent-500" /> Technical Architecture & Overview
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                  {solution.description}
                </p>
              </div>
            </div>

            {/* Requirements & Tooling Box */}
            <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-lg">
              <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-4 uppercase tracking-wider flex items-center gap-2">
                <HiCog className="text-accent-500 w-5 h-5" /> Hardware & Software Prerequisites
              </h3>

              <ul className="space-y-3 mb-6">
                {solution.requirements.map((req) => (
                  <li key={req} className="flex items-start gap-2.5 text-xs sm:text-sm text-light-text dark:text-dark-text">
                    <HiCheck className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                    <span className="leading-snug">{req}</span>
                  </li>
                ))}
              </ul>

              {/* Verified Tools Badges */}
              <div className="pt-4 border-t border-light-border dark:border-dark-border/60">
                <h4 className="text-xs uppercase tracking-wider font-bold text-light-muted dark:text-dark-muted mb-2">
                  Required Software & Drivers
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {solution.tools.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-accent-500/10 text-accent-600 dark:text-accent-400 border border-accent-500/20 text-xs font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Safety Warning Callout */}
          <div className="mb-10 rounded-2xl p-5 border bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-200 flex items-start gap-3.5">
            <HiExclamation className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm leading-relaxed">
              <strong className="block font-bold mb-1">Technician Safety & Compliance Advisory:</strong>
              Flashing custom firmware or conducting board-level hardware separation carries risk of permanent bootloop or component damage if proper ESD safety, thermal limits, and battery disconnection rules are ignored. Always back up existing calibration partitions (EFS, SEC_EFS, QCN, NVRAM) before writing image blocks.
            </div>
          </div>

          {/* Steps and Downloads Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 items-start">
            {/* Steps Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-light-border dark:border-dark-border shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text flex items-center gap-2">
                    <HiSparkles className="text-accent-500" /> Step-by-Step Diagnostic Workflow
                  </h3>
                  <span className="text-xs text-light-muted dark:text-dark-muted font-medium">
                    {solution.instructions.length} Sequential Steps
                  </span>
                </div>

                <div className="space-y-4">
                  {solution.instructions.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-light-surface dark:bg-dark-surface/50 border border-light-border dark:border-dark-border/60 flex items-start gap-3.5"
                    >
                      <div className="w-7 h-7 rounded-xl bg-accent-500 text-white font-display font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {idx + 1}
                      </div>
                      <p className="text-xs sm:text-sm text-light-text dark:text-dark-text leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mid-content AdSlot */}
              <div className="py-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-light-muted block mb-2 text-center">
                  Advertisement
                </span>
                <AdSenseAd slotId="4047270762" />
              </div>
            </div>

            {/* Downloads & Tools Column */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-md">
                <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                  <HiDownload className="text-accent-500" /> Verified Files & Firmware
                </h3>
                <p className="text-xs text-light-muted dark:text-dark-muted mb-4 leading-relaxed">
                  Clean mirror repositories verified against SHA-256 checksums to ensure zero malware or corruption.
                </p>
                <div className="space-y-3">
                  {solution.downloads.map((file) => (
                    <div
                      key={file.label}
                      className="p-3.5 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border/40 flex items-center justify-between gap-2"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-light-text dark:text-dark-text truncate max-w-[170px]">
                          {file.label}
                        </h4>
                        <span className="text-[10px] text-light-muted block">{file.size} • Verified Mirror</span>
                      </div>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-accent-500/10 hover:bg-accent-500 text-accent-600 hover:text-white transition-colors shrink-0"
                        title="Download file"
                      >
                        <HiDownload className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="max-w-4xl glass-card rounded-3xl p-6 sm:p-8 border border-light-border dark:border-dark-border shadow-sm mb-12">
            <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
              Technician Discussion & Troubleshooting Logs
            </h3>
            <p className="text-xs text-light-muted dark:text-dark-muted mb-6">
              Share real-world bench test results, driver compatibility notes, and chip revisions.
            </p>

            <div className="space-y-3 mb-6">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border/40">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-light-text dark:text-dark-text">{c.author}</span>
                    <span className="text-[10px] text-light-muted">{c.date}</span>
                  </div>
                  <p className="text-xs text-light-muted dark:text-dark-muted leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleCommentSubmit} className="flex gap-3">
              <input
                type="text"
                required
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Post a diagnostic tip or question..."
                className="input flex-1 text-xs sm:text-sm"
              />
              <button type="submit" className="btn-primary btn-md">
                Post Log
              </button>
            </form>
          </div>

          {/* Related Solutions */}
          {relatedSolutions.length > 0 && (
            <div className="pt-8 border-t border-light-border dark:border-dark-border/60">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-xl text-light-text dark:text-dark-text">
                  Related Diagnostics & Solutions
                </h3>
                <Link to="/mobile-solutions" className="text-xs sm:text-sm font-semibold text-accent-600 dark:text-accent-400 hover:underline flex items-center gap-1">
                  Browse All <HiChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedSolutions.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/mobile-solutions/${rel.slug}`}
                    className="card-hover flex flex-col group rounded-2xl overflow-hidden"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={rel.thumbnail}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <span className="badge-accent badge text-[10px] mb-2 self-start">
                        {rel.brand} • {rel.category.replace(/-/g, ' ')}
                      </span>
                      <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-accent-500 transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-3 flex-1">
                        {rel.shortDescription}
                      </p>
                      <div className="text-[10px] text-light-muted dark:text-dark-muted border-t border-light-border dark:border-dark-border/40 pt-2 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-yellow-500"><HiStar /> {rel.rating}</span>
                        <span>{rel.views.toLocaleString()} views</span>
                      </div>
                    </div>
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
