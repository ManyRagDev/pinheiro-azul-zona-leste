# Plano de Ação: Nova Proposta do Site Pinheiro Azul

> Documento gerado a partir da análise completa do repositório e da síntese estratégica desenvolvida em sessão colaborativa.
> **Status:** Planejamento — nenhuma implementação realizada.
> **Revisado em 19/05/2026:** ajustes após confronto linha a linha com o código local (HomeIndex4.tsx, funnel.ts, SellerLandingV2.tsx, featured-properties.tsx).

---

## 1. Diagnóstico do Estado Atual

### O que está funcionando bem — não tocar

| Elemento | Por quê manter |
|---|---|
| Modal de diagnóstico (FunnelDiagnosticModal) | Fluxo de 5 perguntas, captura de contato, classificação automática e integração Supabase estão corretos |
| Arquitetura de rotas e perfis | Segmentação em 4 personas (primeiro imóvel / upgrade / investimento / venda) é estrategicamente sólida |
| Mapa animado da Zona Leste | Diferenciador visual forte, único no mercado |
| Hero steps da home | Especialmente "Seu tempo é precioso. Você não precisa ver tudo." — alinhado ao novo posicionamento |
| Integração Supabase | Tabelas bem estruturadas, dados sendo capturados corretamente |
| Blog com MDX | Infraestrutura boa, os 3 posts existentes têm CTAs contextuais funcionando |
| Design system | Identidade visual forte, consistente e premium |

### O problema central: o site fala com a empresa, não com o cliente

A copy atual foi escrita para quem quer entender o funil de marketing — não para quem está sonhando com um imóvel. A linguagem é B2B/interna em um produto que deveria ser 100% voltado ao consumidor final.

**Exemplos concretos do que precisa mudar:**

| Atual (linguagem interna) | Por que é um problema |
|---|---|
| "LPs por perfil" | O comprador não sabe o que é LP |
| "Cada clique vira uma hipótese de venda" | Expõe a mecânica interna, afasta o cliente |
| "Funil imobiliário para geração de leads" | Linguagem de marketing B2B no rodapé do site |
| "Operação SDR" | Jargão de inside sales invisível ao consumidor |
| "Captura estruturada antes da abordagem" | Descreve o processo da empresa, não o benefício do cliente |
| "As landing pages alimentam a mesma base de leads e a mesma fila de conteúdo por email" | Expõe a engenharia do funil onde deveria haver uma promessa |

---

## 2. O Insight Estratégico — Formulado com Clareza

A conversa entre André e Emanuel identificou algo que a maioria dos corretores não enxerga:

> **"A maioria dos corretores pega o imóvel e anuncia. Você vai anunciar a realização da pessoa. O imóvel você encontra."**

Isso é o coração do novo posicionamento. Há um paradoxo no mercado imobiliário digital: o consumidor tem acesso a milhares de imóveis — Zap, OLX, QuintoAndar, VivaReal — e mesmo assim está mais perdido do que nunca. Informação sem curadoria é ansiedade, não conveniência.

A maioria dos corretores ainda compete no jogo do inventário. A Pinheiro Azul compete no jogo da **curadoria especializada sobre um território**.

### Os 4 Princípios Norteadores do Novo Site

**1. O produto é o conhecimento, não o inventário**
A Pinheiro Azul não é um catálogo. É um serviço de curadoria especializada. O site deve comunicar isso desde o primeiro segundo — antes de qualquer imagem de imóvel.

**2. Imóveis como isca, não como catálogo**
Imagens de imóveis existem para a pessoa sonhar e se identificar, não para criar expectativa de um estoque completo. A promessa não é "veja tudo que temos disponível". É "me conta o que você quer, e eu encontro".

**3. O diagnóstico como produto premium**
Em vez de formulário genérico, o diagnóstico deve ser comunicado como um serviço diferenciado — algo que outros corretores não oferecem. A pessoa sai do diagnóstico com um perfil, uma orientação e uma expectativa clara do próximo passo.

