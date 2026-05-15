import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, Calendar, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export function CTASectionV3() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const form = useForm<ContactFormData>({
    defaultValues: { name: '', email: '', phone: '' }
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <section ref={containerRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950 relative overflow-hidden">
      {/* Animated Mesh Gradient Background */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0"
        >
          {/* Morphing Blobs */}
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[120px]" />
        </motion.div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block text-sm font-medium text-blue-400 uppercase tracking-wider mb-4"
            >
              Comece sua jornada
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Pronto para encontrar{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                seu novo lar?
              </span>
            </h2>
            
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Fale com nossos especialistas na Zona Leste e comece sua jornada com a Pinheiro Azul Negócios Imobiliários.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Endereço', value: 'Rua das Palmeiras, 123 - Vila Formosa, São Paulo - SP' },
                { icon: Phone, label: 'Telefone', value: '(11) 3456-7890' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm text-zinc-500 mb-1">{item.label}</h4>
                    <p className="text-white">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Button
                size="lg"
                onClick={() => window.open('https://wa.me/5511987654321', '_blank')}
                className="relative bg-green-600 hover:bg-green-500 text-white rounded-full px-8 py-7 text-lg font-semibold group overflow-hidden"
              >
                {/* Pulse Effect */}
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20" />
                <MessageSquare className="mr-2 group-hover:scale-110 transition-transform" size={22} />
                Fale pelo WhatsApp
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-violet-600/20 to-blue-600/20 rounded-3xl blur-xl" />
              
              <div className="relative p-8 rounded-3xl bg-zinc-900/90 backdrop-blur-xl border border-zinc-800">
                <h3 className="text-2xl font-bold text-white mb-2">Envie uma mensagem</h3>
                <p className="text-zinc-400 mb-6">Preencha o formulário e entraremos em contato em breve.</p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: 'Nome é obrigatório' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Nome Completo</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Seu nome completo"
                              className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ 
                        required: 'E-mail é obrigatório', 
                        pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' } 
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">E-mail</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="seu@email.com"
                              className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      rules={{ required: 'Telefone é obrigatório' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-300">Telefone</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="(11) 99999-9999"
                              className="bg-zinc-950 border-zinc-800 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl py-6 text-lg font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 mt-2"
                    >
                      <Calendar className="mr-2" size={20} />
                      Agendar Contato
                    </Button>
                  </form>
                </Form>

                {/* Trust Badge */}
                <div className="mt-6 pt-6 border-t border-zinc-800 flex items-center justify-center gap-2 text-sm text-zinc-500">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Seus dados estão seguros conosco
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
