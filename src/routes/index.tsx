import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AREAS,
  QUESTIONS,
  calcularResultado,
  type AreaKey,
} from "@/lib/vocational";
import { saveSubmission } from "@/lib/submissions";
import { toast } from "sonner";

const TITLE = "Teste Vocacional — Feira de Profissões UTFPR";
const DESCRIPTION =
  "Descubra em 20 perguntas qual área combina com você na Feira de Profissões da UTFPR.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://utfpr-pb-feira-de-profissoes-teste-vocacional.lovable.app/",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://utfpr-pb-feira-de-profissoes-teste-vocacional.lovable.app/",
      },
    ],
  }),

  component: Index,
});

const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Informe seu e-mail" })
    .email({ message: "E-mail inválido" })
    .max(255, { message: "E-mail muito longo" }),
  consent: z.literal(true, { message: "É necessário aceitar o consentimento LGPD" }),
});

type Step = "form" | "quiz" | "result";

function Index() {
  const [step, setStep] = useState<Step>("form");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AreaKey[]>([]);
  const [result, setResult] = useState<AreaKey | null>(null);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const canStart = formSchema.safeParse({ email, consent }).success;

  function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const parsed = formSchema.safeParse({ email, consent });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }
    setError(null);
    setStep("quiz");
  }

  async function handleAnswer(area: AreaKey) {
    const next = [...answers, area];
    setAnswers(next);
    if (current + 1 < QUESTIONS.length) {
      setCurrent(current + 1);
      return;
    }
    const finalResult = calcularResultado(next);
    setResult(finalResult);
    setStep("result");
    setSaveState("saving");
    const res = await saveSubmission({
      email: email.trim(),
      consentimento_lgpd: consent,
      answers: next,
      result: finalResult,
    });

    setSaveState(res.ok ? "saved" : "error");
    if (res.ok) {
      toast.success("Respostas registradas com sucesso!");
    } else {
      setSaveError(res.error ?? "Erro desconhecido");
      toast.error("Erro ao salvar no banco", { description: res.error });
    }
  }


  function restart() {
    setStep("form");
    setEmail("");
    setConsent(false);
    setAnswers([]);
    setCurrent(0);
    setResult(null);
    setError(null);
    setSaveError(null);
    setSaveState("idle");
  }

  const progresso = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <main className="min-h-screen bg-background text-foreground">
      {step === "quiz" && (
        <div className="sticky top-0 z-20 border-b border-border/60 bg-background/90 backdrop-blur">
          <div className="mx-auto w-full max-w-md px-5 py-3">
            <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest">
              <span className="text-muted-foreground">Progresso</span>
              <span className="text-primary">
                {current + 1}/{QUESTIONS.length}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>
      )}
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-10 pt-8">
        <header className="mb-8">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            UTFPR
          </span>
          <h1 className="mt-4 text-3xl font-extrabold leading-tight">
            Teste Vocacional
            <span className="block text-primary">Feira de Profissões</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            20 perguntas rápidas para descobrir a área que mais combina com você.
          </p>
        </header>

        {step === "form" && (
          <form
            onSubmit={handleStart}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-brand)]"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                maxLength={255}
                placeholder="voce@exemplo.com"
                value={email}
                 onChange={(e) => {
                   setEmail(e.target.value);
                   setError(null);
                 }}
              />
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl bg-secondary p-4">
              <Checkbox
                id="consent"
                checked={consent}
                 onCheckedChange={(v) => {
                   setConsent(v === true);
                   setError(null);
                 }}
                className="mt-0.5"
              />
              <Label htmlFor="consent" className="text-xs font-normal leading-relaxed">
                Consentimento LGPD: autorizo a UTFPR a coletar e tratar meu e-mail e minhas
                respostas para fins de orientação vocacional e comunicação sobre a Feira de
                Profissões, conforme a Lei nº 13.709/2018.
              </Label>
            </div>

            {error && <p className="mt-4 text-xs text-destructive">{error}</p>}

             <Button
               type="submit"
               disabled={!canStart}
               className="mt-6 h-12 w-full text-base font-bold"
             >
              Começar teste
            </Button>
          </form>
        )}

        {step === "quiz" && QUESTIONS[current] && (
          <section className="rounded-2xl border border-border bg-card p-5">
            <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-primary">
              Pergunta {current + 1} de {QUESTIONS.length}
            </p>
            <h2 className="mt-2 text-xl font-bold leading-snug">
               {QUESTIONS[current]?.pergunta}
            </h2>
            <div className="mt-5 space-y-3">
               {QUESTIONS[current]?.opcoes.map((opcao) => (

                <button
                  key={opcao.texto}
                  type="button"
                  onClick={() => handleAnswer(opcao.area)}
                  className="w-full rounded-xl border border-border bg-secondary px-4 py-4 text-left text-sm font-medium transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {opcao.texto}
                </button>
              ))}
            </div>
          </section>
        )}

        {step === "result" && result && (
          <section className="rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-brand)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Sua área é
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-primary">{AREAS[result].nome}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{AREAS[result].descricao}</p>

            <div className="mt-6 rounded-xl bg-secondary p-4 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                Cursos da UTFPR Recomendados para o seu Perfil
              </p>
              <ul className="mt-3 space-y-2">
                {AREAS[result].cursos.map((curso) => (
                  <li key={curso} className="text-sm leading-snug">
                    • {curso}
                  </li>
                ))}
              </ul>
            </div>

             <p className="mt-5 text-xs text-muted-foreground">
              {saveState === "saving" && "Salvando suas respostas..."}
            </p>

             {saveState === "saved" && (
               <div
                 role="status"
                 className="mt-5 rounded-xl border-2 border-primary bg-primary p-5 text-left text-base font-bold text-primary-foreground"
               >
                 Respostas salvas com sucesso na tabela participantes para {email}.
               </div>
             )}


             {saveState === "error" && (
               <div
                 role="alert"
                 className="mt-5 border-2 border-destructive bg-destructive p-5 text-left text-base font-bold text-destructive-foreground"
               >
                 {saveError ?? "Erro desconhecido"}
               </div>
             )}


            <Button variant="outline" className="mt-6 h-11 w-full" onClick={restart}>
              Refazer teste
            </Button>
          </section>
        )}

        <footer className="mt-auto pt-10 text-center text-[11px] text-muted-foreground">
          <p>Feira de Profissões UTFPR · Dados tratados conforme a LGPD</p>
          <p className="mt-1">
            Teste vocacional desenvolvido pela pedagoga Maria da Luz Calegari
          </p>
        </footer>
      </div>
    </main>
  );
}
