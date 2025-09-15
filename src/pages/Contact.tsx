import Navigation from "@/components/ui/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, MessageSquare, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-brand-primary to-brand-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fale Conosco
            </h1>
            <p className="text-xl opacity-90">
              Estamos prontos para ajudá-lo a encontrar o imóvel dos seus sonhos na Zona Leste de São Paulo
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-brand-primary">
                    Envie sua Mensagem
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Preencha o formulário abaixo e entraremos em contato em até 2 horas úteis
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-brand-text font-medium">
                        Nome *
                      </Label>
                      <Input 
                        id="firstName" 
                        placeholder="Seu nome"
                        className="focus:ring-brand-accent focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-brand-text font-medium">
                        Sobrenome *
                      </Label>
                      <Input 
                        id="lastName" 
                        placeholder="Seu sobrenome"
                        className="focus:ring-brand-accent focus:border-brand-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-brand-text font-medium">
                      E-mail *
                    </Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="seu@email.com"
                      className="focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-brand-text font-medium">
                      Telefone/WhatsApp *
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="(11) 99999-9999"
                      className="focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-brand-text font-medium">
                      Assunto
                    </Label>
                    <Input 
                      id="subject" 
                      placeholder="Como podemos ajudar?"
                      className="focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-brand-text font-medium">
                      Mensagem *
                    </Label>
                    <Textarea 
                      id="message" 
                      placeholder="Conte-nos sobre suas necessidades imobiliárias..."
                      rows={5}
                      className="focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-brand-accent hover:bg-brand-accent/90 text-lg py-6"
                  >
                    <Mail className="mr-2" size={20} />
                    Enviar Mensagem
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Ao enviar este formulário, você concorda com nossa{" "}
                    <a href="/privacidade" className="text-brand-accent hover:underline">
                      Política de Privacidade
                    </a>
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-8">
                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-primary">
                      Informações de Contato
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                        <Phone className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-primary">Telefone</h4>
                        <p className="text-muted-foreground">(11) 3333-4444</p>
                        <p className="text-muted-foreground">(11) 99999-8888</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                        <MessageSquare className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-primary">WhatsApp</h4>
                        <p className="text-muted-foreground">(11) 99999-8888</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white"
                        >
                          Chamar no WhatsApp
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                        <Mail className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-primary">E-mail</h4>
                        <p className="text-muted-foreground">contato@pinheiroazul.com.br</p>
                        <p className="text-muted-foreground">vendas@pinheiroazul.com.br</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
                        <MapPin className="text-brand-accent" size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-brand-primary">Endereço</h4>
                        <p className="text-muted-foreground">
                          Rua das Palmeiras, 123<br />
                          Tatuapé - São Paulo/SP<br />
                          CEP: 03081-000
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card">
                  <CardHeader>
                    <CardTitle className="text-xl text-brand-primary flex items-center">
                      <Clock className="mr-2" size={20} />
                      Horário de Atendimento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Segunda à Sexta:</span>
                        <span className="font-medium">8h às 18h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábados:</span>
                        <span className="font-medium">9h às 15h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingos:</span>
                        <span className="font-medium">Plantão (WhatsApp)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-gradient-to-br from-brand-primary to-brand-accent text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      Atendimento Personalizado
                    </h3>
                    <p className="opacity-90">
                      Nossa metodologia P.A.Z.© garante que você receba a atenção 
                      que merece em cada etapa do processo
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;