**4. A Zona Leste como território, não como endereço**
André tem conhecimento profundo de um território específico. Isso é raro e valioso. O site deve comunicar autoridade sobre a Zona Leste — seus bairros, dinâmicas, preços, expansões futuras e oportunidades escondidas.

---

## 3. Plano de Ação por Fase

---

### FASE 1 — Reposicionamento da Copy
**Impacto: alto · Esforço: baixo · Prazo sugerido: 1 semana**

Sem mexer em layout, trocar a linguagem B2B por linguagem do consumidor. É a intervenção de maior retorno por menor custo.

#### Home (HomeIndex4)

**Seção "Perfis" — atualmente titulada "LPs por perfil"**

| Elemento | Atual | Proposta |
|---|---|---|
| Kicker | "LPs por perfil" | "Qual é o seu momento?" |
| Título | "Cada clique vira uma hipótese de venda." | "Cada pessoa chega com um propósito. A gente tem um caminho para cada um." |
| Subtítulo | "As landing pages falam com dores diferentes, mas todas alimentam a mesma base de leads..." | Remover completamente. O subtítulo novo vem do Princípio 1: "Antes de qualquer indicação, a gente entende quem você é e o que você precisa." |

**Copy dos 4 perfis (cards) — apenas os kickers e títulos de seção precisam mudar.**

> **Nota (revisão 19/05):** Ao confrontar com o código, os `profileSummaries` em `src/lib/funnel.ts` já estão no tom consumer-facing correto:
> - "Conquiste seu primeiro imóvel com segurança." — já bom, manter
> - "Troque de endereço sem errar a rotina." — já bom, manter
> - Os demais também estão adequados
>
> O que precisa mudar é o **container da seção** (kicker "LPs por perfil" e título "Cada clique vira uma hipótese de venda"), não as descrições internas dos cards.

Os CTAs dos botões dentro dos cards (`Ver LP` → `Conhecer mais`, `Diagnóstico` → manter) também merecem revisão para linguagem do consumidor.

**Seção "Base de dados" — atualmente "Captura estruturada antes da abordagem"**

| Elemento | Atual | Proposta |
|---|---|---|
| Kicker | "Base de dados" | "Como funciona" |
| Título | "Captura estruturada antes da abordagem." | "O diagnóstico que muda o rumo da sua busca." |
| Subtítulo | Texto técnico sobre SDR e CRM | "Antes de qualquer visita, a gente entende seu momento: o que você precisa, o quanto pode investir, onde quer estar. Com isso, cada indicação é cirúrgica — sem perda de tempo dos dois lados." |

**Proof points (4 cards com checkmarks) — reescrever:**

| Atual | Proposta |
|---|---|
| "Diagnóstico antes da lista de imóveis" | Manter — está bom |
| "Segmentação por perfil e intenção" | "Curadoria baseada no seu momento real" |
| "Registro unificado na base de leads" | "Histórico da sua busca sempre à mão" |
| "Fila preparada para envio de guias por email" | "Guias e materiais enviados conforme seu perfil" |

**Seção "SDR" — atualmente "Operação SDR"**

| Elemento | Atual | Proposta |
|---|---|---|
| Kicker | "Operação SDR" | "Atendimento consultivo" |
| Título | "Qual perfil chama mais atenção?" | "Você faz o diagnóstico. A gente já chega com as respostas." |
| Subtítulo | "A SDR recebe contexto: origem, perfil, faixa de valor, prazo e guia solicitado..." | "Nosso atendimento começa depois do diagnóstico — nunca antes. Assim o papo é direto: sem perguntas básicas, sem perda de tempo. Só o que importa para o seu momento." |

**Rodapé:**

| Atual | Proposta |
|---|---|
| "Funil imobiliário para geração de leads na Zona Leste." | "Corretagem especializada na Zona Leste de São Paulo." |

#### Landing Pages

**InvestimentoV2** — adicionar o argumento de expansão da Zona Leste. Copy sugerida para uma nova seção:

