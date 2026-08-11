import { useEffect, useState } from "react";

export function useRotatingWords(words: string[], intervalMs: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (words.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  return { word: words[index] ?? "", index };
}
