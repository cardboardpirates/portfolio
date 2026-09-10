import { Briefcase, Code2, ExternalLink, Mail, type LucideIcon } from "lucide-react";
import type { LinkContent } from "./types";

// Não existe ícone de marca pra LinkedIn/GitHub no lucide-react (removidos por
// licenciamento), então usamos um ícone temático genérico no lugar de cada um.
// Compartilhado entre ContactPage e BookmarkNav (os dois listam os social links).
export function getSocialIcon(link: LinkContent): LucideIcon {
  if (link.href.startsWith("mailto:")) return Mail;
  if (link.href.includes("linkedin.com")) return Briefcase;
  if (link.href.includes("github.com")) return Code2;
  return ExternalLink;
}
