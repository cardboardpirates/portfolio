import { useCallback, useState } from "react";
import { CLASS_PORTRAITS, classPortraitSrc } from "../lib/classPortraits";

function pickIndex(exclude?: number): number {
  if (CLASS_PORTRAITS.length <= 1) return 0;
  let i = Math.floor(Math.random() * CLASS_PORTRAITS.length);
  while (i === exclude) i = Math.floor(Math.random() * CLASS_PORTRAITS.length);
  return i;
}

// Sorteia uma classe ao montar (uma vez por abertura do site) e expõe
// "swap" pra sortear outra sem repetir a atual. As 4 imagens já foram
// pré-carregadas pela tela de loading (useAssetPreload), então trocar aqui
// só troca o "src" de uma imagem que o navegador já tem em cache.
export function useClassPortrait() {
  const [index, setIndex] = useState(() => pickIndex());
  const swap = useCallback(() => {
    setIndex((current) => pickIndex(current));
  }, []);
  const portrait = CLASS_PORTRAITS[index];

  return {
    src: classPortraitSrc(portrait.file),
    className: portrait.name,
    swap,
  };
}
