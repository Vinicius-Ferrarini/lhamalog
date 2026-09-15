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
  claro/escuro e vira o índice/seletor do site: barra lateral fixa
  listando os `.html` do projeto e um `<iframe>` que troca de conteúdo
  conforme o item clicado. Único elemento fixo é a barra lateral (sticky
  no desktop, vira faixa horizontal em telas <720px). Nessa primeira
  versão a lista era um array `PAGES` fixo no JS.
- fix(mobile): troca a lista fixa (`PAGES`) do seletor por uma leitura
  de verdade da pasta via **File System Access API**
  (`window.showDirectoryPicker()`) — o array hard-coded ficou
  desatualizado assim que `index_dark.html`/`index_light.html` foram
  apagados, causando 404 no iframe. Agora a lista reflete o disco: um
  botão "Selecionar pasta do projeto" (só precisa 1x) lê os `.html`
  reais e o handle da pasta fica salvo no IndexedDB pra não pedir de
  novo. Adicionar/apagar um `.html` não exige mais editar código — só
  clicar em "Atualizar lista". Funciona em Chrome/Edge (a API não existe
  no Firefox/Safari, que mostram um aviso). Arquivos hoje no projeto:
  `visao_geral_lhamalog.html`, `LhamaLog.html` (`index_dark.html` e
  `index_light.html` foram removidos).
- fix(mobile): troca a File System Access API pela **API do GitHub**
  (`api.github.com/.../contents/`) pra listar os `.html` — a versão
  anterior não funcionava no Firefox (sem suporte à API) e o destino
  final é o GitHub Pages, então "ler a pasta local" nunca ia servir pra
  todo mundo. A API do GitHub resolve os dois problemas de uma vez: é só
  um `fetch`, funciona em qualquer navegador, e reflete o repositório de
  verdade tanto local (`file://`) quanto publicado. Testado e confirmado
  no Chrome e no Firefox de verdade (não só simulado). Sem seletor de
  pasta, sem IndexedDB — carrega sozinho ao abrir a página. Detecta
  owner/repo pela URL quando publicado em `<owner>.github.io/<repo>/`,
  com fallback fixo (`Vinicius-Ferrarini/lhamalog`) pra quando abrir
  local. Limite de 60 requisições/hora (API pública sem autenticação) —
  o botão "Atualizar lista" mostra erro e permite tentar de novo se
  isso acontecer.
