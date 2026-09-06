import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { HiSearch, HiClock, HiUsers, HiStar, HiFilter, HiX } from 'react-icons/hi'
import { cn, formatPrice } from '@/utils'
import { coursesService } from '@/services/courses.service'
import { COURSES_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'
import type { Course } from '@/types'

const CATEGORIES = [
  { name: 'All Categories', value: 'all' },
  { name: 'Facebook Marketing', value: 'facebook-marketing' },
  { name: 'Instagram Marketing', value: 'instagram-marketing' },
  { name: 'TikTok Marketing', value: 'tiktok-marketing' },
  { name: 'YouTube Marketing', value: 'youtube-marketing' },
  { name: 'Telegram Marketing', value: 'telegram-marketing' },
  { name: 'SEO', value: 'seo' },
  { name: 'Affiliate Marketing', value: 'affiliate-marketing' },
  { name: 'Dropshipping', value: 'dropshipping' },
  { name: 'Digital Advertising', value: 'digital-advertising' },
  { name: 'Content Creation', value: 'content-creation' },
  { name: 'Video Editing', value: 'video-editing' },
  { name: 'Canva', value: 'canva' },
  { name: 'CapCut', value: 'capcut' },
  { name: 'Business Branding', value: 'business-branding' },
  { name: 'Google Ads', value: 'google-ads' },
  { name: 'Meta Ads', value: 'meta-ads' },
  { name: 'TikTok Ads', value: 'tiktok-ads' },
  { name: 'Email Marketing', value: 'email-marketing' },
  { name: 'Freelancing', value: 'freelancing' },
  { name: 'Business Management', value: 'business-management' },
]

export default function CoursesPage() {
  const [selectedCat, setSelectedCat] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileFilter, setShowMobileFilter] = useState(false)

  // Live query from backend API
  const { data: apiResponse } = useQuery({
    queryKey: ['courses-list', selectedCat, searchQuery],
    queryFn: async () => {
      const res = await coursesService.getAll({
        category: selectedCat === 'all' ? undefined : (selectedCat as any),
        search: searchQuery || undefined,
      })
      return res.data?.data || []
    },
    staleTime: 30000,
  })

  // Combine or fallback to COURSES_DATA
  const allCourses: Course[] = (apiResponse && apiResponse.length > 0 ? apiResponse : COURSES_DATA) as Course[]

  const filtered = allCourses.filter((course) => {
    const matchesCat = selectedCat === 'all' || course.category === selectedCat
    const matchesSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.shortDescription || course.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

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
            Courses
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title mb-6"
          >
            Digital Marketing <span className="gradient-text">Courses</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-subtitle mx-auto"
          >
            Learn modern marketing, design, branding, and ads management step-by-step from scratch.
          </motion.p>
        </div>

        {/* Search & Mobile Filter Toggle */}
        <div className="flex gap-4 items-center mb-8 max-w-5xl mx-auto">
          <div className="relative flex-1">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-light-muted w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="input pl-11"
            />
          </div>
          <button
            onClick={() => setShowMobileFilter(false)}
            className="btn-outline btn-md md:hidden shrink-0"
          >
            <HiFilter className="w-5 h-5" /> Filter
          </button>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start max-w-6xl mx-auto">
          {/* Categories Sidebar (Desktop) */}
          <div className="hidden md:block glass-card rounded-2xl p-5 border border-light-border dark:border-dark-border max-h-[80vh] overflow-y-auto">
            <h3 className="font-display font-bold text-sm text-light-text dark:text-dark-text mb-4 uppercase tracking-wider">
              Categories
            </h3>
            <div className="flex flex-col gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCat(cat.value)}
                  className={cn(
                    'text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    selectedCat === cat.value
                      ? 'bg-primary-500/10 text-primary-500 font-bold'
                      : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Courses List */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filtered.length > 0 ? (
              filtered.map((course, index) => {
                const discount = course.discountPrice
                  ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
                  : null
                return (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/courses/${course.slug}`} className="block group">
                      <div className="card-hover h-full flex flex-col">
                        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                          <img
                            src={course.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80'}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {discount && (
                            <span className="absolute top-3 left-3 badge-danger badge">-{discount}% OFF</span>
                          )}
                          <span className="absolute top-3 right-3 badge-primary badge capitalize">
                            {course.level || 'beginner'}
                          </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-light-muted dark:text-dark-muted line-clamp-2 mb-4 flex-1">
                            {course.shortDescription || course.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted mb-4">
                            <span className="flex items-center gap-1"><HiClock /> {typeof course.duration === 'number' ? `${course.duration}m` : course.duration || '10 hours'}</span>
                            <span className="flex items-center gap-1"><HiUsers /> {course.totalStudents || 100}</span>
                            <span className="flex items-center gap-1 text-yellow-500"><HiStar /> {course.rating || 4.9}</span>
                          </div>
                          <div className="flex items-baseline gap-2 pt-4 border-t border-light-border dark:border-dark-border">
                            <span className="font-display font-bold text-base text-light-text dark:text-dark-text">
                              {course.currency || 'ETB'} {(course.discountPrice ?? course.price ?? 0).toLocaleString()}
                            </span>
                            {course.discountPrice && (
                              <span className="text-xs text-light-muted line-through">
                                {course.currency || 'ETB'} {course.price.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-light-muted dark:text-dark-muted">
                No courses found under this category or search term.
              </div>
            )}
          </div>
        </div>

        {/* Ad Unit */}
        <div className="mt-12 max-w-6xl mx-auto">
          <AdSenseAd slotId="4047270762" />
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-80 h-full bg-light-surface dark:bg-dark-surface p-6 overflow-y-auto relative flex flex-col">
            <button
              onClick={() => setShowMobileFilter(false)}
              className="absolute top-4 right-4 text-light-muted hover:text-light-text dark:hover:text-dark-text"
            >
              <HiX className="w-6 h-6" />
            </button>
            <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-6 mt-4">
              Filter Categories
            </h3>
            <div className="flex flex-col gap-2 overflow-y-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    setSelectedCat(cat.value)
                    setShowMobileFilter(false)
                  }}
                  className={cn(
                    'text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors',
                    selectedCat === cat.value
                      ? 'bg-primary-500/10 text-primary-500 font-bold'
                      : 'text-light-muted dark:text-dark-muted hover:bg-light-border/30 dark:hover:bg-dark-border/30'
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
