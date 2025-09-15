import Navigation from "@/components/ui/navigation";
import HeroSection from "@/components/ui/hero-section";
import MethodologySection from "@/components/ui/methodology-section";
import PropertySearch from "@/components/ui/property-search";
import FeaturedProperties from "@/components/ui/featured-properties";
import Testimonials from "@/components/ui/testimonials";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <MethodologySection />
        <PropertySearch />
        <FeaturedProperties />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;