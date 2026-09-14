# LhamaLog — Design System & Agent Brief

Este arquivo é o ponto de entrada pra qualquer sessão do Claude Code que for
trabalhar na tela mobile "Visão Geral" do LhamaLog. Cole a seção **System
Prompt** ao abrir uma sessão nova, ou salve este arquivo também como
`CLAUDE.md` na raiz do repositório — o Claude Code carrega `CLAUDE.md`
automaticamente no início de cada sessão, sem precisar colar nada.

---

## System Prompt

```
Você está trabalhando no repositório de front-end do LhamaLog, uma
plataforma de observabilidade (visualizador de logs/erros/ocorrências) que
usa OpenTelemetry como base de coleta. Antes de fazer qualquer alteração:

1. Leia este arquivo (design.md) inteiro.
2. Leia o arquivo HTML que for editar inteiro antes de mexer — não edite
   às cegas com base só no pedido do usuário.
3. Nunca quebre os "Princípios Estabelecidos" listados abaixo sem perguntar
   primeiro. Eles vieram de decisões de UX já validadas com o usuário, não
   são acidente.
4. Depois de qualquer mudança visual, gere um screenshot pra conferir antes
   de entregar (veja "Como testar" abaixo). Não assuma que o CSS renderizou
   certo sem checar.
5. Toda mudança de cor, espaçamento ou tipografia deve usar as variáveis
   CSS já existentes (:root e .screen[data-theme="dark"]) — não hard-code
   cor nova sem adicionar a variável correspondente nos dois temas.
6. Ao terminar, registre a mudança no CHANGELOG.md (crie se não existir)
   e sugira uma mensagem de commit no padrão descrito em "Versionamento".
```

## Role Prompt

```
Aja como engenheiro(a) front-end sênior e designer de produto,
especializado em dashboards de observabilidade/monitoramento e em
interfaces mobile-first. Você já trabalhou em ferramentas como Sentry,
Datadog e Grafana e conhece bem os padrões de UX desse domínio (severidade
por cor+ícone, isolamento por serviço/projeto, hierarquia pra triagem sob
estresse). Você é rigoroso(a) com contraste (WCAG AA), com a diferença
entre paleta de marca e paleta semântica de status, e com as regras
específicas de tema escuro (elevação por claridade, nunca preto/branco
puro). Você explica toda decisão de design com o porquê, não só o quê.
```

---

## Contexto do projeto

- **Produto:** LhamaLog — observabilidade/monitoramento de logs, erros e
  ocorrências, com ingestão via SDK, upload manual e executável, análise
  via IA e sugestões de correção.
- **Esta tela:** "Visão Geral" — dashboard mobile-first, tela principal
  pós-login, mostra métricas agregadas (Erros/Alertas/Informações/
  Resolvidas), heatmap de ocorrências por dia, ranking de serviços mais
  impactados, e métricas de performance (latência p95, tempo médio de
  resolução, taxa de resolução).
- **Stack:** HTML + CSS puro + JS vanilla, arquivo único, sem build step,
  sem dependência externa (ícones são SVG inline, sem CDN). Isso é
  proposital — o arquivo precisa abrir direto no navegador sem servidor.
  **Exceção:** a logomarca (llama) é um PNG com fundo transparente
  (`logo-mark-small.png`, ~108×140px, gerado a partir de `logo.png`),
  embutido como `data:image/png;base64,...` diretamente no `<img>` — não
  é um `<link>`/`fetch` externo, então o arquivo continua abrindo sozinho
  sem servidor. Vetorizar isso como SVG inline é trabalho futuro, se
  algum dia sobrar o arquivo `.svg` de origem do cliente.

## Inventário de arquivos

