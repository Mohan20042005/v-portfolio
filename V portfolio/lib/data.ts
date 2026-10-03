/* Single source of truth — every fact below comes from Vaishnavi's resume. Edit here, nowhere else. */
export type Tone = "gold" | "silver" | "champagne";

export const PERSON = {
  name: "Vaishnavi V",
  first: "Vaishnavi",
  role: "Retail Sales & Visual Merchandising Professional",
  city: "Erode, Tamil Nadu",
  phone: "9942816816",
  phoneHref: "tel:+919942816816",
  email: "vaishnavivijay33@gmail.com",
  intro:
    "Retail sales professional in jewellery and diamond retail, store visual merchandising and customer relationship management, guiding customers to informed purchase decisions.",
  profile:
    "Retail sales professional with experience in jewellery and diamond retail, store visual merchandising, and customer relationship management. Strong track record of guiding customers to informed purchase decisions, maintaining engaging store displays, and delivering consistent, courteous service in fast-paced retail settings.",
};

export type Job = {
  id: "giva" | "glow";
  company: string;
  place: string;
  role: string;
  when: string;
  tone: Tone;
  logo: { src: string; w: number; h: number; alt: string };
  points: string[];
};

/* Most recent first, exactly as on the resume. */
export const EXPERIENCE: Job[] = [
  {
    id: "giva",
    company: "GIVA",
    place: "Erode, Tamil Nadu",
    role: "Senior Fashion Consultant & Store Visual Merchandiser",
    when: "Present",
    tone: "silver",
    logo: { src: "/logos/giva.png", w: 708, h: 450, alt: "GIVA Fine Silver Jewellery logo" },
    points: [
      "Coordinate sales floor activity and guide customers through product selection, supporting footfall conversion and a smooth in-store experience.",
      "Design and maintain store visual merchandising displays to strengthen brand presentation and product visibility.",
    ],
  },
  {
    id: "glow",
    company: "Glow by Kirtilal Kalidas Jewellery Pvt. Ltd.",
    place: "Erode, Tamil Nadu",
    role: "Retail Sales Officer",
    when: "1 Year",
    tone: "gold",
    logo: { src: "/logos/glow.png", w: 900, h: 356, alt: "Glow by Kirtilals logo" },
    points: [
      "Advised customers on gold and diamond jewellery using working knowledge of purity and design to support confident purchase decisions.",
      "Built lasting customer relationships through attentive, personalized service, supporting repeat business and customer satisfaction.",
    ],
  },
];

export const PILLARS = [
  { t: "Jewellery & diamond retail", d: "Advising customers on gold and diamond pieces with working knowledge of purity and design." },
  { t: "Store visual merchandising", d: "Displays designed and maintained to strengthen brand presentation and product visibility." },
  { t: "Customer relationships", d: "Attentive, personalized service that supports repeat business and customer satisfaction." },
];

/* `seen` only where the resume's experience bullets directly support the skill. */
export const SKILLS = [
  {
    group: "Retail",
    items: [
      { name: "Retail Sales", seen: "GIVA · Glow by Kirtilal Kalidas" },
      { name: "Visual Merchandising", seen: "GIVA" },
      { name: "Jewellery & Diamond Product Knowledge", seen: "Glow by Kirtilal Kalidas" },
      { name: "Customer Relationship Management", seen: "Glow by Kirtilal Kalidas" },
      { name: "Sales Conversion", seen: "GIVA" },
    ],
  },
  {
    group: "Professional",
    items: [
      { name: "Communication" }, { name: "Leadership" }, { name: "Problem Solving" },
      { name: "Decision Making" }, { name: "Time Management" },
    ] as { name: string; seen?: string }[],
  },
] as { group: string; items: { name: string; seen?: string }[] }[];

export const EDUCATION = [
  { title: "B.Com CA", school: "Vet Institute of Arts and Science", when: "2022 – 2025" },
  { title: "HSC · 545/600", school: "Kalaimagal Kalvi Nilayam", when: "2020 – 2022" },
];

export const NAV = [
  ["home", "Home"], ["about", "About"], ["experience", "Experience"], ["skills", "Skills"], ["contact", "Contact"],
] as const;
