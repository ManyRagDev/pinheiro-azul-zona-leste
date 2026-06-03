# Blueprint — Novo Site Pinheiro Azul (V2)

> **Contexto:** O Andre, proprietário da Pinheiro Azul, pediu mudanças no site. Em vez de refatorar o site atual, vamos criar um segundo site paralelo — nova home, novas rotas, novos componentes — para termos duas versões comparáveis. O site atual (`HomeIndex4` e todas as suas rotas) permanece 100% intacto.

---

## 📁 SEÇÃO 1 — VISÃO GERAL DO PROJETO NOVO

### Estratégia de coexistência

| Item | Site Atual | Site Novo (V2) |
|------|-----------|----------------|
| Home | `/` → `HomeIndex4.tsx` | `/v2` → `HomeV2New.tsx` |
| Persona pages | `/primeiro-imovel` etc. | `/v2/primeiro-imovel` etc. |
| Bairro pages | ❌ Não existe | `/v2/bairro/:slug` |
| Diagnóstico | Modal global (3-4 passos) | Quiz embutido/modal (5 passos) |
| Nav | Sem "Proprietário" | Com "Anuncie (Proprietário)" |

**Princípio:** todas as novas rotas vivem sob o prefixo `/v2`. O `App.tsx` ganha um novo bloco de `<Route>` sem tocar nas rotas existentes.

---

## 📁 SEÇÃO 2 — ARQUITETURA EXTRAÍDA DAS IMAGENS

### Fluxo geral (img1 + img2)

```
Google Search (SEO) ──┐
                       ├──▶  HOME PAGE (Roteador de Conversão)
Acesso Direto ─────────┘        │
                                 ├──▶ 2. Páginas de Persona
                                 ├──▶ 3. Páginas de Bairro
                                 └──▶ 4. Fluxo de Diagnóstico (Quiz 5 Passos)
                                              │
                                              ▼
                                  5. Atendimento Humano (SDR)
                                              │
                                              ▼
                                          FECHAMENTO
```

---

## 📁 SEÇÃO 3 — COMPONENTE 1: HOME PAGE (Roteador de Conversão)

**Rota:** `/v2`  
**Arquivo novo:** `src/pages/v2/HomeV2.tsx`

### Dobras (seções em ordem)
1. **Hero com vídeo de fundo** + pergunta de pré-segmentação:  
   > *"Qual é a sua prioridade?"*  
   Botões/cards de resposta rápida que redirecionam para a Página de Persona correta.

2. **Cards Persona** — 4 cards (Primeiro Imóvel, Upgrade, Investimento, Proprietário)  
   - Cada card: ícone, headline de dor curta, CTA → `/v2/<perfil>`

3. **Mapa da Zona Leste** (reutilizar lógica de `HomeIndex4` com os 11 bairros)  
   - Cada ponto do mapa linka para `/v2/bairro/<slug>`

4. **Metodologia P.A.Z.** (reutilizar estrutura existente)

5. **Âncora humana — André**  
   - Foto + frase: *"Fala com o André. Ele conhece a Zona Leste de um jeito que muda a conversa."*  
   - Botão WhatsApp

6. **CTA global** — Botão "Receber Diagnóstico" → abre Quiz 5 Passos

### Nav nova (Global Hub)
```
LOGO | HOME | PRIMEIRO IMÓVEL | UPGRADE | INVESTIMENTO | ANUNCIE (PROPRIETÁRIO) | BLOG | CTA | [RECEBER DIAGNÓSTICO →]
```
- "RECEBER DIAGNÓSTICO" é o único CTA em destaque (azul/primário), dispara o quiz.
- Nota: "ANUNCIE (PROPRIETÁRIO)" volta para o nav (estava removido no site atual).

---

## 📁 SEÇÃO 4 — COMPONENTE 2: PÁGINAS DE PERSONA

**Padrão de rota:** `/v2/:perfil` → `src/pages/v2/PersonaPage.tsx` (componente único parametrizado) **ou** arquivos separados por perfil.

