interface ToolGroup {
  label: string;
  tools: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  toolGroups?: ToolGroup[];
  prominent?: boolean;
  tone: "blue" | "purple" | "orange" | "teal";
}

const experienceItems: ExperienceItem[] = [
  {
    company: "HKT",
    role: "SOC Tier 1 Analyst",
    duration: "January 2026 – June 2026",
    highlights: [
      "Triaged and investigated alerts across SIEM, EDR, and network-monitoring platforms.",
      "Reviewed endpoint, authentication, and network activity.",
      "Documented findings and collaborated on low-severity incident resolution and initial containment.",
    ],
    toolGroups: [
      { label: "SIEM and Search", tools: ["Splunk", "Elastic"] },
      { label: "Endpoint Detection and Response", tools: ["CrowdStrike Falcon", "Cortex XDR", "Carbon Black Cloud"] },
      { label: "Network Detection", tools: ["Darktrace"] },
    ],
    prominent: true,
    tone: "blue",
  },
  {
    company: "YMCA of Hong Kong",
    role: "Automation Engineering Intern",
    duration: "June 2025 – September 2025",
    highlights: [
      "Built Zapier workflows for HR requisition and candidate-shortlisting processes.",
      "Compared Zapier, n8n, and Make for automation use cases.",
      "Supported web application security testing and documentation.",
    ],
    tone: "purple",
  },
  {
    company: "Kinetix Systems Holding Limited",
    role: "Software Engineering Intern",
    duration: "January 2024 – May 2024",
    highlights: ["Worked on a web-based AI fashion recommendation system."],
    tone: "orange",
  },
  {
    company: "Ask IT Limited",
    role: "Software Engineering Intern",
    duration: "September 2023 – December 2023",
    highlights: ["Worked on a Dutch auction system, accounting system design, testing, and MongoDB maintenance."],
    tone: "teal",
  },
];

export default function Timeline() {
  return (
    <ol className="experience-list mx-auto max-w-5xl space-y-5">
      {experienceItems.map((item) => (
        <li
          key={`${item.company}-${item.role}`}
          className={`experience-card experience-card--${item.tone} ${item.prominent ? "experience-card--prominent" : ""}`}
        >
          <article>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold sm:text-2xl">{item.company}</h3>
                  {item.prominent && (
                    <span className="rounded-full bg-skillBlue/10 px-2.5 py-1 text-xs font-semibold text-skillBlue">Security operations</span>
                  )}
                </div>
                <p className="mt-1 font-medium text-foreground">{item.role}</p>
              </div>
              <p className="shrink-0 text-sm font-medium text-muted-foreground">{item.duration}</p>
            </div>

            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground sm:text-base">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-skillBlue" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            {item.toolGroups && (
              <div className="mt-6 border-t pt-5">
                <h4 className="text-sm font-semibold">Investigation environment</h4>
                <div className="mt-3 grid gap-4 lg:grid-cols-3">
                  {item.toolGroups.map((group) => (
                    <div key={group.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{group.label}</p>
                      <ul className="mt-2 flex flex-wrap gap-2" aria-label={`${group.label} tools`}>
                        {group.tools.map((tool) => (
                          <li key={tool} className="rounded-full border bg-muted/50 px-2.5 py-1 text-xs font-medium">
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </li>
      ))}
    </ol>
  );
}
