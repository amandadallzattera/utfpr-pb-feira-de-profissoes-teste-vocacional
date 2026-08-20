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
    pontuacao_a: Number.parseInt(String(pontos.a), 10),
    pontuacao_b: Number.parseInt(String(pontos.b), 10),
    pontuacao_c: Number.parseInt(String(pontos.c), 10),
    pontuacao_d: Number.parseInt(String(pontos.d), 10),
    consentimento_lgpd: true,
  });

  // Mantido de forma explícita para diagnóstico do retorno exato do banco.
  console.log(error);

  if (error) {
    return { ok: false, error: error.details || error.message };
  }
  return { ok: true };
}
