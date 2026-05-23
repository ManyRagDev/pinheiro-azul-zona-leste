import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BarChart3,
  Camera,
  FileText,
  Home,
  KeyRound,
  MapPin,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FunnelDiagnosticModal } from "@/components/funnel/FunnelDiagnosticModal";
import { guideByProfile, submitLead } from "@/lib/funnel";

/* ─────────── styles ─────────── */
function PageStyles() {
  return (
    <style>{`
      .sl-grid {
        background-image:
          linear-gradient(rgba(6, 25, 44, .08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 25, 44, .08) 1px, transparent 1px);
        background-size: 42px 42px;
      }
      .sl-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.84' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E");
      }
      .sl-scanline {
        background: linear-gradient(180deg, transparent 0%, rgba(40, 199, 186, .28) 50%, transparent 100%);
        animation: slScan 5.6s ease-in-out infinite;
      }
      @keyframes slScan {
        0%, 100% { transform: translateY(-120%); opacity: 0; }
        18%, 72% { opacity: 1; }
        50% { transform: translateY(120%); }
      }
      @media (prefers-reduced-motion: reduce) { .sl-scanline { animation: none; } }
    `}</style>
  );
}

/* ─────────── top nav ─────────── */
function TopNav({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/primeiro-imovel", label: "Primeiro imóvel" },
    { href: "/upgrade-moradia", label: "Upgrade" },
    { href: "/investimento", label: "Investimento" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#06192c]/10 bg-[#f4f0e8]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Pinheiro Azul">
          <span className="grid h-10 w-10 place-items-center bg-[#06192c] text-[#f4f0e8]"><Home size={18} /></span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-[#06192c]">Pinheiro Azul</span>
            <span className="block text-xs text-[#5a6472]">Zona Leste SP</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className={`px-3 py-2 text-sm font-semibold transition hover:bg-[#06192c] hover:text-[#f4f0e8] ${link.href === "/anuncie-seu-imovel" ? "bg-[#06192c] text-[#f4f0e8]" : "text-[#27394d]"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <button type="button" onClick={onOpenDiagnostic} className="hidden items-center gap-2 bg-[#e43d30] px-4 py-3 text-sm font-black uppercase text-white transition hover:bg-[#06192c] md:inline-flex">
          Avaliar meu imóvel
          <ArrowRight size={16} />
        </button>
        <button type="button" className="grid h-10 w-10 place-items-center border border-[#06192c] md:hidden" onClick={() => setOpen((v) => !v)} aria-label={open ? "Fechar menu" : "Abrir menu"}>
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="grid gap-2 border-t border-[#06192c]/10 bg-[#f4f0e8] px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="border border-[#06192c]/15 px-4 py-3 text-sm font-bold">{link.label}</Link>
          ))}
          <button type="button" onClick={() => { setOpen(false); onOpenDiagnostic(); }} className="bg-[#e43d30] px-4 py-3 text-left text-sm font-black uppercase text-white">Avaliar meu imóvel</button>
        </div>
      )}
    </header>
  );
}

/* ─────────── footer ─────────── */
function Footer() {
  const navLinks = [
    { label: "Início", href: "/" },
    { label: "Primeiro imóvel", href: "/primeiro-imovel" },
    { label: "Upgrade", href: "/upgrade-moradia" },
    { label: "Investimento", href: "/investimento" },
    { label: "Blog", href: "/blog" },
    { label: "Privacidade", href: "/privacidade" },
  ];

  return (
    <footer className="border-t border-[#06192c]/10 bg-[#f4f0e8] px-4 py-14 text-[#06192c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="grid h-10 w-10 place-items-center bg-[#06192c] text-[#f4f0e8]"><Home size={18} /></span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.18em]">Pinheiro Azul</h3>
                <p className="text-xs text-[#5a6472]">Negócios Imobiliários</p>
              </div>
            </div>
            <p className="text-sm text-[#415064] leading-relaxed max-w-xs">Especialistas em imóveis na Zona Leste de São Paulo, com atendimento humanizado e metodologia exclusiva P.A.Z.©</p>
            <div className="mt-4 text-xs text-[#5a6472]">CRECI J-12345</div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e43d30] mb-6">Navegação</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="group inline-flex items-center gap-1 text-sm text-[#415064] hover:text-[#06192c] transition-colors duration-300">
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e43d30] mb-6">Atendimento</h4>
            <p className="text-sm text-[#415064] leading-relaxed">Atendimento consultivo para quem busca mais do que um catálogo. Fale com quem entende de rotina, bairro e valorização na Zona Leste.</p>
            <Link to="/contato" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#06192c] hover:text-[#e43d30] transition-colors">Falar com consultor <ArrowRight size={14} /></Link>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#06192c]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#5a6472]">© 2024 Pinheiro Azul Negócios Imobiliários. Todos os direitos reservados.</p>
          <p className="text-xs text-[#5a6472]">Zona Leste de São Paulo — Atendimento Humanizado</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── dados ─────────── */
const steps = [
  {
    num: "01",
    title: "A gente avalia com honestidade",
    copy: "Preço de mercado real, não o que você gostaria de ouvir. Saber a verdade é o primeiro passo para vender com tranquilidade.",
    accent: "#28c7ba",
  },
  {
    num: "02",
    title: "A gente posiciona com estratégia",
    copy: "Fotos, descrição, canais e público certo. Seu imóvel aparece para quem realmente está procurando — não para todo mundo.",
    accent: "#f3d35b",
  },
  {
    num: "03",
    title: "Você acompanha até a chave passar",
    copy: "Proposta, negociação, documentação e fechamento. A gente cuida da burocracia para que você cuide do que vem depois.",
    accent: "#e43d30",
  },
];

const benefits = [
  { icon: Camera, label: "Fotos e produção real", desc: "Seu imóvel apresentado como ele é — com qualidade, sem enganação" },
  { icon: FileText, label: "Relatório de posicionamento", desc: "Preço competitivo, comparativo de mercado e estratégia de divulgação" },
  { icon: ShieldCheck, label: "Segurança jurídica", desc: "Do cadastro à escritura, cada etapa com respaldo e transparência" },
];

/* ─────────── sections ─────────── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#06192c]">
      <div className="absolute inset-0 sl-grid opacity-60" />
      <div className="absolute inset-0 sl-noise opacity-[0.04] mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 h-24 sl-scanline pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_.9fr] lg:items-start">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex border border-[#06192c] bg-[#f4f0e8] px-3 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#06192c]">
              Venda com inteligência
            </div>
            <h1 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-[0.95] text-[#06192c]">
              Antes de você anunciar, a gente já tem uma fila de compradores com perfil.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#415064] max-w-lg">
              A cada semana, novos compradores fazem o diagnóstico na Pinheiro Azul — classificados por momento, orçamento e região de interesse. Quando você anuncia seu imóvel com a gente, ele entra numa busca que já está acontecendo. <strong>Não começa do zero.</strong>
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {benefits.map((item) => (
                <div key={item.label} className="border border-[#06192c] bg-white p-4 shadow-[4px_4px_0_#28c7ba]">
                  <item.icon className="text-[#e43d30]" size={22} />
                  <p className="mt-4 text-sm font-black uppercase leading-tight">{item.label}</p>
                  <p className="mt-2 text-xs text-[#5a6472]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#06192c] bg-white p-6 shadow-[12px_12px_0_#e43d30]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e43d30]">Formulário de avaliação</p>
            <h2 className="mt-3 text-2xl font-black uppercase leading-none text-[#06192c]">Quanto vale seu imóvel?</h2>
            <p className="mt-3 text-sm text-[#415064]">Preencha os dados abaixo. A gente responde em até 48h com preço de mercado, estratégia e próximos passos.</p>
            <div className="mt-6 flex items-center gap-3 text-sm text-[#5a6472]">
              <MapPin size={16} />
              <span>Atuamos na Zona Leste de São Paulo</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#5a6472]">
              <BarChart3 size={16} />
              <span>Avaliação baseada em dados reais do mercado</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#5a6472]">
              <KeyRound size={16} />
              <span>Sem exclusividade obrigatória</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-[#06192c] px-4 py-24 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#28c7ba]">Como funciona</p>
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight md:text-5xl">Três conversas. Uma venda mais tranquila.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-white/10 -translate-x-4" />
              )}
              <div className="inline-flex h-16 w-16 items-center justify-center border-2 text-lg font-black" style={{ borderColor: step.accent, color: step.accent }}>{step.num}</div>
              <h3 className="mt-6 text-xl font-black uppercase leading-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FormSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", whatsapp: "", endereco: "", tipo: "", objetivo: "" });

  const submitSellerLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        nome: form.nome, email: form.email, whatsapp: form.whatsapp,
        perfil: "venda_imovel", origem_pagina: "/anuncie-seu-imovel",
        guia_solicitado: guideByProfile.venda_imovel,
        respostas: {
          objetivo: form.objetivo || "Vender meu imóvel com estratégia",
          faixa_preco: "", regiao_interesse: form.endereco,
          prazo: "Solicitou avaliação", tipo_imovel: form.tipo,
          endereco_imovel: form.endereco,
        },
      });
      toast({ title: "Solicitação registrada", description: "A avaliação do imóvel ficou salva para abordagem e envio do guia de venda." });
      setForm({ nome: "", email: "", whatsapp: "", endereco: "", tipo: "", objetivo: "" });
    } catch (error) {
      console.error("Seller lead error", error);
      toast({ title: "Não foi possível salvar agora", description: "Tente novamente em instantes ou chame a equipe pelo WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#e43d30]">Solicite avaliação</p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-black uppercase leading-[0.95] text-[#06192c]">
              Conte sobre seu imóvel. A gente responde com estratégia.
            </h2>
            <p className="mt-6 text-[#415064] leading-relaxed">
              Não precisa saber o valor exato agora. Não precisa ter toda a documentação em dia. <strong>O que a gente precisa é entender o que você quer.</strong> Rápido? O melhor preço? Trocar por outro? Cada resposta muda a estratégia.
            </p>
          </div>
          <form onSubmit={submitSellerLead} className="border border-[#06192c] bg-[#06192c] p-6 text-white shadow-[12px_12px_0_#28c7ba]">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="seller-name">Nome</Label>
                <Input id="seller-name" value={form.nome} onChange={(e) => setForm((c) => ({ ...c, nome: e.target.value }))} required className="mt-1 bg-white text-[#06192c]" />
              </div>
              <div>
                <Label htmlFor="seller-whatsapp">WhatsApp</Label>
                <Input id="seller-whatsapp" value={form.whatsapp} onChange={(e) => setForm((c) => ({ ...c, whatsapp: e.target.value }))} required className="mt-1 bg-white text-[#06192c]" />
              </div>
              <div>
                <Label htmlFor="seller-email">Email</Label>
                <Input id="seller-email" type="email" value={form.email} onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))} required className="mt-1 bg-white text-[#06192c]" />
              </div>
              <div>
                <Label htmlFor="seller-type">Tipo de imóvel</Label>
                <Input id="seller-type" value={form.tipo} onChange={(e) => setForm((c) => ({ ...c, tipo: e.target.value }))} placeholder="Apartamento, casa, sobrado" required className="mt-1 bg-white text-[#06192c]" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="seller-address">Endereço ou bairro do imóvel</Label>
              <Input id="seller-address" value={form.endereco} onChange={(e) => setForm((c) => ({ ...c, endereco: e.target.value }))} required className="mt-1 bg-white text-[#06192c]" />
            </div>
            <div className="mt-4">
              <Label htmlFor="seller-goal">Qual seu objetivo?</Label>
              <Textarea id="seller-goal" value={form.objetivo} onChange={(e) => setForm((c) => ({ ...c, objetivo: e.target.value }))} placeholder="Vender rápido, avaliar preço, trocar por outro imóvel..." className="mt-1 min-h-28 bg-white text-[#06192c]" />
            </div>
            <Button type="submit" disabled={isSubmitting} className="mt-6 w-full bg-[#e43d30] py-6 text-white hover:bg-[#c93127]">
              {isSubmitting ? "Salvando..." : "Avaliar meu imóvel"}
              <ArrowRight size={18} />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="border-t border-[#06192c]/10 bg-[#e7e0d4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <BadgeCheck className="mx-auto text-[#e43d30]" size={34} />
        <h2 className="mx-auto mt-6 text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase leading-tight text-[#06192c]">
          A gente não promete vender rápido. A gente promete vender bem.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#415064] leading-relaxed">
          Cada proprietário que chega aqui recebe uma avaliação honesta, uma estratégia clara e um acompanhamento até a chave passar de mão.
        </p>
        <a href="#formulario" className="mt-8 inline-flex items-center gap-3 bg-[#e43d30] px-8 py-4 text-sm font-black uppercase text-white shadow-[6px_6px_0_#06192c] transition hover:bg-[#06192c] hover:shadow-[6px_6px_0_#e43d30]">
          Solicitar avaliação
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

/* ─────────── page ─────────── */
export default function SellerLandingV2() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#06192c] selection:bg-[#e43d30] selection:text-white">
      <PageStyles />
      <TopNav onOpenDiagnostic={() => setDiagnosticOpen(true)} />
      <main>
        <HeroSection />
        <ProcessSection />
        <div id="formulario"><FormSection /></div>
        <CTASection />
      </main>
      <Footer />
      <FunnelDiagnosticModal open={diagnosticOpen} onOpenChange={setDiagnosticOpen} initialProfile="venda_imovel" sourcePage="/anuncie-seu-imovel" />
    </div>
  );
}
