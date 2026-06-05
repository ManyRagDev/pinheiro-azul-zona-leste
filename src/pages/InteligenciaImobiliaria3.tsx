import React, { useState } from 'react';
import { MessageSquare, AlertTriangle } from 'lucide-react';

export default function InteligenciaImobiliaria3() {
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
  const isComprometimentoAlto = comprometeRendaPercent > 30;

  const protocolo = `PA-${new Date().getFullYear()}${String(Math.floor(valorImovel / 1000)).padStart(4, '0')}`;
  const hoje = new Date().toLocaleDateString('pt-BR');

  const fmt = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de solicitar a Análise de Viabilidade Imobiliária para um imóvel de ${fmt(valorImovel)}. Quero o Dossiê completo.`
  );
  const whatsappUrl = `https://wa.me/5511930418684?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-[#030712] text-[#9CA3AF] font-sans">

      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-sm border-b border-white/5 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 border border-[#00F2FE]/30 rounded-lg flex items-center justify-center text-[#00F2FE] font-bold text-[10px]">
              PA
            </div>
            <span className="text-white text-sm font-semibold tracking-wide">Pinheiro Azul</span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Falar com analista
          </a>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6">

        {/* ── Hero ── */}
        <section className="pt-20 pb-16 border-b border-white/5">
          <div className="inline-flex items-center gap-2 text-[10px] text-[#00F2FE] font-bold tracking-widest uppercase border border-[#00F2FE]/20 px-3 py-1.5 rounded-full mb-10">
            <span className="w-1.5 h-1.5 bg-[#00F2FE] rounded-full animate-pulse" />
            Análise de Viabilidade Imobiliária · Zona Leste SP
          </div>

          <div className="mb-5">
            <div className="text-7xl md:text-8xl font-black text-white tracking-tight leading-none mb-3">
              R$ 24.750
            </div>
            <p className="text-sm text-[#9CA3AF] leading-relaxed">
              É o que a maioria dos compradores de imóvel na Zona Leste paga sem saber,
              antes mesmo de pegar a chave.
            </p>
          </div>

          <p className="text-[#F9FAFB] text-lg leading-relaxed mb-10">
            ITBI, cartório, escritura, registro. Nenhum corretor coloca no anúncio.
            Nossa análise independente coloca cada número na mesa — antes de você assinar.
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all duration-200 shadow-[0_0_24px_rgba(16,185,129,0.25)]"
          >
            <MessageSquare className="w-4 h-4" />
            Solicitar Dossiê do Meu Imóvel — R$ 147
          </a>

          <p className="mt-4 text-[10px] text-[#9CA3AF]">
            Entregue em até 48h · Parecer independente · Sem interesse na venda
          </p>
        </section>

        {/* ── Três fatos ── */}
        <section className="py-16 border-b border-white/5">
          <p className="text-[10px] text-[#00F2FE] font-bold uppercase tracking-widest mb-8">
            O que o corretor não te contou
          </p>
          <div className="space-y-0">
            {[
              {
                n: "01",
                fact: "O ITBI não está no valor anunciado.",
                detail:
                  "Em São Paulo é 3% do valor venal, pago à vista na prefeitura antes da escritura. Num imóvel de R$ 550 mil, são R$ 16.500 que você precisa ter em caixa agora.",
              },
              {
                n: "02",
                fact: "O preço por m² pode estar acima do teto da rua.",
                detail:
                  "Corretores não comparam com transações reais. A análise confronta o valor pedido com o histórico de vendas registradas em cartório no mesmo bairro.",
              },
              {
                n: "03",
                fact: "A parcela do banco não é o custo do financiamento.",
                detail:
                  "No primeiro ano de SAC, você paga mais de 60% em juros. Um imóvel de R$ 550 mil financiado gera mais de R$ 57 mil em juros só no primeiro ano.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-6 py-7 border-b border-white/5 last:border-0">
                <span className="text-[10px] font-mono text-[#00F2FE] opacity-50 pt-0.5 w-6 shrink-0">
                  {item.n}
                </span>
                <div>
                  <p className="text-[#F9FAFB] font-semibold text-base mb-1.5 leading-snug">{item.fact}</p>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Calculadora → Prévia de Laudo ── */}
        <section className="py-16 border-b border-white/5">
          <p className="text-[10px] text-[#00F2FE] font-bold uppercase tracking-widest mb-2">
            Prévia do dossiê
          </p>
          <p className="text-sm text-[#9CA3AF] mb-10">
            Insira os dados do seu imóvel. Os números atualizam em tempo real.
          </p>

          {/* Sliders */}
          <div className="space-y-7 mb-10">
            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#9CA3AF] uppercase tracking-wider font-medium">Valor do imóvel</span>
                <span className="text-white font-bold font-mono">{fmt(valorImovel)}</span>
              </div>
              <input
                type="range" min={150000} max={3000000} step={25000}
                value={valorImovel}
                onChange={(e) => setValorImovel(Number(e.target.value))}
                className="w-full h-px bg-white/10 appearance-none cursor-pointer accent-[#00F2FE]"
              />
              <div className="flex justify-between text-[10px] text-[#9CA3AF]/50 font-mono">
                <span>R$ 150k</span><span>R$ 3M</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#9CA3AF] uppercase tracking-wider font-medium">Renda mensal familiar</span>
                <span className="text-white font-bold font-mono">{fmt(rendaMensal)}</span>
              </div>
              <input
                type="range" min={3000} max={50000} step={500}
                value={rendaMensal}
                onChange={(e) => setRendaMensal(Number(e.target.value))}
                className="w-full h-px bg-white/10 appearance-none cursor-pointer accent-[#00F2FE]"
              />
              <div className="flex justify-between text-[10px] text-[#9CA3AF]/50 font-mono">
                <span>R$ 3k</span><span>R$ 50k</span>
              </div>
            </div>
          </div>

          {/* Documento de laudo */}
          <div className="border border-white/10 rounded-2xl overflow-hidden">

            {/* Cabeçalho do documento */}
            <div className="bg-[#0B1329] px-6 py-4 border-b border-white/10 flex items-start justify-between">
              <div>
                <div className="text-[9px] text-[#00F2FE] font-mono font-bold tracking-widest uppercase">
                  Pinheiro Azul · Inteligência Imobiliária
                </div>
                <div className="text-[9px] text-[#9CA3AF] font-mono mt-0.5">
                  Estimativa Preliminar de Viabilidade
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] text-[#9CA3AF] font-mono">{protocolo}</div>
                <div className="text-[9px] text-[#9CA3AF] font-mono">{hoje}</div>
              </div>
            </div>

            {/* Linhas do documento */}
            <div className="px-6 py-5 font-mono text-[11px]">

              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-[#9CA3AF] uppercase tracking-wider">Valor do imóvel</span>
                <span className="text-white">{fmt(valorImovel)}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-[#9CA3AF] uppercase tracking-wider">ITBI estimado (3% · SP)</span>
                <span className="text-[#F43F5E]">{fmt(custoITBI)}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-[#9CA3AF] uppercase tracking-wider">Escritura + Registro (1,5%)</span>
                <span className="text-[#F43F5E]">{fmt(custoRegistroEscritura)}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-[#00F2FE]/20 bg-[#00F2FE]/5 -mx-6 px-6">
                <span className="text-[#00F2FE] uppercase tracking-wider font-bold">Total taxas obrigatórias</span>
                <span className="text-[#00F2FE] font-bold">{fmt(totalCustosOcultos)}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-[#9CA3AF] uppercase tracking-wider">Parcela inicial SAC (360x)</span>
                <span className="text-white">{fmt(primeiraParcelaEst)}</span>
              </div>

              <div className="flex justify-between py-3 border-b border-white/5">
                <span className="text-[#9CA3AF] uppercase tracking-wider">Comprometimento de renda</span>
                <span className={isComprometimentoAlto ? 'text-[#F43F5E] font-bold' : 'text-[#10B981] font-bold'}>
                  {comprometeRendaPercent.toFixed(1)}%{' '}
                  {isComprometimentoAlto ? '▲ ACIMA DO LIMITE' : '✓ DENTRO DO LIMITE'}
                </span>
              </div>

              {/* Linhas redigidas — conteúdo bloqueado */}
              <div className="mt-2 opacity-30 select-none space-y-0">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="uppercase tracking-wider">Análise regional de m² ············</span>
                  <span className="bg-white/20 text-transparent rounded px-6">██████</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="uppercase tracking-wider">Verificação jurídica do imóvel ···</span>
                  <span className="bg-white/20 text-transparent rounded px-6">██████</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="uppercase tracking-wider">Veredito final do analista ·········</span>
                  <span className="bg-white/20 text-transparent rounded px-6">██████</span>
                </div>
              </div>

              <p className="mt-5 pt-4 border-t border-white/10 text-[9px] text-[#9CA3AF] leading-relaxed">
                Estimativa preliminar baseada nos dados informados. O Dossiê completo inclui análise regional
                de precificação por m² registrado, verificação jurídica do endereço e veredito final
                assinado pelo analista responsável.
              </p>
            </div>
          </div>

          {isComprometimentoAlto && (
            <div className="mt-4 flex gap-2.5 text-[#F43F5E] border border-[#F43F5E]/20 bg-[#F43F5E]/5 rounded-xl p-4">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">
                Comprometimento acima de 30%. Alta probabilidade de reprovação de crédito bancário.
                O Dossiê traz cenários de entrada e alternativas de financiamento viáveis.
              </p>
            </div>
          )}

          <div className="mt-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold w-full py-4 rounded-2xl text-sm transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Quero o Dossiê Completo — R$ 147
            </a>
            <p className="text-center text-[10px] text-[#9CA3AF] mt-2">
              Entregue em até 48h após o contato
            </p>
          </div>
        </section>

        {/* ── O que está no dossiê ── */}
        <section className="py-16 border-b border-white/5">
          <p className="text-[10px] text-[#00F2FE] font-bold uppercase tracking-widest mb-8">
            O que está no dossiê
          </p>
          <div className="space-y-0">
            {[
              {
                n: "01",
                title: "Preço de mercado real",
                body: "Comparação do valor pedido com transações registradas em cartório na mesma rua ou bairro. Revela se você está pagando acima do teto real de mercado.",
              },
              {
                n: "02",
                title: "Mapa completo de custos",
                body: "ITBI, escritura, registro, avaliação bancária e taxas acessórias detalhadas. Sem surpresa depois de aceitar a proposta.",
              },
              {
                n: "03",
                title: "Simulação real de financiamento",
                body: "Parcelas SAC e Price, comprometimento de renda, seguros habitacionais e projeção do saldo devedor ao longo dos anos.",
              },
              {
                n: "04",
                title: "Pontos de atenção e riscos",
                body: "Reajustes de INCC, cláusulas ocultas, saúde financeira da incorporadora e riscos condominiais mapeados.",
              },
              {
                n: "05",
                title: "Veredito final",
                body: "Aprovado, Com Ressalvas ou Reprovado. Decisão técnica livre de pressão de corretor. Assinada pelo analista responsável.",
              },
            ].map((item) => (
              <div key={item.n} className="flex gap-6 py-6 border-b border-white/5 last:border-0">
                <span className="text-[10px] font-mono text-[#00F2FE] opacity-50 pt-0.5 w-6 shrink-0">
                  {item.n}
                </span>
                <div>
                  <p className="text-[#F9FAFB] font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-[#9CA3AF] text-xs leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Presença humana ── */}
        <section className="py-16 border-b border-white/5">
          <div className="flex gap-6 items-start">
            <div className="w-14 h-14 border border-[#00F2FE]/20 bg-[#0B1329] rounded-2xl flex items-center justify-center text-[#00F2FE] font-black text-lg shrink-0">
              MP
            </div>
            <div>
              <div className="text-[9px] text-[#00F2FE] font-bold tracking-widest uppercase mb-2">
                Analista Responsável
              </div>
              <h3 className="text-white font-bold text-sm mb-0.5">M. Pinheiro</h3>
              <p className="text-[10px] text-[#9CA3AF] mb-4 uppercase tracking-wider">
                Análise de Viabilidade Imobiliária · Zona Leste SP
              </p>
              <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-lg">
                Antes de você assinar qualquer proposta, eu assino o meu veredito.
                A análise é independente — eu não ganho comissão se você comprar ou não.
                Meu interesse é que você tome a decisão certa com os números certos na mesa.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA final ── */}
        <section className="py-20 text-center">
          <p className="text-[#9CA3AF] text-sm mb-2">Tem um imóvel específico em mente?</p>
          <h2 className="text-white font-bold text-2xl md:text-3xl mb-8 leading-tight">
            Mande o link do anúncio.<br />
            Em 48h você tem o veredito.
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#10B981] hover:bg-[#059669] text-white font-bold px-10 py-5 rounded-2xl text-sm transition-all duration-200 shadow-[0_0_32px_rgba(16,185,129,0.2)]"
          >
            <MessageSquare className="w-4 h-4" />
            Solicitar Dossiê — R$ 147
          </a>
          <p className="mt-4 text-[10px] text-[#9CA3AF]">
            Parecer técnico · Independente · Sem interesse na venda
          </p>
        </section>

      </main>

      {/* Sticky WhatsApp mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#030712]/90 backdrop-blur-sm border-t border-white/5 lg:hidden z-40">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold w-full py-3.5 rounded-xl text-sm transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Solicitar Dossiê — R$ 147
        </a>
      </div>

      <footer className="border-t border-white/5 py-8 px-6 pb-24 lg:pb-8">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-[#9CA3AF]">
          <span>© {new Date().getFullYear()} Pinheiro Azul · Inteligência Imobiliária</span>
          <span>Dossiê técnico opinativo de viabilidade financeira</span>
        </div>
      </footer>

    </div>
  );
}
