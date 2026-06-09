# Blueprint /1inteligencia

## 1. Visao geral

A rota `/1inteligencia` sera uma nova experiencia de orientacao para compradores do primeiro imovel, com foco em Minha Casa Minha Vida na Zona Leste de Sao Paulo.

Ela nao deve funcionar como uma landing page tradicional, nem como um simulador bancario, nem como uma avaliacao independente de imovel. A proposta e criar uma ferramenta de assessoria inicial que ajuda a pessoa a entender seu momento, organizar os proximos passos e escolher o nivel adequado de apoio.

A ideia central:

> A Pinheiro Azul ajuda o comprador a entender, planejar e percorrer o caminho ate o primeiro imovel. O comprador continua no controle.

## 2. Mudanca de posicionamento

### Antes

A proposta anterior girava em torno de uma "analise profunda" ou "avaliacao independente" de um imovel especifico.

Esse caminho foi descartado como eixo principal por tres motivos:

- cria conflito de credibilidade se a mesma empresa avalia e vende;
- aumenta risco operacional e juridico;
- promete uma precisao que o scanner nao pode entregar.

### Agora

O foco passa a ser assessoria de compra.

A Pinheiro Azul nao se posiciona como juiz neutro de uma transacao, mas como uma orientadora do comprador:

- explica o processo;
- ajuda a organizar o orcamento;
- mostra custos esquecidos;
- orienta sobre documentacao;
- ajuda a entender possibilidades do MCMV;
- recomenda um proximo passo proporcional ao momento da pessoa;
- pode acompanhar a busca e as visitas em um servico mais completo.

## 3. Publico

Compradores de primeiro imovel, especialmente no contexto de Minha Casa Minha Vida na Zona Leste de Sao Paulo.

Perfil esperado:

- renda familiar em fase de organizacao;
- pouca familiaridade com financiamento, entrada, subsidio e custos adicionais;
- medo de errar em uma decisao grande;
- desejo de sair do aluguel ou construir patrimonio;
- necessidade de explicacao simples, direta e confiavel;
- preferencia por autonomia, mas abertura para ajuda quando percebe valor.

## 4. Promessa do produto

Promessa principal:

> Entenda seu momento de compra e descubra qual proximo passo faz mais sentido para voce.

Promessas secundarias:

- sem CPF no inicio;
- sem obrigacao de contratar;
- sem promessa de aprovacao;
- sem previsao de valorizacao;
- sem empurrar o servico mais caro;
- com explicacao clara do motivo da recomendacao.

Frase de principio:

> A Pinheiro Azul orienta. Voce decide como seguir, quando avancar e com quem comprar.

## 5. O que a experiencia nao deve ser

Evitar:

- hero section generica com imagem, dois botoes e blocos de beneficios;
- depoimentos mockados;
- navbar extensa;
- dashboard com falsa precisao;
- score de compra;
- veredito "verde/amarelo/vermelho";
- "aprovado" ou "reprovado";
- promessas de valorizacao;
- simulacao apresentada como aprovacao bancaria;
- linguagem de urgencia artificial;
- gamificacao com pontos, trofeus, medalhas ou confete;
- chatbot fake;
- visual excessivamente tech/IA.

## 6. Conceito de UX

A experiencia deve parecer uma sessao guiada, nao um formulario.

Conceito:

> Um caminho que se constroi conforme a pessoa responde.

A rota comeca ajudando. Nao comeca falando sobre a empresa.

O usuario fornece tres dados iniciais e depois responde apenas as perguntas necessarias para definir seu proximo passo. Cada resposta avanca visualmente o caminho.

O caminho e uma metafora de progresso e clareza, nao um jogo.

## 7. Principios de design

### 7.1 Uma coisa por vez

Cada tela deve ter uma acao principal clara.

O usuario nao deve ver pergunta, painel lateral, mapa completo, resumo financeiro e oferta comercial ao mesmo tempo.

### 7.2 Perguntar pouco

Regra:

> Perguntar apenas quando a resposta puder mudar a recomendacao.

Fluxo normal:

- 3 entradas financeiras obrigatorias;
- 1 pergunta sobre momento;
- ate 2 perguntas adaptativas;
- resultado.

### 7.3 Respostas em primeira pessoa

Evitar alternativas frias como:

- "Exploratorio";
- "Preparacao";
- "Busca ativa";
- "Negociacao".

Preferir frases de identificacao:

