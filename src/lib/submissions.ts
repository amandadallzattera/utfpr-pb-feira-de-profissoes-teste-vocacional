import { supabase } from "@/integrations/supabase/client";
import type { AreaKey } from "./vocational";

/**
 * Persistência das respostas no banco (tabela `participantes`).
 * Envio público: qualquer visitante pode inserir, desde que o consentimento
 * LGPD esteja marcado. A leitura dos dados fica restrita ao backend.
 */

/** Mapeia cada área para a coluna de pontuação correspondente. */
export const AREA_TO_LETRA: Record<AreaKey, "a" | "b" | "c" | "d"> = {
  exatas: "a",
  humanas: "b",
  biologicas: "c",
  tecnologia: "d",
};

export type Pontuacoes = { a: number; b: number; c: number; d: number };

/** Soma os pontos de cada área a partir das respostas escolhidas. */
export function calcularPontuacoes(respostas: AreaKey[]): Pontuacoes {
  const pontos: Pontuacoes = { a: 0, b: 0, c: 0, d: 0 };
  for (const area of respostas) {
    pontos[AREA_TO_LETRA[area]] += 1;
  }
  return pontos;
}

export type Submission = {
  email: string;
  consentimento_lgpd: boolean;
  answers: AreaKey[];
  result: AreaKey;
};

export async function saveSubmission(
  input: Submission,
): Promise<{ ok: boolean; error?: string }> {
  const pontos = calcularPontuacoes(input.answers);

  const { error } = await supabase.from("participantes").insert({
    email: input.email,
    resultado: input.result,
    pontuacao_a: pontos.a,
    pontuacao_b: pontos.b,
    pontuacao_c: pontos.c,
    pontuacao_d: pontos.d,
    consentimento_lgpd: input.consentimento_lgpd,
  });

  if (error) {
    console.error("Erro ao salvar resposta:", error.message);
    return { ok: false, error: error.message };
  }
  return { ok: true };
}
