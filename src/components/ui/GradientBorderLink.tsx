import type { AnchorHTMLAttributes, ReactNode } from "react";

// "extends AnchorHTMLAttributes<HTMLAnchorElement>" reaproveita TODOS os atributos
// válidos de uma tag <a> (href, target, rel, etc.) e soma as props próprias deste
// componente (children, className, size). Assim quem usa <GradientBorderLink>
// pode passar qualquer prop normal de link, com autocomplete e checagem de tipos.
interface GradientBorderLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  // ReactNode é o tipo de "qualquer coisa que o React consegue renderizar"
  // (texto, elementos JSX, números, etc.), o tipo certo para "children".
  children: ReactNode;
  className?: string;
  size?: "sm" | "lg";
}

// Mapa de classes Tailwind por tamanho. Usar Record<"sm" | "lg", string> garante
// que as duas chaves existam e sejam sempre strings.
const sizeClasses: Record<"sm" | "lg", string> = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  lg: "px-6 py-3.5 text-sm md:text-base",
};

export function GradientBorderLink({
  children,
  className = "",
  size = "sm",
  // O "resto" (rest/spread) da desestruturação: junta todas as props que
  // não foram nomeadas acima (href, target, rel, onClick...) num único objeto
  // "anchorProps", pronto para repassar para a tag <a> real.
  ...anchorProps
}: GradientBorderLinkProps) {
  return (
    <a
      // Spread de props: espalha cada propriedade de anchorProps como um
      // atributo HTML separado na tag <a> (equivale a escrever href={...}
      // target={...} etc. manualmente, um por um).
      {...anchorProps}
      className={`group relative inline-flex rounded-full ${className}`}
    >
      {/* Este span é a "borda" com gradiente: fica invisível (opacity-0) e
          só aparece (group-hover:opacity-100) quando o mouse passa sobre o
          link pai (a classe "group" no <a> habilita esse comportamento). */}
      <span className="accent-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={`relative inline-flex items-center gap-2 rounded-full bg-surface text-muted backdrop-blur-md transition-colors group-hover:text-text-primary ${sizeClasses[size]}`}
      >
        {children}
      </span>
    </a>
  );
}
