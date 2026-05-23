# Documento de Contexto — Pinheiro Azul
## Briefing completo para continuidade estratégica e implementação

> Este documento foi criado para transferir integralmente o contexto de uma sessão de trabalho estratégico sobre o site da Pinheiro Azul. Cobre o estado atual do projeto, os insights desenvolvidos, o novo posicionamento, as diretrizes editoriais e o plano de ação. Não deixe de ler até o final — os detalhes do final são tão importantes quanto os do início.

---

## 1. Quem são as pessoas por trás do projeto

**André F.** — Corretor de imóveis, dono da Pinheiro Azul. Especializado na Zona Leste de São Paulo. Tem conhecimento profundo dos bairros, dos portfólios das principais construtoras da região, e — diferencialmente — domina cálculos de financiamento: SAC, Price, FGTS, ITBI, amortização. Tem uma missão pessoal de ensinar as pessoas a entenderem os números envolvidos na compra de um imóvel. É direto, objetivo, explica bem sem enrolação. Se sente confortável sendo o rosto da marca. Brilha tanto por telefone quanto pessoalmente, em igual medida.

**Emanuel** — Irmão do André, responsável pelo desenvolvimento e estratégia digital da Pinheiro Azul. Está conduzindo a evolução do site e da proposta de valor da marca.

---

## 2. O Projeto Técnico

**Repositório:** `https://github.com/ManyRagDev/pinheiro-azul-zona-leste`
**Branch de desenvolvimento:** `claude/check-website-ready-Fsj0z`
**Stack:** React 18 + Vite + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion + Supabase + React Router DOM + MDX

### Estrutura de páginas ativas

| Rota | Componente | Função |
|---|---|---|
| `/` | HomeIndex4.tsx | Home principal — ponto de segmentação |
| `/primeiro-imovel` | PrimeiroImovelV2.tsx | Landing para compradores de primeiro imóvel |
| `/upgrade-moradia` | UpgradeMoradiaV2.tsx | Landing para famílias buscando upgrade |
| `/investimento` | InvestimentoV2.tsx | Landing para investidores |
| `/anuncie-seu-imovel` | SellerLandingV2.tsx | Landing para proprietários/captação |
| `/sobre` | About.tsx | Metodologia P.A.Z. e história |
| `/blog` | Blog.tsx | Hub de conteúdo (3 posts ativos) |
| `/blog/:slug` | BlogPost.tsx | Post individual em MDX |
| `/contato` | Contact.tsx | Formulário de contato genérico |
| `/privacidade` | Privacy.tsx | Política de privacidade |

### O sistema de funil (o ativo mais valioso do projeto)

**Componente:** `src/components/funnel/FunnelDiagnosticModal.tsx`
**Lógica:** `src/lib/funnel.ts`

O modal de diagnóstico é o núcleo de conversão do site. Fluxo:
1. **Perguntas** (5 etapas): Objetivo, Faixa de preço, Região de interesse, Prazo, Tipo de imóvel
2. **Contato:** Nome, Email, WhatsApp
3. **Resultado:** Perfil classificado + resumo + guia correspondente

Classificação automática em 4 perfis:
- `primeiro_imovel` → guia-5-imoveis-itaquera-penha
- `upgrade_moradia` → guia-viabilidade-vila-matilde
- `investimento` → guia-rentabilidade-tatuape
- `venda_imovel` → guia-venda-com-inteligencia

**Dados salvos no Supabase:**
- Tabela `leads_pinheiro_azul_funnel`: todos os dados do diagnóstico
- Tabela `email_delivery_queue`: fila para envio de guias (provider pendente de configuração)

O modal pode ser aberto com parâmetros de URL:
- `?diagnostico=1` — abre automaticamente
- `?perfil=primeiro_imovel` — pré-seleciona perfil

### Design system

**Paleta principal:**
- `#06192C` — Azul navy (cor primária da marca)
- `#E43D30` — Vermelho coral (acento, CTAs)
- `#F4F0E8` — Bege quente (background claro)
- `#28C7BA` — Verde-água (acento secundário, destaques)
- `#F3D35B` — Amarelo (CTAs de alta conversão)

**Padrões visuais:** Grid com linhas finas, textura noise, scanline animado, tipografia preta uppercase com tracking largo, sombras coloridas (não pretas), animações com Framer Motion.

