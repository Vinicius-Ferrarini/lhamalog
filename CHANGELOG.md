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
- feat(mobile): cria `visao_geral_lhamalog.html`, a versão "de produção"
  já prevista no design.md: responsiva de verdade (fluida no celular,
  centralizada num cartão de até 480px no PC, mesma fidelidade visual
  nos dois), sem moldura de celular, com nav inferior fixa na viewport e
  o mesmo toggle de tema claro/escuro. `index.html`, `index_dark.html`
  e `index_light.html` continuam intactos como mockup de tamanho fixo
  pra print/apresentação.
- feat(mobile): reformula `index.html` — deixa de ser o mockup unificado
  claro/escuro (esse papel passa a ser só de `index_dark.html` e
  `index_light.html`) e vira o índice/seletor do site: barra lateral fixa
  listando todos os `.html` do projeto (`index_dark.html`,
  `index_light.html`, `visao_geral_lhamalog.html`, `LhamaLog.html`) e um
  `<iframe>` que troca de conteúdo conforme o item clicado. Único
  elemento fixo é a barra lateral (sticky no desktop, vira faixa
  horizontal em telas <720px). Lista de páginas é um array `PAGES` no
  JS — precisa ser atualizado manualmente ao criar um novo `.html`.
