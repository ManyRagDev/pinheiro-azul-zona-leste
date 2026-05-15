import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Map, Search, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MouseSpotlight } from './MouseSpotlight';

const pillars = [
  {
    letter: 'P',
    title: 'Planejamento',
    subtitle: 'Estratégia personalizada',
    icon: Map,
    description: 'Entendemos seus objetivos e criamos estratégias personalizadas para alcançar o imóvel dos seus sonhos.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'rgba(59, 130, 246, 0.1)',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    letter: 'A',
    title: 'Análise',
    subtitle: 'Avaliação criteriosa',
    icon: Search,
    description: 'Avaliação criteriosa do mercado, localização e oportunidades para garantir a melhor escolha.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'rgba(139, 92, 246, 0.1)',
    span: '',
  },
  {
    letter: 'Z',
    title: 'Zelo',
    subtitle: 'Atenção a cada detalhe',
    icon: Heart,
    description: 'Cuidado e atenção em cada detalhe, acompanhando você em toda jornada imobiliária.',
    gradient: 'from-pink-500 to-rose-400',
    glow: 'rgba(236, 72, 153, 0.1)',
    span: '',
  },
];

function TiltCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: 0.15 + index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={pillar.span}
    >
      <MouseSpotlight spotlightSize={350} spotlightColor={pillar.glow}>
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
          className={`group relative h-full min-h-[240px] ${index === 0 ? 'md:min-h-[520px]' : ''} rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.12] cursor-default`}
        >
          {/* Animated border gradient */}
          <div
            className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none`}
          />

          {/* Glow orb */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.15] blur-[60px] transition-opacity duration-700`}
          />

          <div className="relative p-8 h-full flex flex-col">
            {/* Large letter watermark */}
            <div className="absolute top-2 right-4 select-none pointer-events-none">
              <span
                className={`text-[8rem] md:text-[10rem] font-black leading-none bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700`}
              >
                {pillar.letter}
              </span>
            </div>

            {/* Icon */}
            <motion.div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6`}
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 3 : 0,
              }}
              transition={{ duration: 0.4 }}
            >
              <Icon className="text-white" size={22} />
            </motion.div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className={`text-sm font-bold bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}
                >
                  {pillar.letter}
                </span>
                <span className="text-white/20 text-sm">—</span>
                <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
              </div>
              <p className="text-xs uppercase tracking-wider text-zinc-600 mb-4">{pillar.subtitle}</p>
              <p className="text-zinc-400 leading-relaxed text-sm max-w-md">{pillar.description}</p>
            </div>

            {/* Bottom number */}
            <div className="mt-auto pt-6">
              <span className="text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500">
                0{index + 1}
              </span>
            </div>
          </div>
        </motion.div>
      </MouseSpotlight>
    </motion.div>
  );
}

export function MethodologyOrbital() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#020205] overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-violet-600/[0.04] rounded-full blur-[120px]" />
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
            Metodologia Exclusiva
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 tracking-tight">
            Nossa{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              P.A.Z.©
            </span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Uma abordagem exclusiva que combina planejamento, análise e zelo para superar suas expectativas.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((pillar, index) => (
            <TiltCard key={pillar.letter} pillar={pillar} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/sobre"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 text-sm font-medium"
          >
            Conheça Nossa História
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