**O que não mudar no design:** A identidade é forte, consistente e premium. Não alterar paleta, tipografia nem lógica de layout.

### Assets disponíveis

- `consultation.jpg` — foto de atendimento consultivo
- `hero-couple.jpg` — casal (hero)
- `hero_video.mp4` — vídeo de fundo (7.75MB)
- 3 imagens de blog (webp)

---

## 3. O Problema Central do Site Atual

**O site fala com a empresa, não com o cliente.**

A copy foi escrita com linguagem B2B/interna — adequada para um pitch a investidores ou sócios, inadequada para alguém sonhando com um imóvel.

### Exemplos concretos do que precisa mudar

| Atual | Problema |
|---|---|
| "LPs por perfil" | O comprador não sabe o que é LP |
| "Cada clique vira uma hipótese de venda" | Expõe a mecânica interna, afasta o cliente |
| "Funil imobiliário para geração de leads" | Jargão de marketing B2B no rodapé |
| "Operação SDR" | Jargão de inside sales completamente invisível ao consumidor |
| "Captura estruturada antes da abordagem" | Descreve o processo da empresa, não o benefício do cliente |
| "As landing pages alimentam a mesma base de leads" | Expõe a engenharia onde deveria haver uma promessa |

### O que está bom e não deve ser tocado

| Elemento | Por quê manter |
|---|---|
| Modal de diagnóstico | Fluxo, perguntas, classificação e integração Supabase estão corretos |
| Arquitetura de rotas e perfis | Segmentação em 4 personas é estrategicamente sólida |
| Mapa animado da Zona Leste | Diferenciador visual único no mercado imobiliário |
| Hero steps da home | Especialmente: "Seu tempo é precioso. Você não precisa ver tudo." |
| Hero h1 | "Seu próximo endereço pode melhorar sua vida." — tom certo |
| Integração Supabase | Tabelas bem estruturadas, captura funcionando |
| Blog com MDX | Infraestrutura boa com CTAs contextuais |
| Design system | Identidade premium e consistente |

---

## 4. Os Insights Estratégicos — A Nova Guinada

### 4.1 O insight raiz (da conversa entre Emanuel e André)

> *"A maioria dos corretores pega o imóvel e anuncia. Você vai anunciar a realização da pessoa. O imóvel você encontra."*

Isso é o coração do novo posicionamento. Há um paradoxo no mercado imobiliário digital: o consumidor tem acesso a milhares de imóveis em portais (Zap, OLX, QuintoAndar, VivaReal) e mesmo assim está mais perdido do que nunca. Informação em excesso sem curadoria é ansiedade, não conveniência.

A maioria dos corretores compete no jogo do inventário. A Pinheiro Azul compete no jogo da **curadoria especializada sobre um território**.

### 4.2 O produto é o conhecimento, não o inventário

André não precisa de imóveis listados para atender bem. Se alguém o abordasse na rua pedindo "quero um apartamento de 2 quartos perto do metrô em Tatuapé até 450k", ele já teria nomes de empreendimento na cabeça imediatamente — sem pesquisar. Esse é o ativo real.

**Consequência para o site:** Imóveis listados são "isca" — existem para fazer a pessoa sonhar e se identificar, não para criar expectativa de catálogo completo. A promessa não é "veja tudo que temos disponível". É "me conta o que você quer, e eu encontro".

### 4.3 O diferencial que o site atual esconde

O site comunica o *processo*, mas não comunica o *ativo humano por trás dele*. **André não existe no site.** Em nenhum momento aparece quem ele é, que ele tem imóveis "na agulha", que o diferencial é um profissional que conhece o mercado de cor.

O site parece uma máquina de captura de leads. Quando a pessoa faz o diagnóstico e recebe o resultado, ela não sabe que do outro lado tem alguém que já tem respostas antes de precisar pesquisar.

### 4.4 O estereótipo que André subverte

No imaginário popular, o corretor de imóveis é aquele que fala muito, promete tudo e some depois. André é o oposto: direto, especializado tanto nos imóveis quanto nos números, e com uma missão pessoal de ensinar as pessoas a entenderem financiamento. Isso subverte uma expectativa negativa já existente — e quando você faz isso, não precisa forçar nada. A diferença fala por si.

### 4.5 Os 4 Princípios Norteadores do Novo Site

