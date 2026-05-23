import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  thumbnail: string;
  readTime: string;
  diagnosticHref: string;
}

const posts: BlogPost[] = [
  {
    slug: "guia-completo-comprar-imovel-zona-leste",
    title: "Guia completo para comprar um imóvel na Zona Leste sem dor de cabeça",
    excerpt: "Entenda custos, financiamento e documentação para realizar a primeira compra com mais segurança.",
    date: "2024-03-15",
    category: "Compra",
    thumbnail: "/src/assets/blog-compra-imovel.webp",
    readTime: "8 min",
    diagnosticHref: "/?diagnostico=1&perfil=primeiro_imovel",
  },
  {
    slug: "melhores-bairros-zona-leste-familias",
    title: "Morar na Zona Leste: bairros para famílias que precisam de mais espaço",
    excerpt: "Compare rotina, serviços, escolas e mobilidade antes de trocar de endereço.",
    date: "2024-03-10",
    category: "Localização",
    thumbnail: "/src/assets/blog-bairros-familias.webp",
    readTime: "6 min",
    diagnosticHref: "/?diagnostico=1&perfil=upgrade_moradia",
  },
  {
    slug: "valorizar-imovel-antes-venda-zona-leste",
    title: "5 dicas para valorizar seu imóvel antes de colocar à venda",
    excerpt: "Veja ações práticas para melhorar percepção de valor e preparar uma captação mais inteligente.",
    date: "2024-03-05",
    category: "Venda",
    thumbnail: "/src/assets/blog-valorizar-imovel.webp",
    readTime: "5 min",
    diagnosticHref: "/?diagnostico=1&perfil=venda_imovel",
  },
];

const categoryColors: Record<string, string> = {
  Compra: "bg-brand-primary text-white",
  Venda: "bg-brand-accent text-white",
  Localização: "bg-brand-secondary text-white",
};

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-4xl font-bold text-foreground">Conhecimento para sua conquista</h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Conteúdos de SEO conectados ao diagnóstico e às landing pages por perfil.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.slug} className="group border-border transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <CardHeader className="pb-3">
                  <div className="mb-2 flex items-center justify-between">
                    <Badge className={categoryColors[post.category] || "bg-muted text-muted-foreground"}>
                      {post.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <CardTitle className="text-xl leading-tight transition-colors group-hover:text-brand-primary">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <CardDescription className="mb-4 line-clamp-3 text-muted-foreground">{post.excerpt}</CardDescription>

                  <div className="mb-4 flex items-center text-sm text-muted-foreground">
                    <Calendar size={14} className="mr-1" />
                    {formatDate(post.date)}
                  </div>

                  <div className="grid gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/blog/${post.slug}`}>Ler artigo</Link>
                    </Button>
                    <Button asChild size="sm" className="bg-brand-accent hover:bg-brand-accent/90">
                      <Link to={post.diagnosticHref}>
                        Receber diagnóstico
                        <ArrowRight size={15} />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 rounded-lg bg-muted/50 p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">Transforme leitura em diagnóstico</h2>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              Escolha o caminho mais próximo do seu momento e receba uma classificação de perfil.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild className="bg-brand-accent hover:bg-brand-accent/90">
                <Link to="/?diagnostico=1&perfil=primeiro_imovel">
                  Receber diagnóstico
                  <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
