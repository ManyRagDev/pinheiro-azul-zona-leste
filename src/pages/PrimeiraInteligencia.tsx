import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ChevronRight, 
  TrendingUp, 
  AlertTriangle, 
  Check, 
  BookOpen, 
  MessageSquare, 
  Calendar, 
  DollarSign, 
  MapPin, 
  User, 
  FileText, 
  Lock,
  ArrowLeft,
  Info,
  CheckSquare,
  Square
} from 'lucide-react';
import { toast } from 'sonner';

// Custom format helper
const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

export default function PrimeiraInteligencia() {
  // --- STATE ---
  const [step, setStep] = useState<number>(1);
  
  // Step 1 Inputs
  const [renda, setRenda] = useState<string>('6500');
  const [entrada, setEntrada] = useState<string>('20000');
  const [valorImovel, setValorImovel] = useState<string>('240000');

  // Step 3 Input
  const [momento, setMomento] = useState<string>('');

  // Step 4 Input (Adaptive)
  const [opcaoAdaptativa, setOpcaoAdaptativa] = useState<string>('');

  // Step 5 Input
  const [apoio, setApoio] = useState<string>('');

  // Step 6 Capture Form
  const [nome, setNome] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

  // Checklist state for the result screen
  const [checkedTasks, setCheckedTasks] = useState<string[]>([
    'FGTS', 'Documentos'
  ]);

  // --- CALCULATIONS ---
  const nRenda = parseFloat(renda.replace(/\D/g, '')) || 0;
  const nEntrada = parseFloat(entrada.replace(/\D/g, '')) || 0;
  const nValorImovel = parseFloat(valorImovel.replace(/\D/g, '')) || 0;

  // Taxas Ocultas
  const custoITBI = nValorImovel * 0.03;
  const custoRegistroEscritura = nValorImovel * 0.015;
  const totalTaxasOcultas = custoITBI + custoRegistroEscritura;

  // Financiamento MCMV Máximo (80% do valor do imóvel)
  const valorFinanciadoMax = nValorImovel * 0.8;
  const entradaMinimaRequerida = nValorImovel * 0.2;
  const gapEntrada = Math.max(0, entradaMinimaRequerida - nEntrada);

  // Estimativa de Parcela (MCMV taxa média ~6.5% a.a. ou 0.54% a.m.)
  const taxaMensal = 0.065 / 12;
  const prazoMeses = 360;
  // Fórmular SAC (Primeira Parcela = Amortização Constante + Juros do Saldo Devedor Inicial)
  const amortizacaoConstante = valorFinanciadoMax / prazoMeses;
  const jurosPrimeiroMes = valorFinanciadoMax * taxaMensal;
  const primeiraParcelaEst = amortizacaoConstante + jurosPrimeiroMes;

  const comprometimentoRendaPercent = nRenda > 0 ? (primeiraParcelaEst / nRenda) * 100 : 0;
  const isComprometimentoAlto = comprometimentoRendaPercent > 30;

  // Determine Recommendation based on rules
  const getRecommendation = () => {
    if (momento === 'D') {
      return {
        tipo: 'negociacao',
        titulo: 'Orientação Online para Negociação',
        preco: 'Gratuito inicialmente',
        descricao: 'Recomendamos a Orientação de Fechamento porque você já encontrou o imóvel e está negociando. Nossa prioridade é te ajudar a entender os riscos da promessa de compra e venda, taxas surpresas de repasse e validação inicial da documentação sem que você sofra pressão comercial.',
        cta: 'Solicitar Orientação de Negociação',
        mensagemWhats: `Olá! Concluí meu diagnóstico em /1inteligencia. Já encontrei um imóvel de ${fmt(nValorImovel)} e estou negociando. Gostaria de uma ajuda inicial sobre a papelada e os próximos cuidados.`
      };
    }

    if (apoio === 'sozinho') {
      return {
        tipo: 'guia',
        titulo: 'Guia Prático do Primeiro Imóvel MCMV',
        preco: 'R$ 47',
        descricao: 'Indicamos este guia porque você está nas fases iniciais e prefere ter autonomia total para se organizar. O material é 100% focado na Zona Leste e inclui um checklist de documentos Caixa, planilha de custos reais e roteiro para visitas.',
        cta: 'Conhecer Guia Prático (R$ 47)',
        mensagemWhats: `Olá! Concluí o diagnóstico em /1inteligencia. Meu cenário recomendado foi o Guia Prático. Gostaria de saber como adquiri-lo.`
      };
    }

    if (apoio === 'conversar' || momento === 'A' || momento === 'B') {
      return {
        tipo: 'consultoria',
        titulo: 'Consultoria Online de Preparação',
        preco: 'R$ 147',
        descricao: 'Indicamos a Consultoria Online porque você deseja se organizar antes de sair buscando e tem dúvidas cruciais sobre entrada, financiamento Caixa e subsídios do Minha Casa Minha Vida. Vamos estruturar seu plano financeiro individual antes de você falar com qualquer corretor.',
        cta: 'Agendar Consultoria Online (R$ 147)',
        mensagemWhats: `Olá! Finalizei meu diagnóstico no /1inteligencia. Renda: ${fmt(nRenda)}, Entrada: ${fmt(nEntrada)}. A recomendação foi a Consultoria Online de Preparação. Gostaria de tirar dúvidas e agendar.`
      };
    }

    // Default or Active Search
    return {
      tipo: 'assessoria',
      titulo: 'Assessoria Completa de Compra',
      preco: 'Sob Consulta',
      descricao: 'Indicamos o acompanhamento completo porque você já está procurando imóveis ativamente na Zona Leste e quer a segurança de um consultor independente para filtrar opções, fazer a checagem jurídica e acompanhar as visitas técnicas de braço dado com você.',
      cta: 'Conversar sobre Assessoria de Compra',
      mensagemWhats: `Olá! Finalizei meu diagnóstico no /1inteligencia. Já estou buscando imóveis de ${fmt(nValorImovel)} e a recomendação foi a Assessoria Completa com acompanhamento de visitas. Como funciona?`
    };
  };

  const recomendacao = getRecommendation();

  // --- HANDLERS ---
  const formatInputCurrency = (value: string, setter: (val: string) => void) => {
    const numeric = value.replace(/\D/g, '');
    if (!numeric) {
      setter('0');
      return;
    }
    setter(numeric);
  };

  const handleNext = () => {
    if (step === 1) {
      if (nRenda <= 0 || nValorImovel <= 0) {
        toast.error('Por favor, preencha os valores para prosseguir.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!momento) {
        toast.error('Escolha a opção que melhor te descreve.');
        return;
      }
      if (momento === 'D') {
        // Option D (Already found property) bypasses adaptive question and support preference
        setStep(6);
      } else {
        setStep(4);
      }
    } else if (step === 4) {
      if (!opcaoAdaptativa) {
        toast.error('Por favor, selecione uma opção para continuar.');
        return;
      }
      setStep(5);
    } else if (step === 5) {
      if (!apoio) {
        toast.error('Selecione como prefere seguir.');
        return;
      }
      setStep(6);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
    else if (step === 4) setStep(3);
    else if (step === 5) setStep(4);
    else if (step === 6) {
      if (momento === 'D') {
        setStep(3);
      } else {
        setStep(5);
      }
    }
  };

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || (!whatsapp && !email)) {
      toast.error('Preencha seu nome e pelo menos um contato (WhatsApp ou E-mail).');
      return;
    }
    setIsUnlocked(true);
    toast.success('Mapa de Compra gerado com sucesso!');
  };

  const toggleTask = (taskId: string) => {
    if (checkedTasks.includes(taskId)) {
      setCheckedTasks(checkedTasks.filter(id => id !== taskId));
    } else {
      setCheckedTasks([...checkedTasks, taskId]);
    }
  };

  // --- RENDER HELPERS ---
  const renderProgressIndicator = () => {
    const stages = [
      { num: 1, label: 'Valores' },
      { num: 2, label: 'Cenário' },
      { num: 3, label: 'Momento' },
      { num: 4, label: 'Foco' },
      { num: 5, label: 'Apoio' },
      { num: 6, label: 'Mapa' }
    ];

    // Filter out step 4 and 5 if momento is 'D' (negociando)
    const activeStages = momento === 'D' 
      ? stages.filter(s => s.num !== 4 && s.num !== 5)
      : stages;

    return (
      <div className="w-full max-w-xl mx-auto mb-8 px-4">
        <div className="flex items-center justify-between relative">
          {/* Background connect line */}
          <div className="absolute top-1/2 left-0 right-0 h-[1.5px] bg-[#06192C] z-0 -translate-y-1/2" />
          
          {/* Active progress connect line */}
          <div 
            className="absolute top-1/2 left-0 h-[1.5px] bg-[#E43D30] z-0 -translate-y-1/2 transition-all duration-500 ease-in-out" 
            style={{ 
              width: `${((activeStages.findIndex(s => s.num === step)) / (activeStages.length - 1)) * 100}%` 
            }}
          />

          {activeStages.map((stage, idx) => {
            const isActive = stage.num === step;
            const isCompleted = activeStages.findIndex(s => s.num === step) > idx;
            
            return (
              <div key={stage.num} className="flex flex-col items-center relative z-10">
                <button
                  onClick={() => {
                    // Only allow navigating back to completed/reached steps
                    if (isCompleted) {
                      setStep(stage.num);
                    }
                  }}
                  disabled={!isCompleted}
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs border-[1.5px] transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#E43D30] text-[#FFFDF7] border-[#06192C] scale-110 shadow-[2px_2px_0px_0px_#06192C]' 
                      : isCompleted 
                        ? 'bg-[#28C7BA] text-[#06192C] border-[#06192C]'
                        : 'bg-[#FFFDF7] text-[#06192C]/50 border-[#06192C]/30'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : stage.num}
                </button>
                <span className={`text-[10px] uppercase font-bold tracking-wider mt-1.5 ${
                  isActive ? 'text-[#06192C]' : 'text-[#06192C]/50'
                }`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F0E8] text-[#06192C] font-sans pb-16">
      
      {/* --- HEADER --- */}
      <header className="border-b-[1.5px] border-[#06192C] bg-[#FFFDF7] sticky top-0 z-40 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tighter text-[#06192C] border-[1.5px] border-[#06192C] px-2 py-0.5 bg-[#F3D35B] shadow-[2px_2px_0px_0px_#06192C]">
              PA
            </span>
            <div>
              <span className="font-extrabold text-sm tracking-tight block leading-none">PINHEIRO AZUL</span>
              <span className="text-[9px] uppercase tracking-widest text-[#06192C]/60 font-bold">Assessoria de Compra</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-[#06192C]/60">
              Minha Casa Minha Vida ZL
            </span>
            <a
              href="https://wa.me/5511930418684"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 bg-[#28C7BA] hover:bg-[#20aba0] text-[#06192C] border-[1.5px] border-[#06192C] text-xs font-bold px-3 py-1.5 rounded-lg shadow-[2px_2px_0px_0px_#06192C] transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Falar com André
            </a>
          </div>
        </div>
      </header>

      {/* --- PROGRESS BAR --- */}
      <div className="py-6 bg-[#FFFDF7]/50 border-b-[1.5px] border-[#06192C]/10">
        {renderProgressIndicator()}
      </div>

      {/* --- MAIN INTERACTION CARD --- */}
      <main className="max-w-3xl mx-auto px-4 mt-8">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: ENTRADA DE DADOS */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#06192C] relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-24 h-24 bg-[#F3D35B] border-l-[1.5px] border-b-[1.5px] border-[#06192C] flex items-center justify-center rotate-12 translate-x-8 -translate-y-8">
                <span className="font-bold text-xs text-[#06192C] -rotate-12 mt-6 mr-6">MCMV</span>
              </div>

              <div className="max-w-xl">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E43D30] border-[1.5px] border-[#E43D30] px-2 py-0.5 rounded bg-[#E43D30]/5">
                  Etapa 01 · Finanças do Primeiro Imóvel
                </span>
                
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2 leading-none">
                  Vamos mapear seu caminho para a casa própria.
                </h1>
                
                <p className="text-sm text-[#06192C]/70 mb-8 leading-relaxed">
                  Sem anúncios com falsas promessas, sem empurrar o serviço mais caro. Insira seus números iniciais abaixo para entender suas possibilidades na Zona Leste.
                </p>

                {/* Form Inputs */}
                <div className="space-y-6">
                  {/* Campo Renda */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#06192C]">
                      Qual é a renda mensal familiar?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-sm font-bold text-[#06192C]/40">R$</span>
                      </div>
                      <input
                        type="text"
                        value={nRenda ? nRenda.toLocaleString('pt-BR') : ''}
                        onChange={(e) => formatInputCurrency(e.target.value, setRenda)}
                        placeholder="Ex: 5.500"
                        className="w-full bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-xl py-3.5 pl-10 pr-4 font-bold text-lg focus:outline-none focus:ring-0 focus:border-[#E43D30] focus:shadow-[2px_2px_0px_0px_#06192C] transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-[#06192C]/50 block">
                      Renda conjunta de quem participará do financiamento.
                    </span>
                  </div>

                  {/* Campo Entrada */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#06192C]">
                      Quanto possui de entrada disponível?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-sm font-bold text-[#06192C]/40">R$</span>
                      </div>
                      <input
                        type="text"
                        value={nEntrada ? nEntrada.toLocaleString('pt-BR') : ''}
                        onChange={(e) => formatInputCurrency(e.target.value, setEntrada)}
                        placeholder="Ex: 15.000"
                        className="w-full bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-xl py-3.5 pl-10 pr-4 font-bold text-lg focus:outline-none focus:ring-0 focus:border-[#E43D30] focus:shadow-[2px_2px_0px_0px_#06192C] transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-[#06192C]/50 block">
                      Pode somar dinheiro em conta, poupança e FGTS disponível.
                    </span>
                  </div>

                  {/* Campo Valor do Imóvel */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-[#06192C]">
                      Qual o valor do imóvel que você imagina comprar?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-sm font-bold text-[#06192C]/40">R$</span>
                      </div>
                      <input
                        type="text"
                        value={nValorImovel ? nValorImovel.toLocaleString('pt-BR') : ''}
                        onChange={(e) => formatInputCurrency(e.target.value, setValorImovel)}
                        placeholder="Ex: 240.000"
                        className="w-full bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-xl py-3.5 pl-10 pr-4 font-bold text-lg focus:outline-none focus:ring-0 focus:border-[#E43D30] focus:shadow-[2px_2px_0px_0px_#06192C] transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-[#06192C]/50 block">
                      Teto do MCMV na capital de SP é de R$ 350.000.
                    </span>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t-[1.5px] border-[#06192C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[#06192C]/60">
                    <Lock className="w-4 h-4 shrink-0" />
                    <span className="text-[11px] font-bold">Você não precisa de CPF para simular.</span>
                  </div>
                  
                  <button
                    onClick={handleNext}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E43D30] hover:bg-[#c93226] text-[#FFFDF7] border-[1.5px] border-[#06192C] font-black text-sm px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#06192C] transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#06192C]"
                  >
                    Mapear Caminho Inicial
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CENARIO PRELIMINAR */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#06192C]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E43D30] border-[1.5px] border-[#E43D30] px-2 py-0.5 rounded bg-[#E43D30]/5">
                Etapa 02 · Seu Cenário Estimativo
              </span>

              <h2 className="text-3xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2">
                O que esses números significam na prática?
              </h2>
              
              <p className="text-sm text-[#06192C]/70 mb-8">
                Isso não é uma simulação oficial de banco, mas um diagnóstico realista baseado na regulação atual do MCMV paulista.
              </p>

              {/* Data Summary Grid - Neubrutalist Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#06192C]">
                  <span className="text-[9px] uppercase font-bold text-[#06192C]/60 block mb-1">Renda Declarada</span>
                  <span className="text-xl font-extrabold text-[#06192C] block font-mono">{fmt(nRenda)}</span>
                </div>
                <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#06192C]">
                  <span className="text-[9px] uppercase font-bold text-[#06192C]/60 block mb-1">Sua Entrada</span>
                  <span className="text-xl font-extrabold text-[#06192C] block font-mono">{fmt(nEntrada)}</span>
                </div>
                <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#06192C]">
                  <span className="text-[9px] uppercase font-bold text-[#06192C]/60 block mb-1">Imóvel Pretendido</span>
                  <span className="text-xl font-extrabold text-[#06192C] block font-mono">{fmt(nValorImovel)}</span>
                </div>
              </div>

              {/* Technical breakdown - Document-style paper layout */}
              <div className="border-[1.5px] border-[#06192C] rounded-2xl bg-[#FFFDF7] overflow-hidden mb-6">
                <div className="bg-[#06192C] text-[#FFFDF7] px-6 py-3 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider font-mono">Dossiê Preliminar de Custos</span>
                  <span className="text-[9px] font-mono text-[#FFFDF7]/60">Estimativa</span>
                </div>
                
                <div className="p-6 space-y-4 font-mono text-xs">
                  {/* ITBI e Registro */}
                  <div className="flex justify-between border-b border-[#06192C]/10 pb-2.5">
                    <span className="text-[#06192C]/60 uppercase">ITBI Estimado (3% em SP)</span>
                    <span className="font-bold text-[#E43D30]">{fmt(custoITBI)}</span>
                  </div>
                  
                  <div className="flex justify-between border-b border-[#06192C]/10 pb-2.5">
                    <span className="text-[#06192C]/60 uppercase">Escritura & Registro (~1.5%)</span>
                    <span className="font-bold text-[#E43D30]">{fmt(custoRegistroEscritura)}</span>
                  </div>

                  <div className="flex justify-between bg-[#F3D35B]/20 border-b border-[#06192C] -mx-6 px-6 py-2">
                    <span className="font-black text-[#06192C] uppercase">Taxas Obrigatórias Iniciais</span>
                    <span className="font-black text-[#06192C]">{fmt(totalTaxasOcultas)}</span>
                  </div>

                  {/* Parcelas e comprometimento */}
                  <div className="flex justify-between border-b border-[#06192C]/10 pb-2.5 pt-2">
                    <span className="text-[#06192C]/60 uppercase">Amortização Caixa Máxima (80%)</span>
                    <span className="font-bold text-[#06192C]">{fmt(valorFinanciadoMax)}</span>
                  </div>

                  <div className="flex justify-between border-b border-[#06192C]/10 pb-2.5">
                    <span className="text-[#06192C]/60 uppercase">Parcela Inicial Est. (SAC 360m)</span>
                    <span className="font-bold text-[#06192C]">{fmt(primeiraParcelaEst)}</span>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[#06192C]/60 uppercase">Comprometimento de Renda</span>
                    <span className={`font-black text-sm px-2 py-0.5 rounded border-[1.5px] border-[#06192C] ${
                      isComprometimentoAlto 
                        ? 'bg-[#E43D30] text-[#FFFDF7]' 
                        : 'bg-[#28C7BA] text-[#06192C]'
                    }`}>
                      {comprometimentoRendaPercent.toFixed(1)}% 
                      {isComprometimentoAlto ? ' (Alto Risco)' : ' (Seguro)'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conditional Alert Messages */}
              {isComprometimentoAlto && (
                <div className="flex gap-3 bg-[#F3D35B] border-[1.5px] border-[#06192C] rounded-2xl p-4 mb-4 shadow-[2px_2px_0px_0px_#06192C]">
                  <AlertTriangle className="w-5 h-5 text-[#06192C] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#06192C] mb-1">
                      Alerta: Renda sobrecarregada
                    </h4>
                    <p className="text-xs text-[#06192C]/80 leading-relaxed">
                      A parcela estimada representa mais de 30% da sua renda familiar declarada. Bancos exigem que a parcela inicial fique abaixo desse teto. Recomendamos buscar imóveis de menor valor ou compor uma entrada maior para viabilizar a aprovação.
                    </p>
                  </div>
                </div>
              )}

              {gapEntrada > 0 ? (
                <div className="flex gap-3 bg-[#E43D30]/10 border-[1.5px] border-[#E43D30] rounded-2xl p-4 mb-6 shadow-[2px_2px_0px_0px_#E43D30]">
                  <Info className="w-5 h-5 text-[#E43D30] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#E43D30] mb-1">
                      Atenção: Necessidade de Entrada Adicional
                    </h4>
                    <p className="text-xs text-[#06192C]/80 leading-relaxed">
                      Sua entrada atual está <strong className="font-bold font-mono">{fmt(gapEntrada)}</strong> abaixo do mínimo exigido de 20% para financiar o imóvel de {fmt(nValorImovel)}. Precisaremos planejar a captação desse valor adicional via FGTS, subsídios municipais/estaduais ou parcelamento direto com a construtora.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 bg-[#28C7BA]/10 border-[1.5px] border-[#28C7BA] rounded-2xl p-4 mb-6">
                  <Check className="w-5 h-5 text-[#28C7BA] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-black text-xs uppercase tracking-wider text-[#06192C] mb-1">
                      Entrada Mínima Alcançada
                    </h4>
                    <p className="text-xs text-[#06192C]/80 leading-relaxed">
                      Sua entrada de {fmt(nEntrada)} cobre os 20% mínimos necessários para este imóvel. Bom ponto de partida!
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t-[1.5px] border-[#06192C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[1.5px] border-[#06192C] bg-[#FFFDF7] text-[#06192C] font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#F4F0E8] transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Reajustar Valores
                </button>
                
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E43D30] hover:bg-[#c93226] text-[#FFFDF7] border-[1.5px] border-[#06192C] font-black text-sm px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#06192C] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#06192C]"
                >
                  Confirmar Valores e Prosseguir
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: PERGUNTA DE MOMENTO */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#06192C]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E43D30] border-[1.5px] border-[#E43D30] px-2 py-0.5 rounded bg-[#E43D30]/5">
                Etapa 03 · Momento da Jornada
              </span>

              <h2 className="text-3xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2">
                Qual frase mais parece com você hoje?
              </h2>
              
              <p className="text-sm text-[#06192C]/70 mb-8">
                Identificar em qual estágio você está nos ajuda a recomendar caminhos que protejam seu orçamento e poupem seu tempo.
              </p>

              {/* Options Cards */}
              <div className="space-y-4">
                {[
                  {
                    id: 'A',
                    text: 'Estou começando a entender como comprar',
                    desc: 'Fase inicial: entendendo regras de financiamento Caixa, taxa de juros e subsídios.'
                  },
                  {
                    id: 'B',
                    text: 'Quero me organizar antes de procurar',
                    desc: 'Quero poupar a entrada exata, organizar documentos e planejar a saída do aluguel.'
                  },
                  {
                    id: 'C',
                    text: 'Já estou procurando imóveis',
                    desc: 'Estou visitando estandes, conversando com corretores na Zona Leste e analisando opções.'
                  },
                  {
                    id: 'D',
                    text: 'Já encontrei um imóvel e estou negociando',
                    desc: 'Já decidi a unidade, tenho proposta na mesa ou estou próximo de assinar a promessa.'
                  }
                ].map((opt) => {
                  const isSelected = momento === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setMomento(opt.id);
                        // Reset sub-selections to prevent inconsistent states
                        setOpcaoAdaptativa('');
                        setApoio('');
                      }}
                      className={`w-full text-left p-5 rounded-2xl border-[1.5px] transition-all flex items-start gap-4 ${
                        isSelected 
                          ? 'bg-[#F3D35B]/10 border-[#06192C] shadow-[3px_3px_0px_0px_#06192C]' 
                          : 'bg-[#FFFDF7] border-[#06192C]/20 hover:border-[#06192C] hover:bg-[#F4F0E8]/40'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#06192C] bg-[#E43D30]' : 'border-[#06192C]/40 bg-[#FFFDF7]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFFDF7]" />}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-[#06192C]">{opt.text}</p>
                        <p className="text-xs text-[#06192C]/60 mt-1">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t-[1.5px] border-[#06192C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[1.5px] border-[#06192C] bg-[#FFFDF7] text-[#06192C] font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#F4F0E8] transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E43D30] hover:bg-[#c93226] text-[#FFFDF7] border-[1.5px] border-[#06192C] font-black text-sm px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#06192C] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#06192C]"
                >
                  Prosseguir
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 4: PERGUNTA ADAPTATIVA */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#06192C]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E43D30] border-[1.5px] border-[#E43D30] px-2 py-0.5 rounded bg-[#E43D30]/5">
                Etapa 04 · Foco da sua Dúvida
              </span>

              {/* Question A */}
              {momento === 'A' && (
                <>
                  <h2 className="text-3xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2">
                    O que você mais quer entender primeiro?
                  </h2>
                  <p className="text-sm text-[#06192C]/70 mb-8">
                    Vamos pontuar seu diagnóstico na sua principal dor de esclarecimento.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'mcmv', label: 'Financiamento Caixa e Regras do MCMV' },
                      { id: 'entrada', label: 'Entrada, Subsídios e Custos Adicionais (Taxas)' },
                      { id: 'documentos', label: 'Documentação necessária para aprovar crédito' },
                      { id: 'tudo', label: 'O processo inteiro de compra passo a passo' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setOpcaoAdaptativa(opt.id)}
                        className={`w-full text-left p-5 rounded-xl border-[1.5px] transition-all flex items-center gap-4 ${
                          opcaoAdaptativa === opt.id 
                            ? 'bg-[#F3D35B]/10 border-[#06192C] shadow-[3px_3px_0px_0px_#06192C]' 
                            : 'bg-[#FFFDF7] border-[#06192C]/20 hover:border-[#06192C]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                          opcaoAdaptativa === opt.id ? 'border-[#06192C] bg-[#E43D30]' : 'border-[#06192C]/40 bg-[#FFFDF7]'
                        }`}>
                          {opcaoAdaptativa === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDF7]" />}
                        </div>
                        <span className="font-extrabold text-sm text-[#06192C]">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Question B */}
              {momento === 'B' && (
                <>
                  <h2 className="text-3xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2">
                    O que mais impede você de avançar hoje?
                  </h2>
                  <p className="text-sm text-[#06192C]/70 mb-8">
                    Entender sua barreira principal nos ajuda a mapear os primeiros passos do plano.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'pagar', label: 'Não sei exatamente quanto consigo pagar por mês' },
                      { id: 'formar_entrada', label: 'Ainda preciso juntar dinheiro para formar a entrada' },
                      { id: 'duvidas_mcmv', label: 'Tenho muitas dúvidas se me enquadro nas regras do MCMV' },
                      { id: 'organizar_docs', label: 'Não sei quais documentos organizar primeiro' },
                      { id: 'comecar', label: 'Estou perdido, não sei por onde começar' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setOpcaoAdaptativa(opt.id)}
                        className={`w-full text-left p-5 rounded-xl border-[1.5px] transition-all flex items-center gap-4 ${
                          opcaoAdaptativa === opt.id 
                            ? 'bg-[#F3D35B]/10 border-[#06192C] shadow-[3px_3px_0px_0px_#06192C]' 
                            : 'bg-[#FFFDF7] border-[#06192C]/20 hover:border-[#06192C]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                          opcaoAdaptativa === opt.id ? 'border-[#06192C] bg-[#E43D30]' : 'border-[#06192C]/40 bg-[#FFFDF7]'
                        }`}>
                          {opcaoAdaptativa === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDF7]" />}
                        </div>
                        <span className="font-extrabold text-sm text-[#06192C]">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Question C */}
              {momento === 'C' && (
                <>
                  <h2 className="text-3xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2">
                    Que tipo de ajuda faria mais diferença agora?
                  </h2>
                  <p className="text-sm text-[#06192C]/70 mb-8">
                    Para quem já está buscando imóveis na ZL, cada escolha técnica economiza muito dinheiro.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { id: 'criterios', label: 'Organizar meus critérios de busca e teto de orçamento' },
                      { id: 'comparar', label: 'Comparar as opções que já encontrei e saber qual vale mais a pena' },
                      { id: 'propostas', label: 'Entender a real proposta da construtora e seus custos ocultos' },
                      { id: 'visitas', label: 'Ter um profissional independente me acompanhando nas visitas' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setOpcaoAdaptativa(opt.id)}
                        className={`w-full text-left p-5 rounded-xl border-[1.5px] transition-all flex items-center gap-4 ${
                          opcaoAdaptativa === opt.id 
                            ? 'bg-[#F3D35B]/10 border-[#06192C] shadow-[3px_3px_0px_0px_#06192C]' 
                            : 'bg-[#FFFDF7] border-[#06192C]/20 hover:border-[#06192C]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-[1.5px] flex items-center justify-center shrink-0 ${
                          opcaoAdaptativa === opt.id ? 'border-[#06192C] bg-[#E43D30]' : 'border-[#06192C]/40 bg-[#FFFDF7]'
                        }`}>
                          {opcaoAdaptativa === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-[#FFFDF7]" />}
                        </div>
                        <span className="font-extrabold text-sm text-[#06192C]">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t-[1.5px] border-[#06192C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[1.5px] border-[#06192C] bg-[#FFFDF7] text-[#06192C] font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#F4F0E8] transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E43D30] hover:bg-[#c93226] text-[#FFFDF7] border-[1.5px] border-[#06192C] font-black text-sm px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#06192C] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#06192C]"
                >
                  Prosseguir
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: PREFERENCIA DE APOIO */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-8 md:p-10 shadow-[6px_6px_0px_0px_#06192C]"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E43D30] border-[1.5px] border-[#E43D30] px-2 py-0.5 rounded bg-[#E43D30]/5">
                Etapa 05 · Nível de Suporte
              </span>

              <h2 className="text-3xl font-extrabold text-[#06192C] tracking-tight mt-4 mb-2">
                Como você prefere seguir com seu plano agora?
              </h2>
              
              <p className="text-sm text-[#06192C]/70 mb-8">
                Definir sua autonomia nos ajuda a propor a ferramenta ou serviço na medida ideal.
              </p>

              {/* Options Cards */}
              <div className="space-y-4">
                {[
                  {
                    id: 'sozinho',
                    text: 'Quero me organizar sozinho',
                    desc: 'Prefiro guias, planilhas e checklists para eu mesmo estruturar meus passos com autonomia.'
                  },
                  {
                    id: 'conversar',
                    text: 'Quero conversar sobre meu caso',
                    desc: 'Gostaria de uma consultoria pontual para tirar dúvidas sobre minhas finanças e regras Caixa.'
                  },
                  {
                    id: 'acompanhamento',
                    text: 'Quero acompanhamento na busca e nas visitas',
                    desc: 'Desejo assessoria dedicada para buscar, vistoriar e guiar minha compra do início ao fim.'
                  }
                ].map((opt) => {
                  const isSelected = apoio === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setApoio(opt.id)}
                      className={`w-full text-left p-5 rounded-2xl border-[1.5px] transition-all flex items-start gap-4 ${
                        isSelected 
                          ? 'bg-[#F3D35B]/10 border-[#06192C] shadow-[3px_3px_0px_0px_#06192C]' 
                          : 'bg-[#FFFDF7] border-[#06192C]/20 hover:border-[#06192C] hover:bg-[#F4F0E8]/40'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'border-[#06192C] bg-[#E43D30]' : 'border-[#06192C]/40 bg-[#FFFDF7]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#FFFDF7]" />}
                      </div>
                      <div>
                        <p className="font-extrabold text-sm text-[#06192C]">{opt.text}</p>
                        <p className="text-xs text-[#06192C]/60 mt-1">{opt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t-[1.5px] border-[#06192C]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-[1.5px] border-[#06192C] bg-[#FFFDF7] text-[#06192C] font-bold text-sm px-6 py-3.5 rounded-xl hover:bg-[#F4F0E8] transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </button>
                
                <button
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#E43D30] hover:bg-[#c93226] text-[#FFFDF7] border-[1.5px] border-[#06192C] font-black text-sm px-6 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_#06192C] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#06192C]"
                >
                  Gerar Meu Mapa de Compra
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 6: MAPA DE COMPRA (RESULTADO) */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              
              {/* Top Summary Banner */}
              <div className="bg-[#06192C] text-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-8 shadow-[4px_4px_0px_0px_#06192C] relative overflow-hidden">
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-[#E43D30]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="max-w-2xl relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#F3D35B] bg-[#FFFDF7]/10 px-2.5 py-1 rounded-full">
                    Dossiê Gerado · Pinheiro Azul
                  </span>
                  <h2 className="text-4xl font-extrabold tracking-tight mt-4 mb-2 leading-none">
                    Seu Mapa de Compra Personalizado
                  </h2>
                  <p className="text-xs text-[#FFFDF7]/70 leading-relaxed font-mono">
                    Zona Leste, São Paulo · Referência: {new Date().getFullYear()}/MCMV
                  </p>
                </div>
              </div>

              {/* Bento Grid Layout for Results */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                
                {/* 1. SEU MOMENTO (Col-span 2) */}
                <div className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-6 shadow-[3px_3px_0px_0px_#06192C] md:col-span-2 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#06192C]/50 mb-3 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#E43D30]" />
                      Seu Perfil
                    </h3>
                    <div className="space-y-3">
                      <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] px-3 py-1.5 rounded-xl inline-block text-xs font-black uppercase tracking-wider text-[#06192C]">
                        {momento === 'A' && 'Iniciante Curioso'}
                        {momento === 'B' && 'Planejador Estratégico'}
                        {momento === 'C' && 'Comprador Ativo'}
                        {momento === 'D' && 'Fase de Fechamento'}
                      </div>
                      
                      <p className="text-xs text-[#06192C]/80 leading-relaxed mt-2">
                        {momento === 'A' && 'Você está começando a entender as regras do jogo. A prioridade máxima agora é blindar sua compreensão sobre juros habitacionais e taxas iniciais para não cometer erros básicos nos simuladores de construtoras.'}
                        {momento === 'B' && 'Seu foco é organização financeira antes de gastar sola de sapato. Você quer ir com segurança para as propostas, conhecendo seu real limite de caixa.'}
                        {momento === 'C' && 'Você já está no campo de batalha analisando opções de imóveis na Zona Leste. Precisa de critérios cirúrgicos para comparar opções e blindar sua decisão.'}
                        {momento === 'D' && 'Você já escolheu a unidade e está negociando. Atenção crítica: não assine promessa de compra e venda sem entender todas as cláusulas e custos obrigatórios que serão cobrados à vista.'}
                      </p>
                    </div>
                  </div>
                  
                  {momento !== 'D' && (
                    <div className="mt-4 pt-4 border-t border-[#06192C]/10">
                      <span className="text-[10px] uppercase font-bold text-[#06192C]/60 block mb-1">Preparação Financeira:</span>
                      <span className="text-xs font-bold text-[#E43D30] font-mono">
                        {gapEntrada > 0 ? `Falta ${fmt(gapEntrada)} de entrada` : 'Entrada mínima ok!'}
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. O QUE JÁ ESTÁ CLARO / NÚMEROS (Col-span 3) */}
                <div className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-6 shadow-[3px_3px_0px_0px_#06192C] md:col-span-3">
                  <h3 className="text-xs font-black uppercase tracking-widest text-[#06192C]/50 mb-3 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#28C7BA]" />
                    Métricas de Viabilidade
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-xl p-3">
                      <span className="text-[9px] uppercase font-bold text-[#06192C]/50 block">Parcela Estimada</span>
                      <span className="text-base font-extrabold text-[#06192C] font-mono">{fmt(primeiraParcelaEst)}</span>
                    </div>
                    <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-xl p-3">
                      <span className="text-[9px] uppercase font-bold text-[#06192C]/50 block">Comprometimento</span>
                      <span className={`text-base font-extrabold font-mono ${isComprometimentoAlto ? 'text-[#E43D30]' : 'text-[#28C7BA]'}`}>
                        {comprometimentoRendaPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="border-[1.5px] border-[#06192C] rounded-xl p-4 font-mono text-xs bg-[#FFFDF7] space-y-2">
                    <div className="flex justify-between text-[11px] pb-1 border-b border-[#06192C]/5">
                      <span className="text-[#06192C]/60">Imóvel:</span>
                      <span className="font-bold">{fmt(nValorImovel)}</span>
                    </div>
                    <div className="flex justify-between text-[11px] pb-1 border-b border-[#06192C]/5">
                      <span className="text-[#06192C]/60">ITBI + Registro (Média ZL):</span>
                      <span className="font-bold text-[#E43D30]">{fmt(totalTaxasOcultas)}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-[#06192C]/60">Financiamento (80%):</span>
                      <span className="font-bold">{fmt(valorFinanciadoMax)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHECKLIST INTERATIVO DE PRÓXIMOS PASSOS */}
              <div className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-6 md:p-8 shadow-[4px_4px_0px_0px_#06192C]">
                <h3 className="text-sm font-black uppercase tracking-wider text-[#06192C] mb-1 flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-[#E43D30]" />
                  Seus Próximos Passos (Checklist Interativo)
                </h3>
                <p className="text-xs text-[#06192C]/60 mb-6">
                  Complete essas tarefas essenciais antes de assinar qualquer documento ou fazer depósitos.
                </p>

                <div className="space-y-3">
                  {[
                    {
                      id: 'FGTS',
                      title: 'Separar o extrato completo do FGTS',
                      desc: 'Crucial para deduzir o gap de entrada e compor o financiamento da Caixa.'
                    },
                    {
                      id: 'Documentos',
                      title: 'Organizar documentos de identidade e 3 últimos holerites',
                      desc: 'Necessário para a análise de crédito oficial.'
                    },
                    {
                      id: 'ITBI_Reserva',
                      title: `Provisionar ${fmt(totalTaxasOcultas)} para taxas de cartório`,
                      desc: 'Esse valor é cobrado à vista na prefeitura de São Paulo no início do processo de repasse.'
                    },
                    {
                      id: 'Simulador',
                      title: 'Realizar uma simulação oficial no portal da Caixa Econômica',
                      desc: 'Para confirmar se a taxa de juros do seu perfil se enquadra na faixa estimada.'
                    },
                    {
                      id: 'Visita_Check',
                      title: 'Listar 3 pontos críticos para avaliar nos estandes da Zona Leste',
                      desc: 'Atenção aos juros de obra (INCC) e parcelas anuais/semestrais escondidas.'
                    }
                  ].map((task) => {
                    const isChecked = checkedTasks.includes(task.id);
                    return (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`w-full text-left p-4 rounded-xl border-[1.5px] transition-all flex items-start gap-4 ${
                          isChecked 
                            ? 'bg-[#28C7BA]/5 border-[#06192C] opacity-75' 
                            : 'bg-[#FFFDF7] border-[#06192C]/20 hover:border-[#06192C]'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0 text-[#06192C]">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-[#28C7BA]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <p className={`font-bold text-xs ${isChecked ? 'line-through text-[#06192C]/40' : 'text-[#06192C]'}`}>
                            {task.title}
                          </p>
                          <p className="text-[10px] text-[#06192C]/50 mt-0.5">{task.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* UNLOCK GATE / CAPTURE FORM OR SHOW UNLOCKED RESULT */}
              <AnimatePresence mode="wait">
                {!isUnlocked ? (
                  <motion.div
                    key="gate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-[#F3D35B]/15 border-[1.5px] border-[#06192C] rounded-3xl p-6 md:p-8 shadow-[4px_4px_0px_0px_#06192C]"
                  >
                    <div className="max-w-xl mx-auto text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F3D35B] border-[1.5px] border-[#06192C] mb-2">
                        <Lock className="w-5 h-5 text-[#06192C]" />
                      </div>
                      <h3 className="text-xl font-extrabold text-[#06192C] tracking-tight">
                        Quer salvar seu Mapa de Compra e ver a Recomendação?
                      </h3>
                      <p className="text-xs text-[#06192C]/70 max-w-md mx-auto leading-relaxed">
                        Preencha os campos abaixo para receber o roteiro do seu checklist por WhatsApp/E-mail e liberar a análise do melhor serviço para o seu momento.
                      </p>

                      <form onSubmit={handleCaptureSubmit} className="space-y-4 mt-6 text-left max-w-md mx-auto">
                        <div className="space-y-1">
                          <label className="block text-[10px] font-black uppercase tracking-wider text-[#06192C]/70">
                            Seu Nome
                          </label>
                          <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Amanda Silva"
                            required
                            className="w-full bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#E43D30] focus:shadow-[1px_1px_0px_0px_#06192C] transition-all"
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-black uppercase tracking-wider text-[#06192C]/70">
                              WhatsApp (com DDD)
                            </label>
                            <input
                              type="text"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value)}
                              placeholder="Ex: 11988887777"
                              className="w-full bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#E43D30] focus:shadow-[1px_1px_0px_0px_#06192C] transition-all"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-black uppercase tracking-wider text-[#06192C]/70">
                              E-mail (Opcional)
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Ex: nome@email.com"
                              className="w-full bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#E43D30] focus:shadow-[1px_1px_0px_0px_#06192C] transition-all"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#E43D30] hover:bg-[#c93226] text-[#FFFDF7] border-[1.5px] border-[#06192C] font-black text-xs px-6 py-3 rounded-xl shadow-[3px_3px_0px_0px_#06192C] transition-all active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_0px_#06192C] mt-2"
                        >
                          Salvar Mapa e Liberar Recomendação
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#FFFDF7] border-[1.5px] border-[#06192C] rounded-3xl p-6 md:p-8 shadow-[4px_4px_0px_0px_#06192C] border-t-8 border-t-[#28C7BA]"
                  >
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      {/* Left: Recomendação Badge / Preço */}
                      <div className="w-full md:w-1/3 space-y-4">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#28C7BA] border-[1.5px] border-[#28C7BA] px-2 py-0.5 rounded bg-[#28C7BA]/5">
                          Próximo Passo Recomendado
                        </span>
                        
                        <h4 className="text-xl font-extrabold text-[#06192C] leading-tight">
                          {recomendacao.titulo}
                        </h4>

                        <div className="bg-[#F4F0E8] border-[1.5px] border-[#06192C] rounded-2xl p-4 shadow-[2px_2px_0px_0px_#06192C] text-center">
                          <span className="text-[9px] uppercase font-bold text-[#06192C]/50 block">Investimento Proporcional</span>
                          <span className="text-2xl font-black text-[#06192C] tracking-tight">{recomendacao.preco}</span>
                        </div>
                      </div>

                      {/* Right: Descrição e CTAs */}
                      <div className="w-full md:w-2/3 space-y-6">
                        <p className="text-xs text-[#06192C]/80 leading-relaxed bg-[#F4F0E8]/40 border-[1.5px] border-[#06192C]/10 p-4 rounded-2xl">
                          {recomendacao.descricao}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <a
                            href={`https://wa.me/5511930418684?text=${encodeURIComponent(recomendacao.mensagemWhats)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-[#28C7BA] hover:bg-[#20aba0] text-[#06192C] border-[1.5px] border-[#06192C] font-black text-xs px-6 py-3.5 rounded-xl shadow-[3px_3px_0px_0px_#06192C] transition-all"
                          >
                            <MessageSquare className="w-4 h-4" />
                            {recomendacao.cta}
                          </a>

                          {recomendacao.tipo !== 'guia' && (
                            <button
                              onClick={() => {
                                toast.success('Guia Prático em PDF enviado por e-mail!');
                              }}
                              className="inline-flex items-center justify-center gap-2 border-[1.5px] border-[#06192C] bg-[#FFFDF7] text-[#06192C] font-bold text-xs px-6 py-3.5 rounded-xl hover:bg-[#F4F0E8] transition-all"
                            >
                              <BookOpen className="w-4 h-4" />
                              Ver Guia Prático Independente
                            </button>
                          )}
                        </div>

                        <div className="pt-4 border-t border-[#06192C]/10 flex items-center gap-4 text-[10px] text-[#06192C]/60">
                          <div className="flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 bg-[#28C7BA] rounded-full" />
                            <span>Indicação Honestidade Pinheiro Azul</span>
                          </div>
                          <span>·</span>
                          <span>Não cobramos comissão de construtora</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Actions - Back Button to edit data */}
              <div className="flex justify-start pt-4">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 border-[1.5px] border-[#06192C] bg-[#FFFDF7] text-[#06192C] font-bold text-xs px-4 py-2.5 rounded-lg hover:bg-[#F4F0E8] transition-all"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Voltar para ajustar respostas
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* --- FOOTER --- */}
      <footer className="max-w-4xl mx-auto px-6 mt-16 pt-8 border-t-[1.5px] border-[#06192C]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-[#06192C]/50">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} Pinheiro Azul</span>
          <span>·</span>
          <span>CRECI 42817-J</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/privacidade" className="hover:underline">Políticas de Privacidade</a>
          <span>·</span>
          <span>Assessoria independente de compra de primeiro imóvel Zona Leste</span>
        </div>
      </footer>

    </div>
  );
}