**4 perfis:**
- `/v2/primeiro-imovel` — Primeiro Imóvel
- `/v2/upgrade` — Upgrade de Moradia
- `/v2/investimento` — Investimento
- `/v2/proprietario` — Proprietário (NOVO — não existe no site atual)

### Estrutura de dobras por persona (padrão comum)

| # | Dobra | Conteúdo |
|---|-------|---------|
| 1 | **Headline de Dor** | Copy que nomeia a dor específica do perfil |
| 2 | **Calculadora / Simulador** | Ex: "Atraso Patrimonial" (Primeiro Imóvel), "Potencial de Renda" (Investimento) |
| 3 | **CTA Diagnóstico de Patrimônio** | Botão que abre o Quiz 5 Passos com perfil pré-selecionado |

### Conteúdo sugerido por perfil

| Perfil | Headline de Dor | Simulador |
|--------|----------------|-----------|
| Primeiro Imóvel | "Cada mês de aluguel é patrimônio que você não está construindo." | Calculadora de Atraso Patrimonial (R$ aluguel × meses = perda estimada) |
| Upgrade | "Sua família cresceu. Seu imóvel ainda é o mesmo." | Simulador de Capacidade de Troca |
| Investimento | "Seu dinheiro rende mais em imóvel ou em renda fixa?" | Simulador de ROI / Rentabilidade |
| Proprietário | "Quanto tempo faz que seu imóvel está parado?" | Estimador de Valor de Mercado |

---

## 📁 SEÇÃO 5 — COMPONENTE 3: PÁGINAS DE BAIRRO (NOVO)

**Padrão de rota:** `/v2/bairro/:slug`  
**Arquivo novo:** `src/pages/v2/BairroPage.tsx` (componente único com dados parametrizados)  
**Arquivo de dados:** `src/data/bairros.ts`

### Bairros para implementar (4 prioritários, baseado nas imagens)

| Slug | Bairro | Tom |
|------|--------|-----|
| `vila-matilde` | Vila Matilde | east — "metrô e bairro" |
| `carrao` | Carrão | family — "conexão" |
| `itaquera` | Itaquera | far — "polo leste" |
| `analia-franco` | Anália Franco | prime — "alto padrão" |

*(Os demais 7 bairros do mapa podem ser adicionados na fase 2)*

### Estrutura de dobras por bairro

| # | Dobra | Conteúdo |
|---|-------|---------|
| 1 | **Headline Específica** | Ex: "Vila Matilde: moradia com metrô na porta" |
| 2 | **Raio-X Territorial** | Dados do bairro: acesso, comércio, escolas, linha de metrô, perfil do morador |
| 3 | **Seleção de Imóveis** | Grid com 3–5 imóveis de exemplo do bairro (pode usar dados mockados) |
| 4 | **Mapa + CTA Diagnóstico do Bairro** | Mini-mapa estático + botão "Fazer diagnóstico para este bairro" (pré-preenche região ZL no quiz) |

### Estrutura do arquivo de dados `src/data/bairros.ts`
```typescript
export interface Bairro {
  slug: string
  nome: string
  tone: "origin" | "prime" | "family" | "east" | "far"
  headline: string
  subheadline: string
  descricao: string
  destaques: string[]          // ["Linha 3-Vermelha", "Metrô Vila Matilde", ...]
  perfisIndicados: LeadProfile[]
  posicaoMapa: { x: number; y: number }
}
```

---

## 📁 SEÇÃO 6 — COMPONENTE 4: FLUXO DE DIAGNÓSTICO (Quiz 5 Passos)

**Arquivo:** `src/components/v2/DiagnosticQuizV2.tsx`  
**Base:** reutilizar e expandir `src/components/funnel/FunnelDiagnosticModal.tsx`

### Os 5 passos (comparativo com o atual)

