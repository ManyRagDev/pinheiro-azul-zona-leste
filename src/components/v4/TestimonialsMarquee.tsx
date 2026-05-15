import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimationControls, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    location: 'Tatuapé',
    text: 'A Pinheiro Azul superou todas as minhas expectativas! O atendimento foi excepcional desde o primeiro contato até a entrega das chaves.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'João Silva',
    location: 'Vila Formosa',
    text: 'Profissionais extremamente competentes e atenciosos. Encontraram exatamente o que eu procurava na Zona Leste.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Ana Costa',
    location: 'Penha',
    text: 'Vendemos nossa casa em tempo recorde! A equipe cuidou de todos os detalhes e nos manteve informados durante todo o processo.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    location: 'Mooca',
    text: 'Excelente experiência! A equipe é muito profissional e dedicada. Encontraram o apartamento perfeito para minha família.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 5,
    name: 'Julia Mendes',
    location: 'Cangaíba',
    text: 'Serviço impecável! Desde o primeiro atendimento senti que estava em boas mãos. Transação rápida e sem complicações.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 6,
    name: 'Carlos Ferreira',
    location: 'Vila Matilde',
    text: 'Contratei para vender um imóvel e fiquei impressionado com a agilidade. Fechamos em menos de 30 dias!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
];

const row1 = [...testimonials, ...testimonials];
const row2 = [...testimonials.slice(3), ...testimonials.slice(0, 3), ...testimonials.slice(3), ...testimonials.slice(0, 3)];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const bgX = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={(e) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - r.left) / r.width - 0.5);
        mouseY.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
        setHovered(false);
      }}
      className="flex-shrink-0 w-[320px] sm:w-[360px]"
    >
      <div className="relative h-full p-6 rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.1]">
        {/* Quote icon */}
        <div className="absolute -top-2 -left-2 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Quote className="text-white" size={14} />
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-4 mt-2">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Text */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-5 line-clamp-4">
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">{t.name}</h4>
            <p className="text-xs text-zinc-500">{t.location}</p>
          </div>
        </div>

        {/* Hover spotlight */}
        <motion.div
          style={{ x: bgX, y: bgY }}
          animate={{ opacity: hovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.06] to-violet-500/[0.06] pointer-events-none transition-opacity duration-500"
        />
      </div>
    </motion.div>
  );
}

export function TestimonialsMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();

  useEffect(() => {
    if (isInView && !isPaused) {
      controls1.start({
        x: '-50%',
        transition: { duration: 35, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
      });
      controls2.start({
        x: '0%',
        transition: { duration: 40, ease: 'linear', repeat: Infinity, repeatType: 'loop' },
      });
    } else {
      controls1.stop();
      controls2.stop();
    }
  }, [isInView, isPaused, controls1, controls2]);

  return (
    <section
      ref={containerRef}
      className="relative py-28 bg-[#050510] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-blue-600/[0.04] rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 px-4"
        >
          <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
            O que nossos clientes{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              dizem
            </span>
          </h2>
        </motion.div>

        {/* Row 1 */}
        <div className="relative mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none" />
          <motion.div animate={controls1} initial={{ x: 0 }} className="flex gap-5 py-2">
            {row1.map((t, i) => (
              <TestimonialCard key={`r1-${t.id}-${i}`} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 (reverse direction) */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none" />
          <motion.div
            animate={controls2}
            initial={{ x: '-50%' }}
            className="flex gap-5 py-2"
          >
            {row2.map((t, i) => (
              <TestimonialCard key={`r2-${t.id}-${i}`} t={t} />
            ))}
          </motion.div>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-7 py-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="w-px h-8 bg-white/[0.08]" />
            <div className="text-left">
              <div className="text-white font-bold text-base">4.9 / 5.0</div>
              <div className="text-zinc-500 text-xs">500+ avaliações</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
