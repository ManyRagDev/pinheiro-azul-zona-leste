import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Building2,
  Home,
  Menu,
  ShieldCheck,
  TrendingUp,
  X,
  ArrowUpRight,
  Compass,
  Heart,
} from "lucide-react";
import { FunnelDiagnosticModal } from "@/components/funnel/FunnelDiagnosticModal";
import { profileLabels, type LeadProfile } from "@/lib/funnel";

/* ─────────── styles (grid, noise, scanline) ─────────── */
function PageStyles() {
  return (
    <style>{`
      .up2-grid {
        background-image:
          linear-gradient(rgba(6, 25, 44, .08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 25, 44, .08) 1px, transparent 1px);
        background-size: 42px 42px;
      }
      .up2-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.84' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E");
      }
      .up2-scanline {
        background: linear-gradient(180deg, transparent 0%, rgba(40, 199, 186, .28) 50%, transparent 100%);
        animation: up2Scan 5.6s ease-in-out infinite;
      }
      @keyframes up2Scan {
        0%, 100% { transform: translateY(-120%); opacity: 0; }
        18%, 72% { opacity: 1; }
        50% { transform: translateY(120%); }
      }
      @media (prefers-reduced-motion: reduce) {
        .up2-scanline { animation: none; }
      }
    `}</style>
  );
}

/* ─────────── top nav (unificado com a home) ─────────── */
function TopNav({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/primeiro-imovel", label: "Primeiro imóvel" },
    { href: "/upgrade-moradia", label: "Upgrade" },
    { href: "/investimento", label: "Investimento" },
    { href: "/anuncie-seu-imovel", label: "Anuncie" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#06192c]/10 bg-[#f4f0e8]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="Pinheiro Azul">
          <span className="grid h-10 w-10 place-items-center bg-[#06192c] text-[#f4f0e8]">
            <Home size={18} />
          </span>
          <span>
            <span className="block text-sm font-black uppercase tracking-[0.24em] text-[#06192c]">Pinheiro Azul</span>
            <span className="block text-xs text-[#5a6472]">Zona Leste SP</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 text-sm font-semibold transition hover:bg-[#06192c] hover:text-[#f4f0e8] ${
                link.href === "/upgrade-moradia" ? "bg-[#06192c] text-[#f4f0e8]" : "text-[#27394d]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={onOpenDiagnostic}
          className="hidden items-center gap-2 bg-[#e43d30] px-4 py-3 text-sm font-black uppercase text-white transition hover:bg-[#06192c] md:inline-flex"
        >
          Receber diagnóstico
          <ArrowRight size={16} />
        </button>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center border border-[#06192c] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="grid gap-2 border-t border-[#06192c]/10 bg-[#f4f0e8] px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="border border-[#06192c]/15 px-4 py-3 text-sm font-bold">
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onOpenDiagnostic();
            }}
            className="bg-[#e43d30] px-4 py-3 text-left text-sm font-black uppercase text-white"
          >
            Receber diagnóstico
          </button>
        </div>
      )}
    </header>
  );
}

