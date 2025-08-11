import { Button } from "@/components/ui/button";

export interface ChallengeLite {
  prompt: string;
  code: string;
  choices?: string[];
}

export default function ChallengePanel({
  current,
  answer,
  setAnswer,
  onSubmit,
}: {
  current: ChallengeLite;
  answer: string;
  setAnswer: (v: string) => void;
  onSubmit: (raw: string) => void;
}) {
  return (
    <div className="rounded-xl border p-4 bg-muted/30 animate-enter">
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Challenge</div>
      <div className="text-sm font-medium">{current.prompt}</div>
      <pre className="mt-3 text-sm overflow-x-auto rounded-lg border bg-background/60 p-3">
        <code>{current.code.replace(/___/g, "▁▁▁")}</code>
      </pre>

      {current.choices ? (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {current.choices.map((c) => (
            <Button key={c} variant="secondary" onClick={() => onSubmit(c)}>
              {c}
            </Button>
          ))}
        </div>
      ) : (
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(answer);
          }}
        >
          <input
            aria-label="Your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Type the missing code (e.g. map, 42)"
          />
          <Button type="submit" variant="hero">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}
