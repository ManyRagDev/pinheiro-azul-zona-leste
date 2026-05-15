import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, Target, SlidersHorizontal, MapPin, Home, Bed, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DiagnosticModal } from '@/components/ui/diagnostic-modal';

const tabs = [
  { id: 'search', label: 'Busca', icon: Search },
  { id: 'filters', label: 'Filtros Avançados', icon: SlidersHorizontal },
  { id: 'diagnostic', label: 'Diagnóstico', icon: Target },
];

const neighborhoods = [
  'Tatuapé', 'Vila Formosa', 'Penha', 'Cangaíba', 
  'Vila Matilde', 'Guilhermina', 'Artur Alvim', 
  'Cidade Tiradentes', 'Guaianases'
];

export function PropertySearchV3() {
  const [activeTab, setActiveTab] = useState('search');
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Encontre seu Imóvel</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Busca <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">Inteligente</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Use nossos filtros inteligentes para descobrir as melhores oportunidades na Zona Leste de São Paulo.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              {[
                { icon: MapPin, text: 'Cobertura completa da Zona Leste' },
                { icon: Home, text: 'Todos os tipos de imóveis' },
                { icon: Bed, text: 'Filtros por quartos e metragem' },
                { icon: Wallet, text: 'Faixa de preço personalizada' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <feature.icon className="text-blue-400" size={18} />
                  </div>
                  <span className="text-zinc-300">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Interactive Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-violet-600/20 rounded-3xl blur-xl" />
              
              <div className="relative bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-zinc-800">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (tab.id === 'diagnostic') setShowDiagnostic(true);
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-all duration-300 relative ${
                        activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <tab.icon size={16} />
                      {tab.label}
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-violet-500"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === 'search' && (
                      <motion.div
                        key="search"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 focus:ring-blue-500/20">
                              <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {['Apartamento', 'Casa', 'Sobrado', 'Terreno', 'Comercial'].map((type) => (
                                <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 focus:ring-blue-500/20">
                              <SelectValue placeholder="Bairro" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {neighborhoods.map((n) => (
                                <SelectItem key={n} value={n.toLowerCase()}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 focus:ring-blue-500/20">
                              <SelectValue placeholder="Quartos" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {[1, 2, 3, '4+'].map((n) => (
                                <SelectItem key={n} value={String(n)}>{n} {n === 1 ? 'Dormitório' : 'Dormitórios'}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Input 
                            type="text" 
                            placeholder="Preço Máximo"
                            className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500 focus:ring-blue-500/20"
                          />
                        </div>

                        <Button 
                          size="lg" 
                          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                          <Search className="mr-2" size={20} />
                          Buscar Imóveis
                        </Button>
                      </motion.div>
                    )}

                    {activeTab === 'filters' && (
                      <motion.div
                        key="filters"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12">
                              <SelectValue placeholder="Banheiros" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {[1, 2, 3, '4+'].map((n) => (
                                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12">
                              <SelectValue placeholder="Vagas" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {[1, 2, 3, '4+'].map((n) => (
                                <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12">
                              <SelectValue placeholder="Metragem" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {['Até 50m²', '50-100m²', '100-150m²', '150m²+'].map((size) => (
                                <SelectItem key={size} value={size}>{size}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <Select>
                            <SelectTrigger className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12">
                              <SelectValue placeholder="Condomínio" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-900 border-zinc-800">
                              {['Com piscina', 'Com academia', 'Com churrasqueira', 'Pet friendly'].map((feature) => (
                                <SelectItem key={feature} value={feature}>{feature}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <Button 
                          size="lg" 
                          className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl py-6 text-lg font-semibold"
                        >
                          <SlidersHorizontal className="mr-2" size={20} />
                          Aplicar Filtros
                        </Button>
                      </motion.div>
                    )}

                    {activeTab === 'diagnostic' && (
                      <motion.div
                        key="diagnostic"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-8"
                      >
                        <Target className="mx-auto text-blue-400 mb-4" size={48} />
                        <h3 className="text-xl font-bold text-white mb-2">Cansado de filtrar?</h3>
                        <p className="text-zinc-400 mb-6">
                          Descubra seu Perfil Ideal em 5 Perguntas e receba recomendações personalizadas!
                        </p>
                        <Button
                          onClick={() => setShowDiagnostic(true)}
                          className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl px-8 py-6"
                        >
                          Fazer Diagnóstico Gratuito
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Diagnostic Mini CTA */}
                {activeTab !== 'diagnostic' && (
                  <div className="px-6 pb-6">
                    <div 
                      onClick={() => setShowDiagnostic(true)}
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-violet-600/10 border border-blue-500/20 cursor-pointer hover:border-blue-500/40 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Target className="text-blue-400" size={20} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white text-sm">Cansado de filtrar?</h4>
                          <p className="text-zinc-400 text-xs">Descubra seu Perfil Ideal em 5 Perguntas!</p>
                        </div>
                        <ArrowRight className="text-zinc-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" size={18} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <DiagnosticModal open={showDiagnostic} onOpenChange={setShowDiagnostic} />
    </section>
  );
}
