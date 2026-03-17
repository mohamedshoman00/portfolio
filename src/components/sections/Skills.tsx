"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import SkillBadge from "@/components/ui/SkillBadge";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/layout/Container";
import FadeInView from "@/components/motion/FadeInView";

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-base">
      <Container>
        <SectionHeader
          label="02 — Skills"
          title="Tech Stack"
          subtitle="Technologies I work with daily, organized by category."
        />

        <div className="space-y-12">
          {skillsData.map((group, groupIndex) => (
            <FadeInView key={group.category} delay={groupIndex * 0.1}>
              <div>
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xl">{group.emoji}</span>
                  <h3 className="font-heading text-lg font-semibold text-text-primary">
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px bg-border" />
                </div>

                {/* Skill badges — staggered */}
                <motion.div
                  className="flex flex-wrap gap-3"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                    },
                  }}
                >
                  {group.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.85, y: 10 },
                        show: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: { duration: 0.4, ease: "easeOut" },
                        },
                      }}
                    >
                      <SkillBadge {...skill} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </FadeInView>
          ))}
        </div>
      </Container>
    </section>
  );
}
