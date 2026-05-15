import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { ScrollProgress } from '@/components/v3/ScrollProgress';
import { HeroV3 } from '@/components/v3/HeroV3';
import { StatsCounter } from '@/components/v3/StatsCounter';
import { MethodologyV3 } from '@/components/v3/MethodologyV3';
import { PropertySearchV3 } from '@/components/v3/PropertySearchV3';
import { PropertyGallery } from '@/components/v3/PropertyGallery';
import { TestimonialsCarousel } from '@/components/v3/TestimonialsCarousel';
import { CTASectionV3 } from '@/components/v3/CTASectionV3';

// Smooth scroll polyfill for better experience
function useSmoothScroll() {
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function HomeV3() {
  useSmoothScroll();

  return (
    <PageTransition>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
        {/* Scroll Progress Bar */}
        <ScrollProgress />
        
        {/* Navigation */}
        <Navigation />

        {/* Main Content */}
        <main>
          {/* Hero Section with Parallax */}
          <HeroV3 />

          {/* Stats Counter */}
          <StatsCounter />

          {/* Methodology P.A.Z.© */}
          <MethodologyV3 />

          {/* Property Search with Interactive Tabs */}
          <PropertySearchV3 />

          {/* Property Gallery with Masonry Grid */}
          <PropertyGallery />

          {/* Testimonials Infinite Carousel */}
          <TestimonialsCarousel />

          {/* CTA Section with Mesh Gradient */}
          <CTASectionV3 />
        </main>

        {/* Footer */}
        <Footer />

        {/* Noise Texture Overlay (Global) */}
        <div 
          className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />
      </div>
    </PageTransition>
  );
}
