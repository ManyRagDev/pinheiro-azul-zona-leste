import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, Phone, MessageSquare, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export function ContactAurora() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    defaultValues: { name: '', email: '', phone: '' },
  });

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050510] overflow-hidden"
    >
      {/* Background Aurora */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/[0.08] rounded-full blur-[140px] animate-pulse" />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-violet-600/[0.08] rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-600/[0.03] rounded-full blur-[160px]" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
              Fale Conosco
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight leading-tight">
              Pronto para encontrar{' '}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                seu novo lar?
              </span>
            </h2>
            <p className="text-lg text-zinc-400 mb-10 max-w-xl leading-relaxed">
              Nossos especialistas na Zona Leste estão prontos para te ajudar. Envie uma mensagem e
              receba atendimento personalizado.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-10">
              {[
                {
                  icon: MapPin,
                  label: 'Endereço',
                  value: 'Rua das Palmeiras, 123 - Vila Formosa, São Paulo - SP',
                },
                { icon: Phone, label: 'Telefone', value: '(11) 3456-7890' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                    <item.icon className="text-blue-400" size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </h4>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              onClick={() => window.open('https://wa.me/5511987654321', '_blank')}
              className="group relative inline-flex items-center gap-3 px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] overflow-hidden"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-10" />
              <MessageSquare size={18} className="group-hover:scale-110 transition-transform" />
              Fale pelo WhatsApp
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-cyan-500/20 rounded-3xl blur-xl" />

              <div className="relative p-7 rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-2xl">
                <h3 className="text-xl font-bold text-white mb-1">Envie uma mensagem</h3>
                <p className="text-sm text-zinc-500 mb-6">
                  Retornaremos em até 24 horas.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: 'Nome é obrigatório' }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider">
                            Nome Completo
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Seu nome"
                              className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-blue-500/10 text-sm"
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
                        pattern: { value: /^\S+@\S+$/i, message: 'E-mail inválido' },
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider">
                            E-mail
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="seu@email.com"
                              className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-blue-500/10 text-sm"
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
                          <FormLabel className="text-zinc-400 text-xs uppercase tracking-wider">
                            Telefone
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="(11) 99999-9999"
                              className="bg-white/[0.03] border-white/[0.08] text-white rounded-xl h-11 placeholder:text-zinc-600 focus:border-blue-500/50 focus:ring-blue-500/10 text-sm"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitted}
                      className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl py-5 text-sm font-semibold shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 transition-all duration-300 mt-2 disabled:opacity-50"
                    >
                      {submitted ? (
                        <>
                          <CheckCircle2 className="mr-2" size={18} />
                          Mensagem Enviada!
                        </>
                      ) : (
                        <>
                          <Send className="mr-2" size={16} />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Trust */}
                <div className="mt-5 pt-5 border-t border-white/[0.06] flex items-center justify-center gap-2 text-xs text-zinc-600">
                  <svg
                    className="w-3.5 h-3.5 text-emerald-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Seus dados estão 100% seguros conosco
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
