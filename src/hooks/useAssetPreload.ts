import { useEffect, useRef, useState } from "react";
import { CLASS_PORTRAIT_SRCS } from "../lib/classPortraits";

const CREST_SRC = `${import.meta.env.BASE_URL}avatar.png`;

// Tudo que precisa estar pronto antes de esconder a tela de loading: as
// fontes (@fontsource, importadas em main.tsx), o avatar do crest (visível
// assim que o loading some) e os 4 retratos de classe. Pré-carregar os
// retratos aqui é o que evita a troca de classe travar na primeira vez que o
// usuário clica: quando o <img> pede um "src" novo, o navegador já tem o
// arquivo em cache em vez de precisar buscá-lo na rede.
const IMAGE_SRCS = [CREST_SRC, ...CLASS_PORTRAIT_SRCS];

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();
    // onerror também resolve (não onload) pra uma imagem faltando não travar
    // o loading pra sempre; ela só vai continuar quebrada onde é exibida.
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;
  });
}

// Acompanha o carregamento real dos assets críticos acima, em vez de simular
// uma barra de progresso com um timer fixo. Cada asset concluído soma uma
// fração igual do progresso "alvo"; o valor exibido é interpolado suavemente
// em direção a esse alvo (nunca ultrapassando-o) pra a barra não parecer
// "pular" quando vários assets terminam de carregar quase ao mesmo tempo.
export function useAssetPreload() {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const total = IMAGE_SRCS.length + 1; // +1 = fontes (document.fonts.ready)
    let loaded = 0;
    let cancelled = false;

    const bump = () => {
      if (cancelled) return;
      loaded += 1;
      targetRef.current = Math.round((loaded / total) * 100);
    };

    IMAGE_SRCS.forEach((src) => {
      preloadImage(src).then(bump);
    });
    document.fonts.ready.then(bump);

    let raf: number;
    const tick = () => {
      setProgress((current) => {
        const target = targetRef.current;
        if (current >= target) return target;
        const next = current + (target - current) * 0.15;
        return next >= target - 0.5 ? target : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, []);

  return Math.round(progress);
}
