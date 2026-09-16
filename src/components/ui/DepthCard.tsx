import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from "react";
import { CornerBracket, type BracketTone } from "./CornerBracket";

// Card de portfólio com tilt 3D controlado pelo mouse e spotlight, inspirado
// no DepthCard do reactbits.dev (versão paga, sem acesso ao código-fonte;
// este é um equivalente próprio, construído com framer-motion). Em telas
// sem ponteiro fino (touch) ou com prefers-reduced-motion, cai para um
// cartão estático com a descrição sempre visível, em vez de esconder
// conteúdo atrás de um hover inalcançável.
export interface DepthCardProps {
  id: string;
  image: string;
  title?: string;
  description?: string;
  href?: string;
  onClick?: () => void;
  tone?: BracketTone;
  className?: string;
}

const MAX_ROTATE = 12;

const spotlightVar: Record<BracketTone, string> = {
  purple: "--arcane-purple",
  teal: "--arcane-teal",
  amber: "--arcane-amber",
  neutral: "--stroke",
};

const innerBorderClass: Record<BracketTone, string> = {
  purple: "border-arcane-purple/25",
  teal: "border-arcane-teal/25",
  amber: "border-arcane-amber/25",
  neutral: "border-stroke/50",
};

export function DepthCard({
  id,
  image,
  title,
  description,
  href,
  onClick,
  tone = "purple",
  className = "",
}: DepthCardProps) {
  const reduceMotion = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reduceMotion) {
      setInteractive(false);
      return;
    }
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setInteractive(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setInteractive(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reduceMotion]);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springPx = useSpring(px, { stiffness: 200, damping: 22, mass: 0.4 });
  const springPy = useSpring(py, { stiffness: 200, damping: 22, mass: 0.4 });
  const rotateX = useTransform(springPy, [0, 1], [MAX_ROTATE, -MAX_ROTATE]);
  const rotateY = useTransform(springPx, [0, 1], [-MAX_ROTATE, MAX_ROTATE]);
  const spotX = useTransform(springPx, [0, 1], ["0%", "100%"]);
  const spotY = useTransform(springPy, [0, 1], ["0%", "100%"]);
  const spotlightBg = useMotionTemplate`radial-gradient(280px circle at ${spotX} ${spotY}, hsl(var(${spotlightVar[tone]}) / 0.35), transparent 70%)`;

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (!interactive) return;
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    px.set(0.5);
    py.set(0.5);
    setRevealed(false);
  };

  const showDescription = !interactive || revealed;

  const content = (
    <>
      <span className="absolute inset-0 block overflow-hidden rounded-[3px]">
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="h-full w-full object-cover"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/30 to-transparent" />
      </span>
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[3px]"
        style={{ backgroundImage: interactive ? spotlightBg : "none" }}
        animate={{ opacity: interactive && revealed ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <span className="relative flex h-full flex-col justify-end gap-1.5 p-4">
        {title && (
          <span className="font-display text-lg text-text-primary md:text-xl">
            {title}
          </span>
        )}
        {description &&
          (interactive ? (
            <motion.span
              className="text-sm text-muted"
              initial={false}
              animate={
                showDescription ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }
              }
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {description}
            </motion.span>
          ) : (
            <span className="text-sm text-muted">{description}</span>
          ))}
      </span>
      <CornerBracket tone={tone} className="pointer-events-none absolute left-2 top-2" />
      <CornerBracket
        tone={tone}
        className="pointer-events-none absolute right-2 top-2 rotate-90"
      />
      <CornerBracket
        tone={tone}
        className="pointer-events-none absolute bottom-2 right-2 rotate-180"
      />
      <CornerBracket
        tone={tone}
        className="pointer-events-none absolute bottom-2 left-2 -rotate-90"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-[3px] rounded-[3px] border ${innerBorderClass[tone]}`}
      />
    </>
  );

  const sharedProps = {
    "data-depth-card-id": id,
    "aria-label": title ?? "Portfolio item",
    // text-left: sem isso, os azulejos sem "href" (que viram <button>, não
    // <a>) herdam o text-align:center do estilo padrão do navegador pra
    // botões, desalinhando o título/descrição dos demais azulejos.
    className: `relative aspect-[4/3] w-full overflow-visible rounded-md border border-stroke bg-surface/80 text-left ${className}`,
    style: {
      rotateX: interactive ? rotateX : 0,
      rotateY: interactive ? rotateY : 0,
      transformPerspective: 800,
    },
    onPointerMove: handlePointerMove,
    onPointerEnter: () => interactive && setRevealed(true),
    onPointerLeave: handlePointerLeave,
    onFocus: () => setRevealed(true),
    onBlur: () => setRevealed(false),
  } as const;

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        ref={rootRef as Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </motion.a>
    );
  }

  if (onClick) {
    return (
      <motion.button
        {...sharedProps}
        ref={rootRef as Ref<HTMLButtonElement>}
        type="button"
        onClick={onClick}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div {...sharedProps} ref={rootRef as Ref<HTMLDivElement>}>
      {content}
    </motion.div>
  );
}
