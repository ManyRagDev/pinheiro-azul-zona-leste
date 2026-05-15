import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, BarChart3, Home, Megaphone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FunnelDiagnosticModal } from "@/components/funnel/FunnelDiagnosticModal";
import { guideByProfile, submitLead } from "@/lib/funnel";

export default function SellerLanding() {
  const { toast } = useToast();
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    endereco: "",
    tipo: "",
    objetivo: "",
  });

  const submitSellerLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLead({
        nome: form.nome,
        email: form.email,
        whatsapp: form.whatsapp,
        perfil: "venda_imovel",
        origem_pagina: "/anuncie-seu-imovel",
        guia_solicitado: guideByProfile.venda_imovel,
        respostas: {
          objetivo: form.objetivo || "Vender meu imóvel com estratégia",
          faixa_preco: "",
          regiao_interesse: form.endereco,
          prazo: "Solicitou avaliação",
          tipo_imovel: form.tipo,
          endereco_imovel: form.endereco,
        },
      });

      toast({
        title: "Solicitação registrada",
        description: "A avaliação do imóvel ficou salva para abordagem e envio do guia de venda.",
      });
      setForm({ nome: "", email: "", whatsapp: "", endereco: "", tipo: "", objetivo: "" });
    } catch (error) {
      console.error("Seller lead error", error);
      toast({
        title: "Não foi possível salvar agora",
        description: "Tente novamente em instantes ou chame a equipe pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f0e8] text-[#06192c]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#06192c]/10 bg-[#f4f0e8]/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center bg-[#06192c] text-white">
              <Home size={18} />
            </span>
            <span className="text-sm font-black uppercase tracking-[0.18em]">Pinheiro Azul</span>
          </Link>
          <nav className="hidden items-center gap-5 md:flex">
            <Link to="/primeiro-imovel" className="text-sm font-bold text-[#415064] hover:text-[#06192c]">
              Comprar
            </Link>
            <Link to="/investimento" className="text-sm font-bold text-[#415064] hover:text-[#06192c]">
              Investir
            </Link>
            <Link to="/blog" className="text-sm font-bold text-[#415064] hover:text-[#06192c]">
              Blog
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => setDiagnosticOpen(true)}
            className="bg-[#e43d30] px-4 py-3 text-sm font-black uppercase text-white"
          >
            Avaliar meu imóvel
          </button>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,25,44,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,25,44,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.9fr_1fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[#e43d30]">Anuncie seu imóvel</p>
              <h1 className="mt-5 text-5xl font-black uppercase leading-[0.88] md:text-7xl">
                Venda com inteligência e valorize seu patrimônio.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[#415064]">
                A captação precisa nascer com dados: endereço, objetivo, tipo de imóvel e expectativa. Assim a Pinheiro
                Azul posiciona o imóvel com relatório, marketing e segurança jurídica.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  ["Marketing direcionado", Megaphone],
                  ["Relatório de valorização", BarChart3],
                  ["Segurança jurídica", ShieldCheck],
                ].map(([label, Icon]) => {
                  const TypedIcon = Icon as typeof Megaphone;
                  return (
                    <div key={label as string} className="border border-[#06192c] bg-white p-4">
                      <TypedIcon className="text-[#e43d30]" size={22} />
                      <p className="mt-6 text-sm font-black uppercase leading-tight">{label as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <form onSubmit={submitSellerLead} className="border border-[#06192c] bg-[#06192c] p-5 text-white shadow-[14px_14px_0_#28c7ba]">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#28c7ba]">Formulário de captação</p>
              <h2 className="mt-3 text-3xl font-black uppercase leading-none">Solicite avaliação</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="seller-name">Nome</Label>
                  <Input
                    id="seller-name"
                    value={form.nome}
                    onChange={(event) => setForm((current) => ({ ...current, nome: event.target.value }))}
                    required
                    className="mt-1 bg-white text-[#06192c]"
                  />
                </div>
                <div>
                  <Label htmlFor="seller-whatsapp">WhatsApp</Label>
                  <Input
                    id="seller-whatsapp"
                    value={form.whatsapp}
                    onChange={(event) => setForm((current) => ({ ...current, whatsapp: event.target.value }))}
                    required
                    className="mt-1 bg-white text-[#06192c]"
                  />
                </div>
                <div>
                  <Label htmlFor="seller-email">Email</Label>
                  <Input
                    id="seller-email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                    required
                    className="mt-1 bg-white text-[#06192c]"
                  />
                </div>
                <div>
                  <Label htmlFor="seller-type">Tipo de imóvel</Label>
                  <Input
                    id="seller-type"
                    value={form.tipo}
                    onChange={(event) => setForm((current) => ({ ...current, tipo: event.target.value }))}
                    placeholder="Apartamento, casa, sobrado"
                    required
                    className="mt-1 bg-white text-[#06192c]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="seller-address">Endereço ou bairro do imóvel</Label>
                <Input
                  id="seller-address"
                  value={form.endereco}
                  onChange={(event) => setForm((current) => ({ ...current, endereco: event.target.value }))}
                  required
                  className="mt-1 bg-white text-[#06192c]"
                />
              </div>
              <div className="mt-4">
                <Label htmlFor="seller-goal">Qual seu objetivo?</Label>
                <Textarea
                  id="seller-goal"
                  value={form.objetivo}
                  onChange={(event) => setForm((current) => ({ ...current, objetivo: event.target.value }))}
                  placeholder="Vender rápido, avaliar preço, trocar por outro imóvel..."
                  className="mt-1 min-h-28 bg-white text-[#06192c]"
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="mt-6 w-full bg-[#e43d30] py-6 text-white hover:bg-[#c93127]">
                {isSubmitting ? "Salvando..." : "Avaliar meu imóvel"}
                <ArrowRight size={18} />
              </Button>
            </form>
          </div>
        </section>

        <section className="bg-[#06192c] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
            {["Cadastro", "Avaliação", "Produção", "Venda acelerada"].map((step, index) => (
              <article key={step} className="border border-white/15 bg-white/[0.04] p-6">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[#28c7ba] text-xl font-black text-[#06192c]">
                  {index + 1}
                </div>
                <h2 className="mt-8 text-xl font-black uppercase">{step}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  {index === 0 && "Dados mínimos para entender imóvel, proprietário e urgência."}
                  {index === 1 && "Comparativo de mercado e relatório de posicionamento."}
                  {index === 2 && "Fotos, descrição, anúncios e abordagem com contexto."}
                  {index === 3 && "SDR e corretores atuando sobre leads mais qualificados."}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <BadgeCheck className="mx-auto text-[#e43d30]" size={36} />
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black uppercase leading-none">
            Cada proprietário vira uma oportunidade de médio e alto padrão.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[#415064]">
            A página separa o fluxo de captação de imóveis de terceiros do funil de compradores, mantendo a base de leads
            unificada para operação e email.
          </p>
        </section>
      </main>

      <footer className="bg-[#06192c] px-4 py-10 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <strong className="uppercase tracking-[0.18em]">Pinheiro Azul</strong>
          <span className="text-sm text-white/60">Venda com inteligência na Zona Leste.</span>
        </div>
      </footer>

      <FunnelDiagnosticModal
        open={diagnosticOpen}
        onOpenChange={setDiagnosticOpen}
        initialProfile="venda_imovel"
        sourcePage="/anuncie-seu-imovel"
      />
    </div>
  );
}