**1. O produto é o conhecimento, não o inventário**
A Pinheiro Azul não é um catálogo. É curadoria especializada. Isso precisa ficar claro desde o primeiro segundo.

**2. Imóveis como isca, não como catálogo**
Imagens de imóveis existem para a pessoa sonhar e se identificar. O CTA de cada card não é "comprar este imóvel" — é "ver imóveis como este" → abre o diagnóstico.

**3. O diagnóstico como produto premium**
Em vez de formulário genérico, o diagnóstico deve ser comunicado como um serviço diferenciado que outros corretores não oferecem.

**4. A Zona Leste como território, não como endereço**
André tem conhecimento profundo de um território específico. Isso é raro e valioso. O site deve comunicar autoridade sobre a Zona Leste — seus bairros, dinâmicas, preços, expansões futuras.

---

## 5. A Presença do André no Site — Diretrizes Editoriais

### 5.1 O que NÃO fazer (o "cringe")

O mercado imobiliário está cheio de:
- Foto com terno e sorriso forçado
- "Especialista com X anos de mercado"
- "Seu sonho é minha missão"
- Depoimentos que parecem roteirizados
- Bio institucional com currículo

Qualquer coisa que lembre isso afasta exatamente o público que a Pinheiro Azul quer atrair.

### 5.2 O Princípio Editorial Central

> **Não diga que ele sabe. Mostre ele sabendo.**

A autoridade genuína não se declara — ela se demonstra. A pessoa lê e *chega à conclusão sozinha* de que esse cara sabe do que está falando. O "cringe" acontece quando você tenta convencer alguém de que você é bom antes de provar.

### 5.3 O Tom Correto — Confiança Calma

A tensão mais importante a manter:

| Evitar | Buscar |
|---|---|
| Prontidão ansiosa | Confiança calma |
| "Já tenho a resposta antes de você perguntar" | "Fala com ele. Muda a conversa." |
| Impressionar antes de provar | Convidar sem prometer demais |
| Adiantado | Presente |

O vendedor está sempre adiantado. O trusted advisor espera o momento certo.

**Exemplo concreto da diferença:**
- ❌ "André provavelmente já tem uma resposta antes de você terminar a pergunta."
- ✅ "Fala com o André. Ele conhece a Zona Leste de um jeito que muda a conversa."

A segunda frase deixa a pessoa curiosa sobre o que é esse "jeito" — sem entregar tudo, sem ansiedade, sem promessa exagerada.

### 5.4 Onde André aparece — Presença Pontual e Cirúrgica

Não uma seção "Conheça nosso especialista" com foto e currículo. A presença é pontual — aparece nos momentos certos, diz o necessário, e some.

**3 pontos de presença:**

**1. Final do modal de diagnóstico (tela de resultado)**
Após a classificação do perfil, em vez de tela genérica da marca:
> *"Olá, sou o André. Com esse perfil já tenho algumas direções em mente. Vamos conversar?"*
— Simples. Humano. Sem exagero.

**2. Artigos do blog assinados por ele**
Não como "conteúdo da empresa" — como a visão de alguém que conhece de verdade. Um artigo explicando SAC vs Price escrito pelo André tem credibilidade que nenhum post institucional tem. Sua missão pessoal de ensinar financiamento é o melhor argumento para isso.

**3. Uma linha na home — não uma seção**
Não uma bio. Uma âncora humana. Sugestão atual:
> *"Fala com o André. Ele conhece a Zona Leste de um jeito que muda a conversa."*
Curto, específico, verdadeiro.

### 5.5 O Exercício Mais Importante — Ainda Pendente

**Perguntar ao André qual frase ele usa naturalmente nos atendimentos.**

Às vezes uma frase que ele repete no telefone — algo que parece banal para ele porque é o jeito dele — é exatamente o que vai fazer uma pessoa estranha na internet pensar *"esse cara é diferente"*.

A melhor copy já existe na boca dele. Esse é o exercício que estava sendo iniciado quando este documento foi criado. O novo chat deve continuar a partir daqui quando Emanuel trouxer a resposta do André.

---

## 6. Plano de Ação — Resumo das 5 Fases

*(O documento completo está em `PLANO_ACAO_NOVO_SITE.md` na raiz do projeto)*