- "Estou comecando a entender como comprar";
- "Quero me organizar antes de procurar";
- "Ja estou procurando imoveis";
- "Ja encontrei um imovel e estou negociando".

### 7.4 Transparencia sem defesa

A interface deve deixar claro que a pessoa esta no controle, mas sem frases que soem defensivas ou suspeitas.

Evitar:

> Sem CPF, sem compromisso e sem obrigacao de comprar com a Pinheiro Azul.

Preferir:

> Voce pode usar este mapa para seguir sozinho, conversar com um assessor ou pedir acompanhamento na compra.

### 7.5 Estimativa, nao promessa

Toda leitura financeira inicial deve ser comunicada como educativa e preliminar.

Evitar:

- "voce consegue comprar";
- "zona segura";
- "pode comprar com tranquilidade";
- "aprovacao provavel".

Preferir:

- "cenario inicial";
- "estimativa educativa";
- "pontos que merecem atencao";
- "proximos passos para confirmar".

## 8. Jornada principal

### Etapa 1: Entrada direta

Tela inicial sem hero tradicional.

Mensagem:

> Vamos entender seu caminho para o primeiro imovel.

Campos:

- renda familiar;
- entrada disponivel;
- valor de imovel imaginado.

Microcopy:

> Voce nao precisa informar CPF para comecar.

### Etapa 2: Cenario preliminar

Depois dos tres dados, o usuario recebe um primeiro retorno antes de responder novas perguntas.

Conteudo:

- o que ja sabemos;
- alerta de que e uma estimativa;
- principais pontos financeiros que precisarao ser organizados.

Exemplo:

> Com os valores informados, ja da para organizar os primeiros pontos da sua compra. Esta ainda nao e uma simulacao bancaria, mas um ponto de partida para entender seu caminho.

### Etapa 3: Momento da compra

Pergunta:

> Qual frase mais parece com voce hoje?

Opcoes:

- Estou comecando a entender como comprar;
- Quero me organizar antes de procurar;
- Ja estou procurando imoveis;
- Ja encontrei um imovel e estou negociando.

### Etapa 4: Pergunta adaptativa

A proxima pergunta depende da resposta anterior.

#### Se "Estou comecando a entender"

Pergunta:

> O que voce mais quer entender primeiro?

Opcoes:

- Financiamento e MCMV;
- Entrada e outros custos;
- Documentacao;
- O processo inteiro.

#### Se "Quero me organizar antes de procurar"

Pergunta:

> O que mais impede voce de avancar hoje?

Opcoes:

- Nao sei quanto posso pagar;
- Ainda preciso formar a entrada;
- Tenho duvidas sobre MCMV;
- Nao sei quais documentos organizar;
- Nao sei por onde comecar.

#### Se "Ja estou procurando imoveis"

Pergunta:

> Que tipo de ajuda faria mais diferenca agora?

Opcoes:

- Organizar criterios e orcamento;
- Comparar opcoes;
- Entender propostas e custos;
- Ter acompanhamento nas visitas.

#### Se "Ja encontrei um imovel e estou negociando"

Resposta cuidadosa:

> Nosso acompanhamento principal foi pensado para quem ainda esta se preparando ou procurando. Ainda assim, podemos ajudar voce a entender os proximos cuidados e quais perguntas fazer antes de avancar.

Possiveis caminhos:

- conteudo gratuito;
- consultoria online de orientacao;
- aviso claro de que nao se trata de avaliacao independente.

### Etapa 5: Preferencia de apoio

Essa pergunta so aparece quando houver ambiguidade entre guia, consultoria e assessoria.

Pergunta:

> Como voce prefere seguir agora?

Opcoes:

- Quero me organizar sozinho;
- Quero conversar sobre meu caso;
- Quero acompanhamento na busca e nas visitas.

### Etapa 6: Mapa de Compra

Resultado final.

Nome:

> Seu Mapa de Compra

Blocos:

- Seu momento;
- O que ja esta claro;
- O que precisa de atencao;
- Proximos passos;
- Recomendacao.

Exemplo de recomendacao:

> Recomendamos a consultoria online porque voce pretende se organizar antes de procurar, indicou duvidas sobre entrada e financiamento, e ainda precisa transformar os numeros em um plano de compra.

## 9. Escada de atendimento

### 9.1 Conteudo gratuito

Para quem esta explorando ou ainda nao precisa contratar.

Exemplos:

- checklist;
- explicacao sobre financiamento;
- custos alem da entrada;
- perguntas para fazer ao corretor;
- primeiros passos para MCMV.

