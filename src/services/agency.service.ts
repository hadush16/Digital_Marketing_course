import api from './api'

export type PublishStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'
export type ServiceType = 'GENERAL' | 'SOCIAL_MEDIA' | 'MONETIZATION' | 'PAYMENT_WITHDRAWAL'
export type RateSourceType = 'OFFICIAL' | 'PROVIDER' | 'MANUAL'
export type InquiryStatus = 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'COMPLETED' | 'ARCHIVED'

export interface CompanyProfile {
  id: string
  companyName: string
  tagline: string
  description: string
  mission?: string | null
  vision?: string | null
  coreValues?: string[] | null
  logo?: string | null
  bannerImage?: string | null
  heroImages?: string[] | null
  websiteUrl?: string | null
  email?: string | null
  phone?: string | null
  whatsapp?: string | null
  telegram?: string | null
  location?: string | null
  openingHours?: string | null
  socialLinks?: Record<string, string> | null
  updatedAt?: string
}

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description?: string | null
  image?: string | null
  icon?: string | null
  parentId?: string | null
  parent?: { id: string; name: string } | null
  children?: ServiceCategory[]
  displayOrder: number
  isActive: boolean
  isPublished: boolean
  _count?: { services: number; projects: number; children?: number }
  services?: Array<{ service: AgencyService }>
}

export interface SocialPlatform {
  id: string
  name: string
  slug: string
  logo?: string | null
  description?: string | null
  platformUrl?: string | null
  monetizationOptions?: string[] | null
  requirements?: string[] | null
  supportedCountries?: string[] | null
  faqs?: Array<{ question: string; answer: string }> | null
  displayOrder: number
  isActive: boolean
  isPublished: boolean
  _count?: { services: number; projects: number }
  services?: AgencyService[]
  projects?: PortfolioProject[]
}

export interface AgencyService {
  id: string
  title: string
  slug: string
  serviceType: ServiceType
  shortDescription: string
  fullDescription: string
  image?: string | null
  platformId?: string | null
  platform?: { id: string; name: string; slug: string; logo?: string | null } | null
  categories?: Array<{
    isPrimary: boolean
    category: { id: string; name: string; slug: string; parentId?: string | null }
  }>
  features?: string[] | null
  benefits?: string[] | null
  requirements?: string[] | null
  processSteps?: Array<{ step?: number; title: string; description: string }> | null
  faqs?: Array<{ question: string; answer: string }> | null
  whoCanBenefit?: string | null
  eligibilityRequirements?: string[] | null
  supportedRegions?: string[] | null
  accountPreparation?: string[] | null
  commonProblems?: string[] | null
  paymentOptions?: string[] | null
  pricing?: string | null
  duration?: string | null
  isAvailable: boolean
  isFeatured: boolean
  seoTitle?: string | null
  seoDescription?: string | null
  displayOrder: number
  status: PublishStatus
  createdAt: string
  updatedAt: string
}

export interface PaymentMethod {
  id: string
  name: string
  slug: string
  description?: string | null
  logo?: string | null
  supportedCountries?: string[] | null
  supportedCurrencies?: string[] | null
  requirements?: string[] | null
  processingTime?: string | null
  feesInfo?: string | null
  instructions?: string | null
  displayOrder: number
  isActive: boolean
  isPublished: boolean
}

export interface ExchangeRateHistoryItem {
  id: string
  currencyPairId: string
  rate: number
  rateType: RateSourceType
  providerName?: string | null
  changedBy?: string | null
  recordedAt: string
}

export interface CurrencyPair {
  id: string
  baseCurrency: string
  targetCurrency: string
  rate: number
  rateType: RateSourceType
  providerName?: string | null
  sourceUrl?: string | null
  isEnabled: boolean
  notes?: string | null
  lastUpdatedAt: string
  history?: ExchangeRateHistoryItem[]
}

