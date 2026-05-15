import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Imóveis Vendidos', color: '#3b82f6', progress: 0.85 },
  { value: 1000, suffix: '+', label: 'Clientes Felizes', color: '#8b5cf6', progress: 0.92 },
  { value: 98, suffix: '%', label: 'Satisfação', color: '#06b6d4', progress: 0.98 },
  { value: 15, suffix: '+', label: 'Anos de Mercado', color: '#10b981', progress: 0.75 },
];

function AnimatedRing({
  progress,
  color,
  size = 120,
  strokeWidth = 3,
}: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const springProgress = useSpring(0, { duration: 2000, bounce: 0 });
  const strokeDashoffset = useTransform(springProgress, (v) => circumference * (1 - v));

  useEffect(() => {
    if (isInView) springProgress.set(progress);
  }, [isInView, progress, springProgress]);

  return (
    <svg ref={ref} width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(255,255,255,0.05)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset }}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        style={{ strokeDashoffset }}
        opacity={0.3}
        filter="url(#glow)"
      />
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const springValue = useSpring(0, { duration: 2500, bounce: 0 });
  const displayValue = useTransform(springValue, (v) => Math.floor(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, value, springValue]);

  useEffect(() => {
    const unsub = displayValue.on('change', (v) => setDisplay(v));
    return unsub;
  }, [displayValue]);

  return (
    <span ref={ref}>
      {display.toLocaleString('pt-BR')}
      {suffix}
    </span>
  );
}

export function StatsRings() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="aurora-stats"
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden"
    >
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/[0.04] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
            Resultados Reais
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
            Números que{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              inspiram
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col items-center text-center"
            >
              {/* Ring */}
              <div className="relative mb-6">
                <AnimatedRing progress={stat.progress} color={stat.color} size={130} strokeWidth={3} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: stat.color, boxShadow: `0 0 20px ${stat.color}40` }}
                  />
                </div>
              </div>

              {/* Value */}
              <div className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-1">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>

              {/* Label */}
              <p className="text-sm text-zinc-500 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
