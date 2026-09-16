import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Modal simples pra projetos sem site próprio pra linkar (case studies em
// PDF/imagem só): empilha as imagens do "gallery" do azulejo, uma embaixo da
// outra, dentro de um painel rolável. Fecha com Esc, clique no fundo ou no X.
export interface GalleryModalProps {
  title?: string;
  description?: string;
  images: string[];
  onClose: () => void;
}

export function GalleryModal({
  title,
  description,
  images,
  onClose,
}: GalleryModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  // Renderizado num portal direto no body: a página fica dentro do
  // motion.div do PageTransition, que aplica "transform" mesmo parado, e
  // isso vira o "viewport" de qualquer descendente position:fixed — sem o
  // portal, o modal ficaria preso à coluna de conteúdo em vez de cobrir a
  // tela toda (a barra de navegação fixa, por exemplo, ficaria por cima).
  return createPortal(
    <AnimatePresence>
      <motion.div
        role="presentation"
        className="fixed inset-0 z-[9999] flex justify-center overflow-y-auto bg-bg/95 px-4 py-10 backdrop-blur-md sm:px-6 sm:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title ?? "Project gallery"}
          className="flex h-fit w-full max-w-3xl flex-col gap-6"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-10 -mx-4 flex items-start justify-between gap-4 bg-bg/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
            <div className="flex flex-col gap-1">
              {title && (
                <h2 className="font-display text-2xl text-text-primary md:text-3xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted md:text-base">{description}</p>
              )}
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stroke bg-surface/90 text-muted transition-colors duration-200 hover:border-arcane-teal/70 hover:text-arcane-teal"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {images.map((image, index) => (
              <div
                key={image}
                className="overflow-hidden rounded-md border border-stroke bg-surface/60"
              >
                <img
                  src={image}
                  alt={title ? `${title} ${index + 1}` : `Project image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
