import { useState, useEffect } from "react";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  thumbnail: string;
  readTime: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Simulando carregamento de posts - em produção seria uma API
    const mockPosts: BlogPost[] = [
      {
        slug: "guia-completo-comprar-imovel-zona-leste",
        title: "Guia Completo para Comprar um Imóvel na Zona Leste Sem Dor de Cabeça",
        excerpt: "Entenda todos os custos envolvidos e a burocracia necessária para realizar o sonho da casa própria na Zona Leste de São Paulo de forma segura e tranquila.",
        date: "2024-03-15",
        category: "Compra",
        thumbnail: "/src/assets/blog-compra-imovel.webp",
        readTime: "8 min"
      },
      {
        slug: "melhores-bairros-zona-leste-familias",
        title: "Morar na Zona Leste: Descubra os 5 Melhores Bairros para Famílias",
        excerpt: "Conheça os bairros da Zona Leste que oferecem a melhor qualidade de vida para famílias, incluindo opções pet-friendly e infraestrutura completa.",
        date: "2024-03-10",
        category: "Localização",
        thumbnail: "/src/assets/blog-bairros-familias.webp",
        readTime: "6 min"
      },
      {
        slug: "valorizar-imovel-antes-venda-zona-leste",
        title: "5 Dicas Simples para Valorizar o Seu Imóvel Antes de Colocá-lo à Venda",
        excerpt: "Aprenda estratégias práticas e econômicas para aumentar o valor do seu imóvel na Zona Leste e acelerar a venda com melhor retorno financeiro.",
        date: "2024-03-05",
        category: "Venda",
        thumbnail: "/src/assets/blog-valorizar-imovel.webp",
        readTime: "5 min"
      }
    ];
    setPosts(mockPosts);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Compra': 'bg-brand-primary text-white',
      'Venda': 'bg-brand-accent text-white',
      'Localização': 'bg-brand-secondary text-white'
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Blog Pinheiro Azul
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, dicas e guias especializados sobre o mercado imobiliário 
              da Zona Leste de São Paulo
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="group hover:shadow-lg transition-all duration-300 border-border">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img 
                    src={post.thumbnail} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getCategoryColor(post.category)}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl leading-tight group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-muted-foreground text-sm">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(post.date)}
                    </div>
                    
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/blog/${post.slug}`}>
                        Ler mais
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Precisa de Ajuda Especializada?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para ajudar você em todas as etapas 
              da sua jornada imobiliária na Zona Leste de São Paulo.
            </p>
            <Button asChild className="bg-brand-accent hover:bg-brand-accent/90">
              <Link to="/contato">
                Fale Conosco
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;