import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MessageSquare, Phone, MapPin } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

const ContactSection = () => {
  const form = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  return (
    <section className="py-16 px-4 bg-brand-light">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-text mb-4">
            Pronto para Encontrar seu Novo Lar?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fale com nossos especialistas na Zona Leste e comece sua jornada com a Pinheiro Azul Negócios Imobiliários.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-background p-8 rounded-lg shadow-card">
            <h3 className="text-xl font-semibold text-brand-text mb-6">
              Entre em Contato
            </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Nome é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    required: "E-mail é obrigatório",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "E-mail inválido"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: "Telefone é obrigatório" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent/90">
                  Enviar Mensagem
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-background p-8 rounded-lg shadow-card">
              <h3 className="text-xl font-semibold text-brand-text mb-6">
                Informações de Contato
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-brand-accent mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-brand-text">Endereço</h4>
                    <p className="text-muted-foreground">
                      Rua das Palmeiras, 123 - Vila Formosa<br />
                      São Paulo - SP, CEP 03355-000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-brand-accent mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-brand-text">Telefone</h4>
                    <p className="text-muted-foreground">(11) 3456-7890</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6"
              onClick={() => window.open('https://wa.me/5511987654321', '_blank')}
            >
              <MessageSquare className="mr-2" size={20} />
              Fale pelo WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;