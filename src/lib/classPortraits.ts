// Lista de imagens de "classe" usadas no crest e no botão de troca da capa.
// Fica em um módulo próprio pra ser compartilhada entre o hook que sorteia a
// classe (useClassPortrait) e o preload feito na tela de carregamento
// (useAssetPreload), sem duplicar os nomes de arquivo em dois lugares.
export const CLASS_PORTRAITS = [
  { file: "classe_clerigo.png", name: "Clérigo" },
  { file: "classe_ladino.png", name: "Ladino" },
  { file: "classe_mago.png", name: "Mago" },
  { file: "classe_paladino.png", name: "Paladino" },
] as const;

export function classPortraitSrc(file: string): string {
  return `${import.meta.env.BASE_URL}${file}`;
}

export const CLASS_PORTRAIT_SRCS = CLASS_PORTRAITS.map((portrait) =>
  classPortraitSrc(portrait.file),
);
