import { ExternalLink, Github } from "lucide-react";
import { portfolioLinks } from "@/config/portfolio";
import { Button } from "@/components/ui/button";

const technologies = ["React", "TypeScript", "Vite", "PostgreSQL", "REST APIs", "Vercel"];

const capabilities = [
  "Multi-page report workflows",
  "Structured calculation and analysis results",
  "Feedback collection",
  "Interactive visualisations",
  "3D oracle-card experience",
];

const evidence = [
  {
    label: "Product",
    tone: "blue",
    text: "Personalised, multi-page cultural-analysis and self-reflection flows with structured results and feedback collection.",
  },
  {
    label: "Engineering",
    tone: "green",
    text: "A React and TypeScript interface connected to REST APIs and PostgreSQL-backed workflows, built and deployed with Vite and Vercel.",
  },
  {
    label: "Interaction",
    tone: "purple",
    text: "Interactive visualisations and a 3D oracle-card experience extend the reports beyond static content.",
  },
] as const;

export default function FeaturedProjects() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24">
      <div className="section-glow section-glow--blue" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker text-skillBlue">Featured project</p>
            <h2 id="work-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">MINGTO HK / Hong Kong Insights</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              A personalised Hong Kong cultural-analysis and self-reflection web product, presented as the primary case study for product and full-stack development.
            </p>
          </div>
          <span className="status-chip status-chip--orange">In Development</span>
        </div>

        <article className="project-shell">
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[0.82fr_1.18fr] lg:p-10">
            <div className="min-w-0">
              <div className="project-detail">
                <p className="project-detail__label">Purpose</p>
                <p>A personalised Hong Kong cultural-analysis and self-reflection web product.</p>
              </div>
              <div className="project-detail mt-6">
                <p className="project-detail__label">My role</p>
                <p>Full-stack product development across the React interface, REST API integration, structured report workflows, interactive visualisations, and deployment setup.</p>
              </div>

              <div className="mt-7">
                <p className="project-detail__label">Technology</p>
                <ul className="mt-3 flex flex-wrap gap-2" aria-label="MINGTO technology stack">
                  {technologies.map((technology) => (
                    <li key={technology} className="surface-chip">{technology}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-7">
                <p className="project-detail__label">Capabilities in scope</p>
                <ul className="mt-3 space-y-2.5 text-sm leading-6 text-muted-foreground">
                  {capabilities.map((capability) => (
                    <li key={capability} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-skillBlue" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {(portfolioLinks.mingtoLive || portfolioLinks.mingtoRepository) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {portfolioLinks.mingtoLive && (
                    <Button asChild>
                      <a href={portfolioLinks.mingtoLive} target="_blank" rel="noreferrer">Live demo <ExternalLink aria-hidden="true" /></a>
                    </Button>
                  )}
                  {portfolioLinks.mingtoRepository && (
                    <Button asChild variant="outline">
                      <a href={portfolioLinks.mingtoRepository} target="_blank" rel="noreferrer">Source code <Github aria-hidden="true" /></a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            <figure className="browser-frame min-w-0">
              <div className="browser-frame__bar" aria-hidden="true">
                <span /><span /><span />
                <span className="browser-frame__address">MINGTO HK</span>
              </div>
              <img
                src="/projects/mingto/mingto-home-desktop.jpg"
                alt="MINGTO HK homepage showing the personalised cultural-analysis product interface"
                width="1896"
                height="903"
                loading="lazy"
                decoding="async"
              />
              <figcaption>Product homepage</figcaption>
            </figure>
          </div>

          <div className="project-gallery">
            <figure className="project-shot project-shot--report">
              <div className="project-shot__image">
                <img
                  src="/projects/mingto/mingto-report-desktop.jpg"
                  alt="MINGTO HK structured report workflow displaying personalised analysis results"
                  width="1900"
                  height="904"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption><span>Report workflow</span><small>Structured calculation and analysis results</small></figcaption>
            </figure>
            <figure className="project-shot project-shot--oracle">
              <div className="project-shot__image">
                <img
                  src="/projects/mingto/mingto-oracle-desktop.jpg"
                  alt="MINGTO HK oracle-card interface showing the interactive 3D experience"
                  width="1898"
                  height="901"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption><span>Oracle interaction</span><small>Interactive 3D card experience</small></figcaption>
            </figure>
          </div>

          <div className="evidence-grid">
            {evidence.map((item) => (
              <section key={item.label} className={`evidence-card evidence-card--${item.tone}`}>
                <h3>{item.label}</h3>
                <p>{item.text}</p>
              </section>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
