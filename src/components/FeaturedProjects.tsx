import { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { portfolioLinks } from "@/config/portfolio";
import { Button } from "@/components/ui/button";
import KineticProjectGallery, { type ProjectSlide } from "@/components/KineticProjectGallery";

const mingtoTechnologies = ["React", "TypeScript", "Vite", "PostgreSQL", "REST APIs", "Vercel"];
const stockTechnologies = ["Python", "Streamlit", "SQLite", "yfinance", "SEC & IR data", "pytest"];

const mingtoSlides: ProjectSlide[] = [
  {
    id: "home",
    navLabel: "Homepage",
    address: "MINGTO HK / Home",
    title: "Product homepage",
    detail: "Primary product interface",
    src: "/projects/mingto/mingto-home-desktop.jpg",
    alt: "MINGTO HK homepage showing the personalised cultural-analysis product interface",
    width: 1896,
    height: 903,
  },
  {
    id: "report",
    navLabel: "Report",
    address: "MINGTO HK / Report",
    title: "Report workflow",
    detail: "Structured calculation and analysis results",
    src: "/projects/mingto/mingto-report-desktop.jpg",
    alt: "MINGTO HK structured report workflow displaying personalised analysis results",
    width: 1900,
    height: 904,
  },
  {
    id: "oracle",
    navLabel: "Oracle",
    address: "MINGTO HK / Oracle",
    title: "Oracle interaction",
    detail: "Interactive 3D card experience",
    src: "/projects/mingto/mingto-oracle-desktop.jpg",
    alt: "MINGTO HK oracle-card interface showing the interactive 3D experience",
    width: 1898,
    height: 901,
  },
];

const mingtoCapabilities = [
  "Multi-page report workflows",
  "Structured calculation and analysis results",
  "Personalised result generation",
  "Feedback collection",
  "Interactive visualisations",
  "3D oracle-card experience",
];

const stockCapabilities = [
  "Watchlist and portfolio monitoring",
  "Technical and research scoring",
  "News and filing aggregation",
  "Source weighting and story deduplication",
  "Explainable decision outputs",
  "Bull, base, and bear research framing",
  "Saved reports and research journal",
];

const mingtoEvidence = [
  { label: "Product", tone: "blue", text: "Personalised, multi-page cultural-analysis and self-reflection flows with structured results and feedback collection." },
  { label: "Engineering", tone: "green", text: "A React and TypeScript interface connected to REST APIs and PostgreSQL-backed workflows, built with Vite and deployed on Vercel." },
  { label: "Interaction", tone: "purple", text: "Interactive visualisations and a 3D oracle-card experience extend the reports beyond static content." },
] as const;

const stockEvidence = [
  { label: "Research", tone: "blue", text: "Market data, news, and filings are assembled into a repeatable workflow with explicit source handling and saved analysis." },
  { label: "Decision logic", tone: "purple", text: "Scoring and validation logic keep technical and research signals explainable through bull, base, and bear framing." },
  { label: "Engineering", tone: "green", text: "A tested Python pipeline, SQLite persistence, and Streamlit interface support monitoring, reports, and a research journal." },
] as const;

const stockSlides: ProjectSlide[] = [
  {
    id: "overview",
    navLabel: "Overview",
    address: "Stock Thesis Monitor / Overview",
    title: "Monitoring overview",
    detail: "Watchlist, portfolio, and signal summary",
    src: "/projects/stock-thesis-monitor/stock-thesis-monitor-overview.png",
    alt: "Stock Thesis Monitor overview showing watchlist, portfolio, and research signals",
    width: 1825,
    height: 904,
  },
  {
    id: "news",
    navLabel: "News",
    address: "Stock Thesis Monitor / News",
    title: "News and filings",
    detail: "Weighted sources and deduplicated stories",
    src: "/projects/stock-thesis-monitor/stock-thesis-monitor-news.png",
    alt: "Stock Thesis Monitor news view showing aggregated and weighted research sources",
    width: 1824,
    height: 901,
  },
  {
    id: "research",
    navLabel: "Research",
    address: "Stock Thesis Monitor / Research",
    title: "Explainable research",
    detail: "Bull, base, and bear decision framing",
    src: "/projects/stock-thesis-monitor/stock-thesis-monitor-research.png",
    alt: "Stock Thesis Monitor research view showing explainable bull, base, and bear analysis",
    width: 1828,
    height: 905,
  },
];

export default function FeaturedProjects() {
  const [activeMingtoSlide, setActiveMingtoSlide] = useState("home");
  const [activeStockSlide, setActiveStockSlide] = useState("overview");

  return (
    <div id="product" className="scroll-mt-20">
      <section aria-labelledby="product-title" className="project-section relative overflow-hidden py-20 sm:py-28" data-gallery-active={activeMingtoSlide}>
        <div className="section-glow project-section__glow" aria-hidden="true" />
        <div className="container relative mx-auto px-4">
          <div className="mb-12 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="section-kicker text-skillBlue">Selected work · 01</p>
              <h2 id="product-title" className="section-heading section-heading--project mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"><span className="heading-accent heading-accent--orange">MINGTO HK</span> / Hong Kong Insights</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                A personalised Hong Kong cultural-analysis and self-reflection web product, built as an interactive full-stack report experience.
              </p>
            </div>
            <span className="status-chip status-chip--orange">In Development</span>
          </div>

          <article className="project-case">
            <div className="project-overview">
              <div className="project-narrative">
                <div className="project-detail">
                  <p className="project-detail__label">Purpose</p>
                  <p>Create a guided product experience that transforms structured user input into personalised cultural analysis, reports, and interactive results.</p>
                </div>
                <div className="project-detail mt-6">
                  <p className="project-detail__label">My role</p>
                  <p>Full-stack product development across the React interface, REST API integration, structured report workflows, interactive visualisations, and deployment setup.</p>
                </div>
                <ProjectTechnology label="MINGTO technology stack" technologies={mingtoTechnologies} />
                <ProjectCapabilities capabilities={mingtoCapabilities} />
                {(portfolioLinks.mingtoLive || portfolioLinks.mingtoRepository) && (
                  <div className="mt-8 flex flex-wrap gap-3">
                    {portfolioLinks.mingtoLive && <Button asChild><a href={portfolioLinks.mingtoLive} target="_blank" rel="noreferrer">Live demo <ExternalLink aria-hidden="true" /></a></Button>}
                    {portfolioLinks.mingtoRepository && <Button asChild variant="outline"><a href={portfolioLinks.mingtoRepository} target="_blank" rel="noreferrer">Source code <Github aria-hidden="true" /></a></Button>}
                  </div>
                )}
              </div>

              <KineticProjectGallery galleryId="mingto" label="MINGTO HK" slides={mingtoSlides} onActiveChange={setActiveMingtoSlide} />
            </div>
            <ProjectEvidence items={mingtoEvidence} />
          </article>
        </div>
      </section>

      <section aria-labelledby="stock-project-title" className="project-section project-section--stock section-grid relative overflow-hidden border-y py-20 sm:py-28" data-gallery-active={activeStockSlide}>
        <div className="section-glow project-section__glow" aria-hidden="true" />
        <div className="container relative mx-auto px-4">
          <div className="mb-12 max-w-3xl">
            <p className="section-kicker text-skillPurple">Selected work · 02</p>
            <h2 id="stock-project-title" className="section-heading section-heading--stock mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"><span className="heading-accent heading-accent--blue">Stock Thesis</span> Monitor</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              An explainable research and decision-support tool that combines market data, news, filings, and thesis logic into a structured stock-monitoring workflow.
            </p>
          </div>

          <article className="project-case">
            <div className="project-overview">
              <div className="project-narrative project-narrative--stock">
                <div className="project-detail">
                  <p className="project-detail__label">Purpose</p>
                  <p>Reduce fragmented research by bringing price action, technical signals, news, filings, scoring, and saved analysis into one repeatable workflow.</p>
                </div>
                <div className="project-detail mt-6">
                  <p className="project-detail__label">My role</p>
                  <p>Designed and built the product concept, data pipeline, validation logic, research scoring, source handling, persistence, tests, and Streamlit interface.</p>
                </div>
                <ProjectTechnology label="Stock Thesis Monitor technology stack" technologies={stockTechnologies} />
                <ProjectCapabilities capabilities={stockCapabilities} />
              </div>

              <KineticProjectGallery galleryId="stock-thesis" label="Stock Thesis Monitor" slides={stockSlides} onActiveChange={setActiveStockSlide} />
            </div>
            <ProjectEvidence items={stockEvidence} />
          </article>
        </div>
      </section>
    </div>
  );
}

function ProjectTechnology({ label, technologies }: { label: string; technologies: string[] }) {
  return (
    <div className="mt-7">
      <p className="project-detail__label">Technology</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label={label}>
        {technologies.map((technology) => <li key={technology} className="surface-chip">{technology}</li>)}
      </ul>
    </div>
  );
}

function ProjectCapabilities({ capabilities }: { capabilities: string[] }) {
  return (
    <div className="mt-7">
      <p className="project-detail__label">Key capabilities</p>
      <ul className="mt-3 space-y-2.5 text-sm leading-6 text-muted-foreground">
        {capabilities.map((capability) => (
          <li key={capability} className="flex gap-3"><span aria-hidden="true" className="project-capability-dot mt-2.5 size-1.5 shrink-0 rounded-full" /><span>{capability}</span></li>
        ))}
      </ul>
    </div>
  );
}

function ProjectEvidence({ items }: { items: ReadonlyArray<{ label: string; tone: string; text: string }> }) {
  return (
    <div className="evidence-grid project-evidence">
      {items.map((item) => <section key={item.label} className={`evidence-card evidence-card--${item.tone}`}><h3>{item.label}</h3><p>{item.text}</p></section>)}
    </div>
  );
}
