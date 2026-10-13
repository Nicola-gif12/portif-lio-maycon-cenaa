# Maycon-Cenaa

## Estado atual — Fases 18 e 19

Portfólio estático em HTML, CSS e JavaScript, sem framework, `package.json` ou
dependências de produção. Identidade, composições e mídias aprovadas preservadas.
O empacotamento em Python usa apenas a biblioteca padrão e publica somente os
arquivos públicos em `dist/`.

- Build: `python3 scripts/build_static.py`. A saída precisa ser uma pasta nova;
  para repetir localmente, use `--output /tmp/maycon-build-02` (ou outro nome livre).
- Vercel: **Other**, build acima, output **dist**, install **true**, root **.**,
  mantendo `index.html` na raiz do repositório. Não é necessário `vercel.json`.
- Sem URL de produção confirmada: não definir `SITE_URL` ainda. Após obter a URL
  estável, defini-la no ambiente Production da Vercel e fazer novo deploy; o build
  gera canonical, URLs sociais, sitemap e sua referência em robots.txt.
- Favicon original `assets/images/brand/favicon/FaviCon-MC.png` configurado,
  acompanhado de versões PNG de 16, 32 e 48 px com o mesmo desenho.
- Verificações: `python3 tests/build.test.py`, `python3 tests/audit.py` (Pillow
  necessário apenas para esta auditoria), `node tests/video.test.cjs`,
  `node tests/reveal.test.cjs` e `node --check assets/js/script.js`.
- Prévia do pacote: `python3 -m http.server 8000 --directory dist`, depois
  `http://localhost:8000`.
- [Preparação e roteiro de publicação — Fase 19](docs/phase-19.md).
  [Auditoria responsiva — Fase 17](docs/phase-17.md).
- Nenhum commit, push ou deploy realizado. O GitHub informado estava vazio na
  conferência; a pasta local não contém metadados Git válidos. Usar um clone novo
  conforme o roteiro. Testes visuais, dispositivos reais, codecs e respostas HTTP
  da Vercel continuam pendentes.

## Histórico da Fase 08

O conteúdo abaixo registra o estado daquela fase; não descreve o site atual.

Fase 08 — hierarquia do portfólio refinada e vermelho oficial integrado.
HTML, CSS e JavaScript nativos, sem build ou dependências adicionais.

## Estado na Fase 08

- **Hero aprovado preservado:** `assets/images/hero/hero-04.png`, proporção original
  941 × 1672, foto à esquerda e tipografia à direita sobre navy. Header, colunas,
  regras responsivas e animação continuam iguais. Apenas a assinatura ganhou a
  tradução “Presença emoldurada.” e metadados receberam identificação de idioma.
- **Manifesto:** menos espaço vazio, duas frases bilíngues em composição assimétrica.
- **Selected Works:** abertura navy com índice, regras finas, título Bodoni e
  “Trabalhos selecionados” imediatamente abaixo, na mesma família tipográfica.
- **Aberturas:** um painel compacto por categoria, com fotografia integral e
  título bilíngue. Beauty em off-white, Fashion em navy, Bridal em preto e Campaign
  em vermelho oficial. As quatro imagens representativas foram preservadas.
- **Beauty:** três spreads independentes, sem misturar modelos. Composições e
  espaçamento substituem o antigo empilhamento de imagens isoladas.
- **Fashion:** abertura única navy e fotografia da faixa horizontal de luz integral,
  seguida de relações gráficas entre look preto, retratos sentados e motion.
- **Bridal e Campaign:** só prévias. About, Services, Contact e footer não foram
  desenvolvidos nesta etapa.

## Refinamento da hierarquia — Fase 08

- As antigas prévias de Beauty/Fashion e seus segundos títulos foram fundidos
  em uma única abertura por categoria. Não há mais dois anúncios consecutivos.
- `.category-intro` padroniza escala, padding, tipografia e imagem sem obrigar
  todas as categorias à mesma cor. Fotografias têm largura entre 5,5 e 10,5 rem,
  mantendo proporção integral; no mobile, título e foto continuam em colunas
  com texto fluido. Sem altura fixa nem abertura de tela inteira.
- Retirados números decorativos dos títulos de categoria. Beauty mantém apenas
  identificadores funcionais de ensaio: `Series 01`, `Series 02`, `Series 03`.
