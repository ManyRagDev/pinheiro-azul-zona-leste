import { useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { StickyNav } from '@/components/v4/StickyNav';
import { HeroAurora } from '@/components/v4/HeroAurora';
import { StatsRings } from '@/components/v4/StatsRings';
import { BentoMethodology } from '@/components/v4/BentoMethodology';
import { HorizontalGallery } from '@/components/v4/HorizontalGallery';
import { TestimonialsMarquee } from '@/components/v4/TestimonialsMarquee';
import { ContactAurora } from '@/components/v4/ContactAurora';
import { FooterAurora } from '@/components/v4/FooterAurora';

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 z-[60] origin-left"
    />
  );
}

function CursorGlow() {
  return (
    <div
      className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-[55] opacity-0 hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        left: 'var(--mouse-x, -500px)',
        top: 'var(--mouse-y, -500px)',
      }}
    />
  );
}

export default function HomeIndex2() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#050510] text-zinc-100 overflow-x-hidden selection:bg-blue-500/30 selection:text-white"
    >
      <ScrollProgressBar />
      <CursorGlow />
      <StickyNav />

      <main>
        <div id="top">
          <HeroAurora />
        </div>

        <StatsRings />

        <div id="aurora-method">
          <BentoMethodology />
        </div>

        <div id="aurora-gallery">
          <HorizontalGallery />
        </div>

        <div id="aurora-testimonials">
          <TestimonialsMarquee />
        </div>

        <div id="aurora-contact">
          <ContactAurora />
        </div>
      </main>

      <FooterAurora />

      {/* Global noise texture */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.012]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </motion.div>
  );
}
