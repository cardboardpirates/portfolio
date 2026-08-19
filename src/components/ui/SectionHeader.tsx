import { motion } from "framer-motion";
import type { ReactNode } from "react";

// Componente reutilizável: SelectedWork, Explorations e Stats usam o mesmo
// "cabeçalho de seção" (eyebrow + título + subtexto), só trocando o conteúdo.
// Isso evita repetir a mesma estrutura JSX em três lugares diferentes.
interface SectionHeaderProps {
  eyebrow: string;
  heading: string;
  headingItalic: string;
  subtext?: string;
  // "action" permite que quem usa este componente injete um elemento extra
  // (ex: um botão) no canto do cabeçalho, sem o SectionHeader precisar saber
  // o que é esse elemento. Isso é o padrão de "slot"/"children" no React.
  action?: ReactNode;
}

export function SectionHeader({
  eyebrow,
  heading,
  headingItalic,
  subtext,
  action,
}: SectionHeaderProps) {
  return (
    <motion.div
      // Animação de entrada ao rolar a página: começa invisível e 30px abaixo,
      // e anima até opacidade 1 e posição normal quando entra na viewport.
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      // "once: true" faz a animação rodar só na primeira vez que aparece na tela
      // (não repete toda vez que o usuário rola pra cima e pra baixo).
      // "margin: -100px" antecipa o disparo, começando um pouco antes do
      // elemento entrar de fato na área visível.
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
    >
      <div className="flex max-w-xl flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="text-3xl font-medium text-text-primary md:text-5xl">
          {heading}{" "}
          <span className="font-display">{headingItalic}</span>
        </h2>
        {subtext && (
          <p className="max-w-md text-sm text-muted md:text-base">
            {subtext}
          </p>
        )}
      </div>
      {action}
    </motion.div>
  );
}
