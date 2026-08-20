import type { AreaKey } from "./vocational";

/**
 * Camada de persistência pronta para o Supabase (Lovable Cloud).
 *
 * Quando o banco estiver conectado, crie a tabela `vocational_submissions`
 * com as colunas: id, email, consent_lgpd, answers (jsonb), result, created_at.
 * Depois troque o corpo de `saveSubmission` pela chamada:
 *
 *   const { error } = await supabase.from("vocational_submissions").insert(payload);
 *
 * Hoje os dados ficam apenas no localStorage do navegador.
 */
export type Submission = {
  email: string;
  consent_lgpd: boolean;
  answers: AreaKey[];
  result: AreaKey;
  created_at: string;
};

const STORAGE_KEY = "utfpr-vocacional-submissions";

export async function saveSubmission(
  input: Omit<Submission, "created_at">,
): Promise<{ ok: boolean; error?: string }> {
  const payload: Submission = { ...input, created_at: new Date().toISOString() };

  try {
    if (typeof window !== "undefined") {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const list: Submission[] = raw ? JSON.parse(raw) : [];
      list.push(payload);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Erro ao salvar" };
  }
}
