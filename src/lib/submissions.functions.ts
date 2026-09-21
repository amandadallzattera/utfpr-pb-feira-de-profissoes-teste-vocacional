import { createServerFn } from "@tanstack/react-start";

export type SubmissionPayload = {
  email: string;
  consentimento_lgpd: boolean;
  resultado: string;
  pontuacao_a: number;
  pontuacao_b: number;
  pontuacao_c: number;
  pontuacao_d: number;
};

/**
 * Grava a submissão na tabela `participantes` do projeto externo.
 * O INSERT acontece no servidor: as credenciais nunca chegam ao navegador.
 */
export const submitParticipante = createServerFn({ method: "POST" })
  .inputValidator((data: SubmissionPayload) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    const { createExternalSupabaseClient } = await import("@/lib/supabase-external.server");

    try {
      const supabase = createExternalSupabaseClient();
      const { error } = await supabase.from("participantes").insert({
        email: data.email,
        resultado: data.resultado,
        pontuacao_a: Number(data.pontuacao_a),
        pontuacao_b: Number(data.pontuacao_b),
        pontuacao_c: Number(data.pontuacao_c),
        pontuacao_d: Number(data.pontuacao_d),
        consentimento_lgpd: data.consentimento_lgpd,
      });

      console.log(error);

      if (error) {
        return { ok: false, error: error.details || error.message };
      }
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  });
