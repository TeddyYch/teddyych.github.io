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
              <h1 className="font-orbitron text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-skillBlue to-skillPurple bg-clip-text text-transparent">
                Rui Wang — Full‑Stack Developer
              </h1>
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
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-skillBlue to-skillPurple rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white font-orbitron">H</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 font-poppins text-skillBlue">HKUST</h3>
                    <p className="text-lg font-medium mb-2">BEng in Computer Science</p>
                    <p className="text-muted-foreground font-medium">2024 – Present</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-skillOrange/10 to-skillRed/10 border-2 border-skillOrange/20 hover:scale-105 transition-all duration-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-skillOrange to-skillRed rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white font-orbitron">I</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 font-poppins text-skillOrange">IVE (VTC)</h3>
                    <p className="text-lg font-medium mb-2">Higher Diploma in Software Engineering</p>
                    <p className="text-muted-foreground font-medium">2022 – 2024</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-skillGreen/10 to-skillTeal/10 border-2 border-skillGreen/20 hover:scale-105 transition-all duration-300 shadow-xl">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-skillGreen to-skillTeal rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white font-orbitron">M</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 font-poppins text-skillGreen">HKMU</h3>
                    <p className="text-lg font-medium mb-2">BBA in Accounting</p>
                    <p className="text-muted-foreground font-medium">2013 – 2016</p>
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
