import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Cabeçalho reutilizado no topo de cada página do livreto de ficha.
// Anima na entrada da página (não no scroll: as páginas trocam por estado,
// então "whileInView" não faria sentido aqui como fazia no site de scroll único).
interface SheetHeadingProps {
  eyebrow: string;
  heading: string;
  headingItalic: string;
  subtext?: string;
  action?: ReactNode;
}

export function SheetHeading({
  eyebrow,
  heading,
  headingItalic,
  subtext,
  action,
}: SheetHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
          {heading} <span className="font-display">{headingItalic}</span>
        </h2>
        {subtext && (
          <p className="max-w-md text-sm text-muted md:text-base">{subtext}</p>
        )}
      </div>
      {action}
    </motion.div>
  );
}
