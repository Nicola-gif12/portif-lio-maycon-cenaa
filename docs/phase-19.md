# Fase 19 — preparação para Vercel

Conferência em 12/10/2026. Nenhum commit, push, deploy ou alteração remota foi
executado. Nenhuma seção visual, CSS, JavaScript ou mídia foi alterada nesta fase.

## A. Build de produção

Site estático em HTML/CSS/JavaScript, sem framework, `package.json`, gerenciador de
pacotes, dependências de produção ou servidor de aplicação. O script da Fase 18
`scripts/build_static.py` empacota os arquivos usando a biblioteca padrão Python.

Build executado com sucesso:

```sh
python3 scripts/build_static.py --output /tmp/maycon-phase19-release
```

Saída: 39 assets, `index.html` e `robots.txt`; 41 arquivos e 292.773.928 bytes
(aproximadamente 279,21 MiB). Todos os arquivos gerados sem `SITE_URL` são
byte a byte iguais aos respectivos arquivos de origem. A saída `dist/` da
Fase 18 também está disponível e está ignorada pelo Git.

O script exige uma pasta de saída inexistente para não apagar arquivos locais.
Em novos builds locais, escolher outro caminho com `--output`. Na Vercel, `dist/`
não deve ser versionada nem restaurada por scripts próprios de cache; cada checkout
novo gera essa pasta pelo comando padrão.

Verificações concluídas:

- 6 testes de build, 14 testes de controles de vídeo e 5 testes de reveal passaram.
- Sintaxe de `assets/js/script.js` válida pelo Node.
- Auditoria estrutural: HTML, headings, âncoras, ARIA, contatos, dimensões de
  22 elementos de imagem, 5 vídeos e 1 source de picture; 30 hashes de originais
  conferidos com o manifesto existente.
- 44 referências locais do HTML/CSS publicado existem com capitalização exata
  em Linux, incluindo fotos, vídeos, posters, favicon, CSS e JS.
- Nenhum import de dependência externa de código ou roteador de aplicação.
- Nenhuma URL localhost, IP de desenvolvimento, URL file:// ou instrução
  console.log/debug/trace/debugger encontrada nos textos publicados.
- Nenhuma assinatura comum de chave privada, token GitHub ou chave AWS encontrada
  na varredura dos arquivos de texto candidatos ao versionamento. Essa verificação
  não constitui auditoria de um histórico Git, pois ele não existe aqui.
- O pacote contém somente HTML, robots e assets permitidos. Configurações locais,
  docs, testes e scripts não fazem parte da saída pública.

## B. Git e GitHub

