import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Search, Map, Heart, Target, MapPin, Bed, Bath, Car, 
  Star, MessageSquare, Phone, ArrowRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { DiagnosticModal } from "@/components/ui/diagnostic-modal";
import heroVideo from "@/assets/hero_video.mp4";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

// Data
const pillars = [
  { letter: "P", title: "Planejamento", icon: Map, description: "Entendemos seus objetivos e criamos estratégias personalizadas para alcançar o imóvel dos seus sonhos." },
  { letter: "A", title: "Análise", icon: Search, description: "Avaliação criteriosa do mercado, localização e oportunidades para garantir a melhor escolha." },
  { letter: "Z", title: "Zelo", icon: Heart, description: "Cuidado e atenção em cada detalhe, acompanhando você em toda jornada imobiliária." }
];

const neighborhoods = ["Tatuapé", "Vila Formosa", "Penha", "Cangaíba", "Vila Matilde", "Guilhermina", "Artur Alvim", "Cidade Tiradentes", "Guaianases"];

const properties = [
  { id: 1, title: "Apartamento Moderno no Tatuapé", price: "R$ 850.000", location: "Tatuapé", bedrooms: 3, bathrooms: 2, parking: 2, area: "95m²", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80", type: "Apartamento" },
  { id: 2, title: "Casa com Quintal na Vila Formosa", price: "R$ 650.000", location: "Vila Formosa", bedrooms: 4, bathrooms: 3, parking: 3, area: "180m²", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80", type: "Casa" },
  { id: 3, title: "Sobrado Novo na Penha", price: "R$ 750.000", location: "Penha", bedrooms: 3, bathrooms: 2, parking: 2, area: "140m²", image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80", type: "Sobrado" },
  { id: 4, title: "Apartamento Compacto em Cangaíba", price: "R$ 420.000", location: "Cangaíba", bedrooms: 2, bathrooms: 1, parking: 1, area: "65m²", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80", type: "Apartamento" },
  { id: 5, title: "Casa Térrea na Vila Matilde", price: "R$ 580.000", location: "Vila Matilde", bedrooms: 3, bathrooms: 2, parking: 2, area: "120m²", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80", type: "Casa" },
  { id: 6, title: "Cobertura com Vista no Tatuapé", price: "R$ 1.200.000", location: "Tatuapé", bedrooms: 4, bathrooms: 3, parking: 3, area: "220m²", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80", type: "Cobertura" }
];

const testimonials = [
  { id: 1, name: "Maria Santos", location: "Tatuapé", text: "A Pinheiro Azul superou todas as minhas expectativas! O atendimento foi excepcional desde o primeiro contato até a entrega das chaves. A metodologia P.A.Z.© realmente faz a diferença.", rating: 5, image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80" },
  { id: 2, name: "João Silva", location: "Vila Formosa", text: "Profissionais extremamente competentes e atenciosos. Encontraram exatamente o que eu procurava na Zona Leste. O processo foi transparente e sem surpresas desagradáveis.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  { id: 3, name: "Ana Costa", location: "Penha", text: "Vendemos nossa casa com a Pinheiro Azul em tempo recorde! A equipe cuidou de todos os detalhes e nos manteve informados durante todo o processo. Recomendo de olhos fechados!", rating: 5, image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" }
];

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

const HomeV2 = () => {
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
  const form = useForm<ContactFormData>({
    defaultValues: { name: "", email: "", phone: "" }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Navigation />
      
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/50 to-zinc-950" />
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-600/20 rounded-full blur-3xl" />

        <motion.div 
          className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
            variants={fadeInUp}
          >
            Encontre seu lar na{" "}
            <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
              Zona Leste de São Paulo
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-10 text-zinc-300 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            Sua jornada imobiliária começa aqui, com a segurança e o zelo que você merece.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={fadeInUp}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
            >
              <Search className="mr-2" size={20} />
              Buscar Imóveis
              <ArrowRight className="ml-2" size={18} />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm rounded-full"
            >
              Saiba Mais
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== BENTO GRID: METODOLOGIA + BUSCA ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-6">
          
          {/* Metodologia P.A.Z.© Card (2/5 width) */}
          <motion.div 
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            <Card className="h-full bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-blue-400" size={20} />
                  <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Metodologia Exclusiva</span>
                </div>
                
                <h2 className="text-3xl font-bold mb-3 text-white">
                  Nossa Metodologia: P.A.Z.©
                </h2>
                <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
                  Uma abordagem exclusiva que combina planejamento estratégico, análise profunda e zelo humano para superar suas expectativas.
                </p>

                <div className="space-y-4">
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <div key={pillar.letter} className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center shrink-0">
                          <Icon className="text-white" size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white flex items-center gap-2">
                            <span className="text-blue-400">{pillar.letter}</span> - {pillar.title}
                          </h4>
                          <p className="text-zinc-400 text-sm mt-1">{pillar.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button asChild className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl py-6">
                  <Link to="/sobre">
                    Conheça Nossa História
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Busca de Imóveis Card (3/5 width) */}
          <motion.div 
            className="lg:col-span-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
          >
            <Card className="h-full bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-white">
                  Encontre seu Imóvel Ideal
                </h2>
                <p className="text-zinc-400 mb-8">
                  Use nossos filtros inteligentes para descobrir as melhores oportunidades na Zona Leste
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Tipo de Imóvel</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12">
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="sobrado">Sobrado</SelectItem>
                        <SelectItem value="terreno">Terreno</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Localização</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12">
                        <SelectValue placeholder="Escolha o bairro" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        {neighborhoods.map((n) => (
                          <SelectItem key={n} value={n.toLowerCase()}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Dormitórios</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12">
                        <SelectValue placeholder="Quantos quartos?" />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-800 border-zinc-700">
                        <SelectItem value="1">1 Dormitório</SelectItem>
                        <SelectItem value="2">2 Dormitórios</SelectItem>
                        <SelectItem value="3">3 Dormitórios</SelectItem>
                        <SelectItem value="4+">4+ Dormitórios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">Preço Máximo</label>
                    <Input 
                      type="text" 
                      placeholder="R$ 500.000"
                      className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500"
                    />
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl py-6 text-lg font-semibold"
                >
                  <Search className="mr-2" size={20} />
                  Buscar Imóveis
                </Button>

                {/* Diagnostic CTA */}
                <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-blue-600/10 to-violet-600/10 border border-blue-500/20">
                  <h3 className="text-lg font-bold text-white mb-1">Cansado de filtrar?</h3>
                  <p className="text-zinc-400 text-sm mb-4">
                    Descubra seu Perfil Ideal em 5 Perguntas e receba recomendações personalizadas!
                  </p>
                  <Button 
                    onClick={() => setShowDiagnostic(true)}
                    className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl py-5"
                  >
                    <Target className="mr-2" size={18} />
                    Fazer Diagnóstico Gratuito
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ===== IMÓVEIS EM DESTAQUE ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Imóveis em Destaque
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Seleção especial das melhores oportunidades na Zona Leste de São Paulo
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {properties.map((property) => (
            <motion.div key={property.id} variants={fadeInUp}>
              <Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
                <div className="relative overflow-hidden">
                  <img 
                    src={property.image} 
                    alt={property.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur-sm text-white border-0">
                    {property.type}
                  </Badge>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-center text-sm text-zinc-400 mb-2">
                    <MapPin size={14} className="mr-1" />
                    {property.location}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {property.title}
                  </h3>
                  
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-4">
                    {property.price}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-zinc-400 pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-1"><Bed size={14} /> {property.bedrooms}</div>
                    <div className="flex items-center gap-1"><Bath size={14} /> {property.bathrooms}</div>
                    <div className="flex items-center gap-1"><Car size={14} /> {property.parking}</div>
                    <div className="font-medium text-zinc-300">{property.area}</div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-5 pt-0">
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl">
                    Ver Detalhes
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Button 
            variant="outline" 
            size="lg" 
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full px-8"
          >
            Ver Todos os Imóveis
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </motion.div>
      </section>

      {/* ===== DEPOIMENTOS + CONTATO (Bento Grid) ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Depoimentos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <Card className="h-full bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-white">
                  O que Nossos Clientes Dizem
                </h2>
                <p className="text-zinc-400 mb-8">
                  Histórias reais de quem confiou na Pinheiro Azul para realizar seus sonhos
                </p>

                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="p-5 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 transition-colors">
                      <div className="flex items-center gap-4 mb-3">
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                        <div>
                          <h4 className="font-semibold text-white">{t.name}</h4>
                          <p className="text-zinc-500 text-sm">{t.location}</p>
                        </div>
                        <div className="ml-auto flex">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">"{t.text}"</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contato */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={scaleIn}
          >
            <Card className="h-full bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800 rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold mb-2 text-white">
                  Pronto para Encontrar seu Novo Lar?
                </h2>
                <p className="text-zinc-400 mb-8">
                  Fale com nossos especialistas na Zona Leste e comece sua jornada com a Pinheiro Azul Negócios Imobiliários.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Nome é obrigatório" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Nome Completo</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Seu nome completo" className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ required: "E-mail é obrigatório", pattern: { value: /^\S+@\S+$/i, message: "E-mail inválido" } }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">E-mail</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="seu@email.com" className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: "Telefone é obrigatório" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Telefone</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="(11) 99999-9999" className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl py-6 text-lg font-semibold">
                      Enviar Mensagem
                    </Button>
                  </form>
                </Form>

                {/* Contact Info */}
                <div className="mt-8 pt-6 border-t border-zinc-800 space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-blue-400 mt-1 shrink-0" size={18} />
                    <div>
                      <h4 className="font-medium text-white text-sm">Endereço</h4>
                      <p className="text-zinc-400 text-sm">Rua das Palmeiras, 123 - Vila Formosa<br/>São Paulo - SP, CEP 03355-000</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="text-blue-400 mt-1 shrink-0" size={18} />
                    <div>
                      <h4 className="font-medium text-white text-sm">Telefone</h4>
                      <p className="text-zinc-400 text-sm">(11) 3456-7890</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full mt-6 bg-green-600 hover:bg-green-500 text-white rounded-xl py-6 text-lg"
                  onClick={() => window.open('https://wa.me/5511987654321', '_blank')}
                >
                  <MessageSquare className="mr-2" size={20} />
                  Fale pelo WhatsApp
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <DiagnosticModal open={showDiagnostic} onOpenChange={setShowDiagnostic} />
      <Footer />
    </div>
  );
};

export default HomeV2;
