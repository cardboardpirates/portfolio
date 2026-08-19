import { useEffect, useRef, useState } from "react";

// "<T extends HTMLElement>" é um genérico do TypeScript: quem usar este hook
// escolhe qual tipo de elemento HTML vai referenciar (ex: useCountUp<HTMLDivElement>).
// Isso deixa "ref" corretamente tipado para cada uso, em vez de um HTMLElement genérico.
export function useCountUp<T extends HTMLElement>(
  target: number,
  durationMs = 1200, // parâmetro com valor padrão: se não passar durationMs, usa 1200ms
) {
  // "value" é o número exibido na tela, que sobe de 0 até "target".
  const [value, setValue] = useState(0);
  // useRef cria uma "caixinha" mutável que sobrevive entre renderizações sem
  // causar re-render quando muda. ref.current vai apontar pro elemento DOM real
  // depois que o componente que usa este hook conectar "ref" via JSX (ex: <div ref={ref}>).
  const ref = useRef<T | null>(null);
  // Segundo ref usado só como uma "flag" (verdadeiro/falso) para garantir que a
  // contagem rode uma única vez, mesmo que o elemento entre e saia da tela várias vezes.
  const hasRun = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Observa quando o elemento fica visível na tela (threshold: 0.4 = 40% visível)
    // para só começar a animação de contagem quando o usuário realmente vê o número.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          const start = performance.now();
          // "tick" é chamado a cada frame de animação (via requestAnimationFrame)
          // e calcula quanto tempo passou para saber o progresso (0 a 1) da contagem.
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / durationMs);
            setValue(Math.round(target * progress));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, durationMs]);

  // Devolve tanto o valor atual quanto o ref, para o componente que chama este
  // hook poder exibir "value" e conectar "ref" ao elemento que quer observar.
  return { value, ref };
}
