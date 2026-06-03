# Pinheiro Azul

**Estrutura completa do site**  
Documento executável para implementação  
**Data:** 27 de maio de 2026

---

## 1. Visão Geral do Ecossistema

### 1.1 Mapa de Navegação Completo

O site da Pinheiro Azul é organizado em 4 camadas hierárquicas:

1. **Home Page** — hub central; roteia para páginas de persona e páginas de bairro.
2. **Páginas de Persona** — `/primeiro-imovel`, `/upgrade`, `/investimento`, `/anuncie`.
3. **Páginas de Bairro** — `/bairro/tatuape`, `/bairro/vila-matilde`, etc. — dezenas de páginas.
4. **Páginas de Conversão** — `/diagnostico`, `/relatorio-mercado`, `/auditoria-venda`.

**Fluxo principal:** Home → Roteador → Página de Persona → Diagnóstico → Relatório → Agendamento

### 1.2 Fluxo de Usuário por Persona

| Persona | Origem provável | Entrada no site | Fluxo de conversão |
|---|---|---|---|
| Investidor | Google — rentabilidade | Home ou Investimento | Ver Relatório de Mercado → Entrar em contato |

### 1.3 Princípios de UX e Conversão

- **Redução de fricção:** formulários apenas em páginas internas; na Home, apenas nome + WhatsApp + persona.
- **Aumento de confiança:** depoimentos com dados específicos — valor, bairro, tempo; exibição do Índice Pinheiro Azul™.
- **Tempo de permanência:** conteúdo dividido em blocos curtos, com máximo de 4 linhas cada, e títulos descritivos que guiam a leitura.
- **Mobile-first:** todas as seções colapsam em acordeão ou abas no celular, evitando scroll infinito.
- **CTA sempre visível:** botão de diagnóstico fixo no footer sticky, tanto no desktop quanto no mobile.

---

## 2. Página Inicial — Home

### 2.1 Hero Section

**Headline:**  
A Zona Leste está mudando. Seu patrimônio precisa acompanhar.

**Texto:**  
Todo bairro da Zona Leste tem uma história silenciosa de valorização. Metrô chegando, comércio novo, ruas que se verticalizam. A maioria das pessoas enxerga apenas prédios. Nós enxergamos oportunidades. Antes de ver imóveis, descubra como seu perfil se encaixa nessa transformação.

**Elemento visual:**  
Vídeo de drone em looping mostrando bairros como Tatuapé, Vila Matilde e Penha, com sobreposição de dados — índices, valorização, liquidez. No canto inferior direito, botão “▶” para pausar.

### 2.2 Pergunta de Diagnóstico Rápida — Pré-segmentação

**Pergunta:**  
Qual é sua prioridade agora?

- ( ) Sair do aluguel e ter o primeiro imóvel
- ( ) Trocar de imóvel sem perder a rotina da família
- ( ) Investir para renda passiva e valorização
- ( ) Vender meu imóvel atual com segurança

**Anotação técnica:**  
Ao selecionar uma opção, o usuário é levado automaticamente para a página de persona correspondente, mas o roteador abaixo ainda fica visível como fallback.

### 2.3 Roteador de Personas — 4 Cards

Cada card deve conter:

- Título
- Subtítulo — dor principal
- Ilustração representativa — ícone ou foto
- Link para página de persona

#### Card 1 — Primeiro Imóvel

**Primeiro Imóvel**  
Sair do aluguel com segurança e construir o primeiro degrau do seu patrimônio.

#### Card 2 — Upgrade

**Upgrade**  
Mais espaço, melhor bairro, sem o caos da transição.

#### Card 3 — Investimento

**Investimento**  
Renda passiva e valorização com dados reais da Zona Leste.

#### Card 4 — Anuncie seu Imóvel

**Anuncie seu Imóvel**  
Destrave a liquidez do seu imóvel com uma venda justa e ágil.

### 2.4 Prova Social — Depoimentos Específicos

#### Depoimento 1 — Primeiro Imóvel

