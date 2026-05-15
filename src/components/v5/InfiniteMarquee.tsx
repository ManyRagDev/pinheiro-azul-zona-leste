import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: '500+', label: 'Imóveis Disponíveis' },
  { value: '1.000+', label: 'Clientes Satisfeitos' },
  { value: '98%', label: 'Taxa de Satisfação' },
  { value: '15+', label: 'Anos de Experiência' },
  { value: 'R$ 500M+', label: 'Em Negociações' },
  { value: '24h', label: 'Atendimento' },
  { value: '50+', label: 'Bairros Atendidos' },
  { value: '100%', label: 'Comprometimento' },
];

function MarqueeRow({ direction = 'left', speed = 40 }: { direction?: 'left' | 'right'; speed?: number }) {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex gap-8 whitespace-nowrap"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {[...stats, ...stats, ...stats, ...stats].map((stat, i) => (
          <div
            key={i}
            className="flex items-center gap-4 px-6 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group cursor-default"
          >
            <span className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
              {stat.value}
            </span>
            <span className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfiniteMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="marquee-section" ref={containerRef} className="relative py-20 bg-[#020205] overflow-hidden">
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#020205] to-transparent z-10 pointer-events-none" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#020205] to-transparent z-10 pointer-events-none" />

      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 px-4"
      >
        <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
          Números que Falam
        </span>
      </motion.div>

      <MarqueeRow direction="left" speed={50} />
      <MarqueeRow direction="right" speed={60} />

      <style>{`
        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
