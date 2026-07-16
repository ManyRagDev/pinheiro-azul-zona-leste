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

O sistema de cores da Pinheiro Azul é de alto contraste e fundamentado na estética neubrutalista, ideal para interfaces dinâmicas, legibilidade de dados e apelo visual premium.

### Paleta de Cores Oficial (Kit da Marca)

Estas são as cores oficiais da marca Pinheiro Azul, com seus valores HEX e HSL correspondentes para aplicação digital e impressa:

| Amostra | Cor | Nome Técnico | HEX | HSL | Aplicação e Psicologia |
| :--- | :--- | :--- | :--- | :--- | :--- |
| <img src="https://via.placeholder.com/15/06192c/000000?text=+" width="15" height="15" /> | **Azul Escuro** | `brand-navy` | `#06192c` | `210 76% 10%` | **Cor Base / Texto e Contornos.** Traz solidez, confiança e autoridade. Usado em todos os textos principais, cabeçalhos, contornos de cards e botões. |
| <img src="https://via.placeholder.com/15/f4f0c8/000000?text=+" width="15" height="15" /> | **Bege Claro** | `brand-beige` | `#f4f0c8` | `55 65% 87%` | **Cor de Fundo Principal.** Substitui o branco puro como cor de fundo das páginas, criando uma atmosfera retrô neubrutalista confortável e sofisticada. |
| <img src="https://via.placeholder.com/15/28c7ba/000000?text=+" width="15" height="15" /> | **Teal** | `brand-teal` | `#28c7ba` | `175 67% 47%` | **Cor de Acento / Status.** Representa a precisão tecnológica do Índice Pinheiro Azul™ e dados territoriais. Usado em status de sucesso, badges, cards de acento e sombras rígidas. |
| <img src="https://via.placeholder.com/15/fffdf7/000000?text=+" width="15" height="15" /> | **Branco Quente** | `brand-cream` | `#fffdf7` | `45 100% 98%` | **Cor de Suporte / Fundo Interno.** Um creme off-white limpo e aconchegante usado como fundo interno de cards e áreas de conteúdo de destaque. |
| <img src="https://via.placeholder.com/15/e84c4c/000000?text=+" width="15" height="15" /> | **Vermelho Coral** | `brand-coral` | `#e84c4c` | `0 78% 60%` | **Cor de Ação / Alta Prioridade.** Usada para botões de conversão imediata (CTA como "Receber diagnóstico") e alertas críticos. |
| <img src="https://via.placeholder.com/15/e8b84c/000000?text=+" width="15" height="15" /> | **Amarelo Mostarda** | `brand-mustard` | `#e8b84c` | `42 78% 60%` | **Cor de Destaque / Hover.** Usado em botões secundários, badges de categorias e sombras planas projetadas (drop shadow rígida). |

---

## 📐 Estilo de Traços, Bordas e Cantos

A Pinheiro Azul expressa sua dualidade entre a precisão técnica e o acolhimento humano por meio de contornos marcantes e transições geométricas.

### 1. Elementos de Estilo Core

