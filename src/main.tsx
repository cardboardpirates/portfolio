// Este é o ponto de entrada da aplicação: o primeiro arquivo JS que roda no navegador.
// O Vite injeta este script no index.html e é aqui que o React "toma posse" da página.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Cada import abaixo carrega um arquivo CSS com um peso (weight) da fonte Inter.
// Importar CSS direto em um arquivo .tsx é um recurso do Vite/bundler: ele identifica
// o import e injeta o CSS na página no build final.
import '@fontsource/inter/300.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import '@fontsource/manufacturing-consent/400.css'
import './index.css'
import App from './App.tsx'

// createRoot conecta o React a um elemento real do DOM (a <div id="root"> do index.html).
// O "!" depois de getElementById é o operador de non-null assertion do TypeScript:
// diz ao compilador "confie em mim, esse elemento nunca vai ser null".
createRoot(document.getElementById('root')!).render(
  // StrictMode não renderiza nada visualmente. É um "modo de verificação" do React
  // que ativa avisos extras em desenvolvimento (ex: detecta efeitos colaterais
  // inseguros rodando os componentes duas vezes). Não afeta o build de produção.
  <StrictMode>
    <App />
  </StrictMode>,
)
