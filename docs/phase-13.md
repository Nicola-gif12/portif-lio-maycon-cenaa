# Fase 13 — Auditoria completa e refinamento

Auditoria técnica concluída; validação visual não executada por ausência de navegador
conectado. Não houve redesign, mudança de ordem, alteração de fotografias ou publicação.

## A — Problemas encontrados

1. Durante `play()` pendente, o botão consultava somente `video.paused`: um clique
   não cancelava o pedido de reprodução enquanto o vídeo ainda carregava.
2. Um erro de mídia ocorrido antes da instalação do listener não acionava o fallback.
3. Nomes ingleses no índice de categorias e links de próximo projeto herdavam pt-BR.
4. Regra antiga de padding do Footer inteiramente sobrescrita pela implementação final.
5. Open Graph textual ausente. README ainda apresentava a fase 08 como estado atual.
6. Todos os oito vídeos são QuickTime/H.265, sem alternativa compatível universal.
7. Há imagens grandes: a maior referenciada tem 10.210.890 bytes. Isso representa
   oportunidade de otimização futura, não um tempo de carregamento medido.

## B — Correções aplicadas

- O botão considera intenção de reprodução pendente e pode cancelá-la. O texto
  indica pausa durante carregamento e retorna a reprodução quando cancelado.
- O fallback trata também `video.error` já existente na inicialização.
- Adicionados `lang="en"` nos seis pontos de navegação afetados.
- Removida a regra obsoleta de Footer; resultado visual esperado permanece igual.
- Open Graph de título, descrição, tipo, nome e locale com dados reais. Sem domínio
  ou imagem social inventados.
- README atualizado com estado atual, comandos e indicação explícita do histórico.
- Adicionados checks reproduzíveis de estrutura/mídia e regressão do controlador.

## C — Consistência visual e revisão das seções

Inspeção do HTML, CSS, tokens e comportamento implementado; não de renderização.

| Seção | Resultado da inspeção |
|---|---|
| Header | Âncoras válidas, links com alvo mínimo de 44px e foco global; navegação aberta que quebra linhas. Não existe menu recolhível nem estado ativo. |
| Hero | Foto aprovada, dimensões originais, carregamento prioritário e composição preservados. |
| Vision | Frases principais e traduções conectadas; hierarquia h2 preservada. |
| Selected Works | Índice válido; idioma corrigido nos nomes ingleses. |
| Beauty | Três sessões separadas, introdução única, imagens íntegras e vídeos com controle. |
| Fashion | Introdução única e sequência mantida; proporções intrínsecas preservadas. |
| Bridal | Filme principal e duas fotografias, uma introdução; poster da mesma sessão. |
| Campaign | Pessoa–pessoa–produto preservado, sem cards; vermelho e creme mantidos. |
| About | Foto em `assets/images/about/about.png`, integral; biografias em terceira pessoa. |
| Services | Quatro disclosures nativos, idiomas, toque/teclado via summary e foco visível. |
| Contact | Frase aprovada, fundo vermelho, contatos oficiais e aviso de nova aba. |
| Footer | Navegação válida, copyright 2026 e retorno a `#hero`; regra redundante removida. |

Paleta e papéis de Bodoni Moda, Playfair Display e Inter mantidos. Sem ajustes
especulativos de margens, escala ou alinhamento. As repetições de fotos de Beauty
model-03-02 e Fashion editorial-01-02 ocorrem entre introdução e conteúdo aprovado;
não foram removidas nem geradas novas cópias.

## D — Responsividade

Breakpoints existentes de 48rem e 64rem, tipografia fluida, grades com colunas
flexíveis e imagens sem recorte foram revisados no código. Sem nova media query.
A correção do vídeo melhora a interação em conexões lentas, inclusive mobile.
Não foi confirmado defeito visual que justificasse alterar as composições.

**Pendentes de inspeção real:** 1920, 1440, 1280, 1024, 768, 430, 390 e 360 px.
Em cada largura: fontes carregadas, overflow do documento e de cada seção,
zoom/texto ampliado, Hero, escala das fotos, Services aberto, contato e Footer.
Não se afirma ausência de overflow com base somente no código.

## E — Mídia

- 22 elementos img, todos com alt e dimensões que coincidem com os arquivos.
- Hero eager/high priority; demais imagens lazy. Cinco vídeos na página com
  `preload="none"`, mute, playsinline, controle manual e poster da sessão.
