CREATE TABLE IF NOT EXISTS public.leads_pinheiro_azul_funnel (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  email text NOT NULL,
  whatsapp text NOT NULL,
  perfil text NOT NULL CHECK (perfil IN ('primeiro_imovel', 'upgrade_moradia', 'investimento', 'venda_imovel')),
  origem_pagina text NOT NULL,
  objetivo text,
  faixa_preco text,
  regiao_interesse text,
  prazo text,
  tipo_imovel text,
  respostas_diagnostico jsonb NOT NULL DEFAULT '{}'::jsonb,
  status_lead text NOT NULL DEFAULT 'novo',
  guia_solicitado text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.email_delivery_queue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads_pinheiro_azul_funnel(id) ON DELETE CASCADE,
  recipient_email text NOT NULL,
  guide_key text NOT NULL,
  provider text NOT NULL DEFAULT 'pending_configuration',
  status text NOT NULL DEFAULT 'pending',
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  error_message text,
  created_at timestamptz NOT NULL DEFAULT now(),
  sent_at timestamptz
);

ALTER TABLE public.leads_pinheiro_azul_funnel ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_delivery_queue ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert for unified funnel leads"
ON public.leads_pinheiro_azul_funnel
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public insert for email queue"
ON public.email_delivery_queue
FOR INSERT
WITH CHECK (true);
