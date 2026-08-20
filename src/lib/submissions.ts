import { supabase } from "@/integrations/supabase/client";
import type { AreaKey } from "./vocational";

/**
 * Persistência das respostas no banco (tabela `vocational_submissions`).
 * Envio público: qualquer visitante pode inserir, desde que o consentimento
 * LGPD esteja marcado. A leitura dos dados fica restrita ao backend.
 */
export type Submission = {
  email: string;
  consent_lgpd: boolean;
  answers: AreaKey[];
  result: AreaKey;
};

export async function saveSubmission(
  input: Submission,
): Promise<{ ok: boolean; error?: string }> {
  const { error } = await supabase.from("vocational_submissions").insert({
    email: input.email,
    consent_lgpd: input.consent_lgpd,
    answers: input.answers,
    result: input.result,
  });

  if (error) {
    console.error("Erro ao salvar resposta:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
