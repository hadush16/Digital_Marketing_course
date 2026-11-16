import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import AdminLayout from '@/layouts/AdminLayout'

import { lazy } from 'react'

const HomePage = lazy(() => import('@/pages/home/HomePage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const CoursesPage = lazy(() => import('@/pages/courses/CoursesPage'))
const CourseDetailPage = lazy(() => import('@/pages/courses/CourseDetailPage'))
const MobileSolutionsPage = lazy(() => import('@/pages/mobile-solutions/MobileSolutionsPage'))
const MobileSolutionDetailPage = lazy(() => import('@/pages/mobile-solutions/MobileSolutionDetailPage'))
const MarketplacePage = lazy(() => import('@/pages/marketplace/MarketplacePage'))
const ListingDetailPage = lazy(() => import('@/pages/marketplace/ListingDetailPage'))
const SellerProfilePage = lazy(() => import('@/pages/marketplace/SellerProfilePage'))
const TechNewsPage = lazy(() => import('@/pages/news/TechNewsPage'))
const NewsDetailPage = lazy(() => import('@/pages/news/NewsDetailPage'))

// Static Pages
const CommunityPage = lazy(() => import('@/pages/static/CommunityPage'))
const OpportunitiesPage = lazy(() => import('@/pages/static/OpportunitiesPage'))
const SocialServicesPage = lazy(() => import('@/pages/static/SocialServicesPage'))
const AboutPage = lazy(() => import('@/pages/static/AboutPage'))
const ContactPage = lazy(() => import('@/pages/static/ContactPage'))
const FAQPage = lazy(() => import('@/pages/static/FAQPage'))
const PrivacyPolicyPage = lazy(() => import('@/pages/static/PrivacyPolicyPage'))
const TermsPage = lazy(() => import('@/pages/static/TermsPage'))
const AgencyServicesPage = lazy(() => import('@/pages/static/AgencyServicesPage'))
const ServiceDetailPage = lazy(() => import('@/pages/agency/ServiceDetailPage'))
const PlatformsPage = lazy(() => import('@/pages/agency/PlatformsPage'))
const PortfolioPage = lazy(() => import('@/pages/agency/PortfolioPage'))
const ExchangeRatesPage = lazy(() => import('@/pages/agency/ExchangeRatesPage'))

// Dashboard Pages
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage'))
const MyCoursesPage = lazy(() => import('@/pages/dashboard/MyCoursesPage'))
const MyListingsPage = lazy(() => import('@/pages/dashboard/MyListingsPage'))
const FavoritesPage = lazy(() => import('@/pages/dashboard/FavoritesPage'))
const MessagesPage = lazy(() => import('@/pages/dashboard/MessagesPage'))
const SellerAnalyticsPage = lazy(() => import('@/pages/dashboard/SellerAnalyticsPage'))
const ProfilePage = lazy(() => import('@/pages/dashboard/ProfilePage'))
const ChatPage = lazy(() => import('@/pages/dashboard/ChatPage'))
const NotificationsPage = lazy(() => import('@/pages/dashboard/NotificationsPage'))

// Admin Pages
const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const UsersManagePage = lazy(() => import('@/pages/admin/UsersManagePage'))
const SubscribersManagePage = lazy(() => import('@/pages/admin/SubscribersManagePage'))
const CoursesManagePage = lazy(() => import('@/pages/admin/CoursesManagePage'))
const MobileSolutionsManagePage = lazy(() => import('@/pages/admin/MobileSolutionsManagePage'))
const MarketplaceManagePage = lazy(() => import('@/pages/admin/MarketplaceManagePage'))
const NewsManagePage = lazy(() => import('@/pages/admin/NewsManagePage'))
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'))
const CompanyProfileManagePage = lazy(() => import('@/pages/admin/CompanyProfileManagePage'))
const ServiceCategoriesManagePage = lazy(() => import('@/pages/admin/ServiceCategoriesManagePage'))
const ServicesManagePage = lazy(() => import('@/pages/admin/ServicesManagePage'))
const PlatformsManagePage = lazy(() => import('@/pages/admin/PlatformsManagePage'))
const PaymentSupportManagePage = lazy(() => import('@/pages/admin/PaymentSupportManagePage'))
const ExchangeRatesManagePage = lazy(() => import('@/pages/admin/ExchangeRatesManagePage'))
const PortfolioManagePage = lazy(() => import('@/pages/admin/PortfolioManagePage'))
const TestimonialsManagePage = lazy(() => import('@/pages/admin/TestimonialsManagePage'))
const InquiriesManagePage = lazy(() => import('@/pages/admin/InquiriesManagePage'))
const WebsiteContentManagePage = lazy(() => import('@/pages/admin/WebsiteContentManagePage'))

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'courses/:slug', element: <CourseDetailPage /> },
      { path: 'mobile-solutions', element: <MobileSolutionsPage /> },
      { path: 'mobile-solutions/:slug', element: <MobileSolutionDetailPage /> },
      { path: 'marketplace', element: <MarketplacePage /> },
      { path: 'marketplace/:id', element: <ListingDetailPage /> },
      { path: 'marketplace/seller/:id', element: <SellerProfilePage /> },
      { path: 'news', element: <TechNewsPage /> },
      { path: 'news/:slug', element: <NewsDetailPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'opportunities', element: <OpportunitiesPage /> },
      { path: 'social-media-services', element: <SocialServicesPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'privacy', element: <PrivacyPolicyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'services', element: <AgencyServicesPage /> },
      { path: 'services/:slug', element: <ServiceDetailPage /> },
      { path: 'platforms', element: <PlatformsPage /> },
      { path: 'platforms/:slug', element: <PlatformsPage /> },
      { path: 'portfolio', element: <PortfolioPage /> },
      { path: 'portfolio/:slug', element: <PortfolioPage /> },
      { path: 'exchange-rates', element: <ExchangeRatesPage /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'my-courses', element: <MyCoursesPage /> },
      { path: 'my-listings', element: <MyListingsPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'messages', element: <ChatPage /> },
      { path: 'notifications', element: <NotificationsPage /> },
      { path: 'analytics', element: <SellerAnalyticsPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'users', element: <UsersManagePage /> },
      { path: 'subscribers', element: <SubscribersManagePage /> },
      { path: 'courses', element: <CoursesManagePage /> },
      { path: 'mobile-solutions', element: <MobileSolutionsManagePage /> },
      { path: 'marketplace', element: <MarketplaceManagePage /> },
      { path: 'news', element: <NewsManagePage /> },
      { path: 'company-profile', element: <CompanyProfileManagePage /> },
      { path: 'service-categories', element: <ServiceCategoriesManagePage /> },
      { path: 'services', element: <ServicesManagePage /> },
      { path: 'platforms', element: <PlatformsManagePage /> },
      {
        path: 'monetization',
        element: (
          <ServicesManagePage
            defaultType="MONETIZATION"
            pageTitle="Monetization Services"
            pageSubtitle="Manage Facebook, YouTube, TikTok, and Instagram monetization readiness & guidance services."
          />
        ),
      },
      { path: 'payment-support', element: <PaymentSupportManagePage /> },
      { path: 'exchange-rates', element: <ExchangeRatesManagePage /> },
      { path: 'portfolio', element: <PortfolioManagePage /> },
      { path: 'testimonials', element: <TestimonialsManagePage /> },
      { path: 'inquiries', element: <InquiriesManagePage /> },
      { path: 'website-content', element: <WebsiteContentManagePage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
])
