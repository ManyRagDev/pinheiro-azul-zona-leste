# Plano de Implementação: Inteligência Imobiliária (Aplicação Visual)

> Baseado na skill **Anti-Generic UI & Brand Inference** e no manual da marca [visual-language-inteligencia.md](../../visual-language-inteligencia.md).
>
> Filosofia: Elevar a página `/inteligencia` para um visual Dark Tech de altíssima credibilidade, substituindo o clichê "hacker/ficção científica" por uma perícia imobiliária real com tipografia híbrida e telemetria funcional de dados.

---

## Fase 1: Tipografia Híbrida (Autoridade + Precisão)

- [x] **1.1** Remover a classe global `font-mono` do container principal de `InteligenciaImobiliaria.tsx`.
- [x] **1.2** Aplicar a classe `font-serif` (com fallbacks elegantes como Lora, Georgia) nos títulos principais (`h1`), cabeçalhos de Bento Grids (`h2`, `h4`) e parágrafos de texto corrido.
- [x] **1.3** Isolar e manter a classe `font-mono` estritamente nos números, tabelas, inputs e labels de status de telemetria.

---

## Fase 2: Humanização da Micro-Copy e Telemetria

- [x] **2.1** Substituir a label `[TELEMETRIA: ATIVA]` por `[PERÍCIA LOCAL: ZL SP]` no topo da página.
- [x] **2.2** Substituir a label de carregamento `[SCANNING SEGMENT: ...]` por `[ANALISANDO VALOR DO IMÓVEL: ...]`.
- [x] **2.3** Substituir o identificador de bloco `[PANEL_CTR-99]` por `[SIMULADOR DE CRÉDITO & TAXAS]`.
- [x] **2.4** Alterar a mensagem do scanner `Processando Vetores de Custos...` por `Calculando ITBI e Emolumentos Cartoriais SP...`.
- [x] **2.5** Substituir a label de resultados `[TELEMETRIA GERADA]` por `[PARECER DE VIABILIDADE PRELIMINAR]`.

---

## Fase 3: Widget de Estresse de Renda Funcional

- [x] **3.1** Substituir a bússola giratória infinita por um medidor visual estático/dinâmico de Estresse de Renda.
- [x] **3.2** Criar um widget (gráfico ou barra circular simples em SVG/CSS) que altere sua cor dinamicamente (de azul-ciano para vermelho-coral) quando o comprometimento de renda ultrapassar os 30% recomendados.
- [x] **3.3** Exibir uma mensagem de status do medidor condicional (ex: "STATUS: SAUDÁVEL" ou "STATUS: RISCO DE REPROVAÇÃO BANCÁRIA").

---

## Fase 4: Polimento & Verificação Técnica

- [x] **4.1** Ajustar os cantos de botões e cartões para manter a solidez e evitar cantos redondos flutuantes inconsistentes no desktop.
- [x] **4.2** Testar o fluxo completo do scanner no desktop e no mobile para validar os estados (`isScanning`, `showResults`).
- [x] **4.3** Rodar `npm run build` para garantir que as alterações não introduziram erros de tipagem no TypeScript.
