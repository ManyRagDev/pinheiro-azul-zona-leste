import { z } from "zod";
import {
  REFERENCE_CONTEXT,
  formatCurrency,
  momentLabels,
  needLabels,
  supportLabels,
  type DiagnosticAnswers,
  type RecommendationDecision,
  type ScenarioResult,
} from "./inteligenciaScenario.ts";

export const MiniReportSchema = z
  .object({
    headline: z.string().min(12).max(100),
    opening: z.string().min(40).max(420),
    financial_reading: z.string().min(60).max(650),
    main_discovery: z.string().min(40).max(500),
    variables_to_investigate: z.string().min(40).max(500),
    next_steps: z.array(z.string().min(12).max(180)).length(3),
    recommendation_reason: z.string().min(40).max(500),
    autonomy_message: z.string().min(30).max(300),
    educational_notice: z.string().min(30).max(260),
  })
  .strict();

export type MiniReport = z.infer<typeof MiniReportSchema>;
export type ReportSource = "groq" | "deterministic";

export interface MiniReportResponse {
  report: MiniReport;
  source: ReportSource;
  decision: RecommendationDecision;
  scenario: ScenarioResult;
}

export function buildDeterministicReport(
  result: ScenarioResult,
  answers: DiagnosticAnswers,
  decision: RecommendationDecision
): MiniReport {
  const headlines: Record<RecommendationDecision["recommendationClass"], string> = {
    exploracao: "Sua primeira dúvida já aponta por onde começar",
    formacao_entrada: "A entrada é o ponto central do seu plano",
    ajuste_orcamento: "A faixa do imóvel merece um novo ajuste",
    preparacao_assistida: "Seus números já podem virar um plano de compra",
    pronto_para_confirmar: "Sua base inicial está pronta para confirmação",
    busca_autonoma: "Sua busca precisa de um critério único de comparação",
    busca_orientada: "Comparar melhor pode valer mais do que procurar mais",
    acompanhamento: "Seu próximo ganho está no apoio durante a busca",
    negociacao: "A reta final concentra agora os cuidados mais importantes",
  };

  return {
    headline: headlines[decision.recommendationClass],
    opening: `${decision.primaryStrength} Com apenas três valores e poucas respostas, já foi possível localizar onde sua decisão ganha mais clareza.`,
    financial_reading: `Para um imóvel de ${formatCurrency(result.propertyValue)}, a entrada informada de ${formatCurrency(
      result.consideredDownPayment
    )} representa ${result.downPaymentPercent.toFixed(0)}% do valor. A primeira parcela estimada ficou próxima de ${formatCurrency(
      result.estimatedFirstPayment
    )}, equivalente a cerca de ${result.incomeCommitment.toFixed(0)}% da renda familiar informada.`,
    main_discovery: decision.mainBottleneck,
    variables_to_investigate:
      "Esta leitura ainda não conhece saldo utilizável de FGTS, compromissos mensais, perfil de crédito, condições bancárias ou detalhes do imóvel. Essas variáveis podem mudar a composição final.",
    next_steps: [...decision.nextSteps],
    recommendation_reason: `${decision.recommended.label} aparece como próximo passo proporcional porque você informou que ${momentLabels[
      answers.moment
    ].toLowerCase()} e destacou ${needLabels[answers.mainNeed].toLowerCase()}.`,
    autonomy_message: `Você pode seguir apenas com este mapa. ${decision.completeOption.label} continua disponível caso prefira mais conveniência e acompanhamento.`,
    educational_notice:
      "Esta é uma estimativa educativa baseada nas referências informadas pela Pinheiro Azul. Não representa aprovação bancária, promessa de subsídio ou garantia de contratação.",
  };
}

