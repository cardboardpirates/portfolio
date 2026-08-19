// App.tsx é o componente raiz: monta o layout inteiro da página juntando
// as seções (Hero, SelectedWork, etc.) e controla o estado global de nível mais alto
// (idioma e tela de carregamento).
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
  // useState devolve um par: [valor atual, função para atualizar o valor].
  // Toda vez que setIsLoading é chamado, o React re-renderiza este componente
  // com o novo valor de isLoading.
  const [isLoading, setIsLoading] = useState(true);
  // Hook customizado (definido em hooks/useLanguage.ts) que encapsula a lógica
  // de ler/gravar o idioma escolhido no localStorage do navegador.
  const { language, toggleLanguage } = useLanguage();
  // content é um objeto com chaves "en" e "pt" (veja lib/content.ts); aqui escolhemos
  // o conjunto de textos do idioma ativo. "site" concentra todo o texto da página.
  const site = content[language];

  // useEffect roda código depois que o componente renderiza (efeito colateral).
  // O array no final ([site.meta.title, site.meta.description]) é a "lista de dependências":
  // o efeito só roda de novo quando um desses valores muda entre renderizações.
  useEffect(() => {
    document.title = site.meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", site.meta.description);
  }, [site.meta.title, site.meta.description]);

  // Segundo efeito: quando a tela de loading termina (isLoading vira false),
  // pedimos pro GSAP recalcular as posições de scroll (ScrollTrigger.refresh()),
  // já que o conteúdo real só existe no DOM depois do loading sumir.
  // requestAnimationFrame espera o próximo frame de renderização do navegador
  // antes de rodar o refresh, e a função retornada faz a limpeza (cleanup)
  // cancelando o frame agendado se o componente desmontar antes disso.
  useEffect(() => {
    if (isLoading) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [isLoading]);

  return (
    // <>...</> é um Fragment: agrupa elementos sem criar uma div extra no DOM.
    <>
      {/* AnimatePresence (do framer-motion) permite animar a SAÍDA de um elemento
          quando ele é removido da árvore, algo que o React sozinho não faz
          (normalmente o elemento some na hora). mode="wait" espera a animação
          de saída da LoadingScreen terminar antes de montar o próximo filho. */}
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

      {/* Renderização condicional: "!isLoading &&" só desenha este bloco
          quando isLoading é false. É o padrão mais comum de "if" dentro do JSX. */}
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
