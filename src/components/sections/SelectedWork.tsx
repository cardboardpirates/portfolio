import { motion } from "framer-motion";
import type { SiteContent } from "../../lib/types";
import { GradientBorderLink } from "../ui/GradientBorderLink";
import { SectionHeader } from "../ui/SectionHeader";

interface SelectedWorkProps {
  content: SiteContent;
}

export function SelectedWork({ content }: SelectedWorkProps) {
  // Este componente não tem estado nem efeitos: é um componente "puro" de
  // apresentação, só monta o layout a partir das props recebidas.
  const { work } = content;

  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={work.eyebrow}
          heading={work.heading}
          headingItalic={work.headingItalic}
          subtext={work.subtext}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6"
        >
          <div className="relative overflow-hidden rounded-3xl border border-stroke bg-surface p-8 md:col-span-8 md:p-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "4px 4px",
              }}
            />
            <div className="relative flex flex-col gap-6">
              <span className="w-fit rounded-full border border-stroke px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted">
                {work.panelEyebrow}
              </span>
              <h3 className="font-display text-3xl text-text-primary md:text-4xl">
                {work.panelTitle}
              </h3>
              <p className="max-w-md text-sm text-muted md:text-base">
                {work.panelBody}
              </p>
              <div className="mt-2 flex flex-wrap gap-3">
                {/* Renderiza um GradientBorderLink para cada item de
                    work.panelLinks (Currículo, LinkedIn, GitHub), reaproveitando
                    o componente de botão de link definido em ui/GradientBorderLink. */}
                {work.panelLinks.map((link) => (
                  <GradientBorderLink
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </GradientBorderLink>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-3 rounded-3xl border border-stroke bg-surface p-8 md:col-span-4 md:p-10">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">
              {work.sideLabel}
            </span>
            <h3 className="font-display text-2xl text-text-primary md:text-3xl">
              {work.sideTitle}
            </h3>
            <p className="text-sm text-muted">{work.sideBody}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
