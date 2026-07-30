import { useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import FeaturedProjects from "@/components/FeaturedProjects";
import CertificateGallery from "@/components/CertificateGallery";
import CyberBackground from "@/components/CyberBackground";
import HeroSystemVisual from "@/components/HeroSystemVisual";
import CapabilityReel from "@/components/CapabilityReel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InteractiveSkills from "@/components/InteractiveSkills";
import InteractiveMonogram from "@/components/InteractiveMonogram";
import { portfolioLinks, siteUrl } from "@/config/portfolio";

const pageTitle = "Teddy Yiu — Software Developer & Security Automation Builder";
const pageDescription = "Portfolio of Teddy Yiu, a software developer with hands-on experience in web development, workflow automation, and security operations.";

const Index = () => {
  useEffect(() => {
    document.title = pageTitle;

    let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = siteUrl;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.portfolioSchema = "person";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Teddy Yiu",
      url: siteUrl,
      email: "mailto:yiuchunh@gmail.com",
      jobTitle: "Software Developer and Security Automation Builder",
      description: pageDescription,
      knowsAbout: [
        "Software development",
        "Web development",
        "Workflow automation",
        "Security operations",
        "Cloud and security engineering",
      ],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Hong Kong University of Science and Technology" },
        { "@type": "CollegeOrUniversity", name: "IVE (VTC)" },
        { "@type": "CollegeOrUniversity", name: "Hong Kong Metropolitan University" },
      ],
      affiliation: [
        { "@type": "Organization", name: "HKT" },
        { "@type": "Organization", name: "YMCA of Hong Kong" },
        { "@type": "Organization", name: "Kinetix Systems Holding Limited" },
        { "@type": "Organization", name: "Ask IT Limited" },
      ],
      sameAs: [portfolioLinks.github, portfolioLinks.linkedin].filter(Boolean),
    });
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <div id="top">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <CyberBackground />

        <section id="home" aria-labelledby="hero-title" className="hero-section section-grid relative overflow-hidden border-b">
          <div className="section-glow section-glow--hero" aria-hidden="true" />
          <div className="container relative mx-auto px-4 py-14 sm:py-16 lg:py-16 xl:py-14 2xl:py-20">
            <div className="grid min-w-0 items-center gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:gap-16">
              <div className="min-w-0">
                <p className="section-kicker text-skillBlue">Teddy Yiu · Hong Kong</p>
                <h1 id="hero-title" className="hero-title mt-4 max-w-4xl text-4xl font-semibold leading-[1.04] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  <span className="hero-title__software">Software</span> Developer &amp; <span className="hero-title__security">Security Automation</span> Builder
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  I build web products and practical automation, informed by hands-on security operations experience.
                </p>

                <p className="availability-line">
                  <span aria-hidden="true" /> Available for full-time opportunities · All HKUST taught coursework completed · Final Year Project remaining
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="hero"><a href="#product">View Projects</a></Button>
                  <Button asChild variant="outline"><a href="#experience">View Experience</a></Button>
                  <Button asChild variant="ghost">
                    <a href={portfolioLinks.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a>
                  </Button>
                  <Button asChild variant="ghost">
                    <a href={portfolioLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a>
                  </Button>
                </div>
              </div>

              <HeroSystemVisual />
            </div>
          </div>
        </section>

        <CapabilityReel />

        <FeaturedProjects />

        <InteractiveMonogram />

        <section id="experience" aria-labelledby="experience-title" className="section-grid relative scroll-mt-20 overflow-hidden border-y bg-muted/20 py-20 sm:py-24">
          <div className="section-glow section-glow--purple" aria-hidden="true" />
          <div className="container relative mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-skillBlue">Experience</p>
              <h2 id="experience-title" className="section-heading section-heading--experience text-3xl font-bold tracking-tight sm:text-4xl"><span className="heading-accent heading-accent--blue">Professional</span> Experience</h2>
              <p className="mt-3 text-muted-foreground">Software delivery, business-process automation, and frontline security operations.</p>
            </div>
            <Timeline />
          </div>
        </section>

        <section id="skills" aria-labelledby="skills-title" className="relative overflow-hidden py-14 sm:py-16">
          <div className="section-glow section-glow--purple" aria-hidden="true" />
          <div className="container relative mx-auto px-4">
            <div className="mb-7 max-w-3xl">
              <p className="section-kicker text-skillPurple">Capabilities</p>
              <h2 id="skills-title" className="section-heading section-heading--skills mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Technical <span className="heading-accent heading-accent--purple">Skills</span></h2>
              <p className="mt-3 text-muted-foreground">Select a colour-coded category to review its tools and verified evidence context.</p>
            </div>
            <InteractiveSkills />
          </div>
        </section>

        <section id="education" aria-labelledby="education-title" className="relative scroll-mt-20 overflow-hidden border-y bg-muted/20 py-20 sm:py-24">
          <div className="section-glow section-glow--green" aria-hidden="true" />
          <div className="container relative mx-auto px-4">
            <div className="mb-10 max-w-3xl">
              <p className="section-kicker text-skillGreen">Education</p>
              <h2 id="education-title" className="section-heading section-heading--education mt-3 text-3xl font-bold tracking-tight sm:text-4xl"><span className="heading-accent heading-accent--green">Education</span> and Certifications</h2>
            </div>

            <div className="education-grid">
              <Card className="education-feature">
                <CardContent className="relative flex h-full flex-col p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="education-logo education-logo--featured">
                      <img src="/lovable-uploads/2df912e5-a1b4-4fb8-b336-4246e3ec034c.png" alt="Hong Kong University of Science and Technology logo" width="264" height="224" />
                    </div>
                    <div>
                      <p className="section-kicker text-skillBlue">Primary degree</p>
                      <h3 className="mt-3 text-2xl font-bold sm:text-3xl">Hong Kong University of Science and Technology</h3>
                      <p className="mt-3 text-lg font-semibold">Bachelor of Engineering in Computer Science</p>
                      <p className="mt-2 text-muted-foreground">2024 – Expected 2027</p>
                    </div>
                  </div>
                  <p className="mt-auto border-t pt-6 text-sm font-medium leading-6 text-foreground sm:text-base">All taught coursework completed; Final Year Project remaining.</p>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                <Card className="education-support">
                  <CardContent className="flex items-start gap-4 p-5 sm:p-6">
                    <div className="education-logo"><img src="/lovable-uploads/03d9e0dd-9eba-46a0-b6c9-0b2c7850b526.png" alt="Institute of Vocational Education logo" width="568" height="455" /></div>
                    <div className="min-w-0"><h3 className="font-bold">Institute of Vocational Education</h3><p className="mt-1 text-sm font-medium">Higher Diploma in Software Engineering</p><p className="mt-2 text-sm text-muted-foreground">2022 – 2024</p></div>
                  </CardContent>
                </Card>
                <Card className="education-support">
                  <CardContent className="flex items-start gap-4 p-5 sm:p-6">
                    <div className="education-logo"><img src="/lovable-uploads/4da1fd42-a1f6-4235-a1f9-7fcc2e1e30f7.png" alt="Hong Kong Metropolitan University logo" width="678" height="645" /></div>
                    <div className="min-w-0"><h3 className="font-bold">Hong Kong Metropolitan University</h3><p className="mt-1 text-sm font-medium">Bachelor of Business Administration in Accounting</p><p className="mt-2 text-sm text-muted-foreground">2013 – 2016</p></div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="mt-16 border-t pt-12">
              <div className="mb-8 max-w-3xl">
                <p className="section-kicker text-skillOrange">Credentials</p>
                <h3 className="section-heading section-heading--credentials mt-3 text-2xl font-bold sm:text-3xl"><span className="heading-accent heading-accent--orange">Professional</span> Certifications</h3>
                <p className="mt-3 text-muted-foreground">Full credential images with issuer and issue date for direct verification.</p>
              </div>
              <CertificateGallery />
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24">
          <div className="section-glow section-glow--contact" aria-hidden="true" />
          <div className="container relative mx-auto px-4">
            <div className="contact-panel">
              <div className="max-w-2xl">
                <p className="section-kicker text-skillTeal">Contact</p>
                <h2 id="contact-title" className="section-heading section-heading--contact mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Available for <span className="heading-accent heading-accent--teal">full-time opportunities</span></h2>
                <p className="mt-4 leading-7 text-muted-foreground">Software development, security automation, and cloud or security engineering roles in Hong Kong.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Button variant="hero" asChild><a href="mailto:yiuchunh@gmail.com"><Mail aria-hidden="true" /> Email</a></Button>
                <Button variant="outline" asChild><a href={portfolioLinks.github} target="_blank" rel="noreferrer"><Github aria-hidden="true" /> GitHub</a></Button>
                <Button variant="outline" asChild><a href={portfolioLinks.linkedin} target="_blank" rel="noreferrer"><Linkedin aria-hidden="true" /> LinkedIn</a></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
