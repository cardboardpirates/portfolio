// Ícones de bandeira desenhados diretamente em SVG (sem carregar imagens externas),
// usados pelo botão de trocar idioma (LanguageToggle).

// "Props" é o nome convencional para o tipo dos parâmetros de um componente React
// (dados que o componente PAI passa para o componente FILHO).
interface FlagIconProps {
  className?: string;
}

// "{ className = "" }: FlagIconProps" é desestruturação de objeto com valor padrão:
// pega a propriedade "className" das props e, se não for passada, usa string vazia.
export function BrFlagIcon({ className = "" }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <clipPath id="br-flag-clip">
        <rect width="24" height="16" rx="2" />
      </clipPath>
      <g clipPath="url(#br-flag-clip)">
        <rect width="24" height="16" fill="#009739" />
        <polygon points="12,2 22,8 12,14 2,8" fill="#FEDD00" />
        <circle cx="12" cy="8" r="3.2" fill="#012169" />
      </g>
    </svg>
  );
}

// Mesmo padrão do componente acima, agora para a bandeira dos EUA.
// Dois componentes separados em vez de um genérico "FlagIcon" porque cada
// bandeira tem uma geometria SVG totalmente diferente.
export function UsFlagIcon({ className = "" }: FlagIconProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <clipPath id="us-flag-clip">
        <rect width="24" height="16" rx="2" />
      </clipPath>
      <g clipPath="url(#us-flag-clip)">
        <rect width="24" height="16" fill="#B22234" />
        <rect y="1.23" width="24" height="1.23" fill="#fff" />
        <rect y="3.69" width="24" height="1.23" fill="#fff" />
        <rect y="6.15" width="24" height="1.23" fill="#fff" />
        <rect y="8.62" width="24" height="1.23" fill="#fff" />
        <rect y="11.08" width="24" height="1.23" fill="#fff" />
        <rect y="13.54" width="24" height="1.23" fill="#fff" />
        <rect width="10.5" height="8.6" fill="#3C3B6E" />
      </g>
    </svg>
  );
}
