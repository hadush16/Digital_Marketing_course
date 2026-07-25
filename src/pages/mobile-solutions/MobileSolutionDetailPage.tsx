import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiStar, HiEye, HiDownload, HiChevronRight, HiCheck } from 'react-icons/hi'
import { cn } from '@/utils'

import { SOLUTIONS_DATA } from '@/data/mockDatabase'

export default function MobileSolutionDetailPage() {
  const { slug } = useParams()
  const SOLUTION_DETAIL = SOLUTIONS_DATA.find((s) => s.slug === slug)

  const [comments, setComments] = useState(SOLUTION_DETAIL?.comments || [])
  const [newComment, setNewComment] = useState('')

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return
    setComments([
      ...comments,
      { id: Date.now().toString(), author: 'Guest Tech', text: newComment, date: 'Just now' },
    ])
    setNewComment('')
  }

  if (!SOLUTION_DETAIL) {
    return (
      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Solution Not Found</h2>
          <Link to="/mobile-solutions" className="btn-primary btn-md">Back to Solutions</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-6xl">
        {/* Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4">
            <span className="badge-accent badge capitalize">{SOLUTION_DETAIL.brand} • {SOLUTION_DETAIL.category.replace(/-/g, ' ')}</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text leading-tight">
              {SOLUTION_DETAIL.title}
            </h1>
            <p className="text-sm text-light-muted dark:text-dark-muted">
              {SOLUTION_DETAIL.shortDescription}
            </p>
            <div className="flex items-center gap-6 text-sm text-light-muted dark:text-dark-muted pt-2 border-y border-light-border dark:border-dark-border/40 py-4">
              <span className="flex items-center gap-1.5 text-yellow-500"><HiStar className="fill-yellow-500" /> {SOLUTION_DETAIL.rating} Rating</span>
              <span className="flex items-center gap-1.5"><HiEye /> {SOLUTION_DETAIL.views.toLocaleString()} views</span>
            </div>

            {/* Overview */}
            <div className="pt-4">
              <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3">Overview</h3>
              <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                {SOLUTION_DETAIL.description}
              </p>
            </div>
          </div>

          {/* Requirements & Info Box */}
          <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-lg">
            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-4 uppercase tracking-wider flex items-center gap-2">
              <HiCheck className="text-accent-500" /> Requirements
            </h3>
            <ul className="space-y-3 mb-6">
              {SOLUTION_DETAIL.requirements.map((req) => (
                <li key={req} className="flex items-start gap-2.5 text-sm text-light-text dark:text-dark-text">
                  <HiCheck className="w-5 h-5 text-accent-500 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Steps and Downloads */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Steps */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-sm">
              <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-6">Step-by-step Instructions</h3>
              <div className="space-y-4">
                {SOLUTION_DETAIL.instructions.map((step) => (
                  <p key={step} className="text-sm text-light-muted dark:text-dark-muted leading-relaxed pl-2 border-l-2 border-accent-500/50">
                    {step}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Downloads Card */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-md">
              <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-4">Files & Tool Downloads</h3>
              <div className="space-y-3">
                {SOLUTION_DETAIL.downloads.map((file) => (
                  <div key={file.label} className="p-3.5 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border/40 flex items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-light-text dark:text-dark-text truncate max-w-[150px]">{file.label}</h4>
                      <span className="text-[10px] text-light-muted">{file.size}</span>
                    </div>
                    <button className="p-2 rounded-xl bg-accent-500/10 hover:bg-accent-500 text-accent-600 hover:text-dark-bg transition-colors shrink-0">
                      <HiDownload className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="max-w-4xl glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-sm">
          <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-6">Repair Comments</h3>
          <div className="space-y-4 mb-6">
            {comments.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-light-text dark:text-dark-text">{c.author}</span>
                  <span className="text-[10px] text-light-muted">{c.date}</span>
                </div>
                <p className="text-xs text-light-muted dark:text-dark-muted">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-3">
            <input
              type="text"
              required
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ask a question or report tool status..."
              className="input flex-1"
            />
            <button type="submit" className="btn-primary btn-md">Post</button>
          </form>
        </div>
      </div>
    </div>
  )
}
