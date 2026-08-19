import type { Language } from "../../lib/types";
import { BrFlagIcon, UsFlagIcon } from "./FlagIcon";

// Este componente é "controlado": ele não guarda o idioma sozinho, apenas recebe
// o idioma atual e uma função para trocar (padrão comum no React: o estado mora
// no componente pai, aqui App.tsx via o hook useLanguage, e é passado para baixo).
interface LanguageToggleProps {
  language: Language;
  onToggle: () => void; // "() => void" é o tipo de uma função sem argumentos que não retorna nada
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  const isEnglish = language === "en";

  return (
    <button
      type="button"
      onClick={onToggle}
      // aria-label descreve o botão para leitores de tela (acessibilidade),
      // já que o conteúdo visual é só um ícone de bandeira, sem texto.
      aria-label={isEnglish ? "Switch to Portuguese" : "Switch to English"}
      className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-stroke/50 sm:p-2.5"
    >
      {/* Mostra a bandeira do PRÓXIMO idioma disponível: se o site está em
          inglês, mostra a bandeira do Brasil (clicar troca para português),
          e vice-versa. */}
      {isEnglish ? (
        <BrFlagIcon className="h-3.5 w-5 rounded-[2px] sm:h-4 sm:w-6" />
      ) : (
        <UsFlagIcon className="h-3.5 w-5 rounded-[2px] sm:h-4 sm:w-6" />
      )}
    </button>
  );
}
