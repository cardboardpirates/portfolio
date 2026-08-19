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
        accent: "hsl(var(--accent) / <alpha-value>)",
      },
      // Define famílias de fonte customizadas: font-body e font-display.
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Pirata One", "serif"],
      },
      // keyframes descreve os estágios de cada animação CSS (igual ao @keyframes do CSS puro).
      keyframes: {
        "scroll-down": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        "role-fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      // "animation" transforma cada keyframe acima em uma classe utilitária
      // (ex: animate-scroll-down), já com duração, curva de tempo (easing) e repetição.
      animation: {
        "scroll-down": "scroll-down 1.5s ease-in-out infinite",
        "role-fade-in": "role-fade-in 0.4s ease-out",
        "gradient-shift": "gradient-shift 6s ease infinite",
      },
    },
  },
  // Plugin externo que adiciona utilitários prontos de animação/transição.
  plugins: [animate],
  // "satisfies Config" é um recurso do TypeScript: verifica que este objeto
  // é compatível com o tipo Config sem "converter" o objeto para esse tipo
  // (diferente de "as Config"), então o autocomplete continua preciso.
} satisfies Config;