> “Eu pagava R$ 1.200 de aluguel em Itaquera e achava que nunca teria um imóvel. A Pinheiro Azul me mostrou que com esse mesmo valor eu conseguia entrada em um apartamento de 2 dormitórios. Hoje moro lá e meu imóvel já valorizou 18% em dois anos.”  
> — Carla M., 28 anos

#### Depoimento 2 — Upgrade

> “Tínhamos medo de vender nosso apartamento na Penha e não conseguir comprar outro antes do prazo. Eles sincronizaram tudo: fechamos a venda e a compra no mesmo dia, sem aluguel temporário.”  
> — Ricardo e Juliana, 34 e 32 anos

#### Depoimento 3 — Investidor

> “Já comprei três imóveis com eles. O relatório de liquidez e o Índice Pinheiro Azul me ajudaram a evitar bairros com vacância alta. Meu portfólio tem rendimento de 0,8% ao mês sobre o valor de mercado.”  
> — André L., 45 anos

### 2.5 Inteligência Territorial — Resumida

**Texto em destaque:**  
O Tatuapé atingiu nota 8,7 no Índice Pinheiro Azul™ — maior liquidez e apreciação projetada dos próximos 12 meses. Quer ver o Raio-X completo do seu bairro?

**CTA:**  
Explorar Inteligência Territorial

**Destino:**  
Link para página de bairro mais relevante, detectada por geolocalização.

### 2.6 CTA Principal — Diagnóstico de Patrimônio

**Diagnóstico de Patrimônio**  
Leva 2 minutos. Nosso sistema analisa seu perfil e te entrega os cenários mais líquidos e seguros, antes de visitar qualquer imóvel.

**Botão:**  
QUERO FAZER O DIAGNÓSTICO

**Anotação técnica:**  
Esse CTA é fixo no footer após scroll de 60% da página.

### 2.7 Footer

- Logo Pinheiro Azul — pequeno
- Links: Sobre, Blog, Contato, Política de Privacidade
- Redes sociais
- Endereço e telefone
- “© 2026 Pinheiro Azul — Inteligência Patrimonial para a Nova Zona Leste”

---

## 3. Página Primeiro Imóvel

### 3.1 Hero Section

**Headline:**  
Seu primeiro imóvel é maior que um teto. É o ativo que vai financiar seu próximo passo.

**Texto:**  
A maioria das pessoas compra o primeiro imóvel achando que é a casa da vida toda. Nós vemos diferente: é o primeiro degrau patrimonial. A boa notícia é que você não precisa ter tudo decidido hoje. Basta entender quanto seu aluguel está te custando e o que você realmente pode fazer.

**Elemento visual:**  
Ilustração de uma escada com degraus: “Aluguel” → “Entrada” → “Imóvel” → “Valorização” → “Upgrade”. Em cada degrau, um ícone.

### 3.2 Seção “Qual é o seu desafio?” — Quebra de Objeções

Três cards com as objeções mais comuns e respostas implícitas.

#### Card 1 — “Não tenho entrada”

Muitas pessoas subestimam o poder do FGTS e do consórcio. Na Pinheiro Azul, calculamos exatamente quanto você já tem de patrimônio acumulado — mesmo que não saiba.

#### Card 2 — “E se a parcela ficar pesada?”

O Diagnóstico de Patrimônio considera sua renda líquida, comprometimento máximo e uma margem de segurança de 10%. Se o cenário não couber, ajustamos o perfil antes de ver imóveis.

#### Card 3 — “E se eu escolher o bairro errado?”

Usamos o Índice Pinheiro Azul™ para classificar cada bairro por liquidez e apreciação futura. Assim, você compra com a tranquilidade de que, se precisar vender, terá um mercado fluido.

### 3.3 Método P.A.Z. — 3 Passos

#### Planejar

Mapeamos sua vida financeira: renda, FGTS, dívidas, metas. Definimos o valor de entrada ideal e a parcela máxima.

#### Analisar

