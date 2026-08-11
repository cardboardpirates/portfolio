import type { Language } from "../../lib/types";
import { BrFlagIcon, UsFlagIcon } from "./FlagIcon";

interface LanguageToggleProps {
  language: Language;
  onToggle: () => void;
}

export function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  const isEnglish = language === "en";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isEnglish ? "Switch to Portuguese" : "Switch to English"}
      className="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-stroke/50 sm:p-2.5"
    >
      {isEnglish ? (
        <BrFlagIcon className="h-3.5 w-5 rounded-[2px] sm:h-4 sm:w-6" />
      ) : (
        <UsFlagIcon className="h-3.5 w-5 rounded-[2px] sm:h-4 sm:w-6" />
      )}
    </button>
  );
}
