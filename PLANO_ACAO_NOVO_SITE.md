# Plano de Ação — Site Pinheiro Azul

> Documento vivo. Atualizado em 23/05/2026 após sessão de implementação completa.
> Reflete o estado real do repositório (branch `main`, commit `4fb3e98`).

---

## Estado Atual — O Que Já Foi Feito

Todas as mudanças abaixo estão commitadas e no `main`.

### Copy e posicionamento
- [x] Kicker "LPs por perfil" → "Qual é o seu momento?"
- [x] Título "Cada clique vira uma hipótese de venda." → "Cada pessoa chega com um propósito. A gente tem um caminho para cada um."
- [x] Subtítulo sobre base de leads → promessa de diagnóstico primeiro
- [x] Kicker "Base de dados" → "Como funciona"
- [x] Título "Captura estruturada antes da abordagem." → "O diagnóstico que muda o rumo da sua busca."
- [x] Subtítulo técnico sobre SMTP → linguagem do comprador
- [x] Kicker "Operação SDR" → "Atendimento consultivo"
- [x] Título "Qual perfil chama mais atenção?" → "Você faz o diagnóstico. A gente já chega com as respostas."
- [x] Botão "Testar diagnóstico" → "Fazer diagnóstico"
- [x] Rodapé "Funil imobiliário para geração de leads" → "Corretagem especializada na Zona Leste de São Paulo."
- [x] Proof points — removidos os termos internos ("base de leads", "régua de email")
- [x] Botão "Ver LP" → "Conhecer mais"

### Modal de diagnóstico
- [x] Tela de contato: removida referência a "provedor transacional"
- [x] Tela de resultado: removida referência a "SDR" e "régua de email"
- [x] Badge do guia: de slug interno (`guia-5-imoveis-itaquera-penha`) para label legível ("Guia: Seu Primeiro Imóvel na Zona Leste")
- [x] Toast de confirmação: removido "régua de email"
- [x] Adicionado `guideLabels` em `funnel.ts` para display separado das chaves do banco

### Estrutura e navegação
- [x] "Anuncie" removido do nav em todos os arquivos ativos (HomeIndex4, PrimeiroImovelV2, UpgradeMoradiaV2, InvestimentoV2, SellerLandingV2, navigation.tsx)
- [x] 4º card "Anuncie seu imóvel" removido do grid da home
- [x] Grid ajustado de `xl:grid-cols-4` para `sm:grid-cols-2 lg:grid-cols-3`
- [x] Dois CTAs por card → um único "Conhecer mais" por card + botão único "Fazer diagnóstico gratuito" abaixo do grid
- [x] CTA "Avaliar meu imóvel" removido do Blog
- [x] Rota `/anuncie-seu-imovel` mantida intacta — dark page para campanhas

### SellerLanding (dark page)
- [x] Hero reposicionado: "Antes de você anunciar, a gente já tem uma fila de compradores com perfil."
- [x] Subtítulo com o argumento dos compradores mapeados

---

## Diretriz para o Que Falta

> **Não é uma refatoração. É um toque pessoal sutil.**
>
> O site está bem estruturado, o design é sólido, o funil funciona. O que falta é uma camada humana — mostrar quem está do outro lado, de forma pontual e sem exagero. Três pontos cirúrgicos. Nada mais.

---

## Próximos Passos — Em Ordem de Prioridade

### 1. Foto do André — Adicionar ao projeto
**Esforço: mínimo · Impacto: alto como base para os passos 2 e 3**

Emanuel vai adicionar a foto do André em `src/assets/andre.jpg` (ou formato equivalente).
A foto deve ser natural — não terno e sorriso forçado. Serve de base para os dois próximos itens.

---

### 2. Uma linha na home — Âncora humana
**Esforço: mínimo · Impacto: alto**

Adicionar um bloco simples após a seção "Atendimento consultivo" ou antes do rodapé — não uma seção nova, um elemento discreto que ancora a marca em uma pessoa real.

**Copy:**
> *"Fala com o André. Ele conhece a Zona Leste de um jeito que muda a conversa."*

**Layout sugerido:** foto do André à esquerda (pequena, sem pose institucional) + a frase + um link para WhatsApp ou para abrir o diagnóstico. Sem título de seção, sem bio, sem currículo.

**Princípio editorial:** não dizer que ele sabe — deixar a frase despertar curiosidade sobre o que é esse "jeito".

---

### 3. Final do modal — André aparece pessoalmente
**Esforço: baixo · Impacto: muito alto**

A tela de resultado do modal é o momento de maior engajamento do site — a pessoa acabou de entregar nome, email e WhatsApp. Hoje ela recebe uma tela genérica da marca. Deveria receber uma mensagem pessoal.