export interface PortfolioProject {
  id: string
  title: string
  slug: string
  clientName?: string | null
  platformId?: string | null
  categoryId?: string | null
  platform?: { id: string; name: string; slug: string; logo?: string | null } | null
  category?: { id: string; name: string; slug: string } | null
  description: string
  workPerformed: string
  beforeImage?: string | null
  afterImage?: string | null
  screenshots?: string[] | null
  videos?: string[] | null
  resultsAnalytics?: Array<{ label: string; value: string }> | null
  completionDate?: string | null
  projectUrl?: string | null
  isFeatured: boolean
  status: PublishStatus
  displayOrder: number
  createdAt: string
}

export interface Testimonial {
  id: string
  clientName: string
  clientRole?: string | null
  companyName?: string | null
  avatar?: string | null
  content: string
  rating: number
  projectId?: string | null
  isFeatured: boolean
  status: PublishStatus
  createdAt: string
}

export interface ContactInquiry {
  id: string
  customerName: string
  email: string
  phone?: string | null
  requestedService?: string | null
  serviceId?: string | null
  platform?: string | null
  message: string
  status: InquiryStatus
  adminNotes?: string | null
  createdAt: string
}

export interface WebsiteContentBlock {
  id: string
  sectionKey: string
  title: string
  subtitle?: string | null
  content?: string | null
  ctaText?: string | null
  ctaLink?: string | null
  imageUrl?: string | null
  metadata?: Record<string, any> | null
  isPublished: boolean
  updatedAt: string
}

export interface AdminOverviewResponse {
  stats: {
    totalUsers: number
    totalSubscribers: number
    totalCourses: number
    totalListings: number
    totalMobileSolutions: number
    totalNews: number
    totalActiveServices: number
    totalCategories: number
    totalPlatforms: number
    totalProjects: number
    totalInquiries: number
    newInquiriesCount: number
    publishedContent: number
    draftContent: number
  }
  recentInquiries: ContactInquiry[]
  recentActivity: Array<{
    id: string
    adminEmail?: string | null
    action: string
    entityType: string
    entityId?: string | null
    details?: string | null
    createdAt: string
  }>
}

