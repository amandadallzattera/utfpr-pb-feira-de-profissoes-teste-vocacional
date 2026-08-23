import { supabaseExternal } from "@/lib/supabase-external";
import { buildResultadoText, type AreaKey } from "./vocational";

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
  // O resultado é montado integralmente no momento da inserção, sem schema,
  // limite de caracteres, corte ou transformação intermediária.
  const resultadoCompleto = buildResultadoText(input.result);

  const { error } = await supabaseExternal.from("participantes").insert({
    email: input.email,
    resultado: resultadoCompleto,
    pontuacao_a: Number(pontos.a),
    pontuacao_b: Number(pontos.b),
    pontuacao_c: Number(pontos.c),
    pontuacao_d: Number(pontos.d),
    consentimento_lgpd: true,
  });


  // Mantido de forma explícita para diagnóstico do retorno exato do banco.
  console.log(error);

  if (error) {
    return { ok: false, error: error.details || error.message };
  }
  return { ok: true };
}
