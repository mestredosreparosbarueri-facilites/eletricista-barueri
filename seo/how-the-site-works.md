# Como o site funciona (www.mestredosreparos.app.br)

Levantado em 14/11/2026 a partir de `cloudflare/worker.js` (repo, branch ccr-33db381a-6kweq8, último commit d179410), do site no ar (curl 14/11) e do ESTADO.md da sessão. Nada foi alterado no site.

## Arquitetura em uma frase
Blogger (blog id `8908099861674022223`, tema próprio) é a origem de quase todas as páginas; na frente dele roda o Cloudflare Worker `mdr-sem-m1` (código em `cloudflare/worker.js`), que reescreve o HTML, guarda cópias no KV e serve a home a partir do GitHub.

## Tipos de URL e de onde vêm
| URL | Origem | Fonte |
|---|---|---|
| `/` (home) | `nova/home.html` deste repo, lido do GitHub em um commit fixo (`NOVA_SHA`, hoje `891ae1f…`) | worker.js linhas 31-33, 295-306 |
| `/nova/*` (imagens da home, prévias) | GitHub raw, branch `ccr-33db381a-6kweq8`, com `x-robots-tag: noindex` | worker.js 309-319 |
| `/p/*.html` (páginas estáticas) e `/AAAA/MM/*.html` (posts) | Blogger | worker.js 347-380 |
| `/sitemap.xml` (posts, 39 URLs) e `/sitemap-pages.xml` (páginas, 65 URLs) | Blogger, filtrados pelo Worker | worker.js 363-368; contagem por curl 14/11 |
| `/robots.txt` | Blogger (padrão: bloqueia `/search` e `/share-widget`, lista os 2 sitemaps) | curl 14/11 |
| `/p/mestre-dos-reparos-manutencao-reparos.html` (home antiga) | 301 → `/` | worker.js 34, 290 |

## De onde vem cada elemento de SEO
- **Title**: home = `<title>` de `nova/home.html` ("Reformas e Manutenção em Barueri | Mestre dos Reparos"). Páginas/posts = título da página/post no Blogger (formato do tema). O Worker não mexe no title.
- **Meta description**: home = `nova/home.html`. Blogger = "descrição de pesquisa" da página/post no Blogger. Para 6 URLs o Worker REMOVE a do tema e injeta a do mapa `DESC` (worker.js 170, 203): `/p/eletricista-em-barueri.html`, `/p/reformas-residenciais-e-comerciais-em.html`, `/p/contrato-de-manutencao-para-empresas.html`, `/2026/10/manutencao-para-empresas.html`, `/p/contratos-corporativos-b2b.html`, `/2026/11/duvidas-de-eletrica.html`.
- **og:image / twitter:image**: tema do Blogger; sobrescritas pelo mapa `OGIMG` (worker.js 169) em 5 URLs.
- **Canonical**: home = tag em `nova/home.html`; Blogger = tag do tema (URL limpa). O Worker tira `?m=1` de qualquer link/`content` (classe `LinkFix`) e responde 301 em pedidos com `?m=1`. Obs.: o post `/2026/11/duvidas-de-eletrica.html` sai com 2 tags canonical iguais (curl 14/11), sem conflito.
- **Robots/noindex**: tema do Blogger (meta e `x-robots-tag`). O Worker força `x-robots-tag: all` em `INDEXAR` (2 páginas) e tira do sitemap as de `FORA_SITEMAP` (6) e `NOINDEX` (27 `/p/reforma-*`, que respondem 301 para o hub de reformas por bairro `/2026/10/reformas-em-barueri-para-residencias.html#bairros|#cidades`).
- **Sitemap**: gerado pelo Blogger; o Worker troca a URL da home antiga por `/`, põe `lastmod` da home = `HOME_MOD` (worker.js 46) e remove `FORA_SITEMAP` + `NOINDEX`.
- **Dados estruturados**:
  - Home: blocos `ld+json` escritos em `nova/home.html` (Organization, WebSite, WebPage, `#empresa` Electrician+HomeAndConstructionBusiness com OfferCatalog, Person, FAQPage, ImageGallery).
  - Páginas novas (eletricista, lote 2, dúvidas): `@graph` colado no corpo da página no Blogger (fonte: `paginas/lote2-2026-11-07/*/schema.json`, `paginas/eletricista-em-barueri-2026-11-07.html`).
  - Tema do Blogger gera `BlogPosting`; o Worker (`LdFix`) troca publisher/author (empresa / Paulo Henrique Valadão), usa a meta description, e em `/p/` vira `WebPage`. Em `LD_PROPRIO` (2 URLs) o BlogPosting do tema é removido.
  - Estrelas: `Product` + `AggregateRating` injetado pelo Worker (`comNota`) em `/` e `/p/eletricista-em-barueri.html`, com votos do KV `AVAL` (hoje 5,0 / 7 votos, curl 14/11). Regra do Paulo: NUNCA desligar.
- **Contagem de avaliações do Google** ("36 avaliações"): texto trocado pelo Worker com a chave `rc` do KV `AVAL` (classe `Contagem`).
- **Outras injeções do Worker**: tag Google Ads `AW-17918599259` + conversão em todo link de WhatsApp (`ADS_TAG`); selo de responsabilidade técnica antes do rodapé; caixa de link para o pilar de reformas em páginas de reforma (`linkPilar`); troca de texto do tema (`TROCA`); imagens do Blogger em webp/JPEG ≤800px (`ImgFix`).
- **IndexNow**: chaves servidas em `/ab2d63c7130888b84f8955c6932b3501.txt` e `/30224266bf7a45ab8efe264d1a68bb19.txt` (OpenSEO) (worker.js 284-289).
- **llms.txt**: `/llms.txt` responde 301 → `/p/llms.html` (página do Blogger). `llms.txt` no repo é a cópia de referência (curl 14/11).

