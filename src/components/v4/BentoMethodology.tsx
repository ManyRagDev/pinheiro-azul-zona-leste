import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Map, Search, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const pillars = [
  {
    letter: 'P',
    title: 'Planejamento',
    subtitle: 'Estratégia personalizada',
    icon: Map,
    description:
      'Entendemos seus objetivos e criamos estratégias personalizadas para alcançar o imóvel dos seus sonhos.',
    gradient: 'from-blue-500 to-cyan-400',
    glow: 'bg-blue-500/10',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    letter: 'A',
    title: 'Análise',
    subtitle: 'Avaliação criteriosa',
    icon: Search,
    description:
      'Avaliação criteriosa do mercado, localização e oportunidades para garantir a melhor escolha.',
    gradient: 'from-violet-500 to-purple-400',
    glow: 'bg-violet-500/10',
    span: '',
  },
  {
    letter: 'Z',
    title: 'Zelo',
    subtitle: 'Atenção a cada detalhe',
    icon: Heart,
    description:
      'Cuidado e atenção em cada detalhe, acompanhando você em toda jornada imobiliária.',
    gradient: 'from-pink-500 to-rose-400',
    glow: 'bg-pink-500/10',
    span: '',
  },
];

export function BentoMethodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section ref={containerRef} className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden">
      {/* Floating Orbs */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-600/[0.06] rounded-full blur-[120px]" />
      </motion.div>

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
          <p className="text-lg text-zinc-400 max-w-xl mx-auto">
            Uma abordagem exclusiva que combina planejamento, análise e zelo para superar suas expectativas.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.letter}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2 + index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={pillar.span}
            >
              <div
                className={`group relative h-full min-h-[220px] ${index === 0 ? 'md:min-h-[460px]' : ''} rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.04]`}
              >
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 ${pillar.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl`}
                />

                {/* Animated border gradient */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative p-8 h-full flex flex-col">
                  {/* Large letter watermark */}
                  <div className="absolute top-4 right-6 select-none">
                    <span
                      className={`text-[8rem] md:text-[10rem] font-black leading-none bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-700`}
                    >
                      {pillar.letter}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                  >
                    <pillar.icon className="text-white" size={22} />
                  </div>

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
                    <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                      {pillar.subtitle}
                    </p>
                    <p className="text-zinc-400 leading-relaxed text-sm">{pillar.description}</p>
                  </div>

                  {/* Bottom number */}
                  <div className="mt-auto pt-4">
                    <span className="text-6xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors duration-500">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            to="/sobre"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 text-sm font-medium"
          >
            Conheça Nossa História
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
