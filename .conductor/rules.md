# Padrões de Engenharia

## Princípios Gerais
1.  **Clean Code**: Escreva código fácil de ler, entender e manter.
2.  **DRY (Don't Repeat Yourself)**: Evite duplicação de código. Extraia lógica comum para funções ou componentes reutilizáveis.
3.  **KISS (Keep It Simple, Stupid)**: Evite complexidade desnecessária.
4.  **Responsabilidade Única**: Cada módulo, classe ou função deve ter apenas uma razão para mudar.

## Arquitetura
- Siga a estrutura de projeto existente.
- Isole a lógica de negócios dos componentes de UI sempre que possível.
- **Organização de Componentes**: Diferencie entre Átomos de UI (shadcn/radix em `components/ui`) e Componentes de Negócio (ex: `HeroSection`, `PropertySearch`). *Meta: Mover componentes de negócio para fora da pasta `ui` em refatorações futuras.*
- **Busca de Dados**: Use TanStack Query para estado do servidor.

## React & TypeScript
- Use componentes funcionais e Hooks.
- Tipagem Forte: Evite `any`. Use interfaces e tipos explicitamente.
- Prop Drilling: Use Context ou Composição para evitar prop drilling excessivo.

## Fluxo de Trabalho Git
- Faça commits frequentes com mensagens claras.
- Garanta que o build passe antes de fazer push.