> "A Zona Leste vive uma das maiores expansões de infraestrutura da cidade: novas linhas de metrô, corredores de ônibus, novos empreendimentos comerciais. Quem comprar antes de todo mundo chegar sabe o que está fazendo."

**SellerLandingV2** — Ver Fase 5 (reposicionamento completo do lado da oferta).

---

### FASE 2 — A Isca Visual: Destaques por Perfil
**Impacto: alto · Esforço: médio · Prazo sugerido: semanas 2–3**

Criar uma nova seção na home com cards de imóveis exemplo. Não como catálogo — como referências de "o que é possível". O objetivo é fazer a pessoa sonhar e se identificar antes de chegar ao diagnóstico.

#### Posicionamento da seção

**Localização na página:** entre o hero animado e a seção de perfis.

**Título da seção:** "Exemplos do que encontramos para cada momento"

**Subtítulo:** "Não temos um catálogo fixo — porque o mercado muda todo dia. Mas temos olho treinado para o que existe em cada região da Zona Leste."

Esse copy é essencial: deixa claro que são referências, não estoque. Remove a expectativa errada e reforça o posicionamento de curadoria.

#### Layout

- 3 abas (tabs): **Primeiro Imóvel · Upgrade · Investimento**
- Cada aba: 5 cards de imóvel em grid (2+3 no desktop, carrossel no mobile)

#### Anatomia de cada card

```
[ Imagem do imóvel — landscape, alta qualidade ]
[ Badge: bairro ]           [ Badge: faixa de preço ]
[ Atributo 1 · Atributo 2 · Atributo 3 ]
[ CTA: "Ver imóveis como este →" ]
```

O CTA "Ver imóveis como este" abre o modal de diagnóstico com o perfil correspondente pré-selecionado — não leva para uma página de imóvel individual.

#### Referências de imóveis por perfil (André valida com casos reais)

**Primeiro Imóvel** (Itaquera, Penha, Belém, Cangaíba)

| # | Tipo | Bairro | Preço aprox. | Atributos |
|---|---|---|---|---|
| 1 | Ap 2 dorms | Penha | ~R$ 280k | Metrô a 5min · FGTS · Financiável |
| 2 | Ap 1 dorm | Itaquera | ~R$ 220k | MCMV · Condomínio baixo · Novo |
| 3 | Ap 2 dorms | Belém | ~R$ 320k | Varanda · Novo · Bem localizado |
| 4 | Ap 2 dorms | Cangaíba | ~R$ 260k | Área de lazer · Quieto · Custo-benefício |
| 5 | Studio | Vila Matilde | ~R$ 240k | Metrô a 3min · Planta inteligente · Jovem |

**Upgrade / Moradia** (Vila Matilde, Carrão, Anália Franco, Vila Formosa)

| # | Tipo | Bairro | Preço aprox. | Atributos |
|---|---|---|---|---|
| 1 | Ap 3 dorms | Carrão | ~R$ 480k | Vaga · Lazer completo · 2 banheiros |
| 2 | Casa 3 dorms | Vila Formosa | ~R$ 650k | Quintal · Pet friendly · Silencioso |
| 3 | Ap 3 dorms | Anália Franco | ~R$ 720k | 2 vagas · Alto padrão · Vista livre |
| 4 | Ap 3 dorms | Tatuapé | ~R$ 560k | Varanda gourmet · Metrô · Comércio |
| 5 | Casa 4 dorms | Guilhermina | ~R$ 590k | Espaço · Escola perto · Família |

**Investimento** (Tatuapé, Anália Franco, Vila Matilde)

| # | Tipo | Bairro | Preço aprox. | Potencial |
|---|---|---|---|---|
| 1 | Ap 1 dorm | Tatuapé | ~R$ 350k | Alto índice de locação |
| 2 | Ap 2 dorms | Anália Franco | ~R$ 490k | Valorização histórica ~8%aa |
| 3 | Ap 1 dorm | Vila Matilde | ~R$ 280k | Renda estimada ~R$1.800/mês |
| 4 | Studio | Tatuapé | ~R$ 310k | Perfil locatário jovem, baixa vacância |
| 5 | Ap 2 dorms | Carrão | ~R$ 380k | Planta valorizada, liquidez alta |

