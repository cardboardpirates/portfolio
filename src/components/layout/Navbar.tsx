import { useEffect, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { Language, SiteContent } from "../../lib/types";
import { GradientBorderLink } from "../ui/GradientBorderLink";
import { LanguageToggle } from "../ui/LanguageToggle";
import { Logo } from "../ui/Logo";

// Este componente recebe TODO o conteúdo do site ("content") mesmo só usando
// uma parte dele (nav, social); é mais simples repassar o objeto inteiro
// vindo de App.tsx do que criar props específicas para cada seção.
interface NavbarProps {
  content: SiteContent;
  language: Language;
  onToggleLanguage: () => void;
}

// Constante fora do componente: como o array nunca muda, definir aqui evita
// recriar um array novo (["hero", "work"]) a cada renderização, o que poderia
// disparar o useEffect de useActiveSection sem necessidade.
const NAV_SECTION_IDS = ["hero", "work"];

export function Navbar({ content, language, onToggleLanguage }: NavbarProps) {
  // Controla se a barra de navegação já foi "rolada" (para aplicar sombra).
  const [scrolled, setScrolled] = useState(false);
  // Hook customizado (visto em hooks/useActiveSection.ts) que devolve o id
  // da seção atualmente visível, usado para destacar o link certo no menu.
  const activeId = useActiveSection(NAV_SECTION_IDS);
  // Array.prototype.find percorre a lista de links sociais e retorna o primeiro
  // cujo href começa com "mailto:". O "?." (optional chaining) evita erro caso
  // nenhum link seja encontrado (find retorna undefined nesse caso), e "?? "#""
  // dá um valor de fallback.
  const emailHref =
    content.social.find((link) => link.href.startsWith("mailto:"))?.href ??
    "#";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    // Chama uma vez de imediato (para o estado já nascer correto se a página
    // recarregar no meio do scroll) e depois registra o listener contínuo.
    onScroll();
    // "{ passive: true }" avisa o navegador que este listener nunca vai chamar
    // preventDefault(), permitindo otimizar a performance do scroll.
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex items-center rounded-full border border-white/10 bg-surface/80 px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        <a href="#hero" aria-label="Home">
          <Logo />
        </a>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <div className="flex items-center gap-1">
          {/* .map transforma cada item do array "content.nav.links" em um
              elemento JSX <a>. Toda lista renderizada com .map precisa de uma
              prop "key" única (aqui, link.href) para o React conseguir
              identificar cada item entre renderizações. */}
          {content.nav.links.map((link) => {
            const isPdf = link.href.endsWith(".pdf");
            // Se o link for uma âncora interna (ex: "#work"), extrai o id
            // ("work") removendo o "#" para comparar com a seção ativa.
            const sectionId = link.href.startsWith("#")
              ? link.href.slice(1)
              : "";
            const isActive = !isPdf && sectionId === activeId;
            return (
              <a
                key={link.href}
                href={link.href}
                target={isPdf ? "_blank" : undefined}
                rel={isPdf ? "noopener noreferrer" : undefined}
                className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                  isActive
                    ? "bg-stroke/50 text-text-primary"
                    : "text-muted hover:bg-stroke/50 hover:text-text-primary"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <LanguageToggle language={language} onToggle={onToggleLanguage} />
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <GradientBorderLink href={emailHref}>
          {content.nav.sayHi} <span aria-hidden="true">↗</span>
        </GradientBorderLink>
      </div>
    </nav>
  );
}
