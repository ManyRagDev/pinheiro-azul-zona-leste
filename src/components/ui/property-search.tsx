import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Target } from "lucide-react";
import { DiagnosticModal } from "./diagnostic-modal";

const PropertySearch = () => {
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const neighborhoods = [
    "Tatuapé", "Vila Formosa", "Penha", "Cangaíba", "Vila Matilde",
    "Guilhermina", "Artur Alvim", "Cidade Tiradentes", "Guaianases"
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
            Encontre seu Imóvel Ideal
          </h2>
          <p className="text-xl text-muted-foreground">
            Use nossos filtros inteligentes para descobrir as melhores oportunidades na Zona Leste
          </p>
        </div>

        <Card className="max-w-4xl mx-auto border-0 shadow-card">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Tipo de Imóvel
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="sobrado">Sobrado</SelectItem>
                    <SelectItem value="terreno">Terreno</SelectItem>
                    <SelectItem value="comercial">Comercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Localização
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha o bairro" />
                  </SelectTrigger>
                  <SelectContent>
                    {neighborhoods.map((neighborhood) => (
                      <SelectItem key={neighborhood} value={neighborhood.toLowerCase()}>
                        {neighborhood}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Dormitórios
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Quantos quartos?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Dormitório</SelectItem>
                    <SelectItem value="2">2 Dormitórios</SelectItem>
                    <SelectItem value="3">3 Dormitórios</SelectItem>
                    <SelectItem value="4+">4+ Dormitórios</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-brand-text mb-2">
                  Preço Máximo
                </label>
                <Input 
                  type="text" 
                  placeholder="R$ 500.000"
                  className="focus:ring-brand-accent focus:border-brand-accent"
                />
              </div>
            </div>

            <div className="flex justify-center">
              <Button 
                size="lg" 
                className="bg-brand-accent hover:bg-brand-accent/90 px-12 py-3 text-lg font-semibold"
              >
                <Search className="mr-2" size={20} />
                Buscar Imóveis
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* CTA Diagnóstico de Perfil */}
        <div className="max-w-4xl mx-auto mt-8">
          <Card className="border-2 border-brand-accent/20 bg-gradient-to-r from-brand-primary/5 to-brand-accent/5">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold text-brand-primary mb-2">
                Cansado de filtrar? 
              </h3>
              <p className="text-muted-foreground mb-4">
                Descubra seu Perfil Ideal em 5 Perguntas e receba recomendações personalizadas!
              </p>
              <Button 
                size="lg" 
                onClick={() => setShowDiagnostic(true)}
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-lg font-semibold py-3"
              >
                <Target className="mr-2" size={20} />
                Fazer Diagnóstico Gratuito
              </Button>
            </CardContent>
          </Card>
        </div>

        <DiagnosticModal 
          open={showDiagnostic} 
          onOpenChange={setShowDiagnostic} 
        />
      </div>
    </section>
  );
};

export default PropertySearch;