/* ─────────── footer (completo, igual home) ─────────── */
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
              <span className="grid h-10 w-10 place-items-center bg-[#06192c] text-[#f4f0e8]">
                <Home size={18} />
              </span>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.18em]">Pinheiro Azul</h3>
                <p className="text-xs text-[#5a6472]">Negócios Imobiliários</p>
              </div>
            </div>
            <p className="text-sm text-[#415064] leading-relaxed max-w-xs">
              Especialistas em imóveis na Zona Leste de São Paulo, com atendimento humanizado e
              metodologia exclusiva P.A.Z.©
            </p>
            <div className="mt-4 text-xs text-[#5a6472]">CRECI J-12345</div>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e43d30] mb-6">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="group inline-flex items-center gap-1 text-sm text-[#415064] hover:text-[#06192c] transition-colors duration-300"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#e43d30] mb-6">
              Atendimento
            </h4>
            <p className="text-sm text-[#415064] leading-relaxed">
              Atendimento consultivo para quem busca mais do que um catálogo.
              Fale com quem entende de rotina, bairro e valorização na Zona Leste.
            </p>
            <Link
              to="/contato"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#06192c] hover:text-[#e43d30] transition-colors"
            >
              Falar com consultor
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#06192c]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#5a6472]">
            © 2024 Pinheiro Azul Negócios Imobiliários. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#5a6472]">
            Zona Leste de São Paulo — Atendimento Humanizado
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── dados da página ─────────── */
const profile: Exclude<LeadProfile, "venda_imovel"> = "upgrade_moradia";

const proofItems = [
  { icon: Heart, label: "Fim de semana em casa", desc: "Quando sábado chega, você não precisa sair para respirar" },
  { icon: Compass, label: "Escola, mercado, médico perto", desc: "Para que segunda-feira já comece mais leve" },
  { icon: TrendingUp, label: "Tempo de volta para casa", desc: "Chegar do trabalho e ainda encontrar a família acordada" },
  { icon: ShieldCheck, label: "Mudança sem susto", desc: "Porque trocar de casa já é decisão grande demais para ter surpresa no meio" },
];

const steps = [
  {
    num: "01",
    title: "A gente começa ouvindo",
    copy: "Onde você trabalha? Onde seus filhos estudam? O que você não abre mão no dia a dia? A gente só sugere endereço depois de entender o que sustenta a rotina da sua família.",
    accent: "#28c7ba",
  },
  {
    num: "02",
    title: "A gente compara cenários, não anúncios",
    copy: "Pronto para morar, planta maior ou melhor localização — cada opção é avaliada pelo que ela muda na sua rotina, não só pelo preço.",
    accent: "#f3d35b",
  },
  {
    num: "03",
    title: "Você recebe opções que fazem sentido",
    copy: "Sem lista genérica. A gente separa o que é curiosidade do que é real intenção de mudar — e te liga com quem entende o que você precisa.",
    accent: "#e43d30",
  },
];

const properties = [
  {
    name: "Varanda gourmet",
    district: "Vila Matilde",
    signal: "rotina familiar",
    range: "R$ 600 mil+",
    narrative: "Para quem quer manter o hábito do almoço de domingo com espaço aberto.",
    tone: "family" as const,
  },
  {
    name: "Condomínio clube",
    district: "Carrão",
    signal: "lazer completo",
    range: "R$ 750 mil",
    narrative: "Para famílias que não querem sair do bairro para encontrar qualidade de vida.",
    tone: "prime" as const,
  },
  {
    name: "Casa com quintal",
    district: "Vila Formosa",
    signal: "mais espaço",
    range: "R$ 850 mil",
    narrative: "Para quem precisa de quartos que crescem junto com a família.",
    tone: "origin" as const,
  },
];

const toneClass = {
  origin: "border-[#28c7ba] shadow-[8px_8px_0_#28c7ba]",
  prime: "border-[#f3d35b] shadow-[8px_8px_0_#f3d35b]",
  family: "border-[#e43d30] shadow-[8px_8px_0_#e43d30]",
};

/* ─────────── sections ─────────── */

function HeroSection({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  return (
    <section className="relative overflow-hidden border-b border-[#06192c]">
      <div className="absolute inset-0 up2-grid opacity-60" />
      <div className="absolute inset-0 up2-noise opacity-[0.04] mix-blend-multiply" />
      <div className="absolute inset-x-0 top-0 h-24 up2-scanline pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_.85fr] lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex border border-[#06192c] bg-[#f4f0e8] px-3 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#06192c]">
              Mais espaço para uma rotina melhor
            </div>
            <h1 className="text-[clamp(2.4rem,5vw,4.2rem)] font-black uppercase leading-[0.95] text-[#06192c]">
              Sua família cresceu. Sua casa, nem tanto.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[#415064] max-w-lg">
              Trocar de endereço não é só questão de espaço — é <strong>não perder o que já funciona</strong> na sua rotina.
              A gente olha escola, mobilidade, lazer e previsibilidade porque morar bem é mais do que metros quadrados.
            </p>
            <button
              type="button"
              onClick={onOpenDiagnostic}
              className="mt-8 inline-flex items-center gap-3 bg-[#06192c] px-6 py-4 text-sm font-black uppercase text-white shadow-[8px_8px_0_#e43d30] transition hover:bg-[#e43d30] hover:shadow-[8px_8px_0_#06192c]"
            >
              Ver opções para minha família
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="border border-[#06192c] bg-white p-6 shadow-[12px_12px_0_#28c7ba]">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e43d30]">
              {profileLabels[profile]}
            </p>
            <div className="mt-5 grid gap-2">
              {proofItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3 border border-[#06192c]/12 p-3">
                  <item.icon className="mt-0.5 text-[#28c7ba] shrink-0" size={18} />
                  <div>
                    <span className="block text-sm font-bold text-[#06192c]">{item.label}</span>
                    <span className="block text-xs text-[#5a6472]">{item.desc}</span>
                  </div>
                </div>
              ))}
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
          <h2 className="mt-4 text-3xl font-black uppercase leading-tight md:text-5xl">
            Três conversas. Um caminho mais claro.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-[2px] bg-white/10 -translate-x-4" />
              )}

              <div
                className="inline-flex h-16 w-16 items-center justify-center border-2 text-lg font-black"
                style={{ borderColor: step.accent, color: step.accent }}
              >
                {step.num}
              </div>
              <h3 className="mt-6 text-xl font-black uppercase leading-tight">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{step.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PropertiesSection({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-[#e43d30]">Seleção Pinheiro Azul</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end mb-16">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3.8rem)] font-black uppercase leading-[0.95] text-[#06192c]">
              Imóveis como ponto de conversa.
            </h2>
          </div>
          <div>
            <p className="text-[#415064] leading-relaxed">
              Cada imóvel aqui conta uma <strong>história de família</strong>. Não são ofertas — são cenários de vida que já
              aconteceram. O seu cenário pode ser parecido, ou completamente diferente. <strong>A gente descobre junto.</strong>
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {properties.map((prop) => (
            <article
              key={prop.name}
              className={`group relative border bg-white p-6 transition-all duration-300 hover:-translate-y-1 ${toneClass[prop.tone]}`}
            >
              <Building2 className="text-[#e43d30]" size={22} />
              <h3 className="mt-10 text-2xl font-black uppercase leading-tight text-[#06192c]">
                {prop.name}
              </h3>
              <p className="mt-2 text-sm font-bold text-[#415064]">{prop.district}</p>

              <div className="mt-5 border-l-2 border-[#28c7ba] pl-3">
                <p className="text-xs leading-relaxed text-[#5a6472] italic">
                  {prop.narrative}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#06192c]/10 pt-4 text-sm">
                <span className="text-[#5a6472]">{prop.signal}</span>
                <strong className="text-[#06192c]">{prop.range}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#415064]">
            Ainda não sabe qual cenário é o seu? A gente descobre em dois minutos de conversa.
          </p>
          <button
            type="button"
            onClick={onOpenDiagnostic}
            className="inline-flex items-center justify-center gap-2 border border-[#06192c] bg-white px-5 py-3 text-sm font-black uppercase transition hover:bg-[#06192c] hover:text-white"
          >
            Fazer diagnóstico gratuito
            <BarChart3 size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}

function CTASection({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  return (
    <section className="border-t border-[#06192c]/10 bg-[#e7e0d4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <ShieldCheck className="mx-auto text-[#e43d30]" size={34} />
        <h2 className="mx-auto mt-6 text-[clamp(1.8rem,3.5vw,3rem)] font-black uppercase leading-tight text-[#06192c]">
          A gente não te liga para vender. A gente te liga para entender.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[#415064] leading-relaxed">
          O diagnóstico é uma conversa curta. Você conta onde está, onde quer chegar e o que não abre mão.
          A gente volta com opções que respeitam isso.
        </p>
        <button
          type="button"
          onClick={onOpenDiagnostic}
          className="mt-8 inline-flex items-center gap-3 bg-[#e43d30] px-8 py-4 text-sm font-black uppercase text-white shadow-[6px_6px_0_#06192c] transition hover:bg-[#06192c] hover:shadow-[6px_6px_0_#e43d30]"
        >
          Receber diagnóstico
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

/* ─────────── page ─────────── */
export default function UpgradeMoradiaV2() {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#06192c] selection:bg-[#e43d30] selection:text-white">
      <PageStyles />
      <TopNav onOpenDiagnostic={() => setDiagnosticOpen(true)} />

      <main>
        <HeroSection onOpenDiagnostic={() => setDiagnosticOpen(true)} />
        <ProcessSection />
        <PropertiesSection onOpenDiagnostic={() => setDiagnosticOpen(true)} />
        <CTASection onOpenDiagnostic={() => setDiagnosticOpen(true)} />
      </main>

      <Footer />

      <FunnelDiagnosticModal
        open={diagnosticOpen}
        onOpenChange={setDiagnosticOpen}
        initialProfile={profile}
        sourcePage="/upgrade-moradia-2"
      />
    </div>
  );
}
