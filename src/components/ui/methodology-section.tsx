import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Search as SearchIcon, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const MethodologySection = () => {
  const pillars = [
    {
      letter: "P",
      title: "Planejamento",
      icon: Map,
      description: "Entendemos seus objetivos e criamos estratégias personalizadas para alcançar o imóvel dos seus sonhos."
    },
    {
      letter: "A", 
      title: "Análise",
      icon: SearchIcon,
      description: "Avaliação criteriosa do mercado, localização e oportunidades para garantir a melhor escolha."
    },
    {
      letter: "Z",
      title: "Zelo",
      icon: Heart,
      description: "Cuidado e atenção em cada detalhe, acompanhando você em toda jornada imobiliária."
    }
  ];

  return (
    <section className="py-16 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Nossa Metodologia: P.A.Z.©
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Uma abordagem exclusiva que combina planejamento estratégico, 
            análise profunda e zelo humano para superar suas expectativas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card key={pillar.letter} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="text-white" size={32} />
                    </div>
                    <div className="text-4xl font-bold text-brand-primary mb-2">
                      {pillar.letter}
                    </div>
                    <h3 className="text-2xl font-semibold text-brand-primary mb-4">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90">
            <Link to="/sobre">Conheça Nossa História</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MethodologySection;