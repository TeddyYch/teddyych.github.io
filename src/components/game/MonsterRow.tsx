import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function MonsterRow({
  name,
  hp,
  maxHp,
  distance,
}: {
  name: string;
  hp: number;
  maxHp: number;
  distance: number;
}) {
  const hpPct = Math.max(0, Math.round((hp / Math.max(1, maxHp)) * 100));
  const proximity = distance <= 25 ? "Critical" : distance <= 50 ? "Near" : "Far";
  const proximityVariant = distance <= 25 ? ("destructive" as const) : distance <= 50 ? ("secondary" as const) : ("outline" as const);
  const containerGlow = distance <= 25 ? "ring-2 ring-primary/40" : "";

  return (
    <div className={"rounded-lg border p-3 bg-background/60 relative overflow-hidden " + containerGlow}>
      <div className="flex items-center justify-between text-sm mb-2">
        <div className="font-medium bg-gradient-to-r from-skillBlue to-skillPurple bg-clip-text text-transparent">
          {name}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">HP {hp} / {maxHp}</span>
          <Badge variant={proximityVariant}>{proximity}</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>HP</span>
            <span>{hpPct}%</span>
          </div>
          <Progress value={hpPct} className="h-2" />
        </div>
        <div>
          <div className="flex justify-between text-[11px] text-muted-foreground">
            <span>Distance</span>
            <span>{Math.max(0, Math.round(100 - distance))}%</span>
          </div>
          <Progress value={Math.max(0, 100 - distance)} className="h-1" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-skillBlue/10 to-skillPurple/10" />
    </div>
  );
}
