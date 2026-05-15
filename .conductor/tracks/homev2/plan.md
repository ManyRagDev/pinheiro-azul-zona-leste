# Plano de Implementação: HomeV2

> Baseado em: [spec.md](./spec.md)
>
> Filosofia: Construir uma landing page que pareça uma peça única de design premium moderno.

---

## Fase 1: Fundação

- [x] **1.1** Instalar `framer-motion` para animações.
- [x] **1.2** Criar `src/pages/HomeV2.tsx` com estrutura base.
- [x] **1.3** Configurar rota `/v2` em `src/App.tsx`.
- [x] **1.4** Definir variáveis de estilo/tema (cores, espaçamentos) no componente ou como constantes.

---

## Fase 2: Hero Section

- [x] **2.1** Criar Hero impactante com tipografia grande e vídeo/imagem de fundo.
- [x] **2.2** Aplicar overlay gradiente escuro para contraste.
- [x] **2.3** Posicionar CTAs com estilo premium (efeitos hover, ícones).
- [x] **2.4** Adicionar animação de entrada (fade + slide).

---

## Fase 3: Bento Grid Principal

- [x] **3.1** Criar estrutura de grid responsivo para seções (CSS Grid ou Flex).
- [x] **3.2** Implementar Card "Metodologia P.A.Z.©" (compacto, visual, 3 pilares).
- [x] **3.3** Implementar Card "Busca de Imóveis" (formulário estilizado, CTA Diagnóstico).
- [x] **3.4** Garantir que os dois cards se complementem visualmente lado a lado.

---

## Fase 4: Showcase de Imóveis

- [x] **4.1** Criar grid de property cards com visual premium.
- [x] **4.2** Aplicar hover effects (scale, shadow, brilho).
- [x] **4.3** Manter todas as informações (preço, quartos, bairro, etc).

---

## Fase 5: Credibilidade (Depoimentos + Contato)

- [x] **5.1** Implementar seção de Depoimentos (carousel ou cards).
- [x] **5.2** Implementar seção de Contato/CTA final.
- [x] **5.3** Organizar lado a lado no desktop, empilhado no mobile.

---

## Fase 6: Polish & Animações

- [x] **6.1** Adicionar animações de scroll (elementos aparecem ao entrar em view).
- [x] **6.2** Refinar microinterações (botões, inputs, cards).
- [x] **6.3** Revisar consistência visual (cores, fontes, espaçamentos).
- [x] **6.4** Testar dark mode em diferentes tamanhos de tela.

---

## Fase 7: Verificação de Paridade de Conteúdo

> [!IMPORTANT]
> Esta fase garante que NENHUM conteúdo foi perdido ou alterado.

### 7.1 Verificação Técnica
- [ ] Testar rota `/v2` no navegador (dev server).
- [ ] Rodar `npm run build` para verificar erros de compilação.
- [ ] Testar responsividade (mobile, tablet, desktop via DevTools).

### 7.2 Checklist de Conteúdo (Comparar com Home original)

#### Hero
- [ ] Título exato: "Encontre seu lar na Zona Leste de São Paulo"
- [ ] Subtítulo exato
- [ ] Botão "Buscar Imóveis" presente e funcional
- [ ] Botão "Saiba Mais" presente
- [ ] Vídeo funcionando

#### Metodologia P.A.Z.©
- [ ] Título e subtítulo exatos
- [ ] 3 cards (P, A, Z) com textos completos
- [ ] Link para `/sobre` funcional

#### Busca de Imóveis
- [ ] 4 filtros presentes (Tipo, Localização, Dormitórios, Preço)
- [ ] Todos os bairros no select de localização
- [ ] Botão "Buscar Imóveis" presente
- [ ] Card de Diagnóstico com texto completo
- [ ] Modal DiagnosticModal abre corretamente

#### Imóveis em Destaque
- [ ] 6 property cards com todas as informações (preço, quartos, banheiros, vagas, área)
- [ ] Botão "Ver Todos os Imóveis" presente

#### Depoimentos
- [ ] 3 testimonials completos
- [ ] Fotos, nomes, locais e ratings

#### Contato
- [ ] Formulário com 3 campos
- [ ] Endereço e telefone exibidos
- [ ] Botão WhatsApp funcional

### 7.3 Documentação
- [ ] Capturar screenshots da HomeV2
- [ ] Atualizar walkthrough com comparativo visual
