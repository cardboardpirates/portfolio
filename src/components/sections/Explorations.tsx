import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import type { SiteContent } from "../../lib/types";

interface ExplorationsProps {
  content: SiteContent;
}

// Lista fixa de gradientes CSS usados nos "tiles" decorativos das duas colunas.
const TILE_GRADIENTS = [
  "linear-gradient(135deg, #89AACC, #4E85BF)",
  "linear-gradient(135deg, #4E85BF, #26314a)",
  "linear-gradient(135deg, #cbd8e8, #89AACC)",
  "linear-gradient(135deg, #4E85BF, #89AACC)",
  "linear-gradient(135deg, #1b2636, #4E85BF)",
  "linear-gradient(135deg, #89AACC, #cbd8e8)",
];

export function Explorations({ content }: ExplorationsProps) {
  // Quatro refs: a section inteira (usada como área de scroll/trigger),
  // o bloco que fica "grudado" na tela (pin) e as duas colunas de tiles
  // que se movem em velocidades diferentes (efeito parallax).
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinRef.current) return;

      // ScrollTrigger.create com "pin" faz o elemento "pinRef" ficar fixo
      // na tela (como position: sticky, mas mais controlável) enquanto o
      // usuário rola do topo ("top top") até o fim ("bottom bottom") da
      // section, que tem 300vh de altura (veja min-h-[300vh] no JSX abaixo)
      // justamente para dar espaço de scroll suficiente para esse efeito.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      // Configuração de scroll compartilhada pelas duas colunas.
      // "scrub: true" liga o progresso da animação direto ao progresso do
      // scroll (em vez de tocar automaticamente, ela "escrubra" para frente
      // e para trás conforme o usuário rola).
      const scrollConfig = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

      // As duas colunas se movem em direções opostas no eixo Y (uma sobe,
      // outra desce) enquanto o usuário rola, criando profundidade visual.
      if (colARef.current) {
        gsap.to(colARef.current, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
      }

      if (colBRef.current) {
        gsap.to(colBRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: scrollConfig,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // .slice(0, 3) e .slice(3) dividem a lista de 6 gradientes em dois grupos
  // de 3, um para cada coluna, sem duplicar dados.
  const columnA = TILE_GRADIENTS.slice(0, 3);
  const columnB = TILE_GRADIENTS.slice(3);

  return (
    <section
      id="explorations"
      ref={sectionRef}
      className="relative min-h-[300vh] bg-bg"
    >
      <div
        ref={pinRef}
        className="relative flex h-screen items-center justify-center overflow-hidden px-6"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="grid w-full max-w-[1400px] grid-cols-2 gap-10 md:gap-32">
            <div ref={colARef} className="flex flex-col items-end gap-5">
              {columnA.map((gradient, i) => (
                <div
                  key={gradient}
                  className="aspect-square w-full max-w-[180px] rounded-2xl md:max-w-[220px]"
                  style={{
                    backgroundImage: gradient,
                    transform: `rotate(${i % 2 === 0 ? -4 : 3}deg)`,
                  }}
                />
              ))}
            </div>
            <div ref={colBRef} className="mt-16 flex flex-col items-start gap-5">
              {columnB.map((gradient, i) => (
                <div
                  key={gradient}
                  className="aspect-square w-full max-w-[180px] rounded-2xl md:max-w-[220px]"
                  style={{
                    backgroundImage: gradient,
                    transform: `rotate(${i % 2 === 0 ? 4 : -3}deg)`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 flex max-w-md flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-stroke" />
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {content.explorations.eyebrow}
            </span>
          </div>
          <h2 className="text-3xl font-medium text-text-primary md:text-5xl">
            {content.explorations.heading}{" "}
            <span className="font-display">
              {content.explorations.headingItalic}
            </span>
          </h2>
          <p className="rounded-full bg-bg/70 px-4 py-1 text-sm text-muted backdrop-blur-sm md:text-base">
            {content.explorations.subtext}
          </p>
        </div>
      </div>
    </section>
  );
}
