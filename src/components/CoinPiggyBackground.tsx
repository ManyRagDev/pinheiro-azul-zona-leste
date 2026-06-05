/**
 * CoinPiggyBackground
 *
 * SVG full-page overlay posicionado absolutamente sobre o conteúdo.
 * – Tubo translúcido em S-curve da hero section até o porquinho
 * – 2 moedas esféricas 3D (gradiente radial com especular)
 * – Porquinho com gradientes, sombra e blush
 * – Animação GSAP ScrollTrigger scrubbed, 25% mais lenta que o original
 * – opacity geral do tubo ~12% pra não roubar a cena
 */

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import pigPng  from '../assets/pig.png';
import coinPng from '../assets/coin.png';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface Props {
  pageRef: React.RefObject<HTMLElement>;
  pigEndRef?: React.RefObject<HTMLElement>;
}

const NUM_COINS = 2;
const STAGGER   = 0.30;   // gap entre as 2 moedas
const TRAVEL    = 0.68;   // percurso completo — ~25% mais lento que 0.52

export function CoinPiggyBackground({ pageRef, pigEndRef }: Props) {
  const [dims, setDims] = useState<{ w: number; h: number; endY: number } | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Mede a página depois de renderizar
  useLayoutEffect(() => {
    const measure = () => {
      const el = pageRef.current;
      if (!el) return;

      const pageBox = el.getBoundingClientRect();
      const endBox = pigEndRef?.current?.getBoundingClientRect();
      const sectionEndY = endBox ? endBox.bottom - pageBox.top : el.scrollHeight * 0.74;

      setDims({
        w: el.offsetWidth || 1280,
        h: el.scrollHeight || 5000,
        endY: sectionEndY,
      });
    };
    const t = setTimeout(measure, 450); // aguarda React terminar de montar
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, [pageRef, pigEndRef]);

  // GSAP: monta a timeline depois que as dimensões estão prontas
  useEffect(() => {
    if (!dims) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const coins = gsap.utils.toArray<Element>('.cpig-coin-bg');
      gsap.set(coins, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          scrub: 1.5,
          // começa quando a hero sai e termina no fechamento da seção-alvo
          start: `${dims.h * 0.10}px top`,
          end:   `${dims.endY}px top`,
        },
      });

      coins.forEach((coin, i) => {
        const t = i * STAGGER;
        tl.to(coin, { opacity: 1, duration: 0.06 }, t);
        tl.to(coin, {
          motionPath: {
            path: '#cpig-tube',
            align: '#cpig-tube',
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: TRAVEL,
          ease: 'none',
        }, t);
        // entra no slot
        tl.to(coin, {
          scale: 0,
          opacity: 0,
          transformOrigin: 'center center',
          duration: 0.08,
          ease: 'power2.in',
        }, t + TRAVEL);
        // slot pisca dourado
        tl.to('#cpig-slot-fill', { fill: '#F9CE45', duration: 0.04 }, t + TRAVEL);
        tl.to('#cpig-slot-fill', { fill: '#1E2A2B', duration: 0.14 }, t + TRAVEL + 0.04);
        // pig jiggle
        tl.to('#cpig-pig-g', {
          keyframes: [
            { rotation: 5,  duration: 0.04, ease: 'none' },
            { rotation: -3, duration: 0.04, ease: 'none' },
            { rotation: 0,  duration: 0.09, ease: 'power2.out' },
          ],
          transformOrigin: 'center bottom',
        }, t + TRAVEL + 0.03);
      });
    }, wrapRef);

    return () => ctx.revert();
  }, [dims]);

  if (!dims) return null;
  const { w, h, endY } = dims;
  const isMobile = w <= 640;

  const xy = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`;
  const catmullRomPath = (points: Array<[number, number]>) => {
    const d = [`M ${xy(points[0][0], points[0][1])}`];

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];
      const cp1: [number, number] = [
        p1[0] + (p2[0] - p0[0]) / 6,
        p1[1] + (p2[1] - p0[1]) / 6,
      ];
      const cp2: [number, number] = [
        p2[0] - (p3[0] - p1[0]) / 6,
        p2[1] - (p3[1] - p1[1]) / 6,
      ];

      d.push(`C ${xy(cp1[0], cp1[1])} ${xy(cp2[0], cp2[1])} ${xy(p2[0], p2[1])}`);
    }

    return d.join(' ');
  };

  // ── Ponto final do tubo = coin slot do pig ───────────────────────────────
  const slotX = w * (isMobile ? 0.58 : 0.48);
  const PIG_W = isMobile ? 168 : 220;
  const PIG_H = isMobile ? 210 : 275;
  const slotOffsetY = PIG_H * 0.30;
  const pigBottomPadding = isMobile ? 18 : 24;
  const slotY = Math.max(h * 0.18, endY - (PIG_H - slotOffsetY) - pigBottomPadding);

  // ── Caminho S-curve ──────────────────────────────────────────────────────
  // Spline contínua: mantém o movimento orgânico do "worm" sem pontas nas emendas.
  const tubePath = catmullRomPath(
    isMobile
      ? [
          [w * 0.72, h * 0.14],
          [w * 0.34, h * 0.24],
          [w * 0.78, h * 0.36],
          [w * 0.28, h * 0.50],
          [w * 0.58, h * 0.62],
          [slotX - w * 0.18, slotY - 190],
          [slotX - w * 0.07, slotY - 84],
          [slotX, slotY],
        ]
      : [
          [w * 0.62, h * 0.15],
          [w * 0.68, h * 0.25],
          [w * 0.58, h * 0.38],
          [w * 0.42, h * 0.49],
          [w * 0.24, h * 0.56],
          [w * 0.35, h * 0.63],
          [w * 0.49, h * 0.69],
          [slotX - w * 0.13, slotY - 154],
          [slotX - w * 0.04, slotY - 72],
          [slotX, slotY],
        ]
  );

  const tubeWidths = isMobile
    ? { glow: 86, outer: 62, body: 46, inner: 30, highlight: 13 }
    : { glow: 144, outer: 102, body: 75, inner: 48, highlight: 21 };
  const coinW = isMobile ? 42 : 52;
  const coinH = isMobile ? 52 : 65;

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.5,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          {/* ── filtros ─────────────────────────────────────────── */}
          <filter id="cpig-pig-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="8" stdDeviation="12" floodColor="#00000028"/>
          </filter>
          <filter id="cpig-coin-shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#00000030"/>
          </filter>
          <filter id="cpig-tube-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="18" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>

          {/* ── gradientes da moeda esférica ───────────────────── */}
          <radialGradient id="cpig-coin-g" cx="30%" cy="25%" r="72%">
            <stop offset="0%"   stopColor="white"   stopOpacity="0.95"/>
            <stop offset="22%"  stopColor="#FAD24A"/>
            <stop offset="60%"  stopColor="#E5A200"/>
            <stop offset="100%" stopColor="#9A6800"/>
          </radialGradient>
          <radialGradient id="cpig-coin-rim" cx="68%" cy="75%" r="45%">
            <stop offset="0%"   stopColor="#F9D070" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#F9D070" stopOpacity="0"/>
          </radialGradient>

          {/* ── gradientes do porquinho ─────────────────────────── */}
          <radialGradient id="cpig-body-g" cx="38%" cy="28%" r="68%">
            <stop offset="0%"   stopColor="#FFEEE0"/>
            <stop offset="60%"  stopColor="#F8B890"/>
            <stop offset="100%" stopColor="#E87848"/>
          </radialGradient>
          <radialGradient id="cpig-head-g" cx="40%" cy="30%" r="65%">
            <stop offset="0%"   stopColor="#FFEEE0"/>
            <stop offset="60%"  stopColor="#F8B890"/>
            <stop offset="100%" stopColor="#E87848"/>
          </radialGradient>
          <radialGradient id="cpig-snout-g" cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor="#F4B898"/>
            <stop offset="100%" stopColor="#D86040"/>
          </radialGradient>
          <radialGradient id="cpig-ear-g" cx="40%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#F4B898"/>
            <stop offset="100%" stopColor="#D86040"/>
          </radialGradient>
          <radialGradient id="cpig-blush" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#FF7060" stopOpacity="0.55"/>
            <stop offset="100%" stopColor="#FF7060" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* ── TUBO (camadas de stroke = profundidade visual) ───── */}
        {/* Ambient glow externo — strokeWidth +50% */}
        <path d={tubePath} stroke="#C0B8AE" strokeWidth={tubeWidths.glow} fill="none"
          strokeLinecap="round" opacity="0.06"/>
        {/* Parede externa */}
        <path d={tubePath} stroke="#BEB6AA" strokeWidth={tubeWidths.outer} fill="none"
          strokeLinecap="round" opacity="0.10"/>
        {/* Corpo do tubo */}
        <path d={tubePath} stroke="#CEC8BE" strokeWidth={tubeWidths.body} fill="none"
          strokeLinecap="round" opacity="0.12"/>
        {/* Interior claro */}
        <path d={tubePath} stroke="#E4DFDA" strokeWidth={tubeWidths.inner} fill="none"
          strokeLinecap="round" opacity="0.13"/>
        {/* Highlight central */}
        <path d={tubePath} stroke="#F0ECE7" strokeWidth={tubeWidths.highlight} fill="none"
          strokeLinecap="round" opacity="0.11"/>

        {/* Path invisível para MotionPathPlugin */}
        <path id="cpig-tube" d={tubePath} stroke="none" fill="none"/>

        {/* ── PORQUINHO PNG ─────────────────────────────────────── */}
        {/* pig.png: 1080×1350 RGBA. Exibido em 220×275px.
            Slot estimado em ~45% x, ~30% y da imagem = (99, 83) do canto superior esq.
            Ajuste slotOffsetX/Y se o slot não alinhar perfeitamente. */}
        {(() => {
          const slotOffsetX = PIG_W * 0.45;  // ~99px da esquerda
          const slotOffsetY = PIG_H * 0.30;  // ~83px do topo
          const imgX = slotX - slotOffsetX;
          const imgY = slotY - slotOffsetY;
          return (
            <g id="cpig-pig-g">
              {/* Imagem PNG do porquinho */}
              <image
                href={pigPng}
                x={imgX}
                y={imgY}
                width={PIG_W}
                height={PIG_H}
              />
              {/* Slot invisível para a animação de flash dourado */}
              <rect
                id="cpig-slot-fill"
                x={slotX - 18}
                y={slotY - 4}
                width={36}
                height={8}
                rx="4"
                fill="transparent"
              />
            </g>
          );
        })()}

        {/* ── MOEDAS PNG ────────────────────────────────────────── */}
        {/* coin.png: 1080×1350 RGBA. Exibido em 52×65px (prop. 0.8).
            Centrado em (0,0) para o MotionPathPlugin posicionar via transform. */}
        {Array.from({ length: NUM_COINS }).map((_, i) => (
          <g key={i} className="cpig-coin-bg" style={{ opacity: 0 }}>
            <image
              href={coinPng}
              x={-coinW / 2}
              y={-coinH / 2}
              width={coinW}
              height={coinH}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
