import { useEffect, useRef } from "react";

/**
 * Fixed, pointer-events-none neon lab background that reacts to cursor.
 * Uses design tokens via CSS variables for colors.
 */
export default function CyberBackground() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w) * 100;
      const y = (e.clientY / h) * 100;
      el.style.setProperty("--x", `${x}%`);
      el.style.setProperty("--y", `${y}%`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        // Multi-layered background: subtle grid + moving radial glow
        backgroundImage: `
          radial-gradient(600px at var(--x,50%) var(--y,50%), hsl(var(--primary)/0.18), transparent 60%),
          radial-gradient(1000px 700px at 20% 10%, hsl(var(--accent)/0.08), transparent 70%),
          repeating-linear-gradient(0deg, hsl(var(--border)/0.5) 0 1px, transparent 1px 40px),
          repeating-linear-gradient(90deg, hsl(var(--border)/0.5) 0 1px, transparent 1px 40px)
        `,
        backgroundSize: "auto, auto, 40px 40px, 40px 40px",
        maskImage: "radial-gradient(1200px 800px at 50% 40%, black, transparent)",
      }}
    >
      {/* Soft animated glow orbs */}
      <div className="absolute -top-24 -left-24 size-[30rem] rounded-full blur-3xl opacity-30 animate-pulse"
           style={{ background: "radial-gradient(circle at 30% 30%, hsl(var(--primary)/0.25), transparent 60%)" }} />
      <div className="absolute bottom-[-8rem] right-[-6rem] size-[24rem] rounded-full blur-3xl opacity-25 animate-pulse"
           style={{ background: "radial-gradient(circle at 70% 70%, hsl(var(--skillPurple)/0.25), transparent 60%)" }} />
    </div>
  );
}
