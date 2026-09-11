import {
  Briefcase,
  Dices,
  Globe,
  Hourglass,
  Layers,
  Star,
  type LucideIcon,
} from "lucide-react";
import { useRotatingWords } from "../../hooks/useRotatingWords";
import type { PageId, SiteContent } from "../../lib/types";
import { LanguageTierList } from "../ui/LanguageTierList";
import { ProficiencyTagList } from "../ui/ProficiencyTagList";
import { SheetPanel } from "../ui/SheetPanel";
import { StatTile } from "../ui/StatTile";

interface CoverPageProps {
  content: SiteContent;
  onNavigate: (id: PageId) => void;
  portraitSrc: string;
  onSwapPortrait: () => void;
}

// Os 3 stats reais de cover.stats vêm sempre nessa ordem fixa (anos, empregadores,
// idiomas) tanto em en quanto em pt; ícone/tom não são texto traduzido, então
// entram aqui por posição em vez de no modelo de conteúdo.
const STAT_ICONS: LucideIcon[] = [Hourglass, Briefcase, Globe];
const STAT_TONES: Array<"purple" | "teal" | "amber"> = [
  "purple",
  "teal",
  "amber",
];

// Página I do livreto de ficha: retrato, nome, classe, tagline e os "campos"
// de identidade (atributos reais, proficiências, idiomas), densa o bastante
// pra funcionar sozinha caso o recrutador nunca vire a página.
export function CoverPage({
  content,
  onNavigate,
  portraitSrc,
  onSwapPortrait,
}: CoverPageProps) {
  const { cover } = content;
  const { word: klass, index: classIndex } = useRotatingWords(
    cover.classes,
    2200,
  );

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-6 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28 md:pr-28 lg:px-16 lg:pr-28">
      <div className="grid flex-1 grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-8">
        <div className="flex flex-col items-center gap-5 text-center md:col-span-5 md:items-start md:text-left">
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {cover.eyebrow}
          </span>

          <div className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-spin-slow rounded-full opacity-80 motion-reduce:animate-none"
              style={{
                backgroundImage:
                  "conic-gradient(from 0deg, hsl(var(--arcane-purple)), hsl(var(--arcane-teal)), hsl(var(--arcane-amber)), hsl(var(--arcane-purple)))",
              }}
            />
            <img
              src={portraitSrc}
              alt={cover.portraitAlt}
              className="absolute inset-[3px] rounded-full object-cover grayscale-[25%] contrast-[1.05]"
            />
            <button
              type="button"
              onClick={onSwapPortrait}
              aria-label={cover.swapClassLabel}
              title={cover.swapClassLabel}
              className="absolute -bottom-1 -right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-stroke bg-surface/90 text-muted backdrop-blur-md transition-all duration-300 hover:border-arcane-teal/70 hover:text-arcane-teal hover:shadow-glow-teal"
            >
              <Dices size={14} />
            </button>
          </div>

          <h1 className="font-display text-4xl leading-[0.95] text-text-primary md:text-6xl">
            {cover.name}
          </h1>

          <p className="text-base text-muted md:text-lg">
            {cover.classIntro}{" "}
            <span
              key={classIndex}
              className="inline-block animate-role-fade-in font-display text-text-primary"
            >
              {klass}
            </span>{" "}
            {cover.classOutro}
          </p>

          <p className="max-w-sm text-sm text-muted md:text-base">
            {cover.tagline}
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <button
              type="button"
              onClick={() => onNavigate("log")}
              className="group relative inline-flex rounded-sm"
            >
              <span className="relative inline-flex items-center gap-2 rounded-sm border border-arcane-purple/50 bg-arcane-purple/10 px-6 py-3 text-sm text-text-primary transition-all duration-300 group-hover:shadow-glow-purple">
                {cover.ctaPrimary}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("contact")}
              className="group relative inline-flex rounded-sm"
            >
              <span className="relative inline-flex items-center gap-2 rounded-sm border border-stroke bg-surface/80 px-6 py-3.5 text-sm text-muted backdrop-blur-md transition-all duration-300 group-hover:border-arcane-teal/70 group-hover:text-arcane-teal group-hover:shadow-glow-teal md:text-base">
                {cover.ctaSecondary}
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5 md:col-span-7">
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-muted">
              <Star size={13} className="shrink-0" />
              {cover.statsLabel}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {cover.stats.map((stat, i) => (
                <StatTile
                  key={stat.label}
                  stat={stat}
                  icon={STAT_ICONS[i]}
                  tone={STAT_TONES[i]}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5 pt-2">
            <SheetPanel
              tone="teal"
              label={cover.proficienciesLabel}
              labelIcon={Layers}
              className="p-5 pt-7"
            >
              <ProficiencyTagList
                groupLabels={cover.proficiencyGroups}
                items={cover.proficiencies}
              />
            </SheetPanel>
            <SheetPanel
              tone="amber"
              label={cover.languagesLabel}
              labelIcon={Globe}
              className="p-5 pt-7"
            >
              <LanguageTierList items={cover.languages} />
            </SheetPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
