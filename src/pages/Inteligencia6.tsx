import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { CoinPiggyBackground } from '../components/CoinPiggyBackground';

// ─── formatters ───────────────────────────────────────────────────────────────

function brl(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(v);
}

// ─── component: DigitFlip ────────────────────────────────────────────────────
// Conceito "Número Vivo" — cada dígito numérico troca individualmente,
// com stagger da esquerda para direita (leftmost = mais significativo = primeiro).
// Não-dígitos (R$, espaços, pontos, vírgulas) são renderizados estáticos.

function DigitFlip({
  value,
  format,
  staggerMs = 30,
  baseDelay = 0,
}: {
  value: number;
  format: (v: number) => string;
  staggerMs?: number;
  baseDelay?: number;
}) {
  const formatted = format(value);
  let digitCount = 0;

  const segments = formatted.split('').map((char) => {
    const isDigit = /[0-9]/.test(char);
    return { char, isDigit, idx: isDigit ? digitCount++ : -1 };
  });

  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', fontVariantNumeric: 'tabular-nums' }}>
      {segments.map((seg, i) =>
        !seg.isDigit ? (
          <span key={`s-${i}`} style={{ display: 'inline-block' }}>
            {seg.char}
          </span>
        ) : (
          <span
            key={`d-${i}`}
            style={{
              overflow: 'hidden',
              display: 'inline-block',
              verticalAlign: 'bottom',
              lineHeight: 'inherit',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={seg.char}
                initial={{ y: '-110%' }}
                animate={{ y: '0%' }}
                exit={{ y: '110%' }}
                transition={{
                  duration: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                  delay: baseDelay + seg.idx * (staggerMs / 1000),
                }}
                style={{ display: 'block' }}
              >
                {seg.char}
              </motion.span>
            </AnimatePresence>
          </span>
        )
      )}
    </span>
  );
}

// ─── component: MaskedHeadline ────────────────────────────────────────────────
// Conceito 1 — "Revelação Mascarada"
// Cada palavra emerge de baixo para cima, mascarada por overflow:hidden.

const wordVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i: number) => ({
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as number[],
      delay: i * 0.08,
    },
  }),
};

function MaskedHeadline({
  text,
  className,
  style,
  baseDelay = 0,
  wordDuration = 0.55,
  stagger = 0.08,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
  wordDuration?: number;
  stagger?: number;
}) {
  const words = text.split(' ');
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '0.28em',
        rowGap: 0,
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}
        >
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: '0%',
                opacity: 1,
                transition: {
                  duration: wordDuration,
                  ease: [0.22, 1, 0.36, 1] as number[],
                  delay: baseDelay + i * stagger,
                },
              },
            }}
            initial="hidden"
            animate="visible"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

// ─── component: RiskBar ───────────────────────────────────────────────────────
// Conceito 3 — "Termômetro de Risco"
// Barra de progresso com três zonas de cor que anima a cada mudança de input.