## Cache (por que uma mudança "não aparece")
1. Cache da borda Cloudflare (`caches.default`) com chave = `URL?__v=m` (celular) ou `URL?__v=d` (desktop) (worker.js 325). Home: chave interna `/__home`, 1 h.
2. KV `PAG` (namespace `a266ecb03a4c4a38bfd5019ab2eb22d9`): cópia do HTML já tratado, chaves `m:<path>` e `d:<path>`, validade 20 h; um cron de hora em hora reaquece ~22 URLs do sitemap (worker.js 230-268). KV `AVAL` = `871e1dde0d2341c980e2b39830fc270d` (bindings em scratchpad `aud/w/meta.json`).
3. Navegador: `max-age` 300-600 s.

## Passo a passo: atualizar uma página do Blogger que já está no ar
(Site congelado: só com ordem explícita do Paulo. Antes de tudo, chamar as skills exigidas pelo Paulo; hook `/root/.claude/hooks/trava-skills.py` bloqueia publicação sem skill.)
1. Backup do conteúdo atual: `GET https://www.googleapis.com/blogger/v3/blogs/8908099861674022223/pages/<id>` (ou `/posts/<id>`) e salvar em `backups/<nome>-antes-AAAA-MM-DD.json`. Token: `bash scratchpad/blogger/token.sh` (refresh token em `scratchpad/blogger/cred.env`). Exemplo de leitura em `scratchpad/blogger/links.py`.
2. Gerar o novo corpo (modelo: `paginas/lote2-2026-11-07/build.py` + `texto.md` + `schema.json` → `blogger-body.html`). Não mudar H1 nem title que ranqueia. CSS com escape (`content:"\2212"`), não caractere especial.
3. Publicar: `PATCH .../blogs/8908099861674022223/pages/<id>` (ou `posts/<id>`) com `{"content": "..."}` (formato usado: `scratchpad/blog/lote2/patch.json`). Descrição de pesquisa (meta description) do Blogger não é editável pela API → usar o mapa `DESC` do Worker (passo 5) se precisar.
4. Limpar os caches (LIÇÃO de 07/11, ESTADO.md: purgar só a URL limpa NÃO basta):
   - Cloudflare purge (`POST https://api.cloudflare.com/client/v4/zones/$CF_ZONE/purge_cache`, auth `X-Auth-Email`/`X-Auth-Key` de `scratchpad/cloudflare.env`) com `files`: `URL`, `URL?__v=m`, `URL?__v=d`.
   - Apagar no KV PAG as chaves `m:<path>` e `d:<path>` (`DELETE https://api.cloudflare.com/client/v4/accounts/372649c068aca36a03fb818bbb500806/storage/kv/namespaces/a266ecb03a4c4a38bfd5019ab2eb22d9/values/<chave url-encoded>`; account id tirado de `scratchpad/wahook/avalia.py`).
5. Se mexeu em DESC/OGIMG/LD_PROPRIO/NOINDEX/redirect: editar `cloudflare/worker.js`, fazer backup do worker em produção, publicar o Worker `mdr-sem-m1` pela API de Workers (`PUT /accounts/<id>/workers/scripts/mdr-sem-m1`, metadados/bindings de `scratchpad/aud/w/meta.json`) e commitar o repo. Não há script de deploy salvo no repo: o método exato precisa ser confirmado antes de usar.
6. Conferir no ar com user-agent de celular e de desktop (`x-mdr: miss` na 1ª vez), Playwright em 1920/1366/390 px bloqueando google-analytics/googletagmanager (senão infla o GA4).
7. Avisar buscadores: OpenSEO `submit_indexnow_urls` (Bing/Yandex); no GSC, reenviar sitemap e, se a página for nova ou "desconhecida", pedir indexação manual (a API não permite; o Paulo faz).
8. Registrar em `seo/log.md` e commitar backups/código.

## Passo a passo: atualizar a home
1. Editar `nova/home.html` (e imagens em `nova/img/`), commit e push.
2. Trocar `NOVA_SHA` no `cloudflare/worker.js` para o SHA novo (sem isso a home não muda) e, se quiser, `HOME_MOD`.
3. Publicar o Worker (passo 5 acima) e purgar `https://www.mestredosreparos.app.br/` e a chave interna `/__home` (a confirmar se o purge por URL alcança essa chave; ela expira em 1 h de qualquer forma).

## Passo a passo: página ou post NOVO
BLOQUEADO: Paulo, 02/11, "NÃO criar mais páginas"; site congelado até ordem dele (ESTADO.md). Quando liberado, o caminho do repo é: `POST .../blogs/8908099861674022223/pages` (ou `/posts`) com título + conteúdo gerado como no passo 2, URL limpa sem espaço, depois passos 4-8. Reforma por bairro nunca vira página nova: vai como bloco no hub `/2026/10/reformas-em-barueri-para-residencias.html`.

## Arquivos e scripts envolvidos
- `cloudflare/worker.js` (Worker em produção, cópia sincronizada em 07/11; backups em `scratchpad/aud/w/`)
- `nova/home.html`, `nova/img/` (home)
- `paginas/` (fontes das páginas reescritas: texto.md, schema.json, blogger-body.html, build.py, auditorias)
- `backups/` (conteúdo antes de cada mudança)
- `llms.txt` (cópia; a versão pública é `/p/llms.html`)
- `ferramentas/corrige-genero-nome.py` ("o Mestre"), `ferramentas/corrige-links-e-tel.py` (tira tel:)
- scratchpad: `blogger/token.sh` + `cred.env` (Blogger), `cloudflare.env` (Cloudflare), `blog/lote2/build.py`, `aud/w/meta.json`