### 9.2 Guia pratico acessivel

Produto de baixo custo para quem quer autonomia.

Formato recomendado:

- guia objetivo;
- checklist;
- planilha simples;
- roteiro de preparacao;
- linguagem sem juridiquês;
- foco em acao, nao em texto longo.

### 9.3 Consultoria online

Para quem precisa aplicar as informacoes ao proprio caso.

Escopo:

- leitura do momento financeiro;
- organizacao de entrada e custos;
- duvidas sobre MCMV;
- plano de proximos passos;
- preparacao para buscar imoveis.

### 9.4 Assessoria completa com visitas

Para quem quer acompanhamento de ponta a ponta.

Escopo:

- definicao de criterios;
- curadoria ou apoio na busca;
- visitas;
- comparacao de opcoes;
- entendimento de propostas;
- acompanhamento ate a decisao.

Observacao:

Se houver remuneracao por corretagem, isso deve ser informado com clareza antes da contratacao.

## 10. Arquitetura visual

### Direcao estetica

Estilo:

> Editorial documental com acentos neubrutalistas.

Nao usar neubrutalismo puro.

Caracteristicas:

- fundo creme;
- tipografia forte;
- bordas finas;
- blocos com aspecto documental;
- sombras solidas discretas apenas em elementos importantes;
- cores usadas com parcimonia;
- interface clara e calma.

Paleta base:

- azul-marinho: `#06192C`;
- creme: `#F4F0E8`;
- branco quente: `#FFFDF7`;
- coral: `#E43D30`;
- teal: `#28C7BA`;
- amarelo suave: `#F3D35B`.

### Layout recomendado

Inicio e perguntas:

- layout centralizado;
- uma coluna;
- caminho compacto no topo;
- card principal de interacao;
- opcoes como cards clicaveis.

Resultado:

- pode usar layout mais amplo;
- mapa ganha protagonismo;
- blocos de interpretacao aparecem de forma organizada;
- recomendacao principal e alternativa acessivel.

## 11. Caminho visual

O caminho substitui uma barra de progresso comum.

Etapas:

- Cenario;
- Momento;
- Caminho;
- Mapa.

Durante o fluxo:

- caminho pequeno e discreto;
- trecho concluido em coral;
- trecho futuro em linha tracejada;
- marcador ativo na etapa atual;
- animacao curta ao responder.

No resultado:

- caminho completo aparece como sintese;
- cada ponto vira um marco do Mapa de Compra.

Regra:

> O caminho deve apoiar a decisao, nao competir com a pergunta.

## 12. Motion design

Movimentos permitidos:

- desenho do trecho do caminho apos resposta;
- entrada suave do proximo bloco;
- destaque breve no card selecionado;
- transicao curta entre estados;
- montagem progressiva do mapa final.

Evitar:

- parallax pesado;
- textos digitando;
- espera artificial de "analisando";
- confete;
- mascote;
- animacoes que parecam jogo;
- movimentos que dificultem leitura.

Respeitar `prefers-reduced-motion`.

## 13. Estados principais da interface

### Estado A: Inicio

Objetivo:

- reduzir friccao;
- iniciar a experiencia rapidamente.

Elementos:

- logo;
- frase curta;
- tres campos;
- microcopy de privacidade;
- botao principal.

### Estado B: Cenario inicial

Objetivo:

- entregar valor antes de pedir mais informacoes.

Elementos:

- resumo dos tres dados;
- leitura preliminar;
- aviso de estimativa;
- convite para entender o momento.

### Estado C: Pergunta de momento

Objetivo:

- identificar a fase da jornada.

Elementos:

- pergunta simples;
- cards em primeira pessoa;
- caminho compacto.

### Estado D: Pergunta adaptativa

Objetivo:

- reduzir ambiguidade;
- direcionar proximo passo.

Elementos:

- uma pergunta;
- opcoes em primeira pessoa;
- retorno curto apos selecao.

### Estado E: Mapa de Compra

Objetivo:

- organizar entendimento;
- recomendar caminho proporcional.

Elementos:

- momento;
- pontos claros;
- pontos de atencao;
- proximos passos;
- recomendacao explicada;
- CTA principal;
- alternativa mais acessivel.

## 14. Linguagem

Tom:

- claro;
- humano;
- direto;
- sem excesso juridico;
- sem promessa milagrosa;
- sem tom de vendedor.

Exemplos de frases boas:

