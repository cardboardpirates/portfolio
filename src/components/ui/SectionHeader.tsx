import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  headingItalic: string;
  subtext?: string;
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  heading,
  headingItalic,
  subtext,
  action,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div className="flex max-w-xl flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-3xl font-medium text-text-primary md:text-5xl">
          {heading}{" "}
          <span className="font-display">{headingItalic}</span>
        </h2>
        {subtext && (
          <p className="max-w-md text-sm text-muted md:text-base">
            {subtext}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  );
}
