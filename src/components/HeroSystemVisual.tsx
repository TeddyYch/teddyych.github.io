import { Braces, ShieldCheck, Workflow, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type CapabilityId = "build" | "automate" | "secure";

interface Capability {
  id: CapabilityId;
  label: string;
  phrase: string;
  tools: string[];
  icon: LucideIcon;
}

const capabilities: Capability[] = [
  { id: "build", label: "Build", phrase: "Product interfaces and data-backed workflows", tools: ["React interface", "REST API", "PostgreSQL"], icon: Braces },
  { id: "automate", label: "Automate", phrase: "Process orchestration and operational automation", tools: ["Zapier", "n8n", "Workflow design"], icon: Workflow },
  { id: "secure", label: "Secure", phrase: "Alert triage and endpoint investigation", tools: ["Splunk", "CrowdStrike Falcon", "Incident investigation"], icon: ShieldCheck },
];

const centres: Record<CapabilityId, [number, number]> = {
  build: [0.27, 0.3],
  automate: [0.73, 0.3],
  secure: [0.5, 0.73],
};

export default function HeroSystemVisual() {
  const rootRef = useRef<HTMLElement | null>(null);
  const visibleRef = useRef(true);
  const frameRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const [pointerFine, setPointerFine] = useState(false);
  const [hovered, setHovered] = useState<CapabilityId | null>(null);
  const [focused, setFocused] = useState<CapabilityId | null>(null);
  const [selected, setSelected] = useState<CapabilityId | null>(null);
  const active = focused ?? hovered ?? selected;

  useEffect(() => {
    const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointer = () => setPointerFine(pointerQuery.matches);
    updatePointer();
    pointerQuery.addEventListener("change", updatePointer);

    const root = rootRef.current;
    const observer = root ? new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    }, { rootMargin: "120px 0px", threshold: 0.01 }) : null;
    if (root && observer) observer.observe(root);

    return () => {
      pointerQuery.removeEventListener("change", updatePointer);
      observer?.disconnect();
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!pointerFine || reducedMotion || !visibleRef.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const nearest = (Object.entries(centres) as [CapabilityId, [number, number]][])
      .map(([id, [cx, cy]]) => ({ id, distance: Math.hypot(x - cx, y - cy) }))
      .sort((a, b) => a.distance - b.distance)[0];
    setHovered(nearest.distance < 0.5 ? nearest.id : null);

    const target = event.currentTarget;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      target.style.setProperty("--scene-x", `${((x - 0.5) * 16).toFixed(2)}px`);
      target.style.setProperty("--scene-y", `${((y - 0.5) * 12).toFixed(2)}px`);
      target.style.setProperty("--scene-build-x", `${((x - 0.5) * -4).toFixed(2)}px`);
      target.style.setProperty("--scene-build-y", `${((y - 0.5) * -2.4).toFixed(2)}px`);
      target.style.setProperty("--scene-automate-x", `${((x - 0.5) * 5.6).toFixed(2)}px`);
      target.style.setProperty("--scene-automate-y", `${((y - 0.5) * -1.8).toFixed(2)}px`);
      target.style.setProperty("--scene-secure-x", `${((x - 0.5) * 2.4).toFixed(2)}px`);
      target.style.setProperty("--scene-secure-y", `${((y - 0.5) * 4.2).toFixed(2)}px`);
      target.style.setProperty("--scene-rotate-x", `${((y - 0.5) * -2.4).toFixed(2)}deg`);
      target.style.setProperty("--scene-rotate-y", `${((x - 0.5) * 3.2).toFixed(2)}deg`);
    });
  };

  const resetPointer = () => {
    setHovered(null);
    const root = rootRef.current;
    ["--scene-x", "--scene-y", "--scene-build-x", "--scene-build-y", "--scene-automate-x", "--scene-automate-y", "--scene-secure-x", "--scene-secure-y"].forEach((name) => root?.style.setProperty(name, "0px"));
    root?.style.setProperty("--scene-rotate-x", "0deg");
    root?.style.setProperty("--scene-rotate-y", "0deg");
  };

  return (
    <aside ref={rootRef} className="capability-scene" aria-labelledby="capability-scene-title" data-active={active ?? "none"} onPointerMove={handlePointerMove} onPointerLeave={resetPointer}>
      <div className="capability-scene__heading">
        <div>
          <p className="section-kicker text-skillTeal">Interactive capability scene</p>
          <h2 id="capability-scene-title">Build, automate, secure</h2>
        </div>
        {pointerFine && !reducedMotion && <p className="capability-scene__instruction">Move or focus to explore</p>}
      </div>

      <div className="capability-scene__stage">
        <svg className="capability-scene__network" viewBox="0 0 600 470" aria-hidden="true" preserveAspectRatio="none">
          <path d="M160 150 C235 170 245 205 300 235" />
          <path d="M440 150 C365 170 355 205 300 235" />
          <path d="M300 235 C300 270 300 300 300 340" />
          <circle cx="300" cy="235" r="5" />
        </svg>

        {capabilities.map((capability) => {
          const Icon = capability.icon;
          return (
            <button
              key={capability.id}
              type="button"
              className={`capability-object capability-object--${capability.id}`}
              aria-pressed={active === capability.id}
              onFocus={() => setFocused(capability.id)}
              onBlur={() => setFocused(null)}
              onPointerEnter={() => setHovered(capability.id)}
              onClick={() => setSelected((current) => current === capability.id ? null : capability.id)}
            >
              <span className="capability-object__visual" aria-hidden="true">
                {capability.id === "build" && <span className="build-frames"><span /><span /><span><i /><i /><i /></span></span>}
                {capability.id === "automate" && <span className="automation-rails"><span /><span /><span /><i /><i /></span>}
                {capability.id === "secure" && <span className="security-orbit"><span /><span /><span /><Icon /></span>}
              </span>
              <span className="capability-object__copy">
                <span className="capability-object__label"><Icon aria-hidden="true" />{capability.label}</span>
                <span className="capability-object__phrase">{capability.phrase}</span>
                <span className="capability-object__tools" aria-label={`${capability.label} tools`}>
                  {capability.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
