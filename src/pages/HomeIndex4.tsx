import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Compass,
  FileText,
  Home,
  KeyRound,
  MapPin,
  Menu,
  ShieldCheck,
  Train,
  TrendingUp,
  X,
} from "lucide-react";
import andre from "@/assets/andre.jpg";
import logo from "@/assets/logo.png";
import { FunnelDiagnosticModal } from "@/components/funnel/FunnelDiagnosticModal";
import { normalizeProfile, profileLabels, profileSummaries, type LeadProfile } from "@/lib/funnel";

// TODO: atualizar com o número real do WhatsApp do André
const WHATSAPP_ANDRE = "https://wa.me/5511999999999";

const profileRoutes: Array<{ profile: LeadProfile; href: string; icon: typeof KeyRound }> = [
  { profile: "primeiro_imovel", href: "/primeiro-imovel", icon: KeyRound },
  { profile: "upgrade_moradia", href: "/upgrade-moradia", icon: Home },
  { profile: "investimento", href: "/investimento", icon: TrendingUp },
];

const mapDistricts = [
  { label: "Bresser", x: 12, y: 46, tone: "origin", note: "entrada oeste" },
  { label: "Mooca", x: 17, y: 59, tone: "origin", note: "tradição" },
  { label: "Belém", x: 23, y: 43, tone: "origin", note: "eixo central" },
  { label: "Tatuapé", x: 34, y: 39, tone: "prime", note: "liquidez" },
  { label: "Anália Franco", x: 39, y: 62, tone: "prime", note: "alto padrão" },
  { label: "Vila Formosa", x: 48, y: 68, tone: "family", note: "perfil familiar" },
  { label: "Carrão", x: 49, y: 42, tone: "family", note: "conexão" },
  { label: "Penha", x: 62, y: 36, tone: "east", note: "tradição + acesso" },
  { label: "Cangaíba", x: 66, y: 23, tone: "east", note: "respiro norte" },
  { label: "Vila Matilde", x: 73, y: 41, tone: "east", note: "metrô e bairro" },
  { label: "Itaquera", x: 88, y: 48, tone: "far", note: "polo leste" },
] as const;

const heroSteps = [
  {
    kicker: "01 / território",
    title: "A Zona Leste tem várias versões. Uma delas combina com você.",
    copy: "Da praticidade do metrô à calma de uma rua residencial, cada bairro muda a forma de viver.",
  },
  {
    kicker: "02 / rotina",
    title: "O imóvel certo respeita sua rotina.",
    copy: "A gente olha além do anúncio: deslocamento, vizinhança, escola, comércio, barulho e acesso.",
  },
  {
    kicker: "03 / critério",
    title: "Planejar, analisar e zelar.",
    copy: "A metodologia P.A.Z. transforma busca dispersa em uma decisão mais simples, segura e humana.",
  },
  {
    kicker: "04 / diagnóstico",
    title: "Seu tempo é precioso. Você não precisa ver tudo.",
    copy: "Conte seu momento, faixa de valor e região. A Pinheiro Azul classifica seu perfil e orienta o próximo passo.",
  },
] as const;

const proof = [
  "Nenhum imóvel indicado à toa",
  "Curadoria baseada no seu momento real",
  "Histórico da sua busca sempre à mão",
  "Guias e materiais enviados conforme seu perfil",
];

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
          <img src={logo} alt="Logo Pinheiro Azul" className="h-[50px] w-[50px] object-contain" />
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
              className="px-3 py-2 text-sm font-semibold text-[#27394d] transition hover:bg-[#06192c] hover:text-[#f4f0e8]"
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
          onClick={() => setOpen((value) => !value)}
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

function Index4Styles() {
  return (
    <style>{`
      .index4-grid {
        background-image:
          linear-gradient(rgba(6, 25, 44, .08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(6, 25, 44, .08) 1px, transparent 1px);
        background-size: 42px 42px;
      }

      .index4-noise {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.84' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.42'/%3E%3C/svg%3E");
      }

      .index4-scanline {
        background: linear-gradient(180deg, transparent 0%, rgba(40, 199, 186, .28) 50%, transparent 100%);
        animation: index4Scan 5.6s ease-in-out infinite;
      }

      .index4-pulse { animation: index4Pulse 2.4s ease-in-out infinite; }
      .index4-orbit { animation: index4Orbit 18s linear infinite; transform-origin: 50% 50%; }
      .index4-marquee { animation: index4Marquee 24s linear infinite; }

      @keyframes index4Scan {
        0%, 100% { transform: translateY(-120%); opacity: 0; }
        18%, 72% { opacity: 1; }
        50% { transform: translateY(120%); }
      }

      @keyframes index4Pulse {
        0%, 100% { transform: scale(1); opacity: .64; }
        50% { transform: scale(1.18); opacity: 1; }
      }

      @keyframes index4Orbit { to { transform: rotate(360deg); } }
      @keyframes index4Marquee { to { transform: translateX(-50%); } }

      @media (prefers-reduced-motion: reduce) {
        .index4-scanline, .index4-pulse, .index4-orbit, .index4-marquee { animation: none; }
      }
    `}</style>
  );
}

