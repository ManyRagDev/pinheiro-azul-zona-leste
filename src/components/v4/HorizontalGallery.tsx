import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Bed, Bath, Car, Maximize, Heart, ArrowRight } from 'lucide-react';

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
    title: 'Cobertura Duplex no Tatuapé',
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

function PropertyCard({ property }: { property: (typeof properties)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 200,
    damping: 25,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      className="group flex-shrink-0 w-[340px] sm:w-[380px] cursor-pointer"
    >
      <div className="relative rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm transition-all duration-500 hover:border-white/[0.12]">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <motion.img
            src={property.image}
            alt={property.title}
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/20 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 backdrop-blur-xl text-white border border-white/10">
            {property.type}
          </div>

          {/* Heart */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-zinc-400 hover:text-red-400 border border-white/10 transition-colors"
          >
            <Heart size={15} />
          </motion.button>

          {/* Price */}
          <div className="absolute bottom-4 left-4">
            <span className="text-2xl font-bold text-white tracking-tight">{property.price}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1 text-xs text-zinc-500 mb-2">
            <MapPin size={12} className="text-blue-400" />
            {property.location}
          </div>
          <h3 className="text-base font-semibold text-white mb-4 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Bed size={13} className="text-zinc-600" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1">
              <Bath size={13} className="text-zinc-600" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1">
              <Car size={13} className="text-zinc-600" />
              {property.parking}
            </span>
            <span className="flex items-center gap-1">
              <Maximize size={13} className="text-zinc-600" />
              {property.area}
            </span>
          </div>
        </div>

        {/* Hover spotlight */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-blue-500/[0.06] to-transparent pointer-events-none transition-opacity duration-500"
        />
      </div>
    </motion.div>
  );
}

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="relative py-28 bg-[#050510] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-violet-600/[0.03] rounded-full blur-[180px]" />
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
            Portfólio Selecionado
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 tracking-tight">
            Imóveis em{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Destaque
            </span>
          </h2>
          <p className="text-lg text-zinc-400 mt-4 max-w-xl mx-auto">
            As melhores oportunidades na Zona Leste de São Paulo, selecionadas para você.
          </p>
        </motion.div>

        {/* Horizontal Scroll */}
        <div className="relative">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#050510] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050510] to-transparent z-10 pointer-events-none" />

          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide px-8 pb-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {properties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, x: 80 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.1 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="snap-start"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 px-4"
        >
          <button className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/[0.1] bg-white/[0.03] text-zinc-300 hover:text-white hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 text-sm font-medium">
            Ver Todos os Imóveis
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
