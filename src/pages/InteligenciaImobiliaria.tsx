import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  Percent, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Layers, 
  User, 
  MessageSquare,
  Search,
  Calculator,
  Compass,
  FileCheck,
  Zap,
  ArrowUpRight,
  TrendingDown,
  Info,
  Calendar,
  Grid,
  ChevronLeft,
  ChevronRight,
  SmartPhone
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function InteligenciaImobiliaria() {
  // Shared States (Both layouts)
  const [valorImovel, setValorImovel] = useState<number>(550000);
  const [rendaMensal, setRendaMensal] = useState<number>(14000);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Calculations
  const custoITBI = valorImovel * 0.03; // ITBI 3% em SP
  const custoRegistroEscritura = valorImovel * 0.015; // Escritura/Registro ~1.5%
  const totalCustosOcultos = custoITBI + custoRegistroEscritura;
  
  // Estimativa de primeira parcela SAC (80% financiado, 10.5% a.a.)
  const valorFinanciado = valorImovel * 0.8;
  const amortizacaoMensal = valorFinanciado / 360; // 30 anos (360 parcelas)
  const jurosPrimeiroMes = valorFinanciado * (0.105 / 12);
  const primeiraParcelaEst = amortizacaoMensal + jurosPrimeiroMes;
  const comprometeRendaPercent = rendaMensal > 0 ? (primeiraParcelaEst / rendaMensal) * 100 : 0;
  const isComprometimentoAlto = comprometeRendaPercent > 30;

  // Juros acumulados no 1º ano
  const jurosAcumuladosPrimeiroAno = valorFinanciado * 0.105;

  // Active Tab for Manila Folder Preview (Desktop)
  const [activeFolderTab, setActiveFolderTab] = useState<number>(0);

  // Mobile App Navigation States
  const [activeMobileTab, setActiveMobileTab] = useState<number>(0); // 0: Início, 1: Scanner, 2: Laudo, 3: Auditor
  const [mobileCardIndex, setMobileCardIndex] = useState<number>(0); // Swipe index for Report preview on mobile

  const handleStartScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      if (activeMobileTab !== 1) {
        // Se disparado no desktop
        const scannerSection = document.getElementById('results-dashboard');
        if (scannerSection) {
          scannerSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 2000);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(val);
  };

  const adjustValor = (amount: number) => {
    setValorImovel(prev => Math.max(150000, Math.min(3000000, prev + amount)));
  };

  const adjustRenda = (amount: number) => {
    setRendaMensal(prev => Math.max(3000, Math.min(50000, prev + amount)));
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Gostaria de agendar a Análise de Viabilidade Imobiliária do meu imóvel de ${formatCurrency(valorImovel)}. Quero saber se cada número está correto.`
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMessage}`; // Substituir pelo WhatsApp real da Pinheiro Azul

  const folders = [
    {
      code: "01_MARKET_CMP",
      title: "Regional",
      tag: "Comparação de m²",
      headline: "O valor pedido condiz com o mercado real?",
      desc: "Análise técnica do preço por metro quadrado do imóvel anunciado em comparação com as transações registradas em cartório e médias de liquidez dos bairros como Tatuapé, Mooca e Vila Formosa. Identifica se o valor pedido está acima do teto real de mercado.",
      metric: "Métrica Regional",
      val: "Transações em Cartório",
      details: "Evita que você compre com preço inflacionado sob o calor emocional."
    },
    {
      code: "02_HIDDEN_FEE",
      title: "Custos Ocultos",
      tag: "Impostos & Registro",
      headline: "Provisione taxas ocultas de transferência imobiliária",
      desc: "Mapeamento detalhado dos emolumentos cartoriais, ITBI, taxas de avaliação bancária e taxas acessórias exigidas para efetivação jurídica. Sem isso, a compra trava e você corre risco de quebra de contrato por falta de liquidez.",
      metric: "Estimativa Oculta",
      val: "4.5% a 6% do valor",
      details: "Saber exatamente a reserva de caixa obrigatória antes da assinatura."
    },
    {
      code: "03_CASH_FLOW",
      title: "Comprometimento",
      tag: "Amortização SAC/Price",
      headline: "Simulação real da curva de parcelamento",
      desc: "Simulamos as parcelas do primeiro ao último mês usando juros reais das principais instituições bancárias. Medimos o comprometimento saudável da renda familiar e o impacto dos seguros habitacionais incidentes.",
      metric: "Segurança de Renda",
      val: "Limite de 30% Bruto",
      details: "Evita desespero financeiro ou risco de perder o imóvel no meio do financiamento."
    },
    {
      code: "04_INFLATION",
      title: "Atenção & Riscos",
      tag: "INCC / Reajustes",
      headline: "O gargalo oculto de imóveis na planta ou parcelas intermediárias",
      desc: "Identificamos cláusulas de reajustes indexadas ao INCC e IGPM que inflacionam o saldo devedor. Mapeamos despesas condominiais extraordinárias conhecidas e riscos associados à saúde financeira da incorporadora.",
      metric: "Indexador Crítico",
      val: "Projeção INCC/Mês",
      details: "Saber se as parcelas intermediárias caberão no orçamento após reajustes."
    },
    {
      code: "05_VERDICT",
      title: "Veredito",
      tag: "Parecer Isento",
      headline: "A opinião honesta do especialista em dados",
      desc: "Sem pressões de corretores de plantão. Nosso veredito final categoriza a compra em: Aprovado, Com Ressalvas Cruciais (e quais são) ou Reprovado Comercial. Decisão pura com base em dados.",
      metric: "Recomendação",
      val: "Selo de Recomendação",
      details: "Opinião livre de comissão de venda para proteger seu capital."
    }
  ];

  return (
    <div className="min-h-screen bg-[#02050b] text-[#93a4b9] font-mono selection:bg-[#00F2FE]/30 selection:text-white relative overflow-x-hidden">
      
      {/* ==================================================================== */}
      {/* 📱 NATIVE APP-LIKE MOBILE LAYOUT (ONLY ACTIVE FOR MOBILE/TABLETS) */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 lg:hidden flex flex-col justify-between overflow-hidden bg-[#02050b] z-50">
        
        {/* Mobile Top Bar */}
        <div className="border-b border-[#00F2FE]/15 px-4 py-3 flex items-center justify-between bg-[#02050b] z-30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border border-[#00F2FE]/30 bg-[#0B1329] flex items-center justify-center text-[#00F2FE] font-bold text-[10px]">
              PA
            </div>
            <span className="font-bold text-[10px] tracking-widest text-white uppercase">
              INTELIGÊNCIA IMOBILIÁRIA
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-[8px] text-[#00F2FE]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-pulse" />
            <span>[TELEMETRIA: ATIVA]</span>
          </div>
        </div>

        {/* Dynamic Mobile View Switcher (Scroll locked viewport content) */}
        <div className="flex-grow overflow-y-auto p-4 pb-24 scrollbar-none relative">
          
          {/* Subtle background grids inside mobile screen */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,242,254,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(0,242,254,0.01)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMobileTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="h-full flex flex-col justify-between"
            >
              
              {/* Tab 0: Home / Início */}
              {activeMobileTab === 0 && (
                <div className="space-y-6 flex flex-col justify-center min-h-[70vh] py-6">
                  
                  {/* Decorative rotating telemetry circle */}
                  <div className="flex justify-center py-2">
                    <div className="w-20 h-20 rounded-full border border-dashed border-[#00F2FE]/30 flex items-center justify-center relative animate-spin" style={{ animationDuration: '60s' }}>
                      <Compass className="w-10 h-10 text-[#00F2FE]/60" />
                      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#00F2FE] rounded-none" />
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 border border-[#00F2FE]/20 bg-[#0B1329]/60">
                      <span className="text-[9px] text-[#00F2FE] uppercase tracking-wider font-semibold">
                        [ AUDITORIA PATRIMONIAL INDEPENDENTE ]
                      </span>
                    </div>

                    <h1 className="text-2xl font-black text-white leading-tight uppercase">
                      Saiba tudo sobre o imóvel que quer comprar.{" "}
                      <span className="text-[#00F2FE]">Cada número importa.</span>
                    </h1>

                    <p className="text-zinc-400 text-xs leading-relaxed font-sans px-4">
                      Comprar imóvel é uma grande decisão. Nossa análise coloca todos os números na mesa pra você decidir com segurança.
                    </p>
                  </div>

                  <div className="border border-zinc-800 bg-[#0B1329]/50 p-4 text-[10px] space-y-2">
                    <div className="flex justify-between border-b border-zinc-800 pb-1.5 font-bold text-white">
                      <span>Média Regional Tatuapé</span>
                      <span className="text-[#00F2FE]">R$ 11.200 /m²</span>
                    </div>
                    <div className="text-zinc-400 font-sans leading-normal">
                      Mapeamos o mercado e custos invisíveis. Auditoria concisa livre de comissão por apenas **R$ 147**.
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <Button 
                      onClick={() => setActiveMobileTab(1)}
                      className="w-full rounded-none bg-gradient-to-r from-[#00F2FE] to-emerald-500 text-slate-950 font-bold py-6 uppercase tracking-wider text-xs shadow-[0_4px_20px_rgba(0,242,254,0.25)] border-0"
                    >
                      Iniciar Varredura de Riscos
                    </Button>
                  </div>

                </div>
              )}

              {/* Tab 1: Scanner */}
              {activeMobileTab === 1 && (
                <div className="space-y-6 py-4">
                  <div className="border border-zinc-800 bg-[#0B1329] p-5 relative overflow-hidden">
                    <div className="text-[10px] font-bold text-[#00F2FE] uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4 flex items-center">
                      <Calculator className="w-3.5 h-3.5 mr-1.5" /> [ SCANNER DE CUSTOS & CRÉDITO ]
                    </div>

                    <div className="space-y-6">
                      
                      {/* Valor do Imóvel Input + Helpers */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase text-zinc-400">
                          <span>Valor do Imóvel:</span>
                          <span className="text-white font-bold">{formatCurrency(valorImovel)}</span>
                        </div>
                        <input
                          type="range"
                          min={150000}
                          max={3000000}
                          step={25000}
                          value={valorImovel}
                          onChange={(e) => setValorImovel(Number(e.target.value))}
                          disabled={isScanning}
                          className="w-full h-1 bg-zinc-950 appearance-none cursor-pointer accent-[#00F2FE]"
                        />
                        {/* Incrementor buttons for mobile thumb */}
                        <div className="flex gap-2 justify-between">
                          <button
                            type="button"
                            onClick={() => adjustValor(-50000)}
                            disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#00F2FE]/40 bg-black/40 text-zinc-400"
                          >
                            [- 50K]
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustValor(50000)}
                            disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#00F2FE]/40 bg-black/40 text-zinc-400"
                          >
                            [+ 50K]
                          </button>
                        </div>
                      </div>

                      {/* Renda Familiar Input + Helpers */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase text-zinc-400">
                          <span>Renda Familiar:</span>
                          <span className="text-white font-bold">{formatCurrency(rendaMensal)}</span>
                        </div>
                        <input
                          type="range"
                          min={3000}
                          max={50000}
                          step={500}
                          value={rendaMensal}
                          onChange={(e) => setRendaMensal(Number(e.target.value))}
                          disabled={isScanning}
                          className="w-full h-1 bg-zinc-950 appearance-none cursor-pointer accent-[#00F2FE]"
                        />
                        {/* Incrementor buttons for mobile thumb */}
                        <div className="flex gap-2 justify-between">
                          <button
                            type="button"
                            onClick={() => adjustRenda(-1000)}
                            disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#00F2FE]/40 bg-black/40 text-zinc-400"
                          >
                            [- 1K]
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustRenda(1000)}
                            disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#00F2FE]/40 bg-black/40 text-zinc-400"
                          >
                            [+ 1K]
                          </button>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleStartScan()}
                        disabled={isScanning}
                        className="w-full rounded-none bg-black hover:bg-[#00F2FE] text-[#00F2FE] hover:text-slate-950 border border-[#00F2FE]/30 py-5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                      >
                        {isScanning ? "PROJETANDO VALORES..." : "[ Rodar Scanner ]"}
                      </Button>

                    </div>

                    {/* Mobile Scanning screen overlay */}
                    <AnimatePresence>
                      {isScanning && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#02050b]/98 z-20 flex flex-col items-center justify-center space-y-4"
                        >
                          <div className="w-32 h-0.5 bg-zinc-900 overflow-hidden relative">
                            <motion.div 
                              initial={{ left: '-100%' }}
                              animate={{ left: '100%' }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute top-0 bottom-0 w-16 bg-[#00F2FE]"
                            />
                          </div>
                          <span className="text-[9px] text-[#00F2FE] tracking-widest uppercase animate-pulse">
                            [ TELEMETRIA EM CURSO ]
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Results Dashboard on Mobile */}
                  {showResults && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      {/* Metric cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#0B1329] border border-zinc-800 p-4">
                          <span className="text-[8px] text-zinc-500 uppercase block font-bold">Custos Extra Inicial</span>
                          <span className="text-base font-black text-white mt-1 block">{formatCurrency(totalCustosOcultos)}</span>
                          <span className="text-[7px] text-[#F43F5E] block mt-1 leading-none">ITBI e Cartório à vista.</span>
                        </div>
                        <div className={`bg-[#0B1329] border p-4 ${isComprometimentoAlto ? 'border-[#F43F5E]/30' : 'border-zinc-800'}`}>
                          <span className="text-[8px] text-zinc-500 uppercase block font-bold">Renda Comprometida</span>
                          <span className={`text-base font-black mt-1 block ${isComprometimentoAlto ? 'text-[#F43F5E]' : 'text-[#10B981]'}`}>
                            {comprometeRendaPercent.toFixed(0)}%
                          </span>
                          <span className="text-[7px] text-zinc-400 block mt-1 leading-none">
                            Parcela SAC: {formatCurrency(primeiraParcelaEst)}
                          </span>
                        </div>
                      </div>

                      {/* SVG Chart tailored vertically for Mobile screen width */}
                      <div className="bg-[#0B1329] border border-zinc-800 p-4">
                        <span className="text-[8px] font-bold text-white block mb-3 uppercase tracking-wider">Métricas Comparadas</span>
                        <div className="flex justify-center bg-black/30 border border-zinc-900 py-3 px-1">
                          <svg width="100%" height="110" viewBox="0 0 300 110" preserveAspectRatio="none">
                            {(() => {
                              const h1 = 80;
                              const h2 = Math.max(15, Math.min(80, (totalCustosOcultos / valorImovel) * 180));
                              const h3 = Math.max(15, Math.min(80, (jurosAcumuladosPrimeiroAno / valorImovel) * 110));

                              return (
                                <>
                                  {/* Bar 1 */}
                                  <rect x="25" y={90 - h1} width="35" height={h1} fill="#1e293b" stroke="#475569" />
                                  <text x="42.5" y={80 - h1} textAnchor="middle" fill="#94a3b8" fontSize="8" fontWeight="bold">Nominal</text>
                                  <text x="42.5" y="100" textAnchor="middle" fill="#64748b" fontSize="7">MÓVEL</text>

                                  {/* Bar 2 */}
                                  <rect x="125" y={90 - h2} width="35" height={h2} fill="rgba(244,63,94,0.1)" stroke="#f43f5e" />
                                  <text x="142.5" y={80 - h2} textAnchor="middle" fill="#f43f5e" fontSize="7" fontWeight="bold">{formatCurrency(totalCustosOcultos)}</text>
                                  <text x="142.5" y="100" textAnchor="middle" fill="#64748b" fontSize="7">TAXAS</text>

                                  {/* Bar 3 */}
                                  <rect x="225" y={90 - h3} width="35" height={h3} fill="rgba(0,242,254,0.05)" stroke="#00f2fe" />
                                  <text x="242.5" y={80 - h3} textAnchor="middle" fill="#00f2fe" fontSize="7" fontWeight="bold">{formatCurrency(jurosAcumuladosPrimeiroAno)}</text>
                                  <text x="242.5" y="100" textAnchor="middle" fill="#64748b" fontSize="7">JUROS A1</text>
                                </>
                              );
                            })()}
                          </svg>
                        </div>
                      </div>

                      {/* Warnings alert for Mobile */}
                      {isComprometimentoAlto && (
                        <div className="border border-[#F43F5E]/30 bg-[#F43F5E]/5 p-3.5 flex items-start space-x-2 text-[#F43F5E]">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="text-[9px] font-sans leading-normal">
                            **ALERTA DE PARCELA:** O comprometimento ultrapassa 30% da renda informada. Alta chance de o banco recusar o crédito ou sobrecarregar seu orçamento mensal.
                          </div>
                        </div>
                      )}

                      {/* Direct WhatsApp Call-to-action */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold uppercase tracking-wider text-[10px] transition-colors"
                      >
                        <MessageSquare className="w-4 h-4 mr-1.5" /> Encomendar Laudo Completo R$ 147
                      </a>

                    </motion.div>
                  )}

                </div>
              )}

              {/* Tab 2: Relatório (Tinder-Style Card Stack / Carousel) */}
              {activeMobileTab === 2 && (
                <div className="space-y-6 py-4 flex flex-col justify-between min-h-[68vh]">
                  
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
                      [ PRÉVIA DO RELATÓRIO PDF ]
                    </span>
                    <span className="text-[9px] text-zinc-600 block">
                      Deslize lateralmente para inspecionar os tópicos da auditoria.
                    </span>
                  </div>

                  {/* Card Stack Preview */}
                  <div className="relative w-full h-[280px] flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                      {folders.map((folder, idx) => {
                        // Only show active and next card for stack visual
                        if (idx !== mobileCardIndex) return null;

                        return (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.95, y: 5, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: -5, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-x-0 h-full bg-[#030712] border border-zinc-800 p-6 flex flex-col justify-between shadow-2xl relative"
                            style={{ borderRadius: '16px' }}
                          >
                            {/* Manila Folder Tab effect */}
                            <div className="absolute top-[-10px] left-6 bg-[#030712] border-t border-x border-zinc-800 h-[11px] px-3 text-[7px] font-bold text-[#00F2FE] tracking-widest" style={{ borderRadius: '4px 4px 0 0' }}>
                              {folder.code}
                            </div>

                            <div className="space-y-3 pt-2">
                              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">
                                  {folder.tag}
                                </span>
                                <span className="text-[8px] text-[#00F2FE] font-bold">
                                  Pág {idx + 1} de 5
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-white uppercase tracking-tight">
                                {folder.headline}
                              </h4>
                              <p className="text-[#849bb4] text-[10px] leading-relaxed font-sans">
                                {folder.desc}
                              </p>
                            </div>

                            <div className="border-t border-zinc-900 pt-3 flex justify-between text-[8px]">
                              <div>
                                <span className="text-zinc-600 block uppercase">Metodologia</span>
                                <span className="text-white font-bold mt-0.5 block">{folder.val}</span>
                              </div>
                              <div className="text-right">
                                <span className="text-zinc-600 block uppercase">Finalidade</span>
                                <span className="text-zinc-400 mt-0.5 block">{folder.details}</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Manual Arrow Buttons for Card Control */}
                  <div className="flex items-center justify-between px-6 pt-2">
                    <button
                      type="button"
                      disabled={mobileCardIndex === 0}
                      onClick={() => setMobileCardIndex(p => Math.max(0, p - 1))}
                      className="w-10 h-10 border border-zinc-800 bg-[#0B1329] flex items-center justify-center text-zinc-400 disabled:opacity-30 disabled:pointer-events-none hover:text-white"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    <span className="text-[9px] text-zinc-500 font-bold uppercase">
                      PÁGINA {mobileCardIndex + 1} / 5
                    </span>

                    <button
                      type="button"
                      disabled={mobileCardIndex === folders.length - 1}
                      onClick={() => setMobileCardIndex(p => Math.min(folders.length - 1, p + 1))}
                      className="w-10 h-10 border border-zinc-800 bg-[#0B1329] flex items-center justify-center text-zinc-400 disabled:opacity-30 disabled:pointer-events-none hover:text-white"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              )}

              {/* Tab 3: Auditor */}
              {activeMobileTab === 3 && (
                <div className="space-y-6 py-4 flex flex-col justify-between min-h-[68vh]">
                  
                  <div className="border border-zinc-800 bg-[#0B1329] p-5 relative overflow-hidden text-center space-y-4">
                    {/* Retro Stamp */}
                    <div className="absolute right-[-10px] top-[-10px] w-20 h-20 border-2 border-dashed border-[#10B981]/20 text-[#10B981]/25 text-[8px] flex items-center justify-center rounded-full rotate-12 select-none pointer-events-none uppercase font-bold">
                      VALIDADO // ISENTO
                    </div>

                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#00F2FE] to-emerald-500 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full rounded-[14px] bg-zinc-950 flex items-center justify-center text-zinc-700">
                        <Compass className="w-8 h-8 text-zinc-600" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-[#00F2FE] font-bold tracking-widest uppercase">
                        Sócio Responsável
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase">Emanuel & Time Pinheiro Azul</h3>
                      <p className="text-zinc-500 text-[8px] uppercase">
                        Auditoria de Dados & Estratégia de Ativos
                      </p>
                    </div>

                    <p className="text-[#849bb4] text-[10px] leading-relaxed font-sans text-left">
                      A nossa análise de viabilidade atua sob o modelo independente: não intermediamos a comissão de corretagem deste imóvel analisado. Cobramos uma taxa fixa de R$ 147 pelo laudo escrito, garantindo total neutralidade e fidelidade aos números do seu capital.
                    </p>

                    <div className="flex justify-center gap-1.5 pt-2">
                      <span className="text-[8px] text-zinc-400 bg-black border border-zinc-800 px-2 py-0.5 uppercase">
                        ZL ESPECIALISTA
                      </span>
                      <span className="text-[8px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 font-bold uppercase">
                        ISENTO DE COMISSÃO
                      </span>
                    </div>

                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full py-4.5 bg-emerald-500 text-slate-950 font-bold uppercase tracking-wider text-[10px] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 mr-1.5" /> Falar com o Consultor no WhatsApp
                  </a>

                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Mobile Bottom Navigation Bar (Glassmorphic native-app bar) */}
        <div className="fixed bottom-4 left-4 right-4 h-16 bg-[#0B1329]/80 backdrop-blur-lg border border-[#00F2FE]/20 rounded-2xl flex items-center justify-around px-2 z-40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          
          {/* Tab 0 button */}
          <button
            onClick={() => setActiveMobileTab(0)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all ${activeMobileTab === 0 ? 'text-[#00F2FE]' : 'text-zinc-500'}`}
          >
            <Compass className={`w-5 h-5 transition-transform ${activeMobileTab === 0 ? 'scale-110 shadow-[0_0_10px_rgba(0,242,254,0.3)]' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Início</span>
          </button>

          {/* Tab 1 button */}
          <button
            onClick={() => setActiveMobileTab(1)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all ${activeMobileTab === 1 ? 'text-[#00F2FE]' : 'text-zinc-500'}`}
          >
            <Calculator className={`w-5 h-5 transition-transform ${activeMobileTab === 1 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Scanner</span>
          </button>

          {/* Tab 2 button */}
          <button
            onClick={() => setActiveMobileTab(2)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all ${activeMobileTab === 2 ? 'text-[#00F2FE]' : 'text-zinc-500'}`}
          >
            <FileCheck className={`w-5 h-5 transition-transform ${activeMobileTab === 2 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Laudo</span>
          </button>

          {/* Tab 3 button */}
          <button
            onClick={() => setActiveMobileTab(3)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all ${activeMobileTab === 3 ? 'text-[#00F2FE]' : 'text-zinc-500'}`}
          >
            <User className={`w-5 h-5 transition-transform ${activeMobileTab === 3 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Auditor</span>
          </button>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 🖥️ DESKTOP LAYOUT (HIDDEN ON MOBILE/TABLET BREAKPOINTS - INTACT) */}
      {/* ==================================================================== */}
      <div className="hidden lg:block">
        
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-[#02050b]/80 backdrop-blur-md border-b border-[#00F2FE]/15 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 border border-[#00F2FE]/30 bg-[#0B1329] flex items-center justify-center text-[#00F2FE] font-bold text-xs shadow-[0_0_12px_rgba(0,242,254,0.2)]">
                [PA]
              </div>
              <div>
                <span className="font-bold text-sm tracking-widest text-white uppercase block">
                  INTEGRIDADE IMOBILIÁRIA
                </span>
                <span className="text-[9px] text-[#00F2FE] block tracking-wide">
                  AUDITORIA DE DADOS PATRIMONIAIS
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-1.5 text-xs text-zinc-500">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Conexão Segura com Banco de Dados</span>
              </div>
              <a
                href="#simulador"
                className="px-4 py-2 border border-[#00F2FE]/30 rounded-none bg-[#00F2FE]/5 hover:bg-[#00F2FE]/20 text-[#00F2FE] text-xs font-semibold tracking-wider transition-colors"
              >
                [ACESSAR SCANNER]
              </a>
            </div>
          </div>
        </header>

        {/* Decorative Blueprint elements */}
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,242,254,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(0,242,254,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,242,254,0.03)_2px,transparent_2px),linear-gradient(to_right,rgba(0,242,254,0.03)_2px,transparent_2px)] bg-[size:150px_150px] pointer-events-none" />

        {/* Main Content Layout */}
        <main className="max-w-7xl mx-auto px-6 pt-16 relative z-10 lg:grid lg:grid-cols-12 lg:gap-12 min-h-screen">
          
          {/* Left Column (Console) */}
          <section 
            className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto flex flex-col justify-between mb-16 lg:mb-0"
            style={{ scrollbarWidth: 'none' }}
          >
            <div className="space-y-8 relative">
              <div className="absolute -left-6 top-16 text-8xl font-black text-transparent opacity-5 select-none pointer-events-none tracking-widest leading-none w-full uppercase" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>
                CADA NUMERO IMPORTA
              </div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 border border-[#00F2FE]/20 bg-[#0B1329]/80 text-[#00F2FE]">
                <span className="w-2 h-2 bg-[#00F2FE] animate-pulse rounded-none" />
                <span className="text-[10px] tracking-wider uppercase font-semibold">
                  Socio Técnico: Emanuel // Pinheiro Azul
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-none uppercase space-y-2">
                <span>Saiba tudo sobre o</span>
                <span className="bg-gradient-to-r from-[#00F2FE] to-[#10B981] bg-clip-text text-transparent block">
                  Imóvel que quer comprar.
                </span>
              </h1>

              <p className="text-[#849bb4] text-sm leading-relaxed max-w-md font-sans">
                Comprar imóvel é uma grande decisão. Nossa análise coloca todos os números na mesa pra você decidir com segurança.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">AUDITORIA INDEPENDENTE:</span>
                <span className="text-lg font-bold text-white uppercase tracking-wider bg-[#0B1329] border border-zinc-800 px-3 py-1 text-xs">
                  R$ 147 fixos
                </span>
              </div>
            </div>

            {/* Local Telemetry */}
            <div className="border border-zinc-800/80 bg-[#0B1329]/60 p-5 mt-8 lg:mt-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#00F2FE]" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#00F2FE]" />

              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span className="text-[10px] font-bold text-white tracking-widest uppercase flex items-center">
                  <Grid className="w-3.5 h-3.5 mr-1 text-[#00F2FE]" /> Telemetria Regional (SP - ZL)
                </span>
                <span className="text-[9px] text-[#00F2FE]">ATUALIZADO // JUN 2026</span>
              </div>

              <div className="text-[10px] space-y-1.5">
                <div className="flex justify-between border-b border-zinc-800/40 pb-1.5 text-zinc-500 font-semibold">
                  <span>LOCALIZAÇÃO (ZL)</span>
                  <span>MÉDIA m² REGISTRADO</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>01. ANÁLIA FRANCO</span>
                  <span className="text-white font-bold">R$ 14.500</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>02. TATUAPÉ</span>
                  <span className="text-[#00F2FE] font-bold">R$ 11.200</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>03. MOOCA</span>
                  <span className="text-white font-bold">R$ 9.800</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>04. VILA FORMOSA</span>
                  <span className="text-white font-bold">R$ 8.500</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>05. CARRÃO</span>
                  <span className="text-white font-bold">R$ 7.900</span>
                </div>
              </div>
              
              <p className="text-[8px] text-zinc-500 mt-4 leading-normal font-sans">
                *Valores reais obtidos a partir de base histórica de transações e anúncios locais de amostragem.
              </p>
            </div>
          </section>

          {/* Right Column (Scroll Panels) */}
          <section className="lg:col-span-7 space-y-16 pb-24 relative">

            {/* Panel A: Scanner Cockpit */}
            <div id="simulador" className="scroll-mt-24 border border-zinc-800 bg-[#0B1329] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#00F2FE]/40" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#00F2FE]/40" />
              <div className="absolute right-6 top-6 text-zinc-800 text-xs select-none">[PANEL_CTR-99]</div>

              <div className="border-b border-zinc-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center">
                  <Search className="w-4 h-4 mr-2 text-[#00F2FE]" /> Scanner de Viabilidade Financeira
                </h2>
                <p className="text-[10px] text-zinc-500 mt-1">
                  Ajuste os parâmetros físicos para auditar o estouro de juros e custos invisíveis.
                </p>
              </div>

              <form onSubmit={handleStartScan} className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <Label htmlFor="range-valor-d" className="text-zinc-300 uppercase tracking-widest font-mono">
                      Valor Nominal do Imóvel:
                    </Label>
                    <span className="text-[#00F2FE] font-bold text-sm bg-black px-2 py-0.5 border border-zinc-800">
                      {formatCurrency(valorImovel)}
                    </span>
                  </div>
                  <input
                    id="range-valor-d"
                    type="range"
                    min={150000}
                    max={3000000}
                    step={25000}
                    value={valorImovel}
                    onChange={(e) => setValorImovel(Number(e.target.value))}
                    disabled={isScanning}
                    className="w-full h-1.5 bg-zinc-950 rounded-none appearance-none cursor-pointer accent-[#00F2FE]"
                  />
                  <div className="flex justify-between text-[8px] text-zinc-600">
                    <span>R$ 150 mil</span>
                    <span>R$ 1.5 M</span>
                    <span>R$ 3.0 M</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <Label htmlFor="range-renda-d" className="text-zinc-300 uppercase tracking-widest font-mono">
                      Renda Mensal Familiar:
                    </Label>
                    <span className="text-[#00F2FE] font-bold text-sm bg-black px-2 py-0.5 border border-zinc-800">
                      {formatCurrency(rendaMensal)}
                    </span>
                  </div>
                  <input
                    id="range-renda-d"
                    type="range"
                    min={3000}
                    max={50000}
                    step={500}
                    value={rendaMensal}
                    onChange={(e) => setRendaMensal(Number(e.target.value))}
                    disabled={isScanning}
                    className="w-full h-1.5 bg-zinc-950 rounded-none appearance-none cursor-pointer accent-[#00F2FE]"
                  />
                  <div className="flex justify-between text-[8px] text-zinc-600">
                    <span>R$ 3 mil</span>
                    <span>R$ 26 mil</span>
                    <span>R$ 50 mil</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isScanning}
                  className="w-full rounded-none bg-black hover:bg-[#00F2FE] text-[#00F2FE] hover:text-slate-950 border border-[#00F2FE]/30 py-6 text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  {isScanning ? (
                    <>
                      <span className="w-2 h-2 bg-emerald-500 animate-ping mr-2 rounded-none" />
                      <span>Processando Vetores de Custos...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      <span>[ Executar Varredura de Riscos ]</span>
                    </>
                  )}
                </Button>
              </form>

              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#02050b]/95 z-30 flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-48 h-1 bg-zinc-900 overflow-hidden relative">
                      <motion.div 
                        initial={{ left: '-100%' }}
                        animate={{ left: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-24 bg-[#00F2FE] shadow-[0_0_12px_#00F2FE]"
                      />
                    </div>
                    <div className="text-[10px] text-[#00F2FE] tracking-widest blink font-mono uppercase">
                      [ SCANNING SEGMENT: {formatCurrency(valorImovel)} ]
                    </div>
                    <div className="text-[8px] text-zinc-500 font-mono">
                      PROJETANDO PARCELAS SAC // INDEXANDO ITBI SP
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel B: Scanner Results */}
            <div id="results-dashboard" className="scroll-mt-24">
              <AnimatePresence mode="wait">
                {showResults && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center space-x-2 text-xs font-bold text-white">
                      <span className="w-1.5 h-1.5 bg-[#00F2FE] rounded-none" />
                      <span>[ TELEMETRIA GERADA ]</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-[#0B1329] border border-zinc-800 p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-12 h-0.5 bg-[#00F2FE]" />
                        <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Custo Invisível à Vista</div>
                        <div className="text-2xl font-extrabold text-white mt-1">{formatCurrency(totalCustosOcultos)}</div>
                        <div className="text-[9px] text-[#F43F5E] mt-3 leading-relaxed border-t border-zinc-800/60 pt-2.5">
                          <AlertTriangle className="w-3 h-3 inline mr-1" /> 
                          Provisionar taxas de ITBI de {formatCurrency(custoITBI)} e Registro/Escritura de {formatCurrency(custoRegistroEscritura)}.
                        </div>
                      </div>

                      <div className={`bg-[#0B1329] border p-5 relative overflow-hidden ${isComprometimentoAlto ? 'border-[#F43F5E]/30' : 'border-zinc-800'}`}>
                        <div className={`absolute top-0 left-0 w-12 h-0.5 ${isComprometimentoAlto ? 'bg-[#F43F5E]' : 'bg-[#10B981]'}`} />
                        <div className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Parcela SAC / Renda</div>
                        <div className={`text-2xl font-extrabold mt-1 ${isComprometimentoAlto ? 'text-[#F43F5E]' : 'text-[#10B981]'}`}>
                          {comprometeRendaPercent.toFixed(1)}% Comprometimento
                        </div>
                        <div className="text-[9px] text-zinc-400 mt-3 leading-relaxed border-t border-zinc-800/60 pt-2.5">
                          Primeira parcela: {formatCurrency(primeiraParcelaEst)}. 
                          {isComprometimentoAlto && <span className="text-[#F43F5E] block font-bold mt-1">[RISCO ALTO: Comprometimento maior do que 30%]</span>}
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#0B1329] border border-zinc-800 p-5 relative">
                      <div className="flex justify-between border-b border-zinc-800 pb-2.5 mb-4 text-[10px] font-bold text-white">
                        <span>VISUALIZADOR DA CURVA PATRIMONIAL EXCEDENTE</span>
                        <span className="text-[#00F2FE]">[INTERATIVO]</span>
                      </div>
                      <div className="flex justify-center items-center py-4 bg-black/40 border border-zinc-800/80">
                        <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <line x1="0" y1="40" x2="500" y2="40" stroke="#1f2937" strokeDasharray="3,3" />
                          <line x1="0" y1="100" x2="500" y2="100" stroke="#1f2937" strokeDasharray="3,3" />
                          <line x1="0" y1="160" x2="500" y2="160" stroke="#1f2937" strokeDasharray="3,3" />
                          {(() => {
                            const h1 = 150;
                            const h2 = Math.max(25, Math.min(150, (totalCustosOcultos / valorImovel) * 350));
                            const h3 = Math.max(25, Math.min(150, (jurosAcumuladosPrimeiroAno / valorImovel) * 200));
                            return (
                              <>
                                <rect x="60" y={170 - h1} width="50" height={h1} fill="#1e293b" stroke="#475569" />
                                <text x="85" y={160 - h1} textAnchor="middle" fill="#94a3b8" fontSize="9">{formatCurrency(valorImovel)}</text>
                                <text x="85" y="185" textAnchor="middle" fill="#64748b" fontSize="8">NOMINAL</text>

                                <rect x="220" y={170 - h2} width="50" height={h2} fill="rgba(244,63,94,0.1)" stroke="#f43f5e" />
                                <text x="245" y={160 - h2} textAnchor="middle" fill="#f43f5e" fontSize="9">{formatCurrency(totalCustosOcultos)}</text>
                                <text x="245" y="185" textAnchor="middle" fill="#64748b" fontSize="8">EXTRAS</text>

                                <rect x="380" y={170 - h3} width="50" height={h3} fill="rgba(0,242,254,0.05)" stroke="#00f2fe" />
                                <text x="405" y={160 - h3} textAnchor="middle" fill="#00f2fe" fontSize="9">{formatCurrency(jurosAcumuladosPrimeiroAno)}</text>
                                <text x="405" y="185" textAnchor="middle" fill="#64748b" fontSize="8">JUROS A1</text>

                                <path d={`M 110 ${170 - h1} L 220 ${170 - h2} L 380 ${170 - h3}`} fill="none" stroke="#00f2fe" strokeWidth="1" strokeDasharray="4,4" />
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>

                    <div className="border border-zinc-800 bg-[#0C152F] p-6 space-y-4">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-5 h-5 text-[#00F2FE]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Recomendação de Varredura Completa</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed font-sans">
                        O laudo escrito audita esses números confrontando com a base cartorial específica do endereço do imóvel na Zona Leste e analisando a saúde de indexadores da sua proposta de crédito.
                      </p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center border border-[#10B981] bg-[#10B981]/5 hover:bg-[#10B981]/25 text-[#10B981] font-bold px-8 py-5 text-xs uppercase tracking-widest transition-colors w-full"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" /> Solicitar Análise de Viabilidade (PDF) // R$ 147
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel C: Manila Folders */}
            <div className="border border-zinc-800 bg-[#0B1329] p-6 relative overflow-hidden">
              <div className="border-b border-zinc-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-[#00F2FE]" /> O que o Relatório Esclarece
                </h2>
              </div>
              <div className="relative">
                <div className="flex flex-wrap gap-1 border-b border-zinc-800 relative z-10">
                  {folders.map((folder, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveFolderTab(idx)}
                      className={`relative px-3 py-2 text-[9px] font-bold tracking-wider uppercase transition-all duration-200 ${
                        activeFolderTab === idx 
                        ? 'bg-[#030712] border-t border-x border-zinc-800 text-[#00F2FE] pb-[5px] -mb-[1px]' 
                        : 'bg-zinc-950/60 border-t border-x border-transparent text-zinc-500 hover:text-zinc-300'
                      }`}
                      style={{ borderRadius: '6px 6px 0 0' }}
                    >
                      {folder.title}
                    </button>
                  ))}
                </div>
                <div className="bg-[#030712] border-x border-b border-zinc-800 p-6 min-h-[260px] flex flex-col justify-between relative -mt-[1px]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] text-zinc-600 bg-zinc-900 border border-zinc-800 px-2 py-0.5">{folders[activeFolderTab].code}</span>
                      <span className="text-[8px] text-[#00F2FE] font-bold">{folders[activeFolderTab].tag}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white uppercase">{folders[activeFolderTab].headline}</h4>
                    <p className="text-[#849bb4] text-[11px] leading-relaxed font-sans">{folders[activeFolderTab].desc}</p>
                  </div>
                  <div className="border-t border-zinc-900 pt-4 flex justify-between text-[10px]">
                    <div>
                      <span className="text-zinc-600 text-[8px] uppercase">Elemento</span>
                      <span className="text-white font-bold block mt-0.5">{folders[activeFolderTab].val}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-600 text-[8px] uppercase">Detalhe</span>
                      <span className="text-zinc-400 block mt-0.5">{folders[activeFolderTab].details}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel D: Blueprint Flow */}
            <div className="border border-zinc-800 bg-[#0B1329] p-6 relative">
              <div className="border-b border-zinc-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-[#00F2FE]" /> Fluxograma de Auditoria
                </h2>
              </div>
              <div className="space-y-6 relative">
                <div className="absolute left-[20px] top-[24px] bottom-[24px] w-0.5 border-l border-dashed border-zinc-800/80" />
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 border border-[#00F2FE]/20 bg-[#030712] flex items-center justify-center text-[#00F2FE] text-xs font-bold font-mono">[1]</div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Submissão</h4>
                    <p className="text-[10px] text-zinc-400 font-sans">Você envia o link do anúncio ou espelho de parcelamento recebido via WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 border border-[#10B981]/20 bg-[#030712] flex items-center justify-center text-[#10B981] text-xs font-bold font-mono">[2]</div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cruzamento</h4>
                    <p className="text-[10px] text-zinc-400 font-sans">Cruzamos com o histórico regional de vendas, estimamos a curva SAC de juros e provisionamos impostos.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 border border-violet-500/20 bg-[#030712] flex items-center justify-center text-violet-400 text-xs font-bold font-mono">[3]</div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Laudo</h4>
                    <p className="text-[10px] text-zinc-400 font-sans">Entregamos o laudo técnico conclusivo com parecer independente do analista em até 48h.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel E: Auditor Board */}
            <div className="border border-zinc-800 bg-[#0B1329] p-6 relative overflow-hidden">
              <div className="absolute right-[-10px] bottom-[-15px] w-36 h-36 border-4 border-dashed border-[#10B981]/15 text-[#10B981]/15 font-black text-center flex items-center justify-center rounded-full text-xs select-none rotate-12 uppercase pointer-events-none">
                VALIDADO // SEM VIÉS
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 border border-[#00F2FE]/20 bg-[#030712] flex items-center justify-center text-[#00F2FE] flex-shrink-0">
                  <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: '45s' }} />
                </div>
                <div className="space-y-2">
                  <span className="text-[9px] text-[#00F2FE] font-bold tracking-widest uppercase">Responsabilidade Analítica</span>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">Emanuel & Equipe Pinheiro Azul</h3>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-sans">
                    Não intermediamos a venda e não recebemos corretagem. Cobramos taxa de consultoria para garantir que você não compre caro nem assuma juros ocultos.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel F: Final CTA */}
            <div className="text-center space-y-6 pt-8 border-t border-zinc-900">
              <h2 className="text-2xl font-bold text-white uppercase tracking-tight max-w-lg mx-auto">
                Pronto para colocar todos os números na mesa?
              </h2>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-[#10B981] bg-[#10B981]/5 hover:bg-[#10B981]/25 text-[#10B981] font-bold px-8 py-5 text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] animate-pulse"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Iniciar Análise do Meu Imóvel por R$ 147
              </a>
            </div>

          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-[#02050b] py-12 px-6 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-600">
            <p className="font-mono">© {new Date().getFullYear()} INTELIGÊNCIA IMOBILIÁRIA. PARCEIRO DE DADOS PINHEIRO AZUL.</p>
            <p className="max-w-md text-right md:text-left leading-relaxed text-[9px] font-sans">
              Laudo opinativo privado técnico sobre viabilidade financeira de mercado.
            </p>
          </div>
        </footer>

      </div>

    </div>
  );
}
