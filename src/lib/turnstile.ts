/**
 * Cliente do Cloudflare Turnstile (navegador).
 * A Site Key é pública por definição; o Secret fica apenas no servidor.
 */
export const TURNSTILE_SITE_KEY = "0x4AAAAAAE_Yp1Qn7Rzh3BVM";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: Record<string, unknown>,
  ) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<TurnstileApi> | null = null;

function loadTurnstile(): Promise<TurnstileApi> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Turnstile indisponível no servidor"));
  }
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error("Turnstile não carregou"));
    };
    script.onerror = () => {
      scriptPromise = null;
      reject(new Error("Falha ao carregar Turnstile"));
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

/** Executa o desafio e devolve um token novo (evita expiração durante o teste). */
export async function getTurnstileToken(): Promise<string> {
  const turnstile = await loadTurnstile();

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.bottom = "1rem";
  container.style.right = "1rem";
  container.style.zIndex = "60";
  document.body.appendChild(container);

  return new Promise<string>((resolve, reject) => {
    let widgetId: string | undefined;
    const cleanup = () => {
      clearTimeout(timer);
      try {
        if (widgetId) turnstile.remove(widgetId);
      } catch {
        /* widget já removido */
      }
      container.remove();
    };

    const timer = setTimeout(() => {
      cleanup();
      reject(new Error("Turnstile timeout"));
    }, 60_000);

    try {
      widgetId = turnstile.render(container, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: "interaction-only",
        callback: (token: string) => {
          cleanup();
          resolve(token);
        },
        "error-callback": () => {
          cleanup();
          reject(new Error("Turnstile error"));
        },
        "timeout-callback": () => {
          cleanup();
          reject(new Error("Turnstile timeout"));
        },
      });
    } catch (e) {
      cleanup();
      reject(e instanceof Error ? e : new Error("Turnstile falhou"));
    }
  });
}