- Os IDs antigos `work-beauty`, `work-fashion`, `beauty`, `fashion` e os IDs de
  títulos continuam presentes. Índice, links externos para âncoras e transições
  internas mantêm seus destinos. Nenhuma mídia foi retirada da página ou do disco.
- Beauty: abertura → três composições existentes → transição para Fashion.
- Fashion: abertura → faixa de luz e composições existentes → transição para Bridal.
- Bridal e Campaign: um painel e uma foto representativa cada; sem galerias novas.

Verificação da fase: quatro aberturas e quatro títulos únicos, IDs preservados,
HTML balanceado, mesmas ocorrências de mídia, mesmas composições internas de Beauty,
mesmos atributos de vídeo e JavaScript, hashes das 30 mídias intactos. Testes da
lógica compartilhada de vídeo passaram. Hero, Header e Manifesto não foram redesenhados.
Não havia navegador conectado para inspecionar o estado renderizado; a conferência
visual de dimensões e overflow permanece pendente.

## Inglês e português

Inglês permanece dominante; português aparece logo abaixo do enunciado, com
`lang="pt-BR"`. Os textos ingleses têm `lang="en"`, mantendo o idioma geral
`pt-BR` para controles, alt e mensagens. `.editorial-translation` compartilha a
família tipográfica do original, com tamanho menor, peso regular e espaçamento
próprio. Não há títulos duplicados para cada idioma.

Pares principais:

| English | Português |
|---|---|
| More than images. | Mais do que imagens. |
| Presence, framed. | Presença emoldurada. |
| Beauty, fashion and stories shaped through an authorial eye. | Beleza, moda e histórias sob um olhar autoral. |
| Selected Works | Trabalhos selecionados |
| Portraiture shaped by light, texture and presence. | Retratos moldados por luz, textura e presença. |
| Light, form and attitude. | Luz, forma e atitude. |

Os títulos de categoria recebem diretamente as traduções Beleza, Moda, Noivas e
Campanha. Legendas redundantes foram retiradas das aberturas. Não foi criada copy
para seções futuras.

## Sistema de composição

Tokens locais de `.work` controlam padding, intervalos e pausas dos spreads.
As fotos usam dimensões intrínsecas e `height: auto`, sem filtros ou recortes.
As áreas claras usam texto navy; painéis escuros usam off-white. Regras e índices
estabelecem relações entre imagens, sem cartões, bordas arredondadas ou carrossel.

### Beauty

| Capítulo | Fotos | Vídeos | Composição desktop |
|---|---:|---:|---|
| `model-01` | 2 | 1 | Retrato dominante à esquerda, complementar e motion em sequência à direita, sobre navy |
| `model-02` | 3 | 0 | Foto âncora e duas imagens complementares de escalas diferentes, sobre creme |
| `model-03` | 3 | 1 | Primeiro par de retratos, depois motion e retrato frontal final, com moldura editorial discreta |

Fotos continuam em `assets/images/beauty/model-0N/`; vídeos em
`assets/videos/beauty/model-01/` e `model-03/`. No capítulo 01, a fotografia
complementar vem antes do vídeo no DOM, acompanhando a nova composição.
O capítulo 03 continua terminando em `beauty-model-03-03.jpeg`.

### Fashion

As cinco fotografias e os dois vídeos permanecem nos caminhos
`assets/images/fashion/editorial-01/` e `assets/videos/fashion/editorial-01/`.
`fashion-editorial-01-03.jpeg` continua sendo a âncora: a faixa de luz e todo o
quadro 1290 × 1613 são preservados. O título foi consolidado no painel único navy; a fotografia da faixa de luz
continua no enquadramento editorial creme, sem repetir o título da categoria. O conjunto de look preto e o fechamento usam navy; motion e fotos sentadas
se relacionam por alinhamento e escala. Mantido um único reveal lateral de 24 px.

No mobile, os spreads passam a uma coluna sem perder seus agrupamentos, fundos
ou recuos: complementares variam entre 74% e 94% da largura útil. Vídeos permanecem
limitados pela altura da tela. Pausas entre imagens são menores que as pausas
entre ensaios; não há uma sequência de fotos todas do mesmo tamanho.

## Paleta e identidade pendente

- Near-black: `#050505`.
- Navy: `#101C39`.
- Muted blue: `#303A53`.
- Warm off-white: `#EAE3D7`.
- Cream: `#F1EEE8`.

