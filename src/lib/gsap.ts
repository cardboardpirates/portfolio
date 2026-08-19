// Arquivo central de configuração do GSAP (uma biblioteca de animação em JavaScript,
// separada do framer-motion; o site usa as duas: framer-motion para animações de
// componentes React e GSAP para animações de scroll mais elaboradas).
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTrigger é um plugin do GSAP que liga animações ao scroll da página
// (ex: "pinar" uma seção ou mover um elemento conforme o usuário rola).
// Plugins do GSAP precisam ser registrados uma única vez antes de usar.
gsap.registerPlugin(ScrollTrigger);

// Reexportamos os dois a partir daqui para que todo componente importe
// de um único lugar ("../../lib/gsap") em vez de duas bibliotecas diferentes,
// garantindo que o registerPlugin acima já rodou antes de qualquer uso.
export { gsap, ScrollTrigger };
