import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiClock, HiUsers, HiStar, HiCheck, HiPlay, HiLockClosed } from 'react-icons/hi'
import { cn } from '@/utils'

import { COURSES_DATA } from '@/data/mockDatabase'

export default function CourseDetailPage() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const COURSE_DATA = COURSES_DATA.find((c) => c.slug === slug)

  if (!COURSE_DATA) {
    return (
      <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Link to="/courses" className="btn-primary btn-md">Back to Courses</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 bg-light-bg dark:bg-dark-bg min-h-screen">
      <div className="container-custom max-w-6xl">
        {/* Course Header Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          {/* Headline details */}
          <div className="lg:col-span-2 space-y-4">
            <span className="badge-primary badge capitalize">{COURSE_DATA.level}</span>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-light-text dark:text-dark-text leading-tight">
              {COURSE_DATA.title}
            </h1>
            <p className="text-base text-light-muted dark:text-dark-muted">
              {COURSE_DATA.shortDescription}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-light-muted dark:text-dark-muted pt-2">
              <span className="flex items-center gap-1.5"><HiClock className="text-primary-500" /> {COURSE_DATA.duration}</span>
              <span className="flex items-center gap-1.5"><HiUsers className="text-primary-500" /> {COURSE_DATA.totalStudents} students</span>
              <span className="flex items-center gap-1.5 text-yellow-500"><HiStar className="fill-yellow-500" /> {COURSE_DATA.rating} Rating</span>
              <span className="badge bg-light-border dark:bg-dark-border text-light-muted font-bold">{COURSE_DATA.language}</span>
            </div>
          </div>

          {/* Pricing Enrollment Box */}
          <div className="lg:col-span-1 glass-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-lg">
            <div className="aspect-video rounded-2xl overflow-hidden mb-6 relative group cursor-pointer">
              <img
                src={COURSE_DATA.thumbnail}
                alt={COURSE_DATA.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-primary-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <HiPlay className="w-6 h-6 ml-0.5" />
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display font-black text-2xl text-light-text dark:text-dark-text">
                {COURSE_DATA.currency} {(COURSE_DATA.discountPrice ?? COURSE_DATA.price).toLocaleString()}
              </span>
              {COURSE_DATA.discountPrice && (
                <span className="text-sm text-light-muted line-through">
                  {COURSE_DATA.currency} {COURSE_DATA.price.toLocaleString()}
                </span>
              )}
            </div>

            <button className="btn-primary btn-md w-full mb-3" id="course-enroll-now">
              Enroll Now
            </button>
            <p className="text-center text-xs text-light-muted dark:text-dark-muted">
              Lifetime Access • Certificate of Completion
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
            <div className="glass-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-sm min-h-[300px]">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3">Course Description</h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                      {COURSE_DATA.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-3">What You Will Learn</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {COURSE_DATA.objectives.map((obj) => (
                        <div key={obj} className="flex items-start gap-3">
                          <HiCheck className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-light-text dark:text-dark-text">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-6">
                  {COURSE_DATA.curriculum.map((section) => (
                    <div key={section.title} className="space-y-2">
                      <h4 className="font-display font-bold text-sm text-light-text dark:text-dark-text uppercase tracking-wider bg-light-bg dark:bg-dark-bg p-3 rounded-xl border border-light-border dark:border-dark-border">
                        {section.title}
                      </h4>
                      <div className="divide-y divide-light-border dark:divide-dark-border/40 pl-2">
                        {section.lessons.map((lesson) => (
                          <div key={lesson} className="flex items-center justify-between py-3 text-sm text-light-text dark:text-dark-text">
                            <span className="flex items-center gap-2">
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
                  <h3 className="font-display font-bold text-lg text-light-text dark:text-dark-text mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-sm text-light-muted dark:text-dark-muted">
                    {COURSE_DATA.requirements.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xl font-bold font-display">
                      {COURSE_DATA.instructor.name[0]}
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lg text-light-text dark:text-dark-text">{COURSE_DATA.instructor.name}</h4>
                      <p className="text-xs text-light-muted dark:text-dark-muted">{COURSE_DATA.instructor.role}</p>
                    </div>
                  </div>
                  <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">
                    {COURSE_DATA.instructor.bio}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
