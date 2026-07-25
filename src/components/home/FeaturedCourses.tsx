import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { HiArrowRight, HiStar, HiClock, HiUsers } from 'react-icons/hi'
import { cn, getLevelColor } from '@/utils'
import { coursesService } from '@/services/courses.service'
import type { Course } from '@/types'

// --- Fallback Courses ---
const MOCK_COURSES: Course[] = [
  {
    id: '1', slug: 'facebook-marketing-mastery', title: 'Facebook Marketing Mastery',
    shortDescription: 'Master Facebook ads, pages, groups, and organic reach to grow any business.',
    description: '', thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    price: 1500, discountPrice: 800, currency: 'ETB', category: 'facebook-marketing',
    level: 'beginner', language: 'Amharic', duration: '12 hours', totalLessons: 45,
    totalStudents: 1230, rating: 4.9, totalRatings: 320,
    instructor: { id: '1', name: 'Hadush Brhane', avatar: '' },
    tags: [], objectives: [], requirements: [], status: 'published',
    isFeatured: true, createdAt: '', updatedAt: '',
  },
  {
    id: '2', slug: 'tiktok-ads-growth', title: 'TikTok Ads & Growth Strategy',
    shortDescription: 'Grow from zero to viral with TikTok ads, trends, and algorithm mastery.',
    description: '', thumbnail: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&q=80',
    price: 1200, currency: 'ETB', category: 'tiktok-marketing',
    level: 'intermediate', language: 'Amharic', duration: '8 hours', totalLessons: 32,
    totalStudents: 890, rating: 4.8, totalRatings: 210,
    instructor: { id: '1', name: 'Hadush Brhane', avatar: '' },
    tags: [], objectives: [], requirements: [], status: 'published',
    isFeatured: true, createdAt: '', updatedAt: '',
  },
  {
    id: '3', slug: 'seo-advanced-mastery', title: 'Advanced SEO Mastery',
    shortDescription: 'Rank #1 on Google with proven white-hat SEO techniques and keyword strategies.',
    description: '', thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&q=80',
    price: 2000, discountPrice: 1200, currency: 'ETB', category: 'seo',
    level: 'advanced', language: 'Amharic', duration: '20 hours', totalLessons: 78,
    totalStudents: 560, rating: 4.9, totalRatings: 180,
    instructor: { id: '1', name: 'Hadush Brhane', avatar: '' },
    tags: [], objectives: [], requirements: [], status: 'published',
    isFeatured: true, createdAt: '', updatedAt: '',
  },
  {
    id: '4', slug: 'youtube-channel-monetization', title: 'YouTube Channel Monetization',
    shortDescription: 'Build, grow and monetize a YouTube channel from scratch with proven strategies.',
    description: '', thumbnail: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    price: 1800, currency: 'ETB', category: 'youtube-marketing',
    level: 'beginner', language: 'Amharic', duration: '15 hours', totalLessons: 60,
    totalStudents: 2100, rating: 4.7, totalRatings: 540,
    instructor: { id: '1', name: 'Hadush Brhane', avatar: '' },
    tags: [], objectives: [], requirements: [], status: 'published',
    isFeatured: true, createdAt: '', updatedAt: '',
  },
  {
    id: '5', slug: 'canva-graphic-design', title: 'Canva for Business Design',
    shortDescription: 'Create professional-grade graphics, ads, and social content with Canva.',
    description: '', thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
    price: 800, discountPrice: 500, currency: 'ETB', category: 'canva',
    level: 'beginner', language: 'Amharic', duration: '6 hours', totalLessons: 25,
    totalStudents: 3400, rating: 4.8, totalRatings: 780,
    instructor: { id: '1', name: 'Hadush Brhane', avatar: '' },
    tags: [], objectives: [], requirements: [], status: 'published',
    isFeatured: true, createdAt: '', updatedAt: '',
  },
  {
    id: '6', slug: 'affiliate-marketing-income', title: 'Affiliate Marketing Income System',
    shortDescription: 'Build passive income through affiliate marketing on social media and websites.',
    description: '', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    price: 1600, currency: 'ETB', category: 'affiliate-marketing',
    level: 'intermediate', language: 'Amharic', duration: '18 hours', totalLessons: 65,
    totalStudents: 980, rating: 4.9, totalRatings: 290,
    instructor: { id: '1', name: 'Hadush Brhane', avatar: '' },
    tags: [], objectives: [], requirements: [], status: 'published',
    isFeatured: false, createdAt: '', updatedAt: '',
  },
]

