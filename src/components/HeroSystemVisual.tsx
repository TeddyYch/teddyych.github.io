import { Braces, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { useState, type CSSProperties } from "react";

interface StackPanel {
  id: "build" | "automate" | "secure";
  label: string;
  phrase: string;
  tools: string[];
  icon: LucideIcon;
}

const stackPanels: StackPanel[] = [
  {
    id: "build",
    label: "Build",
    phrase: "Product interfaces and data-backed workflows",
    tools: ["React Interface", "REST API", "PostgreSQL"],
    icon: Braces,
  },
  {
    id: "automate",
    label: "Automate",
    phrase: "Process orchestration and operational automation",
    tools: ["Zapier", "n8n", "Workflow Design"],
    icon: Workflow,
  },
  {
    id: "secure",
    label: "Secure",
    phrase: "Alert triage and endpoint investigation",
    tools: ["Splunk", "CrowdStrike Falcon", "Incident Investigation"],
    icon: ShieldCheck,
  },
];

export default function HeroSystemVisual() {
  const [activePanel, setActivePanel] = useState<StackPanel["id"] | null>(null);

  return (
    <aside className="engineering-stack" aria-labelledby="engineering-stack-title" data-active={activePanel ?? "none"}>
      <div className="engineering-stack__heading">
        <p className="section-kicker text-skillTeal">Engineering stack</p>
        <h2 id="engineering-stack-title">What I build and operate</h2>
        <p>Three connected areas of practical experience.</p>
      </div>

      <div className="engineering-stack__panels">
        {stackPanels.map((panel, index) => {
          const Icon = panel.icon;
          return (
            <button
              key={panel.id}
              type="button"
              className={`stack-panel stack-panel--${panel.id}`}
              style={{ "--panel-index": index } as CSSProperties}
              aria-pressed={activePanel === panel.id}
              onPointerEnter={() => setActivePanel(panel.id)}
              onPointerLeave={() => setActivePanel(null)}
              onFocus={() => setActivePanel(panel.id)}
              onBlur={() => setActivePanel(null)}
            >
              <span className="stack-panel__topline">
                <span className="stack-panel__identity"><Icon aria-hidden="true" /><span>{panel.label}</span></span>
                <span className="stack-panel__status"><span aria-hidden="true" /> Focus area</span>
              </span>
              <span className="stack-panel__phrase">{panel.phrase}</span>
              <span className="stack-panel__tools" aria-label={`${panel.label} tools and practices`}>
                {panel.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
