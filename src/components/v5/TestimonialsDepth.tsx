import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Maria Santos',
    location: 'Tatuapé',
    text: 'A Pinheiro Azul superou todas as minhas expectativas! O atendimento foi excepcional desde o primeiro contato até a entrega das chaves. A metodologia P.A.Z.© realmente faz a diferença.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80',
    role: 'Compradora',
  },
  {
    id: 2,
    name: 'João Silva',
    location: 'Vila Formosa',
    text: 'Profissionais extremamente competentes e atenciosos. Encontraram exatamente o que eu procurava na Zona Leste. O processo foi transparente e sem surpresas desagradáveis.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'Investidor',
  },
  {
    id: 3,
    name: 'Ana Costa',
    location: 'Penha',
    text: 'Vendemos nossa casa com a Pinheiro Azul em tempo recorde! A equipe cuidou de todos os detalhes e nos manteve informados durante todo o processo. Recomendo de olhos fechados!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    role: 'Vendedora',
  },
  {
    id: 4,
    name: 'Carlos Mendes',
    location: 'Mooca',
    text: 'Já trabalhei com várias imobiliárias, mas a Pinheiro Azul é diferente. Eles realmente entendem o mercado da Zona Leste e têm um cuidado genuíno com o cliente.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    role: 'Comprador',
  },
  {
    id: 5,
    name: 'Fernanda Lima',
    location: 'Vila Matilde',
    text: 'Do primeiro atendimento até a assinatura do contrato, tudo foi impecável. A equipe é extremamente profissional e atenciosa. Meu apartamento dos sonhos virou realidade!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'Compradora',
  },
];

export function TestimonialsDepth() {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const goNext = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const goPrev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#020205] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
            Depoimentos
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 tracking-tight">
            O que nossos{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              clientes dizem
            </span>
          </h2>
        </motion.div>

        {/* Cards Stack */}
        <div className="relative h-[400px] md:h-[320px] flex items-center justify-center">
          <AnimatePresence mode="popLayout">
            {testimonials.map((testimonial, index) => {
              const offset = index - current;
              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{
                    opacity: isActive ? 1 : 0.4 - Math.abs(offset) * 0.1,
                    scale: isActive ? 1 : 0.92 - Math.abs(offset) * 0.03,
                    y: offset * 12,
                    x: offset * 20,
                    zIndex: testimonials.length - Math.abs(offset),
                    rotateY: offset * -3,
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -50 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute w-full max-w-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                >
                  <div
                    className={`rounded-3xl border p-8 md:p-10 transition-all duration-500 ${
                      isActive
                        ? 'border-white/[0.1] bg-white/[0.03] backdrop-blur-xl'
                        : 'border-white/[0.04] bg-white/[0.01]'
                    }`}
                  >
                    <Quote size={32} className="text-blue-500/30 mb-6" />

                    <p className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-8">
                      "{testimonial.text}"
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white/[0.08]"
                        />
                        <div>
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-zinc-500">
                            {testimonial.role} — {testimonial.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={goPrev}
            className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'w-8 bg-gradient-to-r from-blue-400 to-violet-400'
                    : 'w-2 bg-white/[0.1] hover:bg-white/[0.2]'
                }`}
                aria-label={`Depoimento ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            className="w-12 h-12 rounded-full border border-white/[0.08] bg-white/[0.02] flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
