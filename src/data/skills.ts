export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string; // emoji or icon name
}

export interface SkillCategory {
  category: string;
  emoji: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend",
    emoji: "⚛️",
    skills: [
      { name: "React.js", level: "Advanced" },
      { name: "Next.js", level: "Advanced" },
      { name: "TypeScript", level: "Intermediate" },
      { name: "JavaScript ES6+", level: "Advanced" },
      { name: "Tailwind CSS", level: "Advanced" },
      { name: "HTML5", level: "Advanced" },
      { name: "CSS3", level: "Advanced" },
      { name: "SASS/SCSS", level: "Intermediate" },
    ],
  },
  {
    category: "State Management",
    emoji: "🔄",
    skills: [
      { name: "Redux Toolkit", level: "Intermediate" },
      { name: "Context API", level: "Advanced" },
      { name: "React Query", level: "Beginner" },
    ],
  },
  {
    category: "Tools & Dev",
    emoji: "🛠️",
    skills: [
      { name: "Git", level: "Advanced" },
      { name: "GitHub", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Figma", level: "Intermediate" },
      { name: "Axios", level: "Advanced" },
      { name: "REST APIs", level: "Advanced" },
    ],
  },
  {
    category: "Design",
    emoji: "🎨",
    skills: [
      { name: "Figma", level: "Intermediate" },
      { name: "Canva", level: "Advanced" },
      { name: "Photoshop", level: "Intermediate" },
      { name: "Responsive Design", level: "Advanced" },
    ],
  },
];
