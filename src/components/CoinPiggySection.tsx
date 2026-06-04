/**
 * CoinPiggySection
 * Moedas percorrem um tubo e caem num cofrinho (porquinho) enquanto o usuário scrolla.
 * Conceito: "análise que protege seu dinheiro."
 * Stack: GSAP 3 + ScrollTrigger + MotionPathPlugin
 */

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ─── path do tubo ────────────────────────────────────────────────────────────
// Bezier cúbico: começa no topo (150, 22) → curva S → termina no slot do pig (148, 397)
const TUBE_D = 'M 150 22 C 245 115 58 255 148 397';

// ─── número de moedas ─────────────────────────────────────────────────────────
const N_COINS = 5;

// ─── tempos por moeda ─────────────────────────────────────────────────────────
const STAGGER = 0.17; // offset entre cada moeda (em unidades da timeline)
const TRAVEL  = 0.54; // duração do percurso no tubo

export function CoinPiggySection() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respeita preferência de movimento reduzido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const coins = gsap.utils.toArray<Element>('.cpig-coin');

      // Moedas inicialmente invisíveis
      gsap.set(coins, { opacity: 0, scale: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          scrub: 1.2,
          start: 'top 85%',
          end: 'bottom 22%',
        },
      });

      coins.forEach((coin, i) => {
        const t = i * STAGGER;

        // 1. Aparecer
        tl.to(coin, { opacity: 1, duration: 0.04 }, t);

        // 2. Percorrer o tubo
        tl.to(
          coin,
          {
            motionPath: {
              path: '#cpig-tube-path',
              align: '#cpig-tube-path',
              alignOrigin: [0.5, 0.5],
              autoRotate: false,
            },
            duration: TRAVEL,
            ease: 'none',
          },
          t
        );

        // 3. Cair no slot — encolhe e some
        tl.to(
          coin,
          {
            scale: 0,
            opacity: 0,
            y: '+=10',
            duration: 0.07,
            ease: 'power2.in',
          },
          t + TRAVEL - 0.02
        );

        // 4. Slot pisca dourado
        tl.to('#cpig-slot', { fill: '#F5B83A', duration: 0.04 }, t + TRAVEL);
        tl.to('#cpig-slot', { fill: '#1E2A2B', duration: 0.12 }, t + TRAVEL + 0.04);

        // 5. Porquinho jiggle (bate o rabo de alegria)
        tl.to(
          '#cpig-group',
          {
            keyframes: [
              { rotation: 4,  duration: 0.04, ease: 'none' },
              { rotation: -3, duration: 0.04, ease: 'none' },
              { rotation: 0,  duration: 0.08, ease: 'power2.out' },
            ],
            transformOrigin: '148px 496px',
          },
          t + TRAVEL + 0.03
        );
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      style={{
        background: 'var(--dc-bg)',
        padding: '72px 40px 100px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Label */}
      <p
        style={{
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'lowercase',
          color: 'var(--dc-muted)',
          marginBottom: '52px',
          textAlign: 'center',
        }}
      >
        cada centavo em perspectiva
      </p>

      {/* Wrap para o ScrollTrigger */}
      <div ref={wrapRef} className="scroll-trigger-ready__worm-wrap">
        <svg
          viewBox="0 0 300 550"
          width="260"
          height="477"
          style={{ display: 'block', overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* ── Tubo visual ──────────────────────────────────── */}
          {/* Sombra externa */}
          <path d={TUBE_D} stroke="#C8C2B8" strokeWidth="34" fill="none" strokeLinecap="round" opacity="0.35"/>
          {/* Parede do tubo */}
          <path d={TUBE_D} stroke="#D8D2C8" strokeWidth="30" fill="none" strokeLinecap="round"/>
          {/* Interior (mais claro) */}
          <path d={TUBE_D} stroke="#EDE8DF" strokeWidth="18" fill="none" strokeLinecap="round"/>
          {/* Highlight central */}
          <path d={TUBE_D} stroke="#F5F1EB" strokeWidth="8"  fill="none" strokeLinecap="round" opacity="0.7"/>

          {/* Path invisível para MotionPathPlugin */}
          <path id="cpig-tube-path" d={TUBE_D} stroke="none" fill="none"/>

          {/* ── Porquinho ─────────────────────────────────────── */}
          <g id="cpig-group">

            {/* Slot (acima do corpo, onde as moedas entram) */}
            <rect id="cpig-slot" x="130" y="396" width="36" height="7" rx="3.5" fill="#1E2A2B"/>
            {/* Abertura do slot — sombra interna */}
            <rect x="131" y="397" width="34" height="3" rx="1.5" fill="#101E1F" opacity="0.5"/>

            {/* Corpo */}
            <ellipse cx="148" cy="458" rx="66" ry="53"
              fill="#FBD9C0" stroke="#E0A080" strokeWidth="2"/>

            {/* Cabeça (lado direito) */}
            <circle cx="207" cy="430" r="32"
              fill="#FBD9C0" stroke="#E0A080" strokeWidth="2"/>

            {/* Orelha */}
            <ellipse cx="211" cy="401" rx="11" ry="9"
              fill="#F0A878" stroke="#E0A080" strokeWidth="1.5"/>
            <ellipse cx="211" cy="402" rx="6" ry="5" fill="#E89060"/>

            {/* Focinho */}
            <ellipse cx="231" cy="434" rx="13" ry="11"
              fill="#F0A878" stroke="#E0A080" strokeWidth="1.5"/>
            {/* Narinas */}
            <circle cx="227" cy="435" r="2.5" fill="#C07055"/>
            <circle cx="234" cy="433" r="2.5" fill="#C07055"/>

            {/* Olho */}
            <circle cx="201" cy="420" r="3.5" fill="#2E1A0E"/>
            <circle cx="202" cy="419" r="1.2" fill="white"/>

            {/* Pernas */}
            <rect x="96"  y="500" width="14" height="17" rx="5" fill="#FBD9C0" stroke="#E0A080" strokeWidth="1.5"/>
            <rect x="115" y="500" width="14" height="17" rx="5" fill="#FBD9C0" stroke="#E0A080" strokeWidth="1.5"/>
            <rect x="153" y="500" width="14" height="17" rx="5" fill="#FBD9C0" stroke="#E0A080" strokeWidth="1.5"/>
            <rect x="172" y="500" width="14" height="17" rx="5" fill="#FBD9C0" stroke="#E0A080" strokeWidth="1.5"/>

            {/* Rabo (espiral) */}
            <path
              d="M 80 460 C 68 450 64 470 74 468 C 80 467 78 456 72 460"
              fill="none" stroke="#E0A080" strokeWidth="2.5" strokeLinecap="round"
            />
          </g>

          {/* ── Moedas ────────────────────────────────────────── */}
          {/* Centradas em (0,0) — MotionPathPlugin posiciona via transform */}
          {Array.from({ length: N_COINS }).map((_, i) => (
            <g key={i} className="cpig-coin" style={{ opacity: 0 }}>
              {/* Borda */}
              <circle cx="0" cy="0" r="15"
                fill="#F5B83A" stroke="#C88A00" strokeWidth="2.5"/>
              {/* Anel interno — efeito 3D de moeda */}
              <circle cx="0" cy="0" r="11"
                fill="none" stroke="#F9D06A" strokeWidth="2" opacity="0.75"/>
              {/* Texto R$ */}
              <text
                x="0" y="4"
                textAnchor="middle"
                fontSize="9"
                fontWeight="800"
                fill="#7A5200"
                style={{ fontFamily: "'Inter', system-ui, sans-serif", userSelect: 'none' }}
              >
                R$
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
