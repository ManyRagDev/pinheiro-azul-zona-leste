import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Building2, CheckCircle2, Home, Menu, ShieldCheck, X } from "lucide-react";
import { FunnelDiagnosticModal } from "@/components/funnel/FunnelDiagnosticModal";
import { profileLabels, profileSummaries, type LeadProfile } from "@/lib/funnel";

type ProfileLandingProps = {
  profile: Exclude<LeadProfile, "venda_imovel">;
};

const pageData: Record<
  Exclude<LeadProfile, "venda_imovel">,
  {
    eyebrow: string;
    hero: string;
    proof: string[];
    sections: Array<{ title: string; copy: string }>;
    properties: Array<{ name: string; district: string; signal: string; range: string }>;
  }
> = {
  primeiro_imovel: {
    eyebrow: "Primeira compra com menos risco",
    hero: "Da simulação ao bairro certo: um caminho mais claro para sair do aluguel.",
    proof: ["FGTS e entrada sem chute", "Regiões com preço compatível", "Documentação acompanhada", "Visitas com critério"],
    sections: [
      {
        title: "Planejamento antes da visita",
        copy: "O lead entende limite real, renda, entrada e bairros possíveis antes de desperdiçar tempo com imóveis fora da realidade.",
      },
      {
        title: "Seleção Pinheiro Azul",
        copy: "Itaquera, Penha e Vila Matilde entram como opções de alto volume para validar o funil de primeiro imóvel.",
      },
      {
        title: "Conteúdo de valor",
        copy: "O guia enviado por email orienta custos, financiamento, documentos e próximos passos com a equipe.",
      },
    ],
    properties: [
      { name: "Apto Minha Casa", district: "Itaquera", signal: "entrada planejada", range: "até R$ 350 mil" },
      { name: "Lançamento popular", district: "Penha", signal: "FGTS como alavanca", range: "R$ 350 mil" },
      { name: "Planta compacta", district: "Vila Matilde", signal: "mobilidade", range: "R$ 300 mil+" },
    ],
  },
  upgrade_moradia: {
    eyebrow: "Mais espaço para uma rotina melhor",
    hero: "Trocar de imóvel exige comparar vida real, não só metragem.",
    proof: ["Lazer e varanda", "Escolas e serviços", "Mobilidade familiar", "Previsibilidade de mudança"],
    sections: [
      {
        title: "Benefícios que importam",
        copy: "A página valoriza espaço, conforto, área de lazer e bairros que sustentam uma rotina familiar mais estável.",
      },
      {
        title: "Comparação guiada",
        copy: "Prontos para morar, planta maior e localização entram em uma matriz simples de decisão.",
      },
      {
        title: "Lead mais qualificado",
        copy: "O diagnóstico separa curiosidade de intenção real, ajudando a SDR priorizar visitas possíveis.",
      },
    ],
    properties: [
      { name: "Varanda gourmet", district: "Vila Matilde", signal: "rotina familiar", range: "R$ 600 mil+" },
      { name: "Condomínio clube", district: "Carrão", signal: "lazer completo", range: "R$ 750 mil" },
      { name: "Casa com quintal", district: "Vila Formosa", signal: "mais espaço", range: "R$ 850 mil" },
    ],
  },
  investimento: {
    eyebrow: "Inteligência para renda e valorização",
    hero: "Investir na Zona Leste pede tese: liquidez, aluguel e bairro certo.",
    proof: ["Liquidez do m²", "Rentabilidade de aluguel", "Valorização na planta", "Risco de vacância"],
    sections: [
      {
        title: "Métrica antes de emoção",
        copy: "A LP troca promessa genérica por critérios comparáveis: preço, demanda, saída e potencial de renda.",
      },
      {
        title: "Tatuapé como vitrine",
        copy: "O eixo Tatuapé/Anália Franco ajuda a educar o público sobre ticket maior e comissão mais rentável.",
      },
      {
        title: "Guia para follow-up",
        copy: "O material de email prepara a conversa comercial com números, cenários e prioridades.",
      },
    ],
    properties: [
      { name: "Studio líquido", district: "Tatuapé", signal: "aluguel rápido", range: "R$ 420 mil+" },
      { name: "Unidade na planta", district: "Anália Franco", signal: "valorização", range: "R$ 700 mil+" },
      { name: "Apto compacto", district: "Belém", signal: "mobilidade", range: "R$ 500 mil" },
    ],
  },
};

