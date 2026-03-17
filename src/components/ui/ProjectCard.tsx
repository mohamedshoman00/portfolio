"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(34, 211, 238, 0.08)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="
        group relative flex flex-col h-full
        bg-card border border-border rounded-2xl p-6
        hover:border-accent/30 transition-colors duration-300
      "
    >
      {/* Featured badge */}
      {project.featured && (
        <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-widest text-accent border border-accent/30 px-2 py-0.5 rounded-full">
          Featured
        </span>
      )}

      {/* Project name */}
      <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200 mt-1 mb-2">
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed flex-1">
        {project.description}
      </p>

      {/* Stack badges */}
      <div className="flex flex-wrap gap-2 mt-5">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-surface border border-border text-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action links */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <ExternalLink size={14} /> Live Demo
        </a>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
        >
          <Github size={14} /> GitHub
        </a>
      </div>
    </motion.div>
  );
}
