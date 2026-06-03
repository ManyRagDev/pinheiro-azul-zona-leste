# 📐 Identidade Visual & Design System — Inteligência Imobiliária

Este documento estabelece a linguagem visual e as diretrizes estéticas exclusivas para a landing page do produto **Inteligência Imobiliária** (`inteligenciaimobiliaria.online`), operando sob a rota `/inteligencia`. A marca une precisão analítica de dados ao zelo protetor para quem está comprando o primeiro imóvel ou fazendo um grande investimento patrimonial.

---

## 🎨 DNA da Marca & Tom

*   **Conceito Central:** *"Saiba tudo sobre o imóvel que você quer comprar. Cada número importa."*
*   **Nicho:** Análise financeira, precificação de mercado regional e análise de comprometimento de renda para compradores finais de imóveis (pessoas físicas).
*   **Tom de voz:** Altamente analítico, cirúrgico e transparente. Foco em empoderamento através de dados precisos. Mostra que pequenos detalhes numéricos negligenciados no início da compra se traduzem em perdas de dezenas de milhares de Reais ao longo dos anos.
*   **Estilo Visual Global:** **Glass-Cyber-Minimalism (Dark Tech Mode)**. UIs limpas e futuristas baseadas em Bento Grids, com exibição abundante de micro-indicadores, telemetrias de dados, contornos cyan de laser scanner e cartões translúcidos sobrepostos a um fundo escuro espacial profundo.

---

## 🌈 Sistema de Cores (HEX & HSL)

Para evitar UIs genéricas de SaaS (templates roxos e flat de botão redondo comum), a paleta de cores é inspirada em interfaces de auditoria técnica de alta tecnologia:

| Cor | Nome Técnico | HEX | HSL | Função no Sistema |
| :--- | :--- | :--- | :--- | :--- |
| 🌌 | **Deep Space (Fundo)** | `#030712` | `224 71% 4%` | **Fundo Geral.** Azul-escuro espacial profundo, quase preto. Traz profundidade absoluta e valoriza elementos iluminados. |
| 🗃️ | **Audit Card (Bento)** | `#0B1329` | `223 58% 10%` | **Fundo dos Cards Bento.** Tom azulado técnico que se destaca do fundo geral com contraste elegante. |
| ⚡ | **Laser Cyan (Acento)** | `#00F2FE` | `182 100% 50%` | **Cor de Acento Principal.** Simboliza o scan de dados e a precisão do diagnóstico. Usada em bordas ativas, ícones de destaque e feixes de scanner. |
| 🟢 | **Emerald Viability (Success)** | `#10B981` | `162 76% 41%` | **Acento Secundário.** Representa viabilidade financeira verde e o gatilho de conversão para o WhatsApp. |
| 🚨 | **Risk Coral (Alerta)** | `#F43F5E` | `350 89% 60%` | **Alerta de Perigo.** Usado para destacar custos ocultos e taxas que o cliente ignora na compra. |
| ◽ | **Glacier White (Texto H)** | `#F9FAFB` | `210 40% 98%` | **Texto de Título.** Contraste limpo de alta legibilidade. |
| ▫️ | **Slate Silver (Texto Body)** | `#9CA3AF` | `220 14% 65%` | **Texto de Corpo.** Cinza azulado suave que evita fadiga ocular. |

---

## ⚡ O Fator Surpresa (Diferentona)

Para quebrar a mesmice e simetria de landing pages genéricas, a página contará com um **Scanner Interativo de Viabilidade de Compra**:
*   Um painel interativo (Bento Card grande) onde o usuário digita o **Valor do Imóvel** e sua **Renda Mensal Familiar**.
*   Ao clicar em **"Iniciar Varredura de Riscos"**, uma barra horizontal de laser cyan brilha e corre verticalmente pelo card (micro-animação CSS de *scanning*).
*   O painel revela instantaneamente um diagnóstico preliminar dinâmico com números desdobrados de forma extremamente precisa:
    1.  **Custo Real Oculto:** Detalhamento exato de cartório, escritura, registro e ITBI estimado.
    2.  **Comprometimento Patrimonial:** Projeção de impacto real na renda ao longo do tempo (avisando se está acima dos 30% recomendados).
    3.  **Proporção de Custo Oculto:** Indicador circular com a porcentagem oculta sobre o valor nominal do imóvel.
    4.  Um botão CTA pulsante em verde esmeralda: **"Solicitar Relatório de Viabilidade Completo no WhatsApp"**.

---

## 📐 Estilo de Bordas e Contornos

*   **Cantos Arredondados:** Padrão de cantos suaves `rounded-3xl` (24px) para os cartões bento e `rounded-xl` (12px) para os inputs e botões secundários.
*   **Contornos e Separadores:** Bordas finas de `1px` em `border-zinc-800/80` para separar os cards no fundo escuro.
*   **Bordas de Scanner:** Destaque nos cards principais com contorno sutil `border-cyan-500/20` e efeito hover de brilho neon `shadow-[0_0_15px_rgba(0,242,254,0.15)]`.

---

## 📝 Validação de Conteúdo (Content-Driven Design)

A interface é guiada por 4 blocos narrativos baseados no blueprint:
1.  **A Dor:** "Você está prestes a fazer a maior dívida da sua vida. Tem certeza do que está fazendo?"
2.  **O Scanner:** O usuário simula na hora os custos que ninguém lhe contou (ITBI, registro, taxas).
3.  **A Solução (Análise de Viabilidade):** O que vai no relatório em PDF entregue em 48h (preço da região, custos totais, comprometimento de renda, riscos/pontos de atenção, veredito final).
4.  **A Escapatória:** Falar com o analista pelo WhatsApp para receber o relatório completo.