function LocalNav({ onOpenDiagnostic }: { onOpenDiagnostic: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#06192c]/10 bg-[#f4f0e8]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center bg-[#06192c] text-white">
            <Home size={18} />
          </span>
          <span className="text-sm font-black uppercase tracking-[0.18em] text-[#06192c]">Pinheiro Azul</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          <Link to="/primeiro-imovel" className="px-3 py-2 text-sm font-bold text-[#415064] hover:text-[#06192c]">
            Primeiro imóvel
          </Link>
          <Link to="/upgrade-moradia" className="px-3 py-2 text-sm font-bold text-[#415064] hover:text-[#06192c]">
            Upgrade
          </Link>
          <Link to="/investimento" className="px-3 py-2 text-sm font-bold text-[#415064] hover:text-[#06192c]">
            Investimento
          </Link>
          <Link to="/anuncie-seu-imovel" className="px-3 py-2 text-sm font-bold text-[#415064] hover:text-[#06192c]">
            Anuncie
          </Link>
          <Link to="/blog" className="px-3 py-2 text-sm font-bold text-[#415064] hover:text-[#06192c]">
            Blog
          </Link>
        </nav>
        <button
          type="button"
          onClick={onOpenDiagnostic}
          className="hidden bg-[#e43d30] px-4 py-3 text-sm font-black uppercase text-white md:inline-flex"
        >
          Receber diagnóstico
        </button>
        <button type="button" onClick={() => setOpen((value) => !value)} className="grid h-10 w-10 place-items-center border border-[#06192c] md:hidden">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <div className="grid gap-2 border-t border-[#06192c]/10 bg-[#f4f0e8] p-4 md:hidden">
          {[
            ["/primeiro-imovel", "Primeiro imóvel"],
            ["/upgrade-moradia", "Upgrade/Moradia"],
            ["/investimento", "Investimento"],
            ["/anuncie-seu-imovel", "Anuncie seu imóvel"],
            ["/blog", "Blog"],
          ].map(([to, label]) => (
            <Link key={to} to={to} className="border border-[#06192c]/15 px-4 py-3 text-sm font-bold">
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export default function ProfileLanding({ profile }: ProfileLandingProps) {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const data = pageData[profile];
  const summary = profileSummaries[profile];

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-[#06192c]">
      <LocalNav onOpenDiagnostic={() => setDiagnosticOpen(true)} />
      <main>
        <section className="relative overflow-hidden border-b border-[#06192c] px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,25,44,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,25,44,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.82fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#e43d30]">{data.eyebrow}</p>
              <h1 className="mt-5 max-w-4xl text-5xl font-black uppercase leading-[0.88] md:text-7xl">
                {summary.title}
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#415064]">{data.hero}</p>
              <button
                type="button"
                onClick={() => setDiagnosticOpen(true)}
                className="mt-8 inline-flex items-center gap-3 bg-[#06192c] px-6 py-4 text-sm font-black uppercase text-white shadow-[8px_8px_0_#e43d30]"
              >
                {summary.cta}
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="border border-[#06192c] bg-white p-5 shadow-[14px_14px_0_#28c7ba]">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#e43d30]">{profileLabels[profile]}</p>
              <div className="mt-5 grid gap-3">
                {data.proof.map((item) => (
                  <div key={item} className="flex items-center gap-3 border border-[#06192c]/15 p-4">
                    <CheckCircle2 className="text-[#28c7ba]" size={18} />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#06192c] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {data.sections.map((section, index) => (
              <article key={section.title} className="border border-white/15 bg-white/[0.04] p-6">
                <span className="text-5xl font-black text-[#f3d35b]">{index + 1}</span>
                <h2 className="mt-8 text-2xl font-black uppercase leading-tight">{section.title}</h2>
                <p className="mt-4 leading-relaxed text-white/72">{section.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-[#e43d30]">Seleção Pinheiro Azul</p>
                <h2 className="mt-4 text-4xl font-black uppercase leading-none md:text-6xl">Imóveis como ponto de conversa.</h2>
              </div>
              <button
                type="button"
                onClick={() => setDiagnosticOpen(true)}
                className="inline-flex items-center justify-center gap-2 border border-[#06192c] px-5 py-4 text-sm font-black uppercase"
              >
                Ver perfil compatível
                <BarChart3 size={17} />
              </button>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {data.properties.map((property) => (
                <article key={property.name} className="min-h-64 border border-[#06192c] bg-white p-6">
                  <Building2 className="text-[#e43d30]" />
                  <h3 className="mt-12 text-3xl font-black uppercase leading-none">{property.name}</h3>
                  <p className="mt-4 font-bold text-[#415064]">{property.district}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-[#06192c]/15 pt-4 text-sm">
                    <span>{property.signal}</span>
                    <strong>{property.range}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#06192c] bg-[#e7e0d4] px-4 py-16 text-center sm:px-6 lg:px-8">
          <ShieldCheck className="mx-auto text-[#e43d30]" size={34} />
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black uppercase leading-none">
            O próximo passo é classificar o lead antes da abordagem.
          </h2>
          <button
            type="button"
            onClick={() => setDiagnosticOpen(true)}
            className="mt-8 inline-flex items-center gap-3 bg-[#e43d30] px-6 py-4 text-sm font-black uppercase text-white"
          >
            Receber diagnóstico
            <ArrowRight size={18} />
          </button>
        </section>
      </main>

      <footer className="bg-[#06192c] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <strong className="uppercase tracking-[0.18em]">Pinheiro Azul</strong>
          <span className="text-sm text-white/60">Funil imobiliário para a Zona Leste de São Paulo.</span>
        </div>
      </footer>

      <FunnelDiagnosticModal
        open={diagnosticOpen}
        onOpenChange={setDiagnosticOpen}
        initialProfile={profile}
        sourcePage={`/${profile === "primeiro_imovel" ? "primeiro-imovel" : profile === "upgrade_moradia" ? "upgrade-moradia" : "investimento"}`}
      />
    </div>
  );
}
