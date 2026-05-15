# Pinheiro Azul - Princípios, Estratégia e Arquitetura do Funil

Este documento consolida os princípios, decisões e pilares estratégicos trazidos pelo cliente para orientar o desenvolvimento do site, das landing pages, do CRM/funil e das automações da Pinheiro Azul.

## 1. Direção Estratégica

A Pinheiro Azul deve ser tratada como uma operação imobiliária orientada por tecnologia, dados e performance.

O site não é apenas uma vitrine institucional. Ele é o motor de geração, classificação e amadurecimento de leads. Cada página deve contribuir para transformar visitantes anônimos em oportunidades comerciais com contexto suficiente para uma abordagem SDR ou corretor.

Princípios centrais:

- Gerar o máximo possível de leads qualificados.
- Classificar o lead antes da abordagem humana.
- Usar o tráfego inicial como fonte de aprendizado operacional.
- Criar uma base de dados que sustente automação, CRM e escala futura.
- Priorizar processo, diagnóstico e curadoria acima de simples listagem de imóveis.

## 2. Rota Definitiva e Organização do Site

Após testes, a experiência da `/index4` foi definida como a base visual e conceitual definitiva.

Decisão operacional:

- A raiz `/` deve renderizar a experiência definitiva baseada na antiga `/index4`.
- A rota `/index4` pode existir como alias técnico ou redirecionamento.
- As versões antigas devem ficar fora de acesso público, sem apagar os arquivos.
- Toda nova implementação deve seguir o padrão visual, narrativo e interativo da `/index4`.

Arquitetura pública planejada:

- Home: entrada principal e segmentação de perfis.
- Primeiro Imóvel: compradores de primeira aquisição.
- Upgrade/Moradia: famílias ou clientes buscando melhoria de moradia.
- Investimento: compradores com foco em rentabilidade, liquidez e valorização.
- Anuncie seu Imóvel: proprietários interessados em vender com inteligência.
- Blog: SEO, educação e nutrição de leads.

## 3. Perfis de Landing Pages

### Primeiro Imóvel

Público:

- Pessoas comprando o primeiro imóvel.
- Leads de lançamentos populares.
- Clientes que precisam entender financiamento, FGTS, entrada, documentação e região.

Objetivo:

- Gerar volume de dados.
- Validar processos.
- Testar diagnóstico, automações e abordagem SDR.

Conteúdos esperados:

- Jornada de compra.
- Planejamento financeiro.
- Subsídio/FGTS.
- Aprovação.
- Conquista.
- Imóveis e regiões como Itaquera e Penha.

### Upgrade/Moradia

Público:

- Famílias buscando mais espaço, conforto e qualidade de vida.
- Pessoas que já moram em imóvel próprio ou alugado e querem mudar para algo melhor.

Objetivo:

- Posicionar a Pinheiro Azul como consultoria de rotina, bairro e qualidade de vida.

Conteúdos esperados:

- Varanda gourmet.
- Área de lazer.
- 2 ou 3 dormitórios.
- Comparação entre prontos, planta e localização.
- Regiões como Vila Matilde, Carrão, Guilhermina e Vila Formosa.

### Investimento

Público:

- Pessoas interessadas em renda, valorização ou proteção patrimonial.
- Leads com ticket maior e lógica mais analítica.

Objetivo:

- Educar o lead para comparar liquidez, aluguel e potencial de valorização.

Conteúdos esperados:

- Rentabilidade.
- Liquidez do metro quadrado.
- Valorização na planta.
- Risco de vacância.
- Regiões como Tatuapé e Anália Franco.

### Anuncie Seu Imóvel

Público:

- Proprietários que querem vender imóvel de terceiros.

Objetivo:

- Criar captação de imóveis com maior comissão potencial.
- Preparar a operação para médio e alto padrão.

Conteúdos esperados:

- Venda com inteligência.
- Avaliação do imóvel.
- Relatório de valorização.
- Marketing direcionado.
- Segurança jurídica.
- Processo: cadastro, avaliação, produção e venda acelerada.

## 4. Fluxo Lógico de Conversão

O fluxo desenhado pelo cliente deve orientar toda a estrutura do projeto:

1. Visitantes anônimos chegam por tráfego pago, orgânico, blog ou indicação.
2. Entram pela home, landing page regional, landing page de perfil ou blog.
3. Clicam em CTA de diagnóstico, comparativo, guia ou avaliação.
4. Preenchem formulário de diagnóstico inteligente.
5. As informações são salvas na base de leads.
6. O servidor classifica automaticamente o perfil do lead.
7. O lead entra em um "basket" ou categoria operacional:
   - Primeiro imóvel.
   - Upgrade/Moradia.
   - Investimento.
   - Venda de imóvel.
8. O sistema registra qual guia ou material de valor deve ser enviado.
9. O lead recebe valor por email ou WhatsApp quando a automação estiver conectada.
10. A SDR aborda com contexto.
11. O lead é encaminhado para visita ou especialista.
12. O processo alimenta vendas e aprendizado operacional.

## 5. Diagnóstico e Captura

O diagnóstico é uma peça central do funil.

Regras:

