import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const MAX_ROTATION = 4;

export default function InteractiveMonogram() {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const finePointerRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => {
      finePointerRef.current = query.matches;
    };
    update();
    query.addEventListener("change", update);

    return () => {
      query.removeEventListener("change", update);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const resetVisual = () => {
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = window.requestAnimationFrame(() => {
      const visual = visualRef.current;
      if (!visual) return;
      visual.style.setProperty("--ty-rotate-x", "0deg");
      visual.style.setProperty("--ty-rotate-y", "0deg");
      visual.style.setProperty("--ty-shift-x", "0px");
      visual.style.setProperty("--ty-shift-y", "0px");
      visual.style.setProperty("--ty-glow-x", "50%");
      visual.style.setProperty("--ty-glow-y", "50%");
    });
  };

  return (
    <section id="interactive-identity" aria-labelledby="interactive-identity-title" className="ty-section section-grid relative scroll-mt-20 overflow-hidden border-b py-20 sm:py-24">
      <div className="section-glow ty-section__glow" aria-hidden="true" />
      <div className="container relative mx-auto px-4">
        <div className="ty-section__layout">
          <div className="max-w-xl">
            <p className="section-kicker text-skillPurple">Interactive identity</p>
            <h2 id="interactive-identity-title" className="section-heading section-heading--identity mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Built with depth and interaction
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">
              A lightweight cursor-reactive TY monogram extending the portfolio&apos;s blueprint visual language through motion, layered depth, and responsive interface behaviour.
            </p>
          </div>

          <div
            ref={visualRef}
            className="ty-visual"
            aria-hidden="true"
            onPointerMove={(event) => {
              if (reducedMotion || !finePointerRef.current || event.pointerType === "touch" || window.innerWidth < 768) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width;
              const y = (event.clientY - rect.top) / rect.height;
              const rotateY = (x - 0.5) * MAX_ROTATION * 2;
              const rotateX = (0.5 - y) * MAX_ROTATION * 2;

              if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
              frameRef.current = window.requestAnimationFrame(() => {
                const visual = visualRef.current;
                if (!visual) return;
                visual.style.setProperty("--ty-rotate-x", `${rotateX.toFixed(2)}deg`);
                visual.style.setProperty("--ty-rotate-y", `${rotateY.toFixed(2)}deg`);
                visual.style.setProperty("--ty-shift-x", `${((x - 0.5) * 5).toFixed(2)}px`);
                visual.style.setProperty("--ty-shift-y", `${((y - 0.5) * 5).toFixed(2)}px`);
                visual.style.setProperty("--ty-glow-x", `${(x * 100).toFixed(1)}%`);
                visual.style.setProperty("--ty-glow-y", `${(y * 100).toFixed(1)}%`);
              });
            }}
            onPointerLeave={resetVisual}
          >
            <div className="ty-visual__depth">
              <img src="/assets/ty-holographic-monogram.png" alt="" width="1254" height="1254" loading="lazy" decoding="async" draggable={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
