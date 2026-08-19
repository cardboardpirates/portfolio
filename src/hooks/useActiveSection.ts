import { useEffect, useState } from "react";

// Hook customizado: uma função que começa com "use" e pode chamar outros hooks
// (useState, useEffect) dentro dela. Serve para reaproveitar lógica com estado
// entre componentes diferentes, aqui é usado pelo Navbar para saber qual seção
// da página está visível e destacar o link certo no menu.
export function useActiveSection(sectionIds: string[]) {
  // Estado que guarda o id da seção "ativa" no momento (ex: "hero" ou "work").
  // "?? """ garante um valor inicial mesmo se sectionIds vier vazio.
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    // Pega o elemento DOM de cada id da lista e descarta os que não existem.
    // A função dentro de .filter usa uma "type predicate" (el is HTMLElement):
    // isso ensina o TypeScript que, depois desse filtro, o array não tem mais
    // nenhum "null" dentro dele.
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // IntersectionObserver é uma API do navegador que avisa quando um elemento
    // entra ou sai da área visível da tela, sem precisar escutar o evento de
    // scroll manualmente (mais performático).
    const observer = new IntersectionObserver(
      (entries) => {
        // De todas as seções observadas, pega as que estão visíveis agora
        // e ordena da mais visível para a menos visível (intersectionRatio).
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      // rootMargin encolhe a área "de detecção" para uma faixa fina no meio da tela
      // (-45% em cima e embaixo), então uma seção só conta como ativa quando
      // cruza essa faixa central.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    // Toda função de cleanup retornada por useEffect roda quando o componente
    // desmonta ou antes do efeito rodar de novo. Aqui ela para de observar
    // os elementos para não vazar memória (memory leak).
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
