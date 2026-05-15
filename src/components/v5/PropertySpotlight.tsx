import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Bed, Bath, Car, ArrowUpRight } from 'lucide-react';
import { MouseSpotlight } from './MouseSpotlight';

const properties = [
  {
    id: 1,
    title: 'Apartamento Moderno no Tatuapé',
    price: 'R$ 850.000',
    location: 'Tatuapé',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: '95m²',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    type: 'Apartamento',
  },
  {
    id: 2,
    title: 'Casa com Quintal na Vila Formosa',
    price: 'R$ 650.000',
    location: 'Vila Formosa',
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    area: '180m²',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80',
    type: 'Casa',
  },
  {
    id: 3,
    title: 'Sobrado Novo na Penha',
    price: 'R$ 750.000',
    location: 'Penha',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: '140m²',
    image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80',
    type: 'Sobrado',
  },
  {
    id: 4,
    title: 'Apartamento Compacto em Cangaíba',
    price: 'R$ 420.000',
    location: 'Cangaíba',
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    area: '65m²',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
    type: 'Apartamento',
  },
  {
    id: 5,
    title: 'Casa Térrea na Vila Matilde',
    price: 'R$ 580.000',
    location: 'Vila Matilde',
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    area: '120m²',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    type: 'Casa',
  },
  {
    id: 6,
    title: 'Cobertura com Vista no Tatuapé',
    price: 'R$ 1.200.000',
    location: 'Tatuapé',
    bedrooms: 4,
    bathrooms: 3,
    parking: 3,
    area: '220m²',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    type: 'Cobertura',
  },
];

function PropertyCard({ property, index }: { property: typeof properties[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <MouseSpotlight spotlightSize={300} spotlightColor="rgba(59, 130, 246, 0.06)">
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            transformStyle: 'preserve-3d',
            perspective: 800,
          }}
          className="group relative rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.12] cursor-pointer"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.08 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />

            {/* Type Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] text-xs text-white font-medium">
                {property.type}
              </span>
            </div>

            {/* Arrow */}
            <motion.div
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.1] flex items-center justify-center"
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <ArrowUpRight size={16} className="text-white" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-2">
              <MapPin size={14} />
              {property.location}
            </div>
            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
              {property.title}
            </h3>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent mb-4">
              {property.price}
            </div>
            <div className="flex items-center justify-between text-sm text-zinc-500">
              <div className="flex items-center gap-1">
                <Bed size={14} />
                {property.bedrooms}
              </div>
              <div className="flex items-center gap-1">
                <Bath size={14} />
                {property.bathrooms}
              </div>
              <div className="flex items-center gap-1">
                <Car size={14} />
                {property.parking}
              </div>
              <span className="font-medium text-zinc-400">{property.area}</span>
            </div>
          </div>
        </motion.div>
      </MouseSpotlight>
    </motion.div>
  );
}

export function PropertySpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#020205] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-600/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] bg-blue-600/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
            Seleção Especial
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 tracking-tight">
            Imóveis em{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Destaque
            </span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            As melhores oportunidades na Zona Leste de São Paulo, selecionadas com critério.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-14"
        >
          <button
            onClick={() => window.location.href = '/contato'}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300 text-sm font-medium"
          >
            Ver Todos os Imóveis
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
