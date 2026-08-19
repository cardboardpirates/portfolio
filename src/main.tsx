// Este é o ponto de entrada da aplicação: o primeiro arquivo JS que roda no navegador.
// O Vite injeta este script no index.html e é aqui que o React "toma posse" da página.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importar CSS direto em um arquivo .tsx é um recurso do Vite/bundler: ele identifica
// o import e injeta o CSS na página no build final.
// Roboto Flex é uma fonte variável: um único arquivo cobre todo o eixo de peso
// (100 a 1000), então não precisa de um import por peso como a Inter tinha.
import '@fontsource-variable/roboto-flex'
import '@fontsource/pirata-one/400.css'
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