Aplicamos o Raio-X Territorial nos bairros que combinam com seu perfil. Mostramos dados reais de valorização, liquidez e vacância.

#### Zelar

Acompanhamos todo o processo de financiamento, documentação e vistoria. Você não precisa se preocupar com burocracia.

**Elemento visual:**  
Três ícones sequenciais — mapa, lupa, escudo — com setas conectando.

### 3.4 Calculadora de Atraso Patrimonial — Funcionamento

**Chamada:**  
Simule agora: Quanto seu aluguel está te custando em 5, 10 e 20 anos?

**Descrição para o designer:**  
Caixa interativa com três campos controladores:

- Valor do aluguel
- Valor da parcela — se financiar
- Prazo em anos

Ao interagir, um gráfico de barras mostra a diferença acumulada entre aluguel e financiamento.

**Exemplo padrão:**  
R$ 1.500 de aluguel → R$ 180.000 “queimados” em 10 anos. Com financiamento de R$ 1.800, o patrimônio líquido após 10 anos é de aproximadamente R$ 120.000.

### 3.5 Seleção de Cenários de Vida — 3 Exemplos

Cada cenário é um card com dados reais.

| Cenário | Bairro | Perfil | Recomendação |
|---|---|---|---|
| Investimento desde o primeiro imóvel | Penha | Renda R$ 4.500, planejamento de 5 anos | Imóvel de 2 dormitórios com potencial de locação futura |

**CTA do card:**  
Ver detalhes do cenário

**Destino:**  
Leva para página interna do imóvel. Não implementado neste momento; usar apenas placeholder.

### 3.6 Prova Social

Depoimento específico, já listado na Home, mas aqui com mais contexto.

> “Saí do aluguel depois de 4 anos. A Pinheiro Azul me mostrou que com R$ 1.200 de parcela eu conseguia um imóvel em Itaquera, e ainda me ajudou com a documentação do FGTS. Hoje meu imóvel já valorizou 8%.”  
> — Luana S., 26 anos

### 3.7 CTA Principal

**Botão:**  
FAZER DIAGNÓSTICO DE PATRIMÔNIO

**Texto de apoio:**  
Grátis. Leva 2 minutos. Sem compromisso.

### 3.8 Footer

Footer idêntico ao da Home.

---

## 4. Página Upgrade

### 4.1 Hero Section

**Headline:**  
Trocar de imóvel não precisa ser um caos. A transição certa protege seu patrimônio e sua rotina.

**Texto:**  
Seu apartamento atual já serviu. Agora você precisa de mais espaço, um bairro melhor, ou simplesmente de algo que acompanhe o crescimento da sua família. O problema é que a maioria das pessoas tenta fazer tudo ao mesmo tempo — vender, comprar, mudar — e acaba perdendo dinheiro ou ficando meses em aluguel temporário.

**Elemento visual:**  
Duas mãos que se encaixam formando um escudo — simbolizando a “Blindagem de Transição”.

### 4.2 Seção “O Maior Erro do Upgrade”

O maior erro é tratar a venda e a compra como processos separados. Se você vende rápido demais, pode aceitar um preço baixo. Se demora a vender, perde o imóvel dos sonhos. A solução é sincronizar tudo com a mesma engenharia financeira.

**Dados visuais:**  
Gráfico comparativo mostrando:

- **Cenário tradicional:** 6 meses de aluguel temporário + perda de R$ 30.000 em descontos.
- **Cenário com Blindagem de Transição:** venda e compra no mesmo mês, sem aluguel temporário, valorização do novo imóvel já contabilizada.

### 4.3 Método P.A.Z. — Adaptado para Upgrade

#### Planejar

Avaliamos seu imóvel atual com Liquidez Real e definimos o preço justo de venda. Mapeamos os bairros compatíveis com seu orçamento e necessidades.

#### Analisar

Cruzamos dados de mercado: tempo médio de venda do seu perfil de imóvel, preço médio por metro quadrado no bairro desejado, escolas, transporte, lazer.

#### Zelar

