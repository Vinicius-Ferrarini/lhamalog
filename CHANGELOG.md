# Changelog

## [não lançado]
- feat(mobile): cria `index.html` unificando `index_dark.html` e
  `index_light.html` num único arquivo com botão de alternância
  claro/escuro (`toggleTheme()`), tema claro como padrão. Nenhuma
  variável de cor de componente foi alterada — apenas o fundo do
  cenário do mockup (`--studio-bg`, fora da moldura do celular) passou
  a reagir ao toggle junto com o resto da tela.
- feat(mobile): substitui o ícone SVG placeholder da logo pelo PNG real
  do cliente (`logo.png`) nos três arquivos (`index.html`,
  `index_dark.html`, `index_light.html`). Fundo cinza-claro removido
  (agora transparente) e imagem redimensionada/otimizada
  (`logo-mark-small.png`, ~11KB), embutida como base64 pra manter cada
  HTML autocontido. Badge azul atrás do ícone foi removido — a marca já
  é bicolor, então o fundo `--brand` gerava azul-sobre-azul.