interface CourseCardProps {
  course: Course
  index: number
}

function CourseCard({ course, index }: CourseCardProps) {
  const discount = course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : null

  const categoryLabel = course.category
    ? course.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : 'Digital Marketing'

  const instructorName = course.instructor?.name || 'Hadush Brhane'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/courses/${course.slug}`} className="block group">
        <div className="card-hover h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative overflow-hidden aspect-video rounded-t-2xl">
            <img
              src={course.thumbnail || 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80'}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {discount && (
              <div className="absolute top-3 left-3">
                <span className="badge-danger badge">-{discount}% OFF</span>
              </div>
            )}
            <div className="absolute top-3 right-3">
              <span className={cn('badge', getLevelColor(course.level || 'beginner'))}>
                {(course.level || 'Beginner').charAt(0).toUpperCase() + (course.level || 'beginner').slice(1)}
              </span>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <span className="text-white text-sm font-semibold flex items-center gap-1">
                View Course <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <div className="mb-2">
              <span className="badge-primary badge text-xs mb-2">
                {categoryLabel}
              </span>
            </div>
            <h3 className="font-display font-bold text-base text-light-text dark:text-dark-text mb-2 line-clamp-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
              {course.title}
            </h3>
            <p className="text-sm text-light-muted dark:text-dark-muted line-clamp-2 flex-1 mb-4">
              {course.shortDescription || course.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-light-muted dark:text-dark-muted mb-4">
              <span className="flex items-center gap-1">
                <HiClock className="w-3.5 h-3.5" /> {typeof course.duration === 'number' ? `${course.duration} mins` : course.duration || '10 hours'}
              </span>
              <span className="flex items-center gap-1">
                <HiUsers className="w-3.5 h-3.5" /> {(course.totalStudents || 100).toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-yellow-500">
                <HiStar className="w-3.5 h-3.5" /> {course.rating || 4.9}
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-light-border dark:border-dark-border">
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-lg text-light-text dark:text-dark-text">
                  {course.currency || 'ETB'} {(course.discountPrice ?? course.price ?? 0).toLocaleString()}
                </span>
                {course.discountPrice && (
                  <span className="text-sm text-light-muted dark:text-dark-muted line-through">
                    {course.currency || 'ETB'} {course.price.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-dark-muted">
                <span className="w-5 h-5 rounded-full bg-gradient-primary flex items-center justify-center text-white text-[10px] font-bold">
                  {instructorName[0]}
                </span>
                <span className="hidden sm:inline text-light-muted dark:text-dark-muted">
                  {instructorName.split(' ')[0]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function FeaturedCourses() {
  const { data } = useQuery({
    queryKey: ['featured-courses'],
    queryFn: async () => {
      const res = await coursesService.getAll()
      return res.data?.data || []
    },
    staleTime: 60000,
  })

  const coursesList = data && data.length > 0 ? data : MOCK_COURSES

  return (
    <section className="section bg-light-bg dark:bg-dark-bg">
      <div className="container-custom">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
        >
          <div>
            <div className="badge-primary badge mb-4">📚 Featured Courses</div>
            <h2 className="section-title mb-3">
              Master Digital{' '}
              <span className="gradient-text">Marketing</span>
            </h2>
            <p className="section-subtitle">
              Practical, hands-on courses in Facebook, TikTok, YouTube, SEO, and more — taught in Amharic.
            </p>
          </div>
          <Link
            to="/courses"
            className="btn-outline btn-md shrink-0 group"
            id="featured-courses-view-all"
          >
            View All Courses
            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesList.slice(0, 6).map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
