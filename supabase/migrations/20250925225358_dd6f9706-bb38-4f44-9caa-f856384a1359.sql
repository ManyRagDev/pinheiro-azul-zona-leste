-- Enable RLS on the leads table
ALTER TABLE public.leads_diagnostico_pinheiro_azul ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert for lead generation
CREATE POLICY "Allow public insert for leads" 
ON public.leads_diagnostico_pinheiro_azul 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow select for leads (if needed for admin purposes)
CREATE POLICY "Allow public select for leads" 
ON public.leads_diagnostico_pinheiro_azul 
FOR SELECT 
USING (true);