import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const neighborhoods = ['Zona Leste', 'Tatuapé', 'Mooca', 'Vila Formosa', 'Penha', 'Cangaíba'];

function splitText(text: string) {
  return text.split('').map((char, i) => ({ char, id: i }));
}

export function HeroAurora() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentWord, setCurrentWord] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % neighborhoods.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / 40);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / 40);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050510]"
    >
      {/* SVG Aurora Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1440 900" preserveAspectRatio="none">
          <defs>
            <filter id="aurora-blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
            </filter>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ec4899" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          <motion.ellipse
            cx="400" cy="350" rx="500" ry="300"
            fill="url(#grad1)" filter="url(#aurora-blur)"
            animate={{ cx: [400, 600, 400], cy: [350, 250, 350], rx: [500, 600, 500] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="1000" cy="500" rx="400" ry="350"
            fill="url(#grad2)" filter="url(#aurora-blur)"
            animate={{ cx: [1000, 800, 1000], cy: [500, 350, 500], ry: [350, 400, 350] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.ellipse
            cx="720" cy="450" rx="300" ry="250"
            fill="url(#grad3)" filter="url(#aurora-blur)"
            animate={{ cx: [720, 500, 900, 720], cy: [450, 300, 400, 450] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
        </svg>
      </motion.div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating Particles */}
      {isReady && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/40"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1440),
                y: Math.random() * 900,
                scale: 0,
              }}
              animate={{
                y: [null, -200],
                opacity: [0, 0.6, 0],
                scale: [0, Math.random() * 1.5 + 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}

      {/* Mouse-Following Glow */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute w-[800px] h-[800px] rounded-full bg-blue-600/[0.07] blur-[120px] pointer-events-none"
      />

      {/* Content */}
      <motion.div
        style={{ opacity, filter: useTransform(blur, (v) => `blur(${v}px)`) }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 mb-8 px-5 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl"
        >
          <Sparkles className="text-blue-400" size={14} />
          <span className="text-sm text-zinc-400 tracking-wide">
            Pinheiro Azul Negócios Imobiliários
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* Main Title with Character Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-bold tracking-[-0.04em] leading-[0.95]">
            <span className="block overflow-hidden">
              <motion.span
                className="block text-white"
                initial={{ y: '120%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                Encontre seu lar
              </motion.span>
            </span>
            <span className="block overflow-hidden mt-1">
              <motion.span
                className="block"
                initial={{ y: '120%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-white/60">na </span>
                <span className="relative inline-block">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWord}
                      initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="inline-block bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                      {neighborhoods[currentWord]}
                    </motion.span>
                  </AnimatePresence>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                  />
                </span>
              </motion.span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg sm:text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Sua jornada imobiliária começa aqui, com a segurança e o zelo que você merece.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/contato"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-[#050510] font-semibold text-base rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.3)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Buscar Imóveis
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="absolute inset-[2px] bg-white rounded-full transition-colors duration-500 group-hover:bg-[#050510] z-[5]" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-500" />
          </Link>

          <Link
            to="/sobre"
            className="inline-flex items-center gap-2 px-8 py-4 text-zinc-300 hover:text-white font-medium text-base rounded-full border border-white/[0.1] hover:border-white/[0.2] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.06]"
          >
            Conheça a P.A.Z.©
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-20 flex flex-wrap justify-center gap-6 sm:gap-10"
        >
          {[
            { value: '500+', label: 'Imóveis' },
            { value: '1.000+', label: 'Clientes' },
            { value: '98%', label: 'Satisfação' },
            { value: '15+', label: 'Anos' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => document.getElementById('aurora-stats')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Explore</span>
          <ChevronDown size={18} className="text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
