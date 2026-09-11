import type { SiteContent } from "../../lib/types";
import DriftWall from "../ui/DriftWall";
import { SheetHeading } from "../ui/SheetHeading";
import { SheetPanel } from "../ui/SheetPanel";

interface PortfolioPageProps {
  content: SiteContent;
}

// Página dedicada só ao portfólio visual (separada do Diário de Missões, que
// fica com o histórico profissional em texto). Enquanto não há imagens reais
// de projeto, a parede usa os azulejos de exemplo do próprio DriftWall
// (fotos genéricas do picsum.photos) e mostra um aviso honesto sobre isso,
// no mesmo espírito do card de "missão selada" do Diário de Missões.
export function PortfolioPage({ content }: PortfolioPageProps) {
  const { portfolio } = content;
  const tiles = portfolio.tiles?.map((tile) => ({
    image: tile.image,
    title: tile.title,
    href: tile.href,
  }));

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col gap-6 px-6 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28 md:pr-28 lg:px-16 lg:pr-28">
      <SheetHeading
        eyebrow={portfolio.eyebrow}
        heading={portfolio.heading}
        headingItalic={portfolio.headingItalic}
        subtext={portfolio.subtext}
      />

      {!portfolio.tiles && (
        <p className="w-fit rounded-sm border border-arcane-amber/40 bg-surface/60 px-3 py-1.5 text-xs text-arcane-amber">
          {portfolio.placeholderNote}
        </p>
      )}

      <SheetPanel
        tone="purple"
        glow
        className="h-[60vh] min-h-[420px] overflow-hidden p-1.5 md:h-[65vh]"
      >
        <DriftWall
          items={tiles}
          tilt={0}
          lift={56}
          turn={0}
          className="rounded-[3px]"
        />
      </SheetPanel>
    </section>
  );
}