Gerenciamos toda a transição: preparação do imóvel para venda — pequenas reformas, fotos profissionais, staging virtual —, captação de leads qualificados e sincronização jurídica das escrituras.

### 4.4 Simulador de Engenharia de Transição

**Chamada:**  
Simule sua transição: Quanto tempo sua venda deve levar? Qual o valor justo do seu imóvel atual? Qual o valor do novo imóvel cabe no seu orçamento?

**Descrição para designer:**  
Três campos:

- Valor estimado do seu imóvel atual
- Valor do imóvel desejado
- Prazo desejado

Ao submeter, o sistema retorna um relatório com:

- Tempo estimado de venda
- Valor líquido após impostos e comissão
- Plano de sincronização — comprar primeiro, vender primeiro ou simultâneo
- Aluguel temporário caso necessário — com valor estimado

### 4.5 Seleção de Cenários de Vida — 3 Exemplos

| Cenário | Bairro | Perfil | Recomendação |
|---|---|---|---|
| Mudança estratégica para valorização | Vila Matilde | Família que comprou há 5 anos; imóvel valorizou 40% | Vender e comprar maior, próximo ao metrô |

### 4.6 Prova Social

> “Queríamos trocar de imóvel mas estávamos apavorados com a possibilidade de ficar sem casa. A Pinheiro Azul sincronizou tudo: vendeu nosso apartamento em 45 dias e fechou a compra do novo no mesmo cartório. Não pagamos aluguel temporário.”  
> — Ricardo e Juliana, 34 e 32 anos

### 4.7 CTA Principal

**Botão:**  
SOLICITAR ENGENHARIA DE TRANSIÇÃO

**Texto de apoio:**  
Análise gratuita, sem compromisso.

### 4.8 Footer

Footer padrão.

---

## 5. Página Investimento

### 5.1 Hero Section

**Headline:**  
Zona Leste: a tese de investimento mais consistente dos próximos 10 anos.

**Texto:**  
Enquanto o mercado olha para bairros já saturados, a Zona Leste está recebendo bilhões em infraestrutura: novas linhas de metrô, corredores de ônibus, shopping centers e complexos empresariais. Quem entra agora, compra na curva de valorização. Nossos dados apontam os 3 eixos com maior potencial abaixo do radar.

**Elemento visual:**  
Mapa da Zona Leste com heatmap sobreposto — vermelho = alta oportunidade; azul = baixa. Três círculos pulsantes nos bairros: Tatuapé — mais maduro; Penha — crescimento médio; Itaquera — alto potencial futuro.

### 5.2 Seção “Por que a Zona Leste é a Tese Certa”

Três blocos com dados.

#### Mobilidade em expansão

- Linha 2-Verde — Vila Prudente até Dutra — 7 estações na Zona Leste.
- Linha 15-Prata — monotrilho — conectando São Mateus ao centro.
- Investimento total previsto: R$ 15 bilhões.

#### Verticalização acelerada

- Nos últimos 3 anos, o número de lançamentos residenciais no Tatuapé e Penha cresceu 62%.
- Preço médio do m² no Tatuapé: R$ 8.500 — vs. R$ 12.000 no Itaim Bibi.

#### Renda e consumo

- Renda média familiar na Zona Leste: R$ 4.800 — crescimento real de 3,2% ao ano.
- Vacância comercial em shoppings da região: 4% — contra 12% na média de São Paulo.

### 5.3 Índice Pinheiro Azul™ — Explicação + Tabela Comparativa

| Bairro | Índice Geral | Liquidez — 40% | Apreciação — 35% | Risco — 25% | Recomendação |
|---|---:|---:|---:|---:|---|
| Tatuapé | 8,7 | 9,0 | 8,5 | 8,5 | Excelente para renda e curto prazo |
| Penha | 8,2 | 8,0 | 9,0 | 7,5 | Alta valorização; cuidado com vacância |
| Vila Matilde | 7,9 | 7,5 | 8,5 | 8,0 | Crescimento moderado; baixo risco |
| Carrão | 7,5 | 8,0 | 7,5 | 7,0 | Boa liquidez; valorização consistente |
| Itaquera | 6,8 | 6,5 | 8,0 | 5,5 | Potencial futuro; risco de execução |

