const workflowSteps = ["Request", "Validation", "Processing", "Decision", "Notification"];

export default function AutomationWorkflow() {
  return (
    <section aria-labelledby="workflow-title" className="workflow-panel">
      <div className="workflow-panel__intro">
        <p className="section-kicker text-skillPurple">Automation workflow</p>
        <h3 id="workflow-title" className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">A clear path from request to follow-up</h3>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
          Illustrative workflow using generic data. It represents process orchestration only and does not imply automatic hiring decisions or AI scoring.
        </p>
      </div>

      <ol className="workflow-steps" aria-label="Illustrative automation workflow steps">
        {workflowSteps.map((step, index) => (
          <li key={step}>
            <span className="workflow-steps__number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className="workflow-steps__label">{step}</span>
            {index < workflowSteps.length - 1 && <span className="workflow-steps__connector" aria-hidden="true" />}
          </li>
        ))}
      </ol>
    </section>
  );
}
