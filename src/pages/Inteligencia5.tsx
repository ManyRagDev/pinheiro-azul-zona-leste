import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

// ─── formatters ──────────────────────────────────────────────────────────────

function brl(v: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(v);
}

function pct(v: number) {
  return `${v.toFixed(1).replace('.', ',')}%`;
}

// ─── AnimatedValue — fades on key change ──────────────────────────────────

function AnimatedValue({
  value,
  format,
}: {
  value: number;
  format: (v: number) => string;
}) {
  const rounded = Math.round(value * 10) / 10;
  return (
    <motion.span
      key={rounded}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ display: 'inline-block', fontVariantNumeric: 'tabular-nums' }}
    >
      {format(value)}
    </motion.span>
  );
}

// ─── SectionBlock ─────────────────────────────────────────────────────────

function SectionBlock({
  number,
  title,
  note,
  children,
}: {
  number: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        borderTop: '1px solid var(--l-rule)',
        paddingTop: '2rem',
        marginBottom: '3.5rem',
      }}
    >
      {/* section number + title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.75rem',
          flexWrap: 'wrap',
        }}
      >
        <span className="laudo-label" style={{ color: 'var(--l-navy)', flexShrink: 0 }}>
          {number}
        </span>
        <span
          style={{
            flex: 1,
            height: '1px',
            background: 'var(--l-rule)',
            minWidth: '1rem',
          }}
        />
        <span
          className="laudo-label"
          style={{ color: 'var(--l-navy)', flexShrink: 0, letterSpacing: '0.18em' }}
        >
          {title}
        </span>
      </div>

      {children}

      {note && (
        <p
          style={{
            marginTop: '1.25rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--l-rule)',
            fontSize: '0.65rem',
            color: 'var(--l-muted)',
            letterSpacing: '0.04em',
            lineHeight: 1.6,
          }}
        >
          {note}
        </p>
      )}
    </motion.section>
  );
}

// ─── VerdictStamp ─────────────────────────────────────────────────────────

function VerdictStamp() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div ref={ref} style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0 1rem' }}>
      <motion.div
        initial={{ scale: 0.2, rotate: -15, opacity: 0 }}
        animate={inView ? { scale: 1, rotate: -5, opacity: 1 } : {}}
        transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
        style={{
          border: '3px solid var(--l-rule)',
          borderRadius: '4px',
          padding: '1.25rem 2.5rem',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.3rem',
          userSelect: 'none',
        }}
      >
        <span
          className="laudo-label"
          style={{ color: 'var(--l-rule)', letterSpacing: '0.35em', fontSize: '0.6rem' }}
        >
          AGUARDANDO
        </span>
        <span
          className="laudo-label"
          style={{ color: 'var(--l-rule)', letterSpacing: '0.35em', fontSize: '0.6rem' }}
        >
          ANÁLISE
        </span>
        <span
          className="laudo-label"
          style={{ color: 'var(--l-rule)', letterSpacing: '0.35em', fontSize: '0.6rem' }}
        >
          COMPLETA
        </span>
      </motion.div>
    </div>
  );
}

// ─── neighborhood data ────────────────────────────────────────────────────

const NEIGHBORHOODS = [
  { bairro: 'Anália Franco', m2min: 9500, m2max: 16000 },
  { bairro: 'Tatuapé', m2min: 8200, m2max: 14500 },
  { bairro: 'Mooca', m2min: 7800, m2max: 12000 },
  { bairro: 'Água Rasa', m2min: 7200, m2max: 11500 },
  { bairro: 'Carrão', m2min: 6500, m2max: 10500 },
  { bairro: 'Vila Prudente', m2min: 5800, m2max: 9000 },
  { bairro: 'Penha', m2min: 5200, m2max: 8800 },
  { bairro: 'Vila Matilde', m2min: 5000, m2max: 8500 },
];

const NUM_FORMAT = new Intl.NumberFormat('pt-BR');

// ─── main ─────────────────────────────────────────────────────────────────

export default function Inteligencia5() {
  const [valorImovel, setValorImovel] = useState(450000);
  const [rendaMensal, setRendaMensal] = useState(8000);

  const itbi = valorImovel * 0.03;
  const escritura = valorImovel * 0.015;
  const avaliacaoBancaria = 3000;
  const totalCustos = itbi + escritura + avaliacaoBancaria;

  const valorFinanciado = valorImovel * 0.8;
  const amortizacao = valorFinanciado / 360;
  const juros = valorFinanciado * (0.105 / 12);
  const primeiraParcela = amortizacao + juros;
  const comprometimento = rendaMensal > 0 ? (primeiraParcela / rendaMensal) * 100 : 0;

  const statusRenda =
    comprometimento <= 25 ? 'safe' : comprometimento <= 30 ? 'warning' : 'danger';

  const whatsappMsg = encodeURIComponent(
    `Olá! Quero solicitar a Análise de Viabilidade Imobiliária (R$ 147). ` +
      `Imóvel: ${brl(valorImovel)}.`
  );
  const whatsappUrl = `https://wa.me/5511930418684?text=${whatsappMsg}`;

  return (
    <>
      <style>{`
        :root {
          --l-bg: #f7f4ee;
          --l-ink: #1a1209;
          --l-navy: #003366;
          --l-red: #c0392b;
          --l-green: #1a7a38;
          --l-amber: #92400e;
          --l-rule: #ccc6bb;
          --l-muted: #888880;
        }
        .laudo-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .laudo-table {
          width: 100%;
          border-collapse: collapse;
        }
        .laudo-table th {
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--l-muted);
          padding: 0.4rem 0;
          text-align: left;
          border-bottom: 1px solid var(--l-rule);
        }
        .laudo-table td {
          font-size: 0.875rem;
          padding: 0.7rem 0;
          border-bottom: 1px solid var(--l-rule);
          color: var(--l-ink);
          font-variant-numeric: tabular-nums;
          vertical-align: middle;
        }
        .laudo-table tr:last-child td {
          border-bottom: none;
        }
        .laudo-input {
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--l-ink);
          font-family: inherit;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--l-navy);
          width: 100%;
          padding: 0.25rem 0;
          outline: none;
          font-variant-numeric: tabular-nums;
          -moz-appearance: textfield;
        }
        .laudo-input::-webkit-outer-spin-button,
        .laudo-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        .laudo-input:focus {
          border-bottom-color: var(--l-navy);
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
        @media (max-width: 560px) {
          .laudo-inputs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        style={{
          backgroundColor: 'var(--l-bg)',
          color: 'var(--l-ink)',
          fontFamily: "'Inter', system-ui, sans-serif",
          minHeight: '100vh',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem 1.5rem 7rem' }}>

          {/* ── document header ─────────────────────────────────────── */}
          <header style={{ marginBottom: '4rem', position: 'relative', minHeight: '6rem' }}>

            {/* large R$ graphic — absolutely positioned background element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              aria-hidden
              style={{
                position: 'absolute',
                top: '-0.15em',
                left: '-0.04em',
                fontSize: 'clamp(5rem, 18vw, 11rem)',
                fontWeight: 900,
                color: 'var(--l-navy)',
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                opacity: 0.07,
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              R$
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{ position: 'relative', zIndex: 1, paddingTop: '4.5rem' }}
            >
              <span
                className="laudo-label"
                style={{ color: 'var(--l-navy)', display: 'block', marginBottom: '0.6rem' }}
              >
                Pinheiro Azul · Inteligência Imobiliária
              </span>

              <h1
                style={{
                  fontSize: 'clamp(1.6rem, 4.5vw, 2.4rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  color: 'var(--l-ink)',
                  marginBottom: '1rem',
                }}
              >
                Análise de Viabilidade Imobiliária
              </h1>

              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span style={{ fontSize: '0.7rem', color: 'var(--l-muted)', letterSpacing: '0.06em' }}>
                  Ref: PA-VIA-2025
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--l-muted)', letterSpacing: '0.06em' }}>
                  Zona Leste · São Paulo
                </span>
                <span
                  className="laudo-label"
                  style={{
                    background: 'var(--l-navy)',
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '2px',
                    fontSize: '0.6rem',
                  }}
                >
                  Amostra interativa
                </span>
              </div>
            </motion.div>
          </header>

          {/* ── seção 0: o momento ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              borderLeft: '3px solid var(--l-navy)',
              paddingLeft: '1.25rem',
              marginBottom: '4rem',
            }}
          >
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: 'var(--l-ink)',
                fontWeight: 400,
                marginBottom: '0.75rem',
              }}
            >
              Você tem um imóvel em vista. Antes de qualquer compromisso,{' '}
              <em>vale organizar todos os números.</em>
            </p>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#666' }}>
              Esta análise coloca cada número na mesa — preço de mercado, custos
              reais, comprometimento de renda e riscos — antes que você assine.
            </p>
          </motion.div>

          {/* ── inputs ───────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="laudo-inputs-grid"
            style={{
              background: '#fff',
              border: '1px solid var(--l-rule)',
              borderRadius: '4px',
              padding: '1.5rem 1.75rem',
              marginBottom: '4rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2rem',
            }}
          >
            <div>
              <label
                className="laudo-label"
                style={{
                  display: 'block',
                  color: 'var(--l-muted)',
                  marginBottom: '0.5rem',
                  fontSize: '0.6rem',
                }}
              >
                Valor do imóvel
              </label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--l-muted)', fontSize: '1.1rem' }}>
                  R$
                </span>
                <input
                  type="number"
                  className="laudo-input"
                  value={valorImovel}
                  onChange={(e) => setValorImovel(Number(e.target.value) || 0)}
                  step={10000}
                  min={0}
                  aria-label="Valor do imóvel"
                />
              </div>
            </div>
            <div>
              <label
                className="laudo-label"
                style={{
                  display: 'block',
                  color: 'var(--l-muted)',
                  marginBottom: '0.5rem',
                  fontSize: '0.6rem',
                }}
              >
                Renda familiar bruta
              </label>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--l-muted)', fontSize: '1.1rem' }}>
                  R$
                </span>
                <input
                  type="number"
                  className="laudo-input"
                  value={rendaMensal}
                  onChange={(e) => setRendaMensal(Number(e.target.value) || 0)}
                  step={500}
                  min={0}
                  aria-label="Renda familiar bruta mensal"
                />
              </div>
            </div>
          </motion.div>

          {/* ── 1.0: comparação de m² ──────────────────────────────── */}
          <SectionBlock
            number="1.0"
            title="Comparação de Preço por M²"
            note="* Dados baseados em transações registradas em cartório, Zona Leste — SP. Ref: 2024/2025. Valores em R$/m² (piso–teto de mercado). No laudo completo, o imóvel avaliado é posicionado dentro desta tabela com identificação da origem do preço."
          >
            <table className="laudo-table">
              <thead>
                <tr>
                  <th>Bairro</th>
                  <th style={{ textAlign: 'right' }}>Piso R$/m²</th>
                  <th style={{ textAlign: 'right' }}>Teto R$/m²</th>
                </tr>
              </thead>
              <tbody>
                {NEIGHBORHOODS.map((n, i) => (
                  <motion.tr
                    key={n.bairro}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.045 }}
                  >
                    <td style={{ fontWeight: 500 }}>{n.bairro}</td>
                    <td style={{ textAlign: 'right', color: 'var(--l-muted)' }}>
                      {NUM_FORMAT.format(n.m2min)}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700 }}>
                      {NUM_FORMAT.format(n.m2max)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </SectionBlock>

          {/* ── 2.0: custos ocultos ────────────────────────────────── */}
          <SectionBlock
            number="2.0"
            title="Custos de Transferência"
            note="* ITBI: alíquota vigente em São Paulo é 3,00% (Decreto Municipal nº 57.988/2017). Escritura e registro: estimativa de 1,50%. Avaliação bancária: valor fixo estimado para financiamento padrão. Todos os custos são devidos pelo comprador, à vista."
          >
            <table className="laudo-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th style={{ textAlign: 'right' }}>Alíquota</th>
                  <th style={{ textAlign: 'right' }}>Valor estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>ITBI — Imposto de Transmissão de Bens Imóveis</td>
                  <td style={{ textAlign: 'right', color: 'var(--l-muted)', fontSize: '0.8rem' }}>
                    3,00%
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    <AnimatedValue value={itbi} format={brl} />
                  </td>
                </tr>
                <tr>
                  <td>Escritura e Registro em Cartório</td>
                  <td style={{ textAlign: 'right', color: 'var(--l-muted)', fontSize: '0.8rem' }}>
                    1,50%
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    <AnimatedValue value={escritura} format={brl} />
                  </td>
                </tr>
                <tr>
                  <td>Avaliação bancária (estimativa)</td>
                  <td style={{ textAlign: 'right', color: 'var(--l-muted)', fontSize: '0.8rem' }}>
                    —
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    {brl(avaliacaoBancaria)}
                  </td>
                </tr>
                {/* total row */}
                <tr style={{ borderTop: '2px solid var(--l-ink)' }}>
                  <td
                    colSpan={2}
                    style={{ fontWeight: 700, paddingTop: '0.85rem', fontSize: '0.875rem' }}
                  >
                    Total de custos ocultos
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      fontWeight: 900,
                      fontSize: '1.15rem',
                      color: 'var(--l-red)',
                      paddingTop: '0.85rem',
                    }}
                  >
                    <AnimatedValue value={totalCustos} format={brl} />
                  </td>
                </tr>
              </tbody>
            </table>

            <p
              style={{
                marginTop: '1rem',
                fontSize: '0.82rem',
                color: 'var(--l-red)',
                fontWeight: 500,
                lineHeight: 1.6,
              }}
            >
              ⚠ Estes custos são cobrados separadamente do preço de venda, à vista,
              antes ou durante a lavratura da escritura.
            </p>
          </SectionBlock>

          {/* ── 3.0: comprometimento de renda ──────────────────────── */}
          <SectionBlock
            number="3.0"
            title="Comprometimento de Renda"
            note="* Simulação SAC: 80% financiado, prazo de 30 anos (360 parcelas), taxa referencial 10,5% a.a. (Caixa Econômica Federal, jun/2025). Primeira parcela = amortização + juros do mês 1 (pico do SAC). Limite prudencial: Banco Central do Brasil recomenda máximo de 30% da renda bruta."
          >
            <table className="laudo-table" style={{ marginBottom: '1rem' }}>
              <tbody>
                <tr>
                  <td style={{ color: 'var(--l-muted)', fontSize: '0.82rem' }}>
                    Valor financiado (80%)
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <AnimatedValue value={valorFinanciado} format={brl} />
                  </td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--l-muted)', fontSize: '0.82rem' }}>
                    Primeira parcela estimada (SAC, mês 1)
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>
                    <AnimatedValue value={primeiraParcela} format={brl} />
                  </td>
                </tr>
                <tr>
                  <td style={{ color: 'var(--l-muted)', fontSize: '0.82rem' }}>
                    Renda familiar bruta informada
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <AnimatedValue value={rendaMensal} format={brl} />
                  </td>
                </tr>
                {/* comprometimento */}
                <tr style={{ borderTop: '2px solid var(--l-ink)' }}>
                  <td style={{ fontWeight: 700, paddingTop: '0.85rem' }}>
                    Comprometimento de renda
                  </td>
                  <td
                    style={{
                      textAlign: 'right',
                      fontWeight: 900,
                      fontSize: '1.4rem',
                      paddingTop: '0.85rem',
                      color:
                        statusRenda === 'safe'
                          ? 'var(--l-green)'
                          : statusRenda === 'warning'
                          ? '#b45309'
                          : 'var(--l-red)',
                    }}
                  >
                    <AnimatedValue value={comprometimento} format={pct} />
                  </td>
                </tr>
              </tbody>
            </table>

            {/* status bar */}
            <motion.div
              key={statusRenda}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '3px',
                borderLeft: `3px solid ${
                  statusRenda === 'safe'
                    ? 'var(--l-green)'
                    : statusRenda === 'warning'
                    ? '#b45309'
                    : 'var(--l-red)'
                }`,
                background:
                  statusRenda === 'safe'
                    ? '#eaf4ee'
                    : statusRenda === 'warning'
                    ? '#fef3c7'
                    : '#fdecea',
              }}
            >
              <p
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  lineHeight: 1.5,
                  color:
                    statusRenda === 'safe'
                      ? '#155d27'
                      : statusRenda === 'warning'
                      ? '#92400e'
                      : '#9b1c1c',
                }}
              >
                {statusRenda === 'safe' &&
                  '✓ Dentro do limite prudencial (≤ 25%). Perfil financeiro confortável para esta faixa de financiamento.'}
                {statusRenda === 'warning' &&
                  '⚠ Próximo ao limite (25–30%). Recomenda-se análise detalhada do fluxo de caixa familiar antes de prosseguir.'}
                {statusRenda === 'danger' &&
                  '✗ Acima do limite prudencial (> 30%). Alto risco de recusa bancária ou comprometimento severo do orçamento familiar.'}
              </p>
            </motion.div>
          </SectionBlock>

          {/* ── 4.0: riscos ─────────────────────────────────────────── */}
          <SectionBlock
            number="4.0"
            title="Atenções e Riscos"
            note="* Itens sinalizados como bloqueados são verificados no laudo completo com base na documentação do imóvel, matrícula atualizada e dados do vendedor/incorporadora."
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {[
                {
                  label: 'Tipo de indexação do saldo devedor identificado',
                  status: 'sample' as const,
                },
                {
                  label: 'Cláusulas de reajuste INCC/IGPM no contrato',
                  status: 'locked' as const,
                },
                {
                  label: 'Saúde financeira da incorporadora (imóvel na planta)',
                  status: 'locked' as const,
                },
                {
                  label: 'Histórico de variação de preço do imóvel — últimos 24 meses',
                  status: 'locked' as const,
                },
                {
                  label: 'Débitos, ônus e penhoras sobre o imóvel (matrícula)',
                  status: 'locked' as const,
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    padding: '0.8rem 0',
                    borderBottom: '1px solid var(--l-rule)',
                  }}
                >
                  {item.status === 'sample' ? (
                    <span
                      className="laudo-label"
                      style={{
                        color: 'var(--l-muted)',
                        flexShrink: 0,
                        fontSize: '0.58rem',
                        letterSpacing: '0.12em',
                      }}
                    >
                      AMOSTRA
                    </span>
                  ) : (
                    <span
                      style={{
                        background: 'var(--l-rule)',
                        color: 'transparent',
                        userSelect: 'none',
                        fontSize: '0.58rem',
                        padding: '0.18rem 0.55rem',
                        borderRadius: '2px',
                        letterSpacing: '0.15em',
                        fontWeight: 700,
                        flexShrink: 0,
                        fontFamily: 'inherit',
                      }}
                    >
                      BLOQUEADO
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.5,
                      color:
                        item.status === 'locked' ? 'var(--l-rule)' : 'var(--l-ink)',
                    }}
                  >
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </SectionBlock>

          {/* ── 5.0: veredito ───────────────────────────────────────── */}
          <SectionBlock number="5.0" title="Veredito">
            <p
              style={{
                fontSize: '0.875rem',
                color: '#555',
                lineHeight: 1.75,
                marginBottom: '0.5rem',
              }}
            >
              O veredito final classifica o imóvel em uma das três categorias:{' '}
              <strong>Aprovado</strong>,{' '}
              <strong>Aprovado com Ressalvas Críticas</strong> ou{' '}
              <strong>Não Recomendado</strong>. É emitido pelo analista responsável com base em
              todos os dados verificados — preço de mercado, custos, comprometimento de renda e
              riscos documentais.
            </p>
            <VerdictStamp />
          </SectionBlock>

          {/* ── cta footer ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              borderTop: '2px solid var(--l-ink)',
              paddingTop: '2rem',
            }}
          >
            <span
              className="laudo-label"
              style={{ color: 'var(--l-muted)', display: 'block', marginBottom: '1rem', fontSize: '0.6rem' }}
            >
              Para emitir este laudo com os dados reais do seu imóvel
            </span>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.75rem',
                flexWrap: 'wrap',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  fontSize: '2.25rem',
                  fontWeight: 900,
                  color: 'var(--l-navy)',
                  letterSpacing: '-0.04em',
                }}
              >
                R$ 147
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--l-muted)' }}>
                · entrega em até 48h · análise independente · sem comissão
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--l-navy)',
                color: '#fff',
                padding: '0.875rem 1.75rem',
                borderRadius: '3px',
                fontWeight: 700,
                fontSize: '0.9rem',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Solicitar laudo completo via WhatsApp →
            </a>

            <div
              style={{
                marginTop: '3rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--l-rule)',
                fontSize: '0.65rem',
                color: 'var(--l-muted)',
                letterSpacing: '0.06em',
              }}
            >
              Pinheiro Azul Inteligência Imobiliária · Zona Leste, São Paulo
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