**Anotação técnica:**  
Essa tabela deve ser dinâmica no site, podendo ser filtrada por “maior liquidez”, “maior apreciação” e “menor risco”. Dados são atualizados trimestralmente.

### 5.4 Radar de Oportunidades — Funcionamento

**Texto:**  
Radar ativo: identificamos os eixos com maior potencial de valorização nos próximos 12 meses. Atualmente em destaque: Eixo Tatuapé-Penha — apreciação projetada de 12%.

**Descrição para designer:**  
Componente com três slides que alternam automaticamente. Cada slide mostra:

- Nome do eixo — exemplo: “Eixo Tatuapé-Penha”
- Ícone de gráfico de linha
- Dados: valorização projetada, taxa de vacância, número de lançamentos
- Ponto no mapa animado

### 5.5 Seleção de Cenários de Vida — 3 Exemplos

| Cenário | Bairro | Perfil | Recomendação |
|---|---|---|---|
| Diversificação geográfica | Itaquera | Investidor com portfólio diversificado; R$ 300 mil | Risco maior; potencial de 50% em 5 anos |

### 5.6 Prova Social

> “Já comprei três imóveis com eles. O relatório de liquidez e o Índice Pinheiro Azul me ajudaram a evitar bairros com vacância alta. Meu portfólio tem rendimento de 0,8% ao mês sobre o valor de mercado.”  
> — André L., 45 anos

### 5.7 CTA Principal

**Botão:**  
VER RELATÓRIO DE MERCADO

**Texto de apoio:**  
Relatório mensal gratuito com os 3 eixos de maior potencial.

### 5.8 Footer

Footer padrão.

---

## 6. Página Anuncie Seu Imóvel

### 6.1 Hero Section

**Headline:**  
Seu imóvel tem liquidez. Nós apenas ajudamos a destravá-la.

**Texto:**  
Se o seu imóvel está parado no mercado, o problema não é ele. É o posicionamento. Nós fazemos uma auditoria completa: precificação, staging, canais de divulgação e filtragem de leads. Você recebe uma oferta justa e um prazo realista.

**Elemento visual:**  
Ilustração de uma chave entrando em uma fechadura estilizada com o nome do bairro dentro.

### 6.2 Seção “Por que seu imóvel não vende”

Três cards com reframes.

#### Card 1 — “Preço fora da realidade”

Usamos o Índice Pinheiro Azul™ para definir o preço ideal baseado em liquidez real do bairro, não em apego emocional. Um imóvel superfaturado perde visitas e fica “queimado” no mercado.

#### Card 2 — “Fotos e descrições genéricas”

Oferecemos fotos profissionais, vídeos 360° e descrições que destacam os diferenciais que realmente importam — luz natural, vizinhança, metragem real.

#### Card 3 — “Leads desqualificados”

Nosso filtro de leads garante que apenas compradores com perfil compatível e capacidade financeira comprovada visitem. Menos visitas, mais ofertas sérias.

### 6.3 Método P.A.Z. — Adaptado para Venda

#### Planejar

Avaliamos seu imóvel e definimos o melhor momento de venda. Preparamos plano de staging — reformas leves, pintura, decoração.

#### Analisar

Cruzamos dados de mercado para definir preço, canais de divulgação e estratégia de negociação.

#### Zelar

Acompanhamos visitas, feedbacks e negociações. Fechamos o negócio com segurança jurídica e financeira.

### 6.4 Auditoria de Venda — Descrição

**Texto:**  
Auditoria gratuita: em 48 horas, avaliamos seu imóvel e entregamos um relatório com preço justo, prazo estimado de venda e recomendações de melhoria.

**Para o designer:**  
Formulário de solicitação com campos:

