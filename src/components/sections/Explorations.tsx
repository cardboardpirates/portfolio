import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import type { SiteContent } from "../../lib/types";

interface ExplorationsProps {
  content: SiteContent;
}

const TILE_GRADIENTS = [
  "linear-gradient(135deg, #89AACC, #4E85BF)",
  "linear-gradient(135deg, #4E85BF, #26314a)",
  "linear-gradient(135deg, #cbd8e8, #89AACC)",
  "linear-gradient(135deg, #4E85BF, #89AACC)",
  "linear-gradient(135deg, #1b2636, #4E85BF)",
  "linear-gradient(135deg, #89AACC, #cbd8e8)",
];

export function Explorations({ content }: ExplorationsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !pinRef.current) return;

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinRef.current,
        pinSpacing: false,
      });

      const scrollConfig = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };

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
