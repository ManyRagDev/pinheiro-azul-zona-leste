import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, MapPin, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';

export function ContactLiquid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section ref={containerRef} className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#020205] overflow-hidden">
      {/* Liquid Gradient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] opacity-30"
          style={{
            background: 'conic-gradient(from 0deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15), rgba(6,182,212,0.15), rgba(59,130,246,0.15))',
            animation: 'spin 20s linear infinite',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-medium text-blue-400 uppercase tracking-[0.3em]">
            Vamos Conversar
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4 tracking-tight">
            Pronto para encontrar{' '}
            <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              seu novo lar?
            </span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-xl mx-auto">
            Fale com nossos especialistas e comece sua jornada com a Pinheiro Azul Negócios Imobiliários.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 md:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle size={48} className="text-emerald-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Mensagem Enviada!</h3>
                  <p className="text-zinc-500">Nossa equipe entrará em contato em breve.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2">Nome Completo</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2">E-mail</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">Telefone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all duration-300"
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-500 mb-2">Mensagem</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white placeholder-zinc-600 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 resize-none"
                      placeholder="Conte-nos o que procura..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      Enviar Mensagem
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {[
              {
                icon: MapPin,
                title: 'Endereço',
                lines: ['Rua das Palmeiras, 123 - Vila Formosa', 'São Paulo - SP, CEP 03355-000'],
              },
              {
                icon: Phone,
                title: 'Telefone',
                lines: ['(11) 3456-7890'],
              },
              {
                icon: Mail,
                title: 'E-mail',
                lines: ['contato@pinheiroazul.com.br'],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-6 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-violet-500/30 transition-all">
                    <item.icon size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-sm text-zinc-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <button
              onClick={() => window.open('https://wa.me/5511987654321', '_blank')}
              className="group mt-2 rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] backdrop-blur-sm p-6 hover:bg-emerald-500/[0.06] hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <MessageSquare size={18} className="text-emerald-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-medium">Fale pelo WhatsApp</h4>
                  <p className="text-sm text-zinc-500">Resposta em até 30 minutos</p>
                </div>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
