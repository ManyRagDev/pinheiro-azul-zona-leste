import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { renderBlogContent } from "@/utils/blogRenderer";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  thumbnail: string;
  readTime: string;
  content: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Simulando carregamento do post - em produção seria uma API ou importação MDX
    const mockPosts: { [key: string]: BlogPostData } = {
      "guia-completo-comprar-imovel-zona-leste": {
        slug: "guia-completo-comprar-imovel-zona-leste",
        title: "Guia Completo para Comprar um Imóvel na Zona Leste Sem Dor de Cabeça: Entenda os Custos e a Burocracia",
        excerpt: "Entenda todos os custos envolvidos e a burocracia necessária para realizar o sonho da casa própria na Zona Leste de São Paulo de forma segura e tranquila.",
        date: "2024-03-15",
        category: "Compra",
        thumbnail: "/src/assets/blog-compra-imovel.webp",
        readTime: "8 min",
        content: `
<div class="prose prose-lg max-w-none">
  <p class="lead text-xl text-muted-foreground mb-8">
    Comprar um imóvel na Zona Leste de São Paulo pode ser uma experiência transformadora quando você conhece todos os passos e custos envolvidos. Este guia completo foi criado para eliminar suas dúvidas e tornar o processo mais simples e seguro.
  </p>

  <h2>1. Planejamento Financeiro: O Primeiro Passo</h2>
  <p>Antes de começar a busca pelo imóvel ideal, é fundamental ter clareza sobre sua situação financeira. Na Zona Leste, você encontra opções desde R$ 250.000 até R$ 1.500.000, dependendo do bairro e tipo de imóvel.</p>

  <div data-component="Info" data-title="💰 Custos Principais">
    <ul>
      <li><strong>Entrada:</strong> Normalmente entre 20% a 30% do valor do imóvel</li>
      <li><strong>Financiamento:</strong> 70% a 80% via banco (com FGTS pode chegar a 90%)</li>
      <li><strong>ITBI:</strong> 2% a 3% do valor venal do imóvel</li>
      <li><strong>Cartório:</strong> Cerca de R$ 3.000 a R$ 8.000</li>
      <li><strong>Avaliação bancária:</strong> R$ 500 a R$ 1.500</li>
    </ul>
  </div>

  <h2>2. Documentação Necessária</h2>
  <p>A burocracia pode parecer complexa, mas com organização fica mais simples:</p>

  <div data-component="Checklist" data-title="📋 Documentos Pessoais" data-items='["CPF e RG atualizados", "Certidão de nascimento ou casamento", "Comprovante de renda (últimos 3 meses)", "Declaração de Imposto de Renda", "Extrato do FGTS"]'></div>

  <div data-component="Checklist" data-title="🏠 Documentos do Imóvel" data-items='["Matrícula atualizada", "IPTU quitado", "Certidões negativas", "Habite-se (para imóveis novos)"]'></div>

  <h2>3. Melhores Bairros da Zona Leste para Investir</h2>
  <p>Nossa experiência na região nos permite recomendar:</p>

  <div data-component="Tip" data-title="🏘️ Nossas Recomendações">
    <ul>
      <li><strong>Tatuapé:</strong> Excelente infraestrutura e valorização</li>
      <li><strong>Vila Formosa:</strong> Crescimento acelerado e bom custo-benefício</li>
      <li><strong>Anália Franco:</strong> Área nobre com completa infraestrutura</li>
      <li><strong>Vila Carrão:</strong> Tradicional e bem localizada</li>
      <li><strong>Penha:</strong> Ótima opção para primeira compra</li>
    </ul>
  </div>

  <h2>4. Dicas da Pinheiro Azul para uma Compra Segura</h2>
  
  <div data-component="Callout" data-variant="primary" data-title="Nossa Metodologia P.A.Z.© em Ação">
    <ul>
      <li><strong>Planejamento:</strong> Definimos seu orçamento real e objetivos</li>
      <li><strong>Análise:</strong> Verificamos toda documentação e precificação</li>
      <li><strong>Zelo:</strong> Acompanhamos cada etapa até a entrega das chaves</li>
    </ul>
  </div>

  <h2>5. Cronograma Típico de Compra</h2>
  <div data-component="Info" data-title="⏰ Timeline de Compra">
    <ul>
      <li><strong>Semana 1-2:</strong> Busca e visitas aos imóveis</li>
      <li><strong>Semana 3:</strong> Proposta e negociação</li>
      <li><strong>Semana 4-6:</strong> Análise de crédito e documentação</li>
      <li><strong>Semana 7-8:</strong> Assinatura e transferência</li>
    </ul>
  </div>

  <h2>Conclusão</h2>
  <p>Comprar um imóvel na Zona Leste não precisa ser complicado. Com planejamento adequado, documentação organizada e o acompanhamento de profissionais experientes como a equipe Pinheiro Azul, você pode realizar este sonho de forma segura e tranquila.</p>

  <div data-component="Callout" data-variant="primary" data-title="Pronto para dar o próximo passo?">
    <p class="text-center text-lg">
      Nossa equipe especializada está aqui para transformar seu sonho em realidade.
    </p>
  </div>

  <div data-component="ContactInfo"></div>
</div>
        `
      },
      "melhores-bairros-zona-leste-familias": {
        slug: "melhores-bairros-zona-leste-familias",
        title: "Morar na Zona Leste: Descubra os 5 Melhores Bairros para Famílias (e para quem tem pet!)",
        excerpt: "Conheça os bairros da Zona Leste que oferecem a melhor qualidade de vida para famílias, incluindo opções pet-friendly e infraestrutura completa.",
        date: "2024-03-10",
        category: "Localização",
        thumbnail: "/src/assets/blog-bairros-familias.webp",
        readTime: "6 min",
        content: `
<div class="prose prose-lg max-w-none">
  <p class="lead text-xl text-muted-foreground mb-8">
    A Zona Leste de São Paulo oferece excelentes opções para famílias que buscam qualidade de vida, segurança e infraestrutura completa. Descubra os 5 melhores bairros que nossa equipe recomenda para quem tem filhos e pets.
  </p>

  <h2>1. Tatuapé - O Coração Moderno da Zona Leste</h2>
  
  <div data-component="Info" data-title="🏢 Por que escolher o Tatuapé">
    <ul>
      <li><strong>Transporte:</strong> Estação de metrô e múltiplas linhas de ônibus</li>
      <li><strong>Educação:</strong> Escolas de excelente qualidade e universidades próximas</li>
      <li><strong>Lazer:</strong> Shopping Tatuapé, parques e centros culturais</li>
      <li><strong>Pet-friendly:</strong> Vários parques e pet shops na região</li>
    </ul>
    <p class="mt-4 text-sm text-muted-foreground">
      <strong>Valor médio:</strong> R$ 450.000 - R$ 800.000 (apartamentos) | R$ 600.000 - R$ 1.200.000 (casas)
    </p>
  </div>

  <h2>2. Anália Franco - Sofisticação e Comodidade</h2>
  
  <div data-component="Info" data-title="🌟 Por que escolher Anália Franco">
    <ul>
      <li><strong>Infraestrutura:</strong> Shopping Anália Franco e completa rede de serviços</li>
      <li><strong>Segurança:</strong> Uma das regiões mais seguras da Zona Leste</li>
      <li><strong>Espaços verdes:</strong> Parque Anália Franco ideal para crianças e pets</li>
      <li><strong>Mobilidade:</strong> Fácil acesso ao centro e outras regiões</li>
    </ul>
    <p class="mt-4 text-sm text-muted-foreground">
      <strong>Valor médio:</strong> R$ 500.000 - R$ 900.000 (apartamentos) | R$ 700.000 - R$ 1.500.000 (casas)
    </p>
  </div>

  <h2>3. Vila Formosa - Crescimento e Oportunidade</h2>
  
  <div data-component="Tip" data-title="💡 Por que escolher Vila Formosa">
    <ul>
      <li><strong>Valorização:</strong> Bairro em franco crescimento imobiliário</li>
      <li><strong>Custo-benefício:</strong> Preços ainda acessíveis com boa qualidade</li>
      <li><strong>Conectividade:</strong> Próximo ao metrô Carrão e futuras expansões</li>
      <li><strong>Comunidade:</strong> Ambiente familiar e acolhedor</li>
    </ul>
    <p class="mt-4 text-sm text-muted-foreground">
      <strong>Valor médio:</strong> R$ 280.000 - R$ 500.000 (apartamentos) | R$ 400.000 - R$ 750.000 (casas)
    </p>
  </div>

  <h2>4. Vila Carrão - Tradição e Modernidade</h2>
  
  <div data-component="Info" data-title="🏛️ Por que escolher Vila Carrão">
    <ul>
      <li><strong>História:</strong> Bairro tradicional com identidade própria</li>
      <li><strong>Transporte:</strong> Estação Carrão do metrô</li>
      <li><strong>Serviços:</strong> Comércio local forte e diversificado</li>
      <li><strong>Áreas verdes:</strong> Praças e espaços para atividades ao ar livre</li>
    </ul>
    <p class="mt-4 text-sm text-muted-foreground">
      <strong>Valor médio:</strong> R$ 350.000 - R$ 600.000 (apartamentos) | R$ 500.000 - R$ 900.000 (casas)
    </p>
  </div>

  <h2>5. Penha - Acessibilidade e Crescimento</h2>
  
  <div data-component="Tip" data-title="🚀 Por que escolher Penha">
    <ul>
      <li><strong>Primeira compra:</strong> Excelente opção para quem está começando</li>
      <li><strong>Desenvolvimento:</strong> Região em constante melhoria urbana</li>
      <li><strong>Acessibilidade:</strong> Múltiplas opções de transporte</li>
      <li><strong>Vida noturna:</strong> Bares e restaurantes familiares</li>
    </ul>
    <p class="mt-4 text-sm text-muted-foreground">
      <strong>Valor médio:</strong> R$ 250.000 - R$ 450.000 (apartamentos) | R$ 350.000 - R$ 650.000 (casas)
    </p>
  </div>

  <h2>Dicas Especiais para Famílias com Pets</h2>
  
  <div data-component="Checklist" data-title="🐕 Checklist Pet-Friendly" data-items='["Parques próximos para passeios diários", "Veterinários e pet shops na região", "Condomínios que aceitem animais", "Transporte público pet-friendly", "Áreas de lazer específicas para pets"]'></div>

  <h2>Como a Pinheiro Azul Pode Ajudar</h2>
  <p>Nossa equipe conhece profundamente cada bairro da Zona Leste. Oferecemos:</p>
  
  <div data-component="Callout" data-variant="primary" data-title="Nossos Serviços Especializados">
    <ul>
      <li>Análise personalizada das suas necessidades familiares</li>
      <li>Visitas guiadas pelos melhores imóveis</li>
      <li>Informações detalhadas sobre escolas e serviços locais</li>
      <li>Negociação especializada para melhor preço</li>
      <li>Acompanhamento completo até a mudança</li>
    </ul>
  </div>

  <div data-component="Callout" data-variant="primary" data-title="Encontre o lar perfeito para sua família!">
    <p class="text-center text-lg">
      Converse com nossos especialistas e descubra o bairro ideal para vocês.
    </p>
  </div>

  <div data-component="ContactInfo"></div>
</div>
        `
      },
      "valorizar-imovel-antes-venda-zona-leste": {
        slug: "valorizar-imovel-antes-venda-zona-leste",
        title: "5 Dicas Simples para Valorizar o Seu Imóvel Antes de Colocá-lo à Venda na Zona Leste",
        excerpt: "Aprenda estratégias práticas e econômicas para aumentar o valor do seu imóvel na Zona Leste e acelerar a venda com melhor retorno financeiro.",
        date: "2024-03-05",
        category: "Venda",
        thumbnail: "/src/assets/blog-valorizar-imovel.webp",
        readTime: "5 min",
        content: `
<div class="prose prose-lg max-w-none">
  <p class="lead text-xl text-muted-foreground mb-8">
    Pequenas melhorias podem gerar grandes resultados na venda do seu imóvel. Descubra 5 estratégias testadas pela Pinheiro Azul que podem aumentar o valor da sua propriedade na Zona Leste em até 15%.
  </p>

  <h2>1. Primeira Impressão: Fachada e Entrada</h2>
  
  <div data-component="Info" data-title="💡 Investimento: R$ 500 - R$ 2.000">
    <h4 class="font-semibold mb-2">O que fazer:</h4>
    <ul>
      <li>Pintura externa ou limpeza profunda da fachada</li>
      <li>Jardinagem e paisagismo básico</li>
      <li>Iluminação externa adequada</li>
      <li>Portão e campainha em bom estado</li>
    </ul>
    <p class="mt-4 text-sm font-medium text-green-600">
      <strong>Retorno esperado:</strong> 3-5% de valorização
    </p>
  </div>

  <h2>2. Cozinha: O Coração do Lar</h2>
  
  <div data-component="Tip" data-title="💰 Investimento: R$ 1.000 - R$ 5.000">
    <h4 class="font-semibold mb-2">Melhorias que fazem diferença:</h4>
    <ul>
      <li>Pintura das paredes em tons neutros e modernos</li>
      <li>Troca de puxadores e dobradiças dos armários</li>
      <li>Bancada limpa e organizada</li>
      <li>Eletrodomésticos funcionando perfeitamente</li>
      <li>Iluminação LED sob os armários</li>
    </ul>
    <p class="mt-4 text-sm font-medium text-green-600">
      <strong>Retorno esperado:</strong> 4-7% de valorização
    </p>
  </div>

  <h2>3. Banheiros: Modernização Inteligente</h2>
  
  <div data-component="Info" data-title="🔧 Investimento: R$ 800 - R$ 3.000">
    <h4 class="font-semibold mb-2">Atualizações estratégicas:</h4>
    <ul>
      <li>Troca de metais (torneiras, registros, chuveiros)</li>
      <li>Rejunte novo ou renovado</li>
      <li>Espelhos sem manchas ou novos</li>
      <li>Iluminação adequada</li>
      <li>Organização e limpeza profunda</li>
    </ul>
    <p class="mt-4 text-sm font-medium text-green-600">
      <strong>Retorno esperado:</strong> 3-5% de valorização
    </p>
  </div>

  <h2>4. Pintura Geral: Renovação Completa</h2>
  
  <div data-component="Tip" data-title="🎨 Investimento: R$ 1.500 - R$ 4.000">
    <h4 class="font-semibold mb-2">Estratégia de cores:</h4>
    <ul>
      <li>Tons neutros que ampliam os ambientes</li>
      <li>Branco, off-white, ou cinza claro nas paredes</li>
      <li>Uma parede de destaque em tom mais forte (opcional)</li>
      <li>Teto sempre em branco para maior altura visual</li>
      <li>Rodapés e esquadrias em bom estado</li>
    </ul>
    <p class="mt-4 text-sm font-medium text-green-600">
      <strong>Retorno esperado:</strong> 2-4% de valorização
    </p>
  </div>

  <h2>5. Organização e Despersonalização</h2>
  
  <div data-component="Callout" data-variant="success" data-title="✨ Investimento: R$ 0 - R$ 500">
    <h4 class="font-semibold mb-2">Preparação para visitas:</h4>
    <ul>
      <li>Remover objetos pessoais e fotos familiares</li>
      <li>Organizar e reduzir móveis (ambiente mais amplo)</li>
      <li>Limpeza profunda de todos os cômodos</li>
      <li>Aromatização sutil do ambiente</li>
      <li>Iluminação natural maximizada</li>
    </ul>
    <p class="mt-4 text-sm font-medium text-green-600">
      <strong>Retorno esperado:</strong> 1-3% de valorização + venda mais rápida
    </p>
  </div>

  <h2>Cronograma de Execução</h2>
  
  <div data-component="Info" data-title="📅 Planejamento de 4 Semanas">
    <ul>
      <li><strong>Semana 1:</strong> Pintura geral e reparos básicos</li>
      <li><strong>Semana 2:</strong> Melhorias na cozinha e banheiros</li>
      <li><strong>Semana 3:</strong> Fachada e áreas externas</li>
      <li><strong>Semana 4:</strong> Organização final e limpeza</li>
    </ul>
  </div>

  <h2>Erros Comuns que Você Deve Evitar</h2>
  
  <div data-component="Warning" data-title="⚠️ Atenção">
    <ul>
      <li>Não faça reformas muito personalizadas</li>
      <li>Evite cores muito fortes ou tendências passageiras</li>
      <li>Não invista em melhorias muito caras se o bairro não suportar</li>
      <li>Não deixe reparos básicos sem solução</li>
      <li>Evite fazer tudo ao mesmo tempo - planeje as etapas</li>
    </ul>
  </div>

  <h2>Como a Pinheiro Azul Pode Ajudar</h2>
  <p>Nossa experiência na Zona Leste nos permite oferecer:</p>
  
  <div data-component="Callout" data-variant="primary" data-title="Nossos Serviços Especializados">
    <ul>
      <li><strong>Avaliação gratuita:</strong> Analisamos seu imóvel e sugerimos melhorias</li>
      <li><strong>Rede de parceiros:</strong> Indicamos profissionais confiáveis para as reformas</li>
      <li><strong>Estratégia de preço:</strong> Definimos o valor ideal pós-melhorias</li>
      <li><strong>Marketing direcionado:</strong> Destacamos as melhorias nos anúncios</li>
      <li><strong>Acompanhamento completo:</strong> Desde a melhoria até a venda</li>
    </ul>
  </div>

  <div data-component="Callout" data-variant="primary" data-title="Pronto para valorizar seu imóvel?">
    <p class="text-center text-lg">
      Nossa equipe especializada está pronta para orientar cada passo da sua estratégia de venda.
    </p>
  </div>

  <div data-component="ContactInfo"></div>
</div>
        `
      }
    };

    const foundPost = mockPosts[slug];
    if (foundPost) {
      setPost(foundPost);
    }
    setLoading(false);
  }, [slug]);

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

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado para a área de transferência!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando artigo...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Button asChild variant="ghost" className="mb-8">
            <Link to="/blog" className="flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Voltar ao Blog
            </Link>
          </Button>

          {/* Article Header */}
          <header className="mb-8">
            <div className="aspect-video overflow-hidden rounded-lg mb-6">
              <img 
                src={post.thumbnail} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category}
                </Badge>
                
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span className="text-sm">{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{post.readTime}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleShare}
                    className="p-2"
                  >
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Article Content */}
          <article className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground prose-strong:text-foreground">
            {renderBlogContent(post.content)}
          </article>

          <Separator className="my-12" />

          {/* CTA Section */}
          <div className="bg-muted/50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Gostou do que leu?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe está pronta para transformar essas dicas em realidade para você. 
              Entre em contato e receba uma consultoria personalizada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-brand-accent hover:bg-brand-accent/90">
                <Link to="/contato">
                  Fale Conosco
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/blog">
                  Ver Mais Artigos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;