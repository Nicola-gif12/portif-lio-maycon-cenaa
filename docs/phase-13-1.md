# Fase 13.1 — Áudio e volume

## Vídeos atualizados

- Beauty: `beauty-motion-01`, `beauty-motion-03`.
- Fashion: `fashion-motion-01`, `fashion-motion-02`.
- Bridal: `bridal-motion` (arquivo `bridal-editorial-01-03.MOV`).

GStreamer confirmou áudio AAC estéreo nos cinco arquivos usados na página e nos
três outros vídeos Bridal preservados. `data-has-audio="true"` registra essa
inspeção; não é uma suposição baseada na extensão. Assets novos sem indicação
confirmada não exibem controles customizados de áudio. O atributo deve ser
reavaliado se uma fonte de vídeo for substituída.

## Controles e comportamento

Cada legenda recebeu botão de som com SVG local e estado `aria-pressed`, texto
Sem som/Com som, label Volume e range de 0 a 1 em passos de 0,05. O valor acessível
é informado em percentual. Controles têm área de toque de 44px, foco existente,
cores oficiais e quebra de linha em colunas estreitas. Nenhuma biblioteca adicionada.

Início automático permanece mudo, condicionado ao observer existente e à preferência
de movimento reduzido. Não foi adicionado atributo HTML `autoplay`, pois isso
permitiria ao navegador iniciar independentemente da visibilidade e conflitaria
com `preload="none"`; o autoplay existente continua via `play()` controlado.

Som só é ativado pelo botão. Ativar outro vídeo silencia os demais sem alterar os
volumes escolhidos. Alterações nativas de volume/mute também sincronizam a interface.
O slider ajusta o nível, inclusive zero, sem desmutar implicitamente. Mute preserva
o nível atual; desmutar com nível zero mantém zero, ajustável pelo slider.

Pausa manual permanece respeitada. Retomada manual preserva o som escolhido;
saída do viewport ou ocultação da aba pausa e silencia. Retomadas automáticas são
sempre mudas. Eventos de visibilidade repetidos não silenciam um vídeo que já está
tocando por escolha explícita. Falha de codec esconde controles de áudio e conserva
o fallback de imagem/link original.

## Mobile e limitações

Se a tentativa de ajustar `volume` falhar ou não produzir o valor solicitado, o
slider é desativado e a interface orienta usar os botões do dispositivo. Mute/unmute
permanece disponível. Não há tentativa de contornar restrições do sistema.

Não existe detecção universal de trilhas em JavaScript: a disponibilidade usa o
inventário confirmado localmente. Sem JS/IntersectionObserver, a página conserva
controles nativos; exclusividade customizada depende do controlador ativo.
Os MOV/H.265 e sua limitação de compatibilidade permanecem inalterados.

## Verificação

- `node tests/video.test.cjs`: **12 testes aprovados**, incluindo os seis anteriores
  e som explícito/volume persistente, exclusividade, retomada muda, ausência de
  trilha confirmada, volume bloqueado pela plataforma e nível zero/falha de mídia.
- `python3 tests/audit.py`: aprovado; HTML/IDs/ARIA, mídia e 30 hashes intactos.
- `node --check assets/js/script.js`: sintaxe válida.
- Check adicional: cinco botões de som, cinco sliders 0–1/0,05 e cinco flags de áudio;
  referências de mídia e todo CSS anterior preservados.
- `gst-discoverer-1.0`: AAC estéreo confirmado nos oito arquivos disponíveis.
- `cua.getState()`: nenhum navegador disponível. Reprodução real, audibilidade,
  interação touch, políticas móveis e renderização dos controles não verificadas.

Um único observer de vídeo foi reutilizado. Sem preload adicional, conversões,
mídia nova, redesign ou publicação. As legendas acomodam os controles adicionais;
arranjos e dimensões das fotografias/vídeos permanecem iguais.

## Arquivos modificados

`index.html`, `assets/js/script.js`, `assets/css/style.css`,
`tests/video.test.cjs` e `docs/phase-13-1.md`.
