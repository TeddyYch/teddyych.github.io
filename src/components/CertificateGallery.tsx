import { Card, CardContent } from "@/components/ui/card";

interface Certificate {
  id: string;
  title: string;
  shortTitle: string;
  issuer: string;
  date: string;
  imagePath: string;
  color: "blue" | "orange" | "red" | "purple" | "green" | "teal";
}

const certificates: Certificate[] = [
  {
    id: "oci-data-science",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    shortTitle: "OCI Data Science Pro",
    issuer: "Oracle",
    date: "Aug 2025",
    imagePath: "/lovable-uploads/48ca0cba-732d-4b12-b9cb-20a9b22ac1b8.png",
    color: "red"
  },
  {
    id: "azure-ai",
    title: "Microsoft Certified: Azure AI Fundamentals",
    shortTitle: "Azure AI-900",
    issuer: "Microsoft",
    date: "Dec 2023",
    imagePath: "/lovable-uploads/7d55c146-cf32-4976-8616-8999590212c1.png",
    color: "blue"
  },
  {
    id: "ms-365",
    title: "Microsoft Certified: 365 Fundamentals",
    shortTitle: "MS-365",
    issuer: "Microsoft",
    date: "Oct 2023",
    imagePath: "/lovable-uploads/d2dee166-6d77-4174-bc2c-884f355bd8b1.png",
    color: "blue"
  },
  {
    id: "oci-data-platform",
    title: "Oracle Data Platform 2025 Certified Foundations Associate",
    shortTitle: "OCI Data Platform",
    issuer: "Oracle",
    date: "Jul 2025",
    imagePath: "/lovable-uploads/955324cb-80e7-40d6-976e-6e7f2a33fca0.png",
    color: "orange"
  },
  {
    id: "oci-ai",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    shortTitle: "OCI AI Foundations",
    issuer: "Oracle",
    date: "Jul 2025",
    imagePath: "/lovable-uploads/bc0d905f-7f10-47d6-88ed-e90222e9afe0.png",
    color: "orange"
  },
  {
    id: "alibaba-cloud",
    title: "Alibaba Cloud Certified Associate",
    shortTitle: "Alibaba ACA",
    issuer: "Alibaba Cloud",
    date: "Jun 2026",
    imagePath: "/lovable-uploads/4276991b-12ff-4fa4-ad45-5c8570f5481d.png",
    color: "orange"
  }
];

const colorClasses = {
  blue: "from-skillBlue/20 to-skillBlue/5 border-skillBlue/30",
  orange: "from-skillOrange/20 to-skillOrange/5 border-skillOrange/30",
  red: "from-skillRed/20 to-skillRed/5 border-skillRed/30",
  purple: "from-skillPurple/20 to-skillPurple/5 border-skillPurple/30",
  green: "from-skillGreen/20 to-skillGreen/5 border-skillGreen/30",
  teal: "from-skillTeal/20 to-skillTeal/5 border-skillTeal/30"
};

export default function CertificateGallery() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certificates.map((cert) => (
        <Card 
          key={cert.id} 
          className={`group hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br ${colorClasses[cert.color]} backdrop-blur-sm`}
        >
          <CardContent className="p-0">
            <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
              <img 
                src={cert.imagePath} 
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-sm leading-tight mb-2">
                {cert.shortTitle}
              </h3>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>{cert.issuer}</div>
                <div>{cert.date}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}