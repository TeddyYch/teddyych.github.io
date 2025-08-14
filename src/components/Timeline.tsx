import { Card, CardContent } from "@/components/ui/card";

interface TimelineItem {
  year: string;
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  color: "blue" | "orange" | "red" | "purple";
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
    color: "blue"
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
    color: "orange"
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
    color: "red"
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
    color: "purple"
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
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-skillBlue via-skillOrange via-skillRed to-skillPurple"></div>
      
      <div className="space-y-8">
        {timelineItems.map((item, index) => {
          const colors = colorClasses[item.color];
          const isLeft = index % 2 === 0;
          
          return (
            <div key={index} className={`relative flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline circle */}
              <div className={`absolute left-8 z-10 flex items-center justify-center w-4 h-4 rounded-full border-2 ${colors.circle} -translate-x-1/2`}>
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              
              {/* Year badge */}
              <div className={`absolute left-8 top-8 z-10 -translate-x-1/2 ${isLeft ? 'translate-x-8' : '-translate-x-8'}`}>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${colors.circle} text-background`}>
                  {item.year}
                </div>
              </div>
              
              {/* Content card */}
              <div className={`flex-1 ${isLeft ? 'ml-16 mr-8' : 'mr-16 ml-8'}`}>
                <Card className={`bg-gradient-to-br ${colors.gradient} border-border/50 backdrop-blur-sm`}>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className={`font-semibold ${colors.icon}`}>{item.company}</div>
                      <div className="text-sm text-muted-foreground">{item.duration}</div>
                    </div>
                    <div className="font-medium text-foreground mb-3">{item.role}</div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {item.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${colors.circle} mt-2 flex-shrink-0`}></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}