- Caminhos de fontes de vídeo, posters e links de fallback existentes.
- 30 arquivos do manifesto original com SHA-256 intacto. Referências de mídia da
  página idênticas ao início desta fase. About e gráfico adicional preservados.
- GStreamer identificou os oito MOV como H.265 Main Profile, 1080 × 1920.
  Durações: Beauty 16,533 e 10,566 s; Fashion 17,400 e 16,533 s;
  Bridal 12,261 / 21,827 / 30,047 / 12,967 s.
- O manifesto registra cópia idêntica de um vídeo entre Beauty e Fashion. Mantida
  para preservar os caminhos e a curadoria existentes.
- Não houve conversão, recompressão ou exclusão. Fallback é fotografia e link ao
  original, não uma versão de vídeo com codec alternativo.

## F — Acessibilidade

Idiomas de navegação corrigidos; heading único h1 e progressão de headings,
IDs/ARIA, textos alternativos e âncoras verificados. Botão de vídeo agora permite
cancelar carregamento e mantém nome coerente. Foco, skip link e controles nativos
preservados. Movimento reduzido continua impedindo autoplay e animações de entrada.
A preferência ainda permite reprodução manual solicitada pelo visitante.
Contrastes já calculados: off-white/vermelho 9,51:1; off-white/navy 13,20:1;
off-white/quase preto 15,98:1. Testes com leitor de tela/teclado real pendentes.

## G — Performance

Removida uma regra morta, sem alterações visuais. Sem dependências de runtime,
listeners novos, bibliotecas ou preload adicional. Um observer compartilhado para
vídeos e outro para reveals; sem handler de scroll contínuo. Dimensões intrínsecas
e lazy loading preservados. Não foram medidos LCP/CLS/INP nem tráfego em navegador;
não se declara ganho percentual. Imagens responsivas derivadas exigem medição e
validação visual antes de eventual adoção.

## H — Testes executados

| Comando / ferramenta | Resultado |
|---|---|
| `python3 tests/audit.py` | PASS: estrutura balanceada, headings, IDs, âncoras, ARIA, dimensões, loading, URLs e 30 hashes. Usa Pillow já disponível. |
| `node tests/video.test.cjs` | 6 testes aprovados: visibilidade/mute/pausa persistente/aba oculta; movimento reduzido/manual; cancelamento pendente; erro de codec; erro anterior à inicialização; retry após bloqueio de autoplay. |
| `node --check assets/js/script.js` | Sintaxe válida. |
| `gst-discoverer-1.0 assets/videos/beauty/*/*.MOV assets/videos/fashion/*/*.MOV assets/videos/bridal/*/*.MOV` | Oito arquivos reconhecidos com metadados legíveis. Não equivale a reprodução no navegador. |
| `cua.getState()` | Nenhum navegador disponível; testes visuais não executados. |

Os testes de cancelamento e erro preexistente falharam antes das correções e
passaram depois. O runner `node --test tests/video.test.cjs` inicialmente encerrou
sem diagnóstico detalhado; execução direta do mesmo arquivo via Node forneceu
os resultados e é o comando documentado. Não há package.json, build, lint ou suite
anterior configurados; nenhum deles foi alegado como executado.

## I — Pendências antes da publicação

- Executar a matriz visual e testar foco, disclosures, âncoras, console, fontes,
  carregamento de mídia e abertura efetiva dos links externos.
- Verificar MOV/H.265 nos navegadores/dispositivos de destino; não há H.264/WebM.
- Medir performance de imagens grandes em rede móvel antes de otimizar derivados.
- Informar URL de produção para canonical e og:url e URL absoluta de imagem social
  aprovada. Definir favicon aprovado. Esses recursos não foram inventados.
- Open Graph textual foi adicionado; compartilhamento social completo permanece
  dependente dos itens acima. Title, description, viewport e lang já existem.
- Nenhuma mensagem enviada a Instagram/WhatsApp e nenhuma publicação realizada.

## J — Arquivos modificados

- `index.html`: idiomas e Open Graph textual.
- `assets/js/script.js`: cancelamento pendente e fallback de erro inicial.
- `assets/css/style.css`: remoção da regra de Footer sobrescrita.
- `README.md`: estado atual e comandos de verificação.
- `tests/audit.py`: novo check estático.
- `tests/video.test.cjs`: nova regressão do controlador.
- `docs/phase-13.md`: este relatório.