export function buildModelContext(
  result: ScenarioResult,
  answers: DiagnosticAnswers,
  decision: RecommendationDecision
) {
  return {
    language: "português brasileiro",
    calculation_context: {
      property_value: formatCurrency(result.propertyValue),
      monthly_income: formatCurrency(result.monthlyIncome),
      down_payment: formatCurrency(result.consideredDownPayment),
      down_payment_percent: `${result.downPaymentPercent.toFixed(0)}%`,
      estimated_financing: formatCurrency(result.financedValue),
      estimated_first_payment: formatCurrency(result.estimatedFirstPayment),
      income_commitment_percent: `${result.incomeCommitment.toFixed(0)}%`,
      estimated_initial_costs: formatCurrency(result.initialCosts),
      down_payment_gap: formatCurrency(result.downPaymentGap),
    },
    interpretation: {
      scenario_label: result.levelLabel,
      recommendation_class: decision.recommendationClass,
      main_strength: decision.primaryStrength,
      main_bottleneck: decision.mainBottleneck,
    },
    user_context: {
      purchase_moment: momentLabels[answers.moment],
      main_need: needLabels[answers.mainNeed],
      support_preference: answers.supportPreference
        ? supportLabels[answers.supportPreference]
        : "Não foi necessário perguntar",
    },
    approved_guidance: {
      recommended_next_step: decision.recommended.label,
      recommended_description: decision.recommended.description,
      next_actions: decision.nextSteps,
      accessible_alternative: decision.accessibleAlternative.label,
      personalized_option: decision.personalizedOption.label,
      complete_option: decision.completeOption.label,
    },
    commercial_hierarchy: {
      rule:
        "O serviço mais caro permanece disponível, mas não deve ser descrito como recomendação principal quando uma opção mais simples resolve a necessidade.",
      recommended: decision.recommended.label,
      complete_available: decision.completeOption.label,
    },
    reference_context: {
      reference_date: REFERENCE_CONTEXT.referenceDate,
      calculation_method: REFERENCE_CONTEXT.calculationMethod,
      annual_rate_used: `${REFERENCE_CONTEXT.annualRatePercent}% ao ano`,
      initial_cost_reference: `${REFERENCE_CONTEXT.initialCostPercent}%`,
      down_payment_reference: `${REFERENCE_CONTEXT.downPaymentPercent}%`,
      income_commitment_reference: `${REFERENCE_CONTEXT.incomeCommitmentPercent}%`,
    },
    limitations: [
      "A estimativa não representa aprovação bancária.",
      "Subsídio e enquadramento em programas habitacionais não foram calculados.",
      "Taxas, seguros, compromissos financeiros e análise de crédito podem alterar a parcela.",
      "Os custos iniciais são uma referência educativa.",
      "Não há dados suficientes para afirmar regras atuais de mercado, bancos, legislação ou programas habitacionais.",
    ],
  };
}

export const REPORT_SYSTEM_PROMPT = `
Você é o redator controlado de um mini relatório da Pinheiro Azul.

Responda sempre e exclusivamente em português brasileiro.
Sua função é transformar o contexto fornecido em um texto claro, humano, consultivo e persuasivo.
Você não pesquisa, não calcula, não classifica e não escolhe recomendações.

Use exclusivamente as informações presentes no payload.
Prefira declarar os fatos fornecidos em vez de supor que conhece informações externas.
Não use conhecimento próprio sobre mercado imobiliário, bairros, bancos, legislação, economia,
Minha Casa Minha Vida, crédito, subsídios, taxas ou valorização.
Não deduza informações ausentes. Quando um dado não estiver presente, omita o assunto.

Não altere números, classificações, próximos passos, hierarquia comercial ou recomendação.
Não apresente a opção completa como recomendação quando o payload a marcar apenas como disponível.
Não invente estatísticas, probabilidades, prazos, preços, benefícios ou condições.
Não use "aprovado", "reprovado", "compra garantida", "crédito garantido", "vai valorizar",
"oportunidade única", "últimas vagas" ou equivalentes.
Não mencione inteligência artificial, modelo, prompt, algoritmo ou payload.
Não produza HTML, Markdown, links ou chamadas comerciais não fornecidas.

O relatório deve entregar valor real e, com sutileza, mostrar que poucas informações já revelaram
um ponto importante e que uma orientação individual poderia investigar variáveis adicionais.
Não esconda a conclusão para forçar uma contratação.
Deixe explícito que a pessoa pode seguir sozinha e que o acompanhamento completo está disponível.

Evite frases genéricas repetitivas como "seu cenário não pede uma resposta apressada".
Faça a abertura e a descoberta principal dependerem dos fatos e da classe recebida.
`.trim();

export function validateReportSemantics(report: MiniReport, context: ReturnType<typeof buildModelContext>) {
  const text = Object.values(report)
    .flat()
    .join(" ");
  const lower = text.toLocaleLowerCase("pt-BR");
  const forbidden = [
    "compra garantida",
    "crédito garantido",
    "aprovação provável",
    "aprovado para",
    "vai valorizar",
    "oportunidade única",
    "últimas vagas",
    "como inteligência artificial",
    "como ia",
  ];

  if (forbidden.some((term) => lower.includes(term))) return false;
  if (/<[^>]+>|https?:\/\/|www\./i.test(text)) return false;
  if (!lower.includes("estimativa") || !lower.includes("aprovação")) return false;
  if (!report.recommendation_reason.includes(context.approved_guidance.recommended_next_step)) {
    return false;
  }

  const allowedNumbers = JSON.stringify(context).match(/R\$\s?[\d.]+|\d+(?:[.,]\d+)?%/g) ?? [];
  const returnedNumbers = text.match(/R\$\s?[\d.]+|\d+(?:[.,]\d+)?%/g) ?? [];
  return returnedNumbers.every((number) => allowedNumbers.includes(number));
}