**Vermelho oficial aproximado:** `#700907`, definido em `--color-brand-red`.
Aplicado como fundo do painel Campaign, título de Beauty sobre off-white e regras
editoriais no portfólio. Texto creme sobre vermelho: contraste calculado 10,48:1;
vermelho sobre off-white: 9,51:1. Sem filtros sobre as fotos. Header, Hero e
Manifesto mantêm suas cores anteriores; `--color-editorial-accent` continua creme.

**Padrão orgânico:** `fundohero.png` continua ausente do projeto e do Downloads
acessível. Não foi gerado substituto nem referência quebrada. O painel opcional
do Hero continua oculto, preservando a composição aprovada. Após receber e
inspecionar o arquivo, o destino previsto é `assets/images/brand/fundohero.png`;
a ativação usa estas propriedades existentes de `.hero`:

```css
--hero-pattern-image: url("../images/brand/fundohero.png");
--hero-pattern-display: block;
```

Sua reutilização fora do Hero depende da inspeção do original e não foi simulada.

## Reprodução, acessibilidade e performance

`assets/js/script.js` permanece intacto. Fotos abaixo da dobra mantêm lazy loading;
Hero tem prioridade alta. Os quatro vídeos mantêm `preload="none"`, mute,
playsinline, loop, reprodução quando pelo menos 50% visível, pausa fora da tela
ou em aba oculta, controle manual e preferência de movimento reduzido. Posters
são atribuídos ao entrar na tela. Sem JS, controles nativos permanecem disponíveis.
Rejeições de autoplay e erros de reprodução têm tratamento e link para o original.

Os vídeos são QuickTime/H.265 e dependem de suporte do navegador. Originais grandes
continuam intactos; lazy loading adia downloads, mas não diminui seu tamanho.
Sem compressão, cópias de mídia, novas fontes ou bibliotecas nesta fase.

## Validação

Verificados: estrutura HTML balanceada, idiomas das traduções, headings e âncoras,
mesmos assets e atributos de vídeo, dimensões/lazy loading, contagens de Beauty,
retrato frontal final, preservação do CSS do Hero, JavaScript e seções futuras.
Os hashes SHA-256 das 30 mídias coincidem com o manifesto. Os testes isolados de
vídeo passaram para mute, visibilidade, pausa manual, movimento reduzido, aba
oculta, autoplay bloqueado, falha de codec e resolução tardia de `play()`.

Sem navegador conectado, renderização, carregamento das fontes, foco e overflow
precisam de conferência visual nas larguras 375, 430, 768, 1024, 1440 e 1920 px.
Cálculos de grid não substituem a validação no navegador.

Para visualizar, abra `index.html` ou execute `python3 -m http.server 8000` na raiz
e acesse `http://localhost:8000`. Não há build ou instalação de dependências.

## Estrutura

```text
Maycon-Cenaa/
├── assets/
│   ├── css/style.css
│   ├── js/script.js
│   ├── icons/
│   ├── images/
│   │   ├── brand/
│   │   ├── hero/
│   │   ├── about/
│   │   ├── beauty/
│   │   │   ├── model-01/
│   │   │   ├── model-02/
│   │   │   └── model-03/
│   │   ├── fashion/editorial-01/
│   │   ├── bridal/editorial-01/
│   │   └── drop/campaign-01/
│   └── videos/
│       ├── beauty/
│       │   ├── model-01/
│       │   └── model-03/
│       ├── fashion/editorial-01/
│       └── bridal/editorial-01/
├── docs/
│   ├── organizacao-assets.md
│   └── asset-manifest.json
├── index.html
├── README.md
└── .gitignore
```

## Mídias e originais

- Originais: `/home/nicolas-gouveia/Imagens/Fotos-Maycon-Cena`.
- Assets existentes: 22 imagens e 8 vídeos, sem alterações visuais ou novas cópias nesta limpeza.
- `brand/` aguarda `fundohero.png`; `about/` e `icons/` continuam reservadas.
- A foto isolada da segunda noiva deve ficar somente nos originais, fora dos assets.
  Ela não foi localizada na pasta de origem nesta conferência, conforme também registrado na organização anterior.
- O vídeo de bastidores `IMG_0263.MOV` permanece somente na origem.
- Há um vídeo idêntico já organizado em Beauty e Fashion. A distribuição anterior foi preservada.
- O mapa de origem/destino e as verificações de integridade estão em
  [docs/organizacao-assets.md](docs/organizacao-assets.md) e
  [docs/asset-manifest.json](docs/asset-manifest.json).

Não houve publicação do site. A curadoria das demais seções fica para as próximas fases.