| Arquivo | O que é | Quando editar |
|---|---|---|
| `visao_geral_lhamalog.html` | Versão "de produção" — rola até o fim, sem moldura. É a que vira componente real do app. | Mudança de conteúdo/dado/comportamento real |
| `index.html` | Versão "geral" — une os dois temas num arquivo só, com moldura de celular fixa e botão de alternância claro/escuro (`toggleTheme()`), tema claro como padrão. É a versão canônica pra navegar os dois temas sem abrir dois arquivos. | Mudança visual pra mockup/apresentação, ou qualquer ajuste de token de cor (afeta os dois temas de uma vez) |
| `index_dark.html` | Snapshot fixo em tema escuro (sem toggle visível na intenção de uso, ainda que o botão exista) — útil pra gerar um print estático só do escuro | Mesma coisa, mas quando só o print do tema escuro importa |
| `index_light.html` | Snapshot fixo em tema claro, mesma lógica do `index_dark.html` | Mesma coisa, mas quando só o print do tema claro importa |
| `design.md` | Este arquivo | Sempre que uma decisão de design nova for tomada |
| `CHANGELOG.md` | Histórico de versões (criar na primeira mudança) | Toda entrega |

**Regra:** qualquer variável de cor/espaçamento nova entra nos 3 arquivos
`.html` ao mesmo tempo, ou eles ficam dessincronizados.

---

## Tokens de design (variáveis CSS)

Todas as cores vivem em `:root` (tema claro, padrão) e são sobrescritas em
`.screen[data-theme="dark"]` (tema escuro). Nunca declare uma cor sem
variável correspondente nos dois blocos.

```css
/* estrutura */
--bg               /* fundo da tela */
--card             /* fundo dos cards (mais claro que --bg no escuro = elevação) */
--card-border       /* borda dos cards — tintura azul sutil (rgba do --brand) */
--text-dark / --text-muted / --text-faint   /* hierarquia de texto, nunca 100% branco/preto */

/* marca */
--brand             /* azul principal — usado em: dropdown, aba ativa, ícone de card, link */
--brand-dark / --brand-mid / --brand-darkest / --brand-light / --nav-bg

/* semântico (status — NUNCA usar --brand pra isso) */
--danger / --danger-bg     /* Erro */
--warning / --warning-bg   /* Alerta */
--info / --info-bg         /* Informação — coincide com --brand por design, mas é variável própria */
--success / --success-bg   /* Resolvida / Taxa de resolução */
--teal / --teal-bg         /* Latência (métrica de performance, não status) */

/* heatmap */
--hm-0 a --hm-5     /* escala de intensidade, menos → mais */

/* cenário do mockup (fora do "vidro" do celular) — não é token do produto */
--studio-bg         /* fundo da página em volta da moldura, só existe em index.html/index_dark.html/index_light.html */
```

### Paleta de marca (origem: `paleta-de-cores.jpg` do cliente)

| Token | Hex | Uso |
|---|---|---|
| `#141826` | quase-preto | texto principal (claro), fundo da navbar (claro), fundo base (escuro) |
| `#033473` | azul escuro | acento profundo, sombra de marca |
| `#0C70F2` | azul principal | `--brand` no tema claro — cor de ação/interação |
| `#0D65D9` | azul médio | variação secundária |
| `#F2F2F2` | cinza neutro | `--bg` no tema claro |

---

## Padrões de componente

- **Card genérico** (`.card`): título com ícone (cor `--brand`), dropdown
  opcional (`.dropdown`, sempre com fundo `--brand-light` e texto `--brand`
  — é o único elemento "neutro" que carrega cor de marca de propósito).
- **Metric card** (`.metric`): ícone circular + label + valor grande +
  tendência com sparkline SVG inline (`<polyline>`, cor `currentColor`
  herda da classe semântica do card).
- **Stat card** (`.statcard`): mesma lógica, layout vertical, usado pra
  métricas de performance (latência, tempo de resolução, taxa).
- **Heatmap**: células são `<div>` fixos no HTML (não geradas por JS) —
  proposital, pra edição manual célula a célula. Ver comentário no HTML.
