import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface RevealTextProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  y?: number;
}

export default function RevealText({
  children,
  as = "div",
  className = "",
  delay = 0,
  y = 24,
}: RevealTextProps) {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Component>
  );
}
