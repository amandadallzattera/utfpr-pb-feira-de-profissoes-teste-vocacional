import { submitParticipante } from "@/lib/submissions.functions";
import { buildResultadoText, type AreaKey } from "./vocational";

/**
 * Persistência das respostas no banco (tabela `participantes`).
 * O INSERT é feito por uma função de servidor: as credenciais do banco
 * não ficam mais expostas no navegador.
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

/** Mensagem genérica exibida ao usuário — nunca expõe detalhes técnicos. */
export const ERRO_ENVIO_GENERICO =
  "Não foi possível enviar suas respostas. Verifique sua conexão e tente novamente.";

export async function saveSubmission(
  input: Submission,
): Promise<{ ok: boolean; error?: string }> {
  const pontos = calcularPontuacoes(input.answers);
  // O resultado é montado integralmente no envio, sem schema,
  // limite de caracteres, corte ou transformação intermediária.
  const resultadoCompleto = buildResultadoText(input.result);

  try {
    return await submitParticipante({
      data: {
        email: input.email,
        resultado: resultadoCompleto,
        pontuacao_a: Number(pontos.a),
        pontuacao_b: Number(pontos.b),
        pontuacao_c: Number(pontos.c),
        pontuacao_d: Number(pontos.d),
        consentimento_lgpd: input.consentimento_lgpd,
      },
    });
  } catch {
    return { ok: false, error: ERRO_ENVIO_GENERICO };
  }
}