export const agencyService = {
  // Overview
  getOverview: () => api.get<{ success: boolean; data: AdminOverviewResponse }>('/api/agency/overview'),

  // Uploads
  uploadImage: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<{ success: boolean; data: { url: string } }>('/api/uploads/image', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
  uploadMedia: (file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<{ success: boolean; data: { url: string; type: 'image' | 'video' } }>('/api/uploads/media', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  // Company Profile
  getCompanyProfile: () => api.get<{ success: boolean; data: CompanyProfile }>('/api/agency/company-profile'),
  updateCompanyProfile: (data: Partial<CompanyProfile>) =>
    api.put<{ success: boolean; data: CompanyProfile }>('/api/agency/company-profile', data),

  // Categories
  getPublicCategories: (params?: { search?: string }) =>
    api.get<{ success: boolean; data: ServiceCategory[] }>('/api/agency/categories', { params }),
  getAdminCategories: (params?: { search?: string }) =>
    api.get<{ success: boolean; data: ServiceCategory[] }>('/api/agency/categories/admin', { params }),
  getCategoryBySlug: (slug: string) =>
    api.get<{ success: boolean; data: ServiceCategory }>(`/api/agency/categories/${slug}`),
  createCategory: (data: Partial<ServiceCategory>) =>
    api.post<{ success: boolean; data: ServiceCategory }>('/api/agency/categories', data),
  updateCategory: (id: string, data: Partial<ServiceCategory>) =>
    api.patch<{ success: boolean; data: ServiceCategory }>(`/api/agency/categories/${id}`, data),
  deleteCategory: (id: string, force = false) =>
    api.delete<{ success: boolean }>(`/api/agency/categories/${id}${force ? '?force=true' : ''}`),

  // Services
  getPublicServices: (params?: {
    page?: number
    limit?: number
    search?: string
    category?: string
    platform?: string
    serviceType?: ServiceType
    featured?: boolean
  }) => api.get<{ success: boolean; data: AgencyService[]; pagination: any }>('/api/agency/services', { params }),
  getAdminServices: (params?: {
    page?: number
    limit?: number
    search?: string
    serviceType?: ServiceType
    status?: PublishStatus
    categoryId?: string
    platformId?: string
  }) => api.get<{ success: boolean; data: AgencyService[]; pagination: any }>('/api/agency/services/admin', { params }),
  getServiceBySlug: (slug: string) =>
    api.get<{ success: boolean; data: AgencyService }>(`/api/agency/services/${slug}`),
  createService: (data: Partial<AgencyService> & { categoryIds?: string[]; primaryCategoryId?: string | null }) =>
    api.post<{ success: boolean; data: AgencyService }>('/api/agency/services', data),
  updateService: (id: string, data: Partial<AgencyService> & { categoryIds?: string[]; primaryCategoryId?: string | null }) =>
    api.patch<{ success: boolean; data: AgencyService }>(`/api/agency/services/${id}`, data),
  deleteService: (id: string) => api.delete<{ success: boolean }>(`/api/agency/services/${id}`),

  // Social Platforms
  getPublicPlatforms: () => api.get<{ success: boolean; data: SocialPlatform[] }>('/api/agency/platforms'),
  getAdminPlatforms: (params?: { search?: string }) =>
    api.get<{ success: boolean; data: SocialPlatform[] }>('/api/agency/platforms/admin', { params }),
  getPlatformBySlug: (slug: string) =>
    api.get<{ success: boolean; data: SocialPlatform }>(`/api/agency/platforms/${slug}`),
  createPlatform: (data: Partial<SocialPlatform>) =>
    api.post<{ success: boolean; data: SocialPlatform }>('/api/agency/platforms', data),
  updatePlatform: (id: string, data: Partial<SocialPlatform>) =>
    api.patch<{ success: boolean; data: SocialPlatform }>(`/api/agency/platforms/${id}`, data),
  deletePlatform: (id: string) => api.delete<{ success: boolean }>(`/api/agency/platforms/${id}`),

  // Payment Methods
  getPublicPaymentMethods: () => api.get<{ success: boolean; data: PaymentMethod[] }>('/api/agency/payment-methods'),
  getAdminPaymentMethods: () => api.get<{ success: boolean; data: PaymentMethod[] }>('/api/agency/payment-methods/admin'),
  createPaymentMethod: (data: Partial<PaymentMethod>) =>
    api.post<{ success: boolean; data: PaymentMethod }>('/api/agency/payment-methods', data),
  updatePaymentMethod: (id: string, data: Partial<PaymentMethod>) =>
    api.patch<{ success: boolean; data: PaymentMethod }>(`/api/agency/payment-methods/${id}`, data),
  deletePaymentMethod: (id: string) => api.delete<{ success: boolean }>(`/api/agency/payment-methods/${id}`),

  // Exchange Rates
  getPublicExchangeRates: () => api.get<{ success: boolean; data: CurrencyPair[] }>('/api/agency/exchange-rates'),
  getAdminExchangeRates: () => api.get<{ success: boolean; data: CurrencyPair[] }>('/api/agency/exchange-rates/admin'),
  getRateHistory: (id: string) =>
    api.get<{ success: boolean; data: ExchangeRateHistoryItem[] }>(`/api/agency/exchange-rates/${id}/history`),
  createCurrencyPair: (data: Partial<CurrencyPair>) =>
    api.post<{ success: boolean; data: CurrencyPair }>('/api/agency/exchange-rates', data),
  updateCurrencyPair: (id: string, data: Partial<CurrencyPair>) =>
    api.patch<{ success: boolean; data: CurrencyPair }>(`/api/agency/exchange-rates/${id}`, data),
  deleteCurrencyPair: (id: string) => api.delete<{ success: boolean }>(`/api/agency/exchange-rates/${id}`),
  syncLiveRates: (baseCurrency = 'USD', overwriteManual = false) =>
    api.post<{ success: boolean; message: string; updatedCount: number }>('/api/agency/exchange-rates/sync', {
      baseCurrency,
      overwriteManual,
    }),

  // Portfolio
  getPublicPortfolio: (params?: { page?: number; limit?: number; platform?: string; category?: string; featured?: boolean }) =>
    api.get<{ success: boolean; data: PortfolioProject[]; pagination: any }>('/api/agency/portfolio', { params }),
  getAdminPortfolio: (params?: { page?: number; limit?: number; search?: string; status?: PublishStatus }) =>
    api.get<{ success: boolean; data: PortfolioProject[]; pagination: any }>('/api/agency/portfolio/admin', { params }),
  getProjectBySlug: (slug: string) =>
    api.get<{ success: boolean; data: PortfolioProject }>(`/api/agency/portfolio/${slug}`),
  createProject: (data: Partial<PortfolioProject>) =>
    api.post<{ success: boolean; data: PortfolioProject }>('/api/agency/portfolio', data),
  updateProject: (id: string, data: Partial<PortfolioProject>) =>
    api.patch<{ success: boolean; data: PortfolioProject }>(`/api/agency/portfolio/${id}`, data),
  deleteProject: (id: string) => api.delete<{ success: boolean }>(`/api/agency/portfolio/${id}`),

  // Testimonials
  getPublicTestimonials: () => api.get<{ success: boolean; data: Testimonial[] }>('/api/agency/testimonials'),
  getAdminTestimonials: () => api.get<{ success: boolean; data: Testimonial[] }>('/api/agency/testimonials/admin'),
  createTestimonial: (data: Partial<Testimonial>) =>
    api.post<{ success: boolean; data: Testimonial }>('/api/agency/testimonials', data),
  updateTestimonial: (id: string, data: Partial<Testimonial>) =>
    api.patch<{ success: boolean; data: Testimonial }>(`/api/agency/testimonials/${id}`, data),
  deleteTestimonial: (id: string) => api.delete<{ success: boolean }>(`/api/agency/testimonials/${id}`),

  // Inquiries
  submitInquiry: (data: {
    customerName: string
    email: string
    phone?: string
    requestedService?: string
    serviceId?: string
    platform?: string
    message: string
  }) => api.post<{ success: boolean; data: ContactInquiry; message: string }>('/api/agency/inquiries', data),
  getAdminInquiries: (params?: { page?: number; limit?: number; status?: string; search?: string }) =>
    api.get<{ success: boolean; data: ContactInquiry[]; pagination: any }>('/api/agency/inquiries/admin', { params }),
  updateInquiry: (id: string, data: { status?: InquiryStatus; adminNotes?: string }) =>
    api.patch<{ success: boolean; data: ContactInquiry }>(`/api/agency/inquiries/${id}`, data),
  deleteInquiry: (id: string) => api.delete<{ success: boolean }>(`/api/agency/inquiries/${id}`),

  // Website Content
  getPublicContent: () => api.get<{ success: boolean; data: WebsiteContentBlock[] }>('/api/agency/content'),
  getAdminContent: () => api.get<{ success: boolean; data: WebsiteContentBlock[] }>('/api/agency/content/admin'),
  upsertContentBlock: (data: Partial<WebsiteContentBlock>) =>
    api.put<{ success: boolean; data: WebsiteContentBlock }>('/api/agency/content', data),
  deleteContentBlock: (id: string) => api.delete<{ success: boolean }>(`/api/agency/content/${id}`),

  // Settings
  getSettings: () => api.get<{ success: boolean; data: Record<string, string> }>('/api/settings'),
  updateSettings: (data: Record<string, string>) =>
    api.put<{ success: boolean; data: Record<string, string> }>('/api/settings', data),

  // Newsletter
  subscribeNewsletter: (email: string, name?: string) =>
    api.post<{ success: boolean; message: string }>('/api/subscribers', { email, name }),
}

