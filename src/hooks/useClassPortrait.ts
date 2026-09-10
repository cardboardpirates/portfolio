import { useCallback, useState } from "react";

// As 4 imagens de "classe" ficam em public/ (mesmo padrão de avatar.png),
// nome em minúsculo e sem acento pra evitar problema de URL-encoding.
const CLASS_PORTRAITS = [
  { file: "classe_clerigo.png", name: "Clérigo" },
  { file: "classe_ladino.png", name: "Ladino" },
  { file: "classe_mago.png", name: "Mago" },
  { file: "classe_paladino.png", name: "Paladino" },
] as const;

function pickIndex(exclude?: number): number {
  if (CLASS_PORTRAITS.length <= 1) return 0;
  let i = Math.floor(Math.random() * CLASS_PORTRAITS.length);
  while (i === exclude) i = Math.floor(Math.random() * CLASS_PORTRAITS.length);
  return i;
}

// Sorteia uma classe ao montar (uma vez por abertura do site) e expõe
// "swap" pra sortear outra sem repetir a atual.
export function useClassPortrait() {
  const [index, setIndex] = useState(() => pickIndex());
  const swap = useCallback(() => {
    setIndex((current) => pickIndex(current));
  }, []);
  const portrait = CLASS_PORTRAITS[index];

  return {
    src: `${import.meta.env.BASE_URL}${portrait.file}`,
    className: portrait.name,
    swap,
  };
}
