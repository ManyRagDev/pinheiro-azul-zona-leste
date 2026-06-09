export type PurchaseMoment = "entendendo" | "organizando" | "procurando" | "negociando";
export type ScenarioLevel = "exploratorio" | "preparacao" | "busca";

export interface ScenarioInput {
  propertyValue: number;
  downPayment: number;
  monthlyIncome: number;
}

export interface ScenarioResult extends ScenarioInput {
  consideredDownPayment: number;
  downPaymentPercent: number;
  financedValue: number;
  initialCosts: number;
  estimatedFirstPayment: number;
  incomeCommitment: number;
  downPaymentGap: number;
  level: ScenarioLevel;
  levelLabel: string;
  levelSummary: string;
  attentionPoints: string[];
  clearPoints: string[];
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export function calculateScenario({
  propertyValue,
  downPayment,
  monthlyIncome,
}: ScenarioInput): ScenarioResult {
  const consideredDownPayment = Math.min(Math.max(downPayment, 0), propertyValue);
  const downPaymentPercent = propertyValue > 0 ? (consideredDownPayment / propertyValue) * 100 : 0;
  const financedValue = Math.max(propertyValue - consideredDownPayment, 0);
  const initialCosts = propertyValue * 0.045;
  const estimatedFirstPayment = financedValue / 360 + financedValue * (0.105 / 12);
  const incomeCommitment = monthlyIncome > 0 ? (estimatedFirstPayment / monthlyIncome) * 100 : 0;
  const referenceDownPayment = propertyValue * 0.2;
  const downPaymentGap = Math.max(referenceDownPayment - consideredDownPayment, 0);

  let level: ScenarioLevel = "busca";
  if (downPaymentPercent < 10 || incomeCommitment > 40) {
    level = "exploratorio";
  } else if (downPaymentPercent < 20 || incomeCommitment > 30) {
    level = "preparacao";
  }

  const levelContent: Record<ScenarioLevel, { label: string; summary: string }> = {
    exploratorio: {
      label: "Cenário para organizar",
      summary:
        "Os números já mostram por onde começar: ajustar a relação entre entrada, valor do imóvel e parcela antes de avançar para uma busca mais intensa.",
    },
    preparacao: {
      label: "Cenário em preparação",
      summary:
        "Existe uma base concreta, mas alguns pontos ainda merecem organização e confirmação antes de transformar a intenção em propostas.",
    },
    busca: {
      label: "Cenário para confirmar",
      summary:
        "A composição inicial está mais próxima das referências educativas usadas aqui. O próximo passo é confirmar crédito, custos e critérios de busca.",
    },
  };

  const clearPoints = [
    `A entrada informada representa ${downPaymentPercent.toFixed(0)}% do valor do imóvel.`,
    `O valor restante a financiar seria de aproximadamente ${formatCurrency(financedValue)}.`,
    `A primeira parcela educativa ficaria perto de ${formatCurrency(estimatedFirstPayment)}.`,
  ];

  const attentionPoints: string[] = [];
  if (downPaymentGap > 0) {
    attentionPoints.push(
      `Faltam cerca de ${formatCurrency(downPaymentGap)} para alcançar a referência inicial de 20% de entrada.`
    );
  }
  if (incomeCommitment > 30) {
    attentionPoints.push(
      `A parcela estimada compromete ${incomeCommitment.toFixed(0)}% da renda, acima da referência educativa de 30%.`
    );
  }
  attentionPoints.push(
    `Reserve aproximadamente ${formatCurrency(initialCosts)} para ITBI, registro e escritura; o valor real pode variar.`
  );

  return {
    propertyValue,
    downPayment,
    monthlyIncome,
    consideredDownPayment,
    downPaymentPercent,
    financedValue,
    initialCosts,
    estimatedFirstPayment,
    incomeCommitment,
    downPaymentGap,
    level,
    levelLabel: levelContent[level].label,
    levelSummary: levelContent[level].summary,
    attentionPoints,
    clearPoints,
  };
}

export function getRecommendation(result: ScenarioResult, moment?: PurchaseMoment) {
  if (moment === "negociando") {
    return {
      title: "Converse antes de assumir o próximo compromisso",
      description:
        "Como já existe um imóvel em negociação, a prioridade é organizar perguntas, documentos, taxas e condições antes de assinar. A orientação não substitui avaliação jurídica, bancária ou independente.",
      cta: "Conversar antes de avançar",
      alternative: "Prefere começar sozinho? Consulte o checklist da reta final da compra.",
    };
  }

  if (moment === "procurando" && result.level === "busca") {
    return {
      title: "Organize a busca e compare opções com método",
      description:
        "Seu cenário inicial está mais próximo das referências usadas aqui e você já está procurando. Um acompanhamento pode ajudar a definir critérios, comparar propostas e preparar as visitas.",
      cta: "Conversar sobre acompanhamento",
      alternative: "Uma consultoria pontual é uma alternativa mais leve antes do acompanhamento completo.",
    };
  }

  if (result.level === "exploratorio") {
    return {
      title: "Comece por um plano de preparação",
      description:
        "O melhor próximo passo não é acelerar a busca. Primeiro, vale ajustar a faixa do imóvel, formar entrada e entender os custos que chegam antes das chaves.",
      cta: "Conversar sobre meu plano",
      alternative: "Você também pode começar por conteúdos e checklists gratuitos.",
    };
  }

  if (result.level === "preparacao" || moment === "organizando") {
    return {
      title: "Transforme os números em um plano de compra",
      description:
        "Uma consultoria online pode organizar entrada, parcela, custos e próximos passos para que você procure imóveis com um limite mais claro.",
      cta: "Conhecer a consultoria",
      alternative: "Prefere seguir no seu ritmo? Comece pelo Guia Prático.",
    };
  }

  return {
    title: "Confirme o cenário antes de iniciar a busca",
    description:
      "Os números formam uma base inicial coerente, mas ainda precisam de simulação oficial e critérios de compra. Uma conversa curta ajuda a definir o próximo movimento sem prometer aprovação.",
    cta: "Conversar sobre meu cenário",
    alternative: "Se ainda estiver explorando, use o mapa como roteiro e avance no seu tempo.",
  };
}

export { formatCurrency };
