CREATE TABLE public.vocational_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  consent_lgpd BOOLEAN NOT NULL DEFAULT false,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.vocational_submissions TO anon;
GRANT INSERT ON public.vocational_submissions TO authenticated;
GRANT ALL ON public.vocational_submissions TO service_role;

ALTER TABLE public.vocational_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit the vocational test"
ON public.vocational_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  consent_lgpd = true
  AND char_length(email) BETWEEN 3 AND 255
  AND email LIKE '%_@_%.__%'
  AND char_length(result) <= 40
);