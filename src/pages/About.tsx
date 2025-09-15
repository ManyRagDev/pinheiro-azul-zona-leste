import Navigation from "@/components/ui/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Map, Search, Heart, Award, Users, Target } from "lucide-react";
import consultationImage from "@/assets/consultation.jpg";

const About = () => {
  const pillars = [
    {
      letter: "P",
      title: "Planejamento",
      icon: Map,
      description: "Começamos nossa jornada juntos entendendo profundamente seus objetivos, necessidades e sonhos imobiliários. Nosso planejamento estratégico considera não apenas o presente, mas também o futuro, criando um roteiro personalizado que maximiza suas oportunidades e minimiza riscos. Cada detalhe é cuidadosamente pensado para garantir que você tome as melhores decisões."
    },
    {
      letter: "A", 
      title: "Análise",
      icon: Search,
      description: "Nossa equipe realiza uma análise criteriosa e aprofundada do mercado imobiliário da Zona Leste, considerando fatores como valorização, infraestrutura, mobilidade urbana e potencial de crescimento. Utilizamos dados atualizados e nossa vasta experiência regional para identificar as melhores oportunidades e orientá-lo com transparência total."
    },
    {
      letter: "Z",
      title: "Zelo",
      icon: Heart,
      description: "O zelo é nossa marca registrada. Tratamos cada cliente como único, oferecendo atenção personalizada e cuidado humano em cada interação. Acompanhamos você em toda jornada, desde a primeira visita até a entrega das chaves, garantindo que se sinta seguro, informado e valorizado durante todo o processo."
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Eficiência",
      description: "Processos otimizados e resultados ágeis"
    },
    {
      icon: Users,
      title: "Transparência", 
      description: "Comunicação clara e honesta em todas as etapas"
    },
    {
      icon: Target,
      title: "Inovação",
      description: "Soluções criativas para cada desafio imobiliário"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-primary to-brand-accent text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mais do que uma imobiliária,<br />
              <span className="text-accent">seu parceiro na Zona Leste de São Paulo</span>
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Somos uma empresa nascida da paixão pelo mercado imobiliário e pelo desejo genuíno de 
              transformar sonhos em realidade através de um atendimento verdadeiramente humanizado.
            </p>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
                  Nossa História
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground">
                  <p>
                    A Pinheiro Azul Negócios Imobiliários nasceu da visão de que o mercado imobiliário 
                    precisava de uma nova abordagem: mais humana, mais transparente e verdadeiramente 
                    focada no cliente.
                  </p>
                  <p>
                    Especializados na Zona Leste de São Paulo, desenvolvemos um conhecimento profundo 
                    da região, suas características únicas e o potencial de crescimento de cada bairro. 
                    Nossa expertise local nos permite oferecer orientações precisas e identificar 
                    oportunidades exclusivas.
                  </p>
                  <p>
                    Hoje, somos reconhecidos não apenas pela qualidade dos nossos serviços, mas pela 
                    forma como tratamos cada cliente: com respeito, atenção e o compromisso de superar 
                    expectativas em cada transação.
                  </p>
                </div>
              </div>
              <div>
                <img 
                  src={consultationImage}
                  alt="Atendimento consultivo Pinheiro Azul"
                  className="rounded-lg shadow-elegant"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-16 bg-brand-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                Metodologia P.A.Z.© 
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nossa metodologia exclusiva que transforma a experiência imobiliária através 
                de três pilares fundamentais
              </p>
            </div>

            <div className="space-y-12">
              {pillars.map((pillar, index) => {
                const Icon = pillar.icon;
                return (
                  <Card key={pillar.letter} className="border-0 shadow-card">
                    <CardContent className="p-8">
                      <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                        <div className="flex-1 text-center lg:text-left">
                          <div className="flex items-center justify-center lg:justify-start mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center mr-6">
                              <Icon className="text-white" size={32} />
                            </div>
                            <div>
                              <div className="text-4xl font-bold text-brand-primary">
                                {pillar.letter}
                              </div>
                              <h3 className="text-2xl font-semibold text-brand-primary">
                                {pillar.title}
                              </h3>
                            </div>
                          </div>
                          <p className="text-lg text-muted-foreground leading-relaxed">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">
                Nossos Valores
              </h2>
              <p className="text-xl text-muted-foreground">
                Os princípios que guiam todas as nossas ações e decisões
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="text-center border-0 shadow-card hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-accent rounded-full flex items-center justify-center mx-auto mb-6">
                        <Icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-primary mb-4">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-r from-brand-primary to-brand-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nossa Missão
            </h2>
            <p className="text-xl leading-relaxed">
              "Superar as expectativas dos clientes através de um atendimento humanizado 
              e personalizado, sendo referência no mercado imobiliário da Zona Leste de 
              São Paulo por nossa eficiência, transparência e inovação."
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;