# Design System — (dot)connect

Documento de referência criado a partir da estrutura, conteúdo e linguagem da homepage de [dotconnect.vc](https://dotconnect.vc/), complementado por uma reconstrução visual aproximada dos padrões de UI e branding observáveis no site.[page:1]

## Visão geral

O site se apresenta como uma empresa de venture creation com linguagem direta, técnica e anti-corporativa, usando navegação simples, seções numeradas e CTAs curtos como `more`, `talk` e `ask`.[page:1] A identidade verbal sugere um sistema visual minimalista, com contraste forte entre mensagens objetivas, blocos editoriais amplos e elementos de destaque para oferta, time, histórias e contato.[page:1]

## Princípios visuais

Os padrões mais claros do site apontam para um design system com estas características:[page:1]

- Tipografia display em headlines longas e assertivas.[page:1]
- Navegação em lowercase com tom editorial e direto.[page:1]
- Estrutura modular por seções numeradas, como `( 02 )`, `( 03 )` e `( 07 )`.[page:1]
- CTAs curtos e repetitivos, reforçando ritmo e consistência verbal.[page:1]
- Alternância entre blocos de conteúdo institucional, oferta, cases e contato.[page:1]

## Paleta de cores aproximada

Como o conteúdo extraído da página não expõe tokens CSS diretamente, a paleta abaixo é uma aproximação fiel ao estilo visual previamente observado no site e coerente com sua linguagem de marca.[page:1]

| Token | Hex | Uso sugerido |
|---|---|---|
| `--color-bg-primary` | `#F5F1EB` | Fundo principal claro |
| `--color-bg-secondary` | `#E8E1D8` | Cards e blocos suaves |
| `--color-text-primary` | `#171717` | Texto principal |
| `--color-text-muted` | `#6D665F` | Texto secundário |
| `--color-accent` | `#E85A2A` | CTA, ícones e destaque |
| `--color-accent-hover` | `#D94C1D` | Hover do CTA |
| `--color-dark` | `#1E2A2B` | Rodapé e áreas de contraste |
| `--color-dark-soft` | `#243536` | Superfícies dark secundárias |
| `--color-white` | `#FFFFFF` | Texto sobre fundo escuro |

## Tipografia

A arquitetura textual do site indica uma fonte sans-serif contemporânea, provavelmente grotesca ou neo-grotesca, com peso forte nos títulos e peso regular no corpo.[page:1] O uso de frases como “We are an engineering-driven company that effectively delivers deep tech products.” mostra preferência por headlines grandes, quebras deliberadas de linha e leitura escaneável.[page:1]

### Escala tipográfica sugerida

| Token | Tamanho | Peso | Uso |
|---|---|---|---|
| `--text-display` | `clamp(56px, 8vw, 108px)` | 700 | Hero principal |
| `--text-h1` | `clamp(36px, 5vw, 72px)` | 700 | Headline de seção |
| `--text-h2` | `clamp(24px, 3vw, 40px)` | 600 | Subtítulo de bloco |
| `--text-h3` | `20px` | 600 | Títulos de cards |
| `--text-body` | `16px` | 400 | Parágrafo padrão |
| `--text-small` | `14px` | 400 | Navegação e labels |
| `--text-micro` | `12px` | 500 | Índices, suporte, metadados |

### Regras tipográficas

- Preferência por lowercase em navegação, links e botões, como `about`, `offer`, `stories` e `let's connect`.[page:1]
- Headlines com line-height compacto para reforçar presença editorial.[page:1]
- Texto de apoio com largura confortável e contraste moderado.[page:1]
- Ênfase em frases curtas, duras e memoráveis, como “When we say we’ll deliver something, we deliver it.”.[page:1]

## Grid e espaçamento

A homepage é organizada como uma sequência de faixas verticais amplas, cada uma com título, índice numérico, texto de apoio e CTA, o que sugere um container central largo e espaçamentos generosos entre seções.[page:1]

### Tokens sugeridos

| Token | Valor | Uso |
|---|---|---|
| `--container-max` | `1280px` | Largura máxima |
| `--space-2xs` | `4px` | Microajustes |
| `--space-xs` | `8px` | Espaço mínimo |
| `--space-sm` | `16px` | Elementos internos |
| `--space-md` | `24px` | Gaps padrão |
| `--space-lg` | `40px` | Padding de bloco |
| `--space-xl` | `64px` | Separação de grupos |
| `--space-2xl` | `96px` | Espaço entre seções |
| `--space-3xl` | `140px` | Hero e transições amplas |

## Bordas e forma

O sistema parece favorecer formas simples com contraste entre superfícies orgânicas e blocos bem resolvidos, especialmente em CTAs e cards destacados.[page:1]

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | `10px` | Elementos pequenos |
| `--radius-md` | `16px` | Cards padrão |
| `--radius-lg` | `24px` | Cards de destaque |
| `--radius-pill` | `999px` | Botões principais |
| `--radius-full` | `50%` | Ícones circulares |

## Componentes

### Header

O header contém links principais para `about`, `offer`, `brainpower`, `stories`, `team` e `philosophy`, além de um CTA de contato, o que define uma navegação enxuta e hierarquizada.[page:1] A recomendação é usar layout em três zonas: marca à esquerda, navegação ao centro e CTA à direita.[page:1]

### Hero

O hero comunica a proposta da empresa com uma headline extensa em múltiplas linhas e um texto de apoio logo abaixo.[page:1] O padrão ideal é centralizar a mensagem principal, limitar a largura do texto e aplicar um CTA secundário com rótulo curto como `more`.[page:1]

### Section label

Cada seção usa um nome como `offer`, `brainpower`, `stories`, `team`, `philosophy` e `let's connect`, acompanhado por um índice numérico entre parênteses.[page:1] Isso funciona como componente reutilizável de navegação editorial e pode ser estruturado como label de seção + número + divisor visual.[page:1]

### Cards de oferta

Na seção `offer`, os dois blocos principais são `corporates` e `investors`, cada um com uma frase curta descrevendo valor de negócio.[page:1] Isso sugere cards grandes com título forte, breve descrição e um affordance visual claro para clique.[page:1]

### Lista de capacidades

Na seção `brainpower`, o site expõe capacidades como `innovation as a service`, `investment advisory`, `legal engineering`, `asset tokenization`, `automations agents`, `data driven cities`, `artificial intelligence`, `blockchain` e `sensors`.[page:1] Esse padrão pode virar uma lista horizontal responsiva ou uma grade de pills e service tags.[page:1]

### Carrossel de histórias

A seção `stories` apresenta itens como `skillchain`, `cityscanner`, `spatial analitycs` e `urban pulse`, além de controles como `Next slide` e `Previous slide`, o que indica um componente de slider ou carousel.[page:1] O design system deve prever cards de case com título, descrição breve e estado `coming soon…`.[page:1]

### Métricas de time

A seção `team` mistura narrativa institucional com números como `100+ operators`, `1 network` e `30+ core team`.[page:1] Isso aponta para um componente de stat block com número grande, label curto e alinhamento em grid.[page:1]

### Blocos de contato

A seção final divide o contato entre `talk to ( human )` e `ask our ( AI )`, com microcopy diferente para cada rota.[page:1] O design system deve prever dois cards paralelos de CTA com mesma estrutura visual e tom verbal próprio.[page:1]

## Tom de voz

O site usa linguagem direta, informal e confiante, com frases como “founder’s zero tolerance for bullsh*t” e “No fluff, just brilliance.”.[page:1] A voz da marca mistura competência técnica, anti-burocracia e senso de urgência, então o sistema de conteúdo deve privilegiar textos curtos, assertivos e sem jargão inflado.[page:1]

## Motion e interação

Mesmo sem acesso ao CSS ou JavaScript completos nesta extração, a estrutura do conteúdo sugere experiência fortemente orientada por transições entre seções, hover em cards e navegação de slider.[page:1] O mais coerente é adotar animações discretas, com fade, translate leve e feedback claro em links, CTAs e controles de navegação.[page:1]

## Tokens CSS sugeridos

```css
:root {
  --color-bg-primary: #F5F1EB;
  --color-bg-secondary: #E8E1D8;
  --color-text-primary: #171717;
  --color-text-muted: #6D665F;
  --color-accent: #E85A2A;
  --color-accent-hover: #D94C1D;
  --color-dark: #1E2A2B;
  --color-dark-soft: #243536;
  --color-white: #FFFFFF;

  --font-family-base: "Inter", "Neue Montreal", "Söhne", sans-serif;
  --text-display: clamp(56px, 8vw, 108px);
  --text-h1: clamp(36px, 5vw, 72px);
  --text-h2: clamp(24px, 3vw, 40px);
  --text-h3: 20px;
  --text-body: 16px;
  --text-small: 14px;
  --text-micro: 12px;

  --leading-tight: 1.02;
  --leading-heading: 1.08;
  --leading-body: 1.55;
  --tracking-tight: -0.03em;

  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 64px;
  --space-2xl: 96px;
  --space-3xl: 140px;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;
  --radius-full: 50%;

  --container-max: 1280px;
  --container-padding: 40px;

  --shadow-soft: 0 10px 30px rgba(0, 0, 0, 0.06);
  --transition-fast: 160ms ease;
  --transition-base: 240ms ease;
}
```

## Exemplo de componentes base

```css
.button-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-white);
  font-size: var(--text-small);
  line-height: 1;
  text-transform: lowercase;
  text-decoration: none;
  transition: transform var(--transition-fast), background var(--transition-fast);
}

.section-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  font-size: var(--text-small);
  text-transform: lowercase;
}

.case-card {
  padding: var(--space-lg);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-soft);
}
```

## Observações de fidelidade

Este documento reconstrói o design system com alta proximidade conceitual, mas não substitui uma inspeção direta do CSS, do código-fonte e dos assets do site.[page:1] Para chegar ainda mais perto do original, o próximo passo ideal é capturar estilos computados, tipografias carregadas, variáveis CSS, spacing real e estados interativos diretamente do front-end em execução.[page:1]
