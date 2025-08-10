import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";

interface Monster {
  id: number;
  name: string;
  maxHp: number;
  hp: number;
  speed: number; // distance drained per tick
  distance: number; // 100 -> far, 0 -> reached base
}

interface Challenge {
  id: number;
  lang: "ts" | "js" | "git";
  prompt: string;
  code: string; // contains ___ for blank
  answers: string[]; // acceptable answers (case-sensitive where needed)
  choices?: string[]; // optional quick choices
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    lang: "js",
    prompt: "Fill the missing method to double every number.",
    code: `const nums = [1,2,3]\nconst out = nums.___(n => n * 2)\nconsole.log(out)` ,
    answers: ["map"],
    choices: ["map", "filter", "reduce"],
  },
  {
    id: 2,
    lang: "ts",
    prompt: "Return the sum using reduce",
    code: `const arr = [1,2,3]\nconst sum = arr.___((a,b) => a + b, 0)`,
    answers: ["reduce"],
    choices: ["map", "reduce", "forEach"],
  },
  {
    id: 3,
    lang: "git",
    prompt: "Stage all changes",
    code: `$ git ___ .`,
    answers: ["add"],
    choices: ["add", "commit", "push"],
  },
  {
    id: 4,
    lang: "js",
    prompt: "Fix the bug: ensure only even numbers remain",
    code: `const out = [1,2,3,4].___(n => n % 2 === 0)`,
    answers: ["filter"],
    choices: ["map", "filter", "find"],
  },
  {
    id: 5,
    lang: "ts",
    prompt: "Complete the Promise that resolves to 42",
    code: `new Promise((resolve) => {\n  setTimeout(() => resolve(___), 10)\n})`,
    answers: ["42"],
  },
  {
    id: 6,
    lang: "js",
    prompt: "Replace ___ to get the last item",
    code: `const arr = ['a','b','c']\nconst last = arr.at(___)`,
    answers: ["-1"],
  },
  {
    id: 7,
    lang: "git",
    prompt: "Create and switch to a new branch feature/ui",
    code: `$ git checkout -___ feature/ui`,
    answers: ["b"],
    choices: ["b", "B", "m"],
  },
  {
    id: 8,
    lang: "js",
    prompt: "Fill to flatten one level",
    code: `[[1],[2,3]].___(1) // -> [1,2,3]`,
    answers: ["flat"],
    choices: ["flat", "map", "reduce"],
  },
];

function spawnWave(wave: number): Monster[] {
  const count = Math.min(3 + wave, 7);
  return new Array(count).fill(0).map((_, i) => {
    const baseHp = 60 + wave * 15 + i * 5;
    const speed = 6 + Math.min(wave * 1.5, 12) + Math.random() * 2;
    return {
      id: Date.now() + i,
      name: `Bug ${wave}-${i + 1}`,
      maxHp: baseHp,
      hp: baseHp,
      speed,
      distance: 100,
    } as Monster;
  });
}