#### Ponto de partida — componente existente

> **Nota (revisão 19/05):** Existe um componente `src/components/ui/featured-properties.tsx` já com 6 imóveis (Unsplash), bairros corretos (Tatuapé, Vila Formosa, Penha, Cangaíba, Vila Matilde) e preços realistas — mas **não está conectado a nenhuma página ativa**. É um ativo abandonado.
>
> A Fase 2 pode partir desse componente em vez de começar do zero. O problema é o estilo: ele usa o design system antigo (`brand-primary`, `Card`, `Badge`) enquanto o HomeIndex4 é raw Tailwind no estilo brutal. Será necessário reestilizar para o padrão do Index4 e reorganizar por perfil em tabs.

Quando André tiver acesso a fotos reais de imóveis, substituir as Unsplash — mas elas já são do tipo e bairro certos para começar.

---

### FASE 3 — Novas Seções Estratégicas
**Impacto: alto · Esforço: médio · Prazo sugerido: semanas 3–4**

#### 3.1 Seção Diferenciadora — "Por que a Pinheiro Azul"

Uma seção clara comunicando o posicionamento único. Sem jargão. Sem lista de features.

**Copy sugerida:**

```
TÍTULO:
"A maioria dos corretores tem imóveis pra vender.
A gente tem tempo pra entender o que você precisa."

CORPO:
Outros corretores começam pelo estoque. A gente começa pelo diagnóstico.

Só depois de entender seu momento — seu orçamento real, sua rotina, 
o bairro que faz sentido para sua vida — é que indicamos opções.

Não temos conflito de interesse. Não temos carteira a defender.
Temos conhecimento profundo da Zona Leste e acesso direto aos principais 
portfólios das construtoras da região.

O imóvel você pode encontrar em qualquer portal.
O corretor que conhece a Zona Leste de verdade — esse é mais difícil.
```

**Layout sugerido:** Split 50/50 — texto à esquerda, comparativo visual à direita.

**Comparativo (tabela visual, não literal):**

| Corretor tradicional | Pinheiro Azul |
|---|---|
| Começa pelo portfólio disponível | Começa pelo seu diagnóstico |
| Mostra o que tem para vender | Encontra o que você precisa |
| Interesse no estoque da carteira | Interesse no seu melhor negócio |
| Atende qualquer região | Especialista na Zona Leste |

#### 3.2 Radar de Oportunidades

> **Dependência técnica (revisão 19/05):** Antes de qualquer código de frontend, o Radar requer uma **migration no Supabase** — adicionar a coluna `radar_ativo boolean DEFAULT false` na tabela `leads_pinheiro_azul_funnel`. Sem essa migration deployada, o toggle no modal não tem onde gravar.

Adicionar ao final do modal de diagnóstico (tela de resultado) uma proposta de continuidade:

**Copy:**
```
"Quer ficar de olho?"

"Quando um imóvel com o seu perfil aparecer na Zona Leste, 
você é avisado antes de todo mundo."

[ Sim, quero entrar no Radar ]     [ Não por enquanto ]
```

**Implementação técnica (simples):**
- Um campo booleano `radar_ativo` na tabela `leads_pinheiro_azul_funnel`
- André pode acompanhar manualmente e notificar via WhatsApp até automação estar pronta
- O valor está na promessa e na retenção: o lead não é "perdido" quando não converte imediatamente

**Por que isso importa:**
A maioria dos leads imobiliários não está pronta para comprar agora. O Radar transforma um lead frio em um relacionamento ativo, com permissão explícita para acompanhamento.

#### 3.3 Prova Social — Jornadas, não Imóveis

