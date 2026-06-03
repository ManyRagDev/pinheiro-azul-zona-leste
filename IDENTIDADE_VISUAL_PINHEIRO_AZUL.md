# 📐 Manual de Identidade Visual & Design System — Pinheiro Azul

> Este é o guia definitivo de identidade visual e design system para a **Pinheiro Azul**. Este documento consolida a fusão estratégica da marca — que une a profunda consultoria humanizada da **Metodologia P.A.Z.©** à alta performance analítica de dados do **Índice Pinheiro Azul™** — em diretrizes visuais claras, reprodutíveis e de altíssimo nível estético.
>
> Desenvolvido para designers, desenvolvedores front-end, copywriters e parceiros de marketing garantirem que cada ponto de contato digital e impresso transmita o posicionamento **premium, confiável e inovador** na Zona Leste de São Paulo.

---

## 📖 Sumário

1. [🎨 Conceito & Filosofia da Marca](#-conceito--filosofia-da-marca)
2. [🌈 Sistema de Cores (HEX & HSL)](#-sistema-de-cores-hex--hsl)
3. [✍️ Tipografia & Hierarquia](#%EF%B8%8F-tipografia--hierarquia)
4. [📐 Estilo de Traços, Bordas e Cantos](#-estilo-de-tracos-bordas-e-cantos)
5. [📱 Estrutura Bento Grid & Grid System](#-estrutura-bento-grid--grid-system)
6. [✨ Efeitos Visuais & Elementos Decorativos](#-efeitos-visuais--elementos-decorativos)
7. [🚫 Regras de Integridade da Marca (Do's & Don'ts)](#-regras-de-integridade-da-marca-dos--donts)
8. [💻 Código Pronto & Tokens (CSS/Tailwind)](#-codigo-pronto--tokens-csstailwind)

---

## 🎯 Conceito & Filosofia da Marca

A **Pinheiro Azul** não é uma imobiliária tradicional que apenas lista imóveis. Ela opera como uma boutique de consultoria patrimonial de alta tecnologia voltada à transformação e verticalização da Zona Leste de São Paulo (Tatuapé, Mooca, Carrão, Penha, Vila Matilde, Itaquera).

Graficamente, a marca se expressa através de **três sentimentos-alvo**:

*   **Solidez e Confiança (Consultoria):** Transmitida através de tons azuis profundos (navy), tipografia limpa, e grid estruturado.
*   **Tecnologia e Performance (Dados):** Expressa com azuis elétricos luminosos, elementos translúcidos (glassmorphism), gradientes sutis e gráficos modernos.
*   **Cuidado Humano (Zelo):** Refletida no amplo uso de espaços em branco (respiro), layouts acolhedores, microinterações fluidas e atenção cirúrgica aos detalhes.

---

## 🌈 Sistema de Cores (HEX & HSL)

O sistema de cores da Pinheiro Azul está dividido em dois universos perfeitamente harmonizados: a **Paleta Institucional Clássica (Tema Claro)**, focada em seriedade, clareza e elegância; e a **Paleta Premium Digital (Tema Escuro Bento)**, voltada para landing pages de alta conversão, sensação futurista, profundidade e apelo visual imediato.

### 1. Paleta de Cores Core (Cromática)

Estas são as cores de marca que dão personalidade à Pinheiro Azul. Os códigos foram convertidos com precisão matemática para HEX, baseados na implementação HSL do ecossistema técnico.

| Cor | Nome Técnico | HEX | HSL | Aplicação e Psicologia |
| :--- | :--- | :--- | :--- | :--- |
| <img src="https://via.placeholder.com/15/003366/000000?text=+" width="15" height="15" /> | **Azul Pinheiro Profundo** | `#003366` | `210 100% 20%` | **Cor Primária da Marca.** Representa a robustez, segurança jurídica e autoridade patrimonial. Usada em títulos, cabeçalhos, botões principais de tema claro e rodapés institucionais. |
| <img src="https://via.placeholder.com/15/1f8fff/000000?text=+" width="15" height="15" /> | **Azul Celeste Elétrico** | `#1f8fff` | `210 100% 56%` | **Cor de Acento.** Representa tecnologia, o Índice Pinheiro Azul™ e dados de valorização. Usada em links, ícones, badges, botões secundários, bordas ativas e focos interativos. |
| <img src="https://via.placeholder.com/15/f5f5f5/000000?text=+" width="15" height="15" /> | **Branco Gelo Premium** | `#f5f5f5` | `0 0% 96%` | **Cor de Fundo / Suporte.** Traz o respiro, minimalismo e sofisticação. Usada como fundo de páginas claras, separadores sutis e fundos de cards institucionais. |
| <img src="https://via.placeholder.com/15/2a333c/000000?text=+" width="15" height="15" /> | **Grafite Mineral (Text)** | `#2a333c` | `210 17% 20%` | **Cor de Texto Principal.** Um cinza escuro com fundo azulado que reduz a fadiga ocular em comparação ao preto puro. Usado para parágrafos longos, labels e textos auxiliares claros. |

---

### 2. Paleta Digital de Alta Performance (Bento Dark Mode)

Para as landing pages de alta conversão baseadas no estilo Bento Grid e com forte apelo visual SaaS, a paleta de suporte de tom escuro deve seguir a tabela abaixo, inspirada nas melhores práticas de design moderno (Linear, Vercel).

| Cor | Nome Técnico | HEX | HSL | Aplicação e Função |
| :--- | :--- | :--- | :--- | :--- |
| <img src="https://via.placeholder.com/15/020817/000000?text=+" width="15" height="15" /> | **Fundo Espacial (Dark)** | `#020817` | `222 84% 5%` | **Fundo Absoluto (Dark Mode).** Um azul ultra escuro quase preto que traz mistério, contraste e valoriza os elementos luminosos. |
| <img src="https://via.placeholder.com/15/09090b/000000?text=+" width="15" height="15" /> | **Fundo Bento Primário** | `#09090b` | `240 6% 4%` | Fundo para o corpo da página e Bento Grids secundários. |
| <img src="https://via.placeholder.com/15/18181b/000000?text=+" width="15" height="15" /> | **Fundo Bento Card** | `#18181b` | `240 6% 10%` | **Fundo de Cartões Bento.** Fundo interno de cada compartimento ou caixa, criando a ilusão de relevo e separação. |
| <img src="https://via.placeholder.com/15/27272a/000000?text=+" width="15" height="15" /> | **Fundo Hover / Separador** | `#27272a` | `240 5% 16%` | Usado para divisores, bordas de cards escuros e estados de hover/foco. |
| <img src="https://via.placeholder.com/15/fafafa/000000?text=+" width="15" height="15" /> | **Texto Título (Dark)** | `#fafafa` | `0 0% 98%` | Usado para contrastar títulos contra o fundo escuro. |
| <img src="https://via.placeholder.com/15/a1a1aa/000000?text=+" width="15" height="15" /> | **Texto Corpo (Dark)** | `#a1a1aa` | `240 5% 65%` | Usado para parágrafos longos em fundo escuro. Nunca use branco puro para não ofuscar o leitor. |

---

### 3. Cores de Suporte e Alertas

| Cor | Uso | HEX | HSL |
| :--- | :--- | :--- | :--- |
| <img src="https://via.placeholder.com/15/22c55e/000000?text=+" width="15" height="15" /> | **Sucesso / WhatsApp** | `#22c55e` | `142 76% 45%` | Confirmações, botões de contato imediato via WhatsApp e leads qualificados. |
| <img src="https://via.placeholder.com/15/eab308/000000?text=+" width="15" height="15" /> | **Alerta Moderado** | `#eab308` | `43 96% 48%` | Avisos importantes e dados de transição financeira. |
| <img src="https://via.placeholder.com/15/facc15/000000?text=+" width="15" height="15" /> | **Ratings / Estrelas** | `#facc15` | `48 96% 53%` | Avaliações de clientes e pontuações máximas de depoimentos. |

---

## ✍️ Tipografia & Hierarquia

A tipografia da Pinheiro Azul deve transmitir **precisão técnica e elegância contemporânea**. A combinação de fontes é baseada em tipos geométricos sans-serif limpos que garantem excelente legibilidade em telas de alta densidade de pixels.

### Fontes Recomendadas
1.  **Outfit** ou **Geist**: Para grandes títulos marcantes, headlines de Hero e dados numéricos marcantes (como os valores do Índice Pinheiro Azul™).
2.  **Inter** ou **Satoshi**: Para corpo de texto, labels, botões e formulários de diagnóstico.
3.  **Sistema (Fallback):** `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`.

### Hierarquia de Tamanhos (Responsiva)

Para manter a consistência de leitura de cima a baixo, respeite sempre a seguinte tabela estrutural:

| Nível | Desktop (Tamanho / Line-Height) | Mobile (Tamanho / Line-Height) | Peso (Weight) | Casos de Uso |
| :--- | :--- | :--- | :--- | :--- |
| **H1 (Hero)** | `text-7xl` (72px / 1.1) | `text-5xl` (48px / 1.15) | Bold (700) | Headline principal da Home e Landing Pages. |
| **H2 (Seção)** | `text-5xl` (48px / 1.2) | `text-3xl` (30px / 1.25) | Bold (700) | Títulos das seções de conversão e metodologia. |
| **H3 (Card)** | `text-3xl` (30px / 1.3) | `text-2xl` (24px / 1.35) | Bold (700) | Títulos internos de Cards grandes e Bento Grids. |
| **H4 (Subtítulo)**| `text-xl` (20px / 1.4) | `text-lg` (18px / 1.4) | Semibold (600) | Subtítulos de apoio abaixo de H1/H2 e cabeçalhos menores. |
| **Body (Corpo)** | `text-base` (16px / 1.6) | `text-base` (16px / 1.6) | Normal (400) | Texto corrido de parágrafos. Máximo de 4 linhas por bloco. |
| **Small (Legenda)**| `text-sm` (14px / 1.5) | `text-sm` (14px / 1.5) | Normal (400) | Rótulos de formulário, tags, rodapés e metadados. |

### Espaçamento de Letras (Letter Spacing)
*   Para títulos (**H1, H2, H3**): Use `tracking-tight` (redução sutil de espaçamento, cerca de `-0.02em` a `-0.05em`) para criar um bloco de texto coeso e moderno.
*   Para tags e rótulos pequenos em maiúsculas: Use `tracking-wider` ou `tracking-widest` (cerca de `0.05em` a `0.1em`) para aumentar o respiro de elementos técnicos.

---

## 📐 Estilo de Traços, Bordas e Cantos

A Pinheiro Azul expressa o "Zelo" e a "Tecnologia" através da curvatura perfeita dos seus elementos e na sutileza dos contornos que delimitam o espaço.

### 1. A Escala de Cantos Arredondados (Border Radius)

> [!IMPORTANT]
> **REGRA DE OURO:** É expressamente proibido o uso de cantos retos (`rounded-none`) ou pontas agressivas. Até mesmo o menor elemento (como um badge ou input) deve possuir curvatura suave para transmitir segurança e amabilidade.

```
┌──────────────────────────────────────────────────────────┐
│ rounded-3xl (24px) - Cards de Grandes Seções / Bento     │
│  ┌────────────────────────────────────────────────────┐  │
│  │ rounded-2xl (16px) - Cartões Médios / Imagens       │  │
│  │  ┌──────────────────────────────────────────────┐  │  │
│  │  │ rounded-xl (12px) - Inputs / Badges          │  │  │
│  │  └──────────────────────────────────────────────┘  │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

*   **`rounded-3xl` (24px):** Usado para contornos de seções Bento Grid e cartões principais que delimitam os grandes temas do site.
*   **`rounded-2xl` (16px):** Usado para cartões médios de listagem de cenários de vida, imagens principais e blocos de depoimentos.
*   **`rounded-xl` (12px):** Usado para campos de entrada de texto (inputs) de formulários, caixas de dropdowns e botões de tamanho médio.
*   **`rounded-full` (9999px):** Reservado para os botões de ação (CTAs) de formato pílula, avatares e pequenas tags indicadoras (como categorias do blog).

---

### 2. Linhas, Bordas e Separadores (Strokes)

*   **Espessura de Linha:** Mantenha os traços preferencialmente em `1px`. Traços de `2px` ou mais são permitidos apenas para indicação de foco ativo do teclado/cursor.
*   **Contorno no Tema Claro:** Use `border-zinc-200` (`#e4e4e7`) ou `border-zinc-300` para desenhar linhas de divisão sutis e grids limpos.
*   **Contorno no Tema Bento Escuro:** Use `border-zinc-800` (`#27272a`) para a maioria das divisões. Para cartões premium translúcidos, use bordas com opacidade: `border-white/10` (branco com 10% de opacidade) ou `border-white/5` sobrepostos a um efeito de desfoque de fundo.
*   **Bordas de Acento:** Ao destacar um card com foco ativo ou selecionar uma resposta de diagnóstico, utilize uma borda de `1px` ou `2px` com o **Azul Celeste Elétrico** (`#1f8fff`).

---

## 📱 Estrutura Bento Grid & Grid System

O Bento Grid organiza a informação de maneira assimétrica e perfeitamente equilibrada, simulando divisórias limpas. Ele evita que o usuário sofra fadiga de scroll ao agrupar múltiplos blocos de dados interativos de tamanhos diferentes.

### Gráficos de Proporções do Grid (Desktop)

A estrutura visual deve seguir a alternância de ritmo em divisões de colunas:

```
PROPORÇÃO 2/5 vs 3/5:
┌──────────────────────────────┬─────────────────────────────────────────────────┐
│     CARD MENOR (2/5)         │               CARD MAIOR (3/5)                  │
│   - Lista de Indicadores     │   - Simulador de Cálculo Interativo / Gráfico   │
│   - Rótulos Estáticos        │   - Painel Dinâmico de Diagnóstico              │
└──────────────────────────────┴─────────────────────────────────────────────────┘

PROPORÇÃO 3 COLUNAS SIMÉTRICAS:
┌──────────────────────┬──────────────────────┬──────────────────────┐
│       CARD 1         │       CARD 2         │       CARD 3         │
│   - Depoimento       │   - Depoimento       │   - Depoimento       │
└──────────────────────┴──────────────────────┴──────────────────────┘
```

### Regras de Espaçamento e Respiro (Padding & Margin)

*   **Espaçamento entre Grandes Seções:** `py-20` (80px vertical) ou `py-24` (96px) para dar amplitude visual ao design.
*   **Distância entre Cartões (Grid Gaps):** Sempre `gap-6` (24px) para cards de informações gerais e `gap-8` (32px) para cards estruturais amplos.
*   **Padding Interno de Cartões (Bento Box Padding):**
    *   Cards Grandes/Principais: `p-8` (32px) de margem interna.
    *   Cards Médios/Formulários: `p-6` (24px) de margem interna.
    *   Badges/Itens pequenos: `px-4 py-2` de margem interna.
*   **Largura Máxima do Layout:** Todo o site deve estar contido em um invólucro responsivo limitado a `max-w-7xl` (1280px) centralizado com `mx-auto` para manter consistência em telas widescreen.

---

## ✨ Efeitos Visuais & Elementos Decorativos

Para conferir um visual extremamente **premium, moderno e fluido**, a identidade visual da Pinheiro Azul utiliza recursos visuais sofisticados de iluminação virtual e profundidade.

### 1. Glassmorphism (Efeito Vidro)
Utilizado para menus flutuantes, rodapés interativos e modais de diagnóstico. Crie um contorno branco translúcido que deixa passar as cores de fundo borradas, dando a sensação de uma folha de vidro fosco flutuante.
*   **Classes recomendadas:** `bg-zinc-900/80 backdrop-blur-xl border border-white/10`.

### 2. Gradient Orbs (Bolas de Fundo)
Crie profundidade no fundo escuro adicionando "orbes" de cores borradas nas seções principais de conversão para simular luz ambiente difusa.
*   **Configuração:** Divs posicionadas de forma absoluta com `bg-blue-600/10` ou `bg-violet-600/10`, com bordas arredondadas máximas e efeito blur extremo (`blur-3xl`).

### 3. Gradientes de Texto (Text Gradients)
Destaque palavras-chave específicas em headlines para direcionar a leitura e quebrar a sobriedade.
*   **Gradiente Claro:** Do **Azul Pinheiro Profundo** (`#003366`) para o **Azul Celeste Elétrico** (`#1f8fff`).
*   **Gradiente Escuro:** Do **Azul Celeste Elétrico** (`#1f8fff`) para o Violeta Premium (`#8b5cf6`).
*   **Classes recomendadas:** `bg-gradient-to-r from-brand-accent to-violet-500 bg-clip-text text-transparent`.

### 4. Sombras Elegantes (Shadow Depths)
*   **Sombra de Acento (Botões e Cards Selecionados):** `--shadow-elegant` — uma sombra suave colorida utilizando o tom azul com opacidade controlada (`shadow-blue-500/20`), dando leveza e sustentação ao botão ativo. Nunca use sombras pretas sólidas.
*   **Sombra de Cartão Comum:** `--shadow-card` — sombra sutil cinza/azulada com 8% de opacidade (`shadow-brand-primary/8`).

---

## 🚫 Regras de Integridade da Marca (Do's & Don'ts)

> [!WARNING]
> Para garantir que a essência visual não seja diluída ou adulterada por aplicações incorretas, siga rigidamente as proibições e recomendações a seguir.

### O que NUNCA fazer (Don'ts)
*   ❌ **NUNCA** utilize a paleta de cinzas padrão do Tailwind (`bg-gray-900` ou `bg-slate-900`). **Use a família Zinc** (`zinc-950`, `zinc-900`) para o cinza-escuro e a base de azul profundo da marca para fundos neutros.
*   ❌ **NUNCA** deixe cantos retos (`rounded-none`) em botões, campos de digitação ou bordas de seções.
*   ❌ **NUNCA** misture mais de três fontes diferentes. Atenha-se à combinação de *Outfit* (títulos) + *Inter* (corpo).
*   ❌ **NUNCA** utilize sombras pretas puras (`shadow-black`) de alta intensidade sobre fundo escuro. Utilize sombras difusas com tinturas azuis ou violetas para simular emanação real de luz.
*   ❌ **NUNCA** use texto em branco puro (`#ffffff`) para blocos de texto muito extensos. Dê preferência ao cinza mineral suave (`#a1a1aa` ou `text-zinc-400`) para evitar ofuscamento.
*   ❌ **NUNCA** coloque formulários gigantescos com mais de 3 campos logo na primeira dobra do site. Reduza a fricção inicial direcionando para a página interna de `/diagnostico`.

### O que SEMPRE fazer (Do's)
*   ✅ **SEMPRE** acompanhe botões de Call To Action (CTA) por ícones indicativos elegantes (como setas indicando avanço `ArrowRight` ou ícone de pesquisa `Search`).
*   ✅ **SEMPRE** respeite a regra de no máximo 4 linhas de texto por parágrafo no corpo das páginas para incentivar a leitura.
*   ✅ **SEMPRE** ative micro-interações de transição suave em todos os estados de hover (`duration-300` ou `duration-500`).
*   ✅ **SEMPRE** assegure-se de que o contraste das cores atende às diretrizes de acessibilidade WCAG (mínimo de `4.5:1` para texto comum).

---

## 💻 Código Pronto & Tokens (CSS/Tailwind)

Para facilitar a replicação exata desta identidade visual em qualquer projeto web moderno, utilize os arquivos de configuração abaixo.

### 1. Declaração de Variáveis Core (`src/index.css`)

Substitua ou adicione estas variáveis de root no seu arquivo global de estilos para injetar a essência da Pinheiro Azul:

```css
@layer base {
  :root {
    /* Pinheiro Azul Cores Oficiais - Light Theme */
    --background: 0 0% 100%;
    --foreground: 210 17% 20%;      /* #2a333c */

    --primary: 210 100% 20%;        /* #003366 - Azul Pinheiro Profundo */
    --primary-foreground: 0 0% 100%;

    --accent: 210 100% 56%;         /* #1f8fff - Azul Celeste Elétrico */
    --accent-foreground: 0 0% 100%;

    --brand-primary: 210 100% 20%;
    --brand-accent: 210 100% 56%;
    --brand-light: 0 0% 96%;        /* #f5f5f5 */
    --brand-text: 210 17% 20%;      /* #2a333c */
    
    /* Gradientes */
    --gradient-hero: linear-gradient(135deg, hsl(var(--brand-primary)), hsl(var(--brand-accent)));
    --gradient-subtle: linear-gradient(180deg, hsl(var(--background)), hsl(var(--brand-light)));
    
    /* Sombras Elegantes com Matiz Azul */
    --shadow-elegant: 0 10px 30px -10px hsl(var(--brand-primary) / 0.1);
    --shadow-card: 0 4px 20px -4px hsl(var(--brand-primary) / 0.08);
    
    /* Transição Padrão Suave */
    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --radius: 1.5rem;               /* 24px padrão */
  }

  .dark {
    /* Tema Premium Dark (Bento Style) */
    --background: 222.2 84% 4.9%;   /* #020817 - Fundo Espacial */
    --foreground: 210 40% 98%;      /* Off-White */

    --card: 240 6% 10%;             /* #18181b - Fundo Bento Card */
    --card-foreground: 210 40% 98%;

    --border: 240 5% 16%;           /* #27272a - Divisor Bento */
    --input: 240 5% 16%;
    --ring: 210 100% 56%;           /* #1f8fff */
  }
}
```

---

### 2. Configuração do Arquivo `tailwind.config.ts`

Garanta que o mapeamento de tokens de cor do Tailwind esteja estendido para aceitar a nomenclatura semântica da marca:

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          primary: "hsl(var(--brand-primary))", // #003366
          accent: "hsl(var(--brand-accent))",   // #1f8fff
          light: "hsl(var(--brand-light))",     // #f5f5f5
          text: "hsl(var(--brand-text))",       // #2a333c
        },
      },
      borderRadius: {
        '3xl': '1.5rem',  // 24px
        '2xl': '1rem',    // 16px
        'xl': '0.75rem',  // 12px
      },
    },
  },
} satisfies Config;
```

---

### 3. Exemplo Prático: Cartão Bento Interativo Premium

Utilize este componente estrutural React + Tailwind para criar caixas Bento perfeitamente alinhadas com a linguagem visual de alta performance:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';

export function BentoCardInvestidor() {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative group overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-8 hover:border-brand-accent/50 transition-colors shadow-2xl"
    >
      {/* Luz ambiente de fundo (Gradient Orb interno) */}
      <div className="absolute -right-20 -top-20 w-48 h-48 bg-brand-accent/10 rounded-full blur-3xl group-hover:bg-brand-accent/20 transition-all duration-500" />
      
      {/* Cabeçalho do Card */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
          <TrendingUp size={24} />
        </div>
        <span className="text-xs font-semibold text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-3 py-1 rounded-full">
          Índice 8.7
        </span>
      </div>

      {/* Conteúdo */}
      <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-brand-accent transition-colors">
        Tese de Investimento Tatuapé
      </h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
        O bairro com maior liquidez e apreciação projetada da Zona Leste para os próximos 12 meses. Compre na curva de aceleração patrimonial.
      </p>

      {/* Ação / Link */}
      <div className="flex items-center text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
        <span>Explorar Dados Territorial</span>
        <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}
```

---

*Manual estruturado e revisado com base no DNA técnico e estético oficial da Pinheiro Azul imobiliária digital. Em caso de dúvidas sobre aplicações em novos canais, consulte o comitê de marca do projeto.*
