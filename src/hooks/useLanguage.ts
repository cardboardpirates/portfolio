import { useCallback, useEffect, useState } from "react";
import type { Language } from "../lib/types";

const STORAGE_KEY = "portfolio-language";

// Função auxiliar (não é um hook, roda uma vez) que decide o idioma inicial:
// lê o localStorage do navegador se existir um idioma salvo de uma visita anterior.
// A checagem "typeof window === 'undefined'" protege contra ambientes sem DOM
// (como renderização no servidor), embora este projeto rode só no navegador.
function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "pt" ? "pt" : "en";
}

export function useLanguage() {
  // Passar uma FUNÇÃO para useState (em vez de um valor) faz o React chamá-la
  // só na primeira renderização, para calcular o estado inicial. Isso evita
  // reler o localStorage a cada re-render.
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Sempre que "language" mudar, atualiza o atributo lang do <html> (importante
  // para acessibilidade e SEO) e salva a escolha no localStorage para lembrar
  // na próxima visita.
  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  // useCallback memoriza a função entre renderizações, então ela só é recriada
  // se as dependências (aqui, nenhuma: array vazio) mudarem. Isso evita passar
  // uma função nova para componentes filhos a cada render, o que poderia causar
  // re-renders desnecessários neles.
  const toggleLanguage = useCallback(() => {
    // Forma funcional de atualizar estado: "prev" é sempre o valor mais recente,
    // mais seguro do que usar "language" diretamente aqui dentro.
    setLanguageState((prev) => (prev === "en" ? "pt" : "en"));
  }, []);

  return { language, toggleLanguage };
}
