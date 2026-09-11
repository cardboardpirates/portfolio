// Este é o ponto de entrada da aplicação: o primeiro arquivo JS que roda no navegador.
// O Vite injeta este script no index.html e é aqui que o React "toma posse" da página.
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
// Sem StrictMode: o duplo monta/desmonta/remonta que ele faz em dev (pra pegar
// efeitos colaterais inseguros) deixa a flag interna "internal.active" do
// react-three-fiber travada depois do primeiro frame quando há um Canvas com
// @react-three/postprocessing (como o fundo Dither): a animação para de
// verdade só em dev, já que o StrictMode nem entra no build de produção. Sem
// outro estado efeitual complexo no site que se beneficiasse dessa checagem,
// não vale o trade-off de ter o fundo quebrado toda sessão de desenvolvimento.
createRoot(document.getElementById('root')!).render(<App />)
