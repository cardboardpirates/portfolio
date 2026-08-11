import type { AnchorHTMLAttributes, ReactNode } from "react";

interface GradientBorderLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  className?: string;
  size?: "sm" | "lg";
}

const sizeClasses: Record<"sm" | "lg", string> = {
  sm: "px-4 py-2 text-xs sm:text-sm",
  lg: "px-6 py-3.5 text-sm md:text-base",
};

export function GradientBorderLink({
  children,
  className = "",
  size = "sm",
  ...anchorProps
}: GradientBorderLinkProps) {
  return (
    <a
      {...anchorProps}
      className={`group relative inline-flex rounded-full ${className}`}
    >
      <span className="accent-gradient pointer-events-none absolute -inset-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span
        className={`relative inline-flex items-center gap-2 rounded-full bg-surface text-muted backdrop-blur-md transition-colors group-hover:text-text-primary ${sizeClasses[size]}`}
      >
        {children}
      </span>
    </a>
  );
}
