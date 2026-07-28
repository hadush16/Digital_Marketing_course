// ============================================
// RYOIT PLATFORM — CORE TYPE DEFINITIONS
// ============================================

// --- Auth ---
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  createdAt: string
}

export type UserRole = 'admin' | 'instructor' | 'user' | 'seller' | 'ADMIN' | 'INSTRUCTOR' | 'USER' | 'SELLER'

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

// --- Course ---
export interface Course {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  thumbnail: string
  previewVideo?: string
  price: number
  discountPrice?: number
  currency: string
  category: CourseCategory
  level: CourseLevel
  language: string
  duration: string
  totalLessons: number
  totalStudents: number
  rating: number
  totalRatings: number
  instructor: Instructor
  tags: string[]
  objectives: string[]
  requirements: string[]
  status: ContentStatus
  isFeatured: boolean
  createdAt: string
  updatedAt: string
}

export type CourseCategory =
  | 'facebook-marketing'
  | 'instagram-marketing'
  | 'tiktok-marketing'
  | 'youtube-marketing'
  | 'telegram-marketing'
  | 'seo'
  | 'affiliate-marketing'
  | 'dropshipping'
  | 'digital-advertising'
  | 'content-creation'
  | 'video-editing'
  | 'canva'
  | 'capcut'
  | 'business-branding'
  | 'google-ads'
  | 'meta-ads'
  | 'tiktok-ads'
  | 'email-marketing'
  | 'freelancing'
  | 'business-management'

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced' | 'all-levels'

// --- Mobile Solution ---
export interface MobileSolution {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  thumbnail: string
  category: MobileCategory
  brand?: string
  tools: string[]
  requirements: string[]
  instructions: string
  downloadLinks: DownloadLink[]
  images: string[]
  videoUrl?: string
  rating: number
  totalRatings: number
  views: number
  status: ContentStatus
  isFeatured: boolean
  createdAt: string
}

export type MobileCategory =
  | 'hardware-repair'
  | 'software-repair'
  | 'phone-flashing'
  | 'unlocking'
  | 'frp-bypass'
  | 'imei-repair'
  | 'firmware'
  | 'stock-rom'
  | 'custom-rom'
  | 'diagnostics'
  | 'chip-level'
  | 'lcd-repair'
  | 'charging-repair'
  | 'battery-repair'
  | 'motherboard-repair'
  | 'water-damage'
  | 'software-install'
  | 'driver-install'
  | 'gsm-tools'
  | 'android-tools'
  | 'windows-tools'

export interface DownloadLink {
  label: string
  url: string
  size?: string
  type: 'firmware' | 'tool' | 'driver' | 'other'
}

// --- Marketplace ---
export interface MarketplaceListing {
  id: string
  title: string
  description: string
  thumbnail?: string
  images?: string[]
  category: MarketplaceCategory
  price: number
  currency: string
  priceType?: 'fixed' | 'negotiable' | 'contact'
  seller: Seller
  tags?: string[]
  features?: string[]
  deliveryTime?: string
  rating: number
  totalRatings?: number
  views: number
  likes: number
  isBookmarked?: boolean
  isFeatured?: boolean
  status?: ContentStatus
  createdAt?: string
}

export type MarketplaceCategory =
  // Social Media Accounts
  | 'youtube-channels'
  | 'facebook-pages'
  | 'tiktok-accounts'
  | 'instagram-accounts'
  | 'telegram-channels'
  | 'telegram-groups'
  | 'whatsapp-business'
  // Social Media Services
  | 'social-media-management'
  | 'page-management'
  | 'content-scheduling'
  | 'audience-growth'
  | 'community-management'
  | 'brand-management'
  // Digital Marketing
  | 'facebook-boosting'
  | 'youtube-promotion'
  | 'seo-services'
  | 'email-marketing'
  | 'tiktok-marketing'
  | 'linkedin-marketing'
  | 'instagram-marketing'
  | 'telegram-marketing'
  // Creative Services
  | 'graphic-design'
  | 'video-editing'
  | 'logo-design'
  | 'ui-ux-design'
  | 'motion-graphics'
  | 'thumbnail-design'
  // Development
  | 'website-development'
  | 'react-development'
  | 'flutter-development'
  | 'mobile-apps'
  | 'backend-apis'
  | 'wordpress'
  // Technology
  | 'cloud-computing'
  | 'cybersecurity'
  | 'ai-services'
  | 'automation'
  | 'technical-support'
  // Training
  | 'computer-training'
  | 'digital-skills'
  | 'technology-courses'
  | 'freelancing-coaching'
  // Digital Products
  | 'templates'
  | 'ebooks'
  | 'source-code'
  | 'ui-kits'
  | 'icons'
  | 'graphics'
  | 'presentations'
  // Legacy / Misc
  | 'subscribers-views'
  | 'advertising-services'
  | 'marketing-consultation'
  | 'website-services'

