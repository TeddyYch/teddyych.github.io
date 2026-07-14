const items = [
  { label: "Build products", tone: "blue" },
  { label: "Design interfaces", tone: "teal" },
  { label: "Develop REST APIs", tone: "green" },
  { label: "Model data", tone: "green" },
  { label: "Automate workflows", tone: "purple" },
  { label: "Integrate systems", tone: "purple" },
  { label: "Investigate alerts", tone: "orange" },
  { label: "Analyse endpoint activity", tone: "orange" },
  { label: "Monitor security events", tone: "orange" },
  { label: "Document incidents", tone: "red" },
  { label: "Ship reliable systems", tone: "green" },
  { label: "Deploy web applications", tone: "blue" },
  { label: "Improve user flows", tone: "teal" },
  { label: "Connect frontend and data", tone: "purple" },
  { label: "Build accessible interfaces", tone: "teal" },
  { label: "Operate security tooling", tone: "red" },
] as const;

function ReelGroup() {
  return (
    <div className="capability-reel__group">
      {items.map((item) => (
        <span key={item.label} className={`capability-reel__item capability-reel__item--${item.tone}`}>
          <span aria-hidden="true" />{item.label}
        </span>
      ))}
    </div>
  );
}

export default function CapabilityReel() {
  return (
    <section className="capability-reel" aria-label="Capability summary" tabIndex={0}>
      <ul className="sr-only">
        {items.map((item) => <li key={item.label}>{item.label}</li>)}
      </ul>
      <div className="capability-reel__viewport" aria-hidden="true">
        <div className="capability-reel__track capability-reel__track--front"><ReelGroup /><ReelGroup /></div>
      </div>
    </section>
  );
}
