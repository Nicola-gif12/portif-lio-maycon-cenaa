# Fase 13.2 — Entradas editoriais ao rolar

## Sistema encontrado

O Hero já tinha animações próprias de entrada. Um IntersectionObserver animava
filhos `.reveal-part` de grupos `data-reveal`, com threshold zero e stagger de
100ms no segundo filho. Fashion tinha uma entrada lateral específica. Services
já animava a descrição quando o usuário abria a linha. Vídeos usavam um observer
separado, com áudio e volume da fase 13.1.

## Refinamento

O mesmo sistema de reveal foi ampliado para observar os elementos individualmente,
com um único observer, threshold 0,1 e margem inferior de -4%. Observar a foto
individual evita disparar uma sequência inteira quando apenas o início do grupo
está na tela. Alvos vistos são registrados, desobservados e nunca reiniciados.

- Fade-up: 750ms; 24px no desktop e 14px no mobile.
- Imagens: 850ms; 16px no desktop e 10px no mobile, apenas opacity/translateY.
- Texto de apoio selecionado: 650ms de fade sem deslocamento.
- Services: 650ms e 12px/8px; o disclosure existente continua independente.
- Stagger: 100–200ms para partes de texto relacionadas e 100ms em fotos
  complementares selecionadas. Sem delay no mobile. Sem sequência global entre ensaios.

Removida a animação lateral de Fashion para não competir com o reveal de imagem.
Nenhuma escala, máscara, corte ou propriedade de layout animada. As animações usam
fill-mode backwards: ao concluir, voltam ao estado CSS normal, sem transform persistente.

## Escopo

Vision, Selected Works, aberturas de categoria, fotografias de Beauty/Fashion/
Bridal/Campaign, About, introdução e linhas de Services e frase de Contact.
O Hero mantém sua animação aprovada. Figuras com vídeos não recebem reveal.
O controlador e observer de vídeo/áudio estão idênticos à fase anterior.

## Acessibilidade e performance

O CSS normal nunca esconde o conteúdo. Sem JavaScript ou APIs compatíveis, todo
conteúdo permanece visível. O efeito inicia quando o alvo cruza o limiar, sem uma
classe global que deixe a página invisível enquanto aguarda JavaScript.

Movimento reduzido elimina as entradas e cancela as que estiverem em andamento.
Desativar essa preferência depois não reinicia entradas dispensadas anteriormente.
Elementos com foco interno não animam, mantendo controles imediatamente visíveis.
Nada recebe aria-hidden ou alteração de navegação/foco.

Um observer de reveal é reutilizado inclusive em mudanças de preferência. Sem
listeners contínuos de scroll, bibliotecas, timers ou preload. Somente opacity e
transform; proporções e ordem das mídias não mudaram.

## Testes realizados

- `node tests/reveal.test.cjs`: **5 aprovados** — observer/limiar/desobservação,
  permanência após saída, preferência reduzida inicial, alteração de preferência
  sem replay e ausência de APIs.
- `node tests/video.test.cjs`: **12 aprovados**, incluindo áudio, exclusividade,
  volume, pausa manual, visibilidade, autoplay mudo e fallback.
- `python3 tests/audit.py`: aprovado — HTML, headings, ARIA, âncoras, 22 imagens,
  cinco vídeos e 30 hashes originais.
- `node --check assets/js/script.js`: sintaxe válida.
- Comparação do HTML: somente atributos de reveal alterados; texto, mídia,
  estrutura, links e idiomas preservados.
- Comparação do JavaScript: controlador de vídeo integralmente preservado.
- Hero/figuras de vídeo excluídos do reveal; animação lateral antiga removida.

`cua.getState()` não encontrou navegador conectado. Fluidez, renderização de
animações, layout shifts e overflow em desktop/tablet/mobile ainda precisam de
validação real. Não foram medidos FPS ou CLS. Nenhuma publicação realizada.

## Arquivos modificados

- `index.html`: atributos de entrada e stagger.
- `assets/css/style.css`: estilos de reveal substituídos e refinados.
- `assets/js/script.js`: apenas o primeiro bloco de reveal.
- `tests/reveal.test.cjs`: nova regressão de reveal.
- `tests/video.test.cjs`: seletor do mock adaptado ao novo seletor de reveal.
- `tests/audit.py`: contagem de disclosures aceita atributos adicionais.
- `docs/phase-13-2.md`: este relatório.
