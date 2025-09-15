import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Car } from "lucide-react";

const FeaturedProperties = () => {
  const properties = [
    {
      id: 1,
      title: "Apartamento Moderno no Tatuapé",
      price: "R$ 850.000",
      location: "Tatuapé",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "95m²",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      type: "Apartamento"
    },
    {
      id: 2,
      title: "Casa com Quintal na Vila Formosa",
      price: "R$ 650.000",
      location: "Vila Formosa", 
      bedrooms: 4,
      bathrooms: 3,
      parking: 3,
      area: "180m²",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
      type: "Casa"
    },
    {
      id: 3,
      title: "Sobrado Novo na Penha",
      price: "R$ 750.000",
      location: "Penha",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "140m²",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?auto=format&fit=crop&w=800&q=80",
      type: "Sobrado"
    },
    {
      id: 4,
      title: "Apartamento Compacto em Cangaíba",
      price: "R$ 420.000",
      location: "Cangaíba",
      bedrooms: 2,
      bathrooms: 1,
      parking: 1,
      area: "65m²",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      type: "Apartamento"
    },
    {
      id: 5,
      title: "Casa Térrea na Vila Matilde",
      price: "R$ 580.000",
      location: "Vila Matilde",
      bedrooms: 3,
      bathrooms: 2,
      parking: 2,
      area: "120m²",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      type: "Casa"
    },
    {
      id: 6,
      title: "Cobertura com Vista no Tatuapé",
      price: "R$ 1.200.000",
      location: "Tatuapé",
      bedrooms: 4,
      bathrooms: 3,
      parking: 3,
      area: "220m²",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      type: "Cobertura"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Imóveis em Destaque
          </h2>
          <p className="text-xl text-muted-foreground">
            Seleção especial das melhores oportunidades na Zona Leste de São Paulo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Card key={property.id} className="overflow-hidden border-0 shadow-card hover:shadow-elegant transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-brand-primary/90 hover:bg-brand-primary">
                  {property.type}
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <MapPin size={16} className="mr-1" />
                  {property.location}
                </div>
                
                <h3 className="text-lg font-semibold text-brand-primary mb-2 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="text-2xl font-bold text-brand-accent mb-4">
                  {property.price}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Bed size={16} className="mr-1" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center">
                    <Bath size={16} className="mr-1" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center">
                    <Car size={16} className="mr-1" />
                    {property.parking}
                  </div>
                  <div className="font-medium">
                    {property.area}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-brand-primary hover:bg-brand-primary/90">
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white">
            Ver Todos os Imóveis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;