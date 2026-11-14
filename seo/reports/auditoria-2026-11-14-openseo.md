# Auditoria OpenSEO — www.mestredosreparos.app.br — 2026-11-14

Projeto OpenSEO: 751b5d0d-a4f4-4103-9646-f9d73745c62e
Auditoria nova: a8ec62f7-d106-4469-966a-f9ef9a09fe55 (run_site_audit, maxPages 200, Lighthouse ligado, sem renderização JS)
Início 2026-11-14T20:55:21Z, fim 2026-11-14T20:58:03Z (get_audit_status). Nada foi alterado no site.

## Créditos usados

| Momento | Créditos restantes (whoami) |
|---|---|
| Início | 7.999 |
| Após get_domain_overview + get_ranked_keywords + get_backlinks_overview (e início da auditoria) | 7.941 |
| Final (após auditoria + Lighthouse + leituras) | 7.821 |
| **Total gasto** | **178** |

Nenhuma chamada passou de 2.000 créditos. A ferramenta não devolve o custo por chamada; os valores acima são diferenças de saldo em whoami.

Auditorias anteriores (list_site_audits): 2026-11-09 (50 páginas, sem LH), 2026-11-07 (113, com LH), 2026-11-02 (141, sem LH), 2026-10-28 (50, com LH), 2026-10-26 (50, sem LH).

## Saúde técnica

Fonte: get_audit_status / get_audit_pages (113 páginas).

| Métrica | Valor |
|---|---|
| Páginas rastreadas | 113 de 113 |
| Status HTTP 200 | 113 |
| Outros status (3xx/4xx/5xx) | 0 |
| fetchClass ok | 113 (0 blocked, 0 rate_limited, 0 error) |
| Indexáveis | 104 |
| Não indexáveis (noindex) | 9 |
| No sitemap | 104 (as 9 fora do sitemap são as 9 noindex) |
| Título ausente | 0 |
| Meta description vazia | 0 |
| Páginas com exatamente 1 H1 | 113 |
| Imagens | 1.270 no total; 0 sem alt |
| Tempo de resposta médio / máximo | 176 ms / 323 ms (/p/eletricista-em-barueri.html) |
| Palavras: mínimo / mediana | 204 (/2026/07/) / 1.371 |
| crawlDepth | 0 = 1 pág.; 1 = 9 págs.; null = 103 págs. |

Canonical: get_audit_pages não devolve campo de canonical; get_audit_issues não registrou canonical-conflict nem canonicalized-page.

## Problemas por gravidade

Fonte: get_audit_issues. Total: 16 ocorrências. Críticos: 0. Avisos (warning): 0. Info: 16.

| Gravidade | Tipo | Qtd | Exemplos de URL |
|---|---|---|---|
| info | noindex-page (X-Robots-Tag: noindex) | 9 | /2026/05/, /2026/06/, /2026/07/, /2026/10/, /p/diarista-em-itapevi.html, /p/diarista-em-jandira.html, /p/diarista-em-santana-de-parnaiba.html, /p/lgpd-lei-geral-de-protecao-de-dados.html, /p/politica-de-privacidade.html |
| info | heading-order-skip | 4 | /2026/05/, /2026/06/, /2026/07/, /2026/10/ |
| info | title-too-long (máx. 60) | 3 | / (66 car.), /p/contrato-de-manutencao-para-empresas.html (68), /p/reformas-residenciais-e-comerciais-em.html (63) |

## Desempenho (Lighthouse)

Fonte: get_audit_lighthouse — 10 URLs × 2 dispositivos = 20 testes, 0 falhas. INP: null em todos.