- O usuário responde perguntas antes de receber o resultado.
- A captura de contato acontece antes da exibição final do diagnóstico.
- O resultado deve classificar o lead em um dos perfis estratégicos.
- O sistema deve registrar origem, respostas, perfil, guia solicitado e status do lead.
- O formulário deve reduzir fricção, mas coletar dados suficientes para abordagem SDR.

Campos mínimos desejados:

- Nome.
- Email.
- WhatsApp.
- Perfil classificado.
- Origem da página.
- Objetivo.
- Renda ou faixa de preço.
- Região de interesse.
- Prazo.
- Tipo de imóvel.
- Respostas do diagnóstico.
- Status do lead.
- Guia solicitado.
- Datas de criação e atualização.

## 6. Envio de Valor

O envio de valor é parte essencial da conversão.

Materiais previstos:

- Guia de imóveis para Primeiro Imóvel.
- Guia de viabilidade para Upgrade/Moradia.
- Guia de rentabilidade para Investimento.
- Guia de venda com inteligência para proprietários.

Decisão técnica:

- A estrutura deve ficar pronta para envio por email.
- O provedor final ainda pode ser Resend ou SMTP próprio.
- Enquanto o provedor não estiver definido, o sistema deve salvar a intenção de envio em uma fila.
- Não prometer envio instantâneo se a automação ainda não estiver ativa.

## 7. Papel da SDR

A SDR não deve receber apenas "nome e telefone".

Ela deve receber contexto:

- Perfil do lead.
- Origem.
- Objetivo.
- Faixa de preço.
- Região.
- Prazo.
- Guia solicitado.
- Respostas do diagnóstico.

Objetivo da abordagem:

- Identificar qual perfil chamou mais atenção.
- Tirar dúvidas sobre o fluxo.
- Agendar visita com especialista.
- Encaminhar para corretor ou especialista adequado.

## 8. Blog e SEO

O blog deve funcionar como topo e meio de funil.

Funções:

- Atrair tráfego orgânico.
- Educar leads.
- Criar autoridade regional.
- Direcionar o visitante para diagnóstico ou landing page específica.

Cada artigo deve ter CTA contextual:

- Artigos de compra: diagnóstico de primeiro imóvel.
- Artigos de moradia/bairros: diagnóstico de upgrade/moradia.
- Artigos de venda: avaliação ou diagnóstico de venda de imóvel.
- Artigos de investimento: análise de investimento.

## 9. Modelo de Comissão e Parceria

O cliente apresentou a parceria como um modelo estratégico, não apenas prestação de serviço.

Regra geral de comissão:

- 50% da comissão total: corretor responsável pela venda/visita.
- 50% da comissão total: Pinheiro Azul, administração e operação.

Distribuição da parte administrativa:

- 25%: Desenvolvimento e Marketing.
- 25%: Gestão Estratégica.
- 20%: Qualificação SDR.
- 15%: Custos Operacionais.
- 15%: Reserva de Caixa.

Exemplo apresentado:

- Imóvel de R$ 300.000.
- Comissão total de R$ 6.000.
- Corretor: R$ 3.000.
- Desenvolvimento e Marketing: R$ 750.
- Gestão Estratégica: R$ 750.
- SDR: R$ 600.
- Custos e reserva: R$ 900.

## 10. Visão de Escala

O foco inicial em lançamentos populares não busca apenas lucro imediato.

Objetivo do curto prazo:

- Volume de dados.
- Validação do processo.
- Refinamento do diagnóstico.
- Ajuste de automações.
- Disciplina de CRM.
- Treinamento da máquina comercial.

Objetivo de médio e longo prazo:

- Escalar para médio e alto padrão.
- Entrar em imóveis de terceiros.
- Aumentar rentabilidade com comissões maiores.
- Reutilizar a mesma infraestrutura de dados e atendimento.

Ponto estratégico:

- Lançamentos de construtoras costumam pagar entre 1,5% e 3%.
- Imóveis de terceiros costumam trabalhar com comissão de 5% a 6%.
- A grande virada está na origem do imóvel, não apenas no valor do imóvel.

## 11. Implicações para Produto e Desenvolvimento

Toda decisão de produto deve ser avaliada por estes critérios:

- Ajuda a capturar mais leads?
- Ajuda a classificar melhor o lead?
- Ajuda a SDR a abordar com mais contexto?
- Ajuda a registrar dados úteis para o CRM?
- Ajuda a operação a aprender e melhorar?
- Mantém coerência com o padrão visual da `/index4`?
- Serve tanto para o volume inicial quanto para a escala futura?

Evitar:

- Páginas apenas institucionais sem CTA forte.
- Formulários genéricos sem classificação.
- Listagem de imóveis sem diagnóstico.
- CTAs vagos como "Fale conosco" quando houver uma ação mais forte.
- Rotas antigas acessíveis publicamente.
- Promessas de automação que ainda não estejam implementadas.

Priorizar:

- Diagnóstico.
- Guias de valor.
- Segmentação.
- Dados estruturados.
- Landing pages por perfil.
- Blog com CTA contextual.
- Captação de imóveis de terceiros.
- Experiência visual e interativa consistente com a `/index4`.
