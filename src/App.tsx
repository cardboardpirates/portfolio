// App.tsx é o componente raiz: monta o fundo ambiente, a casca de navegação
// (header com crest/idioma + abas de página) e troca entre as 4 páginas do
// livreto de ficha (Capa, Diário de Missões, Portfólio, Contato) por estado,
// sem router.
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BookmarkNav } from "./components/layout/BookmarkNav";
import { PageTransition } from "./components/layout/PageTransition";
import { ContactPage } from "./components/pages/ContactPage";
import { CoverPage } from "./components/pages/CoverPage";
import { PortfolioPage } from "./components/pages/PortfolioPage";
import { QuestLogPage } from "./components/pages/QuestLogPage";
import { ArcaneBackground } from "./components/ui/ArcaneBackground";
import { Crest } from "./components/ui/Crest";
import { LanguageToggle } from "./components/ui/LanguageToggle";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { useLanguage } from "./hooks/useLanguage";
import { usePageNav } from "./hooks/usePageNav";
import { content } from "./lib/content";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { language, toggleLanguage } = useLanguage();
  const { activeId, direction, navigate } = usePageNav();
  const site = content[language];

  useEffect(() => {
    document.title = site.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", site.meta.description);
  }, [site.meta.title, site.meta.description]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen
            key="loading"
            label={site.loading.label}
            words={site.loading.words}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <ArcaneBackground />

          <header className="fixed left-0 top-0 z-50 flex items-center gap-3 p-4 md:p-6">
            <Crest alt={site.cover.portraitAlt} />
            <LanguageToggle language={language} onToggle={toggleLanguage} />
          </header>

          <main>
            <PageTransition pageKey={activeId} direction={direction}>
              {activeId === "cover" && (
                <CoverPage content={site} onNavigate={navigate} />
              )}
              {activeId === "log" && <QuestLogPage content={site} />}
              {activeId === "portfolio" && <PortfolioPage content={site} />}
              {activeId === "contact" && <ContactPage content={site} />}
            </PageTransition>
          </main>

          <BookmarkNav
            pages={site.nav.pages}
            activeId={activeId}
            onNavigate={navigate}
          />
        </motion.div>
      )}
    </>
  );
}

export default App;
