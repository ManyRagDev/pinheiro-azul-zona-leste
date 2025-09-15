import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Maria Santos",
      location: "Tatuapé",
      text: "A Pinheiro Azul superou todas as minhas expectativas! O atendimento foi excepcional desde o primeiro contato até a entrega das chaves. A metodologia P.A.Z.© realmente faz a diferença.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 2,
      name: "João Silva",
      location: "Vila Formosa",
      text: "Profissionais extremamente competentes e atenciosos. Encontraram exatamente o que eu procurava na Zona Leste. O processo foi transparente e sem surpresas desagradáveis.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
    },
    {
      id: 3,
      name: "Ana Costa",
      location: "Penha",
      text: "Vendemos nossa casa com a Pinheiro Azul em tempo recorde! A equipe cuidou de todos os detalhes e nos manteve informados durante todo o processo. Recomendo de olhos fechados!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <section className="py-16 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            O que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground">
            Histórias reais de quem confiou na Pinheiro Azul para realizar seus sonhos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-card hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-brand-primary text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;