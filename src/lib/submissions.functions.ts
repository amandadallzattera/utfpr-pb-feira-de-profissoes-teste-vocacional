import { createServerFn } from "@tanstack/react-start";

export type SubmissionPayload = {
  email: string;
  consentimento_lgpd: boolean;
  resultado: string;
  pontuacao_a: number;
  pontuacao_b: number;
  pontuacao_c: number;
  pontuacao_d: number;
  turnstileToken: string;
};

/** Valida o token do Turnstile com a Cloudflare usando o Secret do servidor. */
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env["CLOUDFLARE_TURNSTILE_SECRET_KEY"];
  if (!secret || !token) return false;

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token }).toString(),
      },
    );
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

/**
 * Grava a submissão na tabela `participantes` do projeto externo.
 * O INSERT acontece no servidor: as credenciais nunca chegam ao navegador.
 */
export const submitParticipante = createServerFn({ method: "POST" })
  .inputValidator((data: SubmissionPayload) => data)
  .handler(async ({ data }): Promise<{ ok: boolean; error?: string }> => {
    // Verificação anti-bot no servidor, antes de qualquer gravação.
    const humanVerified = await verifyTurnstile(data.turnstileToken);
    if (!humanVerified) {
      console.error("Falha ao registrar submissão: verificação anti-bot");
      return { ok: false };
    }

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

      // Detalhes do erro ficam apenas no servidor, sem dados pessoais.
      if (error) {
        console.error("Falha ao registrar submissão:", error.code ?? "desconhecido");
        return { ok: false };
      }
      return { ok: true };
    } catch (e) {
      console.error("Falha ao registrar submissão:", e instanceof Error ? e.name : "desconhecido");
      return { ok: false };
    }
  });