- Nome
- WhatsApp
- E-mail
- Endereço do imóvel — apenas bairro e rua
- Tempo que está no mercado
- Já teve alguma oferta?
- O que já tentou? — lista de checkboxes

Após envio, o usuário recebe e-mail com resumo e link para agendar conversa.

### 6.5 Seleção de Cenários de Vida — 3 Exemplos

| Cenário | Perfil | Prazo estimado | Faixa de valor |
|---|---|---:|---:|
| Troca planejada — vender para comprar maior | Proprietário no Carrão, imóvel de 70 m² | 45-60 dias | R$ 320.000 a R$ 340.000 |

### 6.6 Prova Social

> “Meu apartamento estava há 8 meses no mercado com outra imobiliária. A Pinheiro Azul fez a auditoria, ajustou o preço e vendeu em 22 dias. Recebi o valor líquido que esperava.”  
> — Marta F., 52 anos

### 6.7 CTA Principal

**Botão:**  
SOLICITAR AUDITORIA DE VENDA

**Texto de apoio:**  
Gratuita. Sem compromisso. Resultado em 48 horas.

### 6.8 Footer

Footer padrão.

---

## 7. Páginas de Bairro — Template

### 7.1 Gancho — Alinhamento de Expectativa

**Headline:**  
`[Bairro] está mudando. Seu imóvel ideal precisa acompanhar.`

**Subheadline:**  
`Você encontrou o [número] de [tipo de imóvel] na [bairro]. Antes de ver fotos, descubra os dados que ninguém te conta.`

**Exemplo para Vila Matilde:**

> Vila Matilde está mudando. Seu imóvel ideal precisa acompanhar.  
> Você encontrou o apartamento de 2 dormitórios na Vila Matilde. Antes de ver fotos, descubra os dados que ninguém te conta.

### 7.2 Raio-X Territorial — Dados Específicos

Para cada bairro, gerar conteúdo único.

**Exemplo para Tatuapé:**  
Raio-X Territorial Tatuapé: Preço médio do m²: R$ 8.500. Variação anual: +15%. Tempo médio de venda: 45 dias. Vacância de imóveis residenciais: 3,2%. Índice de liquidez: 9,0. Os imóveis mais procurados: 2 e 3 dormitórios com vaga. O perfil do comprador: famílias jovens e investidores de médio porte.

### 7.3 Índice Pinheiro Azul™ — Nota + Breakdown

Abaixo, uma linha explicativa:

> Índice 7,9 — Liquidez boa, apreciação acima da média, risco controlado. Recomendado para investidores conservadores.

### 7.4 Termômetro da Zona Leste — Oportunidade

Escala gráfica de 0 a 10, com marcador na nota do bairro.

**Exemplo:**  
Termômetro: 8 de 10 — momento excelente para comprar.

### 7.5 Seleção de Imóveis — 3 a 6 Destaques

Cards com:

- Foto — principal
- Título — exemplo: “2 dormitórios perto do metrô”
- Preço — exemplo: “R$ 380.000”
- Área — exemplo: “65 m²”
- Diferencial — exemplo: “Luz natural, sacada, vaga de garagem”
- Índice do imóvel — exemplo: “Liquidez 9,5 — baixíssimo risco de vacância”
- CTA — “Solicitar visita qualificada”

### 7.6 CTA — Diagnóstico Contextualizado

**Botão:**  
FAZER DIAGNÓSTICO PATRIMONIAL DA VILA MATILDE

**Texto de apoio:**  
Descubra se o perfil do bairro combina com sua realidade.

### 7.7 Footer

Footer padrão.

**Anotação técnica:**  
Cada página de bairro é um template que puxa dados de uma base — banco ou JSON. Deve ser gerada estaticamente — SSG — para SEO.

**Variáveis:**

- `bairro_nome`
- `bairro_slug`
- `preco_medio_m2`
- `variacao_anual`
- `tempo_medio_venda`
- `vacancia`
- `indice_liquidez`
- `indice_apreciacao`
- `indice_risco`
- `termometro`
- `imoveis` — array