function RiskBar({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 70); // cap visual em 70% para não transbordar
  const fill = Math.min(value, 100);

  const barColor =
    value <= 25 ? '#1a7a38' : value <= 30 ? '#b45309' : '#E85A2A';

  const prevStatus = useRef<string>('');
  const currentStatus = value <= 25 ? 'safe' : value <= 30 ? 'warn' : 'danger';
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (prevStatus.current && prevStatus.current !== currentStatus) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 500);
      return () => clearTimeout(t);
    }
    prevStatus.current = currentStatus;
  }, [currentStatus]);

  return (
    <div style={{ margin: '20px 0 8px', position: 'relative' }}>
      {/* track */}
      <div
        style={{
          height: '5px',
          background: '#E0DAD2',
          borderRadius: '3px',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {/* fill */}
        <motion.div
          animate={{
            width: `${Math.min(fill, 100)}%`,
            backgroundColor: barColor,
            scaleY: pulse ? [1, 1.8, 1] : 1,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          style={{
            height: '100%',
            borderRadius: '3px',
            position: 'absolute',
            left: 0,
            top: 0,
            transformOrigin: 'center',
            overflow: 'visible',
          }}
        >
          {/* Barra Respirando — glow que pulsa com frequência proporcional ao risco */}
          {currentStatus !== 'safe' && (
            <motion.div
              animate={{
                opacity: [0, 0.65, 0],
                scaleY: [1, 2.2, 1],
              }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: currentStatus === 'danger' ? 1.8 : 2.4,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                inset: '-2px 0',
                background: barColor,
                borderRadius: '4px',
                filter: `blur(4px)`,
                transformOrigin: 'center',
                pointerEvents: 'none',
              }}
            />
          )}
        </motion.div>

        {/* threshold markers */}
        {[25, 30].map((t) => {
          const isViolated =
            (t === 25 && value > 25) || (t === 30 && value > 30);
          return (
            <motion.div
              key={t}
              animate={{ opacity: isViolated ? [0.5, 1, 0.5, 1] : 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                left: `${t}%`,
                top: '-5px',
                bottom: '-5px',
                width: '1.5px',
                background: '#A09890',
                pointerEvents: 'none',
              }}
            />
          );
        })}
      </div>

      {/* labels abaixo dos marcadores */}
      <div style={{ position: 'relative', height: '16px', marginTop: '4px' }}>
        {[25, 30].map((t) => (
          <span
            key={t}
            style={{
              position: 'absolute',
              left: `${t}%`,
              transform: 'translateX(-50%)',
              fontSize: '9px',
              fontWeight: 600,
              color: '#A09890',
              letterSpacing: '0.05em',
            }}
          >
            {t}%
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── component: SectionReveal ─────────────────────────────────────────────────

function SectionReveal({
  children,
  delay = 0,
  style,
  amount = 0.15,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── component: SectionLabel ──────────────────────────────────────────────────

function SectionLabel({
  number,
  label,
  light = false,
}: {
  number: string;
  label: string;
  light?: boolean;
}) {
  const color = light ? 'rgba(255,255,255,0.45)' : 'var(--dc-muted)';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        color,
        marginBottom: '32px',
        textTransform: 'lowercase',
      }}
    >
      <span style={{ opacity: 0.6 }}>( {number} )</span>
      <span
        style={{
          width: '32px',
          height: '1px',
          background: light ? 'rgba(255,255,255,0.25)' : 'var(--dc-rule)',
          display: 'block',
          flexShrink: 0,
        }}
      />
      <span>{label}</span>
    </div>
  );
}

// ─── data ─────────────────────────────────────────────────────────────────────

const MODULES = [
  { id: '01', name: 'o preço está acima do que o bairro pratica?', desc: 'comparamos com transações reais registradas em cartório, não com o anúncio.' },
  { id: '02', name: 'quanto você vai precisar além do preço anunciado?', desc: 'calculamos itbi, cartório e avaliação bancária antes da escritura.' },
  { id: '03', name: 'o banco vai aprovar seu financiamento?', desc: 'simulamos a primeira parcela real contra sua renda — com a taxa atual.' },
  { id: '04', name: 'tem cláusula ou pendência que pode virar problema?', desc: 'mapeamos reajustes, saúde da incorporadora e ônus na matrícula.' },
  { id: '05', name: 'vale a pena assinar?', desc: 'nossa opinião direta: compra, compra com ressalvas ou não compra.' },
];

const DELIVERABLES = [
  'se o preço é justo comparado ao que outros pagaram no mesmo bairro',
  'quanto você vai precisar ter em caixa no dia da escritura',
  'se o banco vai ou não aprovar o seu financiamento',
  'o que pode dar errado antes ou depois da assinatura',
  'nossa opinião direta: compra, compra com ressalvas ou não compra',
];

// ─── main ─────────────────────────────────────────────────────────────────────

export default function Inteligencia6() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [valorImovel, setValorImovel] = useState(450000);
  const [entrada,     setEntrada]     = useState(90000);   // default: 20% de R$450k
  const [rendaMensal, setRendaMensal] = useState(8000);

  // calculations
  const itbi = valorImovel * 0.03;
  const escritura = valorImovel * 0.015;
  const totalCustos = itbi + escritura + 3000;

  const entradaMax     = Math.floor(valorImovel * 0.9 / 5000) * 5000; // cap em 90%
  const entradaSafe    = Math.min(entrada, entradaMax);               // nunca > max
  const entradaPct     = valorImovel > 0 ? Math.round((entradaSafe / valorImovel) * 100) : 0;
  const valorFinanciado = Math.max(0, valorImovel - entradaSafe);
  const primeiraParcela = valorFinanciado / 360 + valorFinanciado * (0.105 / 12);
  const comprometimento = rendaMensal > 0 ? (primeiraParcela / rendaMensal) * 100 : 0;
  const statusRenda = comprometimento <= 25 ? 'safe' : comprometimento <= 30 ? 'warn' : 'danger';

  // ── Conceito 2: refs + contadores para seção 02 ──
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true, amount: 0.55 });

  // section 02 — DigitFlip gated: valores só aparecem após cardInView
  const [showItems, setShowItems] = useState(false);
  const [showTotal, setShowTotal] = useState(false);
  const [lineGrow, setLineGrow]   = useState(false);
  useEffect(() => {
    if (!cardInView) return;
    const t1 = setTimeout(() => setShowItems(true), 0);
    const t2 = setTimeout(() => setLineGrow(true),  900);
    const t3 = setTimeout(() => setShowTotal(true), 1100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [cardInView]);

  // whatsapp
  const whatsappMsg = encodeURIComponent(
    `Olá! Quero solicitar a Análise de Viabilidade Imobiliária (R$ 147). Imóvel: ${brl(valorImovel)}.`
  );
  const whatsappUrl = `https://wa.me/5511999999999?text=${whatsappMsg}`;

  // ── Conceito 4: ref para seção 05 (laudo materializa) ──
  const darkRef = useRef<HTMLDivElement>(null);
  const darkInView = useInView(darkRef, { once: true, amount: 0.25 });

  return (
    <>
      <style>{`
        :root {
          --dc-bg:    #F5F1EB;
          --dc-bg2:   #EDE8DF;
          --dc-ink:   #171717;
          --dc-muted: #6D665F;
          --dc-accent:#E85A2A;
          --dc-acc-h: #D94C1D;
          --dc-dark:  #1E2A2B;
          --dc-dark2: #243536;
          --dc-rule:  #D8D2C8;
          --dc-white: #FFFFFF;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }

        .dc-display {
          font-size: clamp(48px, 7vw, 100px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.03em;
        }
        .dc-h1 {
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 800;
          line-height: 1.06;
          letter-spacing: -0.025em;
        }
        .dc-h2 {
          font-size: clamp(22px, 3vw, 38px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .dc-body {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: var(--dc-muted);
        }

        .dc-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 999px;
          background: var(--dc-accent);
          color: var(--dc-white);
          font-size: 14px;
          font-weight: 600;
          text-transform: lowercase;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 160ms ease, transform 160ms ease;
          font-family: inherit;
          letter-spacing: 0.01em;
        }
        .dc-btn:hover { background: var(--dc-acc-h); transform: translateY(-1px); }

        .dc-input-field {
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--dc-ink);
          font-family: inherit;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--dc-ink);
          width: 100%;
          padding: 4px 0;
          outline: none;
          font-variant-numeric: tabular-nums;
          -moz-appearance: textfield;
        }
        .dc-input-field::-webkit-outer-spin-button,
        .dc-input-field::-webkit-inner-spin-button { -webkit-appearance: none; }
        .dc-input-field:focus { border-bottom-color: var(--dc-accent); }

        .dc-rule-line { width: 100%; height: 1px; background: var(--dc-rule); }

        /* ── range slider ── */
        .dc-range {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          border-radius: 2px;
          background: var(--dc-rule);
          outline: none;
          cursor: pointer;
          margin-top: 16px;
        }
        .dc-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--dc-accent);
          cursor: pointer;
          border: 3px solid var(--dc-bg);
          box-shadow: 0 0 0 1.5px var(--dc-accent);
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .dc-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--dc-accent);
          cursor: pointer;
          border: 3px solid var(--dc-bg);
          box-shadow: 0 0 0 1.5px var(--dc-accent);
          transition: transform 140ms ease;
        }
        .dc-range:hover::-webkit-slider-thumb { transform: scale(1.15); }
        .dc-range:hover::-moz-range-thumb    { transform: scale(1.15); }
        .dc-range:focus::-webkit-slider-thumb { box-shadow: 0 0 0 3px rgba(232,90,42,0.25); }

        .dc-module-row { transition: background 200ms ease; border-radius: 6px; }
        .dc-module-row:hover { background: rgba(0,0,0,0.025); }
        .dc-module-row:hover .dc-mod-num { color: var(--dc-accent); }

        @media (max-width: 640px) {
          .dc-2col  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dc-3col  { grid-template-columns: 1fr !important; gap: 40px !important; }
          .dc-2col-calc { grid-template-columns: 1fr !important; gap: 2px !important; }
        }
        @media (max-width: 900px) and (min-width: 641px) {
          .dc-3col { grid-template-columns: 1fr 1fr !important; gap: 40px !important; }
        }
      `}</style>

      <div
        ref={pageRef}
        style={{
          backgroundColor: 'var(--dc-bg)',
          color: 'var(--dc-ink)',
          fontFamily: "'Inter', system-ui, sans-serif",
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative', // necessário para o background absoluto
        }}
      >
        {/* ── background full-page: tubo + moedas + porquinho ─────────── */}
        <CoinPiggyBackground pageRef={pageRef as React.RefObject<HTMLElement>} />

        {/* ── nav ──────────────────────────────────────────────────────── */}
        <motion.nav
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '28px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'lowercase' }}>
            pinheiro azul
          </span>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="dc-btn"
            style={{ fontSize: '13px', padding: '10px 20px' }}>
            solicitar análise →
          </a>
        </motion.nav>

        <hr className="dc-rule-line" />

        {/* ── ( 01 ) hero ──────────────────────────────────────────────── */}
        {/* Conceito 1 — Revelação Mascarada */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 40px 120px' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SectionLabel number="01" label="inteligência imobiliária" />
          </motion.div>

          <div
            className="dc-2col"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end' }}
          >
            {/* headline com revelação mascarada */}
            <MaskedHeadline
              text="saiba tudo sobre o imóvel antes de comprar."
              className="dc-display"
              style={{ color: 'var(--dc-ink)', margin: 0 }}
              baseDelay={0.1}
              wordDuration={0.55}
              stagger={0.08}
            />

            {/* copy + cta */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.75 }}
              style={{ paddingBottom: '8px' }}
            >
              <p className="dc-body" style={{ marginBottom: '32px', maxWidth: '420px' }}>
                o preço está dentro do mercado? você tem caixa suficiente?
                o banco vai aprovar? tem risco no contrato? —
                cinco perguntas que respondemos antes de você assinar.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#calcular" className="dc-btn">calcular agora →</a>
                <span style={{ fontSize: '13px', color: 'var(--dc-muted)' }}>r$ 147 · entrega em 48h</span>
              </div>
            </motion.div>
          </div>
        </section>

        <hr className="dc-rule-line" />

        {/* ── ( 02 ) o problema ────────────────────────────────────────── */}
        {/* Conceito 2 — Contador que Acusa */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 40px' }}>
          <SectionReveal>
            <SectionLabel number="02" label="o que toda compra inclui" />

            <div
              className="dc-2col"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
            >
              {/* editorial copy */}
              <div>
                <MaskedHeadline
                  text="4,5% que fazem parte de qualquer compra."
                  className="dc-h1"
                  style={{ color: 'var(--dc-ink)', margin: '0 0 24px' }}
                  wordDuration={0.4}
                  stagger={0.055}
                />
                <p className="dc-body" style={{ marginBottom: '16px' }}>
                  toda transferência imobiliária no brasil envolve custos obrigatórios
                  cobrados separadamente do preço de venda. eles precisam estar
                  provisionados antes da escritura para que a compra se concretize.
                </p>
                <p className="dc-body">
                  são o itbi, a escritura, o registro em cartório e a avaliação bancária.
                  juntos, somam entre 4,5% e 6% do valor do imóvel, à vista.
                </p>
              </div>

              {/* card contador */}
              <div
                ref={cardRef}
                style={{
                  background: 'var(--dc-bg2)',
                  borderRadius: '24px',
                  padding: '48px 40px',
                }}
              >
                <p style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em',
                  textTransform: 'lowercase', color: 'var(--dc-muted)', marginBottom: '24px'
                }}>
                  num imóvel de r$ 450.000
                </p>

                {[
                  { label: 'itbi',               sub: '3% do valor',  final: 13500, baseDelay: 0    },
                  { label: 'escritura + cartório', sub: '1,5% do valor', final: 6750,  baseDelay: 0.12 },
                  { label: 'avaliação bancária',  sub: 'estimativa',   final: 3000,  baseDelay: 0.24 },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      paddingBottom: '16px',
                      marginBottom: '16px',
                      borderBottom: i < 2 ? '1px solid var(--dc-rule)' : 'none',
                    }}
                  >
                    <span style={{ fontSize: '14px', color: 'var(--dc-muted)', textTransform: 'lowercase' }}>
                      {item.label}
                      <span style={{ fontSize: '11px', marginLeft: '8px', opacity: 0.6 }}>{item.sub}</span>
                    </span>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--dc-ink)' }}>
                      <DigitFlip
                        value={showItems ? item.final : 0}
                        format={(v) => `r$ ${new Intl.NumberFormat('pt-BR').format(v)}`}
                        staggerMs={35}
                        baseDelay={item.baseDelay}
                      />
                    </span>
                  </div>
                ))}

                {/* total — linha cresce antes do contador */}
                <div style={{ paddingTop: '16px', position: 'relative' }}>
                  <motion.div
                    animate={{ scaleX: lineGrow ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      height: '2px',
                      background: 'var(--dc-ink)',
                      transformOrigin: 'left',
                      marginBottom: '16px',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, textTransform: 'lowercase' }}>
                      total de transferência
                    </span>
                    <span
                      style={{
                        fontSize: '28px',
                        fontWeight: 900,
                        letterSpacing: '-0.02em',
                        color: 'var(--dc-accent)',
                      }}
                    >
                      <DigitFlip
                        value={showTotal ? 23250 : 0}
                        format={(v) => `r$ ${new Intl.NumberFormat('pt-BR').format(v)}`}
                        staggerMs={40}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </SectionReveal>
        </section>

        <hr className="dc-rule-line" />

        {/* ── ( 03 ) o que analisamos ──────────────────────────────────── */}
        <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 40px' }}>
          <SectionReveal>
            <SectionLabel number="03" label="cinco perguntas" />

            <MaskedHeadline
              text="cinco perguntas que você precisa responder antes de assinar."
              className="dc-h1"
              style={{ color: 'var(--dc-ink)', margin: '0 0 64px', maxWidth: '620px' }}
              wordDuration={0.4}
              stagger={0.045}
            />

            <div>
              {MODULES.map((mod, i) => (
                <motion.div
                  key={mod.id}
                  className="dc-module-row"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '48px 1fr 1fr',
                    gap: '24px',
                    alignItems: 'center',
                    padding: '28px 12px',
                    cursor: 'default',
                    position: 'relative',
                  }}
                >
                  {/* número */}
                  <span
                    className="dc-mod-num"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--dc-muted)',
                      letterSpacing: '0.08em',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {mod.id}
                  </span>

                  {/* nome */}
                  <span style={{
                    fontSize: 'clamp(17px, 2.2vw, 26px)',
                    fontWeight: 700,
                    letterSpacing: '-0.015em',
                    lineHeight: 1.15,
                    textTransform: 'lowercase',
                  }}>
                    {mod.name}
                  </span>

                  {/* desc */}
                  <span className="dc-body" style={{ fontSize: '14px' }}>{mod.desc}</span>

                  {/* linha divisória animada — scaleX 0→1 após o texto */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 + 0.25 }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '1px',
                      background: 'var(--dc-rule)',
                      transformOrigin: 'left',
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </SectionReveal>
        </section>

        <hr className="dc-rule-line" />

        {/* ── ( 04 ) calculadora ───────────────────────────────────────── */}
        {/* Conceito 3 — Termômetro de Risco */}
        <section id="calcular" style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 40px' }}>
          <SectionReveal>
            <SectionLabel number="04" label="calcule agora" />

            <MaskedHeadline
              text="vamos começar entendendo o que esse imóvel representa no seu orçamento."
              className="dc-h1"
              style={{ color: 'var(--dc-ink)', margin: '0 0 64px', maxWidth: '600px' }}
              wordDuration={0.4}
              stagger={0.04}
            />

            {/* inputs */}
            <div
              className="dc-3col"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '48px', marginBottom: '80px' }}
            >
              {/* ── valor do imóvel ── */}
              <div>
                <p style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'lowercase', color: 'var(--dc-muted)', marginBottom: '12px'
                }}>
                  valor do imóvel
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800,
                    color: 'var(--dc-muted)', letterSpacing: '-0.02em', flexShrink: 0,
                  }}>
                    r$
                  </span>
                  <input
                    type="number"
                    className="dc-input-field"
                    value={valorImovel}
                    onChange={(e) => setValorImovel(Number(e.target.value) || 0)}
                    step={25000}
                    min={150000}
                    max={3000000}
                    aria-label="Valor do imóvel"
                  />
                </div>
                <input
                  type="range"
                  className="dc-range"
                  min={150000}
                  max={3000000}
                  step={25000}
                  value={valorImovel}
                  onChange={(e) => setValorImovel(Number(e.target.value))}
                  aria-label="Slider valor do imóvel"
                />
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '6px', fontSize: '11px', color: 'var(--dc-muted)',
                  letterSpacing: '0.04em',
                }}>
                  <span>r$ 150k</span>
                  <span>r$ 1,5 M</span>
                  <span>r$ 3,0 M</span>
                </div>
              </div>

              {/* ── valor de entrada ── */}
              <div>
                <p style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'lowercase', color: 'var(--dc-muted)', marginBottom: '12px'
                }}>
                  valor de entrada
                  {entradaPct > 0 && (
                    <span style={{
                      marginLeft: '8px',
                      fontWeight: 700,
                      color: entradaPct >= 20 ? 'var(--l-green, #1a7a38)' : 'var(--dc-accent)',
                    }}>
                      {entradaPct}%
                    </span>
                  )}
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800,
                    color: 'var(--dc-muted)', letterSpacing: '-0.02em', flexShrink: 0,
                  }}>
                    r$
                  </span>
                  <input
                    type="number"
                    className="dc-input-field"
                    value={entradaSafe}
                    onChange={(e) => setEntrada(Math.max(0, Number(e.target.value) || 0))}
                    step={5000}
                    min={0}
                    max={entradaMax}
                    aria-label="Valor de entrada"
                  />
                </div>
                <input
                  type="range"
                  className="dc-range"
                  min={0}
                  max={entradaMax}
                  step={5000}
                  value={entradaSafe}
                  onChange={(e) => setEntrada(Number(e.target.value))}
                  aria-label="Slider valor de entrada"
                />
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '6px', fontSize: '11px', color: 'var(--dc-muted)',
                  letterSpacing: '0.04em',
                }}>
                  <span>r$ 0</span>
                  <span>20%</span>
                  <span>90%</span>
                </div>
              </div>

              {/* ── renda familiar ── */}
              <div>
                <p style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'lowercase', color: 'var(--dc-muted)', marginBottom: '12px'
                }}>
                  renda familiar bruta mensal
                </p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{
                    fontSize: 'clamp(20px, 2.5vw, 32px)', fontWeight: 800,
                    color: 'var(--dc-muted)', letterSpacing: '-0.02em', flexShrink: 0,
                  }}>
                    r$
                  </span>
                  <input
                    type="number"
                    className="dc-input-field"
                    value={rendaMensal}
                    onChange={(e) => setRendaMensal(Number(e.target.value) || 0)}
                    step={500}
                    min={3000}
                    max={50000}
                    aria-label="Renda familiar bruta mensal"
                  />
                </div>
                <input
                  type="range"
                  className="dc-range"
                  min={3000}
                  max={50000}
                  step={500}
                  value={rendaMensal}
                  onChange={(e) => setRendaMensal(Number(e.target.value))}
                  aria-label="Slider renda familiar"
                />
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: '6px', fontSize: '11px', color: 'var(--dc-muted)',
                  letterSpacing: '0.04em',
                }}>
                  <span>r$ 3k</span>
                  <span>r$ 26k</span>
                  <span>r$ 50k</span>
                </div>
              </div>
            </div>

            {/* output cards */}
            <div
              className="dc-2col-calc"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px' }}
            >
              {/* custos de transferência */}
              <div
                style={{
                  background: 'var(--dc-bg2)',
                  borderRadius: '24px 4px 4px 24px',
                  padding: '48px 40px',
                }}
              >
                <p style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'lowercase', color: 'var(--dc-muted)', marginBottom: '16px'
                }}>
                  custos de transferência
                </p>
                <div
                  className="dc-h1"
                  style={{ margin: '0 0 12px', color: 'var(--dc-accent)' }}
                >
                  <DigitFlip value={totalCustos} format={brl} staggerMs={28} />
                </div>
                <p style={{ fontSize: '13px', color: 'var(--dc-muted)', lineHeight: 1.5 }}>
                  itbi, escritura, registro e avaliação bancária.<br />
                  cobrados separadamente, à vista, antes da escritura.
                </p>
              </div>

              {/* comprometimento + termômetro */}
              <div
                style={{
                  background: 'var(--dc-bg2)',
                  borderRadius: '4px 24px 24px 4px',
                  padding: '48px 40px',
                }}
              >
                <p style={{
                  fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
                  textTransform: 'lowercase', color: 'var(--dc-muted)', marginBottom: '16px'
                }}>
                  comprometimento de renda estimado
                </p>

                <div
                  className="dc-h1"
                  style={{
                    margin: '0 0 4px',
                    color:
                      statusRenda === 'safe' ? '#1a7a38'
                        : statusRenda === 'warn' ? '#b45309'
                        : 'var(--dc-accent)',
                  }}
                >
                  <DigitFlip
                    value={Math.round(comprometimento * 10) / 10}
                    format={(v) => `${v.toFixed(1).replace('.', ',')}%`}
                    staggerMs={28}
                  />
                </div>

                {/* barra termômetro */}
                <RiskBar value={comprometimento} />

                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.5,
                  fontWeight: 600,
                  color:
                    statusRenda === 'safe' ? '#1a7a38'
                      : statusRenda === 'warn' ? '#b45309'
                      : 'var(--dc-accent)',
                  marginTop: '8px',
                }}>
                  {statusRenda === 'safe' && '✓ dentro do limite seguro (≤ 25%).'}
                  {statusRenda === 'warn' && '⚠ próximo ao limite — análise recomendada.'}
                  {statusRenda === 'danger' && '✗ acima de 30% — risco de recusa bancária.'}
                </p>
              </div>
            </div>

            <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--dc-muted)', lineHeight: 1.6 }}>
              simulação SAC · {100 - entradaPct}% financiado · 30 anos · 10,5% a.a. · ref. caixa econômica federal jun/2025.{' '}
              <span style={{ color: 'var(--dc-accent)', fontWeight: 600 }}>
                esses são os números do seu imóvel específico.
              </span>
            </p>
          </SectionReveal>
        </section>

        {/* ── ( 05 ) dark CTA — O Laudo Materializa ───────────────────── */}
        {/* Conceito 4: entrada com perspectiva 3D, como um documento colocado sobre a mesa */}
        <section ref={darkRef} style={{ background: 'var(--dc-dark)', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '96px 40px' }}>

            <motion.div
              initial={{ opacity: 0 }}
              animate={darkInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
            >
              <SectionLabel number="05" label="laudo completo" light />
            </motion.div>

            <div
              className="dc-2col"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'end' }}
            >
              {/* preço + copy — entra com perspectiva de "colocar na mesa" */}
              <motion.div
                initial={{ opacity: 0, rotateX: 14, y: 24 }}
                animate={darkInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                style={{ transformPerspective: '900px', transformOrigin: 'top center' }}
              >
                <div
                  className="dc-display"
                  style={{ color: 'var(--dc-white)', margin: '0 0 24px', lineHeight: 1.0 }}
                >
                  r$ 147.
                </div>
                <p style={{
                  fontSize: '16px', color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65, maxWidth: '400px'
                }}>
                  análise independente. sem comissão. sem conflito de interesse.
                  entregamos um documento com os cinco pontos avaliados em até 48 horas.
                </p>
              </motion.div>

              {/* lista de entregáveis — cada item entra com pequena perspectiva em stagger */}
              <div style={{ paddingBottom: '8px' }}>
                {DELIVERABLES.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, rotateX: 8, y: 10 }}
                    animate={darkInView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.35 + i * 0.08,
                    }}
                    style={{
                      transformPerspective: '600px',
                      transformOrigin: 'top left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                    }}
                  >
                    <motion.span
                      animate={darkInView ? { scale: [0, 1.2, 1] } : { scale: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut', delay: 0.45 + i * 0.08 }}
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'var(--dc-accent)',
                        flexShrink: 0,
                        display: 'inline-block',
                      }}
                    />
                    <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', textTransform: 'lowercase' }}>
                      {item}
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={darkInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 + DELIVERABLES.length * 0.08 + 0.1 }}
                  style={{ marginTop: '40px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="dc-btn">
                    solicitar laudo →
                  </a>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)' }}>
                    via whatsapp · entrega em até 48h
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── footer ────────────────────────────────────────────────────── */}
        <footer style={{
          background: 'var(--dc-dark2)',
          padding: '28px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', textTransform: 'lowercase' }}>
            pinheiro azul inteligência imobiliária · zona leste, são paulo
          </span>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.18)', textTransform: 'lowercase' }}>
            análise independente · sem comissão
          </span>
        </footer>
      </div>
    </>
  );
}
