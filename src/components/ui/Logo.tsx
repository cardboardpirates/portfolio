// Componente simples, sem props e sem estado: só retorna JSX fixo.
// A animação de hover (rotação, escala) é feita 100% em CSS/Tailwind
// (classes "group-hover:", "transition-transform"), sem JavaScript.
export function Logo() {
  return (
    <div className="group relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 ease-out hover:scale-110">
      <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-500 ease-out group-hover:-rotate-180" />
      <img
        // Mesmo truque do content.ts: usa a "base" configurada no Vite para
        // montar o caminho correto da imagem, funcionando tanto local quanto
        // publicado em um subcaminho no GitHub Pages.
        src={`${import.meta.env.BASE_URL}avatar.png`}
        alt="Pedro Visnardi"
        className="absolute inset-[1.5px] rounded-full object-cover"
      />
    </div>
  );
}
