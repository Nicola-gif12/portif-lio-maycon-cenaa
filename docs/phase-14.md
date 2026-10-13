# Fase 14 — Refinamento de composição editorial

## A — Vision

Padding vertical reduzido de 4–8rem para 2,5–5rem, com régua superior conectando
rótulo e conteúdo. Desktop a partir de 64rem: frases em duas colunas relacionadas,
segunda frase discretamente deslocada e separada por filete. Parágrafo de apoio
alinhado à primeira frase. Em tablet/mobile, sequência vertical com divisória e
recuo moderado no tablet. Texto, traduções e fontes permanecem iguais.

## B — Beauty

Abertura monumental da primeira série preservada. Intervalos entre séries reduzidos
para 2–4rem. Na segunda série, retrato principal ganha proporção dominante e a
sequência complementar ocupa cinco colunas com menor recuo superior. Na terceira,
retrato de abertura ocupa seis colunas e imagens secundárias têm largura reduzida
seletivamente. No mobile, imagens de resposta/fechamento foram reduzidas para
82%/86%, mantendo assimetria e proporções naturais. Nenhum ensaio foi misturado,
nenhuma mídia foi retirada e a ordem permanece igual.

## C — Fashion

Fotografia da faixa de luz segue proeminente, ocupando sete de dez partes do grid
em vez de oito. Nota editorial recebe menor recuo. Composições de cadeira e detalhe
aproximam a escala de foto e vídeo, com fotos secundárias menores. Intervalos entre
composições passam de 2rem para 1,5rem. Foto principal de gesto/spotlight preservada.
No mobile, retratos secundários usam 84% e 88% da largura; nada foi recortado.

## D — Bridal

Introdução preservada. No desktop a partir de 64rem, vídeo e spread fotográfico
ocupam o mesmo conjunto assimétrico (5:7), com abertura em toda a largura. O filme
recebe fundo navy contido e as duas fotos permanecem sobre creme, alinhadas em
escalas distintas com deslocamento de fechamento. Isso substitui a faixa preta
larga com vídeo centralizado isolado. No tablet/mobile, a sequência continua
vertical e o painel navy recebe bordas creme conectando abertura e fotografias.

Vídeo conserva proporção 9:16, limite de 82svh, fontes, controles e comportamento.
A ordem do HTML segue introdução → vídeo → retrato → fechamento.

## E — Responsividade

Reutilizados os breakpoints de 48rem e 64rem. Colunas `minmax(0, …)`, larguras
relativas e altura automática preservam proporções. Não há altura fixa para as
fotografias nem mudanças em object-fit. Stagger/reveal existentes não foram alterados.
Desktop/tablet/mobile receberam regras específicas; renderização ainda não verificada.

## F — Arquivos modificados

- `assets/css/style.css`: somente bloco adicional com seletores restritos a
  `.manifesto`, `.beauty-editorial`, `.fashion-editorial` e `.bridal-editorial`.
- `docs/phase-14.md`: este relatório.

**Services permaneceu completamente inalterado:** HTML e JavaScript inteiros são
idênticos ao início da fase; todo CSS anterior foi preservado byte a byte. Nenhum
seletor adicionado alcança Services. Seus estilos, interações e responsividade não
foram modificados. Hero, Header, Selected Works, Campaign, About, Contact e Footer
também não receberam alterações.

## G — Testes executados

- `node tests/reveal.test.cjs`: 5 testes aprovados.
- `node tests/video.test.cjs`: 12 testes aprovados, incluindo áudio e volume.
- `python3 tests/audit.py`: aprovado; HTML, dimensões, idiomas/ARIA referenciados,
  âncoras, 22 imagens, cinco vídeos e 30 hashes de mídia originais verificados.
- Comparação de arquivos: HTML e JavaScript idênticos; CSS anterior preservado;
  seletores adicionados restritos às quatro seções autorizadas.
- `cua.getState()`: nenhum navegador conectado.

## H — Pendências

Conferência visual em desktop, laptop, tablet e mobile, incluindo equilíbrio,
quebras de texto, overflow, duração percebida do scroll e disposição dos controles.
Os testes de lógica não substituem reprodução real em navegador. Não se declara
validação visual nem ausência comprovada de overflow. MOV/H.265 mantém a limitação
de compatibilidade já documentada. Sem nova mídia, dependência ou publicação.