export default function CodeDefenseGame() {
  const [started, setStarted] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [monsters, setMonsters] = useState<Monster[]>([]);
  const [answer, setAnswer] = useState("");
  const [current, setCurrent] = useState<Challenge>(() => CHALLENGES[0]);
  const tickRef = useRef<number | null>(null);

  const alive = monsters.filter((m) => m.hp > 0);
  const frontMost = useMemo(() => alive.sort((a,b) => a.distance - b.distance)[0], [monsters]);

  // Game loop
  useEffect(() => {
    if (!started) return;
    if (!tickRef.current) {
      tickRef.current = window.setInterval(() => {
        setMonsters((prev) => {
          const next = prev.map((m) => ({ ...m, distance: Math.max(0, m.distance - m.speed) }));
          const breached = next.filter((m) => m.distance <= 0 && m.hp > 0);
          if (breached.length) {
            setLives((l) => Math.max(0, l - breached.length));
            toast({ title: "Breach!", description: `${breached.length} bug(s) reached production.` });
            return next.filter((m) => m.distance > 0 || m.hp <= 0);
          }
          return next;
        });
      }, 1000);
    }
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current);
      tickRef.current = null;
    };
  }, [started]);

  // Wave management
  useEffect(() => {
    if (!started) return;
    if (alive.length === 0) {
      setWave((w) => w + 1);
      const next = spawnWave(wave + 1);
      setMonsters(next);
      toast({ title: `Wave ${wave + 1}`, description: "New wave incoming!" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alive.length, started]);

  // Game over
  useEffect(() => {
    if (started && lives <= 0) {
      setStarted(false);
      toast({ title: "Game Over", description: `Final score: ${score}` });
    }
  }, [lives, started, score]);

  const nextChallenge = () => {
    const pool = CHALLENGES.filter((c) => c.id !== current.id);
    setCurrent(pool[Math.floor(Math.random() * pool.length)]);
    setAnswer("");
  };

  const start = () => {
    setLives(3);
    setScore(0);
    setWave(1);
    setMonsters(spawnWave(1));
    setStarted(true);
    nextChallenge();
  };

  const dealDamage = (raw: string) => {
    if (!started) return;
    const ok = current.answers.some((a) => a === raw.trim());
    if (!ok) {
      toast({ title: "Try again", description: "That doesn't fix the bug yet." });
      return;
    }
    // damage the closest alive monster
    setMonsters((prev) => {
      const sorted = [...prev].sort((a,b) => a.distance - b.distance);
      for (const m of sorted) {
        if (m.hp > 0) {
          const damage = 34 + wave * 6;
          m.hp = Math.max(0, m.hp - damage);
          if (m.hp === 0) {
            setScore((s) => s + 100 + wave * 20);
            toast({ title: "Bug squashed!", description: `-${damage} HP • +${100 + wave * 20} pts` });
          } else {
            toast({ title: "Hit!", description: `-${damage} HP` });
          }
          break;
        }
      }
      return [...sorted].sort((a,b) => a.id - b.id);
    });
    nextChallenge();
  };

  return (
    <section id="game" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center mb-8">
          <h2 className="text-3xl font-semibold">Code Defense — Battle the Bugs</h2>
          <p className="text-muted-foreground mt-2">Solve quick coding prompts to deal damage before bugs reach production.</p>
        </div>

        <Card className="max-w-4xl mx-auto bg-background/80 backdrop-blur border-primary/30">
          <CardHeader className="pb-2">
            <CardTitle className="bg-gradient-to-r from-skillBlue to-skillPurple bg-clip-text text-transparent">
              Wave {wave} {started ? "" : "(paused)"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* HUD */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span>Lives:</span>
                <div className="flex gap-1">
                  {new Array(3).fill(0).map((_, i) => (
                    <span key={i} className={"inline-block size-3 rounded-full " + (i < lives ? "bg-primary" : "bg-muted")}></span>
                  ))}
                </div>
              </div>
              <div className="text-sm">Score: <span className="font-medium">{score}</span></div>
            </div>

            {/* Monsters */}
            <div className="space-y-3">
              {alive.map((m) => (
                <div key={m.id} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="font-medium">{m.name}</div>
                    <div className="text-muted-foreground">HP {m.hp} / {m.maxHp}</div>
                  </div>
                  <Progress value={100 - m.distance} className="h-2" />
                </div>
              ))}
              {!alive.length && started && (
                <div className="text-center text-sm text-muted-foreground">Preparing next wave…</div>
              )}
            </div>

            {/* Challenge */}
            <div className="rounded-xl border p-4 bg-muted/30 animate-enter">
              <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Challenge</div>
              <div className="text-sm font-medium">{current.prompt}</div>
              <pre className="mt-3 text-sm overflow-x-auto rounded-lg border bg-background/60 p-3">
                <code>
                  {current.code.replace(/___/g, "▁▁▁")}
                </code>
              </pre>

              {current.choices ? (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {current.choices.map((c) => (
                    <Button key={c} variant="secondary" onClick={() => dealDamage(c)}>{c}</Button>
                  ))}
                </div>
              ) : (
                <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); dealDamage(answer); }}>
                  <input
                    aria-label="Your answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Type the missing code (e.g. map, 42)"
                  />
                  <Button type="submit" variant="hero">Submit</Button>
                </form>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-3">
              {!started ? (
                <Button variant="hero" onClick={start}>Start Game</Button>
              ) : (
                <Button variant="soft" onClick={() => setStarted(false)}>Pause</Button>
              )}
              {started && (
                <Button variant="outline" onClick={() => { setStarted(false); start(); }}>Restart</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
