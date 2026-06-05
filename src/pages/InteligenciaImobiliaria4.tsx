import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  DollarSign, 
  Percent, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Layers, 
  MessageSquare, 
  Search, 
  Calculator, 
  BookOpen,
  Clock,
  Compass
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function InteligenciaImobiliaria4() {
  // States for Calculator
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

  // IPA Score (based on inputs)
  const ipaScore = isComprometimentoAlto ? 4.2 : 7.8;
  const ipaColor = ipaScore >= 8 ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : ipaScore >= 5 ? 'text-amber-600 border-amber-200 bg-amber-50' : 'text-rose-600 border-rose-200 bg-rose-50';
  const ipaBadgeBg = ipaScore >= 8 ? 'bg-emerald-500' : ipaScore >= 5 ? 'bg-yellow-500' : 'bg-rose-500';
  const ipaLabel = ipaScore >= 8 ? 'Compra Recomendada' : ipaScore >= 5 ? 'Proceda com Cautela' : 'Risco Alto';
  const ipaDescription = ipaScore >= 8 
    ? 'O imóvel possui preço compatível regionalmente e o comprometimento financeiro está saudável.'
    : ipaScore >= 5 
    ? 'Existem pontos de atenção mitigáveis. O Dossiê completo detalha os riscos de crédito e taxas.'
    : 'Cenário financeiro com risco elevado. Recomenda-se cautela no comprometimento patrimonial.';

  const handleStartScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsScanning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsScanning(false);
      setShowResults(true);
      const resultsSection = document.getElementById('resultado-simulacao');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1800);
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

  const messageConsultoria = encodeURIComponent(
    `Olá! Gostaria de agendar a Análise de Viabilidade Imobiliária do meu imóvel de ${formatCurrency(valorImovel)}. Quero receber o Dossiê Completo.`
  );
  const whatsappUrlConsultoria = `https://wa.me/5511930418684?text=${messageConsultoria}`;

  const messageEbook = encodeURIComponent(
    `Olá! Gostaria de adquirir o Guia Prático de Compra de Imóvel (Ebook).`
  );
  const whatsappUrlEbook = `https://wa.me/5511930418684?text=${messageEbook}`;

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#2a333c] font-sans antialiased selection:bg-[#1f8fff]/10 selection:text-brand-primary">
      
      {/* ── Header Flutuante / Elegante ── */}
      <header className="sticky top-0 z-50 bg-[#fdfbf7]/80 backdrop-blur-md border-b border-stone-200/60 px-6 py-4 transition-all duration-300">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 border border-brand-primary/20 bg-brand-primary rounded-lg flex items-center justify-center text-white font-serif font-bold text-sm shadow-sm">
              P
            </div>
            <div>
              <span className="font-serif font-bold text-sm tracking-wide text-brand-primary block leading-none">
                Pinheiro Azul
              </span>
              <span className="text-[9px] text-zinc-500 uppercase tracking-widest block mt-0.5 font-sans">
                Consultoria Patrimonial
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#simulador" 
              className="text-xs font-semibold text-zinc-600 hover:text-brand-primary transition-colors hidden sm:block">
              Simular Custos
            </a>
            <a href={whatsappUrlConsultoria} target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center bg-brand-primary hover:bg-[#002244] text-white text-[11px] font-bold px-4 py-2 rounded-xl transition-all duration-200 shadow-sm">
              Falar com Analista
            </a>
          </div>
        </div>
      </header>

      {/* ── Hero / Apresentação Editorial ── */}
      <main className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        
        <section className="text-center max-w-3xl mx-auto space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 border border-brand-primary/10 bg-[#f4f1ea] rounded-full text-brand-primary">
            <span className="w-1.5 h-1.5 bg-[#1f8fff] rounded-full" />
            <span className="text-[10px] uppercase tracking-widest font-semibold font-sans">
              Inteligência Imobiliária · Zona Leste SP
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-primary leading-tight tracking-tight">
            Compre o seu imóvel com a segurança de quem analisa os números.
          </h1>

          <p className="text-zinc-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Ajudamos compradores na Zona Leste a planejarem a parte financeira e jurídica da aquisição mais importante de suas vidas. Sem pressa, sem conflitos de interesses.
          </p>
        </section>

        {/* ── Duas Opções de Entrada ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          {/* Box Ebook */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Passo Inicial</span>
                <h3 className="text-xl font-serif font-bold text-brand-primary mt-1">
                  Guia Prático de Compra (Ebook)
                </h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Um manual didático para quem está no começo da jornada de busca e quer entender regras de financiamento, uso de FGTS, negociação direta e como evitar armadilhas contratuais.
              </p>
            </div>
            
            <div className="pt-8 border-t border-stone-100 mt-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Acesso Único</span>
                <span className="text-lg font-serif font-bold text-brand-primary">R$ 47</span>
              </div>
              <a href={whatsappUrlEbook} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center bg-[#f4f1ea] hover:bg-stone-200 text-zinc-800 text-xs font-bold px-5 py-3 rounded-2xl transition-all duration-200">
                Adquirir Ebook <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

          {/* Box Consultoria */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-8 hover:shadow-md transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/5 rounded-full blur-2xl" />
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-[#1f8fff]/10 flex items-center justify-center text-[#1f8fff]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-[#1f8fff] uppercase font-bold tracking-wider">Análise do Imóvel Escolhido</span>
                <h3 className="text-xl font-serif font-bold text-brand-primary mt-1">
                  Dossiê de Viabilidade Imobiliária
                </h3>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Ideal para quem já achou o imóvel específico e deseja uma auditoria técnica e independente de mercado. Analisamos se o preço condiz com a região, provisionamos taxas exatas e emitimos o veredito técnico.
              </p>
            </div>
            
            <div className="pt-8 border-t border-stone-100 mt-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-zinc-400 block uppercase">Relatório Individual</span>
                <span className="text-lg font-serif font-bold text-brand-primary">R$ 147</span>
              </div>
              <a href={whatsappUrlConsultoria} target="_blank" rel="noreferrer"
                className="inline-flex items-center justify-center bg-brand-primary hover:bg-[#002244] text-white text-xs font-bold px-5 py-3 rounded-2xl transition-all duration-200 shadow-sm">
                Solicitar Consultoria <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>

        </section>

        {/* ── O Simulador Consultivo (Ficha Técnica / Folha de Cálculo) ── */}
        <section id="simulador" className="scroll-mt-24 mb-20">
          <div className="bg-[#f4f1ea] border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-8">
            
            <div className="border-b border-stone-200/80 pb-4">
              <h2 className="text-xl font-serif font-bold text-brand-primary flex items-center">
                <Calculator className="w-5 h-5 mr-2 text-zinc-600" />
                Simulador de Viabilidade Imobiliária
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Uma prévia didática dos custos e parcelamento para balizar seu planejamento financeiro.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Sliders lado esquerdo */}
              <div className="space-y-6">
                
                {/* Sliders Valor */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <Label htmlFor="range-valor" className="text-zinc-600 uppercase tracking-wider font-semibold">
                      Valor Nominal do Imóvel:
                    </Label>
                    <span className="font-mono text-sm font-bold bg-white text-brand-primary border border-stone-200 px-3 py-1 rounded-xl shadow-xs">
                      {formatCurrency(valorImovel)}
                    </span>
                  </div>
                  <input 
                    id="range-valor" 
                    type="range" 
                    min={150000} 
                    max={3000000} 
                    step={25000}
                    value={valorImovel} 
                    onChange={(e) => setValorImovel(Number(e.target.value))}
                    disabled={isScanning}
                    className="w-full h-1 bg-stone-300 appearance-none cursor-pointer accent-brand-primary rounded-lg" 
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <button type="button" onClick={() => adjustValor(-50000)} className="hover:text-brand-primary">- R$ 50k</button>
                    <span>R$ 150k a R$ 3M</span>
                    <button type="button" onClick={() => adjustValor(50000)} className="hover:text-brand-primary">+ R$ 50k</button>
                  </div>
                </div>

                {/* Sliders Renda */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <Label htmlFor="range-renda" className="text-zinc-600 uppercase tracking-wider font-semibold">
                      Renda Mensal Familiar:
                    </Label>
                    <span className="font-mono text-sm font-bold bg-white text-brand-primary border border-stone-200 px-3 py-1 rounded-xl shadow-xs">
                      {formatCurrency(rendaMensal)}
                    </span>
                  </div>
                  <input 
                    id="range-renda" 
                    type="range" 
                    min={3000} 
                    max={50000} 
                    step={500}
                    value={rendaMensal} 
                    onChange={(e) => setRendaMensal(Number(e.target.value))}
                    disabled={isScanning}
                    className="w-full h-1 bg-stone-300 appearance-none cursor-pointer accent-brand-primary rounded-lg" 
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <button type="button" onClick={() => adjustRenda(-1000)} className="hover:text-brand-primary">- R$ 1k</button>
                    <span>R$ 3k a R$ 50k</span>
                    <button type="button" onClick={() => adjustRenda(1000)} className="hover:text-brand-primary">+ R$ 1k</button>
                  </div>
                </div>

                <Button 
                  onClick={() => handleStartScan()} 
                  disabled={isScanning}
                  className="w-full rounded-2xl bg-brand-primary hover:bg-[#002244] text-white py-6 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm"
                >
                  {isScanning ? (
                    <>
                      <span className="w-1.5 h-1.5 bg-emerald-400 animate-ping rounded-full mr-2" />
                      <span>Estruturando dados de viabilidade...</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-1.5" />
                      <span>Processar Análise Financeira</span>
                    </>
                  )}
                </Button>

              </div>

              {/* Lado Direito: Ficha Limpa de Resultados */}
              <div className="border border-stone-200 bg-white p-6 rounded-2xl flex flex-col justify-between min-h-[250px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showResults && !isScanning && (
                    <motion.div 
                      key="prompt"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-3 py-6"
                    >
                      <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center text-zinc-400">
                        <Compass className="w-6 h-6 animate-pulse" />
                      </div>
                      <h4 className="font-serif font-bold text-zinc-700 text-sm">Ficha Técnica de Simulação</h4>
                      <p className="text-xs text-zinc-400 max-w-xs leading-relaxed">
                        Ajuste as barras de valores e clique no botão acima para estruturar a planilha de custos de aquisição do imóvel.
                      </p>
                    </motion.div>
                  )}

                  {isScanning && (
                    <motion.div 
                      key="scanning"
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      exit={{ opacity: 0 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-4 py-8"
                    >
                      <div className="w-32 h-[2px] bg-stone-100 overflow-hidden relative rounded-full">
                        <motion.div 
                          initial={{ left: '-100%' }} 
                          animate={{ left: '100%' }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                          className="absolute top-0 bottom-0 w-16 bg-[#1f8fff] rounded-full" 
                        />
                      </div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest animate-pulse font-sans">
                        Calculando impostos e taxas em São Paulo...
                      </span>
                    </motion.div>
                  )}

                  {showResults && !isScanning && (
                    <motion.div 
                      key="results"
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 h-full flex flex-col justify-between"
                    >
                      {/* Document Details */}
                      <div className="space-y-3 font-sans text-xs">
                        <div className="flex justify-between border-b border-stone-100 pb-2">
                          <span className="text-zinc-500">Valor do Imóvel:</span>
                          <span className="font-mono font-bold text-brand-primary">{formatCurrency(valorImovel)}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-100 pb-2">
                          <span className="text-zinc-500">Previsão ITBI (3% SP):</span>
                          <span className="font-mono text-zinc-700 font-semibold">{formatCurrency(custoITBI)}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-100 pb-2">
                          <span className="text-zinc-500">Escritura & Registro (1.5%):</span>
                          <span className="font-mono text-zinc-700 font-semibold">{formatCurrency(custoRegistroEscritura)}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-200 pb-2 bg-stone-50 px-2 py-1 -mx-2 rounded-lg">
                          <span className="text-brand-primary font-semibold">Reserva de Entrada (Taxas):</span>
                          <span className="font-mono font-bold text-brand-primary">{formatCurrency(totalCustosOcultos)}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-100 pb-2">
                          <span className="text-zinc-500">Primeira Parcela SAC (Est. 80%):</span>
                          <span className="font-mono text-zinc-700 font-semibold">{formatCurrency(primeiraParcelaEst)}</span>
                        </div>
                        <div className="flex justify-between border-b border-stone-100 pb-2">
                          <span className="text-zinc-500">Comprometimento de Renda:</span>
                          <span className={`font-mono font-bold ${isComprometimentoAlto ? 'text-rose-600' : 'text-emerald-600'}`}>
                            {comprometeRendaPercent.toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      {/* Stress Check */}
                      {isComprometimentoAlto && (
                        <div className="border border-rose-200 bg-rose-50/50 p-3 rounded-xl flex items-start space-x-2 text-rose-700">
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                          <p className="text-[10px] leading-relaxed">
                            O comprometimento de renda ultrapassa o limite recomendado de 30%. O Dossiê completo apresentará simulações de cenários e propostas para aprovação.
                          </p>
                        </div>
                      )}

                      {/* Button request */}
                      <a href={whatsappUrlConsultoria} target="_blank" rel="noreferrer"
                        className="flex items-center justify-center bg-brand-primary hover:bg-[#002244] text-white text-[11px] font-bold py-3.5 rounded-xl transition-colors w-full shadow-sm">
                        <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                        Validar Dossiê do Imóvel — R$ 147
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* IPA Score preview below simulation */}
            <AnimatePresence>
              {showResults && !isScanning && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-stone-200/80 pt-6 space-y-4 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                    
                    {/* Circle Score */}
                    <div className="flex items-center space-x-4 shrink-0">
                      <div className="relative w-16 h-16 flex items-center justify-center rounded-full border border-stone-200 bg-[#fdfbf7]">
                        <span className="text-xl font-bold font-serif text-brand-primary">{ipaScore}</span>
                        <div className={`absolute top-0 right-0 w-2.5 h-2.5 rounded-full ${ipaBadgeBg}`} />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-bold">Saúde da Compra</span>
                        <span className="text-xs font-serif font-bold text-brand-primary">Índice Pinheiro Azul</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-brand-primary uppercase">{ipaLabel}</h4>
                      <p className="text-xs text-zinc-600 leading-relaxed">
                        {ipaDescription}
                      </p>
                    </div>

                    {/* Scale legend */}
                    <div className="ml-auto text-[9px] text-zinc-400 space-y-1 shrink-0 hidden md:block">
                      <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /><span>8-10 Recomendado</span></div>
                      <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-yellow-500" /><span>5-7 Cautela</span></div>
                      <div className="flex items-center space-x-1.5"><span className="w-1.5 h-1.5 rounded-full bg-rose-500" /><span>0-4 Alto Risco</span></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </section>

        {/* ── Anatomia do Dossiê de Viabilidade ── */}
        <section className="mb-20 space-y-8">
          
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl font-serif font-bold text-brand-primary">
              O que você recebe no Dossiê de Viabilidade
            </h2>
            <p className="text-xs text-zinc-500">
              Um relatório objetivo de 3 a 5 páginas estruturado sob 5 análises essenciais.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {[
              {
                step: "01",
                title: "Auditoria Regional de Preço",
                desc: "Análise técnica comparativa do preço por m² anunciado com a base de transações efetivas registradas nos cartórios daquela rua e região nos últimos meses."
              },
              {
                step: "02",
                title: "Mapa de Custos Ocultos",
                desc: "Provisão minuciosa das taxas de transferência municipal (ITBI) e emolumentos do Cartório de Registro de Imóveis para o seu CEP imobiliário."
              },
              {
                step: "03",
                title: "Simulação SAC e Juros",
                desc: "Mapeamento real do custo de financiamento, dividindo o valor de juros e amortizações mês a mês e detalhando os seguros habitacionais obrigatórios."
              },
              {
                step: "04",
                title: "Análise do INCC e Cláusulas",
                desc: "Para imóveis na planta ou em obras: a projeção da correção do saldo devedor e parcelas intermediárias, evitando surpresas de cobranças residuais."
              },
              {
                step: "05",
                title: "Veredito Conclusivo",
                desc: "Um parecer isento de comissões. Categorizamos a operação em Aprovada, Cautela Necessária ou Não Recomendada, acompanhada dos argumentos técnicos."
              }
            ].map((folder, index) => (
              <div 
                key={index} 
                className="bg-white border border-stone-200/80 rounded-2xl p-6 space-y-4 hover:shadow-xs transition-shadow duration-200"
              >
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="font-mono text-xs text-zinc-400">{folder.step}</span>
                  <span className="text-[10px] text-brand-primary uppercase font-bold tracking-wider font-sans">Análise</span>
                </div>
                <h4 className="text-base font-serif font-bold text-brand-primary">{folder.title}</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">{folder.desc}</p>
              </div>
            ))}

            {/* CTA do Dossiê na Grid */}
            <div className="bg-[#f4f1ea] border border-stone-200/80 rounded-2xl p-6 flex flex-col justify-between items-start">
              <div className="space-y-2">
                <span className="text-[10px] text-zinc-400 uppercase font-bold">Fluxo Rápido</span>
                <h4 className="text-base font-serif font-bold text-brand-primary">Consultoria em 48 horas</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  Você nos envia as informações básicas do anúncio do imóvel via WhatsApp e entregamos a análise em formato PDF em até 2 dias úteis.
                </p>
              </div>
              <a href={whatsappUrlConsultoria} target="_blank" rel="noreferrer"
                className="w-full text-center bg-brand-primary hover:bg-[#002244] text-white text-[11px] font-bold py-3 rounded-xl transition-colors shadow-xs mt-4">
                Solicitar Dossiê por R$ 147
              </a>
            </div>

          </div>
        </section>

        {/* ── Seção O que o Guia Prático Revela (Ebook) ── */}
        <section className="bg-white border border-stone-200/80 rounded-3xl p-8 md:p-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-1.5 text-amber-600">
                <BookOpen className="w-4.5 h-4.5" />
                <span className="text-[10px] uppercase tracking-widest font-bold font-sans">Conteúdo Educativo</span>
              </div>
              
              <h2 className="text-3xl font-serif font-bold text-brand-primary leading-tight">
                Antes de assinar a proposta, eduque-se financeiramente.
              </h2>
              
              <p className="text-zinc-600 text-sm leading-relaxed">
                Desenvolvemos o **Guia Prático de Compra de Imóvel** para que você conheça as regras do jogo. Sem jargões burocráticos, focamos exatamente no que você precisa saber para economizar dezenas de milhares de reais em taxas e taxas abusivas.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Como usar seu FGTS na entrada de forma otimizada.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Passo a passo da documentação do comprador e vendedor.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Os cuidados técnicos cruciais na vistoria de chaves.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Dicas práticas de negociação direta com proprietários.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#fbfaf7] border border-stone-200 p-6 rounded-2xl space-y-4 text-center">
              <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider">Disponível via PDF</span>
              <div className="w-24 h-32 bg-brand-primary text-white mx-auto rounded-lg shadow-md flex items-center justify-center font-serif font-bold text-xs p-4 leading-normal">
                Guia Prático de Compra
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-brand-primary block">R$ 47</span>
                <span className="text-[10px] text-zinc-400 uppercase">Pagamento Único</span>
              </div>
              <a href={whatsappUrlEbook} target="_blank" rel="noreferrer"
                className="block w-full bg-brand-primary hover:bg-[#002244] text-white text-[11px] font-bold py-3.5 rounded-xl transition-colors shadow-xs">
                Adquirir Guia de Compra
              </a>
            </div>

          </div>
        </section>

        {/* ── Time & Filosofia de Isenção ── */}
        <section className="border-t border-stone-200/80 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xl font-serif font-bold text-brand-primary leading-tight">
              Uma abordagem consultiva, humana e isenta.
            </h3>
            <p className="text-zinc-600 text-xs leading-relaxed">
              Diferente de corretoras que dependem exclusivamente da assinatura do contrato para receber sua comissão, nossa consultoria não ganha taxas de intermediação de vendas nesta página.
            </p>
          </div>
          
          <div className="lg:col-span-8 bg-[#f4f1ea] border border-stone-200/80 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-14 h-14 border border-brand-primary/10 bg-brand-primary text-white rounded-2xl flex items-center justify-center font-serif font-bold text-lg shrink-0">
                PA
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-brand-primary font-bold uppercase tracking-wider font-sans">
                  Nosso Compromisso
                </span>
                <h4 className="text-base font-serif font-bold text-brand-primary">Time Pinheiro Azul</h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  "Nosso objetivo com a assessoria independente é municiar o comprador com dados técnicos antes da proposta. Se identificarmos riscos ou se o metro quadrado estiver sobreavaliado, nosso parecer será transparente e documentado. Se a operação for viável e segura, você prossegue com tranquilidade."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-200/80 bg-[#fbfaf7] py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-zinc-500">
          <p>© {new Date().getFullYear()} Pinheiro Azul · Inteligência Imobiliária</p>
          <p className="max-w-md text-right md:text-left leading-relaxed">
            Dossiê de viabilidade imobiliária com parecer opinativo técnico e independente.
          </p>
        </div>
      </footer>

    </div>
  );
}
