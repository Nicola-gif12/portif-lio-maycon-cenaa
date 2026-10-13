# Fase 17 — Auditoria responsiva e de experiência

Auditoria local de 12/10/2026. Projeto estático: `index.html`, uma folha CSS e
um script JavaScript, sem framework, package.json, build ou lint configurados.
Ferramentas executadas: Node 24.19.0, Python 3.14.4/Pillow e GStreamer Discoverer.
Nenhuma dependência adicionada. Nenhuma publicação realizada.

## A. Problemas responsivos encontrados

Não foi confirmado um defeito de layout por renderização. `cua.getState()` retornou
zero navegadores conectados. A presença de um executável Firefox local não foi
tratada como teste de navegador realizado.

CSS revisado: breakpoints principais em 48rem e 64rem, grids com `minmax(0, …)`,
mídias com altura automática e proporções intrínsecas, navegação com quebra de
linha e tipografia fluida. Isso não comprova ausência de overflow ou sobreposição.
O CSS inteiro permaneceu idêntico ao início da auditoria.

| Larguras solicitadas | Verificação visual |
| --- | --- |
| 360, 375, 390, 430 px | Pendente |
| 768, 1024 px | Pendente |
| 1280, 1440, 1920 px | Pendente |

Também precisam de conferência as transições 767/768 e 1023/1024 px, orientação
horizontal e texto ampliado. Não foram feitos ajustes especulativos nos grids.

## B. Melhorias para mobile

- Corrigida a perda do ícone e do rótulo acessível de play/pause após bloqueio de
  autoplay. A interface agora permanece disponível para a tentativa manual.
- Hero ganhou uma fonte WebP **sem perdas**: 2.232.712 → 1.475.182 bytes,
  redução de 33,93% (757.530 bytes). O PNG permanece como fallback no mesmo
  elemento `img`, dentro de `picture`. Dimensões 941 × 1672, pixels RGB,
  perfil de cor, alt, prioridade, loading e animação foram preservados.
- Áreas de toque de 44px dos controles e regras existentes de quebra de linha
  foram inspecionadas no CSS. Toque e tamanho efetivamente renderizado não foram
  testados em dispositivo.

## C. Navegação

As âncoras locais, IDs e referências ARIA passaram na auditoria. O cabeçalho usa
links sempre disponíveis; não existe menu modal, botão de abrir/fechar ou bloqueio
de scroll a testar. Skip link aponta para `main` com `tabindex="-1"`; retorno ao
topo aponta para `#hero`.

Links e texto de Contact conferidos no HTML:

- Instagram: `https://www.instagram.com/mayconcenaa/` — `@mayconcenaa`.
- WhatsApp: `https://wa.me/5531995283510` — `+55 (31) 99528-3510`.

Ambos preservam `target="_blank"`, `noopener noreferrer` e aviso de nova aba.
Não foram abertos destinos externos nem enviadas mensagens. Scroll até as
âncoras e navegação real com teclado permanecem pendentes.

## D. Vídeos

**Defeito demonstrado:** o tratamento de rejeição de `video.play()` chamava
`syncPlaybackControl()` e depois atribuía `button.textContent`. Essa segunda
atribuição removia os filhos SVG/span, deixando o rótulo guardado no estado
desconectado do botão. A tentativa manual podia tocar, mas o controle já tinha
perdido seu ícone e seu nome deixava de acompanhar a ação.

Foi removida somente essa atribuição. O mock de teste agora representa a remoção
dos filhos por `textContent`; a nova regressão falhou antes e passou depois da
correção. Arquitetura, observers, política de autoplay, posição dos vídeos e
aparência dos controles não foram alterados.

Os 14 testes de vídeo cobrem play/pause, bloqueio e nova tentativa, cancelamento
pendente, áudio exclusivo, volume zero, volume controlado pelo dispositivo,
pausa fora da tela/aba oculta, retorno automático mudo e fallback de erro.

GStreamer identificou os cinco arquivos usados: QuickTime/MOV, H.265, 1080 × 1920,
30 fps e áudio AAC. Isso é inspeção de metadados, **não reprodução no navegador**.
Não foram alterados arquivos, codecs, posters ou `preload="none"`.

## E. Animações de entrada

Cinco testes passaram: limiar de entrada, remoção da observação após revelar,
ausência de repetição, conteúdo visível após saída, movimento reduzido e fallback
sem APIs. Código de reveal preservado; sem novos handlers de scroll, timers ou
bibliotecas. Fluidez e duração percebida não foram medidas.

## F. Acessibilidade

