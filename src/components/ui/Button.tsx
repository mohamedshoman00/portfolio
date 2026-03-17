"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  download?: boolean;
}

export default function Button({
  href,
  children,
  variant = "primary",
  external = false,
  download = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200 cursor-pointer";
  const variants = {
    primary:
      "bg-accent text-base hover:bg-cyan-300 glow-accent hover:shadow-cyan-400/40 hover:shadow-lg",
    ghost:
      "border border-border text-text-secondary hover:border-accent hover:text-accent bg-transparent",
  };

  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link
        href={href}
        className={`${base} ${variants[variant]}`}
        download={download}
        {...props}
      >
        {children}
      </Link>
    </motion.div>
  );
}
