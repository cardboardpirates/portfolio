// Configuração do Tailwind CSS: define de onde ele lê classes usadas no projeto
// e estende o tema padrão com cores, fontes e animações próprias deste site.
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  // Lista de arquivos que o Tailwind varre em busca de classes (ex: "bg-bg", "text-muted")
  // para gerar só o CSS que é realmente usado (tree-shaking do CSS).
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    // "extend" adiciona itens ao tema padrão do Tailwind sem apagar o que já existe.
    extend: {
      // Cada cor aqui vira uma classe utilitária (ex: bg-bg, text-muted, border-stroke).
      // O valor lê uma variável CSS (--bg, --surface, etc, definidas em index.css) em
      // formato HSL; "<alpha-value>" é um placeholder especial do Tailwind que permite
      // usar opacidade dessas cores, tipo bg-bg/50.
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        "text-primary": "hsl(var(--text) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        stroke: "hsl(var(--stroke) / <alpha-value>)",
        "arcane-purple": "hsl(var(--arcane-purple) / <alpha-value>)",
        "arcane-teal": "hsl(var(--arcane-teal) / <alpha-value>)",
        "arcane-amber": "hsl(var(--arcane-amber) / <alpha-value>)",
      },
      // Define famílias de fonte customizadas: font-body e font-display.
      fontFamily: {
        body: ["Roboto Flex Variable", "sans-serif"],
        display: ["Pirata One", "serif"],
      },
      // Brilhos reservados a 1-2 painéis focais por página (não em toda borda),
      // para manter o "Arcane HUD" atmosférico em vez de saturado.
      boxShadow: {
        "glow-purple":
          "0 0 12px hsl(var(--arcane-purple) / 0.55), 0 0 2px hsl(var(--arcane-purple) / 0.85)",
        "glow-teal":
          "0 0 12px hsl(var(--arcane-teal) / 0.55), 0 0 2px hsl(var(--arcane-teal) / 0.85)",
        "glow-amber":
          "0 0 12px hsl(var(--arcane-amber) / 0.55), 0 0 2px hsl(var(--arcane-amber) / 0.85)",
      },
      // keyframes descreve os estágios de cada animação CSS (igual ao @keyframes do CSS puro).
      keyframes: {
        "role-fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      // "animation" transforma cada keyframe acima em uma classe utilitária,
      // já com duração, curva de tempo (easing) e repetição.
      animation: {
        "role-fade-in": "role-fade-in 0.4s ease-out",
        "spin-slow": "spin-slow 60s linear infinite",
      },
    },
  },
  // Plugin externo que adiciona utilitários prontos de animação/transição.
  plugins: [animate],
  // "satisfies Config" é um recurso do TypeScript: verifica que este objeto
  // é compatível com o tipo Config sem "converter" o objeto para esse tipo
  // (diferente de "as Config"), então o autocomplete continua preciso.
} satisfies Config;
