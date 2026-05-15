import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimationControls } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    location: 'Tatuapé',
    text: 'A Pinheiro Azul superou todas as minhas expectativas! O atendimento foi excepcional desde o primeiro contato até a entrega das chaves. A metodologia P.A.Z.© realmente faz a diferença.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 2,
    name: 'João Silva',
    location: 'Vila Formosa',
    text: 'Profissionais extremamente competentes e atenciosos. Encontraram exatamente o que eu procurava na Zona Leste. O processo foi transparente e sem surpresas desagradáveis.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 3,
    name: 'Ana Costa',
    location: 'Penha',
    text: 'Vendemos nossa casa com a Pinheiro Azul em tempo recorde! A equipe cuidou de todos os detalhes e nos manteve informados durante todo o processo. Recomendo de olhos fechados!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 4,
    name: 'Pedro Oliveira',
    location: 'Mooca',
    text: 'Excelente experiência! A equipe da Pinheiro Azul é muito profissional e dedicada. Conseguiram encontrar o apartamento perfeito para minha família dentro do nosso orçamento.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 5,
    name: 'Julia Mendes',
    location: 'Cangaíba',
    text: 'Serviço impecável! Desde o primeiro atendimento senti que estava em boas mãos. A transação foi rápida, segura e sem complicações. Muito obrigada a toda a equipe!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 6,
    name: 'Carlos Ferreira',
    location: 'Vila Matilde',
    text: 'Contratei a Pinheiro Azul para vender um imóvel e fiquei impressionado com a agilidade e profissionalismo. Fechamos em menos de 30 dias. Super recomendo!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
  }
];

// Duplicate for infinite scroll
const duplicatedTestimonials = [...testimonials, ...testimonials];

export function TestimonialsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    if (isInView && !isPaused) {
      controls.start({
        x: '-50%',
        transition: {
          duration: 40,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }
      });
    } else {
      controls.stop();
    }
  }, [isInView, isPaused, controls]);

  return (
    <section ref={containerRef} className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 px-4"
        >
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            O que nossos clientes{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              dizem
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Histórias reais de quem confiou na Pinheiro Azul para realizar seus sonhos
          </p>
        </motion.div>

        {/* Infinite Carousel */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          {/* Carousel Track */}
          <motion.div
            animate={controls}
            initial={{ x: 0 }}
            className="flex gap-6 py-4"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`${testimonial.id}-${index}`} 
                testimonial={testimonial}
                isInView={isInView}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg">4.9/5.0</div>
              <div className="text-zinc-400 text-sm">Baseado em 500+ avaliações</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TestimonialCard({ 
  testimonial, 
  isInView, 
  index 
}: { 
  testimonial: typeof testimonials[0]; 
  isInView: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="flex-shrink-0 w-[400px] group"
    >
      <div className="relative p-6 rounded-3xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-500 h-full">
        {/* Quote Icon */}
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center shadow-lg">
          <Quote className="text-white" size={18} />
        </div>

        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <Star className="text-yellow-400 fill-yellow-400" size={16} />
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <p className="text-zinc-300 leading-relaxed mb-6 line-clamp-4">
          "{testimonial.text}"
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-zinc-800"
          />
          <div>
            <h4 className="font-semibold text-white">{testimonial.name}</h4>
            <p className="text-zinc-500 text-sm">{testimonial.location}</p>
          </div>
        </div>

        {/* Hover Glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
}