**Copy para a tela de resultado:**
> *"Olá, sou o André. Com esse perfil já tenho algumas direções em mente. Vamos conversar?"*

**Implementação:** substituir ou complementar o bloco atual de resultado com foto pequena do André + frase + botão de WhatsApp.

**Aguarda:** a frase natural do André (ver item 5 abaixo) para calibrar o tom exato antes de implementar.

---

### 4. Blog — Artigos assinados por André
**Esforço: editorial · Impacto: alto (autoridade de longo prazo)**

Os 3 posts existentes são genéricos — poderiam ter sido escritos por qualquer portal imobiliário. O diferencial do André é o domínio de financiamento (SAC, Price, FGTS, ITBI, amortização) e o conhecimento de território. Esses são assuntos que nenhum portal explica com a profundidade de quem vive isso.

**Formato:** posts assinados por André, não como "conteúdo da empresa". A voz é dele — direta, sem enrolação, explica o número de verdade.

**Calendário sugerido — próximos 3 meses:**

| Mês | Post | Ângulo |
|---|---|---|
| 1 | SAC ou Price: qual financiamento é melhor para você? | André explica os dois com número real — não artigo genérico |
| 1 | Quanto custa comprar um imóvel de verdade na Zona Leste em 2026? | Todos os custos: ITBI, cartório, entrada, avaliação bancária |
| 2 | Tatuapé: por que é o bairro mais disputado da Zona Leste? | Bairro do Mês com dados reais que só ele tem |
| 2 | FGTS: o que você pode usar e o que a maioria não sabe | Missão pessoal do André — ensinar o que os outros escondem |
| 3 | A expansão do metrô e o que ela significa para os preços | Tese de investimento com visão de quem conhece o terreno |
| 3 | Comprar ou alugar na Zona Leste em 2026: a conta real | Âncora de decisão — SEO alto |

**Aguarda:** voz e estilo do André para o primeiro post antes de replicar o formato.

---

### 5. O exercício mais importante — Ainda pendente
**Esforço: uma conversa · Impacto: calibra tudo acima**

Antes de implementar qualquer elemento com a voz do André (modal, home, blog), Emanuel precisa perguntar a ele:

> **"Qual frase você repete com frequência nos atendimentos? O que você diz naturalmente que as pessoas acham diferente?"**

A melhor copy do projeto já existe — está na boca de quem atende. Uma frase que parece banal para o André porque é o jeito dele de trabalhar pode ser exatamente o que faz uma pessoa estranha na internet pensar *"esse cara é diferente"*.

Essa resposta calibra o tom do modal, da linha na home e dos artigos do blog.

---

## O Que Não Fazer

| Tentação | Por quê evitar |
|---|---|
| Bio com currículo e anos de experiência | É o estereótipo que o André subverte |
| "Especialista com X anos de mercado" | Declarar competência antes de provar |
| Foto com terno e sorriso forçado | Qualquer coisa que lembre o corretor genérico |
| Depoimentos roteirizados | Prova social falsa é pior que nenhuma |
| Seção "Conheça nosso especialista" | Grandioso demais para o tom que funciona |
| Nova seção grande na home | O site não precisa de refatoração |

---

## Backlog — Longo Prazo (Não Urgente)

Estes itens têm valor mas não são prioridade agora. Entram quando o negócio justificar:

- **Seção de destaques por perfil** (5 imóveis exemplo por aba) — requer imagens reais do André
- **Seção diferenciadora** (comparativo corretor tradicional vs. Pinheiro Azul)
- **Radar de Oportunidades** — requer migration Supabase (`radar_ativo boolean`) + automação de notificação
- **Prova social com jornadas de clientes** — requer casos reais validados com André
- **Subdomínio para captação** (`vender.pinheiro-azul.com.br`) — quando o lado da oferta escalar

---

## Assets Disponíveis

| Arquivo | Status | Uso |
|---|---|---|
| `src/assets/consultation.jpg` | ✅ Em uso | Seção "Atendimento consultivo" na home |
| `src/assets/hero-couple.jpg` | Disponível | Não usado nas páginas ativas |
| `src/assets/hero_video.mp4` | Disponível | Não usado nas páginas ativas |
| `src/assets/blog-*.webp` | ✅ Em uso | Thumbnails dos 3 posts |
| `src/assets/andre.jpg` | **A adicionar** | Linha na home + modal de resultado |

---

## O Posicionamento em Uma Frase

> *A Pinheiro Azul não vende imóveis. Ela conhece a Zona Leste melhor do que ninguém e conecta pessoas ao endereço que muda suas vidas.*

**A frase que ancora o André:**
> *"Fala com o André. Ele conhece a Zona Leste de um jeito que muda a conversa."*
