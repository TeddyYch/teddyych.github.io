import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface Scenario {
  id: number;
  from: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  tip: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 1,
    from: "security@micr0soft.com",
    subject: "Password expired — immediate action required",
    body: "Your password is expiring today. Verify your account at http://microsoft-security-login.co to avoid deactivation.",
    isPhishing: true,
    tip: "Misspelled domain (micr0soft) and non-HTTPS link are red flags.",
  },
  {
    id: 2,
    from: "hr@company.com",
    subject: "Updated WFH policy PDF",
    body: "Hi team, attaching the latest work-from-home policy for your review. No links inside, just details in the PDF.",
    isPhishing: false,
    tip: "Legitimate internal email, no suspicious links or urgency.",
  },
  {
    id: 3,
    from: "it-helpdesk@companny.com",
    subject: "VPN login issue detected",
    body: "We detected failed VPN attempts from your account. Reset here: https://vpn-reset.example.support/reset",
    isPhishing: true,
    tip: "Domain looks off (example.support), urgency + reset link combo.",
  },
  {
    id: 4,
    from: "noreply@github.com",
    subject: "[GitHub] New sign-in from Chrome on Windows",
    body: "A new sign-in was detected. If this was you, no action needed. If not, review account activity in settings.",
    isPhishing: false,
    tip: "Standard GitHub security notice without suspicious links.",
  },
  {
    id: 5,
    from: "it-admin@company.com",
    subject: "MFA enrollment bonus",
    body: "Enroll MFA today to receive a $50 voucher. Click here: http://company-mfa-bonus.io",
    isPhishing: true,
    tip: "Incentives to click and odd domain — treat with suspicion.",
  },
  {
    id: 6,
    from: "support@bank.com",
    subject: "Unusual activity — verify now",
    body: "We noticed unusual activity. Login here to confirm: https://bank.com.secure-login.icu",
    isPhishing: true,
    tip: "Lookalike subdomain (secure-login.icu) — not the bank's real domain.",
  },
  {
    id: 7,
    from: "events@hkust.edu",
    subject: "Tech Talk: AI Security Best Practices",
    body: "Join us this Friday for a session on securing ML pipelines.",
    isPhishing: false,
    tip: "Trusted sender and no malicious call-to-action.",
  },
];

export default function PhishGame() {
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const ROUND_MAX = 5;

  const scenario = useMemo(() => {
    const pool = SCENARIOS.filter((s) => !history.includes(s.id));
    return pool[Math.floor(Math.random() * pool.length)];
  }, [history]);

  const onAnswer = (answer: boolean) => {
    const correct = answer === scenario.isPhishing;
    if (correct) {
      setScore((s) => s + 1);
      toast({ title: "Correct!", description: scenario.tip });
    } else {
      toast({ title: "Not quite", description: scenario.tip });
    }

    setHistory((h) => [...h, scenario.id]);
    if (round < ROUND_MAX) setRound((r) => r + 1);
  };

  const reset = () => {
    setRound(1);
    setScore(0);
    setHistory([]);
  };

  const finished = round > ROUND_MAX;

  return (
    <section id="game" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <h2 className="text-3xl font-semibold">PhishGuard Mini‑Game</h2>
          <p className="text-muted-foreground mt-2">
            Decide whether the email below is phishing or legit. 5 rounds. Sharpen your cyber instincts.
          </p>
        </div>

        <Card className="max-w-3xl mx-auto animate-enter">
          <CardHeader className="pb-2">
            <CardTitle className="text-skillTeal">Round {Math.min(round, ROUND_MAX)} / {ROUND_MAX}</CardTitle>
          </CardHeader>
          <CardContent>
            {!finished ? (
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-muted/30">
                  <div className="text-sm text-muted-foreground">From: {scenario.from}</div>
                  <div className="font-medium">Subject: {scenario.subject}</div>
                  <p className="mt-2 text-sm leading-relaxed">{scenario.body}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="soft" onClick={() => onAnswer(true)}>Phishing</Button>
                  <Button variant="secondary" onClick={() => onAnswer(false)}>Legit</Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">Score: {score}</div>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-2xl font-semibold">Final Score: {score} / {ROUND_MAX}</div>
                <p className="text-muted-foreground">{score >= 4 ? "Excellent instincts!" : score >= 2 ? "Nice try — review the tips and play again." : "Let's practice more. Watch for domains and urgency."}</p>
                <Button variant="hero" onClick={reset}>Play Again</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