Criar uma seção de depoimentos focada no **processo**, não na propriedade vendida. Sem inventário para mostrar, a prova social precisa vir da experiência de ser atendido.

**Estrutura de cada depoimento:**
- Foto ou avatar com iniciais
- Nome + bairro onde foi atendido
- Situação anterior: "Estava pagando aluguel há 8 anos sem saber por onde começar"
- Resultado concreto: "Em 3 semanas, tinha aprovação de crédito e 2 opções certeiras no perfil certo"
- Quote de destaque: a frase mais impactante em tipografia maior

**3 histórias sugeridas para começar (André valida com casos reais):**

1. **Casal, Penha** — Primeira compra. FGTS aprovado, chaves em mãos em 45 dias. Não sabiam que tinham crédito.
2. **Família, Vila Formosa** — Upgrade após segundo filho. Precisavam de espaço sem mudar de bairro. Encontrado em 2 semanas.
3. **Investidor, Tatuapé** — Comprou na planta. Alugou imediatamente após entrega. Retorno de 7,2% ao ano.

---

### FASE 4 — Blog e Território como Autoridade
**Impacto: médio (longo prazo) · Esforço: médio · Prazo: contínuo**

O blog tem 3 posts. A infraestrutura MDX está boa. O que falta é volume e estratégia editorial clara.

#### Por que o blog importa para este modelo de negócio

André tem um ativo que nenhum portal grande tem: **conhecimento profundo de um território específico**. Dados reais de preço, dinâmicas de bairro, tendências de valorização — esse é conteúdo impossível de copiar de Wikipedia. É o que atrai o tráfego certo e constrói a autoridade que justifica o posicionamento de Personal Shopper de Imóveis.

#### Calendário editorial sugerido — próximos 3 meses

