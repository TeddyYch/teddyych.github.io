import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const chipVariants = cva("surface-chip", {
  variants: {
    tone: {
      blue: "border-skillBlue/25 bg-skillBlue/[0.07] text-foreground",
      green: "border-skillGreen/25 bg-skillGreen/[0.07] text-foreground",
      purple: "border-skillPurple/25 bg-skillPurple/[0.07] text-foreground",
      orange: "border-skillOrange/25 bg-skillOrange/[0.07] text-foreground",
      red: "border-skillRed/25 bg-skillRed/[0.07] text-foreground",
      teal: "border-skillTeal/25 bg-skillTeal/[0.07] text-foreground",
    },
  },
  defaultVariants: { tone: "blue" },
});

const cardVariants = cva("skill-card group", {
  variants: {
    tone: {
      blue: "skill-card--blue",
      green: "skill-card--green",
      purple: "skill-card--purple",
      orange: "skill-card--orange",
      red: "skill-card--red",
      teal: "skill-card--teal",
    },
  },
  defaultVariants: { tone: "blue" },
});

export type Tone = "blue" | "green" | "purple" | "orange" | "red" | "teal";

export function SkillCard({
  title,
  description,
  items,
  tone = "blue",
  className,
}: {
  title: string;
  description?: string;
  items: string[];
  tone?: Tone;
  className?: string;
}) {
  return (
    <Card className={cn(cardVariants({ tone }), className)}>
      <CardHeader className="pb-4">
        <div className="skill-card__accent" aria-hidden="true" />
        <CardTitle className="text-lg font-semibold tracking-tight">{title}</CardTitle>
        {description && <p className="text-sm leading-6 text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <ul className="flex flex-wrap gap-2" aria-label={`${title} skills`}>
          {items.map((item) => (
            <li key={item} className={cn(chipVariants({ tone }))}>{item}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
