export interface ExperienceItem {
  id: number;
  type: "work" | "education";
  role: string;
  company: string;
  location: string;
  dateRange: string;
  bullets: string[];
  stack?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    type: "work",
    role: "Frontend Developer Intern",
    company: "Orange Digital Center Egypt",
    location: "Egypt",
    dateRange: "Oct 2022 – Nov 2022", // [REPLACE with exact dates]
    bullets: [
      "Built responsive UI components using React.js and modern CSS techniques.",
      "Collaborated with a team on real-world frontend projects under mentorship.",
      "Practiced clean code standards, Git workflows, and component reusability.",
    ],
    stack: ["React.js", "JavaScript", "CSS3", "Git"],
  },
  {
    id: 2,
    type: "education",
    role: "Advanced Frontend Web Development",
    company: "ITI – Information Technology Institute",
    location: "Egypt",
    dateRange: "Jun 2022 – Aug 2022", // [REPLACE with exact dates]
    bullets: [
      "Completed an intensive frontend track covering React.js, JavaScript ES6+, and modern tooling.",
      "Built several mini-projects applying concepts learned in the program.",
      "Gained hands-on experience with component-driven development and API integration.",
    ],
    stack: ["React.js", "JavaScript", "HTML5", "CSS3", "REST API"],
  },
  {
    id: 3,
    type: "work",
    role: "Freelance Frontend Developer",
    company: "Self-Employed",
    location: "Port Said, Egypt",
    dateRange: "2023 – Present",
    bullets: [
      "Developed Mare Boutique — a full e-commerce platform with Next.js and Node.js backend.",
      "Built the Faster Education Platform using React.js with full responsive design.",
      "Built a location-based café discovery app.",
    ],
    stack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  // [ADD more experience here]
];