*   **Cantos Arredondados (para Cards de Acento):** Utilizados em cards e blocos específicos (como o bloco Teal) para trazer amabilidade e dinamismo. A escala recomendada é `rounded-xl` (12px) ou `rounded-2xl` (16px).
*   **Painéis Escuros (com Cantos Retos):** Cartões e painéis com fundo em Azul Escuro (#06192c) devem manter cantos retos de 90º (`rounded-none`), gerando uma estética estrutural forte e firme.
*   **Linhas Finas como Separadores:** Todas as divisões, linhas de grade de fundo e bordas de contorno devem utilizar uma espessura fina de `1px` com a cor Azul Escuro (#06192c), garantindo a legibilidade neubrutalista limpa.
*   **Sombras Sólidas Planas (Flat Drop Shadows):** Deslocamento plano sem desfoque (blur-0) de 4px ou 8px usando a cor correspondente de acento ou o próprio Azul Escuro.

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
Destaque ## 🚫 Regras de Integridade da Marca (Do's & Don'ts)

> [!WARNING]
> Para manter o alto impacto visual e evitar a descaracterização do estilo neubrutalista da Pinheiro Azul, siga estritamente estas diretrizes.

### O que NUNCA fazer (Don'ts)
*   ❌ **NUNCA** utilize sombras suaves com desfoque cinza comum (sombras realistas). A marca usa **sombras sólidas projetadas (flat drop shadows)** sem desfoque (blur-0).
*   ❌ **NUNCA** use cantos arredondados em painéis escuros ou layouts estruturais principais. Os **painéis escuros devem manter cantos retos de 90º** para garantir a solidez visual.
*   ❌ **NUNCA** use gradientes de cores nas caixas. O preenchimento deve ser sempre de cores planas (flat design).
*   ❌ **NUNCA** use fontes serifadas ou fontes geométricas leves para os títulos principais. Use sempre a tipografia institucional **Telegraf Bold** em caixa alta.
*   ❌ **NUNCA** use texto em branco puro sobre o fundo Bege Claro (#f4f0c8). O contraste de leitura padrão deve ser garantido pelo Azul Escuro (#06192c).

### O que SEMPRE fazer (Do's)
*   ✅ **SEMPRE** utilize contornos pretos / azul escuro (#06192c) de `1px` ou `2px` para delimitar todos os cards, botões e elementos interativos.
*   ✅ **SEMPRE** utilize a tipografia **Telegraf Bold** para títulos expressivos, garantindo peso visual marcante.
*   ✅ **SEMPRE** aplique cantos arredondados (`rounded-xl` ou `rounded-2xl`) em cards coloridos de acento (como os em Teal) para criar contraste com os painéis escuros de cantos retos.
*   ✅ **SEMPRE** use linhas finas de `1px` em Azul Escuro (#06192c) como separadores limpos de conteúdo.

---

## 💻 Código Pronto & Tokens (CSS/Tailwind)

Utilize os padrões abaixo para manter a consistência da marca Pinheiro Azul nos arquivos de configuração do seu projeto web.

### 1. Declaração de Variáveis Core (`src/index.css`)

Injete as cores oficiais do Kit da Marca e os tokens de sombra plana no seu arquivo global de estilos:

```css
@layer base {
  :root {
    /* Cores Oficiais da Marca - Pinheiro Azul Kit */
    --background: 55 65% 87%;         /* #f4f0c8 - Bege Claro */
    --foreground: 210 76% 10%;        /* #06192c - Azul Escuro */

    --primary: 210 76% 10%;           /* #06192c - Azul Escuro */
    --primary-foreground: 45 100% 98%;/* #fffdf7 - Branco Quente */

    --accent-teal: 175 67% 47%;       /* #28c7ba - Teal */
    --accent-coral: 0 78% 60%;        /* #e84c4c - Vermelho Coral */
    --accent-mustard: 42 78% 60%;      /* #e8b84c - Amarelo Mostarda */
    --brand-cream: 45 100% 98%;       /* #fffdf7 - Branco Quente */
    
    /* Sombras Planas Rígidas (Neubrutalism Flat Shadows) */
    --shadow-brutal-navy: 4px 4px 0px 0px #06192c;
    --shadow-brutal-coral: 6px 6px 0px 0px #e84c4c;
    --shadow-brutal-mustard: 6px 6px 0px 0px #e8b84c;
  }
}
```

---

### 2. Configuração do Arquivo `tailwind.config.ts`

Atualize a extensão de temas do seu Tailwind para suportar as cores do novo Kit da Marca:

```typescript
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#06192c",
        input: "#06192c",
        ring: "#28c7ba",
        background: "#f4f0c8",
        foreground: "#06192c",
        brand: {
          navy: "#06192c",       // Azul Escuro (Texto, Bordas, Painéis)
          beige: "#f4f0c8",      // Bege Claro (Fundo Principal)
          teal: "#28c7ba",       // Teal (Acento, Status, Cards Suaves)
          cream: "#fffdf7",      // Branco Quente (Fundo Interno de Cards)
          coral: "#e84c4c",      // Vermelho Coral (CTA Principal)
          mustard: "#e8b84c",    // Amarelo Mostarda (Destaque, Sombra)
        },
      },
      fontFamily: {
        sans: ["Telegraf", "Inter", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px #06192c",
        "brutal-coral": "6px 6px 0px 0px #e84c4c",
        "brutal-mustard": "6px 6px 0px 0px #e8b84c",
      },
    },
  },
} satisfies Config;
```

---

### 3. Exemplo Prático: Card de Métrica Neubrutalista Real

Componente React + Tailwind de exemplo correspondente às métricas da Mesa de Decisão da Pinheiro Azul:

```tsx
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  note: string;
  tone: 'navy' | 'beige' | 'teal' | 'cream' | 'coral' | 'mustard';
}

export function MetricCard({ label, value, note, tone }: MetricCardProps) {
  const tones = {
    navy: 'bg-[#06192c] text-white rounded-none',
    beige: 'bg-[#f4f0c8] text-[#06192c] rounded-none',
    teal: 'bg-[#28c7ba] text-[#06192c] rounded-2xl', // Cantos arredondados para o Teal
    cream: 'bg-[#fffdf7] text-[#06192c] rounded-none',
    coral: 'bg-[#e84c4c] text-white rounded-none',
    mustard: 'bg-[#e8b84c] text-[#06192c] rounded-none',
  };

  return (
    <article className={`border-2 border-[#06192c] p-5 shadow-brutal transition-transform hover:-translate-y-0.5 ${tones[tone]}`}>
      <p className="text-[10px] font-black uppercase tracking-[0.16em] opacity-80">{label}</p>
      <p className="mt-3 text-2xl font-black leading-none tabular-nums">{value}</p>
      <p className="mt-4 border-t border-[#06192c]/20 pt-3 text-xs leading-relaxed opacity-90">{note}</p>
    </article>
  );
}
```

---

*Manual estruturado e revisado com base no Kit de Marca oficial e no DNA estético Neubrutalista da Pinheiro Azul.*
