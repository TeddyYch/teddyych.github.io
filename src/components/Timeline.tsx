import ymcaLogo from "@/assets/logos/ymca-logo.png";
import kinetixLogo from "@/assets/logos/kinetix-logo.png";
import askItLogo from "@/assets/logos/askit-logo.png";

interface ToolGroup {
  label: string;
  tools: string[];
}

interface ExperienceItem {
  year: string;
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  toolGroups?: ToolGroup[];
  prominent?: boolean;
  tone: "blue" | "purple" | "orange" | "teal";
  logo?: string;
  monogram?: string;
}

const experienceItems: ExperienceItem[] = [
  {
    year: "2026",
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
    monogram: "HKT",
  },
  {
    year: "2025",
    company: "YMCA of Hong Kong",
    role: "Automation Engineering Intern",
    duration: "June 2025 – September 2025",
    highlights: [
      "Built workflow automations for HR requisition and candidate-shortlisting processes using Zapier.",
      "Evaluated alternative workflow implementations using n8n and Make.",
      "Supported web application security testing, workflow documentation, and operational handover.",
    ],
    tone: "purple",
    logo: ymcaLogo,
  },
  {
    year: "2024",
    company: "Kinetix Systems Holding Limited",
    role: "Software Engineering Intern",
    duration: "January 2024 – May 2024",
    highlights: [
      "Supported backend development for a Python-based fashion recommendation application using a pretrained VGG16 model.",
      "Automated fashion-image data collection and processing for application use.",
      "Supported system integration, testing, debugging, and product demonstrations.",
    ],
    tone: "orange",
    logo: kinetixLogo,
  },
  {
    year: "2023",
    company: "Ask IT Limited",
    role: "Software Engineering Intern",
    duration: "September 2023 – December 2023",
    highlights: [
      "Developed and tested features for a Dutch auction web application using React and MongoDB.",
      "Supported MongoDB database operations, data maintenance, and application integration.",
      "Implemented accounting-related application logic and backend processing in Python.",
    ],
    tone: "teal",
    logo: askItLogo,
  },
];

export default function Timeline() {
  return (
    <ol className="timeline-list">
      {experienceItems.map((item, index) => {
        const side = index % 2 === 0 ? "left" : "right";

        return (
          <li key={`${item.company}-${item.role}`} className={`timeline-entry timeline-entry--${side} timeline-entry--${item.tone}`}>
            <div className="timeline-identity">
              <span className="timeline-year">{item.year}</span>
              <span className="timeline-marker" aria-hidden="true">
                {item.logo ? <img src={item.logo} alt="" /> : <span>{item.monogram}</span>}
              </span>
            </div>

            <article className={`timeline-card ${item.prominent ? "timeline-card--prominent" : ""}`}>
              <div className="timeline-card__heading">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3>{item.company}</h3>
                    {item.prominent && <span className="status-chip status-chip--blue">Security operations</span>}
                  </div>
                  <p className="timeline-card__role">{item.role}</p>
                </div>
                <p className="timeline-card__date">{item.duration}</p>
              </div>

              <ul className="timeline-card__highlights">
                {item.highlights.map((highlight) => (
                  <li key={highlight}><span aria-hidden="true" />{highlight}</li>
                ))}
              </ul>

              {item.toolGroups && (
                <div className="timeline-tools">
                  <h4>Investigation environment</h4>
                  <div className="timeline-tools__groups">
                    {item.toolGroups.map((group) => (
                      <section key={group.label}>
                        <h5>{group.label}</h5>
                        <ul aria-label={`${group.label} tools`}>
                          {group.tools.map((tool) => <li key={tool} className="surface-chip">{tool}</li>)}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}
