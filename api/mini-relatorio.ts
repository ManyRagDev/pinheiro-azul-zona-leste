import { z } from "zod";
import {
  calculateScenario,
  getRecommendationDecision,
  type DiagnosticAnswers,
} from "../src/lib/inteligenciaScenario.ts";
import {
  MiniReportSchema,
  REPORT_SYSTEM_PROMPT,
  buildDeterministicReport,
  buildModelContext,
  validateReportSemantics,
} from "../src/lib/inteligenciaReport.ts";

interface ApiRequest {
  method?: string;
  body?: unknown;
  headers: Record<string, string | string[] | undefined>;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

const RequestSchema = z
  .object({
    propertyValue: z.number().min(150000).max(1200000),
    downPayment: z.number().min(0).max(1200000),
    monthlyIncome: z.number().min(3000).max(50000),
    moment: z.enum(["entendendo", "organizando", "proximos_meses", "procurando", "negociando"]),
    mainNeed: z.enum([
      "financiamento",
      "custos",
      "documentos",
      "processo",
      "capacidade",
      "formar_entrada",
      "mcmv",
      "comecar",
      "seguir_sozinho",
      "montar_plano",
      "busca_visitas",
      "pesquisando",
      "agendando_visitas",
      "visitou_opcoes",
      "custos_documentos",
      "proposta_clausulas",
      "credito_final",
      "orientacao_geral",
    ]),
    supportPreference: z.enum(["autonomia", "orientacao", "acompanhamento"]).optional(),
  })
  .strict();

const reportJsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    headline: { type: "string" },
    opening: { type: "string" },
    financial_reading: { type: "string" },
    main_discovery: { type: "string" },
    variables_to_investigate: { type: "string" },
    next_steps: {
      type: "array",
      minItems: 3,
      maxItems: 3,
      items: { type: "string" },
    },
    recommendation_reason: { type: "string" },
    autonomy_message: { type: "string" },
    educational_notice: { type: "string" },
  },
  required: [
    "headline",
    "opening",
    "financial_reading",
    "main_discovery",
    "variables_to_investigate",
    "next_steps",
    "recommendation_reason",
    "autonomy_message",
    "educational_notice",
  ],
} as const;

const requestsByIp = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 12;

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = requestsByIp.get(ip);
  if (!current || current.resetAt <= now) {
    requestsByIp.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function parseBody(body: unknown) {
  if (typeof body === "string") return JSON.parse(body);
  return body;
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    return response.status(405).json({ error: "Método não permitido." });
  }

  const forwarded = request.headers["x-forwarded-for"];
  const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return response.status(429).json({ error: "Muitas tentativas. Aguarde um minuto." });
  }

  let parsedBody: unknown;
  try {
    if (typeof request.body === "string" && request.body.length > 5_000) {
      return response.status(413).json({ error: "Corpo da requisição muito grande." });
    }
    parsedBody = parseBody(request.body);
  } catch {
    return response.status(400).json({ error: "JSON inválido." });
  }

  const validation = RequestSchema.safeParse(parsedBody);
  if (!validation.success) {
    return response.status(400).json({ error: "Dados do diagnóstico inválidos." });
  }

  const { propertyValue, downPayment, monthlyIncome, ...answerData } = validation.data;
  const answers = answerData as DiagnosticAnswers;
  const scenario = calculateScenario({ propertyValue, downPayment, monthlyIncome });
  const decision = getRecommendationDecision(scenario, answers);
  const fallback = buildDeterministicReport(scenario, answers, decision);
  const context = buildModelContext(scenario, answers, decision);
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return response.status(200).json({
      report: fallback,
      source: "deterministic",
      decision,
      scenario,
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "openai/gpt-oss-120b",
        temperature: 0.35,
        max_completion_tokens: 1200,
        messages: [
          { role: "system", content: REPORT_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Escreva o relatório usando somente este contexto:\n${JSON.stringify(context)}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "pinheiro_azul_mini_report",
            strict: true,
            schema: reportJsonSchema,
          },
        },
      }),
    });

    if (!groqResponse.ok) throw new Error(`Groq respondeu ${groqResponse.status}`);

    const completion = (await groqResponse.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const content = completion.choices?.[0]?.message?.content;
    if (!content) throw new Error("Resposta vazia");

    const report = MiniReportSchema.parse(JSON.parse(content));
    if (!validateReportSemantics(report, context)) {
      throw new Error("Resposta reprovada pelos guardrails semânticos");
    }

    return response.status(200).json({
      report,
      source: "groq",
      decision,
      scenario,
    });
  } catch {
    return response.status(200).json({
      report: fallback,
      source: "deterministic",
      decision,
      scenario,
    });
  } finally {
    clearTimeout(timeout);
  }
}
