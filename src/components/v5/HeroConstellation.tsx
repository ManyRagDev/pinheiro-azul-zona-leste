import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TextDecode } from './TextDecode';
import { useDeviceType } from '@/hooks/useDeviceType';

const neighborhoods = ['Zona Leste', 'Tatuapé', 'Mooca', 'Vila Formosa', 'Penha', 'Cangaíba', 'Vila Matilde'];

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

// ─── Mobile loop keyframes (Principle 5: amplitudes proporcionais, Principle 6: previsível) ───
const mobileLoop = {
  y: ['0%', '-3%', '-1%', '-4%', '0%'],
  scale: [1, 1.02, 1.01, 1.02, 1],
};

const DESKTOP_PARTICLE_COUNT = 120;
const TABLET_PARTICLE_COUNT = 80;
const MOBILE_PARTICLE_COUNT = 60;
// FPS intervals in ms (0 = no throttle / 60fps)
const FPS_INTERVAL_MS = { desktop: 0, tablet: 22, mobile: 33 };

export function HeroConstellation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const frameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [canvasFailed, setCanvasFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // ─── Device type (Principles 1, 7, 8) ───
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  // ─── Scroll-driven transforms — ALWAYS called, conditionally used (Principle 1) ───
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  // Tablet reduced (Principle 7: tablet híbrido com amplitudes cortadas pela metade)
  const yTablet = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const scaleTablet = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // ─── prefers-reduced-motion detection (Principle 9: graceful degradation) ───
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ─── Particle system (Principles 3, 10: FPS throttle + reduced count on mobile/tablet) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setCanvasFailed(true);
      return;
    }

    const particleCount =
      isMobile ? MOBILE_PARTICLE_COUNT :
      isTablet ? TABLET_PARTICLE_COUNT :
      DESKTOP_PARTICLE_COUNT;

    const fpsInterval = FPS_INTERVAL_MS[deviceType];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseX: Math.random() * window.innerWidth,
        baseY: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const draw = (timestamp: number) => {
      // FPS throttle (Principle 3: economia de bateria)
      if (!prefersReducedMotion && fpsInterval > 0) {
        if (timestamp - lastFrameTimeRef.current < fpsInterval) {
          frameRef.current = requestAnimationFrame(draw);
          return;
        }
      }
      lastFrameTimeRef.current = timestamp;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Se prefers-reduced-motion: desenhar estático (Principle 9)
      const shouldAnimate = !prefersReducedMotion;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (shouldAnimate) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;

          if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            p.vx += (dx / dist) * force * 0.8;
            p.vy += (dy / dist) * force * 0.8;
          }

          p.vx += (p.baseX - p.x) * 0.002;
          p.vy += (p.baseY - p.y) * 0.002;

          p.vx *= 0.96;
          p.vy *= 0.96;

          p.x += p.vx;
          p.y += p.vy;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const cdx = p.x - p2.x;
          const cdy = p.y - p2.y;
          const cDist = Math.sqrt(cdx * cdx + cdy * cdy);

          if (cDist < 120) {
            const lineOpacity = (1 - cDist / 120) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    lastFrameTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [deviceType, prefersReducedMotion]);

  // ─── Entry animation timers ───
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isReady || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % neighborhoods.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isReady, prefersReducedMotion]);

  // ─── Determine animated props per device tier ───
  // Desktop: scroll-driven (y, scale, opacity)
  // Tablet:  scroll-driven reduced (yTablet, scaleTablet, opacity=1)
  // Mobile:  autonomous loop (mobileLoop, opacity=1)
  const canvasAnimate = isMobile ? mobileLoop : undefined;
  const canvasTransition = isMobile
    ? { duration: 6, repeat: Infinity as const, ease: 'easeInOut' as const }
    : undefined;

  // Canvas style: only apply scroll transforms on desktop/tablet
  const getCanvasStyle = () => {
    if (prefersReducedMotion) return undefined;
    if (isDesktop) return { y, scale };
    if (isTablet) return { y: yTablet, scale: scaleTablet };
    return undefined; // mobile: animate prop handles it
  };

  // Content opacity: only fade on desktop
  const contentStyle = isDesktop && !prefersReducedMotion ? { opacity } : undefined;

  // On mobile, canvas and backgrounds use fixed positioning so they don't scroll with the section.
  // This ensures the loop animation is a pure ambient backdrop, not scroll-dependent.
  const bgPositionClass = isMobile ? 'fixed' : 'absolute';

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#020205]">
      {/* Canvas — or fallback gradient if canvas failed to initialize (Principle 9) */}
      {canvasFailed ? (
        <div
          className={`${bgPositionClass} inset-0 w-full h-full`}
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.05) 40%, transparent 70%), radial-gradient(ellipse at 30% 60%, rgba(6,182,212,0.05) 0%, transparent 60%)',
          }}
        />
      ) : (
        <motion.canvas
          ref={canvasRef}
          className={`${bgPositionClass} inset-0 w-full h-full`}
          style={getCanvasStyle()}
          animate={canvasAnimate}
          transition={canvasTransition}
        />
      )}

      {/* Orbs decorativos — sempre visíveis (Principle 9: fallback CSS puro) */}
      <div className={`${bgPositionClass} inset-0 pointer-events-none`}>
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Dot pattern grid */}
      <div
        className={`${bgPositionClass} inset-0 opacity-[0.03]`}
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* ─── Content — opacity conditional per device (Principles 2, 4) ─── */}
      <motion.div style={contentStyle} className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl"
        >
          <Sparkles className="text-blue-400" size={14} />
          <span className="text-sm text-zinc-500 tracking-wide">Pinheiro Azul Negócios Imobiliários</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={prefersReducedMotion ? undefined : { y: '120%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <TextDecode text="Encontre seu lar" delay={0.8} speed={25} trigger={isReady} />
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1">
              <motion.span
                className="block"
                initial={prefersReducedMotion ? undefined : { y: '120%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-white/50">na </span>
                <span className="relative inline-block">
                  {prefersReducedMotion ? (
                    <span className="inline-block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                      {neighborhoods[0]}
                    </span>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentWord}
                        initial={{ y: 40, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -40, opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
                      >
                        {neighborhoods[currentWord]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                  <motion.span
                    className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
                    initial={prefersReducedMotion ? undefined : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Sua jornada imobiliária começa aqui, com a segurança e o zelo que você merece.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/contato"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-[#020205] hover:text-white font-semibold text-base rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(99,102,241,0.25)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Buscar Imóveis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-[2px] bg-white rounded-full transition-colors duration-500 group-hover:bg-[#020205] z-[5]" />
          </Link>

          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 px-8 py-4 text-zinc-400 hover:text-white font-medium text-base rounded-full border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.05] backdrop-blur-sm transition-all duration-300"
          >
            Conheça a P.A.Z.©
          </Link>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-20 flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {[
            { value: '500+', label: 'Imóveis' },
            { value: '1.000+', label: 'Clientes' },
            { value: '98%', label: 'Satisfação' },
            { value: '15+', label: 'Anos' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs text-zinc-600 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ─── Scroll indicator — mobile gets explicit text (Principle 4: affordance claro) ─── */}
      <motion.div
        initial={prefersReducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('marquee-section')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">Explore</span>
          <ChevronDown size={18} className="text-zinc-600" />
          {isMobile && (
            <span className="text-[10px] text-zinc-600 mt-1 animate-pulse">
              Role para explorar
            </span>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
