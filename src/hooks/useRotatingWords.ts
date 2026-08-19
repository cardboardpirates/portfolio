import { useEffect, useState } from "react";

// Alterna entre as palavras de uma lista a cada "intervalMs" milissegundos.
// Usado no Hero (para as roles "Designer", "Developer"...) e na LoadingScreen.
export function useRotatingWords(words: string[], intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Reinicia o índice sempre que a lista de palavras mudar (ex: ao trocar de idioma),
    // para não ficar apontando para um índice que não existe mais na nova lista.
    setIndex(0);
    if (words.length <= 1) return;
    // setInterval roda a cada intervalMs, avançando para a próxima palavra.
    // "% words.length" (operador módulo/resto) faz o índice voltar a 0 depois
    // de chegar na última palavra, criando um ciclo infinito.
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  // "?? """ evita retornar undefined caso o índice esteja fora dos limites
  // (proteção extra, por exemplo durante a troca de idioma).
  return { word: words[index] ?? "", index };
}
