// Configuração do Vite: a ferramenta que compila e serve o projeto em desenvolvimento
// e gera os arquivos estáticos finais (HTML/CSS/JS) para produção.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // "base" é o caminho onde o site fica hospedado. Como este portfólio é publicado
  // em GitHub Pages sob um subcaminho (usuario.github.io/portfolio/), todos os links
  // e assets gerados precisam levar esse prefixo em conta.
  base: '/portfolio/',
  // O plugin do React ensina o Vite a entender arquivos .tsx/.jsx (sintaxe JSX)
  // e ativa o Fast Refresh (atualização instantânea ao salvar durante o desenvolvimento).
  plugins: [react()],
})