- "Vamos entender seu momento antes de falar de imovel."
- "Esta e uma estimativa inicial, nao uma aprovacao de financiamento."
- "Pelo que voce informou, o melhor proximo passo parece ser..."
- "Voce pode seguir sozinho, conversar com um assessor ou pedir acompanhamento."
- "A assessoria completa provavelmente ainda nao e necessaria nesta fase."

Frases a evitar:

- "Voce esta aprovado."
- "Compre com tranquilidade."
- "Oportunidade unica."
- "Seu score de compra."
- "Esse imovel vai valorizar."
- "Ultimas vagas."

## 15. Regras de recomendacao

A recomendacao nao deve ser baseada apenas em renda.

Ela deve considerar:

- momento da jornada;
- complexidade percebida;
- desejo de autonomia;
- necessidade de acompanhamento;
- distancia entre objetivo e cenario financeiro.

Exemplos:

- explorando + quer autonomia: conteudo gratuito ou guia;
- organizando + duvidas amplas: guia;
- organizando + caso especifico: consultoria online;
- procurando + precisa comparar: consultoria online;
- procurando + quer visitas: assessoria completa;
- negociando: orientacao cuidadosa, sem avaliacao independente.

Regra de confianca:

> Quando o servico mais caro ainda nao fizer sentido, a interface deve dizer isso.

## 16. Dados e privacidade

Na primeira experiencia, evitar dados sensiveis.

Nao pedir no inicio:

- CPF;
- endereco completo;
- data de nascimento;
- estado civil;
- historico de credito;
- telefone obrigatorio.

Dados iniciais:

- renda familiar;
- entrada disponivel;
- valor de imovel imaginado;
- momento da compra;
- principal duvida;
- preferencia de apoio.

Identificacao deve aparecer depois do resultado, quando houver valor entregue.

Exemplo:

> Quer receber seu Mapa de Compra para consultar depois?

Campos:

- nome;
- WhatsApp ou e-mail.

Sempre explicar o uso.

## 17. Conversao

O CTA principal deve vir depois do Mapa de Compra.

Formato:

- recomendacao principal;
- motivo da recomendacao;
- CTA;
- alternativa acessivel.

Exemplo:

> Proximo passo recomendado: Consultoria online
>
> Indicamos esse caminho porque voce quer se organizar antes de procurar e ainda tem duvidas sobre entrada, financiamento e documentos.
>
> [Conhecer a consultoria]
>
> Prefere comecar sozinho? Veja o Guia Pratico.

## 18. Relacao com o site atual

`/1inteligencia` deve ter identidade propria de ferramenta, mas nao pode parecer outra marca.

Pode herdar:

- cores principais;
- tom humano;
- referencia ao caminho da home;
- linguagem de Zona Leste;
- visual editorial.

Deve evitar:

- navbar institucional completa;
- secoes longas;
- estrutura tradicional de home;
- excesso de elementos promocionais.

## 19. Primeira versao recomendada

Implementar primeiro um fluxo enxuto:

1. tela de inicio com tres dados;
2. cenario preliminar;
3. pergunta de momento;
4. uma pergunta adaptativa;
5. Mapa de Compra;
6. recomendacao.

Nao implementar inicialmente:

- login;
- pagamento;
- CRM;
- envio automatico;
- relatorio PDF;
- calculos complexos;
- integracoes externas.

Primeiro objetivo:

> Validar se a jornada, linguagem e recomendacoes fazem sentido para usuarios reais.

## 20. Criterios de sucesso

Medir:

- taxa de inicio do scanner;
- taxa de conclusao;
- abandono por etapa;
- clique na recomendacao;
- escolha da alternativa acessivel;
- pedidos de contato;
- respostas mais frequentes;
- se usuarios entendem que e estimativa;
- se usuarios sentem controle, nao pressao.

Perguntas qualitativas:

- "Voce entendeu seu proximo passo?"
- "Alguma pergunta pareceu invasiva?"
- "A recomendacao pareceu justa?"
- "Voce sentiu que estavam tentando te vender algo?"
- "O que ficou mais claro depois do scanner?"

## 21. Norte final

A experiencia deve provar a promessa da marca pelo uso.

Nao e:

> Veja como somos especialistas.

E:

> Comece aqui. Vamos organizar seu caminho.

Se a pessoa sair sem comprar nada, mas entender melhor o proprio momento, a experiencia ja cumpriu parte da funcao. Se ela decidir contratar, a venda acontece porque a orientacao fez sentido, nao porque o fluxo pressionou.

