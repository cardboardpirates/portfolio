import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Contact } from "./components/sections/Contact";
import { Explorations } from "./components/sections/Explorations";
import { Hero } from "./components/sections/Hero";
import { SelectedWork } from "./components/sections/SelectedWork";
import { Stats } from "./components/sections/Stats";
import { LoadingScreen } from "./components/ui/LoadingScreen";
import { useLanguage } from "./hooks/useLanguage";
import { content } from "./lib/content";
import { ScrollTrigger } from "./lib/gsap";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { language, toggleLanguage } = useLanguage();
  const site = content[language];

  useEffect(() => {
    document.title = site.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", site.meta.description);
  }, [site.meta.title, site.meta.description]);

  useEffect(() => {
    if (isLoading) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [isLoading]);

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
          <Navbar
            content={site}
            language={language}
            onToggleLanguage={toggleLanguage}
          />
          <main>
            <Hero content={site} />
            <SelectedWork content={site} />
            <Explorations content={site} />
            <Stats content={site} />
          </main>
          <Contact content={site} />
        </motion.div>
      )}
    </>
  );
}

export default App;
