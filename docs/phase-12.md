# Phase 12 — Contact & Footer

## Composição

Contact mantém `#contact` imediatamente após Services. O fundo vermelho vintage
`--color-brand-red` (#700907) sustenta a frase aprovada em três linhas:
LET'S CREATE / SOMETHING / REMARKABLE. Bodoni Moda, off-white, escala fluida e
tradução em Bodoni menor diretamente abaixo: Vamos criar / algo extraordinário.
Um pequeno filete quase preto abre a composição, sem imagens ou decoração adicional.

Desktop a partir de 1024 px: colunas assimétricas 1,85:1, frase à esquerda e contatos
à direita alinhados à base. Tablet: contatos abaixo, alinhados à direita e com largura
limitada. Mobile: frase, tradução e contatos empilhados; setas em coluna própria,
tipografia reduzida e links com altura mínima de 6rem. Sem altura fixa de seção.

## Contatos

- Instagram: `https://www.instagram.com/mayconcenaa/`, visível `@mayconcenaa`.
- WhatsApp: `https://wa.me/5531995283510`, visível `+55 (31) 99528-3510`.

URLs exatas, sem mensagem adicional. Ambos usam `target="_blank"` e
`rel="noopener noreferrer"`. Aviso bilíngue de nova aba associado via
`aria-describedby`. Não há e-mail, formulário ou contatos adicionais.

Links editoriais sublinhados com metadados Inter e dados em Playfair Display.
Hover/foco reforçam o sublinhado. A seta se desloca apenas 2px quando movimento
reduzido não está ativado. Contorno global de foco preservado. Links funcionam
como âncoras nativas, sem dependência de JavaScript.

## Footer

Fundo quase preto e assinatura MAYCON CENAA em Bodoni, com papéis profissionais,
copyright fixo © 2026 MAYCON CENAA e direitos reservados em inglês/português.
Navegação mínima para `#work`, `#about`, `#services`, `#contact` e retorno ao início
para `#hero`. Tradução do retorno imediatamente abaixo. Metadados e navegação em
Inter; apoio do retorno em Playfair. Régua azul suave separa a linha final.

Desktop: identidade à esquerda, navegação à direita e copyright/retorno na linha
inferior. Mobile: blocos em fluxo natural com navegação flexível e alvos mínimos
de 44px, sem colunas corporativas ou elementos flutuantes.

## Verificação

- HTML balanceado, IDs únicos e referências ARIA resolvidas.
- Texto principal, tradução, canais e Footer conferidos com o pedido.
- URLs externas exatas e atributos de segurança verificados.
- Navegação do Footer e retorno apontam para IDs existentes; Header preservado.
- Contraste off-white/vermelho: 9,51:1; off-white/quase preto: 15,98:1.
- HTML anterior a Contact idêntico ao início da fase.
- CSS anterior preservado; novas regras limitadas a Contact/Footer.
- JavaScript e referências de mídias intactos. Nenhuma dependência adicionada.

Limitação: não havia navegador conectado. Abertura real de Instagram/WhatsApp,
ativação de âncoras, navegação por teclado, fontes e overflow ainda precisam de
conferência em navegador, em mobile e desktop (incluindo 1440 e 1920 px).
Verificações estruturais não substituem esses testes. Nenhuma mensagem foi enviada.

Arquivos alterados: `index.html`, `assets/css/style.css`, `docs/phase-12.md`.
Implementação local, sem publicação. Nenhuma nova fase iniciada.
