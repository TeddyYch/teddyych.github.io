import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Timeline from "@/components/Timeline";
import CertificateGallery from "@/components/CertificateGallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SkillCard } from "@/components/SkillCard";
import CodeDefenseGame from "@/components/CodeDefenseGame";
import CyberBackground from "@/components/CyberBackground";
import hkustLogo from "@/assets/logos/hkust-logo.png";
import iveLogo from "@/assets/logos/ive-logo.png";
import hkmuLogo from "@/assets/logos/hkmu-logo.png";

const Index = () => {
  useEffect(() => {
    // Dynamic canonical
    const href = window.location.href;
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);

    document.title = "Teddy Yiu — Full‑Stack Developer";

    // Structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Teddy Yiu",
      email: "mailto:yiuchunh@gmail.com",
      jobTitle: "Full‑Stack Developer",
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "HKUST" },
        { "@type": "CollegeOrUniversity", name: "IVE (VTC)" },
        { "@type": "CollegeOrUniversity", name: "Hong Kong Metropolitan University" }
      ],
      worksFor: [
        { "@type": "Organization", name: "YMCA HK" },
        { "@type": "Organization", name: "Kinetix Systems Holding Limited" },
        { "@type": "Organization", name: "Ask IT Limited" },
        { "@type": "Organization", name: "Hoosang, Lyn, Li & Co. Ltd." }
      ],
    });
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, []);

  return (
    <div id="top">
      <Header />
      <main>
        <CyberBackground />
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 pt-16 pb-20">
            <div className="rounded-2xl border p-10 md:p-16 bg-gradient-to-br from-skillBlue/10 via-background to-skillPurple/10">
              <h1 className="font-crimson text-4xl md:text-5xl font-bold tracking-wide text-foreground mb-2">
                Teddy Yiu
              </h1>
              <div className="text-2xl md:text-3xl font-orbitron bg-gradient-to-r from-skillBlue to-skillPurple bg-clip-text text-transparent">
                Full‑Stack Developer
              </div>
              <p className="mt-4 text-muted-foreground max-w-2xl">
                Building reliable, delightful full‑stack apps with React, TypeScript, and modern backends. Passionate about DX, performance, and AI‑powered features.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="hero" asChild>
                  <a href="#projects">View Highlights</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:yiuchunh@gmail.com">Contact</a>
                </Button>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                <Card>
                  <CardContent className="p-4">
                    <div className="font-medium">React • TypeScript</div>
                    <div>Frontend Engineering</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="font-medium">AI/ML</div>
                    <div>TensorFlow • PyTorch</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="font-medium">Automation</div>
                    <div>Zapier • n8n • Make</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="font-medium">Backend & APIs</div>
                    <div>Node.js • Express • Supabase</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-16">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-3xl font-bold font-orbitron bg-gradient-to-r from-skillOrange to-skillRed bg-clip-text text-transparent">About</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                I’m Teddy, a developer with an accounting foundation turned engineer — bringing a pragmatic, data‑driven mindset to software. My recent work spans a web‑based AI Fashion Recommendation system (FYP with Kinetix), automation workflows using Zapier/n8n/Make at YMCA HK, and hands‑on testing and Python scripting at Ask IT. I care about clean UX, reliability, and performance.
              </p>
              <div className="mt-6">
                <Button variant="soft" asChild>
                  <a href="mailto:yiuchunh@gmail.com">Let’s collaborate</a>
                </Button>
              </div>
            </div>
            <div className="rounded-xl border p-6 bg-muted/30">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">E-mail</dt>
                  <dd className="font-medium"><a className="story-link" href="mailto:yiuchunh@gmail.com">yiuchunh@gmail.com</a></dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium">Hong Kong</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="font-medium">Frontend • Backend • AI/ML</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Languages</dt>
                  <dd className="font-medium">Cantonese, English, Putonghua</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 font-orbitron bg-gradient-to-r from-skillPurple to-skillTeal bg-clip-text text-transparent">Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <SkillCard
                title="Programming Languages & Web Fundamentals"
                tone="blue"
                items={["Python","Java","C++","C#","TypeScript","JavaScript","HTML","PHP"]}
              />
              <SkillCard
                title="Web & UI"
                tone="blue"
                items={["React","Next.js"]}
              />
              <SkillCard
                title="AI/ML Frameworks"
                tone="purple"
                items={["PyTorch","TensorFlow","Scikit-learn"]}
              />
              <SkillCard
                title="Data Science"
                tone="teal"
                items={["NumPy","Pandas"]}
              />
              <SkillCard
                title="Databases & Query"
                tone="green"
                items={["SQL","NoSQL"]}
              />
              <SkillCard
                title="Automation & Platforms"
                tone="purple"
                items={["Zapier","n8n","Make"]}
              />
              <SkillCard
                title="Tools & OS — Development Tools"
                tone="orange"
                items={["Git","GitHub","Android Studio","Linux","VSCode","MySQL","MongoDB","Firebase","Jupyter"]}
              />
              <SkillCard
                title="Creative Suite"
                tone="red"
                items={["Photoshop","InDesign","Illustrator","Premiere Pro","GarageBand"]}
              />
              <SkillCard
                title="Certificates"
                tone="green"
                items={["MS-365","MS-AI900","Alibaba ACA Cloud Computing","Oracle AI Foundations Associate","Oracle Data Platform Foundations Associate"]}
              />
            </div>
          </div>
        </section>

        {/* Automation Workflows */}
        <section id="automation" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-center mb-4 bg-gradient-to-r from-skillTeal to-skillBlue bg-clip-text text-transparent">
              Automation Workflows
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto text-lg">
              I design and build sophisticated automation workflows using cutting-edge tools like n8n and Zapier to streamline complex business processes, reduce manual work, and enhance organizational productivity through intelligent automation.
            </p>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* n8n AI Agent Workflow */}
              <div className="bg-gradient-to-br from-skillTeal/10 via-background to-skillBlue/10 border-2 border-skillTeal/30 rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-skillTeal to-skillBlue rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">n8n</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-poppins text-skillTeal">AI Agent Content Fetcher</h3>
                    <p className="text-sm text-skillBlue font-medium">Intelligent Web Processing System</p>
                  </div>
                </div>
                
                <div className="mb-6 rounded-xl overflow-hidden border-2 border-skillTeal/20 shadow-lg">
                  <img 
                    src="/lovable-uploads/f69d2479-da2c-4ecb-871f-60b201713835.png" 
                    alt="n8n AI Agent workflow for fetching and processing web content"
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Built an advanced AI Agent capable of fetching random web pages with intelligent content extraction. 
                  Features sophisticated multi-step processing including HTTP requests, HTML body extraction, 
                  unnecessary tag removal, external URL cleanup, and Markdown conversion with configurable length limits for optimal performance.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-skillTeal rounded-full"></div>
                    <span className="text-sm font-medium">HTTP Request Processing & Content Extraction</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-skillBlue rounded-full"></div>
                    <span className="text-sm font-medium">HTML to Markdown Conversion Engine</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-skillPurple rounded-full"></div>
                    <span className="text-sm font-medium">Configurable Content Length Management</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 text-sm bg-skillTeal/20 text-skillTeal rounded-full font-medium border border-skillTeal/30">n8n Workflows</span>
                  <span className="px-4 py-2 text-sm bg-skillBlue/20 text-skillBlue rounded-full font-medium border border-skillBlue/30">AI Agent Design</span>
                  <span className="px-4 py-2 text-sm bg-skillPurple/20 text-skillPurple rounded-full font-medium border border-skillPurple/30">HTTP Processing</span>
                </div>
              </div>

              {/* Zapier HR Requisition System */}
              <div className="bg-gradient-to-br from-skillOrange/10 via-background to-skillRed/10 border-2 border-skillOrange/30 rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-skillOrange to-skillRed rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">ZAP</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-poppins text-skillOrange">HR Requisition System</h3>
                    <p className="text-sm text-skillRed font-medium">Complete Recruitment Automation</p>
                  </div>
                </div>
                
                <div className="mb-6 rounded-xl overflow-hidden border-2 border-skillOrange/20 shadow-lg">
                  <img 
                    src="/lovable-uploads/d9af498a-a1ca-446e-aba6-d148671b363e.png" 
                    alt="Zapier HR requisition and staff shortlisting automation workflow"
                    className="w-full h-auto object-contain"
                  />
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Developed a comprehensive HR requisition and shortlisting system featuring intelligent workflow branching, 
                  automated candidate data analysis, dynamic email generation, and sophisticated multi-path processing 
                  specifically designed for different position types including manager and general grade roles.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-skillOrange rounded-full"></div>
                    <span className="text-sm font-medium">Automated Application Processing & Routing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-skillRed rounded-full"></div>
                    <span className="text-sm font-medium">Intelligent Candidate Shortlisting Logic</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-skillGreen rounded-full"></div>
                    <span className="text-sm font-medium">Multi-platform Integration & Notifications</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 text-sm bg-skillOrange/20 text-skillOrange rounded-full font-medium border border-skillOrange/30">Zapier Automation</span>
                  <span className="px-4 py-2 text-sm bg-skillRed/20 text-skillRed rounded-full font-medium border border-skillRed/30">HR Systems</span>
                  <span className="px-4 py-2 text-sm bg-skillGreen/20 text-skillGreen rounded-full font-medium border border-skillGreen/30">Process Design</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game */}
        <CodeDefenseGame />

        {/* Experience */}
        <section id="experience" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 font-orbitron bg-gradient-to-r from-skillGreen to-skillTeal bg-clip-text text-transparent">Professional Experience</h2>
            <Timeline />
          </div>
        </section>

        {/* Education */}
        <section id="education" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 font-orbitron bg-gradient-to-r from-skillPurple to-skillBlue bg-clip-text text-transparent">Education</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-skillBlue/10 to-skillPurple/10 border-2 border-skillBlue/20 hover:scale-105 transition-all duration-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-lg p-2">
                      <img 
                        src="/lovable-uploads/2df912e5-a1b4-4fb8-b336-4246e3ec034c.png" 
                        alt="HKUST Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-3 font-poppins text-skillBlue">HKUST</h3>
                    <p className="text-xl font-semibold mb-3 text-foreground">BEng in Computer Science</p>
                    <p className="text-lg text-muted-foreground font-medium">2024 – Present</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-skillOrange/10 to-skillRed/10 border-2 border-skillOrange/20 hover:scale-105 transition-all duration-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-lg p-2">
                      <img 
                        src="/lovable-uploads/03d9e0dd-9eba-46a0-b6c9-0b2c7850b526.png" 
                        alt="IVE Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-3 font-poppins text-skillOrange">IVE (VTC)</h3>
                    <p className="text-xl font-semibold mb-3 text-foreground">Higher Diploma in Software Engineering</p>
                    <p className="text-lg text-muted-foreground font-medium">2022 – 2024</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-skillGreen/10 to-skillTeal/10 border-2 border-skillGreen/20 hover:scale-105 transition-all duration-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-lg p-2">
                      <img 
                        src="/lovable-uploads/4da1fd42-a1f6-4235-a1f9-7fcc2e1e30f7.png" 
                        alt="HKMU Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold mb-3 font-poppins text-skillGreen">HKMU</h3>
                    <p className="text-xl font-semibold mb-3 text-foreground">BBA in Accounting</p>
                    <p className="text-lg text-muted-foreground font-medium">2013 – 2016</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certificates */}
        <section id="certs" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 font-orbitron bg-gradient-to-r from-skillRed to-skillOrange bg-clip-text text-transparent">Professional Certifications</h2>
            <CertificateGallery />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-orbitron bg-gradient-to-r from-skillTeal to-skillGreen bg-clip-text text-transparent">Get in touch</h2>
            <p className="text-muted-foreground mt-2">Open to internships and junior developer roles.</p>
            <div className="mt-6 flex justify-center">
              <Button variant="hero" asChild>
                <a href="mailto:yiuchunh@gmail.com">Email: yiuchunh@gmail.com</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
