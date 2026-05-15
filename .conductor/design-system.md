# 🎨 Modern Dark Bento Design System

> Um guia completo para criar landing pages premium, modernas e coesas no estilo "Bento Grid Dark Mode" — inspirado em produtos SaaS de ponta como Linear, Vercel, Framer e Raycast.

---

## 📖 Índice

1. [Filosofia de Design](#filosofia-de-design)
2. [Fundamentos Visuais](#fundamentos-visuais)
3. [Sistema de Cores](#sistema-de-cores)
4. [Tipografia](#tipografia)
5. [Layout Bento Grid](#layout-bento-grid)
6. [Componentes](#componentes)
7. [Animações e Microinterações](#animações-e-microinterações)
8. [Padrões de Código](#padrões-de-código)
9. [Checklist de Implementação](#checklist-de-implementação)
10. [Referências e Inspirações](#referências-e-inspirações)

---

## Filosofia de Design

### Princípio Central

> **"Uma experiência visual unificada, não um template genérico."**

Este design system não é sobre seguir regras rígidas — é sobre capturar uma **essência**. A página deve parecer uma peça única de design, onde cada elemento foi intencionalmente posicionado.

### Os 6 Pilares

| Pilar | Descrição |
|-------|-----------|
| **Modernidade** | Sensação de 2024/2025. Nada de "site corporativo tradicional" ou templates genéricos. |
| **Coesão** | Tudo pertence ao mesmo universo visual — cores, espaçamentos, formas, animações. |
| **Premium** | Parece caro, bem feito, intencional. Cada pixel tem propósito. |
| **Hierarquia** | O olho do usuário sabe exatamente para onde ir primeiro. |
| **Respiro** | Espaçamentos amplos. O vazio é intencional e elegante. |
| **Movimento** | Microanimações que dão vida sem distrair. |

### Sensação Alvo

Quando um usuário acessa a página, deve sentir:
- "Isso parece profissional"
- "Essa empresa investe em qualidade"
- "O produto/serviço deve ser tão bom quanto o site"

---

## Fundamentos Visuais

### Dark Mode como Base

O dark mode não é apenas uma preferência — é uma **escolha de design**. Ele:
- Cria contraste dramático com elementos de cor
- Transmite sofisticação e modernidade
- Reduz fadiga visual em experiências prolongadas
- Destaca gradientes e efeitos de luz

### Elementos Decorativos

| Elemento | Propósito | Implementação |
|----------|-----------|---------------|
| **Gradient Orbs** | Adicionar profundidade e cor ambiente | Divs com `blur-3xl`, cores vibrantes, `opacity: 20-30%` |
| **Glassmorphism** | Criar camadas e profundidade | `backdrop-blur-xl`, `bg-white/5`, `border-white/10` |
| **Gradientes de Texto** | Destacar palavras-chave | `bg-clip-text`, `text-transparent`, `bg-gradient-to-r` |
| **Sombras Coloridas** | Elevar botões e cards | `shadow-blue-500/25`, não usar `shadow-black` |

### Cantos Arredondados

- **Cards grandes**: `rounded-3xl` (24px)
- **Cards médios**: `rounded-2xl` (16px)
- **Botões**: `rounded-xl` (12px) ou `rounded-full`
- **Inputs**: `rounded-xl` (12px)
- **Badges**: `rounded-full`

> **Regra de Ouro**: Nunca use cantos retos (`rounded-none`). Mesmo o menor elemento deve ter pelo menos `rounded-lg`.

---

## Sistema de Cores

### Paleta Base (Zinc)

```css
/* Fundos */
--bg-primary: #09090b;      /* zinc-950 - Fundo principal */
--bg-secondary: #18181b;    /* zinc-900 - Cards */
--bg-tertiary: #27272a;     /* zinc-800 - Hover states */

/* Texto */
--text-primary: #fafafa;    /* zinc-50 - Títulos */
--text-secondary: #a1a1aa;  /* zinc-400 - Corpo */
--text-muted: #71717a;      /* zinc-500 - Labels secundários */

/* Bordas */
--border-default: #27272a;  /* zinc-800 */
--border-subtle: rgba(255,255,255,0.1);
```

### Cores de Accent (Gradientes)

```css
/* Gradiente Primário (Azul → Violeta) */
--accent-gradient: linear-gradient(to right, #3b82f6, #8b5cf6);
/* blue-500 to violet-500 */

/* Variações */
--accent-blue: #3b82f6;     /* blue-500 */
--accent-violet: #8b5cf6;   /* violet-500 */
--accent-cyan: #06b6d4;     /* cyan-500 (alternativo) */

/* Sombras de Accent */
--shadow-accent: rgba(59, 130, 246, 0.25);
```

### Cores Funcionais

```css
/* Sucesso (WhatsApp, confirmações) */
--success: #22c55e;         /* green-500 */

/* Alertas */
--warning: #eab308;         /* yellow-500 */

/* Estrelas/Ratings */
--rating: #facc15;          /* yellow-400 */
```

### Aplicação em Tailwind

```jsx
// Fundo principal
className="bg-zinc-950"

// Card
className="bg-zinc-900 border-zinc-800"

// Card com glassmorphism
className="bg-zinc-900/80 backdrop-blur-xl border-white/10"

// Texto título
className="text-white" // ou text-zinc-50

// Texto corpo
className="text-zinc-400"

// Gradiente de texto
className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"

// Botão primário
className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500"

// Sombra de botão
className="shadow-lg shadow-blue-500/25"
```

---

## Tipografia

### Hierarquia

| Nível | Tamanho (Desktop) | Tamanho (Mobile) | Peso | Uso |
|-------|-------------------|------------------|------|-----|
| **H1 (Hero)** | `text-7xl` (72px) | `text-5xl` (48px) | `font-bold` | Título principal da página |
| **H2 (Seção)** | `text-5xl` (48px) | `text-3xl` (30px) | `font-bold` | Títulos de seção |
| **H3 (Card)** | `text-3xl` (30px) | `text-2xl` (24px) | `font-bold` | Títulos de cards |
| **H4 (Subtítulo)** | `text-xl` (20px) | `text-lg` (18px) | `font-semibold` | Subtítulos |
| **Body** | `text-base` (16px) | `text-base` | `font-normal` | Texto corrido |
| **Small** | `text-sm` (14px) | `text-sm` | `font-normal` | Labels, captions |

### Estilos Especiais

```jsx
// Título Hero com destaque
<h1 className="text-5xl md:text-7xl font-bold tracking-tight">
  Encontre seu lar na{" "}
  <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
    Zona Leste
  </span>
</h1>

// Subtítulo
<p className="text-xl md:text-2xl text-zinc-300 max-w-3xl mx-auto">
  Sua jornada imobiliária começa aqui...
</p>

// Label de seção (tag)
<span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
  Metodologia Exclusiva
</span>
```

### Fontes Recomendadas

- **Sans-serif modernas**: Inter, Outfit, Geist, Satoshi
- **Fallback seguro**: `font-sans` do Tailwind (system-ui)

---

## Layout Bento Grid

### Conceito

O Bento Grid é inspirado nas caixas de bentō japonesas — compartimentos de tamanhos variados que formam um todo harmonioso. Aplicado ao web design:

- Seções não são apenas "empilhadas"
- Cards de tamanhos diferentes criam ritmo visual
- O layout conta uma história de cima para baixo

### Estrutura Básica

```
┌─────────────────────────────────────────────────────────┐
│                      HERO SECTION                       │
│                    (Full Width, 90vh)                   │
└─────────────────────────────────────────────────────────┘

┌───────────────────────┬─────────────────────────────────┐
│   CARD MENOR (2/5)    │        CARD MAIOR (3/5)         │
│   (Informativo)       │        (Interativo)             │
└───────────────────────┴─────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                 GRID DE CARDS (3 colunas)               │
│   ┌─────────┐   ┌─────────┐   ┌─────────┐              │
│   │  Card 1 │   │  Card 2 │   │  Card 3 │              │
│   └─────────┘   └─────────┘   └─────────┘              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────┬───────────────────────────────┐
│   CARD CONTEÚDO (1/2)   │      CARD CTA (1/2)           │
│   (Depoimentos)         │      (Formulário)             │
└─────────────────────────┴───────────────────────────────┘
```

### Implementação com Tailwind

```jsx
{/* Container principal */}
<section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  
  {/* Grid 5 colunas: 2 + 3 */}
  <div className="grid lg:grid-cols-5 gap-6">
    <div className="lg:col-span-2">Card Menor</div>
    <div className="lg:col-span-3">Card Maior</div>
  </div>

  {/* Grid 3 colunas */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map(item => <Card key={item.id} />)}
  </div>

  {/* Grid 2 colunas */}
  <div className="grid lg:grid-cols-2 gap-6">
    <div>Lado Esquerdo</div>
    <div>Lado Direito</div>
  </div>

</section>
```

### Espaçamentos

```css
/* Entre seções */
py-20         /* 80px vertical */

/* Gaps de grid */
gap-6         /* 24px - padrão */
gap-8         /* 32px - para cards grandes */

/* Padding interno de cards */
p-8           /* 32px - cards grandes */
p-6           /* 24px - cards médios */
p-5           /* 20px - cards pequenos */

/* Container máximo */
max-w-7xl     /* 80rem / 1280px */
```

---

## Componentes

### Card Base

```jsx
<Card className="bg-gradient-to-br from-zinc-900 to-zinc-900/50 border-zinc-800 rounded-3xl overflow-hidden">
  <CardContent className="p-8">
    {/* Conteúdo */}
  </CardContent>
</Card>
```

### Card com Hover

```jsx
<Card className="bg-zinc-900 border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5">
  <div className="overflow-hidden">
    <img className="group-hover:scale-105 transition-transform duration-500" />
  </div>
</Card>
```

### Botão Primário (Gradiente)

```jsx
<Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300">
  <Icon className="mr-2" size={20} />
  Texto do Botão
  <ArrowRight className="ml-2" size={18} />
</Button>
```

### Botão Secundário (Ghost)

```jsx
<Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm rounded-full">
  Saiba Mais
</Button>
```

### Input Estilizado

```jsx
<Input className="bg-zinc-800 border-zinc-700 text-zinc-100 rounded-xl h-12 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20" />
```

### Badge/Tag

```jsx
<Badge className="bg-zinc-900/80 backdrop-blur-sm text-white border-0">
  Categoria
</Badge>

{/* Com cor */}
<span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
  Label
</span>
```

### Ícone em Círculo

```jsx
<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center">
  <Icon className="text-white" size={20} />
</div>
```

---

## Animações e Microinterações

### Biblioteca Recomendada

**Framer Motion** — a melhor opção para React.

```bash
npm install framer-motion
```

### Variantes de Animação

```jsx
import { motion } from "framer-motion";

// Fade In + Slide Up
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

// Stagger Container (para listas)
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1 } 
  }
};

// Scale In
const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5 } 
  }
};
```

### Aplicação

```jsx
{/* Hero com animação de entrada */}
<motion.div 
  initial="hidden"
  animate="visible"
  variants={staggerContainer}
>
  <motion.h1 variants={fadeInUp}>Título</motion.h1>
  <motion.p variants={fadeInUp}>Subtítulo</motion.p>
</motion.div>

{/* Cards com animação no scroll */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: "-100px" }}
  variants={scaleIn}
>
  <Card>...</Card>
</motion.div>

{/* Lista de cards com stagger */}
<motion.div variants={staggerContainer}>
  {items.map(item => (
    <motion.div key={item.id} variants={fadeInUp}>
      <Card />
    </motion.div>
  ))}
</motion.div>
```

### Transições CSS (Sem Biblioteca)

```jsx
// Hover em botões
className="transition-all duration-300 hover:shadow-xl"

// Hover em imagens
className="transition-transform duration-500 group-hover:scale-105"

// Hover em cards
className="transition-all duration-300 hover:border-zinc-700"
```

### Regras de Animação

1. **Sutil > Dramático**: Animações devem ser sentidas, não vistas conscientemente.
2. **Performance**: Use `transform` e `opacity`, nunca anime `width`, `height` ou `top/left`.
3. **Uma vez**: Use `viewport.once: true` para animações de scroll.
4. **Timing**: 300-600ms para a maioria das animações. Hover pode ser 150-200ms.

---

## Padrões de Código

### Estrutura de Arquivo

```tsx
// 1. Imports
import { useState } from "react";
import { motion } from "framer-motion";
import { Icon1, Icon2 } from "lucide-react";

// 2. Animation Variants
const fadeInUp = { ... };

// 3. Data (ou importar de arquivo separado)
const items = [ ... ];

// 4. Types/Interfaces
interface ComponentProps { ... }

// 5. Componente
const Component = () => {
  // State
  const [state, setState] = useState();
  
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Seções */}
    </div>
  );
};

export default Component;
```

### Padrão de Seção

```tsx
{/* ===== NOME DA SEÇÃO ===== */}
<section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={fadeInUp}
  >
    {/* Header da seção */}
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
        Título da Seção
      </h2>
      <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
        Subtítulo descritivo
      </p>
    </div>

    {/* Conteúdo */}
    <div className="grid ...">
      {/* Cards/Itens */}
    </div>
  </motion.div>
</section>
```

---

## Checklist de Implementação

### Antes de Começar

- [ ] Instalar dependências: `framer-motion`, `lucide-react`
- [ ] Configurar Tailwind com cores customizadas (opcional)
- [ ] Ter assets prontos (vídeos, imagens, ícones)

### Estrutura

- [ ] Container principal com `bg-zinc-950 text-zinc-100`
- [ ] Seções com `py-20 max-w-7xl mx-auto`
- [ ] Grid system definido (5-col, 3-col, 2-col)

### Hero

- [ ] Título grande com gradiente de texto
- [ ] Vídeo/imagem de fundo com overlay
- [ ] Gradient orbs decorativos
- [ ] CTAs com estilo premium
- [ ] Animação de entrada

### Cards

- [ ] `rounded-3xl` ou `rounded-2xl`
- [ ] `bg-zinc-900 border-zinc-800`
- [ ] Hover effects (border, shadow, scale)
- [ ] Padding generoso (`p-8`)

### Tipografia

- [ ] Hierarquia clara (H1 > H2 > H3 > Body)
- [ ] Cores corretas (white, zinc-300, zinc-400)
- [ ] Tracking ajustado para títulos

### Animações

- [ ] Framer Motion configurado
- [ ] Animações de entrada no Hero
- [ ] Animações de scroll nas seções
- [ ] Stagger em listas

### Responsividade

- [ ] Mobile-first (`md:` e `lg:` breakpoints)
- [ ] Grid adaptável
- [ ] Tipografia responsiva

### Polish Final

- [ ] Todos os links funcionando
- [ ] Formulários estilizados
- [ ] Ícones consistentes (Lucide)
- [ ] Espaçamentos uniformes

---

## Referências e Inspirações

### Sites para Estudar

| Site | O que observar |
|------|----------------|
| [linear.app](https://linear.app) | Hero impactante, animações suaves, dark mode perfeito |
| [vercel.com](https://vercel.com) | Gradientes, tipografia, layout de features |
| [framer.com](https://framer.com) | Cards interativos, microanimações |
| [raycast.com](https://raycast.com) | Bento grid, glassmorphism, CTAs |
| [stripe.com](https://stripe.com) | Gradientes, profundidade, atenção a detalhes |

### Ferramentas Úteis

- **Cores**: [Tailwind Colors](https://tailwindcss.com/docs/customizing-colors)
- **Gradientes**: [uigradients.com](https://uigradients.com), [gradient.style](https://gradient.style)
- **Shadows**: [shadows.brumm.af](https://shadows.brumm.af)
- **Animações**: [Framer Motion Docs](https://www.framer.com/motion/)
- **Ícones**: [Lucide Icons](https://lucide.dev)

---

## Conclusão

Este design system não é um conjunto de regras — é uma **filosofia visual**. O objetivo é criar experiências que pareçam:

1. **Intencionais** — cada elemento tem um propósito
2. **Coesas** — tudo pertence ao mesmo universo
3. **Premium** — transmitindo qualidade antes de ler uma palavra

Ao aplicar estes princípios, você pode adaptar para qualquer marca ou projeto, mantendo a essência de modernidade e profissionalismo.

---

*Documento criado com base na implementação do projeto Pinheiro Azul HomeV2 — Janeiro 2026*
