import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase do projeto externo da UTFPR.
 * As credenciais ficam diretamente no código (chave publicável/anon,
 * segura para uso no navegador — a proteção real vem das políticas RLS).
 */
export const SUPABASE_URL = "https://bpybfeohehfeufwevyjj.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_1vJzXiW_OGqZkRtLXud6rQ_zhFE05zw";

function isNewApiKey(value: string) {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

// Chaves novas do Supabase são opacas (não são JWT): precisam ir no header `apikey`
// e não como `Authorization: Bearer`.
const supabaseFetch: typeof fetch = (input, init) => {
  const headers = new Headers(
    typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
  );
  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  }
  if (
    isNewApiKey(SUPABASE_PUBLISHABLE_KEY) &&
    headers.get("Authorization") === `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
  ) {
    headers.delete("Authorization");
  }
  headers.set("apikey", SUPABASE_PUBLISHABLE_KEY);
  return fetch(input, { ...init, headers });
};

export const supabaseExternal = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  global: { fetch: supabaseFetch },
  auth: {
    storage: typeof window !== "undefined" ? localStorage : undefined,
    persistSession: false,
    autoRefreshToken: false,
  },
});
