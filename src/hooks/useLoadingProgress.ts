import { useEffect, useState } from "react";

// Hook que simula uma barra de progresso de 0 a 100 ao longo de "durationMs"
// milissegundos, usado pela tela de carregamento (LoadingScreen).
export function useLoadingProgress(durationMs = 2700) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // "let" (não "const") porque essa variável é reatribuída dentro de tick().
    let raf: number;
    const start = performance.now();

    // requestAnimationFrame chama "tick" antes do navegador desenhar o próximo
    // frame, sincronizado com a taxa de atualização da tela (geralmente 60fps).
    // É preferível a setInterval para animações porque fica mais suave e pausa
    // automaticamente se a aba estiver em segundo plano.
    const tick = (now: number) => {
      const elapsed = now - start;
      const next = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(next);
      if (next < 100) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    // Cleanup: cancela o frame agendado se o componente desmontar no meio da animação.
    return () => cancelAnimationFrame(raf);
  }, [durationMs]);

  return progress;
}
