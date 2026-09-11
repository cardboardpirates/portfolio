// Fundo ambiente "Arcane HUD": ondas dithered (componente Dither, reactbits.dev)
// cobrindo toda a tela, com scanlines/grain por cima pra manter a textura
// "retrô" do resto do site. Monta uma única vez na raiz do app, atrás das 3
// páginas, e persiste durante a troca entre elas.
//
// A animação do shader fica sempre ligada (não segue prefers-reduced-motion):
// é um movimento ambiente muito lento (waveSpeed baixo), não o tipo de
// movimento brusco que essa preferência existe pra evitar, e amarrar isso a
// reduceMotion deixava o fundo congelado sempre que o SO do usuário tinha
// "reduzir movimento" ativado.
import { memo } from "react";
import { Dither } from "./Dither";

// Roxo de destaque escolhido pra combinar com --arcane-purple, em RGB 0..1
// (formato que o shader do Dither espera).
const WAVE_COLOR: [number, number, number] = [
  0.22745098039215686, 0.14901960784313725, 0.3686274509803922,
];
// --bg (HSL 240 15% 5%) convertido pra RGB 0..1, pra o fundo do shader bater
// com o fundo real do site em vez do preto puro padrão do componente.
const BACKGROUND_COLOR: [number, number, number] = [0.043, 0.043, 0.058];

// Memoizado (sem props, então nunca deveria re-renderizar de verdade): o App
// re-renderiza inteiro em trocas de estado alheias ao fundo (idioma,
// navegação entre páginas), e um re-render aqui recriava objetos que o
// Dither espera com identidade estável entre renders, resetando o shader.
export const ArcaneBackground = memo(function ArcaneBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 overflow-hidden bg-bg">
      <Dither
        waveColor={WAVE_COLOR}
        backgroundColor={BACKGROUND_COLOR}
        disableAnimation={false}
        enableMouseInteraction
        mouseRadius={0.5}
        colorNum={5}
        pixelSize={2}
        waveAmplitude={0.15}
        waveFrequency={5}
        waveSpeed={0.03}
      />

      <div className="arcane-scanlines absolute inset-0 opacity-40" />
      <div className="arcane-grain absolute inset-0 opacity-[0.04]" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
});
