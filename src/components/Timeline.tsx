import { Card, CardContent } from "@/components/ui/card";
import ymcaLogo from "@/assets/logos/ymca-logo.png";
import kinetixLogo from "@/assets/logos/kinetix-logo.png";
import askitLogo from "@/assets/logos/askit-logo.png";
import hoosangLogo from "@/assets/logos/hoosang-logo.png";

interface TimelineItem {
  year: string;
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  color: "blue" | "orange" | "red" | "purple";
  logo: string;
}

const timelineItems: TimelineItem[] = [
  {
    year: "2025",
    company: "YMCA HK",
    role: "Automation Intern",
    duration: "06/2025 – 09/2025",
    highlights: [
      "Designed and implemented HR requisition & shortlisting automation (Zapier).",
      "Led awareness training with realistic email simulations.",
      "Benchmarked n8n, Zapier, and Make for team workflows."
    ],
    color: "blue",
    logo: ymcaLogo
  },
  {
    year: "2024",
    company: "Kinetix Systems Holding Limited",
    role: "Software Engineering Intern",
    duration: "01/2024 – 05/2024",
    highlights: [
      "Co-developed a web-based AI Fashion Recommendation System (FYP) from prototype to demo.",
      "Integrated ML inference and responsive UI components."
    ],
    color: "orange",
    logo: kinetixLogo
  },
  {
    year: "2023",
    company: "Ask IT Limited",
    role: "Software Engineering Intern",
    duration: "09/2023 – 12/2023",
    highlights: [
      "System testing, Python scripting, and database updates to support daily operations.",
      "Researched IT market needs to guide feature prioritization."
    ],
    color: "red",
    logo: askitLogo
  },
  {
    year: "2016-2022",
    company: "Hoosang, Lyn, Li & Co. Ltd.",
    role: "Audit Senior",
    duration: "02/2016 – 08/2022",
    highlights: [
      "Delivered full-set audit assignments, drafted financial statements and tax computations.",
      "Brought analytical rigor and attention to detail later applied to engineering work."
    ],
    color: "purple",
    logo: hoosangLogo
  }
];

const colorClasses = {
  blue: {
    line: "bg-skillBlue",
    circle: "bg-skillBlue border-skillBlue",
    icon: "text-skillBlue",
    gradient: "from-skillBlue/10 to-skillBlue/5"
  },
  orange: {
    line: "bg-skillOrange",
    circle: "bg-skillOrange border-skillOrange",
    icon: "text-skillOrange",
    gradient: "from-skillOrange/10 to-skillOrange/5"
  },
  red: {
    line: "bg-skillRed",
    circle: "bg-skillRed border-skillRed",
    icon: "text-skillRed",
    gradient: "from-skillRed/10 to-skillRed/5"
  },
  purple: {
    line: "bg-skillPurple",
    circle: "bg-skillPurple border-skillPurple",
    icon: "text-skillPurple",
    gradient: "from-skillPurple/10 to-skillPurple/5"
  }
};

export default function Timeline() {
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Central vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-skillBlue via-skillOrange via-skillRed to-skillPurple rounded-full transform -translate-x-1/2"></div>
      
      <div className="space-y-16">
        {timelineItems.map((item, index) => {
          const colors = colorClasses[item.color];
          const isLeft = index % 2 === 0;
          
          return (
            <div key={index} className="relative">
              {/* Timeline circle with logo */}
              <div className={`absolute left-1/2 top-0 z-20 flex items-center justify-center w-16 h-16 rounded-full border-4 ${colors.circle} bg-background transform -translate-x-1/2 shadow-lg`}>
                <img 
                  src={item.logo} 
                  alt={`${item.company} logo`}
                  className="w-8 h-8 object-contain rounded"
                />
              </div>
              
              {/* Year badge */}
              <div className={`absolute left-1/2 -top-8 z-10 transform -translate-x-1/2`}>
                <div className={`px-4 py-2 rounded-full text-sm font-bold ${colors.circle} text-background shadow-md`}>
                  {item.year}
                </div>
              </div>
              
              {/* Content card */}
              <div className={`flex ${isLeft ? 'justify-start pr-8' : 'justify-end pl-8'}`}>
                <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'} pt-8`}>
                  <Card className={`bg-gradient-to-br ${colors.gradient} border-2 ${colors.line.replace('bg-', 'border-')} backdrop-blur-sm shadow-xl hover:scale-105 transition-all duration-300`}>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className={`text-xl font-bold ${colors.icon} mb-2`}>{item.company}</h3>
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold text-foreground">{item.role}</div>
                          <div className="text-sm text-muted-foreground font-medium">{item.duration}</div>
                        </div>
                      </div>
                      <ul className="space-y-3 text-sm text-muted-foreground">
                        {item.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full ${colors.circle} mt-2 flex-shrink-0`}></div>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}