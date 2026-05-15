import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Map, Search, Heart, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const pillars = [
  { 
    letter: 'P', 
    title: 'Planejamento', 
    icon: Map, 
    description: 'Entendemos seus objetivos e criamos estratégias personalizadas para alcançar o imóvel dos seus sonhos.',
    gradient: 'from-blue-500 to-cyan-500',
    bgGlow: 'bg-blue-500/20'
  },
  { 
    letter: 'A', 
    title: 'Análise', 
    icon: Search, 
    description: 'Avaliação criteriosa do mercado, localização e oportunidades para garantir a melhor escolha.',
    gradient: 'from-violet-500 to-purple-500',
    bgGlow: 'bg-violet-500/20'
  },
  { 
    letter: 'Z', 
    title: 'Zelo', 
    icon: Heart, 
    description: 'Cuidado e atenção em cada detalhe, acompanhando você em toda jornada imobiliária.',
    gradient: 'from-pink-500 to-rose-500',
    bgGlow: 'bg-pink-500/20'
  }
];

export function MethodologyV3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800"
          >
            <Sparkles className="text-blue-400" size={16} />
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Metodologia Exclusiva</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nossa Metodologia:{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
              P.A.Z.©
            </span>
          </h2>
          
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Uma abordagem exclusiva que combina planejamento estratégico, análise profunda e zelo humano para superar suas expectativas.
          </p>
        </motion.div>

        {/* Pillar Cards with Staggered Animation */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.letter}
              initial={{ opacity: 0, x: index === 0 ? -60 : index === 2 ? 60 : 0, y: index === 1 ? 40 : 0 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + index * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <PillarCard pillar={pillar} index={index} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 hover:border-zinc-700 rounded-full px-8 py-6 text-lg group transition-all duration-300"
          >
            <Link to="/sobre">
              Conheça Nossa História
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, index }: { pillar: typeof pillars[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Card
      ref={cardRef}
      className="group relative h-full bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5"
    >
      {/* Background Glow on Hover */}
      <div className={`absolute inset-0 ${pillar.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`} />
      
      <CardContent className="relative p-8 h-full flex flex-col">
        {/* Letter Badge */}
        <div className="absolute -top-4 -right-4 w-24 h-24">
          <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
          <span className={`absolute top-8 right-8 text-7xl font-bold bg-gradient-to-br ${pillar.gradient} bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500`}>
            {pillar.letter}
          </span>
        </div>

        {/* Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mb-6 shadow-lg`}
        >
          <pillar.icon className="text-white" size={28} />
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
            <span className={`bg-gradient-to-r ${pillar.gradient} bg-clip-text text-transparent`}>
              {pillar.letter}
            </span>
            <span>-</span>
            <span>{pillar.title}</span>
          </h3>
          
          <p className="text-zinc-400 leading-relaxed">
            {pillar.description}
          </p>
        </div>

        {/* Decorative Number */}
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <span className="text-5xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors duration-500">
            0{index + 1}
          </span>
        </div>
      </CardContent>

      {/* Hover Border Effect */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />
    </Card>
  );
}
