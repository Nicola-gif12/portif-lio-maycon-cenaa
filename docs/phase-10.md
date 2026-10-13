# Phase 10 — About Maycon Cenaa

## Fotografia

Arquivo aprovado localizado em `assets/images/hero/about.png`, inspecionado e movido
para **`assets/images/about/about.png`**. Dimensões: **1086 × 1448 px**. O SHA-256
antes/depois é idêntico; nenhum filtro, recorte, conversão ou cópia adicional foi
introduzido. Não existiam referências anteriores ao arquivo para atualizar.
A nova referência usa dimensões intrínsecas, `loading="lazy"`, `decoding="async"`
e descrição em português. Fachada, rosto, câmera e corpo permanecem completos.

## Composição e tipografia

Fundo navy com texto off-white, régua superior em azul suave, pequeno marcador
vermelho e filete creme acompanhando as bordas direita/inferior da fotografia.
O título usa Bodoni Moda com tradução menor da mesma família imediatamente abaixo.
As biografias aprovadas foram reproduzidas literalmente, em terceira pessoa,
com `lang="en"` e `lang="pt-BR"`. Playfair Display no texto, inglês maior e português
menor com entrelinha confortável. Inter nos metadados e na assinatura MAYCON CENAA.

Desktop a partir de 1024 px: grid de 12 colunas. Título à esquerda em sete colunas;
biografia recuada uma coluna; fotografia à direita em cinco colunas, deslocada
verticalmente. A imagem atravessa as duas linhas de texto, preservando sua proporção.
Essa estrutura evita reproduzir o Hero e sua fotografia à esquerda.

Mobile: título, tradução, fotografia, biografia inglesa, biografia portuguesa e
assinatura, na ordem do HTML. Entre 768 e 1023 px, fotografia alinhada à direita
com 82% da largura e texto levemente recuado. Espaços e tamanhos são fluidos.

A transição parte do espaçamento existente de Campaign para o fundo navy de About,
sem novo painel vazio. O reveal existente foi aplicado ao título e à biografia;
seu suporte a movimento reduzido foi preservado. JavaScript não foi alterado.

## Verificações

- HTML balanceado, IDs únicos e referências ARIA resolvidas.
- Âncoras internas, incluindo `#about`, apontam para IDs existentes.
- Textos aprovados comparados literalmente; ordem mobile conferida no DOM.
- Dimensões reais da foto e carregamento lazy verificados.
- Hash da foto preservado após a movimentação.
- HTML anterior e posterior a About idêntico ao estado inicial da fase.
- CSS existente preservado integralmente; novas regras limitadas a About.
- JavaScript idêntico; nenhuma dependência adicionada.

Limitação: nenhum navegador conectado disponível. Renderização, fontes e ausência
de overflow ainda requerem conferência visual em mobile e desktop, especialmente
1440 e 1920 px. A validação estrutural não substitui essa conferência.

## Arquivos

- `index.html`
- `assets/css/style.css`
- `assets/images/hero/about.png` → `assets/images/about/about.png`
- `docs/phase-10.md`

Services e Contact preservados. Nenhuma publicação realizada.
