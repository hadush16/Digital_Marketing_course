import HeroSection from '@/components/home/HeroSection'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import MobileSolutionsSection from '@/components/home/MobileSolutionsSection'
import MarketplaceSection from '@/components/home/MarketplaceSection'
import TechNewsSection from '@/components/home/TechNewsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import PartnersCTASection from '@/components/home/PartnersCTASection'
import { AdSenseAd } from '@/components/ads'

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <FeaturedCourses />
      <MobileSolutionsSection />
      <div className="container-custom max-w-6xl my-4">
        <AdSenseAd slotId="4047270762" />
      </div>
      <MarketplaceSection />
      <TechNewsSection />
      <TestimonialsSection />
      <PartnersCTASection />
    </div>
  )
}
