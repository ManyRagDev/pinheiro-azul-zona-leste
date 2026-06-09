import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  MessageSquare,
  Lock,
  Info,
  Check,
  Circle,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { toast } from 'sonner';
import { FluidMeshBackground } from '@/components/segundaInteligencia/FluidMeshBackground';
import { CaminhoOrganico, type CaminhoWaypoint } from '@/components/segundaInteligencia/CaminhoOrganico';
import { OptionCard } from '@/components/segundaInteligencia/OptionCard';

const fmt = (val: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);

const WHATSAPP = '5511930418684';

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── NarrativeReveal ──────────────────────────────────────────────────────────
// Cada frase chega como um bloco de pensamento completo (mascarado por
// overflow + deslocamento vertical), nunca palavra a palavra ou letra a letra —
// é uma entrada editorial, não um efeito de "digitando".

const phraseVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: { duration: 0.5, ease: EASE, delay: i * 0.09 },
  }),
};

function NarrativeReveal({
  lines,
  className,
  reduceMotion,
}: {
  lines: string[];
  className?: string;
  reduceMotion: boolean;
}) {
  if (reduceMotion) {
    return (
      <div className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span className="block" custom={i} initial="hidden" animate="visible" variants={phraseVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ─── MoneyField ───────────────────────────────────────────────────────────────

function MoneyField({
  label,
  hint,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  hint?: string;
  value: number;
  placeholder: string;
  onChange: (raw: string) => void;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-black uppercase tracking-wider text-[#06192C]/70 mb-2">{label}</span>
      <div className="relative">
        <span className="absolute inset-y-0 left-4 flex items-center text-sm font-bold text-[#06192C]/35">R$</span>
        <input
          type="text"
          inputMode="numeric"
          value={value ? value.toLocaleString('pt-BR') : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-[#F4F0E8]/70 border border-[#06192C]/15 rounded-2xl py-3.5 pl-11 pr-4 font-bold text-base text-[#06192C] placeholder:text-[#06192C]/30 focus:outline-none focus:border-[#E43D30] focus:bg-[#FFFDF7] focus:ring-4 focus:ring-[#E43D30]/10 transition-all"
        />
      </div>
      {hint && <span className="block text-[11px] text-[#06192C]/45 mt-1.5 leading-relaxed">{hint}</span>}
    </label>
  );
}

// ─── shared style fragments ───────────────────────────────────────────────────

const eyebrowClass =
  'inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#E43D30] bg-[#E43D30]/8 border border-[#E43D30]/25 rounded-full px-3 py-1';

const primaryBtn =
  'inline-flex items-center justify-center gap-2 bg-[#06192C] hover:bg-[#0d2840] text-[#FFFDF7] font-bold text-sm px-6 py-3.5 rounded-full transition-all active:scale-[0.98]';

const ghostBtn =
  'inline-flex items-center justify-center gap-2 text-[#06192C]/55 hover:text-[#06192C] font-bold text-sm px-3 py-3.5 transition-colors';

const cardClass =
  'bg-[#FFFDF7] border border-[#06192C]/10 rounded-[28px] p-6 md:p-7 shadow-[0_18px_46px_-24px_rgba(6,25,44,0.22)]';

// ─── Types ────────────────────────────────────────────────────────────────────

type Momento = '' | 'A' | 'B' | 'C' | 'D';
type Apoio = '' | 'sozinho' | 'conversar' | 'acompanhamento';

const momentoOptions: { id: Exclude<Momento, ''>; titulo: string; descricao: string }[] = [
  {
    id: 'A',
    titulo: 'Estou começando a entender como comprar',
    descricao: 'Quero entender como funciona o financiamento, o MCMV e os juros antes de pensar em um imóvel específico.',
  },
  {
    id: 'B',
    titulo: 'Quero me organizar antes de procurar',
    descricao: 'Prefiro arrumar a casa por dentro primeiro: saber quanto cabe no orçamento, formar a entrada, organizar a papelada.',
  },
  {
    id: 'C',
    titulo: 'Já estou procurando imóveis',
    descricao: 'Estou visitando, comparando e conversando com corretores na Zona Leste — e quero fazer isso com mais critério.',
  },
  {
    id: 'D',
    titulo: 'Já encontrei um imóvel e estou negociando',
    descricao: 'A decisão está encaminhada — agora quero ter certeza de que não vou deixar passar nada importante.',
  },
];

const adaptativaPorMomento: Record<'A' | 'B' | 'C', { pergunta: string; lead: string; opcoes: { id: string; titulo: string }[] }> = {
  A: {
    pergunta: 'O que você mais quer entender primeiro?',
    lead: 'Vamos começar pelo ponto que mais pesa na sua cabeça agora — o resto vem depois.',
    opcoes: [
      { id: 'mcmv', titulo: 'Como funciona o financiamento e o MCMV' },
      { id: 'entrada', titulo: 'Quanto preciso de entrada e quais custos aparecem no caminho' },
      { id: 'documentos', titulo: 'Quais documentos preciso ter em mãos' },
      { id: 'tudo', titulo: 'O processo inteiro, do início ao fim' },
    ],
  },
  B: {
    pergunta: 'O que mais pesa para você avançar agora?',
    lead: 'Identificar essa barreira nos ajuda a montar um plano que comece exatamente onde você está.',
    opcoes: [
      { id: 'pagar', titulo: 'Não sei ao certo quanto consigo pagar por mês' },
      { id: 'formar_entrada', titulo: 'Ainda preciso formar o valor da entrada' },
      { id: 'duvidas_mcmv', titulo: 'Tenho dúvidas se me encaixo nas regras do MCMV' },
      { id: 'organizar_docs', titulo: 'Não sei que documentos organizar primeiro' },
      { id: 'comecar', titulo: 'Estou meio perdido(a) sobre por onde começar' },
    ],
  },
  C: {
    pergunta: 'Que tipo de ajuda faria mais diferença agora?',
    lead: 'Quem já está em campo costuma ganhar mais com um olhar técnico do que com mais opções.',
    opcoes: [
      { id: 'criterios', titulo: 'Organizar critérios e definir um teto de orçamento' },
      { id: 'comparar', titulo: 'Comparar as opções que já encontrei' },
      { id: 'propostas', titulo: 'Entender de verdade as propostas e os custos por trás delas' },
      { id: 'visitas', titulo: 'Ter alguém de confiança me acompanhando nas visitas' },
    ],
  },
};

const apoioOptions: { id: Exclude<Apoio, ''>; titulo: string; descricao: string }[] = [
  {
    id: 'sozinho',
    titulo: 'Quero seguir com minhas próprias mãos',
    descricao: 'Prefiro guias e ferramentas para organizar tudo no meu ritmo, sem depender de ninguém.',
  },
  {
    id: 'conversar',
    titulo: 'Quero conversar sobre o meu caso',
    descricao: 'Gostaria de aplicar tudo isso à minha situação específica, com alguém me ouvindo de verdade.',
  },
  {
    id: 'acompanhamento',
    titulo: 'Quero companhia até a decisão final',
    descricao: 'Prefiro ter alguém ao lado durante a busca, as comparações e as visitas, do início ao fim.',
  },
];

const momentoResumo: Record<'A' | 'B' | 'C' | 'D', { titulo: string; texto: string }> = {
  A: {
    titulo: 'Início de entendimento',
    texto: 'Você está conhecendo as regras do jogo — e isso já é o passo mais importante para não tropeçar nos primeiros contatos com construtoras e bancos.',
  },
  B: {
    titulo: 'Organização antes da busca',
    texto: 'Você quer ir para a rua sabendo exatamente os seus números — uma escolha que costuma poupar tempo, dinheiro e ansiedade mais à frente.',
  },
  C: {
    titulo: 'Busca ativa',
    texto: 'Você já está em campo, comparando opções reais na Zona Leste — a fase em que um critério bem definido faz toda a diferença.',
  },
  D: {
    titulo: 'Negociação em andamento',
    texto: 'Você já escolheu o imóvel — agora o cuidado está nos detalhes da reta final: cláusulas, prazos e custos que aparecem perto da assinatura.',
  },
};

// ─── Componente principal ─────────────────────────────────────────────────────

export default function SegundaInteligencia() {
  const reduceMotion = !!useReducedMotion();

  const [step, setStep] = useState(1);
  const [renda, setRenda] = useState('6500');
  const [entrada, setEntrada] = useState('20000');
  const [valorImovel, setValorImovel] = useState('240000');
  const [momento, setMomento] = useState<Momento>('');
  const [opcaoAdaptativa, setOpcaoAdaptativa] = useState('');
  const [apoio, setApoio] = useState<Apoio>('');
  const [nome, setNome] = useState('');
  const [contato, setContato] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [tarefasFeitas, setTarefasFeitas] = useState<string[]>([]);

  // --- cálculos (mesma base normativa do MCMV usada em /1inteligencia) ---
  const nRenda = parseFloat(renda.replace(/\D/g, '')) || 0;
  const nEntrada = parseFloat(entrada.replace(/\D/g, '')) || 0;
  const nValorImovel = parseFloat(valorImovel.replace(/\D/g, '')) || 0;

  const custoITBI = nValorImovel * 0.03;
  const custoRegistro = nValorImovel * 0.015;
  const custosIniciais = custoITBI + custoRegistro;

  const financiamentoMax = nValorImovel * 0.8;
  const entradaMinima = nValorImovel * 0.2;
  const gapEntrada = Math.max(0, entradaMinima - nEntrada);

  const taxaMensal = 0.065 / 12;
  const prazoMeses = 360;
  const amortizacaoConstante = financiamentoMax / prazoMeses;
  const jurosPrimeiroMes = financiamentoMax * taxaMensal;
  const parcelaEstimada = amortizacaoConstante + jurosPrimeiroMes;
  const comprometimento = nRenda > 0 ? (parcelaEstimada / nRenda) * 100 : 0;
  const comprometimentoAlto = comprometimento > 30;

  const formatMoney = (raw: string, setter: (v: string) => void) => {
    const numeric = raw.replace(/\D/g, '');
    setter(numeric || '0');
  };

  // --- recomendação (mesma árvore de decisão do blueprint §15, voz própria) ---
  const recomendacao = (() => {
    if (momento === 'D') {
      return {
        tipo: 'negociacao' as const,
        titulo: 'Uma conversa de orientação para quem já está negociando',
        preco: 'Sem custo no primeiro contato',
        texto:
          'Você já encontrou o imóvel — então o que falta não é "entender o mercado", e sim não deixar passar um detalhe na reta final. Podemos conversar sobre cláusulas, taxas de repasse e os documentos que merecem um olhar atento antes de qualquer assinatura. Não fazemos avaliação independente do imóvel — essa decisão continua sendo só sua.',
        cta: 'Conversar antes de assinar',
        alternativaLabel: 'Prefere ler antes de conversar? Veja nosso conteúdo gratuito sobre a reta final da compra.',
        mensagem: `Olá! Fiz o mapa em /2inteligencia. Já encontrei um imóvel de ${fmt(nValorImovel)} e estou negociando — gostaria de conversar sobre os cuidados antes de avançar.`,
      };
    }
    if (apoio === 'sozinho') {
      return {
        tipo: 'guia' as const,
        titulo: 'Um guia prático para seguir com as próprias mãos',
        preco: 'R$ 47',
        texto:
          'Você prefere seguir no seu ritmo — então o melhor que podemos te dar é clareza, não companhia. Esse guia reúne o checklist de documentos da Caixa, uma planilha de custos reais da Zona Leste e um roteiro para visitas, para você organizar cada etapa com as próprias mãos.',
        cta: 'Conhecer o guia prático',
        alternativaLabel: 'Quer só começar pelo básico? Temos um checklist gratuito de primeiros passos.',
        mensagem: 'Olá! Fiz o mapa em /2inteligencia e o caminho recomendado foi o Guia Prático. Pode me explicar como funciona?',
      };
    }
    if (apoio === 'conversar' || momento === 'A' || momento === 'B') {
      return {
        tipo: 'consultoria' as const,
        titulo: 'Uma consultoria online para colocar o seu caso no papel',
        preco: 'R$ 147',
        texto:
          'Antes de sair procurando, parece que você quer entender o que esses números significam especificamente para você — entrada, financiamento, MCMV. Numa conversa só sua, transformamos isso em um plano com passos definidos, sem letras miúdas e sem pressa.',
        cta: 'Agendar a consultoria',
        alternativaLabel: 'Prefere começar sozinho(a)? Conheça o Guia Prático antes de decidir.',
        mensagem: `Olá! Fiz o mapa em /2inteligencia — renda de ${fmt(nRenda)} e entrada de ${fmt(nEntrada)}. O caminho recomendado foi a Consultoria Online. Posso agendar uma conversa?`,
      };
    }
    return {
      tipo: 'assessoria' as const,
      titulo: 'Acompanhamento completo até a decisão',
      preco: 'Sob consulta',
      texto:
        'Você já está em campo, comparando opções reais — e essa costuma ser a fase em que mais se perde por pressa ou falta de um segundo olhar. Podemos caminhar com você: organizar critérios, comparar propostas, entender custos escondidos e acompanhar as visitas até a decisão.',
      cta: 'Conversar sobre o acompanhamento',
      alternativaLabel: 'Ainda não tem certeza? Conheça a Consultoria Online, um passo mais leve.',
      mensagem: `Olá! Fiz o mapa em /2inteligencia. Já estou procurando imóveis (~${fmt(nValorImovel)}) e o caminho recomendado foi o Acompanhamento Completo. Como funciona?`,
    };
  })();

  // --- navegação ---
  const handleNext = () => {
    if (step === 1) {
      if (nRenda <= 0 || nValorImovel <= 0) {
        toast.error('Preencha os três valores para seguirmos juntos.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!momento) {
        toast.error('Escolha a frase que mais combina com você hoje.');
        return;
      }
      setStep(momento === 'D' ? 6 : 4);
    } else if (step === 4) {
      if (!opcaoAdaptativa) {
        toast.error('Escolha uma opção para seguirmos.');
        return;
      }
      setStep(5);
    } else if (step === 5) {
      if (!apoio) {
        toast.error('Escolha como prefere seguir a partir daqui.');
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
    else if (step === 6) setStep(momento === 'D' ? 3 : 5);
  };

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !contato) {
      toast.error('Conta seu nome e um WhatsApp ou e-mail para guardarmos o seu mapa.');
      return;
    }
    setIsUnlocked(true);
    toast.success('Mapa salvo — sua recomendação está logo abaixo.');
  };

  const toggleTarefa = (id: string) => {
    setTarefasFeitas((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // --- caminho orgânico: 4 marcos (Cenário · Momento · Caminho · Mapa); o ramo
  // "negociando" pula a etapa "Caminho" — em vez de fingir que ela foi
  // percorrida, ela simplesmente não existe nesse trajeto mais curto.
  const negociando = momento === 'D';
  const waypointDefs: { label: string; hint: string }[] = negociando
    ? [
        { label: 'Cenário', hint: 'seus números iniciais' },
        { label: 'Momento', hint: 'onde você está agora' },
        { label: 'Mapa', hint: 'seu próximo passo' },
      ]
    : [
        { label: 'Cenário', hint: 'seus números iniciais' },
        { label: 'Momento', hint: 'onde você está agora' },
        { label: 'Caminho', hint: 'o que pesa mais hoje' },
        { label: 'Mapa', hint: 'seu próximo passo' },
      ];

  const stageIndex = negociando
    ? step <= 2
      ? 0
      : step === 3
        ? 1
        : 2
    : step <= 2
      ? 0
      : step === 3
        ? 1
        : step <= 5
          ? 2
          : 3;

  const totalStages = waypointDefs.length;
  const progress = totalStages > 1 ? stageIndex / (totalStages - 1) : 0;

  const waypoints: CaminhoWaypoint[] = waypointDefs.map((wp, i) => ({
    label: wp.label,
    hint: wp.hint,
    status: i < stageIndex ? 'done' : i === stageIndex ? 'active' : 'upcoming',
  }));

  const stepVariants: Variants = reduceMotion
    ? { enter: { opacity: 0 }, center: { opacity: 1 }, exit: { opacity: 0 } }
    : { enter: { opacity: 0, y: 16 }, center: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } };

  const stepTransition = reduceMotion ? { duration: 0.01 } : { duration: 0.4, ease: EASE };

  const mapaContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.12 } },
  };
  const mapaBlockVariants: Variants = {
    hidden: (i: number) => ({ opacity: 0, y: 24, rotate: reduceMotion ? 0 : i % 2 === 0 ? -1.4 : 1.4 }),
    visible: { opacity: 1, y: 0, rotate: 0, transition: reduceMotion ? { duration: 0.01 } : { duration: 0.55, ease: EASE } },
  };

  // --- pontos do Mapa de Compra ---
  const pontosClaros: string[] = [
    `Com renda de ${fmt(nRenda)} e um imóvel imaginado em ${fmt(nValorImovel)}, dá para esboçar uma faixa de financiamento de até ${fmt(financiamentoMax)} pelo MCMV (até 80% do valor).`,
    gapEntrada > 0
      ? `Sua entrada de ${fmt(nEntrada)} ainda está ${fmt(gapEntrada)} abaixo dos 20% normalmente pedidos — um número concreto para planejar.`
      : `Sua entrada de ${fmt(nEntrada)} já cobre os 20% normalmente pedidos para esse valor de imóvel — uma base sólida para começar.`,
    `A parcela inicial estimada fica perto de ${fmt(parcelaEstimada)} (cerca de ${comprometimento.toFixed(0)}% da renda informada) — uma referência educativa, não uma aprovação.`,
  ];

  const pontosAtencao: string[] = [];
  if (gapEntrada > 0) {
    pontosAtencao.push(
      `Formar os ${fmt(gapEntrada)} que faltam na entrada — FGTS, subsídios e parcelamento direto com a construtora costumam ser os caminhos mais comuns.`
    );
  }
  if (comprometimentoAlto) {
    pontosAtencao.push(
      `A parcela estimada passa de 30% da renda informada — vale a pena olhar para imóveis de valor um pouco menor ou aumentar a entrada antes de seguir.`
    );
  }
  pontosAtencao.push(
    `Custos que chegam cedo e raramente entram na conta: ITBI e registro/escritura somam cerca de ${fmt(custosIniciais)} para esse imóvel.`
  );
  if (momento === 'A' || momento === 'B') {
    const focoLabel =
      opcaoAdaptativa === 'mcmv' || opcaoAdaptativa === 'duvidas_mcmv'
        ? 'as regras do MCMV'
        : opcaoAdaptativa === 'entrada' || opcaoAdaptativa === 'formar_entrada' || opcaoAdaptativa === 'pagar'
          ? 'a conta da entrada e do orçamento mensal'
          : opcaoAdaptativa === 'documentos' || opcaoAdaptativa === 'organizar_docs'
            ? 'a lista de documentos a organizar'
            : 'o processo como um todo';
    pontosAtencao.push(`Você indicou que ${focoLabel} ainda gera dúvida — esse é o ponto certo para começar a organizar.`);
  }
  if (momento === 'C') {
    const focoLabel =
      opcaoAdaptativa === 'criterios'
        ? 'definir critérios e um teto claro de orçamento'
        : opcaoAdaptativa === 'comparar'
          ? 'comparar com método as opções já encontradas'
          : opcaoAdaptativa === 'propostas'
            ? 'entender o que está por trás de cada proposta'
            : 'ter companhia técnica nas visitas';
    pontosAtencao.push(`Pelo que você contou, o ponto que mais renderia agora é ${focoLabel}.`);
  }

  const proximosPassos = [
    { id: 'fgts', titulo: 'Separar o extrato completo do FGTS', texto: 'Ele entra direto na conta da entrada e do financiamento.' },
    { id: 'docs', titulo: 'Reunir documentos de identidade e holerites recentes', texto: 'É o ponto de partida de qualquer análise de crédito.' },
    {
      id: 'taxas',
      titulo: `Provisionar cerca de ${fmt(custosIniciais)} para taxas de cartório`,
      texto: 'ITBI e registro costumam ser cobrados à vista, perto do início do processo.',
    },
    { id: 'simulacao', titulo: 'Fazer uma simulação oficial no site da Caixa', texto: 'Para confirmar se a faixa de juros do seu perfil bate com essa estimativa.' },
  ];

  return (
    <div className="relative min-h-screen text-[#06192C] font-sans pb-20 overflow-x-clip">
      {reduceMotion && (
        <style>{`@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }`}</style>
      )}

      <FluidMeshBackground reduceMotion={reduceMotion} />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-30 backdrop-blur-md bg-[#FFFDF7]/70 border-b border-[#06192C]/8">
        <div className="max-w-5xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#28C7BA] to-[#E43D30] flex items-center justify-center text-[#FFFDF7] font-black text-sm shadow-[0_8px_20px_-8px_rgba(228,61,48,0.55)]">
              PA
            </span>
            <div className="leading-none">
              <span className="block font-extrabold text-sm tracking-tight text-[#06192C]">Pinheiro Azul</span>
              <span className="block text-[9px] uppercase tracking-[0.18em] text-[#06192C]/45 font-bold mt-1">
                Caminho até o primeiro imóvel · Zona Leste
              </span>
            </div>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#06192C] hover:bg-[#0d2840] text-[#FFFDF7] text-xs font-bold px-4 py-2 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Falar com a gente</span>
          </a>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-8">
        {step !== 6 ? (
          <>
            <div className="mb-8">
              <CaminhoOrganico waypoints={waypoints} progress={progress} mode="compact" reduceMotion={reduceMotion} />
            </div>

            <motion.div layout className="bg-[#FFFDF7]/95 backdrop-blur-sm border border-[#06192C]/10 rounded-[32px] p-7 md:p-10 shadow-[0_24px_70px_-26px_rgba(6,25,44,0.28)] relative overflow-hidden">
              <AnimatePresence mode="wait">
                {/* ETAPA 1 — ENTRADA */}
                {step === 1 && (
                  <motion.div key="step-1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition}>
                    <span className={eyebrowClass}>
                      <Compass className="w-3 h-3" /> Para começar
                    </span>
                    <NarrativeReveal
                      reduceMotion={reduceMotion}
                      lines={['Antes de procurar um imóvel,', 'vamos entender o seu momento.']}
                      className="text-[28px] md:text-4xl font-extrabold tracking-tight leading-[1.08] mt-4 mb-3"
                    />
                    <p className="text-sm text-[#06192C]/65 leading-relaxed mb-8 max-w-lg">
                      Três números bastam para começar a desenhar o seu caminho — sem CPF, sem compromisso. Pode ser uma estimativa: estamos só traçando o primeiro contorno.
                    </p>

                    <div className="space-y-5 max-w-md">
                      <MoneyField
                        label="Renda mensal da família"
                        hint="Some a renda de quem participaria do financiamento com você."
                        value={nRenda}
                        placeholder="Ex: 6.500"
                        onChange={(raw) => formatMoney(raw, setRenda)}
                      />
                      <MoneyField
                        label="Quanto já existe de entrada"
                        hint="Pode somar conta, poupança e o saldo disponível do FGTS."
                        value={nEntrada}
                        placeholder="Ex: 20.000"
                        onChange={(raw) => formatMoney(raw, setEntrada)}
                      />
                      <MoneyField
                        label="Valor de imóvel que você imagina"
                        hint="O teto do MCMV na capital paulista hoje é de R$ 350.000."
                        value={nValorImovel}
                        placeholder="Ex: 240.000"
                        onChange={(raw) => formatMoney(raw, setValorImovel)}
                      />
                    </div>

                    <div className="mt-9 pt-6 border-t border-[#06192C]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-[#06192C]/50 text-[11px] font-bold">
                        <Lock className="w-3.5 h-3.5" /> Você não precisa de CPF para começar.
                      </span>
                      <button onClick={handleNext} className={`${primaryBtn} w-full sm:w-auto`}>
                        Desenhar meu primeiro traço
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 2 — CENÁRIO PRELIMINAR */}
                {step === 2 && (
                  <motion.div key="step-2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition}>
                    <span className={eyebrowClass}>
                      <Compass className="w-3 h-3" /> Seu primeiro esboço
                    </span>
                    <NarrativeReveal
                      reduceMotion={reduceMotion}
                      lines={['Com esses números,', 'já dá para traçar os primeiros contornos.']}
                      className="text-[28px] md:text-4xl font-extrabold tracking-tight leading-[1.08] mt-4 mb-3"
                    />
                    <p className="text-sm text-[#06192C]/65 leading-relaxed mb-7 max-w-lg">
                      Isto ainda não é uma simulação bancária — é um ponto de partida para você enxergar com mais clareza onde está pisando antes de seguir adiante.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      {[
                        { label: 'Renda informada', val: fmt(nRenda) },
                        { label: 'Entrada disponível', val: fmt(nEntrada) },
                        { label: 'Imóvel imaginado', val: fmt(nValorImovel) },
                      ].map((it) => (
                        <div key={it.label} className="bg-[#F4F0E8]/60 border border-[#06192C]/10 rounded-2xl p-4">
                          <span className="block text-[9px] uppercase font-bold text-[#06192C]/45 mb-1">{it.label}</span>
                          <span className="block text-lg font-extrabold font-mono text-[#06192C]">{it.val}</span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-[#06192C]/10 overflow-hidden mb-5">
                      <div className="bg-[#06192C] text-[#FFFDF7] px-5 py-2.5 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider">Esboço educativo</span>
                        <span className="text-[9px] font-mono text-[#FFFDF7]/55">não é aprovação bancária</span>
                      </div>
                      <div className="p-5 space-y-3 font-mono text-xs bg-[#FFFDF7]">
                        <div className="flex justify-between border-b border-[#06192C]/8 pb-2.5">
                          <span className="text-[#06192C]/55 uppercase">ITBI + registro/escritura</span>
                          <span className="font-bold text-[#E43D30]">{fmt(custosIniciais)}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#06192C]/8 pb-2.5">
                          <span className="text-[#06192C]/55 uppercase">Financiamento possível (até 80%)</span>
                          <span className="font-bold text-[#06192C]">{fmt(financiamentoMax)}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#06192C]/8 pb-2.5">
                          <span className="text-[#06192C]/55 uppercase">Parcela inicial estimada</span>
                          <span className="font-bold text-[#06192C]">{fmt(parcelaEstimada)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="text-[#06192C]/55 uppercase">Fatia da renda comprometida (estimativa)</span>
                          <span className="font-black text-[#06192C]">{comprometimento.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>

                    {comprometimentoAlto && (
                      <div className="flex gap-3 bg-[#F3D35B]/18 border border-[#06192C]/10 rounded-2xl p-4 mb-3">
                        <Info className="w-4 h-4 text-[#06192C] shrink-0 mt-0.5" />
                        <p className="text-xs text-[#06192C]/75 leading-relaxed">
                          <strong className="font-bold">Ponto que merece atenção:</strong> a parcela estimada passa de 30% da renda informada — um sinal para olhar imóveis de valor um pouco menor ou reforçar a entrada antes de seguir.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3 bg-[#28C7BA]/10 border border-[#06192C]/10 rounded-2xl p-4 mb-2">
                      <Info className="w-4 h-4 text-[#06192C] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#06192C]/75 leading-relaxed">
                        {gapEntrada > 0 ? (
                          <>
                            <strong className="font-bold">Vale planejar:</strong> sua entrada está {fmt(gapEntrada)} abaixo dos 20% normalmente pedidos para esse imóvel — um número concreto para organizar nos próximos passos.
                          </>
                        ) : (
                          <>
                            <strong className="font-bold">Já está em ordem:</strong> sua entrada cobre os 20% normalmente pedidos para esse valor de imóvel — uma boa base para seguir em frente.
                          </>
                        )}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#06192C]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={handleBack} className={ghostBtn}>
                        <ArrowLeft className="w-4 h-4" /> Ajustar números
                      </button>
                      <button onClick={handleNext} className={`${primaryBtn} w-full sm:w-auto`}>
                        Quero entender meu momento
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 3 — MOMENTO */}
                {step === 3 && (
                  <motion.div key="step-3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition}>
                    <span className={eyebrowClass}>
                      <Compass className="w-3 h-3" /> Seu momento
                    </span>
                    <NarrativeReveal
                      reduceMotion={reduceMotion}
                      lines={['Qual dessas frases', 'parece mais com você, hoje?']}
                      className="text-[28px] md:text-4xl font-extrabold tracking-tight leading-[1.08] mt-4 mb-3"
                    />
                    <p className="text-sm text-[#06192C]/65 leading-relaxed mb-7 max-w-lg">
                      Não existe resposta certa — só a que descreve melhor onde você está agora. Isso muda o que vem a seguir.
                    </p>

                    <div className="space-y-3.5">
                      {momentoOptions.map((opt) => (
                        <OptionCard
                          key={opt.id}
                          title={opt.titulo}
                          description={opt.descricao}
                          isSelected={momento === opt.id}
                          reduceMotion={reduceMotion}
                          onClick={() => {
                            setMomento(opt.id);
                            setOpcaoAdaptativa('');
                            setApoio('');
                          }}
                        />
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#06192C]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={handleBack} className={ghostBtn}>
                        <ArrowLeft className="w-4 h-4" /> Voltar
                      </button>
                      <button onClick={handleNext} className={`${primaryBtn} w-full sm:w-auto`}>
                        Seguir <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 4 — PERGUNTA ADAPTATIVA */}
                {step === 4 && (momento === 'A' || momento === 'B' || momento === 'C') && (
                  <motion.div key="step-4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition}>
                    <span className={eyebrowClass}>
                      <Compass className="w-3 h-3" /> Um pouco mais fundo
                    </span>
                    <NarrativeReveal
                      reduceMotion={reduceMotion}
                      lines={[adaptativaPorMomento[momento].pergunta]}
                      className="text-[28px] md:text-4xl font-extrabold tracking-tight leading-[1.08] mt-4 mb-3"
                    />
                    <p className="text-sm text-[#06192C]/65 leading-relaxed mb-7 max-w-lg">{adaptativaPorMomento[momento].lead}</p>

                    <div className="space-y-3.5">
                      {adaptativaPorMomento[momento].opcoes.map((opt) => (
                        <OptionCard
                          key={opt.id}
                          title={opt.titulo}
                          isSelected={opcaoAdaptativa === opt.id}
                          reduceMotion={reduceMotion}
                          onClick={() => setOpcaoAdaptativa(opt.id)}
                        />
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#06192C]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={handleBack} className={ghostBtn}>
                        <ArrowLeft className="w-4 h-4" /> Voltar
                      </button>
                      <button onClick={handleNext} className={`${primaryBtn} w-full sm:w-auto`}>
                        Seguir <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ETAPA 5 — PREFERÊNCIA DE APOIO */}
                {step === 5 && (
                  <motion.div key="step-5" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={stepTransition}>
                    <span className={eyebrowClass}>
                      <Compass className="w-3 h-3" /> Quase lá
                    </span>
                    <NarrativeReveal
                      reduceMotion={reduceMotion}
                      lines={['Como você prefere seguir', 'a partir daqui?']}
                      className="text-[28px] md:text-4xl font-extrabold tracking-tight leading-[1.08] mt-4 mb-3"
                    />
                    <p className="text-sm text-[#06192C]/65 leading-relaxed mb-7 max-w-lg">
                      Isso nos ajuda a propor o tamanho certo de apoio — nem mais, nem menos do que faz sentido para você agora.
                    </p>

                    <div className="space-y-3.5">
                      {apoioOptions.map((opt) => (
                        <OptionCard
                          key={opt.id}
                          title={opt.titulo}
                          description={opt.descricao}
                          isSelected={apoio === opt.id}
                          reduceMotion={reduceMotion}
                          onClick={() => setApoio(opt.id)}
                        />
                      ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#06192C]/8 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button onClick={handleBack} className={ghostBtn}>
                        <ArrowLeft className="w-4 h-4" /> Voltar
                      </button>
                      <button onClick={handleNext} className={`${primaryBtn} w-full sm:w-auto`}>
                        Montar meu Mapa de Compra <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          /* ETAPA 6 — MAPA DE COMPRA (layout mais amplo, caminho em modo síntese) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.5 }}
            className="flex flex-col md:flex-row gap-8 md:gap-10 max-w-5xl"
          >
            <CaminhoOrganico waypoints={waypoints} progress={progress} mode="synthesis" reduceMotion={reduceMotion} />

            <motion.div variants={mapaContainerVariants} initial="hidden" animate="visible" className="flex-1 space-y-5 min-w-0">
              <motion.div custom={0} variants={mapaBlockVariants} className={cardClass}>
                <span className={eyebrowClass}>
                  <Compass className="w-3 h-3" /> Seu Mapa de Compra
                </span>
                <NarrativeReveal
                  reduceMotion={reduceMotion}
                  lines={['Pronto.', 'Aqui está o que já dá para enxergar do seu caminho até o primeiro imóvel.']}
                  className="text-2xl md:text-[32px] font-extrabold tracking-tight leading-[1.12] mt-4"
                />
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div custom={1} variants={mapaBlockVariants} className={cardClass}>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#06192C]/45 mb-2">Seu momento</h3>
                  <p className="inline-block text-xs font-black uppercase tracking-wide text-[#06192C] bg-[#F3D35B]/30 border border-[#06192C]/10 rounded-full px-3 py-1 mb-3">
                    {momentoResumo[(momento || 'A') as 'A' | 'B' | 'C' | 'D'].titulo}
                  </p>
                  <p className="text-xs text-[#06192C]/70 leading-relaxed">{momentoResumo[(momento || 'A') as 'A' | 'B' | 'C' | 'D'].texto}</p>
                </motion.div>

                <motion.div custom={2} variants={mapaBlockVariants} className={cardClass}>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-[#06192C]/45 mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#28C7BA]" /> O que já está claro
                  </h3>
                  <ul className="space-y-2.5">
                    {pontosClaros.map((p, i) => (
                      <li key={i} className="text-xs text-[#06192C]/70 leading-relaxed flex gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#28C7BA] shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div custom={3} variants={mapaBlockVariants} className={cardClass}>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#06192C]/45 mb-3 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#E43D30]" /> O que pede atenção
                </h3>
                <ul className="space-y-2.5">
                  {pontosAtencao.map((p, i) => (
                    <li key={i} className="text-xs text-[#06192C]/70 leading-relaxed flex gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#E43D30] shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div custom={4} variants={mapaBlockVariants} className={cardClass}>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-[#06192C]/45 mb-1">Próximos passos</h3>
                <p className="text-xs text-[#06192C]/55 mb-4">Marque o que já estiver feito — o resto fica registrado para quando for a hora.</p>
                <div className="space-y-2.5">
                  {proximosPassos.map((tarefa) => {
                    const feita = tarefasFeitas.includes(tarefa.id);
                    return (
                      <button
                        key={tarefa.id}
                        onClick={() => toggleTarefa(tarefa.id)}
                        className={`w-full text-left flex items-start gap-3 rounded-2xl border px-4 py-3 transition-colors ${
                          feita ? 'bg-[#28C7BA]/8 border-[#28C7BA]/30' : 'bg-[#F4F0E8]/50 border-[#06192C]/8 hover:border-[#06192C]/20'
                        }`}
                      >
                        {feita ? (
                          <CheckCircle2 className="w-4 h-4 text-[#28C7BA] mt-0.5 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#06192C]/30 mt-0.5 shrink-0" />
                        )}
                        <span>
                          <span className={`block text-xs font-bold ${feita ? 'text-[#06192C]/40 line-through' : 'text-[#06192C]'}`}>
                            {tarefa.titulo}
                          </span>
                          <span className="block text-[10px] text-[#06192C]/50 mt-0.5">{tarefa.texto}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div custom={5} variants={mapaBlockVariants}>
                <AnimatePresence mode="wait">
                  {!isUnlocked ? (
                    <motion.div
                      key="gate"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                      transition={stepTransition}
                      className={`${cardClass} text-center`}
                    >
                      <div className="max-w-md mx-auto">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-2xl bg-[#F3D35B]/35 border border-[#06192C]/10 mb-3">
                          <Lock className="w-4 h-4 text-[#06192C]" />
                        </span>
                        <h3 className="text-lg font-extrabold tracking-tight text-[#06192C] mb-1.5">Quer guardar esse mapa para consultar depois?</h3>
                        <p className="text-xs text-[#06192C]/60 leading-relaxed mb-5">
                          Deixe seu nome e um contato — só usamos para enviar este mapa e abrir a recomendação pensada para o seu momento.
                        </p>
                        <form onSubmit={handleCapture} className="space-y-3 text-left">
                          <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Seu nome"
                            className="w-full bg-[#F4F0E8]/70 border border-[#06192C]/15 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#E43D30] focus:bg-[#FFFDF7] transition-all"
                          />
                          <input
                            type="text"
                            value={contato}
                            onChange={(e) => setContato(e.target.value)}
                            placeholder="WhatsApp ou e-mail"
                            className="w-full bg-[#F4F0E8]/70 border border-[#06192C]/15 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[#E43D30] focus:bg-[#FFFDF7] transition-all"
                          />
                          <button type="submit" className={`${primaryBtn} w-full`}>
                            Guardar mapa e ver minha recomendação <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="recomendacao"
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={stepTransition}
                      className={`${cardClass} border-t-[3px] border-t-[#28C7BA]`}
                    >
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#28C7BA] bg-[#28C7BA]/10 border border-[#28C7BA]/30 rounded-full px-3 py-1">
                        <Check className="w-3 h-3" /> Próximo passo recomendado
                      </span>
                      <h3 className="text-xl font-extrabold tracking-tight text-[#06192C] mt-3 mb-2">{recomendacao.titulo}</h3>
                      <p className="text-xs text-[#06192C]/70 leading-relaxed bg-[#F4F0E8]/50 border border-[#06192C]/8 rounded-2xl p-4 mb-4">
                        {recomendacao.texto}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <span className="text-[10px] uppercase font-bold text-[#06192C]/45">Investimento proporcional</span>
                        <span className="text-base font-black text-[#06192C]">{recomendacao.preco}</span>
                      </div>
                      <a
                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(recomendacao.mensagem)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-[#28C7BA] hover:bg-[#20aba0] text-[#06192C] font-black text-xs px-6 py-3.5 rounded-full transition-colors"
                      >
                        <MessageSquare className="w-4 h-4" /> {recomendacao.cta}
                      </a>
                      <p className="text-[11px] text-[#06192C]/55 leading-relaxed mt-4 pt-4 border-t border-[#06192C]/8">
                        {recomendacao.alternativaLabel}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div custom={6} variants={mapaBlockVariants}>
                <button onClick={handleBack} className={ghostBtn}>
                  <ArrowLeft className="w-4 h-4" /> Voltar e ajustar minhas respostas
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </main>

      <footer className="relative z-10 max-w-5xl mx-auto px-6 mt-16 pt-8 border-t border-[#06192C]/8 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-[#06192C]/45">
        <span>© {new Date().getFullYear()} Pinheiro Azul · CRECI 42817-J</span>
        <span>Caminho de assessoria de compra · Zona Leste, São Paulo</span>
      </footer>
    </div>
  );
}
