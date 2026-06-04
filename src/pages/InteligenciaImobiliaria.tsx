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
  Smartphone,
  Gauge
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

  // Mock IPA Score (based on inputs)
  const ipaScore = isComprometimentoAlto ? 4.2 : 7.8;
  const ipaColor = ipaScore >= 8 ? '#22c55e' : ipaScore >= 5 ? '#eab308' : '#ef4444';
  const ipaLabel = ipaScore >= 8 ? 'Compra Recomendada' : ipaScore >= 5 ? 'Proceda com Cautela' : 'Risco Alto';
  const ipaDescription = ipaScore >= 8 
    ? 'O imóvel está em preço justo, o crédito é saudável e o potencial de valorização é alto.'
    : ipaScore >= 5 
    ? 'Existem riscos mitigáveis. O Dossiê completo lista os pontos de atenção e recomendações.'
    : 'Compra não recomendada no cenário atual. Risco financeiro elevado.';

  // Active Tab for Manila Folder Preview (Desktop)
  const [activeFolderTab, setActiveFolderTab] = useState<number>(0);

  // Mobile App Navigation States
  const [activeMobileTab, setActiveMobileTab] = useState<number>(0); // 0: Início, 1: Scanner, 2: Laudo, 3: Especialista
  const [mobileCardIndex, setMobileCardIndex] = useState<number>(0); // Swipe index for Report preview on mobile

  const handleStartScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      if (activeMobileTab !== 1) {
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
      code: "01",
      title: "Regional",
      tag: "Comparação de m²",
      headline: "O valor pedido condiz com o mercado real?",
      desc: "Análise técnica do preço por metro quadrado do imóvel anunciado em comparação com as transações registradas em cartório e médias de liquidez dos bairros como Tatuapé, Mooca e Vila Formosa. Identifica se o valor pedido está acima do teto real de mercado.",
      metric: "Métrica Regional",
      val: "Transações em Cartório",
      details: "Evita que você compre com preço inflacionado sob o calor emocional."
    },
    {
      code: "02",
      title: "Custos Ocultos",
      tag: "Impostos & Registro",
      headline: "Provisione taxas ocultas de transferência imobiliária",
      desc: "Mapeamento detalhado dos emolumentos cartoriais, ITBI, taxas de avaliação bancária e taxas acessórias exigidas para efetivação jurídica. Sem isso, a compra trava e você corre risco de quebra de contrato por falta de liquidez.",
      metric: "Estimativa Oculta",
      val: "4.5% a 6% do valor",
      details: "Saber exatamente a reserva de caixa obrigatória antes da assinatura."
    },
    {
      code: "03",
      title: "Comprometimento",
      tag: "Amortização SAC/Price",
      headline: "Simulação real da curva de parcelamento",
      desc: "Simulamos as parcelas do primeiro ao último mês usando juros reais das principais instituições bancárias. Medimos o comprometimento saudável da renda familiar e o impacto dos seguros habitacionais incidentes.",
      metric: "Segurança de Renda",
      val: "Limite de 30% Bruto",
      details: "Evita desespero financeiro ou risco de perder o imóvel no meio do financiamento."
    },
    {
      code: "04",
      title: "Atenção & Riscos",
      tag: "INCC / Reajustes",
      headline: "O gargalo oculto de imóveis na planta ou parcelas intermediárias",
      desc: "Identificamos cláusulas de reajustes indexadas ao INCC e IGPM que inflacionam o saldo devedor. Mapeamos despesas condominiais extraordinárias conhecidas e riscos associados à saúde financeira da incorporadora.",
      metric: "Indexador Crítico",
      val: "Projeção INCC/Mês",
      details: "Saber se as parcelas intermediárias caberão no orçamento após reajustes."
    },
    {
      code: "05",
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
    <div className="min-h-screen bg-[#020817] text-zinc-400 font-sans selection:bg-[#1f8fff]/30 selection:text-white relative overflow-x-hidden">
      
      {/* ==================================================================== */}
      {/* 📱 NATIVE APP-LIKE MOBILE LAYOUT (ONLY ACTIVE FOR MOBILE/TABLETS) */}
      {/* ==================================================================== */}
      <div className="fixed inset-0 lg:hidden flex flex-col justify-between overflow-hidden bg-[#020817] z-50">
        
        {/* Mobile Top Bar */}
        <div className="border-b border-[#1f8fff]/15 px-4 py-3 flex items-center justify-between bg-[#020817] z-30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 border border-[#1f8fff]/30 bg-zinc-900 rounded-lg flex items-center justify-center text-[#1f8fff] font-bold text-[10px]">
              PA
            </div>
            <span className="font-bold text-[10px] tracking-widest text-white uppercase">
              INTELIGÊNCIA IMOBILIÁRIA
            </span>
          </div>
          <div className="flex items-center space-x-1.5 text-[8px] text-[#1f8fff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1f8fff] animate-pulse" />
            <span>ZONA LESTE · SP</span>
          </div>
        </div>

        {/* Dynamic Mobile View Switcher */}
        <div className="flex-grow overflow-y-auto p-4 pb-24 scrollbar-none relative">
          
          {/* Subtle background grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,143,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(31,143,255,0.01)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />

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
                  
                  {/* Gauge de Comprometimento de Renda */}
                  <div className="flex flex-col items-center justify-center py-4 bg-zinc-900/40 border border-zinc-800 p-4 rounded-3xl">
                    <div className="relative w-24 h-24">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27272a" strokeWidth="8" />
                        <motion.circle
                          cx="50" cy="50" r="40" fill="transparent"
                          stroke={isComprometimentoAlto ? "#ef4444" : "#1f8fff"}
                          strokeWidth="8" strokeDasharray="251.2"
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 251.2 - (251.2 * Math.min(100, comprometeRendaPercent)) / 100 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-base font-bold text-white leading-none">
                          {comprometeRendaPercent.toFixed(0)}%
                        </span>
                        <span className="text-[7px] text-zinc-500 uppercase tracking-wider mt-1">
                          Renda
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <span className={`text-[9px] font-bold uppercase tracking-wider ${isComprometimentoAlto ? "text-red-400" : "text-emerald-400"}`}>
                        {isComprometimentoAlto ? "Status: Risco de Reprovação" : "Status: Renda Saudável"}
                      </span>
                      <span className="block text-[8px] text-zinc-500 mt-0.5">
                        Comprometimento recomendado: máx. 30%
                      </span>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-1.5 px-3 py-1 border border-[#1f8fff]/20 bg-zinc-900/60 rounded-full">
                      <span className="text-[9px] text-[#1f8fff] uppercase tracking-wider font-semibold">
                        Análise de Viabilidade Imobiliária
                      </span>
                    </div>

                    <h1 className="text-2xl font-bold text-white leading-tight">
                      Saiba tudo sobre o imóvel que quer comprar.{" "}
                      <span className="text-[#1f8fff]">Cada número importa.</span>
                    </h1>

                    <p className="text-zinc-400 text-xs leading-relaxed px-4">
                      Comprar imóvel é uma grande decisão. Nossa análise coloca todos os números na mesa pra você decidir com segurança.
                    </p>
                  </div>

                  <div className="border border-zinc-800 bg-zinc-900/50 p-4 rounded-2xl text-[10px] space-y-2">
                    <div className="flex justify-between border-b border-zinc-800 pb-1.5 font-bold text-white">
                      <span>Média Regional Tatuapé</span>
                      <span className="text-[#1f8fff]">R$ 11.200 /m²</span>
                    </div>
                    <div className="text-zinc-400 leading-normal">
                      Mapeamos o mercado e custos invisíveis. Dossiê completo por apenas <span className="font-bold text-[#1f8fff]">R$ 147</span>.
                    </div>
                  </div>

                  <div className="pt-4 text-center">
                    <Button 
                      onClick={() => setActiveMobileTab(1)}
                      className="w-full rounded-2xl bg-[#1f8fff] hover:bg-[#1f8fff]/80 text-white font-bold py-6 uppercase tracking-wider text-xs border-0 transition-colors"
                    >
                      Iniciar Simulação de Riscos
                    </Button>
                  </div>

                </div>
              )}

              {/* Tab 1: Simulador */}
              {activeMobileTab === 1 && (
                <div className="space-y-6 py-4">
                  <div className="border border-zinc-800 bg-zinc-900 p-5 rounded-3xl relative overflow-hidden">
                    <div className="text-[10px] font-bold text-[#1f8fff] uppercase tracking-widest border-b border-zinc-800 pb-2 mb-4 flex items-center">
                      <Calculator className="w-3.5 h-3.5 mr-1.5" /> Simulador de Custos & Parcelas
                    </div>

                    <div className="space-y-6">
                      
                      {/* Valor do Imóvel */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase text-zinc-400">
                          <span>Valor do Imóvel:</span>
                          <span className="text-white font-bold">{formatCurrency(valorImovel)}</span>
                        </div>
                        <input
                          type="range" min={150000} max={3000000} step={25000}
                          value={valorImovel} onChange={(e) => setValorImovel(Number(e.target.value))}
                          disabled={isScanning}
                          className="w-full h-1 bg-zinc-950 appearance-none cursor-pointer accent-[#1f8fff] rounded-xl"
                        />
                        <div className="flex gap-2 justify-between">
                          <button type="button" onClick={() => adjustValor(-50000)} disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#1f8fff]/40 bg-black/40 text-zinc-400 rounded-xl transition-colors">
                            - 50K
                          </button>
                          <button type="button" onClick={() => adjustValor(50000)} disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#1f8fff]/40 bg-black/40 text-zinc-400 rounded-xl transition-colors">
                            + 50K
                          </button>
                        </div>
                      </div>

                      {/* Renda Familiar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] uppercase text-zinc-400">
                          <span>Renda Familiar:</span>
                          <span className="text-white font-bold">{formatCurrency(rendaMensal)}</span>
                        </div>
                        <input
                          type="range" min={3000} max={50000} step={500}
                          value={rendaMensal} onChange={(e) => setRendaMensal(Number(e.target.value))}
                          disabled={isScanning}
                          className="w-full h-1 bg-zinc-950 appearance-none cursor-pointer accent-[#1f8fff] rounded-xl"
                        />
                        <div className="flex gap-2 justify-between">
                          <button type="button" onClick={() => adjustRenda(-1000)} disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#1f8fff]/40 bg-black/40 text-zinc-400 rounded-xl transition-colors">
                            - 1K
                          </button>
                          <button type="button" onClick={() => adjustRenda(1000)} disabled={isScanning}
                            className="flex-1 py-1 text-[9px] border border-zinc-800 hover:border-[#1f8fff]/40 bg-black/40 text-zinc-400 rounded-xl transition-colors">
                            + 1K
                          </button>
                        </div>
                      </div>

                      <Button onClick={() => handleStartScan()} disabled={isScanning}
                        className="w-full rounded-2xl bg-black hover:bg-[#1f8fff] text-[#1f8fff] hover:text-white border border-[#1f8fff]/30 py-5 text-[10px] font-bold uppercase tracking-wider transition-colors">
                        {isScanning ? "Calculando..." : "Calcular Custos e Riscos"}
                      </Button>

                    </div>

                    {/* Mobile Scanning overlay */}
                    <AnimatePresence>
                      {isScanning && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#020817]/98 z-20 rounded-3xl flex flex-col items-center justify-center space-y-4">
                          <div className="w-32 h-0.5 bg-zinc-900 overflow-hidden relative rounded-full">
                            <motion.div initial={{ left: '-100%' }} animate={{ left: '100%' }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              className="absolute top-0 bottom-0 w-16 bg-[#1f8fff] rounded-full" />
                          </div>
                          <span className="text-[9px] text-[#1f8fff] tracking-widest uppercase animate-pulse">
                            Calculando custos para {formatCurrency(valorImovel)}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Results Dashboard on Mobile */}
                  {showResults && (
                    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                      className="space-y-4">
                      
                      {/* IPA Score Card (Mobile) */}
                      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-3xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">
                            Índice Pinheiro Azul (Prévia)
                          </span>
                          <span className="text-[8px] text-zinc-600">IPA</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27272a" strokeWidth="6" />
                              <motion.circle cx="50" cy="50" r="40" fill="transparent"
                                stroke={ipaColor} strokeWidth="6" strokeDasharray="251.2"
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 251.2 - (251.2 * ipaScore) / 10 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-white">{ipaScore}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-xs font-bold" style={{ color: ipaColor }}>{ipaLabel}</span>
                            <p className="text-[9px] text-zinc-400 leading-relaxed mt-0.5">{ipaDescription}</p>
                          </div>
                        </div>
                        <p className="text-[8px] text-zinc-500 mt-3 border-t border-zinc-800 pt-2">
                          Nota preliminar. O Dossiê completo inclui análise regional, jurídica e de crédito.
                        </p>
                      </div>

                      {/* Metric cards */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                          <span className="text-[8px] text-zinc-500 uppercase block font-bold">Custos Extra Inicial</span>
                          <span className="text-base font-bold text-white mt-1 block">{formatCurrency(totalCustosOcultos)}</span>
                          <span className="text-[7px] text-red-400 block mt-1 leading-none">ITBI e Cartório à vista.</span>
                        </div>
                        <div className={`bg-zinc-900 border p-4 rounded-2xl ${isComprometimentoAlto ? 'border-red-400/30' : 'border-zinc-800'}`}>
                          <span className="text-[8px] text-zinc-500 uppercase block font-bold">Renda Comprometida</span>
                          <span className={`text-base font-bold mt-1 block ${isComprometimentoAlto ? 'text-red-400' : 'text-emerald-400'}`}>
                            {comprometeRendaPercent.toFixed(0)}%
                          </span>
                          <span className="text-[7px] text-zinc-400 block mt-1 leading-none">
                            Parcela SAC: {formatCurrency(primeiraParcelaEst)}
                          </span>
                        </div>
                      </div>

                      {/* SVG Chart for Mobile */}
                      <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl">
                        <span className="text-[8px] font-bold text-white block mb-3 uppercase tracking-wider">Métricas Comparadas</span>
                        <div className="flex justify-center bg-black/30 border border-zinc-900 py-3 px-1 rounded-xl">
                          <svg width="100%" height="110" viewBox="0 0 300 110" preserveAspectRatio="none">
                            {(() => {
                              const h1 = 80;
                              const h2 = Math.max(15, Math.min(80, (totalCustosOcultos / valorImovel) * 180));
                              const h3 = Math.max(15, Math.min(80, (jurosAcumuladosPrimeiroAno / valorImovel) * 110));
                              return (
                                <>
                                  <rect x="25" y={90 - h1} width="35" height={h1} fill="#27272a" stroke="#3f3f46" rx="4" />
                                  <text x="42.5" y={80 - h1} textAnchor="middle" fill="#a1a1aa" fontSize="8" fontWeight="bold">{formatCurrency(valorImovel)}</text>
                                  <text x="42.5" y="100" textAnchor="middle" fill="#71717a" fontSize="7">IMÓVEL</text>

                                  <rect x="125" y={90 - h2} width="35" height={h2} fill="rgba(239,68,68,0.1)" stroke="#ef4444" rx="4" />
                                  <text x="142.5" y={80 - h2} textAnchor="middle" fill="#ef4444" fontSize="7" fontWeight="bold">{formatCurrency(totalCustosOcultos)}</text>
                                  <text x="142.5" y="100" textAnchor="middle" fill="#71717a" fontSize="7">TAXAS</text>

                                  <rect x="225" y={90 - h3} width="35" height={h3} fill="rgba(31,143,255,0.05)" stroke="#1f8fff" rx="4" />
                                  <text x="242.5" y={80 - h3} textAnchor="middle" fill="#1f8fff" fontSize="7" fontWeight="bold">{formatCurrency(jurosAcumuladosPrimeiroAno)}</text>
                                  <text x="242.5" y="100" textAnchor="middle" fill="#71717a" fontSize="7">JUROS A1</text>
                                </>
                              );
                            })()}
                          </svg>
                        </div>
                      </div>

                      {/* Warnings alert */}
                      {isComprometimentoAlto && (
                        <div className="border border-red-400/30 bg-red-500/5 p-3.5 rounded-2xl flex items-start space-x-2 text-red-400">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="text-[9px] leading-normal">
                            <strong>Alerta de parcela:</strong> O comprometimento ultrapassa 30% da renda informada. Alta chance de o banco recusar o crédito ou sobrecarregar seu orçamento mensal.
                          </div>
                        </div>
                      )}

                      {/* WhatsApp CTA */}
                      <a href={whatsappUrl} target="_blank" rel="noreferrer"
                        className="flex items-center justify-center w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold uppercase tracking-wider text-[10px] transition-colors rounded-2xl">
                        <MessageSquare className="w-4 h-4 mr-1.5" /> Solicitar Dossiê Completo — R$ 147
                      </a>

                    </motion.div>
                  )}

                </div>
              )}

              {/* Tab 2: Relatório (Card Stack) */}
              {activeMobileTab === 2 && (
                <div className="space-y-6 py-4 flex flex-col justify-between min-h-[68vh]">
                  
                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block">
                      Prévia do Dossiê
                    </span>
                    <span className="text-[9px] text-zinc-600 block">
                      Deslize para inspecionar os tópicos da análise.
                    </span>
                  </div>

                  {/* Card Stack */}
                  <div className="relative w-full h-[280px] flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                      {folders.map((folder, idx) => {
                        if (idx !== mobileCardIndex) return null;
                        return (
                          <motion.div key={idx}
                            initial={{ scale: 0.95, y: 5, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.95, y: -5, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="absolute inset-x-0 h-full bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between shadow-2xl rounded-3xl">
                            
                            <div className="absolute top-[-10px] left-6 bg-zinc-950 border-t border-x border-zinc-800 h-[11px] px-3 text-[7px] font-bold text-[#1f8fff] tracking-widest rounded-t-lg">
                              {folder.code}
                            </div>

                            <div className="space-y-3 pt-2">
                              <div className="flex justify-between items-center border-b border-zinc-800 pb-2">
                                <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">
                                  {folder.tag}
                                </span>
                                <span className="text-[8px] text-[#1f8fff] font-bold">
                                  Pág {idx + 1} de 5
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-white uppercase tracking-tight">
                                {folder.headline}
                              </h4>
                              <p className="text-zinc-400 text-[10px] leading-relaxed">
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

                  {/* Arrow Buttons */}
                  <div className="flex items-center justify-between px-6 pt-2">
                    <button type="button" disabled={mobileCardIndex === 0}
                      onClick={() => setMobileCardIndex(p => Math.max(0, p - 1))}
                      className="w-10 h-10 border border-zinc-800 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 disabled:opacity-30 disabled:pointer-events-none hover:text-white transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-[9px] text-zinc-500 font-bold uppercase">
                      Página {mobileCardIndex + 1} / 5
                    </span>
                    <button type="button" disabled={mobileCardIndex === folders.length - 1}
                      onClick={() => setMobileCardIndex(p => Math.min(folders.length - 1, p + 1))}
                      className="w-10 h-10 border border-zinc-800 bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-400 disabled:opacity-30 disabled:pointer-events-none hover:text-white transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              )}

              {/* Tab 3: Especialista */}
              {activeMobileTab === 3 && (
                <div className="space-y-6 py-4 flex flex-col justify-between min-h-[68vh]">
                  
                  <div className="border border-zinc-800 bg-zinc-900 p-5 rounded-3xl relative overflow-hidden text-center space-y-4">

                    <div className="w-20 h-20 mx-auto rounded-2xl border border-[#1f8fff]/25 bg-zinc-950 p-0.5 flex items-center justify-center">
                      <div className="w-full h-full rounded-[14px] bg-zinc-950 flex items-center justify-center">
                        <ShieldCheck className="w-8 h-8 text-[#1f8fff]" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] text-[#1f8fff] font-bold tracking-widest uppercase">
                        Equipe de Análise
                      </span>
                      <h3 className="text-sm font-bold text-white uppercase">Time Pinheiro Azul</h3>
                      <p className="text-zinc-500 text-[8px] uppercase tracking-wider">
                        Análise de Dados & Estratégia Patrimonial
                      </p>
                    </div>

                    <p className="text-zinc-400 text-[10px] leading-relaxed text-left">
                      Nossa análise de viabilidade imobiliária audita os dados de precificação regional, custos de transferência e fluxos de parcelamento com total precisão e independência. O Dossiê garante que você tome a decisão certa com base em dados de mercado reais.
                    </p>

                    <div className="flex justify-center gap-1.5 pt-2">
                      <span className="text-[8px] text-zinc-400 bg-black border border-zinc-800 px-2 py-0.5 uppercase rounded-full">
                        ZL Especialista
                      </span>
                    </div>

                  </div>

                  <a href={whatsappUrl} target="_blank" rel="noreferrer"
                    className="flex items-center justify-center w-full py-4.5 bg-emerald-500 hover:bg-emerald-400 text-white font-bold uppercase tracking-wider text-[10px] transition-colors rounded-2xl">
                    <MessageSquare className="w-4 h-4 mr-1.5" /> Falar com o Especialista no WhatsApp
                  </a>

                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>

        {/* Mobile Bottom Navigation Bar */}
        <div className="fixed bottom-4 left-4 right-4 h-16 bg-zinc-900/80 backdrop-blur-xl border border-[#1f8fff]/20 rounded-2xl flex items-center justify-around px-2 z-40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          
          <button onClick={() => setActiveMobileTab(0)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all rounded-xl ${activeMobileTab === 0 ? 'text-[#1f8fff]' : 'text-zinc-500'}`}>
            <Compass className={`w-5 h-5 transition-transform ${activeMobileTab === 0 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Início</span>
          </button>

          <button onClick={() => setActiveMobileTab(1)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all rounded-xl ${activeMobileTab === 1 ? 'text-[#1f8fff]' : 'text-zinc-500'}`}>
            <Calculator className={`w-5 h-5 transition-transform ${activeMobileTab === 1 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Simular</span>
          </button>

          <button onClick={() => setActiveMobileTab(2)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all rounded-xl ${activeMobileTab === 2 ? 'text-[#1f8fff]' : 'text-zinc-500'}`}>
            <FileCheck className={`w-5 h-5 transition-transform ${activeMobileTab === 2 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Dossiê</span>
          </button>

          <button onClick={() => setActiveMobileTab(3)}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-all rounded-xl ${activeMobileTab === 3 ? 'text-[#1f8fff]' : 'text-zinc-500'}`}>
            <User className={`w-5 h-5 transition-transform ${activeMobileTab === 3 ? 'scale-110' : ''}`} />
            <span className="text-[8px] tracking-wider uppercase mt-1 font-bold">Especialista</span>
          </button>

        </div>

      </div>

      {/* ==================================================================== */}
      {/* 🖥️ DESKTOP LAYOUT */}
      {/* ==================================================================== */}
      <div className="hidden lg:block">
        
        {/* Navigation Header */}
        <header className="sticky top-0 z-50 bg-[#020817]/80 backdrop-blur-md border-b border-[#1f8fff]/15 px-6 py-5">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 border border-[#1f8fff]/30 bg-zinc-900 rounded-xl flex items-center justify-center text-[#1f8fff] font-bold text-xs shadow-[0_0_12px_rgba(31,143,255,0.2)]">
                PA
              </div>
              <div>
                <span className="font-bold text-sm tracking-widest text-white uppercase block">
                  Inteligência Imobiliária
                </span>
                <span className="text-[9px] text-[#1f8fff] block tracking-wide">
                  Análise de Viabilidade Patrimonial
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#simulador"
                className="px-4 py-2 border border-[#1f8fff]/30 rounded-full bg-[#1f8fff]/5 hover:bg-[#1f8fff]/20 text-[#1f8fff] text-xs font-semibold tracking-wider transition-colors">
                Acessar Simulador
              </a>
            </div>
          </div>
        </header>

        {/* Background Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,143,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(31,143,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(31,143,255,0.03)_2px,transparent_2px),linear-gradient(to_right,rgba(31,143,255,0.03)_2px,transparent_2px)] bg-[size:150px_150px] pointer-events-none" />

        {/* Main Content Layout */}
        <main className="max-w-7xl mx-auto px-6 pt-16 relative z-10 lg:grid lg:grid-cols-12 lg:gap-12 min-h-screen">
          
          {/* Left Column */}
          <section 
            className="lg:col-span-5 lg:sticky lg:top-24 lg:h-fit lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto flex flex-col justify-between mb-16 lg:mb-0"
            style={{ scrollbarWidth: 'none' }}>
            <div className="space-y-8 relative">
              <div className="absolute -left-6 top-16 text-8xl font-black text-transparent opacity-5 select-none pointer-events-none tracking-widest leading-none w-full uppercase" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>
                CADA NUMERO IMPORTA
              </div>

              <div className="inline-flex items-center space-x-2 px-3 py-1.5 border border-[#1f8fff]/20 bg-zinc-900/80 rounded-full text-[#1f8fff]">
                <span className="w-2 h-2 bg-[#1f8fff] animate-pulse rounded-full" />
                <span className="text-[10px] tracking-wider uppercase font-semibold">
                  Análise de Viabilidade Imobiliária
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none space-y-2">
                <span>Saiba tudo sobre o</span>
                <span className="bg-gradient-to-r from-[#1f8fff] to-[#8b5cf6] bg-clip-text text-transparent block">
                  Imóvel que quer comprar.
                </span>
              </h1>

              <p className="text-zinc-400 text-base leading-relaxed max-w-md">
                Comprar imóvel é uma grande decisão. Nossa análise coloca todos os números na mesa pra você decidir com segurança.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">Dossiê completo:</span>
                <span className="text-sm font-bold text-white uppercase tracking-wider bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-xl">
                  R$ 147 fixos
                </span>
              </div>
            </div>

            {/* Regional Telemetry */}
            <div className="border border-zinc-800/80 bg-zinc-900/60 p-5 rounded-3xl mt-8 lg:mt-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#1f8fff] rounded-tl-3xl" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#1f8fff] rounded-br-3xl" />

              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span className="text-[11px] font-bold text-white tracking-wider uppercase flex items-center">
                  <Grid className="w-3.5 h-3.5 mr-1 text-[#1f8fff]" /> Diagnóstico Regional (SP - ZL)
                </span>
                <span className="text-[10px] text-[#1f8fff]">Atualizado · Jun 2026</span>
              </div>

              <div className="text-xs space-y-1.5">
                <div className="flex justify-between border-b border-zinc-800/40 pb-1.5 text-zinc-400 font-semibold">
                  <span>LOCALIZAÇÃO (ZL)</span>
                  <span>MÉDIA m² REGISTRADO</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>01. Anália Franco</span>
                  <span className="text-white font-bold">R$ 14.500</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>02. Tatuapé</span>
                  <span className="text-[#1f8fff] font-bold">R$ 11.200</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>03. Mooca</span>
                  <span className="text-white font-bold">R$ 9.800</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>04. Vila Formosa</span>
                  <span className="text-white font-bold">R$ 8.500</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>05. Carrão</span>
                  <span className="text-white font-bold">R$ 7.900</span>
                </div>
              </div>
              
              <p className="text-[10px] text-zinc-500 mt-4 leading-normal">
                *Valores reais obtidos a partir de base histórica de transações e anúncios locais.
              </p>
            </div>
          </section>

          {/* Right Column */}
          <section className="lg:col-span-7 space-y-10 pb-24 relative">

            {/* Panel A: Scanner Cockpit */}
            <div id="simulador" className="scroll-mt-24 border border-zinc-800 bg-zinc-900 p-6 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[#1f8fff]/40 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[#1f8fff]/40 rounded-bl-3xl" />

              <div className="border-b border-zinc-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white tracking-wider flex items-center">
                  <Search className="w-4 h-4 mr-2 text-[#1f8fff]" /> Scanner de Viabilidade Financeira
                </h2>
                <p className="text-[11px] text-zinc-400 mt-1">
                  Ajuste os parâmetros para auditar juros e custos invisíveis da compra.
                </p>
              </div>

              <form onSubmit={handleStartScan} className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <Label htmlFor="range-valor-d" className="text-zinc-300 uppercase tracking-wider">
                      Valor Nominal do Imóvel:
                    </Label>
                    <span className="text-[#1f8fff] font-bold text-sm bg-black px-2 py-0.5 border border-zinc-800 rounded-xl">
                      {formatCurrency(valorImovel)}
                    </span>
                  </div>
                  <input id="range-valor-d" type="range" min={150000} max={3000000} step={25000}
                    value={valorImovel} onChange={(e) => setValorImovel(Number(e.target.value))}
                    disabled={isScanning}
                    className="w-full h-1.5 bg-zinc-950 appearance-none cursor-pointer accent-[#1f8fff] rounded-xl" />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>R$ 150 mil</span>
                    <span>R$ 1.5 M</span>
                    <span>R$ 3.0 M</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <Label htmlFor="range-renda-d" className="text-zinc-300 uppercase tracking-wider">
                      Renda Mensal Familiar:
                    </Label>
                    <span className="text-[#1f8fff] font-bold text-sm bg-black px-2 py-0.5 border border-zinc-800 rounded-xl">
                      {formatCurrency(rendaMensal)}
                    </span>
                  </div>
                  <input id="range-renda-d" type="range" min={3000} max={50000} step={500}
                    value={rendaMensal} onChange={(e) => setRendaMensal(Number(e.target.value))}
                    disabled={isScanning}
                    className="w-full h-1.5 bg-zinc-950 appearance-none cursor-pointer accent-[#1f8fff] rounded-xl" />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>R$ 3 mil</span>
                    <span>R$ 26 mil</span>
                    <span>R$ 50 mil</span>
                  </div>
                </div>

                <Button type="submit" disabled={isScanning}
                  className="w-full rounded-2xl bg-black hover:bg-[#1f8fff] text-[#1f8fff] hover:text-white border border-[#1f8fff]/30 py-6 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center space-x-2">
                  {isScanning ? (
                    <>
                      <span className="w-2 h-2 bg-emerald-500 animate-ping mr-2 rounded-full" />
                      <span>Calculando ITBI e emolumentos cartórios SP...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      <span>Calcular Custos e Riscos</span>
                    </>
                  )}
                </Button>
              </form>

              <AnimatePresence>
                {isScanning && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#020817]/95 z-30 rounded-3xl flex flex-col items-center justify-center space-y-4">
                    <div className="w-48 h-1 bg-zinc-900 overflow-hidden relative rounded-full">
                      <motion.div initial={{ left: '-100%' }} animate={{ left: '100%' }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 bottom-0 w-24 bg-[#1f8fff] shadow-[0_0_12px_#1f8fff] rounded-full" />
                    </div>
                    <div className="text-[11px] text-[#1f8fff] tracking-wider uppercase">
                      Calculando custos para {formatCurrency(valorImovel)}
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      Projetando curva SAC e ITBI em SP...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel B: Scanner Results + IPA */}
            <div id="results-dashboard" className="scroll-mt-24">
              <AnimatePresence mode="wait">
                {showResults && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="space-y-6">
                    
                    <div className="flex items-center space-x-2 text-xs font-bold text-white">
                      <span className="w-1.5 h-1.5 bg-[#1f8fff] rounded-full" />
                      <span>Parecer de Viabilidade Preliminar</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-12 h-0.5 bg-[#1f8fff]" />
                        <div className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider">Custo Invisível à Vista</div>
                        <div className="text-2xl font-bold text-white mt-1">{formatCurrency(totalCustosOcultos)}</div>
                        <div className="text-[11px] text-red-400 mt-3 leading-relaxed border-t border-zinc-800/60 pt-2.5">
                          <AlertTriangle className="w-3 h-3 inline mr-1" /> 
                          Provisionar taxas de ITBI de <span className="font-bold">{formatCurrency(custoITBI)}</span> e Registro/Escritura de <span className="font-bold">{formatCurrency(custoRegistroEscritura)}</span>.
                        </div>
                      </div>

                      <div className={`bg-zinc-900 border p-5 rounded-3xl relative overflow-hidden ${isComprometimentoAlto ? 'border-red-400/30' : 'border-zinc-800'}`}>
                        <div className={`absolute top-0 left-0 w-12 h-0.5 ${isComprometimentoAlto ? 'bg-red-400' : 'bg-emerald-400'}`} />
                        <div className="text-zinc-400 text-[11px] uppercase font-bold tracking-wider">Parcela SAC / Renda</div>
                        <div className={`text-2xl font-bold mt-1 ${isComprometimentoAlto ? 'text-red-400' : 'text-emerald-400'}`}>
                          {comprometeRendaPercent.toFixed(1)}% Comprometimento
                        </div>
                        <div className="text-[11px] text-zinc-300 mt-3 leading-relaxed border-t border-zinc-800/60 pt-2.5">
                          Primeira parcela: <span className="font-bold">{formatCurrency(primeiraParcelaEst)}</span>. 
                          {isComprometimentoAlto && <span className="text-red-400 block font-bold mt-1">Risco alto: comprometimento maior que 30%</span>}
                        </div>
                      </div>
                    </div>

                    {/* Chart */}
                    <div className="bg-zinc-900 border border-zinc-800 p-5 rounded-3xl relative">
                      <div className="flex justify-between border-b border-zinc-800 pb-2.5 mb-4 text-[11px] font-bold text-white">
                        <span>Estimativa de Custos da Compra</span>
                        <span className="text-[#1f8fff]">Interativo</span>
                      </div>
                      <div className="flex justify-center items-center py-4 bg-black/40 border border-zinc-800/80 rounded-2xl">
                        <svg width="100%" height="200" viewBox="0 0 500 200" preserveAspectRatio="none">
                          <line x1="0" y1="40" x2="500" y2="40" stroke="#27272a" strokeDasharray="3,3" />
                          <line x1="0" y1="100" x2="500" y2="100" stroke="#27272a" strokeDasharray="3,3" />
                          <line x1="0" y1="160" x2="500" y2="160" stroke="#27272a" strokeDasharray="3,3" />
                          {(() => {
                            const h1 = 150;
                            const h2 = Math.max(25, Math.min(150, (totalCustosOcultos / valorImovel) * 350));
                            const h3 = Math.max(25, Math.min(150, (jurosAcumuladosPrimeiroAno / valorImovel) * 200));
                            return (
                              <>
                                <rect x="60" y={170 - h1} width="50" height={h1} fill="#27272a" stroke="#3f3f46" rx="4" />
                                <text x="85" y={160 - h1} textAnchor="middle" fill="#a1a1aa" fontSize="9">{formatCurrency(valorImovel)}</text>
                                <text x="85" y="185" textAnchor="middle" fill="#71717a" fontSize="8">IMÓVEL</text>

                                <rect x="220" y={170 - h2} width="50" height={h2} fill="rgba(239,68,68,0.1)" stroke="#ef4444" rx="4" />
                                <text x="245" y={160 - h2} textAnchor="middle" fill="#ef4444" fontSize="9">{formatCurrency(totalCustosOcultos)}</text>
                                <text x="245" y="185" textAnchor="middle" fill="#71717a" fontSize="8">TAXAS</text>

                                <rect x="380" y={170 - h3} width="50" height={h3} fill="rgba(31,143,255,0.05)" stroke="#1f8fff" rx="4" />
                                <text x="405" y={160 - h3} textAnchor="middle" fill="#1f8fff" fontSize="9">{formatCurrency(jurosAcumuladosPrimeiroAno)}</text>
                                <text x="405" y="185" textAnchor="middle" fill="#71717a" fontSize="8">JUROS A1</text>

                                <path d={`M 110 ${170 - h1} L 220 ${170 - h2} L 380 ${170 - h3}`} fill="none" stroke="#1f8fff" strokeWidth="1" strokeDasharray="4,4" />
                              </>
                            );
                          })()}
                        </svg>
                      </div>
                    </div>

                    {/* IPA Score Section (Desktop) */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl relative overflow-hidden">
                      <div className="flex items-center space-x-2 mb-5">
                        <Gauge className="w-5 h-5 text-[#1f8fff]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Índice Pinheiro Azul (Prévia)</span>
                        <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full ml-auto">IPA</span>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        {/* IPA Circle */}
                        <div className="relative w-28 h-28 flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="#27272a" strokeWidth="5" />
                            <motion.circle cx="50" cy="50" r="40" fill="transparent"
                              stroke={ipaColor} strokeWidth="5" strokeDasharray="251.2"
                              initial={{ strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 251.2 - (251.2 * ipaScore) / 10 }}
                              transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-white">{ipaScore}</span>
                            <span className="text-[8px] text-zinc-500 uppercase">de 10</span>
                          </div>
                        </div>

                        {/* IPA Info */}
                        <div className="space-y-3 flex-1">
                          <div>
                            <span className="text-sm font-bold" style={{ color: ipaColor }}>{ipaLabel}</span>
                            <p className="text-zinc-400 text-xs leading-relaxed mt-1">{ipaDescription}</p>
                          </div>
                          
                          {/* Traffic Light Legend */}
                          <div className="flex gap-4 text-[10px]">
                            <div className="flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-400" />
                              <span className="text-zinc-400">8-10 Seguro</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-yellow-500" />
                              <span className="text-zinc-400">5-7 Cautela</span>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-red-400" />
                              <span className="text-zinc-400">0-4 Risco</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-[10px] text-zinc-500 mt-4 border-t border-zinc-800 pt-3">
                        Nota preliminar baseada nos dados informados. O Dossiê completo inclui análise regional detalhada, verificação jurídica e simulação de crédito real.
                      </p>
                    </div>

                    {/* Recommendation CTA */}
                    <div className="border border-zinc-800 bg-zinc-900 p-6 rounded-3xl space-y-4">
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-5 h-5 text-[#1f8fff]" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Recomendação de Análise Completa</span>
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed">
                        O Dossiê de Viabilidade audita esses números confrontando com a base cartorial específica do endereço do imóvel na Zona Leste e analisando a saúde de indexadores da sua proposta de crédito.
                      </p>
                      <a href={whatsappUrl} target="_blank" rel="noreferrer"
                        className="flex items-center justify-center border border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/25 text-emerald-400 font-bold px-8 py-5 text-sm uppercase tracking-wider transition-colors w-full rounded-2xl">
                        <MessageSquare className="w-4 h-4 mr-2" /> Solicitar Dossiê de Viabilidade — R$ 147
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Panel C: Report Folders */}
            <div className="border border-zinc-800 bg-zinc-900 p-6 rounded-3xl relative overflow-hidden">
              <div className="border-b border-zinc-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white tracking-wider flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-[#1f8fff]" /> O que o Dossiê Esclarece
                </h2>
              </div>
              <div className="relative">
                <div className="flex flex-wrap gap-1 border-b border-zinc-800 relative z-10">
                  {folders.map((folder, idx) => (
                    <button key={idx} onClick={() => setActiveFolderTab(idx)}
                      className={`relative px-3 py-2 text-[10px] font-bold tracking-wider uppercase transition-all duration-200 rounded-t-xl ${
                        activeFolderTab === idx 
                        ? 'bg-zinc-950 border-t border-x border-zinc-800 text-[#1f8fff] pb-[5px] -mb-[1px]' 
                        : 'bg-zinc-950/60 border-t border-x border-transparent text-zinc-500 hover:text-zinc-300'
                      }`}>
                      {folder.title}
                    </button>
                  ))}
                </div>
                <div className="bg-zinc-950 border-x border-b border-zinc-800 p-6 min-h-[260px] flex flex-col justify-between relative -mt-[1px] rounded-b-3xl">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-lg">{folders[activeFolderTab].code}</span>
                      <span className="text-[10px] text-[#1f8fff] font-bold">{folders[activeFolderTab].tag}</span>
                    </div>
                    <h4 className="text-base font-bold text-white uppercase">{folders[activeFolderTab].headline}</h4>
                    <p className="text-zinc-400 text-[13px] leading-relaxed">{folders[activeFolderTab].desc}</p>
                  </div>
                  <div className="border-t border-zinc-900 pt-4 flex justify-between text-xs">
                    <div>
                      <span className="text-zinc-500 text-[10px] uppercase">Elemento</span>
                      <span className="text-white font-bold block mt-0.5">{folders[activeFolderTab].val}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-zinc-500 text-[10px] uppercase">Detalhe</span>
                      <span className="text-zinc-300 block mt-0.5">{folders[activeFolderTab].details}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel D: Blueprint Flow */}
            <div className="border border-zinc-800 bg-zinc-900 p-6 rounded-3xl relative">
              <div className="border-b border-zinc-800 pb-3 mb-6">
                <h2 className="text-lg font-bold text-white tracking-wider flex items-center">
                  <Layers className="w-4 h-4 mr-2 text-[#1f8fff]" /> Fluxo da Análise
                </h2>
              </div>
              <div className="space-y-6 relative">
                <div className="absolute left-[20px] top-[24px] bottom-[24px] w-0.5 border-l border-dashed border-zinc-800/80" />
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 border border-[#1f8fff]/20 bg-zinc-950 rounded-xl flex items-center justify-center text-[#1f8fff] text-xs font-bold">1</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Submissão</h4>
                    <p className="text-xs text-zinc-300">Você envia o link do anúncio ou espelho de parcelamento recebido via WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 border border-emerald-500/20 bg-zinc-950 rounded-xl flex items-center justify-center text-emerald-400 text-xs font-bold">2</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cruzamento</h4>
                    <p className="text-xs text-zinc-300">Cruzamos com o histórico regional de vendas, estimamos a curva SAC de juros e provisionamos impostos.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 border border-violet-500/20 bg-zinc-950 rounded-xl flex items-center justify-center text-violet-400 text-xs font-bold">3</div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Dossiê</h4>
                    <p className="text-xs text-zinc-300">Entregamos o Dossiê técnico conclusivo com parecer independente do analista em até 48h.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel E: Auditor Board */}
            <div className="border border-zinc-800 bg-zinc-900 p-6 rounded-3xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 border border-[#1f8fff]/20 bg-zinc-950 rounded-2xl flex items-center justify-center text-[#1f8fff] flex-shrink-0">
                  <ShieldCheck className="w-8 h-8 text-[#1f8fff]" />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-[#1f8fff] font-bold tracking-wider uppercase">Responsabilidade Analítica</span>
                  <h3 className="text-base font-bold text-white uppercase tracking-wide">Time Pinheiro Azul</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    Nossa análise de viabilidade imobiliária audita os dados de precificação regional, custos de transferência e fluxos de parcelamento com total precisão e independência. O Dossiê garante que você tome a decisão certa com base em dados de mercado reais.
                  </p>
                </div>
              </div>
            </div>

            {/* Panel F: Final CTA */}
            <div className="text-center space-y-6 pt-8 border-t border-zinc-900">
              <h2 className="text-2xl font-bold text-white tracking-tight max-w-lg mx-auto">
                Pronto para colocar todos os números na mesa?
              </h2>
              <a href={whatsappUrl} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center border border-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/25 text-emerald-400 font-bold px-8 py-5 text-sm uppercase tracking-wider transition-all duration-300 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <MessageSquare className="w-4 h-4 mr-2" /> Solicitar Dossiê do Meu Imóvel — R$ 147
              </a>
            </div>

          </section>

        </main>

        {/* Footer */}
        <footer className="border-t border-zinc-900 bg-[#020817] py-12 px-6 relative z-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-500">
            <p>© {new Date().getFullYear()} Inteligência Imobiliária · Pinheiro Azul</p>
            <p className="max-w-md text-right md:text-left leading-relaxed text-[10px]">
              Dossiê opinativo técnico de viabilidade financeira de mercado.
            </p>
          </div>
        </footer>

      </div>

    </div>
  );
}