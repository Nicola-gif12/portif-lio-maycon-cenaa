# Phase 11 — Services

## Implementação

Uma introdução `SERVICES / Serviços` mantém a apresentação em terceira pessoa.
A seção continua em `#services`, depois de About e antes de Contact.

Quatro linhas horizontais, sem cards, ícones genéricos ou numeração:
Photography / Fotografia, Videomaking / Produção de vídeo, Storymaking / Produção
de stories e Event Coverage / Cobertura de eventos. Títulos em Bodoni Moda,
traduções em Playfair Display e descrições em Inter. As oito descrições aprovadas
foram preservadas literalmente, com inglês seguido de português e idiomas explícitos.

Cada linha é um `details` com `summary` nativo: clique/toque ou Enter/Espaço no
controle focado abrem e fecham a descrição, inclusive sem JavaScript. Títulos e
traduções permanecem visíveis. Uma instrução bilíngue identifica a interação.
As setas são decorativas e ficam fora da árvore de acessibilidade; o navegador
expõe o estado aberto/fechado do controle. Não há links falsos para Contact.

Fundo quase preto, texto off-white e regras em azul suave. Photography e Storymaking
usam navy nos estados hover/foco/aberto; Videomaking e Event Coverage usam vermelho
vintage. O hover altera apenas o fundo. Ao abrir, a seta muda de direção e o texto
usa a animação suave já existente, somente sem preferência por movimento reduzido.
O foco visível fica dentro da linha, com contorno claro. Nenhum JS foi adicionado.

Desktop: títulos fluidos até 5rem, introdução com instrução à direita e descrições
recuadas com largura de leitura limitada. Mobile: introdução empilhada, títulos
menores, tradução imediatamente abaixo e seta em coluna própria; controles com
altura mínima de 6,5rem e descrições disponíveis por toque. Quebras de texto e
colunas flexíveis evitam larguras rígidas. O espaçamento de seção existente mantém
a transição de About e Contact, sem modificar essas seções.

## Verificação

- HTML balanceado; IDs únicos; âncoras e referências ARIA resolvidas.
- Uma introdução e quatro headings de serviço dentro de quatro disclosures nativos.
- Textos aprovados e pares de idiomas conferidos.
- Contraste off-white/fundo: quase preto 15,98:1; navy 13,20:1; vermelho 9,51:1.
- HTML anterior/posterior a Services idêntico ao início desta fase.
- CSS anterior preservado integralmente; regras adicionadas limitadas a Services.
- JavaScript intacto, sem novas dependências, imagens ou alterações de mídia.

Limitação: não havia navegador conectado. Hover, foco, ativação por teclado/toque,
renderização das fontes e ausência de overflow precisam de conferência real em
mobile e desktop (incluindo 1440 e 1920 px). As verificações estruturais e o uso de
controles nativos não substituem essa validação visual.

Arquivos alterados: `index.html`, `assets/css/style.css`, `docs/phase-11.md`.
Contact não foi desenvolvido. Nenhuma publicação realizada.
