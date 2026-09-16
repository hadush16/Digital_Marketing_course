import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  HiClock,
  HiUsers,
  HiStar,
  HiCheck,
  HiPlay,
  HiLockClosed,
  HiChevronRight,
  HiArrowLeft,
  HiAcademicCap,
  HiBadgeCheck,
} from 'react-icons/hi'
import { cn } from '@/utils'
import { COURSES_DATA } from '@/data/mockDatabase'
import { AdSenseAd } from '@/components/ads'

export default function CourseDetailPage() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const course = COURSES_DATA.find((c) => c.slug === slug)

  if (!course) {
    return (
      <div className="py-16 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Course Not Found</h2>
          <p className="text-light-muted dark:text-dark-muted mb-6">The course you are looking for does not exist or has been updated.</p>
          <Link to="/courses" className="btn-primary btn-md">
            <HiArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  // JSON-LD Course Schema
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'Ryoit',
      sameAs: 'https://ryoit.com',
    },
    educationalLevel: course.level,
    inLanguage: course.language,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: course.currency,
      price: course.discountPrice ?? course.price,
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor.name,
      jobTitle: course.instructor.role,
    },
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
        name: 'Courses',
        item: 'https://ryoit.com/courses',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: course.title,
        item: `https://ryoit.com/courses/${course.slug}`,
      },
    ],
  }

  return (
    <>
      <Helmet>
        <title>{`${course.title} | Ryoit Academy`}</title>
        <meta name="description" content={course.shortDescription} />
        <link rel="canonical" href={`https://ryoit.com/courses/${course.slug}`} />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.shortDescription} />
        <meta property="og:image" content={course.thumbnail} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://ryoit.com/courses/${course.slug}`} />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
        <div className="container-custom max-w-6xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-light-muted dark:text-dark-muted mb-6">
            <Link to="/" className="hover:text-primary-500 transition-colors">Home</Link>
            <HiChevronRight className="w-3.5 h-3.5" />
            <Link to="/courses" className="hover:text-primary-500 transition-colors">Courses</Link>
            <HiChevronRight className="w-3.5 h-3.5" />
            <span className="text-light-text dark:text-dark-text font-medium truncate max-w-[240px] sm:max-w-md">
              {course.title}
            </span>
          </div>

          {/* Course Header Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
            {/* Headline Details */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="badge-primary badge capitalize">{course.level} Level</span>
                <span className="badge bg-primary-500/10 text-primary-500 border border-primary-500/20 text-xs font-semibold">
                  {course.language} Medium
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text leading-tight">
                {course.title}
              </h1>

              <p className="text-base text-light-muted dark:text-dark-muted leading-relaxed">
                {course.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-light-muted dark:text-dark-muted pt-2 border-y border-light-border dark:border-dark-border/40 py-4">
                <span className="flex items-center gap-1.5"><HiClock className="text-primary-500" /> {course.duration}</span>
                <span className="flex items-center gap-1.5"><HiUsers className="text-primary-500" /> {course.totalStudents.toLocaleString()} enrolled</span>
                <span className="flex items-center gap-1.5 text-yellow-500 font-bold"><HiStar className="fill-yellow-500" /> {course.rating} Rating</span>
                <span className="flex items-center gap-1.5 text-accent-600 font-semibold"><HiBadgeCheck className="w-4 h-4" /> Certificate Included</span>
              </div>
            </div>

            {/* Pricing Enrollment Box */}
            <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-lg sticky top-24">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative group cursor-pointer">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 text-primary-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <HiPlay className="w-6 h-6 ml-0.5" />
                  </div>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-display font-black text-3xl text-light-text dark:text-dark-text">
                  {course.currency} {(course.discountPrice ?? course.price).toLocaleString()}
                </span>
                {course.discountPrice && (
                  <span className="text-sm text-light-muted line-through">
                    {course.currency} {course.price.toLocaleString()}
                  </span>
                )}
              </div>

              <button className="btn-primary btn-md w-full mb-3" id="course-enroll-now">
                Enroll in Course
              </button>
              <p className="text-center text-xs text-light-muted dark:text-dark-muted">
                Lifetime Access • Direct Instructor Mentorship • Certificate
              </p>
            </div>
          </div>

          {/* Tab content wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              {/* Tabs Bar */}
              <div className="flex border-b border-light-border dark:border-dark-border gap-6 mb-8 overflow-x-auto">
                {['overview', 'curriculum', 'requirements', 'instructor'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      'pb-3 font-display font-bold text-sm capitalize transition-colors whitespace-nowrap border-b-2',
                      activeTab === tab
                        ? 'border-primary-500 text-primary-500'
                        : 'border-transparent text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Active Tab View */}
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-light-border dark:border-dark-border shadow-sm min-h-[300px]">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3">
                        Course Description
                      </h3>
                      <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                        {course.description}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3">
                        What You Will Master
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {course.objectives.map((obj) => (
                          <div key={obj} className="flex items-start gap-3 p-3 rounded-xl bg-light-surface dark:bg-dark-surface/50 border border-light-border dark:border-dark-border/40">
                            <HiCheck className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-sm text-light-text dark:text-dark-text">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-6">
                    {course.curriculum.map((section, sIdx) => (
                      <div key={sIdx} className="space-y-2">
                        <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider bg-light-bg dark:bg-dark-bg p-3.5 rounded-xl border border-light-border dark:border-dark-border flex items-center justify-between">
                          <span>{section.title}</span>
                          <span className="text-xs text-light-muted font-normal">{section.lessons.length} Lessons</span>
                        </h4>
                        <div className="divide-y divide-light-border dark:divide-dark-border/40 pl-2">
                          {section.lessons.map((lesson, lIdx) => (
                            <div key={lIdx} className="flex items-center justify-between py-3 text-xs sm:text-sm text-light-text dark:text-dark-text">
                              <span className="flex items-center gap-2.5">
                                <HiPlay className="w-4 h-4 text-primary-500 shrink-0" />
                                {lesson}
                              </span>
                              <HiLockClosed className="w-4 h-4 text-light-muted shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">
                      Course Prerequisites & Tools
                    </h3>
                    <ul className="space-y-2.5 text-sm text-light-muted dark:text-dark-muted">
                      {course.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2.5">
                          <HiCheck className="w-4 h-4 text-primary-500 shrink-0 mt-1" />
                          <span className="leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold font-display shrink-0">
                        {course.instructor.name[0]}
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-lg text-light-text dark:text-dark-text">
                          {course.instructor.name}
                        </h4>
                        <p className="text-xs text-light-muted dark:text-dark-muted">{course.instructor.role}</p>
                      </div>
                    </div>
                    <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed whitespace-pre-line">
                      {course.instructor.bio}
                    </p>
                  </div>
                )}
              </div>

              {/* In-page Course Ad */}
              <div className="mt-8">
                <span className="text-[10px] uppercase font-bold tracking-wider text-light-muted block mb-2 text-center">
                  Advertisement
                </span>
                <AdSenseAd slotId="4047270762" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