Repositório confirmado pela API GitHub:
[Nicola-gif12/portif-lio-maycon-cenaa](https://github.com/Nicola-gif12/portif-lio-maycon-cenaa).
É público, não arquivado e informa `main` como branch padrão. A lista de branches
retornou vazia e o endpoint de conteúdo respondeu explicitamente
`This repository is empty.` Portanto, ainda não há branch materializada, commits
ou arquivos rastreados nesse remoto no momento da conferência.

Localmente, `.git` é uma pasta vazia. `git status --short --branch` termina com
`fatal: not a git repository`. Não é possível classificar mudanças como staged,
untracked ou modificadas, nem verificar branch/upstream/remotos locais. A URL
fornecida pelo usuário identifica o destino; ela não está configurada como um
remote Git funcional nesta cópia. Não foi tentada reinicialização de `.git`.

`.gitignore` cobre `.env`, variantes locais, logs, caches, `dist/`, Python cache
e, agora, `.vercel/`, `.aws`, `.codex/` e `.agents/`. Nenhum asset de produção é
ignorado. Nenhum arquivo do pacote excede 100 MiB; o maior vídeo tem 39,81 MiB.
Não foi adicionado Git LFS. Conferir a lista staged antes do primeiro commit.

## C. Configuração Vercel

Ao colocar os arquivos na raiz do repositório conforme o roteiro abaixo:

| Campo | Valor |
|---|---|
| Framework Preset | `Other` |
| Build Command — Override | `python3 scripts/build_static.py` |
| Output Directory — Override | `dist` |
| Install Command — Override | `true` (comando vazio de trabalho; sem instalação) |
| Root Directory | `.` (raiz que contém `index.html` e `scripts/`) |
| Production Branch | `main`, após o primeiro push |
| SITE_URL | Ausente no primeiro deploy; depois, URL HTTPS de produção confirmada |

Não publicar a raiz inteira como Output Directory: ela contém documentação,
testes e ferramentas que o empacotamento separa dos assets públicos.
Não é necessário criar `vercel.json`, adicionar dependências ou configurar
funções. A navegação usa âncoras (`/#work`, `/#about` etc.); não há rotas client-side
que precisem de rewrites. Uma URL inexistente deve continuar respondendo 404.

A documentação oficial permite preset Other, comando customizado e diretório de
saída específico: [Configuring a Build](https://vercel.com/docs/builds/configure-a-build).
Python está disponível na [imagem de build da Vercel](https://vercel.com/docs/builds/build-image).
O build foi validado localmente; a execução hospedada ainda não ocorreu.

## D. Favicon

`assets/images/brand/favicon/FaviCon-MC.png` tem capitalização correta e PNG
válido de 1254 × 1254. O original permanece intacto. O head também referencia
as versões 16 × 16, 32 × 32 e 48 × 48 criadas na Fase 18 com o mesmo desenho.
Todas existem no pacote e declaram `image/png` e dimensões corretas.
O formato atende navegadores modernos; apresentação efetiva na aba, cache e
resposta HTTP precisam ser conferidos depois da publicação.

## E. SEO e compartilhamento

Estado conferido no HTML gerado:

- Título: **Maycon Cenaa | Fotógrafo & StoryMaker**.
- Description: **Portfólio de Maycon Cenaa, fotógrafo e StoryMaker especializado
  em beauty, fashion, editoriais, eventos e produções visuais.**
- Open Graph: type website, site_name, title, description e locale pt_BR.
- Twitter Card: summary_large_image, title e description.
- `robots.txt`: User-agent `*`, Allow `/`.
- Sem domínio confirmado: canonical, og:url, og:image, twitter:image e
  sitemap.xml ficam deliberadamente ausentes. Nenhum domínio foi inventado.

Após definir `SITE_URL`, o build gera automaticamente canonical, og:url,
og:image e twitter:image absolutos (com alt e dimensões de imagem), sitemap.xml
com a URL da página única e a linha Sitemap em robots.txt. As seções por âncora
não são páginas separadas no sitemap. Testes com domínio de exemplo verificaram
esse comportamento e suporte a subpasta; o exemplo existe apenas nos testes.

A imagem social é a fotografia já existente `assets/images/hero/hero-04.png`
(941 × 1672). Ela não foi substituída nem recortada. Redes sociais podem recortar
essa imagem vertical: conferir a prévia real após publicação. As propriedades
absolutas completam os campos básicos descritos no [Open Graph](https://ogp.me/).

Para esta publicação na raiz do host, robots ficará em `/robots.txt`. Se houver
futuramente uma subpasta, o responsável pelo host também precisará manter robots
na raiz, conforme a [documentação do Google](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt).

## F. Mídias e testes manuais

Paths relativos preservados, inclusive extensões `.MOV` em maiúsculas. Não há
dependência de uma pasta `public/`: o build copia a árvore `assets/` para a saída.
Os 8 arquivos de vídeo originais foram mantidos, dos quais 5 são usados no HTML;
os outros 3 também permanecem na coleção de assets, sem remoção nesta fase.
Não foram modificados fotos, vídeos, posters, controles, fontes ou estilos.

Os vídeos QuickTime/H.265 com áudio AAC continuam dependentes do suporte real do
navegador/dispositivo. Os testes automatizados verificam a lógica dos controles,
incluindo falhas e fallback; não decodificam vídeo em navegadores. Arquivos grandes
podem carregar lentamente em redes móveis. Não houve conversão de mídias.

Ainda requerem teste manual no endereço publicado:

- Chrome, Firefox, Safari e Edge, desktop e celular: imagens, favicon, fontes,
  áudio, volume, play/pause, autoplay bloqueado e fallback de codec.
- Larguras 360, 375, 390, 430, 768, 1024, 1280, 1440 e 1920 px: layout aprovado,
  overflow, foco, navegação por teclado, toque e reveal.
- Network: ausência de 404, Content-Type correto para imagens/CSS/JS/vídeos,
  carregamento/seek dos vídeos e requisições parciais quando usadas pelo navegador.
- Console, desempenho real, âncoras acessadas diretamente, contatos, canonical,
  robots, sitemap e prévia social. Nenhuma dessas verificações hospedadas foi
  declarada concluída nesta preparação.

## G. Pendências para publicar

Não foi encontrado bloqueio técnico no pacote local. Faltam o primeiro commit e
push no repositório vazio, a importação/configuração na conta Vercel e a publicação
autorizada. Para concluir o SEO, falta obter a URL estável e refazer o build com
`SITE_URL`. Também faltam os testes manuais acima. Não é possível afirmar que o
repositório esteja pronto para importação enquanto não receber os arquivos.

## H. Publicação passo a passo — comandos não executados

1. Usar um clone novo, sem mexer na pasta `.git` vazia desta cópia. Na pasta atual:

   ```sh
   git clone https://github.com/Nicola-gif12/portif-lio-maycon-cenaa.git ../Maycon-Cenaa-publicacao
   cd ../Maycon-Cenaa-publicacao
   git remote -v
   git ls-remote --heads origin
   ```

   A ausência de branches era esperada na conferência. Se agora houver commits,
   revisar seu conteúdo antes de copiar arquivos e reconciliar as mudanças;
   não sobrescrever trabalho remoto nem usar force-push.

2. Se o remoto continuar vazio, copiar somente os arquivos do projeto:

   ```sh
   cp -R ../Maycon-Cenaa/index.html ../Maycon-Cenaa/robots.txt ../Maycon-Cenaa/.gitignore ../Maycon-Cenaa/README.md ../Maycon-Cenaa/assets ../Maycon-Cenaa/scripts ../Maycon-Cenaa/tests ../Maycon-Cenaa/docs .
   git status --short
   git add .gitignore README.md index.html robots.txt assets scripts tests docs
   git diff --cached --stat
   git diff --cached --name-only
   git diff --cached --check
   ```

   Revisar os arquivos staged e confirmar que assets, favicon e build script
   estão incluídos, sem `.env`, configurações locais, caches ou `dist/`.

3. Com a revisão e autorização para commit/push, executar:

   ```sh
   git commit -m "Prepare Maycon Cenaa portfolio for production"
   git branch -M main
   git push -u origin main
   ```

   Se o push for rejeitado por mudanças remotas, buscar e comparar essas mudanças;
   não forçar o envio. Confirmar no GitHub o commit, os arquivos e a branch `main`.

4. Na Vercel, escolher **Add New → Project**, conectar a conta GitHub, permitir
   acesso a este repositório e importá-lo. Preencher os valores da seção C.
   Não definir uma URL fictícia nem usar o endereço temporário de um preview
   como canonical. Conferir que a branch de produção é `main`.
   Após conectar o projeto, novos pushes podem disparar deployments automaticamente,
   conforme a [integração Git da Vercel](https://vercel.com/docs/git).

5. Quando houver autorização para publicar, clicar **Deploy**. Acompanhar o log,
   confirmar o build bem-sucedido e abrir **Visit**. Copiar de **Settings → Domains**
   a URL HTTPS estável de produção atribuída ao projeto, ou o domínio próprio
   confirmado. O endereço de produção só será conhecido após essa configuração.

6. Definir a variável **SITE_URL** em **Settings → Environment Variables**, no
   ambiente **Production**, com essa URL exata. Usar a URL estável do projeto,
   não a URL única de um deployment. O script normaliza a barra final.

7. Em **Deployments**, selecionar o deployment de produção e usar **Redeploy**
   após salvar a variável. Não é necessário editar o HTML nem fazer outro commit
   apenas para configurar o domínio. O novo build produzirá os metadados e o
   sitemap com o endereço confirmado. Se mudar de domínio, atualizar SITE_URL
   e repetir o redeploy. A Vercel aplica mudanças de variáveis em um
   [novo deployment](https://vercel.com/docs/environment-variables/managing-environment-variables).

8. No novo deployment, conferir o código-fonte do HTML, `/robots.txt`,
   `/sitemap.xml`, a URL absoluta da imagem social e os favicons; executar os
   testes manuais da seção F. Confirmar que canonical, og:url e sitemap apontam
   para o mesmo endereço estável. Só então considerar a publicação verificada.

## Arquivos alterados nesta fase

- `.gitignore`: exclusão de configurações locais de ferramentas/hosting.
- `README.md`: estado atual e comandos de build/verificação.
- `docs/phase-19.md`: este relatório e o roteiro de publicação.

Os ajustes já existentes da Fase 18 em `index.html`, `robots.txt`,
`scripts/build_static.py`, `tests/build.test.py`, `tests/audit.py` e nos três
favicons reduzidos foram apenas verificados nesta fase. Eles também precisam
integrar o primeiro envio. CSS, JS, HTML e mídia não receberam alterações na Fase 19.
