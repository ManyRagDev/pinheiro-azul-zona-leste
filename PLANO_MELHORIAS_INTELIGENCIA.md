# Plano de Melhorias — `/inteligencia`

> Baseado na análise cruzada entre SKILL.md (Anti-Generic UI), identidade visual oficial (`IDENTIDADE_VISUAL_PINHEIRO_AZUL.md`), design system (`MODERN_DARK_BENTO_DESIGN_SYSTEM.md`) e plano de negócios (`plan_revisado.md`).

---

## 1. Alinhamento de Cores à Identidade da Marca

**Problema:** A página usa `#00F2FE` (ciano neon) como cor de acento em ~40 locais. A cor oficial é `#1f8fff` (Azul Celeste Elétrico). O ciano neon cria visual de "dashboard de IA" que a skill anti-generic-ui proíbe.

**Ação:** Substituir globalmente no arquivo:
- `#00F2FE` → `#1f8fff` (azul celeste oficial)
- `bg-[#02050b]` → `bg-[#020817]` (fundo espacial oficial)
- `bg-[#0B1329]` → `bg-zinc-900` / `bg-[#18181b]` (cards oficiais)

**Impacto:** Transforma o tom emocional de "telemetria fria" para "consultoria premium confiável".

---

## 2. Cantos Arredondados (Obrigatório pela Marca)

**Problema:** ~25+ elementos com `rounded-none` (cantos retos). O manual de identidade proíbe explicitamente: *"É expressamente proibido o uso de cantos retos (`rounded-none`)"*.

**Ação:**
- Cards e painéis: `rounded-none` → `rounded-3xl`
- Botões: `rounded-none` → `rounded-2xl`
- Inputs, badges, labels: `rounded-none` → `rounded-xl`
- Bottom nav mobile: manter `rounded-2xl` (já está correto)

**Impacto:** Muda a percepção de "terminal técnico" para "interface premium acolhedora".

---

## 3. Correção Tipográfica

**Problema:** Títulos usam `font-serif` (15+ locais) e labels usam `font-mono` em excesso (30+ locais). A marca define Outfit/Geist (sans-serif) para títulos e Inter/Satoshi (sans-serif) para corpo. `font-mono` deve ser reservado apenas para valores numéricos (R$).

**Ação:**
- Remover `font-serif` de todos os títulos → usar `font-sans` (sans-serif padrão)
- Manter `font-mono` apenas em: valores monetários, porcentagens, dados regionais
- Remover `font-mono` de: labels, tags, descrições, CTAs

---

## 4. Seção IPA (Índice Pinheiro Azul)

**Problema:** O IPA é o diferencial central do `plan_revisado.md` — o selo de autoridade proprietário. Está totalmente ausente da página.

**Ação:** Adicionar seção "O que é o IPA?" entre o Scanner e o Fluxograma, contendo:
- Explicação breve do índice (0 a 10)
- Visual do semáforo: Verde (8-10 Recomendada), Amarelo (5-7 Cautela), Vermelho (0-4 Risco)
- Exemplo mockado de nota IPA no resultado do scanner
- Frase: *"O Índice Pinheiro Azul condensa toda a análise em uma nota clara. Quanto mais próximo de 10, mais segura é a compra."*

**Impacto:** Comunica o diferencial proprietário. Cria desejo pelo Dossiê completo.

---

## 5. Padronização de Nomenclatura

**Problema:** A página usa "Análise", "Laudo", "Relatório", "Auditoria" de forma inconsistente. O `plan_revisado.md` define **"Dossiê de Viabilidade Imobiliária"**.

**Ação:** Unificar CTAs e referências ao produto:
- CTAs: "Solicitar Dossiê de Viabilidade — R$ 147"
- Header: manter "Inteligência Imobiliária" (é o nome da operação)
- Footer: "Dossiê opinativo técnico de viabilidade financeira"

---

## Ordem de Execução

1. Cores (maior impacto visual imediato)
2. Cantos arredondados
3. Tipografia
4. Seção IPA
5. Nomenclatura dos CTAs

**Arquivo único afetado:** `src/pages/InteligenciaImobiliaria.tsx`