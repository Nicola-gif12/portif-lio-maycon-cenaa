# Phase 09 — Bridal & Campaign

Implementação local em HTML/CSS, sem dependências novas ou alterações de mídia.

## Curadoria verificada

As fotografias foram inspecionadas visualmente. Os quatro vídeos foram inspecionados
por quadros iniciais e amostras próximas de cinco segundos, com metadados obtidos
via GStreamer. Todos mostram a noiva da série principal; não foi adicionada outra sessão.

| Diretório / arquivo | Dimensões | Formato / duração | Uso |
|---|---|---|---|
| `assets/images/bridal/editorial-01/bridal-editorial-01-01.jpeg` | 1026 × 1532 | JPEG | Retrato dominante e poster de segurança do vídeo |
| `assets/images/bridal/editorial-01/bridal-editorial-01-02.jpeg` | 1025 × 1535 | JPEG | Retrato de fechamento |
| `assets/videos/bridal/editorial-01/bridal-editorial-01-01.MOV` | 1080 × 1920 | H.265 / AAC, 30 fps, 12,261 s | Preservado, fora da composição |
| `assets/videos/bridal/editorial-01/bridal-editorial-01-02.MOV` | 1080 × 1920 | H.265 / AAC, 30 fps, 21,827 s | Preservado, fora da composição |
| `assets/videos/bridal/editorial-01/bridal-editorial-01-03.MOV` | 1080 × 1920 | H.265 / AAC, 30 fps, 30,047 s | Âncora cinematográfica |
| `assets/videos/bridal/editorial-01/bridal-editorial-01-04.MOV` | 1080 × 1920 | H.265 / AAC, 30 fps, 12,967 s | Preservado, fora da composição |
| `assets/images/drop/campaign-01/drop-campaign-01-01.jpeg` | 4284 × 5712 | JPEG | Homem / Presença |
| `assets/images/drop/campaign-01/drop-campaign-01-02.jpeg` | 4284 × 5712 | JPEG | Mulher / Peregrinos |
| `assets/images/drop/campaign-01/drop-campaign-01-03.jpeg` | 1024 × 1536 | JPEG | Produto / moletons |

## Composições

Bridal tem uma abertura creme compacta, filme vertical integral sobre fundo quase
preto e duas fotografias sobre creme. A segunda foto, menor, encerra a sequência
com texto bilíngue discreto. Cada fotografia aparece uma única vez como imagem;
a primeira também serve de poster caso o filme não possa tocar.

Campaign tem abertura em vermelho #700907 e um spread em off-white. O homem ocupa
a coluna dominante; a mulher aparece na segunda coluna com deslocamento vertical.
O produto encerra em outra linha, junto de tipografia vermelha fora da fotografia.
A ordem do DOM e a ordem de leitura são pessoa, pessoa, produto.

A partir de 48rem, os painéis de introdução dividem título e frase em duas colunas.
No mobile, as introduções ficam em uma coluna e as imagens seguem verticalmente,
com escalas diferentes e intervalos compactos. O vídeo mantém 9:16, limitado a
82svh para preservar sua presença sem inviabilizar o limiar de visibilidade.
Não há cortes, filtros, cards ou sobreposição de texto nas fotografias.

Bodoni Moda nos títulos, Playfair Display nas frases e traduções correspondentes,
Inter nos controles e metadados. Inglês principal e português diretamente abaixo,
com atributos de idioma. Paleta existente preservada: creme e navy em Bridal,
vermelho e off-white em Campaign, quase preto no filme.

## Vídeo

Reutiliza `data-editorial-motion` e o observer de `assets/js/script.js`, sem alterações.
Mute inicial, `preload="none"`, playsinline, controle manual acessível e pausa abaixo
 de 50% de visibilidade ou ao ocultar a aba. Movimento reduzido impede início
automático; o usuário ainda pode iniciar manualmente. Sem JS, controles nativos e
link do original permanecem disponíveis.

Não existe fallback H.264/WebM. MOV/H.265 depende do suporte do navegador/sistema.
Em erro, a interface mantém foto da sessão, informa a falha e oferece o original;
essa alternativa não equivale a um vídeo universalmente compatível. Nenhuma
conversão ou mídia alternativa foi criada.

## Validação e limites

- HTML balanceado; IDs únicos; referências ARIA resolvidas; arquivos e dimensões conferidos.
- Uma introdução por categoria; duas fotos Bridal sem duplicação de imagem; três DROP na ordem prevista.
- Os 30 hashes de mídia do manifesto original foram preservados.
- HTML anterior a Bridal e posterior a Campaign idêntico ao estado inicial.
- JavaScript idêntico; sintaxe validada com `node --check`.
- Teste isolado do controlador passou para mute, visibilidade, pausa/reprodução manual,
  movimento reduzido, aba oculta e fallback de erro. Não substitui reprodução real no navegador.
- Nenhum navegador conectado estava disponível. Renderização, fontes, foco, reprodução
  real e ausência de overflow em 375, 430, 768, 1024, 1440 e 1920 px ainda precisam
  de validação visual. CSS usa colunas `minmax(0, …)`, mídia fluida e quebras dedicadas.

Arquivos alterados: `index.html`, `assets/css/style.css` e este relatório.
Header, Hero, Vision, Selected Works, Beauty, Fashion, About, Services, Contact e
Footer preservados. Nenhuma publicação realizada.