O conteúdo fixo — headline, subheadline, Raio-X — também é parametrizado por bairro, mas com templates únicos para evitar duplicação.

---

## 8. Fluxo de Diagnóstico

### 8.1 Página Interna `/diagnostico`

**Headline:**  
Diagnóstico de Patrimônio

**Subheadline:**  
Leva 2 minutos. Descubra seu perfil e os melhores cenários para você.

**Formulário:**  
5 perguntas de múltipla escolha.

#### Pergunta 1 — “Qual é seu principal objetivo?”

- Sair do aluguel
- Trocar de imóvel
- Investir
- Vender

#### Pergunta 2 — “Qual sua faixa de renda familiar mensal?”

- Até R$ 4.000
- R$ 4.001 a R$ 8.000
- R$ 8.001 a R$ 15.000
- Acima de R$ 15.000

#### Pergunta 3 — “Você tem FGTS ou poupança para entrada?”

- Sim, acima de R$ 30.000
- Sim, entre R$ 10.000 e R$ 30.000
- Sim, menos de R$ 10.000
- Não tenho ainda

#### Pergunta 4 — “Em qual região da Zona Leste você está focado?”

- Tatuapé / Carrão
- Penha / Vila Matilde
- Itaquera / São Mateus
- Outro bairro
- Não sei ainda

#### Pergunta 5 — “Qual seu prazo ideal para realizar a transação?”

- Até 3 meses
- 3 a 6 meses
- 6 a 12 meses
- Mais de 12 meses

**Anotação técnica:**  
Após responder, o sistema gera um relatório visual em `/diagnostico/resultado`. O lead é enviado ao RD Station com todas as respostas como tags.

**Exemplo de tags:**  
`obj_primeiro_imovel`, `renda_4k_8k`, `fgts_sim_30k`, `bairro_penha`, `prazo_3_6_meses`

### 8.2 Relatório Visual Pós-Diagnóstico

Componentes do relatório:

- **Perfil do investidor:** exemplo: “Você se encaixa no perfil Primeiro Imóvel — sair do aluguel com segurança”.
- **Bairros recomendados:** exemplo: “Com base na sua renda e FGTS, os bairros com maior liquidez e preços compatíveis são: Penha, Vila Matilde, Itaquera”.
- **Cenário financeiro:** exemplo: “Valor máximo de imóvel: R$ 250.000. Parcela estimada: R$ 1.200”.
- **Próximos passos:** exemplo: “Agende uma conversa com a Laísa para detalharmos seu plano”.

**CTA no relatório:**  
AGENDAR CONVERSA COM A LAÍSA

---

## 9. Navegação e UX

### 9.1 Menu Principal — Estrutura

- Home — sempre visível
- Primeiro Imóvel — dropdown: “Sair do aluguel”, “Financiamento”, “Consórcio”
- Upgrade — dropdown: “Trocar de imóvel”, “Engenharia de Transição”, “Escolas e bairros”
- Investimento — dropdown: “Relatório de Mercado”, “Índice Pinheiro Azul™”, “Radar de Oportunidades”
- Anuncie seu Imóvel — simples
- Blog — ícone de lupa para pesquisa
- Diagnóstico — destacado em botão verde

### 9.2 Breadcrumbs — Quando Aplicável

Em páginas de bairro e imóvel:

`Home > Zona Leste > [Bairro] > [Imóvel]`

**Exemplo:**  
`Home > Zona Leste > Vila Matilde > Apartamento 2 dormitórios`

### 9.3 CTAs Secundários — Exploração

- **Home:** ao final de cada bloco, “Explorar [tema]”. Exemplo: “Explorar Inteligência Territorial”.
- **Página de persona:** “Ver todos os Cenários de Vida” — link para página com lista completa de imóveis.
- **Página de bairro:** “Comparar bairros” — abre modal com tabela comparativa dos Índices.

### 9.4 Fluxo de Conversão por Persona

