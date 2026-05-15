import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MapPin, Bed, Bath, Car, Maximize, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    featured: true
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
    featured: false
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
    featured: true
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
    featured: false
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
    featured: false
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
    featured: true
  }
];

export function PropertyGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Portfólio</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
            Imóveis em{' '}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Destaque
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Seleção especial das melhores oportunidades na Zona Leste de São Paulo
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={index === 0 || index === 5 ? 'md:row-span-2' : ''}
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <PropertyCard 
                property={property} 
                isLarge={index === 0 || index === 5}
                isHovered={hoveredId === property.id}
              />
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
            variant="outline"
            size="lg"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:text-white hover:border-zinc-600 rounded-full px-8 py-6 text-lg group transition-all duration-300"
          >
            Ver Todos os Imóveis
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function PropertyCard({ 
  property, 
  isLarge, 
  isHovered 
}: { 
  property: typeof properties[0]; 
  isLarge: boolean;
  isHovered: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        rotateX: isHovered ? rotateX : 0, 
        rotateY: isHovered ? rotateY : 0,
        transformStyle: 'preserve-3d'
      }}
      className="group relative h-full bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors duration-500"
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${isLarge ? 'h-80' : 'h-56'}`}>
        <motion.img
          src={property.image}
          alt={property.title}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-zinc-900/80 backdrop-blur-sm text-white border-0">
            {property.type}
          </Badge>
          {property.featured && (
            <Badge className="bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0">
              Destaque
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
        >
          <Heart size={18} />
        </motion.button>

        {/* Price - Floating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute bottom-4 left-4"
        >
          <span className="text-2xl md:text-3xl font-bold text-white">
            {property.price}
          </span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-center text-sm text-zinc-400 mb-2">
          <MapPin size={14} className="mr-1 text-blue-400" />
          {property.location}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-white mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors duration-300">
          {property.title}
        </h3>

        {/* Features Grid */}
        <div className="grid grid-cols-4 gap-2 text-sm text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Bed size={14} className="text-zinc-500" />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={14} className="text-zinc-500" />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Car size={14} className="text-zinc-500" />
            <span>{property.parking}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize size={14} className="text-zinc-500" />
            <span>{property.area}</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none transition-opacity duration-500"
      />

      {/* Spotlight Effect */}
      <motion.div
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle at ${(Number(x) + 0.5) * 100}% ${(Number(y) + 0.5) * 100}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`
          )
        }}
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  );
}
