import { Calendar, GraduationCap, Hourglass, ScrollText } from "lucide-react";
import type { SiteContent } from "../../lib/types";
import { QuestLogEntry } from "../ui/QuestLogEntry";
import { SheetHeading } from "../ui/SheetHeading";
import { SheetPanel } from "../ui/SheetPanel";
import { SideQuestPanel } from "../ui/SideQuestPanel";

interface QuestLogPageProps {
  content: SiteContent;
}

// Página II: bio narrativa, o histórico profissional real como "diário de
// missões", formação/treinamento, e o card de missão paralela (criação de
// conteúdo de Magic: The Gathering, fora do trabalho com clientes).
export function QuestLogPage({ content }: QuestLogPageProps) {
  const { log } = content;

  return (
    <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1200px] flex-col gap-10 px-6 pb-24 pt-24 md:px-10 md:pb-16 md:pt-28 md:pr-28 lg:px-16 lg:pr-28">
      <SheetHeading
        eyebrow={log.eyebrow}
        heading={log.heading}
        headingItalic={log.headingItalic}
        subtext={log.bio}
      />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="flex flex-col gap-4 md:col-span-8">
          <div className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-muted">
            <ScrollText size={13} className="shrink-0" />
            {log.questsLabel}
          </div>
          {log.quests.map((quest) => (
            <QuestLogEntry
              key={quest.id}
              quest={quest}
              activeLabel={log.activeQuestLabel}
            />
          ))}
        </div>

        <div className="flex flex-col gap-4 md:col-span-4">
          <div className="flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.25em] text-muted">
            <GraduationCap size={13} className="shrink-0" />
            {log.trainingLabel}
          </div>
          {log.training.map((entry) => {
            const isIncomplete = entry.status === "incomplete";
            return (
              <SheetPanel
                key={entry.id}
                tone="neutral"
                label={entry.period}
                labelIcon={Calendar}
                // Formação incompleta é "desaturada": sem cor de destaque
                // nenhuma (nem o amber do resto do site) e com opacidade
                // reduzida, pra ler como um bloco indisponível na ficha em
                // vez de só mais uma entrada de treino comum.
                className={`flex flex-col gap-1 p-5 pt-7 ${
                  isIncomplete ? "opacity-50 grayscale" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  {isIncomplete ? (
                    <Hourglass size={16} className="shrink-0 text-muted" />
                  ) : (
                    <GraduationCap size={16} className="shrink-0 text-muted" />
                  )}
                  <h3 className="font-display text-lg text-text-primary">
                    {entry.institution}
                  </h3>
                </div>
                <p className="text-sm text-muted">{entry.program}</p>
                {isIncomplete && (
                  <span className="mt-1 flex w-fit items-center gap-1.5 rounded-sm border border-stroke px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                    <Hourglass size={10} />
                    {log.incompleteTrainingLabel}
                  </span>
                )}
              </SheetPanel>
            );
          })}

          <SideQuestPanel
            eyebrow={log.sideQuest.eyebrow}
            title={log.sideQuest.title}
            body={log.sideQuest.body}
            links={log.sideQuest.links}
          />
        </div>
      </div>
    </section>
  );
}
