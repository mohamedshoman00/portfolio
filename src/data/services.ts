import {
  Code2,
  Layout,
  Smartphone,
  ShoppingCart,
  Palette,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
}

export const servicesData: Service[] = [
  {
    id: 1,
    icon: Code2,
    title: "Frontend Web Development",
    description:
      "Building fast, scalable, and maintainable web applications using React.js and Next.js with TypeScript and clean component architecture.",
    tags: ["React.js", "Next.js", "TypeScript"],
  },
  {
    id: 2,
    icon: Layout,
    title: "UI Implementation & Responsive Design",
    description:
      "Turning Figma designs or wireframes into pixel-perfect, fully responsive interfaces using Tailwind CSS and modern CSS techniques.",
    tags: ["Tailwind CSS", "Figma", "SASS"],
  },
  {
    id: 3,
    icon: ShoppingCart,
    title: "E-Commerce Development",
    description:
      "Developing e-commerce platforms with product listings, cart, checkout flows, and backend API integration.",
    tags: ["Next.js", "Node.js", "REST API"],
  },
  {
    id: 4,
    icon: Smartphone,
    title: "Portfolio & Landing Pages",
    description:
      "Crafting modern, animated portfolio sites and high-converting landing pages with smooth UX and strong visual hierarchy.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    id: 5,
    icon: Palette,
    title: "UI/UX Design Support",
    description:
      "Creating UI mockups, component designs, and visual assets in Figma or Canva to support development handoff.",
    tags: ["Figma", "Canva", "Photoshop"],
  },
  {
    id: 6,
    icon: Zap,
    title: "Performance & Code Optimization",
    description:
      "Auditing and improving web app performance — lazy loading, code splitting, image optimization, and clean reusable components.",
    tags: ["Next.js", "React", "Web Vitals"],
  },
];