**Mês 1 — Territorialidade**
- "Tatuapé: por que é o bairro mais disputado da Zona Leste?" *(Bairro do Mês #1)*
- "Quanto custa um imóvel em cada bairro da Zona Leste em 2025?" *(âncora SEO de alta busca)*

**Mês 2 — Investimento e expansão**
- "A expansão do metrô e o que ela significa para os preços na Zona Leste" *(tese de investimento)*
- "Anália Franco: o bairro que mais valorizou na última década" *(Bairro do Mês #2)*

**Mês 3 — Processo de compra**
- "FGTS: tudo que você precisa saber antes de comprar seu primeiro imóvel" *(âncora primeiro imóvel)*
- "Comprar ou alugar na Zona Leste em 2025: a conta que pouca gente faz" *(âncora de decisão)*

#### Formato padrão de cada post

- Dados reais de preço (André fornece — ninguém mais tem)
- Componentes MDX existentes: Info, Checklist, Tip, Callout
- CTA contextual no **meio** do artigo, não só no final
- Slug semântico para SEO: `/blog/quanto-custa-imovel-zona-leste-2025`

---

### FASE 5 — Fechar o Ciclo: Lado da Oferta
**Impacto: alto · Esforço: baixo (adição cirúrgica) · Prazo: junto com Fase 1**

> **Nota (revisão 19/05):** O SellerLandingV2 está melhor do que o estimado originalmente. Já tem linguagem consumer-facing: "Vender o imóvel da sua vida não pode ser na sorte", "A gente avalia com honestidade", "Três conversas. Uma venda mais tranquila." Não é uma reescrita completa — é uma **adição cirúrgica** do argumento que faltava.

O único gap real é a ausência do argumento central da conversa: os compradores já existem.

**Argumento atual (implícito):** "Anuncie conosco porque somos uma boa imobiliária"

**Argumento novo:** "Já temos compradores mapeados por perfil. O seu imóvel pode já ter um cliente esperando."

**Copy sugerida para o hero:**

```
TÍTULO:
"Antes de você anunciar, a gente já tem uma fila de compradores com perfil."

SUBTÍTULO:
A cada semana, novos leads fazem o diagnóstico na Pinheiro Azul.
Classificamos por momento, orçamento e região de interesse.

Quando você anuncia seu imóvel com a gente, ele entra numa busca 
que já está acontecendo — não começa do zero.

[ Quero avaliar meu imóvel ]
```

**Por que isso fecha o ciclo:**
Os leads do diagnóstico (compradores) viram argumento de venda para os proprietários. A base de leads se transforma em ativo dos dois lados do mercado — sem que André precise ter estoque próprio.

---

## 4. O Que Não Mudar

| Elemento | Motivo |
|---|---|
| Modal de diagnóstico | Ativo mais valioso do site — fluxo, perguntas e classificação estão corretos |
| Arquitetura de rotas | Segmentação por persona está funcionando |
| Mapa animado da Zona Leste | Diferenciador visual, único no mercado imobiliário |
| Hero steps da home | "Seu tempo é precioso. Você não precisa ver tudo." está alinhado ao novo posicionamento |
| Integração Supabase | Dados sendo capturados corretamente, tabelas bem estruturadas |
| Design system | Identidade visual premium e consistente — não mudar cores, tipografia nem lógica de layout |
| Posts existentes do blog | Têm CTAs contextuais funcionando, só precisam de mais companhia |

---

## 5. Resumo de Prioridades

| # | Fase | Ação principal | Impacto | Esforço | Prazo |
|---|---|---|---|---|---|
| 1 | Fase 1 | Kickers e títulos de seção da home (não os cards — já estão ok) | 🔴 Alto | 🟢 Baixo | Semana 1 |
| 2 | Fase 5 | Adicionar argumento "compradores mapeados" no hero do SellerLanding | 🔴 Alto | 🟢 Baixo | Semana 1 |
| 3 | Fase 2 | Isca visual por perfil — partir do `featured-properties.tsx` existente, reestilizar | 🔴 Alto | 🟡 Médio | Semanas 2–3 |
| 4 | Fase 3a | Seção diferenciadora ("por que Pinheiro Azul") | 🟠 Alto | 🟡 Médio | Semana 3 |
| 5 | — | **Pré-requisito:** migration Supabase (`radar_ativo boolean`) antes da Fase 3b | — | 🟢 Baixo | Semana 3 |
| 6 | Fase 3b | Radar de Oportunidades (pós-diagnóstico) | 🟠 Médio | 🟢 Baixo | Semana 3 |
| 7 | Fase 3c | Prova social com jornadas de clientes | 🟠 Médio | 🟡 Médio | Semana 4 |
| 8 | Fase 4 | Blog — 6 novos posts em 3 meses | 🟡 Médio | 🟡 Médio | Contínuo |

---

## 6. Métricas para Acompanhar o Sucesso

As mudanças são mensuráveis. Acompanhar semanalmente:

- **Taxa de abertura do diagnóstico** — quantas pessoas clicam no CTA principal
- **Taxa de conclusão do diagnóstico** — quantas chegam até a tela de resultado
- **Taxa de conversão de contato** — quantas deixam nome/email/WhatsApp
- **Perfil mais frequente** — onde concentrar esforço de conteúdo e captação
- **Origem do lead** — home / LP específica / blog (para saber qual canal rende mais)
- **Ativação do Radar** — após implementação: mede interesse em relação de longo prazo
- **Leads do lado da oferta** — quantos proprietários chegam pelo SellerLanding após reposicionamento

---

## Nota Final

O site tem uma base técnica muito boa. O funil funciona, os dados são capturados, o design é premium. O gap hoje não é técnico — é de posicionamento e linguagem.

As fases 1 e 5 sozinhas, feitas em uma semana, já mudam a percepção de quem chega ao site. As fases 2 e 3 completam a transformação visual e estratégica. A Fase 4 é o ativo de longo prazo que vai construir a autoridade de André como referência da Zona Leste.

A lógica central que norteia tudo:
> *A Pinheiro Azul não vende imóveis. Ela conhece a Zona Leste melhor do que ninguém e conecta pessoas ao endereço que muda suas vidas.*
