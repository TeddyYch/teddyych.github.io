import { cva } from "class-variance-authority";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const chipVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border",
  {
    variants: {
      tone: {
        blue: "bg-skillBlue/10 text-skillBlue border-skillBlue/30",
        green: "bg-skillGreen/10 text-skillGreen border-skillGreen/30",
        purple: "bg-skillPurple/10 text-skillPurple border-skillPurple/30",
        orange: "bg-skillOrange/10 text-skillOrange border-skillOrange/30",
        red: "bg-skillRed/10 text-skillRed border-skillRed/30",
        teal: "bg-skillTeal/10 text-skillTeal border-skillTeal/30",
      },
    },
    defaultVariants: {
      tone: "blue",
    },
  }
);

const cardVariants = cva("rounded-xl border shadow-sm", {
  variants: {
    tone: {
      blue: "border-skillBlue/30",
      green: "border-skillGreen/30",
      purple: "border-skillPurple/30",
      orange: "border-skillOrange/30",
      red: "border-skillRed/30",
      teal: "border-skillTeal/30",
    },
  },
  defaultVariants: { tone: "blue" },
});

export type Tone = "blue" | "green" | "purple" | "orange" | "red" | "teal";

export function SkillCard({
  title,
  items,
  tone = "blue",
}: {
  title: string;
  items: string[];
  tone?: Tone;
}) {
  return (
    <Card className={cn(cardVariants({ tone }))}>
      <CardHeader className="pb-3">
        <CardTitle className={cn(
          "text-lg font-semibold",
          tone === "blue" && "text-skillBlue",
          tone === "green" && "text-skillGreen",
          tone === "purple" && "text-skillPurple",
          tone === "orange" && "text-skillOrange",
          tone === "red" && "text-skillRed",
          tone === "teal" && "text-skillTeal",
        )}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span key={item} className={cn(chipVariants({ tone }))}>
              {item}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