| Passo | Atual | Novo (V2) |
|-------|-------|-----------|
| 01 | Objetivo | Objetivo *(igual)* |
| 02 | Orçamento | Orçamento *(igual)* |
| 03 | ❌ | **Região ZL** (bairro de interesse — novo campo) |
| 04 | Prazo | Prazo *(igual)* |
| 05 | ❌ | **Tipo de Imóvel** (casa/apto/studio/comercial — novo campo) |
| 06 | Captura (nome, email, WhatsApp) | Captura igual + `Persona Tagueada` (gerada automaticamente) |

### Tela de Resultado (pós-captura)
- Foto do André (pequena, não institucional)
- Copy: *"Olá, sou o André. Com esse perfil já tenho algumas direções em mente. Vamos conversar?"*
- Botão WhatsApp com mensagem pré-preenchida
- Badge com perfil identificado

### Mudanças no schema Supabase
- Adicionar colunas `regiao_zl` e `tipo_imovel` na tabela `leads_pinheiro_azul_funnel`
- Migration SQL a ser criada em `supabase/migrations/`

---

## 📁 SEÇÃO 7 — COMPONENTE 5: ATENDIMENTO HUMANO (Visual no site)

> Esta seção é um elemento **visual/explicativo** no site — não é uma página separada.  
> Aparece como uma dobra na Home V2 ou nas Páginas de Persona.

### Conteúdo da seção

```
Título: "O que acontece depois do diagnóstico"

[01] Lead Quente no CRM
     Contexto completo antes do primeiro contato

[02] Análise Humana
     Dossiê do cliente — perfil, região, momento

[03] Videoconferência Pessoal
     André apresenta as opções — com explicação

[04] Agendamento de Visita
     Só quando fizer sentido para você

         ↓
      FECHAMENTO
```

**Design:** linha do tempo horizontal (desktop) / vertical (mobile), ícones simples, fundo escuro para destacar o processo.

---

## 📁 SEÇÃO 8 — GLOBAL HUB: COMPONENTES COMPARTILHADOS

### Nav V2 — `src/components/v2/NavV2.tsx`
- Novo componente (não toca `navigation.tsx` existente)
- Inclui link "Anuncie (Proprietário)" voltando ao nav
- CTA "RECEBER DIAGNÓSTICO →" em azul, sticky no scroll
- Mobile: menu hamburguer com todos os links

### Footer V2 — reutilizar `FooterAurora.tsx` de `src/components/v4/` (já existe)

### SEO (por página)
Cada nova página terá `<Helmet>` ou `<title>/<meta>` inline com:
- Título SEO específico por bairro/perfil
- Description com palavras-chave locais
- OG tags

---

## 📁 SEÇÃO 9 — ESTRUTURA DE ARQUIVOS A CRIAR

```
src/
├── pages/
│   └── v2/
│       ├── HomeV2.tsx                    ← Nova home principal
│       ├── PersonaPagePrimeiroImovel.tsx
│       ├── PersonaPageUpgrade.tsx
│       ├── PersonaPageInvestimento.tsx
│       ├── PersonaPageProprietario.tsx   ← NOVO (não existe hoje)
│       └── BairroPage.tsx                ← Template para bairros
│
├── components/
│   └── v2/
│       ├── NavV2.tsx                     ← Nova navegação
│       ├── HeroV2.tsx                    ← Hero com vídeo + pré-segmentação
│       ├── PersonaCards.tsx              ← 4 cards de perfil
│       ├── BairroSection.tsx             ← Dobras de bairro reutilizáveis
│       ├── CalculatorWidget.tsx          ← Simulador genérico parametrizável
│       ├── DiagnosticQuizV2.tsx          ← Quiz 5 passos (expande o modal atual)
│       ├── AtendimentoProcess.tsx        ← Linha do tempo visual do processo
│       └── AndreAnchor.tsx               ← Bloco foto + frase do André
│
└── data/
    └── bairros.ts                        ← Dados dos bairros (tipados)
```

---

## 📁 SEÇÃO 10 — ROTEAMENTO (App.tsx)

Adicionar **após** as rotas existentes, **antes** do `catch-all *`:

