// Substitui o antigo Logo: o mesmo avatar em chip circular, agora com um
// anel de gradiente cônico girando devagar entre as 3 cores de destaque
// em vez do antigo gradiente azul estático.
interface CrestProps {
  alt: string;
  size?: number;
  src?: string;
}

export function Crest({
  alt,
  size = 36,
  src = `${import.meta.env.BASE_URL}avatar.png`,
}: CrestProps) {
  return (
    <div
      className="group relative flex shrink-0 items-center justify-center transition-transform duration-300 ease-out hover:scale-110"
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 animate-spin-slow rounded-full opacity-90 motion-reduce:animate-none"
        style={{
          backgroundImage:
            "conic-gradient(from 0deg, hsl(var(--arcane-purple)), hsl(var(--arcane-teal)), hsl(var(--arcane-amber)), hsl(var(--arcane-purple)))",
        }}
      />
      <img
        src={src}
        alt={alt}
        className="absolute inset-[2px] rounded-full object-cover grayscale-[30%] contrast-[1.05]"
      />
    </div>
  );
}