function useMousePosition() {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      setPosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return position;
}

function HeroMap({ progress, onOpenDiagnostic }: { progress: MotionValue<number>; onOpenDiagnostic: () => void }) {
  const routeLength = useTransform(progress, [0.05, 0.58], [0.08, 1]);
  const decisionLength = useTransform(progress, [0.42, 0.84], [0, 1]);
  const districtOpacity = useTransform(progress, [0.08, 0.28, 0.58], [0.55, 1, 0.72]);
  const pazOpacity = useTransform(progress, [0.45, 0.66, 0.9], [0, 1, 0.45]);
  const finalOpacity = useTransform(progress, [0.72, 0.92], [0, 1]);
  const finalY = useTransform(progress, [0.72, 0.92], [28, 0]);

  const toneClass = {
    origin: "border-[#28c7ba] bg-[#28c7ba]",
    prime: "border-[#f3d35b] bg-[#f3d35b]",
    family: "border-white bg-white",
    east: "border-[#e43d30] bg-[#e43d30]",
    far: "border-[#f4f0e8] bg-[#f4f0e8]",
  } as const;

  return (
    <div className="relative h-[calc(100vh-6.5rem)] min-h-[560px] overflow-hidden border border-[#06192c] bg-[#06192c] text-white shadow-[14px_14px_0_#28c7ba]">
      <div className="absolute inset-0 index4-grid opacity-20" />
      <div className="absolute inset-0 index4-noise opacity-[0.07]" />
      <div className="absolute inset-x-0 top-0 h-24 index4-scanline" />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M7 47 C16 45 21 44 28 42 C39 38 47 40 56 38 C68 36 77 41 93 48"
          fill="none"
          stroke="#e43d30"
          strokeWidth="1.15"
          strokeDasharray="1.2 1.4"
          style={{ pathLength: routeLength }}
        />
        <motion.path
          d="M35 40 C39 49 43 58 50 69"
          fill="none"
          stroke="#f3d35b"
          strokeWidth="0.82"
          strokeDasharray="1 1.4"
          style={{ pathLength: decisionLength }}
        />
        <motion.path
          d="M61 36 C65 31 68 27 66 23"
          fill="none"
          stroke="#28c7ba"
          strokeWidth="0.7"
          strokeDasharray="1 1.2"
          style={{ pathLength: decisionLength }}
        />
        <motion.path
          d="M12 75 C26 72 39 80 51 73 C64 66 76 71 91 64"
          fill="none"
          stroke="#f4f0e8"
          strokeWidth="0.48"
          opacity="0.32"
          style={{ pathLength: routeLength }}
        />
      </svg>

      {mapDistricts.map((node, index) => (
        <motion.div
          key={node.label}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, opacity: districtOpacity }}
        >
          <div
            className={`index4-pulse h-4 w-4 border-2 ${toneClass[node.tone]}`}
            style={{ animationDelay: `${index * 0.24}s` }}
          />
          <div className="mt-2 -translate-x-2 border border-white/20 bg-[#06192c]/88 px-2 py-1 text-[10px] font-black uppercase tracking-[0.14em] md:text-[11px]">
            {node.label}
          </div>
          <div className="mt-1 hidden -translate-x-2 bg-[#f4f0e8] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#06192c] md:block">
            {node.note}
          </div>
        </motion.div>
      ))}

      <motion.div
        className="absolute bottom-6 left-5 right-5 border border-white/20 bg-[#06192c]/80 p-4 backdrop-blur md:left-auto md:w-[360px]"
        style={{ opacity: pazOpacity }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-xs font-black uppercase tracking-[0.24em] text-[#f3d35b]">camada P.A.Z.</span>
          <Train size={17} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["planejar", "analisar", "zelar"].map((item) => (
            <div key={item} className="border border-white/18 py-3 text-center">
              <span className="text-xs font-black uppercase">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.button
        type="button"
        onClick={onOpenDiagnostic}
        className="absolute bottom-7 right-5 flex max-w-[320px] items-center justify-between gap-5 bg-[#f3d35b] p-5 text-left text-[#06192c] shadow-[8px_8px_0_#e43d30] transition hover:bg-white md:right-8"
        style={{ opacity: finalOpacity, y: finalY }}
      >
        <span className="text-sm font-black uppercase tracking-[0.16em]">Quero encontrar meu imóvel ideal</span>
        <ArrowRight size={22} />
      </motion.button>

      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#28c7ba]/40 index4-orbit">
        <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 bg-[#f3d35b]" />
      </div>
    </div>
  );
}

function AnimatedHero({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const touchYRef = useRef<number | null>(null);
  const mouse = useMousePosition();
  const targetProgress = useMotionValue(0);
  const smoothProgress = useSpring(targetProgress, {
    stiffness: 70,
    damping: 22,
    mass: 0.45,
    restDelta: 0.0005,
  });

  const mapScale = useTransform(smoothProgress, [0, 0.52, 1], [0.98, 1.025, 1]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.14, 0.3], [1, 1, 0]);
  const titleY = useTransform(smoothProgress, [0, 0.3], [0, -80]);
  const stepOneOpacity = useTransform(smoothProgress, [0.06, 0.22, 0.47], [0, 1, 0]);
  const stepTwoOpacity = useTransform(smoothProgress, [0.25, 0.45, 0.68], [0, 1, 0]);
  const stepThreeOpacity = useTransform(smoothProgress, [0.46, 0.66, 0.86], [0, 1, 0]);
  const stepFourOpacity = useTransform(smoothProgress, [0.68, 0.88], [0, 1]);
  const stepOneY = useTransform(smoothProgress, [0.06, 0.22, 0.47], [24, 0, -12]);
  const stepTwoY = useTransform(smoothProgress, [0.25, 0.45, 0.68], [24, 0, -12]);
  const stepThreeY = useTransform(smoothProgress, [0.46, 0.66, 0.86], [24, 0, -12]);
  const stepFourY = useTransform(smoothProgress, [0.68, 0.88], [24, 0]);
  const stepOpacities = [stepOneOpacity, stepTwoOpacity, stepThreeOpacity, stepFourOpacity];
  const stepYs = [stepOneY, stepTwoY, stepThreeY, stepFourY];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) {
      return;
    }

    const isHeroGateActive = (direction: "down" | "up") => {
      const bounds = section.getBoundingClientRect();
      return direction === "down"
        ? bounds.top <= 1 && bounds.bottom > window.innerHeight * 0.35
        : Math.abs(bounds.top) <= 24 && bounds.bottom > window.innerHeight * 0.65;
    };

    const advanceHero = (delta: number) => {
      const current = targetProgress.get();
      const limitedDelta = Math.max(-0.045, Math.min(0.045, delta));
      const next = Math.min(1, Math.max(0, current + limitedDelta));
      targetProgress.set(next);
      return next;
    };

    const wheelToProgress = (event: WheelEvent) => {
      const isAdvancing = event.deltaY > 0;
      const isRewinding = event.deltaY < 0;
      const direction = isAdvancing ? "down" : "up";

      if (!isHeroGateActive(direction)) {
        return;
      }

      const current = targetProgress.get();
      const shouldCapture = (isAdvancing && current < 1) || (isRewinding && current > 0);

      if (!shouldCapture) {
        return;
      }

      event.preventDefault();
      const modeMultiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      advanceHero((event.deltaY * modeMultiplier) / 1800);
    };

    const touchStart = (event: TouchEvent) => {
      touchYRef.current = event.touches[0]?.clientY ?? null;
    };

    const touchMove = (event: TouchEvent) => {
      const previousY = touchYRef.current;
      const nextY = event.touches[0]?.clientY;

      if (previousY === null || nextY === undefined) {
        return;
      }

      const delta = previousY - nextY;
      const current = targetProgress.get();
      const isAdvancing = delta > 0;
      const isRewinding = delta < 0;
      const direction = isAdvancing ? "down" : "up";

      if (!isHeroGateActive(direction)) {
        touchYRef.current = nextY;
        return;
      }

      const shouldCapture = (isAdvancing && current < 1) || (isRewinding && current > 0);

      if (shouldCapture) {
        event.preventDefault();
        advanceHero(delta / 900);
      }

      touchYRef.current = nextY;
    };

    const touchEnd = () => {
      touchYRef.current = null;
    };

    window.addEventListener("wheel", wheelToProgress, { passive: false, capture: true });
    window.addEventListener("touchstart", touchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", touchMove, { passive: false, capture: true });
    window.addEventListener("touchend", touchEnd, { passive: true, capture: true });
    window.addEventListener("touchcancel", touchEnd, { passive: true, capture: true });

    return () => {
      window.removeEventListener("wheel", wheelToProgress, { capture: true });
      window.removeEventListener("touchstart", touchStart, { capture: true });
      window.removeEventListener("touchmove", touchMove, { capture: true });
      window.removeEventListener("touchend", touchEnd, { capture: true });
      window.removeEventListener("touchcancel", touchEnd, { capture: true });
    };
  }, [targetProgress]);

  return (
    <section ref={sectionRef} id="topo" className="relative min-h-screen overflow-hidden bg-[#f4f0e8] text-[#06192c]">
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%, rgba(40, 199, 186, .22), transparent 28%)`,
        }}
      />
      <div className="absolute inset-0 index4-grid opacity-70" />
      <div className="absolute inset-0 index4-noise opacity-[0.055] mix-blend-multiply" />

      <div className="relative z-10 flex min-h-screen items-center px-4 pb-12 pt-20 sm:px-6 lg:px-8">
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div style={{ scale: mapScale }} className="relative">
            <HeroMap progress={smoothProgress} onOpenDiagnostic={onOpenDiagnostic} />
          </motion.div>

          <motion.div
            style={{ opacity: titleOpacity, y: titleY }}
            className="pointer-events-none absolute left-5 top-20 max-w-[min(620px,62vw)] md:left-10 md:top-24"
          >
            <div className="mb-5 inline-flex border border-[#06192c] bg-[#f4f0e8] px-3 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-[#06192c] md:text-xs">
              Pinheiro Azul / mapa vivo da Zona Leste
            </div>
            <h1 className="max-w-[620px] text-[clamp(2rem,3.7vw,4.35rem)] font-black leading-[0.95] text-[#f4f0e8] mix-blend-difference">
              Seu próximo endereço pode melhorar sua vida.
            </h1>
          </motion.div>

          {heroSteps.map((step, index) => (
            <motion.article
              key={step.kicker}
              style={{ opacity: stepOpacities[index], y: stepYs[index] }}
              className="pointer-events-none absolute bottom-10 left-5 right-5 max-w-[640px] border border-[#06192c] bg-[#f4f0e8] p-5 text-[#06192c] shadow-[8px_8px_0_#28c7ba] md:bottom-14 md:left-10 md:right-auto md:p-6"
            >
              <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#e43d30] md:text-xs">{step.kicker}</p>
              <h2 className="mt-3 text-2xl font-black uppercase leading-[0.96] sm:text-3xl md:text-4xl">{step.title}</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#27394d] md:text-[15px]">{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 overflow-hidden border-y border-[#06192c] bg-[#f3d35b] py-3">
        <div className="index4-marquee flex w-max gap-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.24em] text-[#06192c]">
          {[...mapDistricts, ...mapDistricts].map((district, index) => (
            <span key={`${district.label}-${index}`} className="flex items-center gap-8">
              <span>{district.label}</span>
              <span className="h-2 w-2 bg-[#e43d30]" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeIndex4() {
  const [searchParams] = useSearchParams();
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<LeadProfile | undefined>();

  useEffect(() => {
    const queryProfile = normalizeProfile(searchParams.get("perfil"));
    if (queryProfile) {
      setSelectedProfile(queryProfile);
    }

    if (searchParams.get("diagnostico") === "1") {
      setDiagnosticOpen(true);
    }
  }, [searchParams]);

  const openDiagnostic = (profile?: LeadProfile) => {
    setSelectedProfile(profile);
    setDiagnosticOpen(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f4f0e8] text-[#06192c] selection:bg-[#e43d30] selection:text-white">
      <Index4Styles />
      <TopNav onOpenDiagnostic={() => openDiagnostic()} />

      <main>
        <AnimatedHero onOpenDiagnostic={() => openDiagnostic()} />

        <section id="perfis" className="bg-[#06192c] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 grid gap-6 lg:grid-cols-[.8fr_1fr]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#28c7ba]">Qual é o seu momento?</p>
                <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">Cada pessoa chega com um <span className="text-[#f3d35b]">propósito</span>. A gente tem um <span className="text-[#28c7ba]">caminho</span> para cada um.</h2>
              </div>
              <p className="max-w-2xl self-end text-lg leading-relaxed text-white/70">
                Antes de qualquer indicação, a gente entende quem você é e o que você precisa. O diagnóstico é o primeiro passo — rápido, gratuito e sem compromisso.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {profileRoutes.map(({ profile, href, icon: Icon }) => {
                const summary = profileSummaries[profile];
                return (
                  <article key={profile} className="flex min-h-[360px] flex-col border border-white/15 bg-white/[0.04] p-5">
                    <Icon className="text-[#f3d35b]" size={28} />
                    <p className="mt-10 text-xs font-black uppercase tracking-[0.22em] text-[#28c7ba]">{profileLabels[profile]}</p>
                    <h3 className="mt-3 text-2xl font-black uppercase leading-tight">{summary.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-white/68">{summary.copy}</p>
                    <div className="mt-6">
                      <Link to={href} className="inline-flex w-full items-center justify-between border border-white/20 px-4 py-3 text-sm font-black uppercase">
                        Conhecer mais
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
              <p className="text-sm text-white/60">Ainda não sabe qual perfil é o seu? O diagnóstico leva dois minutos.</p>
              <button
                type="button"
                onClick={() => openDiagnostic()}
                className="inline-flex items-center gap-3 bg-[#f3d35b] px-8 py-4 text-sm font-black uppercase text-[#06192c] shadow-[6px_6px_0_#e43d30] transition hover:bg-white hover:shadow-[6px_6px_0_#28c7ba]"
              >
                Fazer diagnóstico gratuito
                <FileText size={18} />
              </button>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-[#e43d30]">Como funciona</p>
              <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">O diagnóstico que muda o rumo da sua busca.</h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#415064]">
                Antes de qualquer visita, a gente entende seu momento: o que você precisa, o quanto pode investir, onde quer estar. Com isso, cada indicação é cirúrgica — sem perda de tempo dos dois lados.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {proof.map((item) => (
                <div key={item} className="border border-[#06192c] bg-white p-5">
                  <CheckCircle2 className="text-[#28c7ba]" size={22} />
                  <p className="mt-8 text-lg font-black leading-tight">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#06192c] text-white">
          <div className="mx-auto max-w-7xl grid overflow-hidden lg:grid-cols-[450px_1fr] lg:h-[520px]">
            <div className="relative overflow-hidden lg:h-full">
              <img
                src={andre}
                alt="André F. — Pinheiro Azul"
                className="h-[320px] w-full object-cover sm:h-[400px] lg:h-full"
                style={{ objectPosition: "center 15%" }}
              />
              <div className="absolute inset-0 bg-[#06192c]/30" />
              <div className="absolute bottom-4 left-4 border border-white/20 bg-[#06192c]/70 px-3 py-2 backdrop-blur-sm">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#28c7ba]">André F.</p>
                <p className="text-xs text-white/70">Corretor · Pinheiro Azul</p>
              </div>
            </div>
            <div className="flex items-center px-4 py-10 sm:px-8 lg:px-16 lg:py-12 lg:h-full">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#28c7ba]">Atendimento consultivo</p>
                <h2 className="mt-3 text-3xl font-black uppercase leading-tight md:text-4xl">Uma conversa diferente das outras.</h2>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/72">
                  Cada pessoa chega com um momento diferente. Eu começo entendendo o seu — o que você precisa, o que faz sentido pra sua vida agora. Só então as indicações fazem sentido de verdade.
                </p>
                <button
                  type="button"
                  onClick={() => openDiagnostic()}
                  className="mt-6 inline-flex items-center gap-3 bg-[#f3d35b] px-6 py-4 text-sm font-black uppercase text-[#06192c]"
                >
                  Fazer diagnóstico
                  <ShieldCheck size={18} />
                </button>
                <a
                  href={WHATSAPP_ANDRE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-sm text-white/55 transition hover:text-white"
                >
                  Prefere falar direto com o André?
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#f4f0e8] px-4 py-10 text-[#06192c] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-[#06192c] pt-8 md:flex-row md:items-center md:justify-between">
          <strong className="uppercase tracking-[0.18em]">Pinheiro Azul</strong>
          <span className="text-sm text-[#415064]">Corretagem especializada na Zona Leste de São Paulo.</span>
        </div>
      </footer>

      <FunnelDiagnosticModal
        open={diagnosticOpen}
        onOpenChange={setDiagnosticOpen}
        initialProfile={selectedProfile}
        sourcePage="/"
      />
    </div>
  );
}
