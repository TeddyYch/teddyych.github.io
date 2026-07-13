const evidenceTracks = [
  {
    label: "Software",
    tone: "blue",
    steps: ["Web Application", "REST API", "Data"],
  },
  {
    label: "Automation",
    tone: "purple",
    steps: ["Request", "Validation", "Workflow"],
  },
  {
    label: "Security",
    tone: "orange",
    steps: ["SIEM / EDR", "Investigation", "Escalation"],
  },
] as const;

export default function HeroSystemVisual() {
  return (
    <aside className="system-map" aria-labelledby="system-map-title">
      <div className="system-map__header">
        <div>
          <p className="section-kicker">How the work connects</p>
          <h2 id="system-map-title" className="mt-1 text-lg font-semibold">Systems, workflows, and response</h2>
        </div>
        <span className="system-map__status"><span aria-hidden="true" /> Practical experience</span>
      </div>

      <div className="system-map__tracks">
        {evidenceTracks.map((track) => (
          <section key={track.label} className={`system-track system-track--${track.tone}`} aria-label={`${track.label} evidence flow`}>
            <h3>{track.label}</h3>
            <ol>
              {track.steps.map((step, index) => (
                <li key={step}>
                  <span>{step}</span>
                  {index < track.steps.length - 1 && <span className="system-track__connector" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </aside>
  );
}
