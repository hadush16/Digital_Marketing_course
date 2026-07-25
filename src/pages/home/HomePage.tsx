import HeroSection from '@/components/home/HeroSection'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import MobileSolutionsSection from '@/components/home/MobileSolutionsSection'
import MarketplaceSection from '@/components/home/MarketplaceSection'
import TechNewsSection from '@/components/home/TechNewsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PartnersCTASection from '@/components/home/PartnersCTASection'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <FeaturedCourses />
      <MobileSolutionsSection />
      <MarketplaceSection />
      <TechNewsSection />
      <TestimonialsSection />
      <PartnersCTASection />
    </div>
  )
}