```tsx
{/* ═══ SITE V2 — PARALELO (NÃO REMOVE AS ROTAS ACIMA) ═══ */}
<Route path="/v2" element={<HomeV2 />} />
<Route path="/v2/primeiro-imovel" element={<PersonaPagePrimeiroImovel />} />
<Route path="/v2/upgrade" element={<PersonaPageUpgrade />} />
<Route path="/v2/investimento" element={<PersonaPageInvestimento />} />
<Route path="/v2/proprietario" element={<PersonaPageProprietario />} />
<Route path="/v2/bairro/:slug" element={<BairroPage />} />
```

> O site atual em `/` continua servindo `HomeIndex4` sem qualquer alteração.

---

## 📁 SEÇÃO 11 — ASSETS NECESSÁRIOS

| Asset | Status | Uso no V2 |
|-------|--------|-----------|
| `src/assets/andre.jpg` | ✅ Já existe | Âncora André na home + tela de resultado do quiz |
| `src/assets/hero_video.mp4` | ✅ Já existe | Hero V2 (fundo de vídeo) |
| `src/assets/logo.png` | ✅ Já existe | NavV2 |
| Imagens dos bairros | ❌ A providenciar | Páginas de bairro |
| Foto de imóveis exemplo | ❌ A providenciar | Seleção de imóveis (bairros) |
| Ícone Calculadora/Simulador | ✅ Lucide React | `Calculator`, `TrendingUp`, `Home` |

---

## 📁 SEÇÃO 12 — ORDEM DE IMPLEMENTAÇÃO (por prioridade)

| # | Entregável | Complexidade | Dependência |
|---|-----------|-------------|-------------|
| 1 | `NavV2.tsx` | Baixa | — |
| 2 | `HomeV2.tsx` (esqueleto + Hero + Cards) | Média | NavV2 |
| 3 | `DiagnosticQuizV2.tsx` (5 passos) | Média | funnel.ts |
| 4 | `PersonaPage` × 4 (com calculadoras mockadas) | Média | DiagnosticQuizV2 |
| 5 | `BairroPage.tsx` + `bairros.ts` × 4 bairros | Média | — |
| 6 | `AtendimentoProcess.tsx` | Baixa | — |
| 7 | `AndreAnchor.tsx` | Baixa | andre.jpg |
| 8 | Migration Supabase (`regiao_zl`, `tipo_imovel`) | Baixa | — |
| 9 | SEO tags em todas as páginas | Baixa | todas as páginas |

---

## 📁 SEÇÃO 13 — VERIFICAÇÃO / COMO TESTAR

1. Rodar `npm run dev` — servidor sobe em `localhost:8080`
2. Acessar `/` → confirmar que **HomeIndex4 está intacto**, sem mudanças visuais
3. Acessar `/v2` → nova home carrega com Hero + Cards + Nav nova
4. Clicar em card "Primeiro Imóvel" → `/v2/primeiro-imovel` com calculadora
5. Clicar em ponto do mapa "Vila Matilde" → `/v2/bairro/vila-matilde`
6. Abrir quiz pelo botão "Receber Diagnóstico" → confirmar 5 passos
7. Preencher quiz até o final → confirmar captura + tela com foto do André
8. Verificar no Supabase que `regiao_zl` e `tipo_imovel` foram gravados

---

## 📝 NOTAS FINAIS

- O site atual **não é tocado**. Zero commits que alterem `HomeIndex4.tsx`, `App.tsx` rotas existentes, ou qualquer componente em uso hoje.
- Reutilizar ao máximo: `FunnelDiagnosticModal` como base do quiz, `mapDistricts` de `HomeIndex4`, `FooterAurora` de `v4/`, design tokens do `tailwind.config.ts`.
- Calculadoras/simuladores nas Personas Pages podem ser mockados na primeira versão — o importante é o UI/UX estar presente para comparação.
- Quando o Andre aprovar o V2, a estratégia de migração (trocar `/` para apontar para o V2) é feita em um PR separado, com uma única linha no `App.tsx`.