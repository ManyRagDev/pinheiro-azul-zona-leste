# Especificação: HomeV2 (Teste A/B)

## Objetivo
Criar uma versão alternativa da página inicial (`HomeV2.tsx`) para um teste A/B. O redesign deve transmitir uma **estética moderna, coesa e premium** — como as landing pages de produtos SaaS/startups de ponta que parecem uma peça única de design, não apenas "seções empilhadas".

---

## Filosofia de Design

> **"Uma experiência visual unificada, não um template genérico."**

### O que queremos transmitir:
- **Modernidade:** Sensação de 2024/2025. Nada de "site corporativo tradicional".
- **Coesão:** Tudo parece pertencer ao mesmo universo visual — cores, espaçamentos, formas.
- **Premium:** Parece caro, bem feito, intencional. Cada pixel tem propósito.
- **Confiança:** Para um setor imobiliário, o design deve inspirar segurança e profissionalismo, mas sem ser "frio".

### Princípios (não regras rígidas):
1. **Unidade Visual:** A página deve fluir como uma narrativa, não como blocos isolados.
2. **Respiro Generoso:** Espaçamentos amplos. Menos é mais.
3. **Hierarquia Clara:** O olho do usuário sabe exatamente para onde ir primeiro.
4. **Movimento Sutil:** Microanimações que dão vida sem distrair (hover, scroll, entrada).
5. **Dark Mode Elegante:** Fundos escuros com acentos de cor vibrante (pode ser o azul da marca, laranja, ou gradientes).
6. **Bento Grid Inspirado:** Organização em "cards" de tamanhos variados, criando um layout interessante e dinâmico.

### Referência Estética:
- Landing pages de startups modernas (ex: Linear, Vercel, Framer, Raycast).
- O print fornecido mostra 4 exemplos desse estilo: fundos escuros, tipografia impactante, cards com glassmorphism, gradientes abstratos.

---

## Conteúdo a Preservar (Inventário Completo)

> [!IMPORTANT]
> **REGRA DE OURO:** 100% do conteúdo textual, funcional e informativo da Home atual DEVE ser mantido. Mudamos apenas a UX/UI, nunca o conteúdo.

### Hero Section
- [ ] Título: **"Encontre seu lar na Zona Leste de São Paulo"**
- [ ] Subtítulo: **"Sua jornada imobiliária começa aqui, com a segurança e o zelo que você merece."**
- [ ] Botão CTA primário: **"Buscar Imóveis"** (com ícone de Search)
- [ ] Botão CTA secundário: **"Saiba Mais"**
- [ ] Vídeo de fundo: `hero_video.mp4`

### Metodologia P.A.Z.©
- [ ] Título: **"Nossa Metodologia: P.A.Z.©"**
- [ ] Subtítulo: **"Uma abordagem exclusiva que combina planejamento estratégico, análise profunda e zelo humano para superar suas expectativas."**
- [ ] Card P - Planejamento: Ícone Map + **"Entendemos seus objetivos e criamos estratégias personalizadas para alcançar o imóvel dos seus sonhos."**
- [ ] Card A - Análise: Ícone Search + **"Avaliação criteriosa do mercado, localização e oportunidades para garantir a melhor escolha."**
- [ ] Card Z - Zelo: Ícone Heart + **"Cuidado e atenção em cada detalhe, acompanhando você em toda jornada imobiliária."**
- [ ] Botão CTA: **"Conheça Nossa História"** → Link para `/sobre`

### Busca de Imóveis
- [ ] Título: **"Encontre seu Imóvel Ideal"**
- [ ] Subtítulo: **"Use nossos filtros inteligentes para descobrir as melhores oportunidades na Zona Leste"**
- [ ] Select "Tipo de Imóvel": Apartamento, Casa, Sobrado, Terreno, Comercial
- [ ] Select "Localização": Tatuapé, Vila Formosa, Penha, Cangaíba, Vila Matilde, Guilhermina, Artur Alvim, Cidade Tiradentes, Guaianases
- [ ] Select "Dormitórios": 1, 2, 3, 4+
- [ ] Input "Preço Máximo": Placeholder "R$ 500.000"
- [ ] Botão CTA: **"Buscar Imóveis"**
- [ ] Card Diagnóstico - Título: **"Cansado de filtrar?"**
- [ ] Card Diagnóstico - Texto: **"Descubra seu Perfil Ideal em 5 Perguntas e receba recomendações personalizadas!"**
- [ ] Card Diagnóstico - Botão: **"Fazer Diagnóstico Gratuito"** → Abre `DiagnosticModal`

### Imóveis em Destaque
- [ ] Título: **"Imóveis em Destaque"**
- [ ] Subtítulo: **"Seleção especial das melhores oportunidades na Zona Leste de São Paulo"**
- [ ] 6 Property Cards com: Imagem, Badge tipo, Localização (ícone MapPin), Título, Preço, Quartos (ícone Bed), Banheiros (ícone Bath), Vagas (ícone Car), Área m²
- [ ] Botão por card: **"Ver Detalhes"**
- [ ] Botão geral: **"Ver Todos os Imóveis"**

### Depoimentos
- [ ] Título: **"O que Nossos Clientes Dizem"**
- [ ] Subtítulo: **"Histórias reais de quem confiou na Pinheiro Azul para realizar seus sonhos"**
- [ ] 3 Testimonial Cards com: Foto, Nome, Local, Rating (5 estrelas), Texto do depoimento
- [ ] Maria Santos (Tatuapé): "A Pinheiro Azul superou todas as minhas expectativas!..."
- [ ] João Silva (Vila Formosa): "Profissionais extremamente competentes e atenciosos..."
- [ ] Ana Costa (Penha): "Vendemos nossa casa com a Pinheiro Azul em tempo recorde!..."

### Seção de Contato
- [ ] Título: **"Pronto para Encontrar seu Novo Lar?"**
- [ ] Subtítulo: **"Fale com nossos especialistas na Zona Leste e comece sua jornada com a Pinheiro Azul Negócios Imobiliários."**
- [ ] Formulário com: Nome Completo, E-mail, Telefone
- [ ] Botão: **"Enviar Mensagem"**
- [ ] Info Endereço: **"Rua das Palmeiras, 123 - Vila Formosa, São Paulo - SP, CEP 03355-000"**
- [ ] Info Telefone: **(11) 3456-7890**
- [ ] Botão WhatsApp: **"Fale pelo WhatsApp"** → `https://wa.me/5511987654321`

### Componentes Compartilhados
- [ ] Navigation (Header)
- [ ] Footer

---

## Requisitos Técnicos

- **Arquivo:** `src/pages/HomeV2.tsx`
- **Estilização:** Tailwind CSS.
- **Animações:** Usar Framer Motion para animações de entrada e hover (recomendado).
- **Roteamento:** Adicionar rota `/v2` em `App.tsx`.
- **Responsividade:** Mobile-first, adaptável.

---

## Liberdade Criativa

O desenvolvedor tem **liberdade para:**
- Escolher a paleta exata de cores (desde que seja dark mode com acentos vibrantes).
- Decidir tamanhos de tipografia.
- Experimentar com formas e layouts de grid.
- Adicionar elementos decorativos (gradientes, blobs, linhas).

O desenvolvedor **NÃO deve:**
- Remover ou alterar o conteúdo textual.
- Criar um design "simples demais" ou minimalista ao extremo.
- Usar cores/estilos que conflitem com a identidade "Pinheiro Azul" (azul como cor de confiança).

---

## Fora de Escopo
- Backend ou integração de dados.
- Novas funcionalidades.
- Alteração de conteúdo.
