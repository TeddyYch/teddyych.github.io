import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const linkClass = "rounded-md px-2 py-1.5 font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-background px-4 py-2 font-display text-sm font-semibold shadow-lg transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
        <nav className="container mx-auto flex h-16 items-center justify-between gap-3 px-4" aria-label="Primary navigation">
          <a
            href="#top"
            className="min-w-0 truncate rounded-md font-crimson text-xl font-bold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setIsMenuOpen(false)}
          >
            Teddy Yiu
          </a>

          <div className="hidden items-center gap-2 md:flex">
            {navigationItems.map((item) => (
              <a key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </nav>

        {isMenuOpen && (
          <div id="mobile-navigation" className="border-t bg-background px-4 py-3 md:hidden">
            <nav className="container mx-auto grid gap-1" aria-label="Mobile navigation">
              {navigationItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`${linkClass} px-3 py-3`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