// --- Seller Profile ---
export interface SellerProfile {
  id: string
  userId: string
  displayName: string
  avatar?: string
  coverImage?: string
  bio: string
  skills: string[]
  languages: string[]
  responseTime: string
  memberSince: string
  rating: number
  totalReviews: number
  totalListings: number
  completedOrders?: number
  socialLinks?: {
    website?: string
    telegram?: string
    instagram?: string
    linkedin?: string
  }
  verified: boolean
  location?: string
}

// --- Favorite ---
export interface Favorite {
  listingId: string
  savedAt: string
}

export interface FavoritesState {
  items: Favorite[]
}

// --- Inquiry / Contact ---
export interface Inquiry {
  id: string
  listingId: string
  listingTitle: string
  sellerName: string
  buyerName: string
  buyerEmail: string
  buyerPhone?: string
  message: string
  status: 'unread' | 'read' | 'replied'
  sentAt: string
}

// --- Review ---
export interface Review {
  id: string
  listingId: string
  authorName: string
  authorAvatar?: string
  rating: number
  comment: string
  createdAt: string
}

// --- News ---
export interface NewsArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  thumbnail: string
  category: NewsCategory
  author: Author
  tags: string[]
  views: number
  readTime: number
  status: ContentStatus
  isFeatured: boolean
  publishedAt: string
  createdAt: string
}

export type NewsCategory =
  | 'latest'
  | 'mobile-repair'
  | 'gsm-tools'
  | 'android-updates'
  | 'google-news'
  | 'apple-news'
  | 'samsung-news'
  | 'industry-updates'

// --- Common ---
export interface Instructor {
  id: string
  name: string
  avatar?: string
  bio?: string
  totalCourses?: number
  totalStudents?: number
  rating?: number
  role?: string
}

export interface Seller {
  id?: string
  name: string
  avatar?: string
  rating?: number
  totalListings?: number
  verified?: boolean
  joined?: string
  bio?: string
  skills?: string[]
  responseTime?: string
}

export interface Author {
  id?: string
  name: string
  avatar?: string
  role?: string
}

export type ContentStatus = 'draft' | 'published' | 'archived'

export interface Comment {
  id: string
  content: string
  author: User
  targetId: string
  targetType: 'course' | 'mobile-solution' | 'marketplace' | 'news' | 'community'
  parentId?: string
  replies?: Comment[]
  likes: number
  createdAt: string
}

export interface Rating {
  id: string
  score: number
  review?: string
  author: User
  targetId: string
  createdAt: string
}

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  avatar?: string
  rating: number
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category?: string
  order: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  description?: string
  count?: number
  parentId?: string
}

// --- API Response ---
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// --- Filter / Query ---
export interface CoursesFilter {
  category?: CourseCategory
  level?: CourseLevel
  minPrice?: number
  maxPrice?: number
  search?: string
  sort?: 'latest' | 'popular' | 'rating' | 'price-asc' | 'price-desc'
  page?: number
  limit?: number
}

export interface MarketplaceFilter {
  category?: string
  minPrice?: number
  maxPrice?: number
  minRating?: number
  search?: string
  sort?: 'latest' | 'popular' | 'price-asc' | 'price-desc' | 'rating'
  page?: number
  limit?: number
}

// --- Contact ---
export interface ContactForm {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

// --- Newsletter ---
export interface NewsletterSubscription {
  email: string
  name?: string
}

// --- Listing Form ---
export interface ListingFormData {
  title: string
  category: MarketplaceCategory | ''
  price: number
  currency: string
  priceType: 'fixed' | 'negotiable' | 'contact'
  description: string
  features: string[]
  deliveryTime: string
  tags: string[]
  thumbnail?: string
}
