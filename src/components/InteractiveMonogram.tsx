import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import TYMonogramFallback from "@/components/TYMonogramFallback";

const TYMonogram3D = lazy(() => import("@/components/TYMonogram3D"));

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

export default function InteractiveMonogram() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    const capabilityQuery = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setUse3D(capabilityQuery.matches && canUseWebGL());
    update();
    capabilityQuery.addEventListener("change", update);
    return () => capabilityQuery.removeEventListener("change", update);
  }, []);

  const handleUnavailable = useCallback(() => setUse3D(false), []);

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
              A real-time TY monogram extending the portfolio&apos;s blueprint visual language through dimensional geometry, responsive light, and controlled interaction.
            </p>
          </div>

          <div className="ty-visual" aria-hidden="true">
            {use3D ? (
              <Suspense fallback={<TYMonogramFallback />}>
                <TYMonogram3D onUnavailable={handleUnavailable} />
              </Suspense>
            ) : (
              <TYMonogramFallback />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
