import Navbar from "@/app/components/Navbar"
import HeroSection from "@/app/components/HeroSection"
import FeaturesSection from "@/app/components/FeaturesSection"
import TrendingCars from "@/app/components/TrendingCars"
import StatsSection from "@/app/components/StatsSection"
import AICapabilities from "@/app/components/AICapabilities"
import Testimonials from "@/app/components/Testimonials"
import NewsletterSection from "@/app/components/NewsletterSection"
import Footer from "@/app/components/Footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0B1120]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <TrendingCars />
        <StatsSection />
        <AICapabilities />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
