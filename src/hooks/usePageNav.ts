import { useCallback, useEffect, useState } from "react";
import type { PageId } from "../lib/types";

// Ordem fixa das 3 páginas do livreto de ficha, usada tanto para navegar
// com as setas do teclado quanto para saber se uma troca de página é
// "pra frente" ou "pra trás" (e animar a transição no sentido certo).
const PAGE_IDS: PageId[] = ["cover", "log", "portfolio", "contact"];

function getInitialPage(): PageId {
  if (typeof window === "undefined") return "cover";
  const hash = window.location.hash.replace("#", "");
  return (PAGE_IDS as string[]).includes(hash) ? (hash as PageId) : "cover";
}

export function usePageNav() {
  const [activeId, setActiveId] = useState<PageId>(getInitialPage);
  const [direction, setDirection] = useState<1 | -1>(1);

  const navigate = useCallback((id: PageId) => {
    setActiveId((prev) => {
      if (prev === id) return prev;
      setDirection(PAGE_IDS.indexOf(id) > PAGE_IDS.indexOf(prev) ? 1 : -1);
      return id;
    });
  }, []);

  // Sincroniza com o hash da URL: permite voltar/avançar pelo histórico do
  // navegador e compartilhar um link direto para uma página específica.
  useEffect(() => {
    window.location.hash = activeId;
  }, [activeId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = PAGE_IDS.indexOf(activeId);
      if (event.key === "ArrowRight" && currentIndex < PAGE_IDS.length - 1) {
        navigate(PAGE_IDS[currentIndex + 1]);
      } else if (event.key === "ArrowLeft" && currentIndex > 0) {
        navigate(PAGE_IDS[currentIndex - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, navigate]);

  return { activeId, direction, navigate };
}
