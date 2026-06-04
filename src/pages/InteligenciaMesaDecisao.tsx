import React, { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  FileText,
  Home,
  Landmark,
  MessageSquare,
  Percent,
  Receipt,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const decisionCards = [
  {
    suit: "01",
    title: "Preco pedido",
    label: "Mercado",
    text: "Compara o valor anunciado com referencias reais de metro quadrado, liquidez e teto praticavel para a regiao.",
    icon: Scale,
  },
  {
    suit: "02",
    title: "Custos ocultos",
    label: "Transferencia",
    text: "Estima ITBI, registro, escritura e despesas que costumam aparecer depois da proposta aceita.",
    icon: Receipt,
  },
  {
    suit: "03",
    title: "Financiamento",
    label: "Renda",
    text: "Projeta parcela inicial, juros e comprometimento para saber se a compra cabe sem sufocar o caixa.",
    icon: Percent,
  },
  {
    suit: "04",
    title: "Pontos de risco",
    label: "Atencao",
    text: "Organiza alertas de contrato, reajustes, entrada, intermediarias e riscos que nao aparecem no anuncio.",
    icon: AlertTriangle,
  },
];

const regionalRows = [
  ["Analia Franco", "R$ 14.500"],
  ["Tatuape", "R$ 11.200"],
  ["Mooca", "R$ 9.800"],
  ["Vila Formosa", "R$ 8.500"],
  ["Carrao", "R$ 7.900"],
];

export default function InteligenciaMesaDecisao() {
  const [valorImovel, setValorImovel] = useState(550000);
  const [rendaMensal, setRendaMensal] = useState(14000);

  const custoITBI = valorImovel * 0.03;
  const custoRegistroEscritura = valorImovel * 0.015;
  const totalCustosOcultos = custoITBI + custoRegistroEscritura;
  const valorFinanciado = valorImovel * 0.8;
  const amortizacaoMensal = valorFinanciado / 360;
  const jurosPrimeiroMes = valorFinanciado * (0.105 / 12);
  const primeiraParcelaEst = amortizacaoMensal + jurosPrimeiroMes;
  const comprometeRendaPercent = rendaMensal > 0 ? (primeiraParcelaEst / rendaMensal) * 100 : 0;
  const riscoAlto = comprometeRendaPercent > 30;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

  const whatsappMessage = encodeURIComponent(
    `Ola! Quero colocar os numeros do imovel na mesa. Valor: ${formatCurrency(
      valorImovel
    )}. Renda familiar: ${formatCurrency(rendaMensal)}.`
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#15100b] text-stone-200 antialiased">
      <header className="sticky top-0 z-40 border-b border-amber-100/10 bg-[#15100b]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-sm border border-amber-200/30 bg-[#0b2f28] text-xs font-black text-amber-100 shadow-[0_0_0_4px_rgba(255,255,255,0.03)]">
              PA
            </span>
            <span>
              <span className="block text-sm font-bold uppercase tracking-[0.22em] text-stone-50">
                Inteligencia Imobiliaria
              </span>
              <span className="block text-xs text-amber-100/60">Analise antes da assinatura</span>
            </span>
          </a>
          <a
            href="#mesa"
            className="hidden rounded-sm border border-amber-200/25 bg-amber-100/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-100 transition hover:bg-amber-100 hover:text-[#15100b] sm:inline-flex"
          >
            Colocar numeros na mesa
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(26,92,78,0.55),transparent_42%),linear-gradient(135deg,rgba(255,255,255,0.05)_0_1px,transparent_1px)] bg-[size:auto,26px_26px]" />
          <div className="absolute inset-x-0 top-20 mx-auto h-[560px] max-w-5xl rounded-[48%] border border-amber-200/10 bg-[#07362e] shadow-[inset_0_0_80px_rgba(0,0,0,0.55),0_35px_120px_rgba(0,0,0,0.55)]" />

          <div className="relative mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
            <div className="max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-100">
                <ShieldCheck className="h-4 w-4" />
                Compra sem aposta
              </div>
              <h1 className="text-5xl font-black leading-[0.94] tracking-tight text-stone-50 md:text-7xl">
                Comprar imovel nao pode ser jogo de sorte.
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-stone-200/78">
                Antes de assinar, colocamos preco, renda, juros, impostos e riscos ocultos na mesa.
                Uma analise independente para voce decidir com numeros, nao com pressa.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#mesa"
                  className="inline-flex items-center justify-center rounded-sm bg-amber-100 px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#1d1308] shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition hover:bg-white"
                >
                  Colocar meus numeros na mesa
                  <ArrowRight className="ml-3 h-4 w-4" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-sm border border-stone-100/20 px-6 py-4 text-sm font-bold uppercase tracking-[0.16em] text-stone-100 transition hover:border-stone-100/50 hover:bg-stone-100/8"
                >
                  Pedir laudo por R$ 147
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <div className="rounded-[2rem] border-[12px] border-[#4a2d18] bg-[#0b493f] p-4 shadow-[0_45px_110px_rgba(0,0,0,0.5)]">
                <div className="rounded-[1.35rem] border border-amber-100/20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%),#07362e] p-5">
                  <div className="grid grid-cols-2 gap-4">
                    {decisionCards.map((card, index) => {
                      const Icon = card.icon;
                      return (
                        <div
                          key={card.title}
                          className={`min-h-[190px] rounded-xl border border-stone-950/10 bg-stone-50 p-4 text-[#23170d] shadow-xl ${
                            index === 1 ? "translate-y-5 rotate-2" : index === 2 ? "-rotate-2" : index === 3 ? "translate-y-4 -rotate-1" : "rotate-1"
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.16em] text-[#0b493f]">
                            <span>{card.suit}</span>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="mt-7">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8b5d2c]">{card.label}</p>
                            <h3 className="mt-2 text-2xl font-black leading-none">{card.title}</h3>
                            <p className="mt-4 text-sm leading-5 text-stone-700">{card.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-amber-100 bg-[#8b1e1e] text-center text-xs font-black uppercase leading-tight text-amber-50 shadow-lg">
                      R$ 147
                      <br />
                      fixos
                    </span>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-100 bg-[#122f7a] text-xs font-black text-stone-50 shadow-lg">
                      ITBI
                    </span>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-100 bg-[#174b2f] text-xs font-black text-stone-50 shadow-lg">
                      JUROS
                    </span>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-stone-100 bg-[#1f1f1f] text-xs font-black text-stone-50 shadow-lg">
                      RISCO
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="mesa" className="bg-[#f7f1e6] px-5 py-16 text-[#20160d] md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0b493f]">
                Mesa de decisao
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                Vire as cartas antes de comprometer seu patrimonio.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-stone-700">
                Ajuste os dois numeros que mais pesam na compra. A previa mostra se a decisao
                esta saudavel ou se existem custos invisiveis pedindo atencao.
              </p>

              <div className="mt-8 overflow-hidden rounded-sm border border-stone-300 bg-white">
                <div className="grid grid-cols-[1fr_auto] border-b border-stone-200 bg-stone-100 px-4 py-3 text-xs font-black uppercase tracking-[0.18em] text-stone-500">
                  <span>Base regional</span>
                  <span>Media m2</span>
                </div>
                {regionalRows.map(([bairro, valor]) => (
                  <div key={bairro} className="grid grid-cols-[1fr_auto] border-b border-stone-100 px-4 py-3 text-sm last:border-b-0">
                    <span className="font-bold">{bairro}</span>
                    <span className="font-black text-[#0b493f]">{valor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#d5c5aa] bg-[#fffaf0] p-5 shadow-[0_28px_70px_rgba(43,29,12,0.16)] md:p-7">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="rounded-xl bg-[#0b493f] p-5 text-stone-50">
                  <Label htmlFor="valor-imovel" className="text-xs font-black uppercase tracking-[0.18em] text-amber-100/80">
                    Valor do imovel
                  </Label>
                  <div className="mt-3 text-3xl font-black">{formatCurrency(valorImovel)}</div>
                  <input
                    id="valor-imovel"
                    type="range"
                    min={150000}
                    max={3000000}
                    step={25000}
                    value={valorImovel}
                    onChange={(event) => setValorImovel(Number(event.target.value))}
                    className="mt-6 w-full accent-amber-100"
                  />
                  <div className="mt-2 flex justify-between text-xs text-stone-50/60">
                    <span>150 mil</span>
                    <span>3 mi</span>
                  </div>
                </div>

                <div className="rounded-xl bg-[#4a2d18] p-5 text-stone-50">
                  <Label htmlFor="renda-familiar" className="text-xs font-black uppercase tracking-[0.18em] text-amber-100/80">
                    Renda familiar
                  </Label>
                  <div className="mt-3 text-3xl font-black">{formatCurrency(rendaMensal)}</div>
                  <input
                    id="renda-familiar"
                    type="range"
                    min={3000}
                    max={50000}
                    step={500}
                    value={rendaMensal}
                    onChange={(event) => setRendaMensal(Number(event.target.value))}
                    className="mt-6 w-full accent-amber-100"
                  />
                  <div className="mt-2 flex justify-between text-xs text-stone-50/60">
                    <span>3 mil</span>
                    <span>50 mil</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <DollarSign className="mb-5 h-5 w-5 text-[#0b493f]" />
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">Custos a vista</p>
                  <p className="mt-2 text-2xl font-black">{formatCurrency(totalCustosOcultos)}</p>
                  <p className="mt-3 text-sm leading-5 text-stone-600">ITBI, registro e escritura estimados.</p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-5">
                  <Landmark className="mb-5 h-5 w-5 text-[#0b493f]" />
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">Parcela inicial</p>
                  <p className="mt-2 text-2xl font-black">{formatCurrency(primeiraParcelaEst)}</p>
                  <p className="mt-3 text-sm leading-5 text-stone-600">Estimativa SAC para financiamento de 80%.</p>
                </div>
                <div className={`rounded-xl border p-5 ${riscoAlto ? "border-red-200 bg-red-50" : "border-emerald-200 bg-emerald-50"}`}>
                  {riscoAlto ? (
                    <AlertTriangle className="mb-5 h-5 w-5 text-red-700" />
                  ) : (
                    <CheckCircle2 className="mb-5 h-5 w-5 text-emerald-700" />
                  )}
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">Renda comprometida</p>
                  <p className={`mt-2 text-2xl font-black ${riscoAlto ? "text-red-800" : "text-emerald-800"}`}>
                    {comprometeRendaPercent.toFixed(1)}%
                  </p>
                  <p className="mt-3 text-sm leading-5 text-stone-700">
                    {riscoAlto ? "Acima do limite saudavel de 30%." : "Dentro de uma faixa mais defensavel."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#15100b] px-5 py-16 text-stone-100 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-100/70">
                O que entra no laudo
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                As cartas que precisam estar abertas antes da proposta.
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {decisionCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-2xl border border-stone-100/10 bg-stone-100/[0.04] p-6">
                    <div className="mb-8 flex items-center justify-between">
                      <span className="text-sm font-black text-amber-100">{card.suit}</span>
                      <Icon className="h-5 w-5 text-amber-100/70" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-400">{card.label}</p>
                    <h3 className="mt-3 text-2xl font-black">{card.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-stone-300">{card.text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[#f7f1e6] px-5 py-16 text-[#20160d] md:px-8 md:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0b493f]">
                Parecer independente
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                A decisao final nao vem de palpite.
              </h2>
              <p className="mt-5 text-lg leading-8 text-stone-700">
                O laudo organiza os dados e mostra onde a compra parece justa, onde precisa de reserva
                de caixa e onde a negociacao deve parar.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d5c5aa] bg-white p-7 shadow-[0_28px_70px_rgba(43,29,12,0.16)]">
              <div className="flex items-start gap-5 border-b border-stone-200 pb-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#0b493f] text-amber-100">
                  <FileText className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-stone-500">Laudo Pinheiro Azul</p>
                  <h3 className="mt-2 text-2xl font-black">Comprar, negociar ou recuar?</h3>
                </div>
              </div>
              <div className="grid gap-4 py-6 sm:grid-cols-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">Investimento</p>
                  <p className="mt-1 text-xl font-black">R$ 147</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">Entrega</p>
                  <p className="mt-1 text-xl font-black">ate 48h</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-stone-500">Modelo</p>
                  <p className="mt-1 text-xl font-black">isento</p>
                </div>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-sm bg-[#0b493f] px-6 py-5 text-sm font-black uppercase tracking-[0.16em] text-amber-100 transition hover:bg-[#07362e]"
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Iniciar analise do meu imovel
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-amber-100/10 bg-[#15100b] px-5 py-8 text-stone-500 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Inteligencia Imobiliaria. Pinheiro Azul.</p>
          <p>Comprar nao precisa ser na sorte.</p>
        </div>
      </footer>
    </div>
  );
}