Estrutura HTML, headings, IDs, âncoras, alt, dimensões, idiomas e associações de
controles revisados. O teste estático verifica referências ARIA e hierarquia de
headings. Botões e ranges continuam nativos, com nomes acessíveis, foco visível
e estado de áudio em `aria-pressed`. A correção de autoplay preserva o rótulo
interno anexado ao botão durante bloqueio, reprodução e pausa.

Cálculo dos pares de cores usados (não uma auditoria automatizada de toda a tela):

| Texto / fundo | Contraste calculado |
| --- | --- |
| Off-white / preto | 15,98:1 |
| Off-white / navy | 13,20:1 |
| Navy / creme | 14,54:1 |
| Off-white / vinho | 9,51:1 |
| Texto secundário / preto | 9,54:1 |
| Controles em hover, 65% de opacidade, sobre navy / creme | 6,25:1 / 5,00:1 |

Leitor de tela, percurso de Tab, contraste efetivamente composto e zoom não
foram testados em navegador. Não se declara conformidade integral.

**Services não foi modificado.** Seus quatro `details/summary`, descrições,
estilos e comportamento nativo permanecem iguais. Nenhum defeito foi demonstrado
na inspeção estática; abrir/fechar com teclado e toque ainda requer teste real.

## G. Performance

- 22 elementos `img` referenciam 20 arquivos únicos, somando 89.740.663 bytes nos
  originais. Duas repetições são os usos já existentes em introduções/conteúdo.
  Esse total não é uma medição de transferência inicial; as imagens abaixo da
  abertura usam lazy loading.
- A maior imagem tem 10.210.890 bytes e 4000 × 6000 px. Permanecem candidatas a
  derivados responsivos após conferir a nitidez e a seleção por viewport/DPR.
  Não foram recomprimidas com perdas sem essa validação.
- A otimização do Hero reduz bytes da primeira fotografia sem perda de pixels.
  Não se atribui ganho de LCP/CLS/INP: essas métricas não foram medidas.
- Fontes externas mantêm preconnect, `display=swap` e fallbacks; não foram
  adicionadas fontes, requisições de textura ou dependências.
- JavaScript tem 7.543 bytes e usa observers compartilhados, sem listener contínuo
  de scroll. Stylesheet tem 52.249 bytes. Regras históricas sem uso, como as de
  `.bridal-cinema`, não foram removidas sem evidência de um problema de performance.

## H. Arquivos modificados

- `assets/js/script.js`: remoção de uma linha que destruía o conteúdo do botão.
- `tests/video.test.cjs`: mock fiel à substituição de filhos e regressão do erro.
- `index.html`: somente wrapper `picture` e fonte WebP do Hero.
- `assets/images/hero/hero-04.lossless.webp`: novo derivado sem perdas.
- `tests/audit.py`: validação de caminhos e tipos MIME das fontes de `picture`.
- `docs/phase-17.md`: este relatório.

Comparação com snapshot inicial confirmou CSS idêntico, HTML idêntico fora do
wrapper do Hero, todos os atributos `img/video` preservados e todos os arquivos
originais de mídia intactos. Bridal e Vision não receberam alterações.

## I. Testes executados

| Verificação | Resultado |
| --- | --- |
| `node tests/video.test.cjs`, antes da correção | 13 passaram; nova regressão falhou |
| `node tests/video.test.cjs`, após a correção | 14 passaram |
| `node tests/reveal.test.cjs` | 5 passaram |
| `node --check assets/js/script.js` | Sintaxe válida |
| `python3 tests/audit.py` | Passou; 22 imagens, 5 vídeos, 1 fonte picture e 30 hashes do manifesto |
| Pillow/ImageChops, comparação do Hero | Dimensões, pixels RGB e perfil de cor iguais |
| Comparação de snapshot e hashes | Escopo e originais preservados |
| `gst-discoverer-1.0`, cinco vídeos em uso | Metadados reconhecidos |
| `cua.getState()` | Nenhum navegador conectado |

Não existem comandos de build/lint configurados. Não foram alegados como feitos.

## J. Pendências

- Executar a matriz de larguras acima: overflow, quebras de fonte, grids,
  alinhamento, captions e controles, incluindo carregamento lento de fontes.
- Testar Chrome, Firefox, Safari e Edge; nenhum recebeu teste de navegação real.
- Conferir MOV/H.265, bloqueio de autoplay, fallback de erro, mute/volume,
  troca de aba e rolagem nos dispositivos de destino.
- Validar teclado, leitor de tela, zoom e toque, incluindo Services e Contact.
- Medir console, rede, LCP/CLS/INP e seleção do WebP; decidir os derivados das
  fotografias grandes com evidência visual.

A auditoria estática e os testes de lógica estão concluídos. Prontidão visual e
compatibilidade entre navegadores dependem das verificações manuais descritas.
