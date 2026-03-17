"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import { experienceData } from "@/data/experience";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/layout/Container";
import FadeInView from "@/components/motion/FadeInView";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-base">
      <Container>
        <SectionHeader
          label="04 — Journey"
          title="Experience & Education"
          subtitle="My professional timeline — internships, training, and freelance work."
        />

        <div className="relative">
          {/* Vertical timeline line — hidden on mobile */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-border hidden sm:block" />

          <div className="flex flex-col gap-8">
            {experienceData.map((item, i) => (
              <FadeInView key={item.id} delay={i * 0.1} direction="left">
                <div className="flex gap-5 sm:gap-7 group">

                  {/* ── Timeline dot ── */}
                  <div className="hidden sm:flex flex-col items-center shrink-0">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        border-2 z-10 bg-card shrink-0
                        ${item.type === "work"
                          ? "border-accent text-accent"
                          : "border-blue-400 text-blue-400"}
                      `}
                    >
                      {item.type === "work"
                        ? <Briefcase size={16} />
                        : <GraduationCap size={16} />
                      }
                    </motion.div>
                  </div>

                  {/* ── Card ── */}
                  <motion.div
                    whileHover={{
                      borderColor: "rgba(34, 211, 238, 0.3)",
                      boxShadow: "0 8px 30px rgba(34, 211, 238, 0.05)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 bg-card border border-border rounded-2xl p-5 sm:p-6"
                  >
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-accent transition-colors">
                          {item.role}
                        </h3>
                        <p className="text-sm text-accent font-mono mt-0.5">
                          {item.company}
                        </p>
                        <p className="text-xs text-text-secondary mt-0.5">
                          📍 {item.location}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-mono text-text-secondary border border-border px-3 py-1 rounded-full self-start mt-1 sm:mt-0">
                        {item.dateRange}
                      </span>
                    </div>

                    {/* Bullet points */}
                    <ul className="space-y-1.5 mb-4">
                      {item.bullets.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-text-secondary">
                          <span className="text-accent mt-1 shrink-0">▹</span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    {/* Stack tags */}
                    {item.stack && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface border border-border text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