| URL | Disp. | Perf | Acess | Boas práticas | SEO | LCP (ms) | CLS | TTFB (ms) |
|---|---|---|---|---|---|---|---|---|
| / | desktop | 94 | 96 | 100 | 100 | 1.556 | 0,014 | 106 |
| / | mobile | 51 | 96 | 100 | 100 | 4.980 | 0,012 | 397 |
| /2026/05/ | desktop | 93 | 82 | 96 | 61 | 1.737 | 0,000 | 80 |
| /2026/05/ | mobile | 69 | 82 | 100 | 61 | 7.519 | 0,002 | 151 |
| /2026/05/7sinais-para-chamar-eletricista-em-barueri.html | desktop | 91 | 81 | 96 | 100 | 1.897 | 0,028 | 168 |
| idem | mobile | 69 | 77 | 96 | 100 | 7.285 | 0 | 187 |
| /2026/05/blog-post_5.html | desktop | 91 | 79 | 96 | 100 | 1.944 | 0 | 202 |
| idem | mobile | 69 | 79 | 96 | 100 | 5.887 | 0 | 144 |
| /2026/05/disjuntorgeraleletricistaembarueri.html | desktop | 86 | 82 | 96 | 100 | 1.909 | 0,140 | 157 |
| idem | mobile | 66 | 82 | 96 | 100 | 7.876 | 0 | 113 |
| /2026/05/drdesarmandoeletrecistaembarueri.html | desktop | 94 | 83 | 96 | 100 | 1.624 | 0,028 | 159 |
| idem | mobile | 65 | 79 | 96 | 100 | 6.422 | 0 | 180 |
| /2026/05/trocadedisjuntoreseletrecistaembarueri.html | desktop | 93 | 79 | 96 | 100 | 1.751 | 0,028 | 203 |
| idem | mobile | 67 | 83 | 96 | 100 | 7.807 | 0 | 138 |
| /2026/05/trocadetomadaeletrecistabarueri.html | desktop | 91 | 87 | 96 | 100 | 1.891 | 0,028 | 215 |
| idem | mobile | 60 | 84 | 96 | 100 | 4.499 | 0 | 129 |
| /2026/05/trocadetomadaseinteruptores.html | desktop | 92 | 83 | 96 | 100 | 1.833 | 0,028 | 171 |
| idem | mobile | 71 | 79 | 96 | 100 | 7.170 | 0 | 127 |
| /p/blog-page_29.html | desktop | 93 | 84 | 96 | 92 | 1.697 | 0,046 | 83 |
| idem | mobile | 63 | 84 | 96 | 92 | 7.730 | 0,031 | 172 |

Faixas: Performance desktop 86–94; mobile 51–71. LCP mobile 4.499–7.876 ms. CLS máximo 0,140 (disjuntorgeral…, desktop).

## Palavras ranqueadas

Fontes: get_domain_overview (Brasil, 2076, pt): tráfego orgânico estimado 3; palavras orgânicas 4.
get_ranked_keywords (Brasil, ordenado por volume, limite 30): totalCount = 4 (só existem 4).

| Palavra | Posição (rank_absolute) | URL | Volume/mês |
|---|---|---|---|
| eletricista barueri | 26 | /p/eletricista-em-barueri.html?m=1 | 590 |
| eletricista em barueri | 17 | /2026/05/eletricista-em-barueri-mestre-dos-reparos.html | 590 |
| eletricista perto de mim abertos agora | 20 | /p/eletricista-em-barueri.html?m=1 | 170 |
| mercado 24h perto de mim abertos agora | 70 | /2026/05/eletricista-em-barueri-mestre-dos-reparos.html | 170 |

Datas da SERP medida pela ferramenta: 2026-07-31, 2026-09-16, 2026-08-31, 2026-10-05 (respectivamente).

## Backlinks

Fonte: get_backlinks_overview (subdomains, hideSpam padrão).

| Métrica | Valor |
|---|---|
| Rank | 18 |
| Backlinks | 39 |
| Páginas de referência | 32 |
| Domínios de referência (resumo) | 18 |
| Domínios listados (filtro antispam) | 15 |
| Backlinks quebrados | 0 |
| Spam score backlinks / alvo | 1 / 0 |
| Tendência 2026-10-31 | 35 backlinks, 17 domínios, rank 18 |

Top domínios por backlinks: dicas.inf.br 5, brasilempalavras.com.br 5 (spam 11), band.com.br 4 (primeira vez 2026-11-13), agoranobr.com.br 4, brnovas.com.br 4.

## Erros da ferramenta

- get_audit_pages com limit 200: resposta de 67.247 caracteres excedeu o limite de exibição; dados lidos do arquivo salvo (113 páginas, todas presentes).
- get_audit_pages não traz campo de canonical.
- INP retornado como null em todos os 20 testes Lighthouse.
- Nenhuma outra chamada falhou.
