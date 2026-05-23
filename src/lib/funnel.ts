import { supabase } from "@/integrations/supabase/client";

export type LeadProfile = "primeiro_imovel" | "upgrade_moradia" | "investimento" | "venda_imovel";

export type FunnelAnswers = {
  objetivo: string;
  faixa_preco: string;
  regiao_interesse: string;
  prazo: string;
  tipo_imovel: string;
};

export type LeadContact = {
  nome: string;
  email: string;
  whatsapp: string;
};

export type LeadSubmission = LeadContact & {
  perfil: LeadProfile;
  origem_pagina: string;
  guia_solicitado: string;
  respostas: FunnelAnswers | Record<string, string>;
};

export const profileLabels: Record<LeadProfile, string> = {
  primeiro_imovel: "Primeiro imóvel",
  upgrade_moradia: "Upgrade/Moradia",
  investimento: "Investimento",
  venda_imovel: "Anuncie seu imóvel",
};

export const guideByProfile: Record<LeadProfile, string> = {
  primeiro_imovel: "guia-5-imoveis-itaquera-penha",
  upgrade_moradia: "guia-viabilidade-vila-matilde",
  investimento: "guia-rentabilidade-tatuape",
  venda_imovel: "guia-venda-com-inteligencia",
};

export const guideLabels: Record<LeadProfile, string> = {
  primeiro_imovel: "Guia: Seu Primeiro Imóvel na Zona Leste",
  upgrade_moradia: "Guia: Upgrade de Moradia na Zona Leste",
  investimento: "Guia: Rentabilidade de Imóveis na Zona Leste",
  venda_imovel: "Guia: Vender com Inteligência",
};

export const profileSummaries: Record<LeadProfile, { title: string; copy: string; cta: string }> = {
  primeiro_imovel: {
    title: "Conquiste seu primeiro imóvel com segurança.",
    copy: "Fluxo pensado para quem precisa entender crédito, entrada, FGTS, região e documentação antes de visitar.",
    cta: "Receber diagnóstico de compra",
  },
  upgrade_moradia: {
    title: "Troque de endereço sem errar a rotina.",
    copy: "Curadoria para famílias que buscam mais espaço, lazer, mobilidade e previsibilidade na mudança.",
    cta: "Ver opções para minha família",
  },
  investimento: {
    title: "Compare liquidez, aluguel e valorização.",
    copy: "Análise para quem quer comprar com tese: renda, revenda, risco de vacância e força do bairro.",
    cta: "Receber análise de investimento",
  },
  venda_imovel: {
    title: "Venda com inteligência e mais contexto.",
    copy: "Captação para proprietários que precisam avaliar, posicionar e divulgar o imóvel com critério.",
    cta: "Avaliar meu imóvel",
  },
};

export function normalizeProfile(value: string | null): LeadProfile | undefined {
  if (
    value === "primeiro_imovel" ||
    value === "upgrade_moradia" ||
    value === "investimento" ||
    value === "venda_imovel"
  ) {
    return value;
  }

  return undefined;
}

export function classifyLead(answers: FunnelAnswers, preferredProfile?: LeadProfile): LeadProfile {
  if (preferredProfile) {
    return preferredProfile;
  }

  const objective = answers.objetivo.toLowerCase();
  const type = answers.tipo_imovel.toLowerCase();
  const price = answers.faixa_preco.toLowerCase();

  if (objective.includes("vender") || type.includes("venda")) {
    return "venda_imovel";
  }

  if (objective.includes("invest") || price.includes("1 milhão") || price.includes("renda")) {
    return "investimento";
  }

  if (objective.includes("trocar") || type.includes("casa") || type.includes("3 dormitórios")) {
    return "upgrade_moradia";
  }

  return "primeiro_imovel";
}

export async function submitLead(submission: LeadSubmission) {
  const { data: lead, error: leadError } = await supabase
    .from("leads_pinheiro_azul_funnel")
    .insert({
      nome: submission.nome,
      email: submission.email,
      whatsapp: submission.whatsapp,
      perfil: submission.perfil,
      origem_pagina: submission.origem_pagina,
      objetivo: submission.respostas.objetivo ?? null,
      faixa_preco: submission.respostas.faixa_preco ?? null,
      regiao_interesse: submission.respostas.regiao_interesse ?? null,
      prazo: submission.respostas.prazo ?? null,
      tipo_imovel: submission.respostas.tipo_imovel ?? null,
      respostas_diagnostico: submission.respostas,
      status_lead: "novo",
      guia_solicitado: submission.guia_solicitado,
    })
    .select("id")
    .single();

  if (leadError) {
    throw leadError;
  }

  const { error: queueError } = await supabase.from("email_delivery_queue").insert({
    lead_id: lead.id,
    recipient_email: submission.email,
    guide_key: submission.guia_solicitado,
    provider: "pending_configuration",
    status: "pending",
    payload: {
      perfil: submission.perfil,
      nome: submission.nome,
      origem_pagina: submission.origem_pagina,
    },
  });

  if (queueError) {
    throw queueError;
  }

  return lead.id;
}
