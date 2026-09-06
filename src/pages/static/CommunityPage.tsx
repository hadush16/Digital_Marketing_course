import { motion } from 'framer-motion'
import { useState } from 'react'
import { AdSenseAd } from '@/components/ads'
import { HiChatAlt, HiThumbUp, HiEye, HiBadgeCheck, HiSearch } from 'react-icons/hi'

const TOPICS = [
  {
    id: '1',
    title: 'Unlock Tool login issues during Qualcomm flashing - MTK auth bypass',
    excerpt: 'Is anyone else experiencing timeouts on server authentication when attempting boot bypass on Snapdragon devices?',
    author: 'Daniel Negash',
    role: 'Hardware Tech',
    answers: 14,
    views: 320,
    likes: 28,
    tags: ['Qualcomm', 'UnlockTool', 'Flashing'],
    solved: true,
  },
  {
    id: '2',
    title: 'Best budget hot air rework station brand in Ethiopia?',
    excerpt: 'Looking to purchase a new solder station for chip-level motherboard repair. Should I go for Quick or Atten?',
    author: 'Yared T.',
    role: 'Repair Shop Owner',
    answers: 8,
    views: 180,
    likes: 12,
    tags: ['Hardware', 'Rework', 'Micro-soldering'],
    solved: false,
  },
  {
    id: '3',
    title: 'How to fix invalid IMEI after flashing Redmi Note 11 (MTK)?',
    excerpt: 'Redmi Note 11 got bricked, flashed stock ROM, now displays Null/Invalid IMEI. Any advice using Pandora or CM2?',
    author: 'Nati Mobile',
    role: 'GSM Specialist',
    answers: 23,
    views: 540,
    likes: 45,
    tags: ['Xiaomi', 'IMEI-Repair', 'Pandora-Box'],
    solved: true,
  },
  {
    id: '4',
    title: 'TikTok Ads Agency accounts setup from Ethiopia - Payment Methods',
    excerpt: 'What virtual dollar card providers work best for paying TikTok Business manager bills?',
    author: 'Saba G.',
    role: 'Media Buyer',
    answers: 19,
    views: 410,
    likes: 34,
    tags: ['TikTok-Ads', 'Agency-Account', 'Payments'],
    solved: true,
  },
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTopics = TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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
            Community
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            GSM & Marketers <span className="gradient-text">Forum</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Ask repair questions, share GSM tools tips, discuss Facebook campaigns, and collaborate with professionals.
          </motion.p>
        </div>

        {/* Search and Action Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 max-w-4xl mx-auto">
          <div className="relative w-full md:max-w-md">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics, questions, tools..."
              className="input pl-11"
            />
          </div>
          <button className="btn-primary btn-md w-full md:w-auto whitespace-nowrap">
            Ask a Question
          </button>
        </div>

        {/* Discussion List */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic, i) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card rounded-2xl p-6 border border-light-border dark:border-dark-border hover:border-primary-500/30 transition-colors shadow-sm"
              >
                <div className="flex items-start gap-4">
                  {/* Topic Stats */}
                  <div className="hidden sm:flex flex-col items-center gap-3 shrink-0 text-light-muted dark:text-dark-muted font-semibold text-xs min-w-16">
                    <div className="flex flex-col items-center p-2 rounded-xl bg-light-bg dark:bg-dark-bg w-full">
                      <HiChatAlt className="w-5 h-5 text-primary-500 mb-1" />
                      <span>{topic.answers} answers</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-xl bg-light-bg dark:bg-dark-bg w-full">
                      <HiThumbUp className="w-5 h-5 text-secondary-500 mb-1" />
                      <span>{topic.likes} votes</span>
                    </div>
                  </div>

                  {/* Topic Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs text-light-muted dark:text-dark-muted font-medium">
                        Posted by <span className="font-bold text-light-text dark:text-dark-text">{topic.author}</span> ({topic.role})
                      </span>
                      {topic.solved && (
                        <span className="badge-success badge text-[10px] py-0.5 px-2 flex items-center gap-1 font-bold">
                          <HiBadgeCheck className="w-3.5 h-3.5" /> Solved
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2 hover:text-primary-500 transition-colors cursor-pointer">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted mb-4 line-clamp-2 leading-relaxed">
                      {topic.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {topic.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded bg-primary-500/10 text-primary-500 dark:text-primary-400 text-xs font-semibold">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-light-muted dark:text-dark-muted mt-2 sm:mt-0">
                        <span className="flex items-center gap-1">
                          <HiEye className="w-4 h-4" /> {topic.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-light-muted dark:text-dark-muted">
              No discussions found matching your query.
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
