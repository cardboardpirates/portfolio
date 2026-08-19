import { useCountUp } from "../../hooks/useCountUp";
import type { SiteContent, StatContent } from "../../lib/types";
import { SectionHeader } from "../ui/SectionHeader";

interface StatsProps {
  content: SiteContent;
}

// Sub-componente interno, usado só dentro deste arquivo (não é exportado).
// Extraído porque cada estatística (9+ anos, 4 empregadores...) precisa do
// seu PRÓPRIO hook useCountUp e do seu próprio ref: um hook não pode ser
// chamado dentro de um .map diretamente, então cada item vira seu componente.
// A prop é tipada inline aqui ({ stat: StatContent }) por ser usada só neste
// lugar, sem necessidade de uma interface separada.
function StatItem({ stat }: { stat: StatContent }) {
  const { value, ref } = useCountUp<HTMLDivElement>(stat.value);
  return (
    <div ref={ref} className="flex flex-col items-center gap-2 text-center">
      <span className="font-display text-5xl text-text-primary md:text-6xl">
        {value}
        {stat.suffix}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-muted">
        {stat.label}
      </span>
    </div>
  );
}

export function Stats({ content }: StatsProps) {
  const { stats } = content;

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow={stats.eyebrow}
          heading={stats.heading}
          headingItalic={stats.headingItalic}
        />
        <div className="mt-12 grid grid-cols-1 gap-10 border-t border-stroke pt-12 sm:grid-cols-3">
          {stats.items.map((stat) => (
            <StatItem key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
