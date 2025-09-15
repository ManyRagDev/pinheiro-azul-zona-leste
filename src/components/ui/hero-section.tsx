import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-couple.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/80 to-brand-primary/60" />
      </div>
      
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Encontre seu lar na 
          <span className="text-accent"> Zona Leste de São Paulo</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
          Sua jornada imobiliária começa aqui, com a segurança e o zelo que você merece.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent/90 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Search className="mr-2" size={20} />
            Buscar Imóveis
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8 py-4 text-lg backdrop-blur-sm"
          >
            Saiba Mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;