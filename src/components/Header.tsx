import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <a href="#top" className="font-crimson text-xl font-bold story-link tracking-wide">Teddy Yiu</a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#about" className="hover-scale">About</a>
          <a href="#skills" className="hover-scale">Skills</a>
          <a href="#automation" className="hover-scale">Automation</a>
          <a href="#game" className="hover-scale">Mini‑Game</a>
          <a href="#experience" className="hover-scale">Experience</a>
          <a href="#education" className="hover-scale">Education</a>
          <a href="#certs" className="hover-scale">Certificates</a>
          <a href="#contact" className="hover-scale">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="hero">
            <a href="mailto:yiuchunh@gmail.com" aria-label="Email Teddy">Email Me</a>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
