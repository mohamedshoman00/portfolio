"use client";

import { motion } from "framer-motion";
import { servicesData } from "@/data/services";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/layout/Container";

const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-base">
      <Container>
        <SectionHeader
          label="05 — Services"
          title="What I Can Do for You"
          subtitle="Focused frontend services for startups, teams, and individuals who need quality work."
        />

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
        >
          {servicesData.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                custom={i}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(34, 211, 238, 0.07)",
                }}
                transition={{ duration: 0.25 }}
                className="
                  group flex flex-col gap-4 p-6
                  bg-card border border-border rounded-2xl
                  hover:border-accent/30 transition-colors duration-300
                "
              >
                {/* Icon circle */}
                <div className="w-11 h-11 flex items-center justify-center rounded-xl bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300">
                  <Icon
                    size={20}
                    className="text-accent group-hover:scale-110 transition-transform duration-200"
                  />
                </div>

                {/* Title */}
                <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-surface border border-border text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 p-7 rounded-2xl border border-border bg-card text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div>
            <p className="text-text-primary font-heading font-semibold text-lg">
              Got a project in mind?
            </p>
            <p className="text-text-secondary text-sm mt-1">
              I'm open to frontend roles, freelance contracts, and collaborations.
            </p>
          </div>
          <a
            href="#contact"
            className="
              shrink-0 px-6 py-3 rounded-xl text-sm font-medium
              bg-accent text-base hover:bg-cyan-300
              shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40
              transition-all duration-200
            "
          >
            Let's Talk →
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
