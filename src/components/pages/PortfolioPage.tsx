import { useState } from "react";
import type { PortfolioTileContent, SiteContent } from "../../lib/types";
import { DepthCard } from "../ui/DepthCard";
import { GalleryModal } from "../ui/GalleryModal";
import { SheetHeading } from "../ui/SheetHeading";

interface PortfolioPageProps {
  content: SiteContent;
}

// Azulejos de exemplo (fotos genéricas do picsum.photos) usados só enquanto
// não há nenhum projeto real, no mesmo espírito do card de "missão selada"
// do Diário de Missões.
const PLACEHOLDER_TILES: PortfolioTileContent[] = [
  {
    id: "placeholder-1",
    image: "https://picsum.photos/id/1015/800/600",
    title: "Project One",
    description: "Placeholder project, real case study coming soon.",
  },
  {
    id: "placeholder-2",
    image: "https://picsum.photos/id/1025/800/600",
    title: "Project Two",
    description: "Placeholder project, real case study coming soon.",
  },
  {
    id: "placeholder-3",
    image: "https://picsum.photos/id/1039/800/600",
    title: "Project Three",
    description: "Placeholder project, real case study coming soon.",
  },
];

// Página dedicada só ao portfólio visual (separada do Diário de Missões, que
// fica com o histórico profissional em texto). Um azulejo com "gallery" abre
// um modal empilhando essas imagens em vez de navegar (usado por projetos
// sem site próprio pra linkar, como cases de design gráfico).
export function PortfolioPage({ content }: PortfolioPageProps) {
  const { portfolio } = content;
  const tiles =
    portfolio.tiles && portfolio.tiles.length > 0
      ? portfolio.tiles
      : PLACEHOLDER_TILES;
  const [openTile, setOpenTile] = useState<PortfolioTileContent | null>(null);

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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <DepthCard
            key={tile.id}
            id={tile.id}
            image={tile.image}
            title={tile.title}
            description={tile.description}
            href={tile.gallery ? undefined : tile.href}
            onClick={tile.gallery ? () => setOpenTile(tile) : undefined}
          />
        ))}
      </div>

      {openTile?.gallery && (
        <GalleryModal
          title={openTile.title}
          description={openTile.description}
          images={openTile.gallery}
          onClose={() => setOpenTile(null)}
        />
      )}
    </section>
  );
}
