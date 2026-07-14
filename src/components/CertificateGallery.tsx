interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  imagePath: string;
  width: number;
  height: number;
  tone: "blue" | "orange" | "red";
}

const certificates: Certificate[] = [
  {
    id: "oci-data-science",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle",
    date: "August 2025",
    imagePath: "/lovable-uploads/48ca0cba-732d-4b12-b9cb-20a9b22ac1b8.png",
    width: 1120,
    height: 797,
    tone: "red",
  },
  {
    id: "azure-ai",
    title: "Microsoft Certified: Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "December 2023",
    imagePath: "/lovable-uploads/7d55c146-cf32-4976-8616-8999590212c1.png",
    width: 1043,
    height: 807,
    tone: "blue",
  },
  {
    id: "ms-365",
    title: "Microsoft Certified: Microsoft 365 Fundamentals",
    issuer: "Microsoft",
    date: "October 2023",
    imagePath: "/lovable-uploads/d2dee166-6d77-4174-bc2c-884f355bd8b1.png",
    width: 1045,
    height: 789,
    tone: "blue",
  },
  {
    id: "oci-data-platform",
    title: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle",
    date: "July 2025",
    imagePath: "/lovable-uploads/955324cb-80e7-40d6-976e-6e7f2a33fca0.png",
    width: 954,
    height: 662,
    tone: "orange",
  },
  {
    id: "oci-ai",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "July 2025",
    imagePath: "/lovable-uploads/bc0d905f-7f10-47d6-88ed-e90222e9afe0.png",
    width: 946,
    height: 664,
    tone: "orange",
  },
  {
    id: "alibaba-cloud",
    title: "Alibaba Cloud Associate – Cloud Computing",
    issuer: "Alibaba Cloud",
    date: "June 2026",
    imagePath: "/lovable-uploads/4276991b-12ff-4fa4-ad45-5c8570f5481d.png",
    width: 1371,
    height: 901,
    tone: "orange",
  },
];

export default function CertificateGallery() {
  return (
    <div className="certificate-grid">
      {certificates.map((certificate) => (
        <figure key={certificate.id} className={`certificate-card certificate-card--${certificate.tone}`}>
          <div className="certificate-card__image">
            <img
              src={certificate.imagePath}
              alt={`${certificate.issuer} certificate: ${certificate.title}`}
              width={certificate.width}
              height={certificate.height}
              loading="lazy"
              decoding="async"
            />
          </div>
          <figcaption>
            <h4>{certificate.title}</h4>
            <p><span>{certificate.issuer}</span><span aria-hidden="true">·</span><span>{certificate.date}</span></p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
