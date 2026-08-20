DROP TABLE IF EXISTS public.vocational_submissions;

CREATE TABLE public.participantes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  resultado text NOT NULL,
  pontuacao_a integer NOT NULL DEFAULT 0,
  pontuacao_b integer NOT NULL DEFAULT 0,
  pontuacao_c integer NOT NULL DEFAULT 0,
  pontuacao_d integer NOT NULL DEFAULT 0,
  consentimento_lgpd boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.participantes TO anon, authenticated;
GRANT ALL ON public.participantes TO service_role;

ALTER TABLE public.participantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit the vocational test"
ON public.participantes
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consentimento_lgpd = true
  AND char_length(email) BETWEEN 3 AND 255
  AND email LIKE '%_@_%.__%'
  AND char_length(resultado) <= 40
);