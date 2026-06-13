import { HeroSection } from '@/components/home/HeroSection'
import { SearchSection } from '@/components/home/SearchSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { FeaturedVendors } from '@/components/home/FeaturedVendors'
import { HowItWorks } from '@/components/home/HowItWorks'
import { StatsSection } from '@/components/home/StatsSection'
import { Testimonials } from '@/components/home/Testimonials'
import { BecomeVendorCTA } from '@/components/home/BecomeVendorCTA'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturedVendors />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <BecomeVendorCTA />
    </>
  )
}
