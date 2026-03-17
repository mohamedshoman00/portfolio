"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Send } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/layout/Container";
import FadeInView from "@/components/motion/FadeInView";
import emailjs from "@emailjs/browser";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "mohamedshoman242@gmail.com",
    href: "mailto:mohamedshoman242@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/mohamedshoman00",
    href: "https://github.com/mohamedshoman00",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/mohamedshoman00",  
    href: "https://linkedin.com/in/mohamedshoman00",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Cairo, Egypt",
    href: "#",
  },
];

type FormState = { name: string; email: string; message: string,subject:string };
type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" ,subject:"Portfolio Contact"});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus("sending");
  //   // [REPLACE this block with your form handler — e.g. Resend, Formspree, EmailJS]
  //   await new Promise((r) => setTimeout(r, 1200)); // simulate async
  //   setStatus("sent");
  //   setForm({ name: "", email: "", message: "" });
  //   setTimeout(() => setStatus("idle"), 4000);
  // };
  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setStatus('sending');
      emailjs.send(
        "service_g2978nr",
        "template_hqxvqzs",
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message
        },
        "bsXaSyYu28sbVbutM"
      ).then(
        (result) => {
            setStatus('sent');
          setForm({ name: '', email: '', subject: '', message: '' });

        },
        (error) => {
          setStatus('error');
        }
      );
    };

  const inputClass = `
    w-full bg-surface border border-border rounded-xl px-4 py-3
    text-text-primary text-sm placeholder:text-text-secondary/50
    focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30
    transition-colors duration-200
  `;

  return (
    <section id="contact" className="py-16 section-alt">
      <Container>
        <SectionHeader
          label="06 — Contact"
          title="Let's Work Together"
          subtitle="Open to frontend roles, freelance projects, and interesting collaborations."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* ── Left: Info panel ── */}
          <FadeInView direction="right">
            <div className="flex flex-col gap-6">

              {/* Availability note */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
                <p className="text-sm text-accent font-mono">
                  Available for new opportunities
                </p>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                Whether you have a project to build, a position to fill, or just want to say hi —
                my inbox is always open. I'll get back to you as soon as possible.
              </p>

              {/* Contact links */}
              <div className="flex flex-col gap-3 mt-2">
                {contactLinks.map(({ icon: Icon, label, value, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-colors group"
                  >
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors shrink-0">
                      <Icon size={16} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-[11px] font-mono text-text-secondary uppercase tracking-wider">
                        {label}
                      </p>
                      <p className="text-sm text-text-primary font-medium group-hover:text-accent transition-colors">
                        {value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeInView>

          {/* ── Right: Contact form ── */}
          <FadeInView direction="left" delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 bg-card border border-border rounded-2xl p-6 sm:p-8"
            >
              <h3 className="font-heading text-base font-semibold text-text-primary mb-1">
                Send a Message
              </h3>

              {/* Name */}
              <div>
                <label className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1.5 block">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1.5 block">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className={inputClass}
                />
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-mono text-text-secondary uppercase tracking-wider mb-1.5 block">
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or opportunity..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-6 py-3 rounded-xl text-sm font-medium
                  transition-all duration-200 mt-1
                  ${status === "sent"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-accent text-base hover:bg-cyan-300 shadow-lg shadow-cyan-400/20"
                  }
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
              >
                {status === "idle" && (
                  <><Send size={15} /> Send Message</>
                )}
                {status === "sending" && (
                  <><span className="w-4 h-4 border-2 border-base/40 border-t-base rounded-full animate-spin" /> Sending...</>
                )}
                {status === "sent" && "✓ Message Sent!"}
                {status === "error" && "Something went wrong. Try again."}
              </motion.button>
            </form>
          </FadeInView>
        </div>
      </Container>

      {/* ── Footer strip ── */}
      <div className="mt-6 pt-8 border-t border-border text-center">
        <p className="text-text-secondary text-xs font-mono">
          Designed & Built by{" "}
          <span className="text-accent">Mohamed Shoman</span> · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}
