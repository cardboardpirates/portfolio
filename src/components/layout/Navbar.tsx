import { useEffect, useState } from "react";
import { useActiveSection } from "../../hooks/useActiveSection";
import type { Language, SiteContent } from "../../lib/types";
import { GradientBorderLink } from "../ui/GradientBorderLink";
import { LanguageToggle } from "../ui/LanguageToggle";
import { Logo } from "../ui/Logo";

interface NavbarProps {
  content: SiteContent;
  language: Language;
  onToggleLanguage: () => void;
}

const NAV_SECTION_IDS = ["hero", "work"];

export function Navbar({ content, language, onToggleLanguage }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(NAV_SECTION_IDS);
  const emailHref =
    content.social.find((link) => link.href.startsWith("mailto:"))?.href ??
    "#";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
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
          {content.nav.links.map((link) => {
            const isPdf = link.href.endsWith(".pdf");
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
