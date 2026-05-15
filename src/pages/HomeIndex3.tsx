import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { NavigationHorizon } from '@/components/v5/NavigationHorizon';
import { HeroConstellation } from '@/components/v5/HeroConstellation';
import { InfiniteMarquee } from '@/components/v5/InfiniteMarquee';
import { MethodologyOrbital } from '@/components/v5/MethodologyOrbital';
import { PropertySpotlight } from '@/components/v5/PropertySpotlight';
import { TestimonialsDepth } from '@/components/v5/TestimonialsDepth';
import { ContactLiquid } from '@/components/v5/ContactLiquid';
import { FooterMinimal } from '@/components/v5/FooterMinimal';
import { CursorGlow } from '@/components/v5/CursorGlow';
import { ScrollProgress } from '@/components/v5/ScrollProgress';

export default function HomeIndex3() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.scrollBehavior = 'auto';
    }

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#020205] text-zinc-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-white"
    >
      {/* Scroll Progress */}
      <ScrollProgress />

      {/* Cursor Glow Effect */}
      <CursorGlow />

      {/* Navigation */}
      <NavigationHorizon />

      {/* Main Content */}
      <main>
        {/* Hero with Constellation Particles */}
        <HeroConstellation />

        {/* Infinite Stats Marquee */}
        <InfiniteMarquee />

        {/* Methodology P.A.Z.© with 3D Tilt */}
        <MethodologyOrbital />

        {/* Property Spotlight Grid */}
        <PropertySpotlight />

        {/* Testimonials Depth Stack */}
        <TestimonialsDepth />

        {/* Contact with Liquid Gradient */}
        <ContactLiquid />
      </main>

      {/* Footer */}
      <FooterMinimal />

      {/* Global Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}
