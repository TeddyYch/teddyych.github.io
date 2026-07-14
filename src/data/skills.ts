import type { Tone } from "@/components/SkillCard";

export type EvidenceContext = "MINGTO" | "HKT" | "YMCA" | "Kinetix" | "Ask IT" | "Portfolio interface" | "Approved skills profile";

export interface SkillItem { name: string; evidence: EvidenceContext[]; }
export interface SkillCategory {
  id: string;
  title: string;
  tone: Tone;
  description: string;
  supports: string;
  evidenceNote: string;
  evidenceTags: string[];
  items: SkillItem[];
}

const profileOnly = (name: string): SkillItem => ({ name, evidence: ["Approved skills profile"] });

export const skillCategories: SkillCategory[] = [
  {
    id: "programming", title: "Programming & Web Foundations", tone: "blue",
    description: "Core programming languages and browser foundations for maintainable software.",
    supports: "Application logic, typed interfaces, data handling, and standards-based web delivery.",
    evidenceNote: "Applied across software coursework, internships, automation work, and portfolio projects.",
    evidenceTags: ["Coursework", "Internships", "Automation", "Portfolio projects"],
    items: [profileOnly("Python"), profileOnly("Java"), profileOnly("C++"), { name: "TypeScript", evidence: ["MINGTO", "Portfolio interface"] }, { name: "JavaScript", evidence: ["Portfolio interface"] }, { name: "HTML", evidence: ["Portfolio interface"] }, { name: "CSS", evidence: ["Portfolio interface"] }, { name: "SQL", evidence: ["MINGTO"] }],
  },
  {
    id: "frontend", title: "Frontend & Interactive UI", tone: "teal",
    description: "Responsive and accessible product interfaces with purposeful interaction and motion.",
    supports: "Component architecture, responsive product layouts, accessible interaction, and purposeful interface motion.",
    evidenceNote: "Demonstrated through the MINGTO interface and this portfolio's responsive and accessible interactions.",
    evidenceTags: ["MINGTO", "Portfolio interface", "Responsive UI"],
    items: [{ name: "React", evidence: ["MINGTO", "Portfolio interface"] }, { name: "Vite", evidence: ["MINGTO", "Portfolio interface"] }, { name: "Tailwind CSS", evidence: ["Portfolio interface"] }, { name: "Responsive Design", evidence: ["MINGTO", "Portfolio interface"] }, { name: "Accessibility", evidence: ["Portfolio interface"] }, { name: "CSS 3D", evidence: ["Portfolio interface"] }, { name: "SVG", evidence: ["Portfolio interface"] }],
  },
  {
    id: "backend", title: "Backend & Data", tone: "green",
    description: "API integration and persistence across relational and document-based data.",
    supports: "Structured data flows, REST integration, application persistence, and database maintenance.",
    evidenceNote: "Used across REST API integrations, PostgreSQL-backed MINGTO workflows, and internship database work.",
    evidenceTags: ["REST integration", "MINGTO", "Database work"],
    items: [{ name: "REST APIs", evidence: ["MINGTO"] }, { name: "PostgreSQL", evidence: ["MINGTO"] }, profileOnly("MySQL"), { name: "MongoDB", evidence: ["Ask IT"] }, profileOnly("SQLite"), profileOnly("Firebase")],
  },
  {
    id: "security", title: "Security Operations", tone: "orange",
    description: "Alert investigation across endpoint, authentication, and network activity.",
    supports: "Frontline SOC investigation, evidence review, incident documentation, and initial containment collaboration.",
    evidenceNote: "Supported by HKT SOC alert triage and investigation experience using SIEM and EDR platforms.",
    evidenceTags: ["HKT SOC", "SIEM", "EDR"],
    items: [{ name: "SIEM Alert Triage", evidence: ["HKT"] }, { name: "Endpoint Investigation", evidence: ["HKT"] }, { name: "Splunk", evidence: ["HKT"] }, { name: "Elastic", evidence: ["HKT"] }, { name: "CrowdStrike Falcon", evidence: ["HKT"] }, { name: "Cortex XDR", evidence: ["HKT"] }, { name: "Carbon Black Cloud", evidence: ["HKT"] }, { name: "Darktrace", evidence: ["HKT"] }],
  },
  {
    id: "automation", title: "Automation, Cloud & Delivery", tone: "purple",
    description: "Workflow orchestration, source control, deployment, and delivery tooling.",
    supports: "Business-process automation, version-controlled delivery, deployment workflows, and technical exploration.",
    evidenceNote: "Supported by YMCA Zapier workflow work, platform comparison, Git-based development, and Vercel deployment.",
    evidenceTags: ["YMCA", "Git delivery", "Vercel"],
    items: [{ name: "Zapier", evidence: ["YMCA"] }, { name: "n8n", evidence: ["YMCA"] }, { name: "Make", evidence: ["YMCA"] }, { name: "Git", evidence: ["Portfolio interface"] }, { name: "GitHub", evidence: ["Portfolio interface"] }, { name: "GitHub Actions", evidence: ["Portfolio interface"] }, { name: "Vercel", evidence: ["MINGTO"] }, profileOnly("Linux"), profileOnly("Jupyter")],
  },
  {
    id: "creative", title: "Design & Creative Tools", tone: "red",
    description: "Visual, layout, video, and audio-production tools supporting interface and content work.",
    supports: "Image editing, layout, illustration, video editing, and audio production alongside technical work.",
    evidenceNote: "Used as a secondary capability for interface visuals, image editing, layout, video, and audio work.",
    evidenceTags: ["Interface visuals", "Image editing", "Media production"],
    items: [profileOnly("Photoshop"), profileOnly("Illustrator"), profileOnly("InDesign"), profileOnly("Premiere Pro"), profileOnly("GarageBand")],
  },
];