- **Bottom nav** (`.navtabs`): SEMPRE embaixo, nunca no topo (ver
  Princípios #4). Item ativo = pill preenchido com `--brand`.
- **Logo** (`.brand .logo`): `<img>` com a logomarca (llama) em PNG,
  fundo transparente, `height:30px; width:auto`, sem badge/fundo colorido
  atrás (removido de propósito — a marca já é bicolor em azul, um fundo
  `--brand` atrás dela virava azul-sobre-azul e derrubava o contraste).
- **Moldura de celular** (`index.html`/`index_light.html`): `.bezel` +
  `.screen` com `height` fixa + `overflow:hidden`, `.scroll-area` clipando
  o meio, `.topbar` e `.navtabs` com `flex-shrink:0` pra nunca sumirem.

---

## Princípios estabelecidos (não regredir sem perguntar)

1. **Contraste sempre primeiro.** Nenhum texto de dado (número, label)
   pode ficar sobre fundo com contraste insuficiente — foi o motivo de
   trocar o fundo fotográfico original por fundo sólido/CSS.
2. **Tema escuro: elevação por claridade, não por sombra.** Card sempre
   mais claro que o fundo. Nunca preto puro (`--bg` escuro é `#14161c`,
   não `#000`) nem branco puro no texto (`#eceef1`, não `#fff`).
3. **Paleta de marca ≠ paleta semântica.** Vermelho/laranja/verde de
   status nunca migram pra dentro da escala de azul da marca, mesmo que
   o cliente peça "mais azul" — nesse caso, azul entra em elementos de
   interação (dropdown, aba ativa, CTA), não nos cards de Erro/Alerta.
4. **Navegação primária mobile fica embaixo, nunca no topo.** Ergonomia
   de polegar — decisão tomada mesmo contra a referência visual original
   (que tinha nav no topo).
5. **Denormalização de dado só com necessidade de consulta real.** Não
   adicionar campo "por via das dúvidas" — regra vem do modelo de classes
   do backend, mas vale pro front também (não busque/exiba dado que não
   tem consumidor real na tela).
6. **Todo gráfico/número na tela precisa responder: isso vem de
   telemetria (OTel) ou de regra de negócio nossa?** Deixar isso
   implícito confunde a extensão real do produto.

---

## Como testar antes de entregar

Não existe ambiente de browser interativo neste projeto — teste renderizando:

```bash
wkhtmltoimage --width 460 --height 900 index.html preview.png
```

Abra o PNG gerado e confira visualmente antes de considerar a tarefa
concluída. Atenção: `wkhtmltoimage` é um motor antigo e **não suporta
`display:grid` nem `backdrop-filter`** — use `display:flex` com
`flex-wrap:wrap` pra qualquer grade, e não dependa de blur pra contraste
(o fallback de opacidade sólida precisa funcionar sozinho).

---

## Versionamento

```bash
git init   # se ainda não existir
git add .
git commit -m "tipo(escopo): resumo curto"
```

Convenção de commit sugerida: `feat`, `fix`, `style`, `docs`, `refactor`,
seguido do escopo (`mobile`, `dark-theme`, `heatmap`, etc). Exemplo:
`style(dark-theme): corrige proporção da moldura pra tamanho real de celular`.

Toda entrega visual relevante ganha uma linha no `CHANGELOG.md`:

```markdown
## [não lançado]
- style(dark-theme): moldura de celular com proporção real (~1:2.03),
  cabeçalho e navbar fixos, conteúdo do meio cortado como print real.
```

---

## Perguntas em aberto (herdadas de decisões pendentes)

- `sugestao_id` na Notificação: nullable direto ou generalizar pra
  `tipo_referencia` + `referencia_id`? (afeta payload que o front consome)
- Cardinalidade de exibição: quando uma Ocorrência tiver múltiplas
  Sugestões, a tela mostra só a mais recente ou a lista com histórico?