| Persona | Caminho | Etapa intermediária | Conversão |
|---|---|---|---|
| Investidor | Google — rentabilidade → Investimento → Relatório de Mercado | Relatório → Contato → Apresentação de teses | Solicitar apresentação |

---

## 10. Integração com RD Station e Monday.com

### 10.1 Tags por Página

| Página | Tags automáticas |
|---|---|
| Upgrade | `pagina_upgrade` |
| Anuncie | `pagina_anuncie` |
| Página de Bairro — exemplo: Vila Matilde | `pagina_bairro_vila_matilde` |

### 10.2 Segmentação de Leads

Após o Diagnóstico, o lead pode ser segmentado em:

- **Frio:** apenas visitou e não converteu — tagueado como `lead_frio`.
- **Morno:** respondeu diagnóstico — tagueado como `lead_morno_diagnostico`.
- **Quente:** agendou conversa — tagueado como `lead_quente_agendamento`.

### 10.3 Automações de E-mail

#### E-mail 1 — Imediato — Relatório de Diagnóstico

**Assunto:**  
Seu diagnóstico de patrimônio está pronto

**Conteúdo:**  
Resumo do relatório + botão “Agendar conversa”.

#### E-mail 2 — D+3

**Assunto:**  
Você sabia que a Zona Leste valorizou 12% no último ano?

**Conteúdo:**  
Depoimento + dados do bairro recomendado.

#### E-mail 3 — D+7

**Assunto:**  
O que seu perfil diz sobre seu futuro patrimonial

**Conteúdo:**  
Caso de sucesso similar + CTA para agendamento.

### 10.4 Fluxo no Monday.com

Cada lead convertido gera um card no Monday com:

- Nome
- Contato
- Origem — página onde converteu
- Persona — detectada
- Tags de segmentação
- Pipeline de estágio — Novo → Qualificação → Proposta → Fechamento

**Responsável:**  
Laísa — SDR — automaticamente atribuída para leads de Primeiro Imóvel e Upgrade. Investidores e Proprietários vão para o consultor sênior.

---

# Anexos

## A. Lista de Vocabulário Proprietário — Dicionário Pinheiro Azul

| Termo | Definição | Uso |
|---|---|---|
| Camada P.A.Z. | Método em 3 etapas — Planejar, Analisar, Zelar | Processo de venda |
| Blindagem de Transição | Sincronização venda + compra | Exclusivo para Upgrade |
| Cenário de Vida | Apresentação de imóvel baseada em diagnóstico | Substitui “oferta/anúncio” |
| Engenharia de Transição | Planejamento financeiro da mudança | Para Upgrade |

## B. Glossário para Designer — Elementos Visuais

- **Hero:** sempre com imagem/vídeo de fundo, headline grande, subheadline e CTA.
- **Cards:** fundo branco, sombra sutil, ícone no topo, título em negrito, subtítulo em cinza.
- **Tabelas:** usar `<table>` com cabeçalho escuro `#1A1A1A` e linhas alternadas em cinza claro.
- **Callout:** `blockquote` com borda esquerda de 3px — `#9E9E9E` para neutro, `#424242` para destaque, `#B71C1C` para alerta.
- **Botões:** fundo preto `#1A1A1A`, texto branco, padding `12px 32px`, `border-radius: 4px`, sem borda, hover escurecendo para `#000`.
- **Formulário de Diagnóstico:** estilo tipo quiz; pergunta em destaque, opções em botões largos — pill shape — e seleção em preto.

## C. Dados Reais de Referência — para Exemplificação

| Bairro | Preço médio m² | Variação anual | Liquidez |
|---|---:|---:|---:|
| Tatuapé | R$ 8.500 | +15% | 9,0 |
| Vila Matilde | R$ 7.200 | +12% | 7,5 |
| Penha | R$ 6.800 | +18% | 8,0 |
| Carrão | R$ 7.000 | +10% | 8,0 |
| Itaquera | R$ 5.500 | +20% | 6,5 |

---

Documento elaborado em 27 de maio de 2026. As informações contidas são de responsabilidade da Pinheiro Azul.
