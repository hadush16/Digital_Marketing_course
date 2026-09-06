import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiClock, HiEye, HiArrowLeft } from 'react-icons/hi'

import { NEWS_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'

export default function NewsDetailPage() {
  const { slug } = useParams()
  const DETAIL_MOCK = NEWS_DATA.find((n) => n.slug === slug)

  if (!DETAIL_MOCK) {
    return (
      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <Link to="/news" className="btn-primary btn-md">Back to News</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-4xl">
        <Link to="/news" className="inline-flex items-center gap-2 text-sm text-light-muted hover:text-primary-500 mb-8 font-medium">
          <HiArrowLeft className="w-4 h-4" /> Back to News
        </Link>

        {/* Article Header */}
        <div className="space-y-4 mb-8">
          <span className="badge-primary badge capitalize">
            {DETAIL_MOCK.category.replace(/-/g, ' ')}
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text leading-tight">
            {DETAIL_MOCK.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs text-light-muted dark:text-dark-muted py-3 border-y border-light-border dark:border-dark-border/40">
            <span className="flex items-center gap-1.5"><HiClock /> {DETAIL_MOCK.readTime} min read</span>
            <span className="flex items-center gap-1.5"><HiEye /> {DETAIL_MOCK.views.toLocaleString()} views</span>
            <span>Published on {new Date(DETAIL_MOCK.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Article Image */}
        <div className="glass-card rounded-3xl overflow-hidden border border-light-border dark:border-dark-border p-2 mb-8">
          <div className="aspect-video rounded-2xl overflow-hidden">
            <img
              src={DETAIL_MOCK.thumbnail}
              alt={DETAIL_MOCK.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content & Author */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Author Panel */}
          <div className="lg:col-span-1 border-b lg:border-b-0 lg:border-r border-light-border dark:border-dark-border/40 pb-6 lg:pb-0 lg:pr-6 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold font-display">
                {DETAIL_MOCK.author.name[0]}
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text">{DETAIL_MOCK.author.name}</h4>
                <p className="text-[10px] text-light-muted">{DETAIL_MOCK.author.role}</p>
              </div>
            </div>
          </div>

          {/* Reading body */}
          <div className="lg:col-span-3 prose-ryoit">
            <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line mb-8">
              {DETAIL_MOCK.content}
            </p>
            <AdSenseAd slotId="4047270762" />
          </div>
        </div>
      </div>
    </div>
  )
}
