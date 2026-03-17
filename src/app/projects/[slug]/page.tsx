import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projectsData } from "@/data/projects";
import ProjectDetailClient from "@/components/sections/ProjectDetail";

// ✅ Next.js 15+ — params is a Promise, must be typed and awaited
type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ await here
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} | Mohamed Shoman`,
    description: project.tagline,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params; // ✅ await here
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetailClient project={project} />;
}