| # | Fase | Ação | Impacto | Esforço | Prazo |
|---|---|---|---|---|---|
| 1 | Copy | Reescrever toda a linguagem B2B da home | Alto | Baixo | Semana 1 |
| 2 | Copy | Reposicionar SellerLanding (argumento invertido) | Alto | Baixo | Semana 1 |
| 3 | Visual | Seção de destaques por perfil — 5 imóveis exemplo por categoria | Alto | Médio | Semanas 2–3 |
| 4 | Estratégia | Seção diferenciadora + Radar de Oportunidades + Prova Social | Alto | Médio | Semana 3–4 |
| 5 | Conteúdo | Blog — calendário com 6 posts em 3 meses | Médio | Médio | Contínuo |

### Fase 1 — Mudanças de copy mais urgentes na home

| Seção | Título atual | Proposta |
|---|---|---|
| Perfis | "LPs por perfil" / "Cada clique vira uma hipótese de venda" | "Qual é o seu momento?" / "Cada pessoa chega com um propósito. A gente tem um caminho para cada um." |
| Base de dados | "Captura estruturada antes da abordagem" | "O diagnóstico que muda o rumo da sua busca" |
| SDR | "Operação SDR" | "Atendimento consultivo" |
| Rodapé | "Funil imobiliário para geração de leads na Zona Leste" | "Corretagem especializada na Zona Leste de São Paulo." |

### Fase 3 — Seção de destaques por perfil (a isca visual)

Nova seção na home com 3 abas: **Primeiro Imóvel · Upgrade · Investimento**

Cada aba: 5 cards de imóvel com imagem, badge de bairro, faixa de preço, 3 atributos e CTA "Ver imóveis como este →" que abre o diagnóstico com perfil pré-selecionado.

Título da seção: *"Exemplos do que encontramos para cada momento"*
Subtítulo: *"Não temos um catálogo fixo — porque o mercado muda todo dia. Mas temos olho treinado para o que existe em cada região da Zona Leste."*

### Fase 4 — Novas seções

**Seção diferenciadora:** comparativo direto entre corretor tradicional e Pinheiro Azul, sem dizer explicitamente que outros são ruins. A diferença aparece na descrição do jeito de trabalhar.

**Radar de Oportunidades:** ao final do diagnóstico, proposta de continuidade:
> *"Quando um imóvel com o seu perfil aparecer na Zona Leste, você é avisado antes de todo mundo."*
Requer campo `radar_ativo` (booleano) na tabela `leads_pinheiro_azul_funnel`.

**Prova social:** depoimentos focados no processo (jornada), não no imóvel vendido. Estrutura: situação anterior → resultado concreto → quote de impacto.

---

## 7. O Posicionamento em Uma Frase

> *A Pinheiro Azul não vende imóveis. Ela conhece a Zona Leste melhor do que ninguém e conecta pessoas ao endereço que muda suas vidas.*

E a frase que ancora a presença do André:

> *"Fala com o André. Ele conhece a Zona Leste de um jeito que muda a conversa."*

---

## 8. O Próximo Passo Imediato

Antes de implementar qualquer elemento relacionado ao André, Emanuel vai perguntar a ele:

**"Qual frase você repete com frequência nos atendimentos? O que você diz naturalmente que as pessoas acham diferente?"**

A resposta vai calibrar o tom de toda a presença humana do site. Pode ser a melhor copy do projeto — e vai sair da boca de quem vive o atendimento, não de um documento estratégico.

---

## 9. Contexto Adicional — Modelo de Negócio

- **Comissão:** 50% André (corretor) / 50% Pinheiro Azul (operação)
- **Pinheiro Azul split:** 25% Dev/Marketing, 25% Estratégia, 20% SDR, 15% Operação, 15% Reserva
- **Estratégia de escala:** curto prazo = volume em lançamentos (1,5–3% comissão) para aprender; longo prazo = captação de terceiros (5–6% comissão) para 3–5x receita
- **Email automation:** fila estruturada no Supabase (`email_delivery_queue`), provider não configurado ainda — intencional ("queue first, send later")
- **André tem acesso direto** aos principais portfólios das construtoras da Zona Leste

---

*Documento criado em sessão de trabalho estratégico. Complementa o arquivo `PLANO_ACAO_NOVO_SITE.md` que contém o plano de ação técnico detalhado com copy sugerida para cada seção.*
