# Auditoria SEO — skill seo-audit (coreyhaines31/marketingskills v2.2.2) — 07/11/2026

Páginas: / (home), /p/eletricista-em-barueri.html, /p/reformas-residenciais-e-comerciais-em.html,
/p/contrato-de-manutencao-para-empresas.html, /2026/10/manutencao-para-empresas.html

Fontes: navegador renderizado (Playwright, 1366 e 390 px; schema lido com JS, como a skill exige), Search Console
(OpenSEO: inspeção de URL e desempenho 08/10–04/11), robots.txt, sitemap.xml e sitemap-pages.xml.

## Resumo
Base técnica boa: 5 páginas com status 200, HTTPS sem conteúdo misto, canonical próprio, sem rolagem lateral, 1 H1 por
página, sem salto de título, todas as imagens com alt, 116 links internos da home respondendo 200, TTFB 297–838 ms.
4 das 5 indexadas. Problemas principais:
1. Post /2026/10/manutencao-para-empresas.html NÃO está indexado ("Detectada, mas não indexada no momento").
2. Quatro URLs disputam "eletricista em barueri" (canibalização).
3. A home ainda tem botão "Ligar" (tel:), contra a regra de atendimento só pelo WhatsApp.
4. O schema da empresa (#empresa) aparece com tipos diferentes em cada página.
5. Reformas e contrato foram rastreados pela última vez em 01–02/11: o Google ainda não viu as versões novas.

## Rastreio e indexação
| Problema | Impacto | Evidência | Correção | Prioridade |
|---|---|---|---|---|
| Post de manutenção não indexado | Alto | Inspeção GSC: "Detectada, mas não indexada", sem rastreio | Pedir indexação no Search Console; ganhar links internos de páginas indexadas (contrato e home já linkam) | 1 |
| Versões novas ainda não rastreadas | Médio | Último rastreio: reformas 01/11, contrato 02/11, home 02/11 | Pedir nova indexação das 3 no Search Console | 1 |
| Post só no sitemap.xml; páginas no sitemap-pages.xml | Baixo | Os 2 sitemaps estão no robots.txt | Nada a fazer | — |

## Base técnica
| Problema | Impacto | Evidência | Correção | Prioridade |
|---|---|---|---|---|
| 22 imagens da home sem width/height | Médio (CLS) | Navegador: 39 imagens, 22 sem medidas | Pôr largura/altura em nova/home.html | 2 |
| calha.jpg com 230 KB | Baixo | Resposta de rede da home | Converter para WebP | 3 |
| Alvos de toque < 24 px na home | Médio (celular) | 32 no celular, 46 no computador | Aumentar a área dos links pequenos | 2 |
| Imagem lazy acima da dobra | Baixo | 1–2 por página nas 4 páginas novas | Tirar loading="lazy" do logo do cabeçalho | 3 |
| Canonical duplicado no post (mesmo valor) | Baixo | 2 tags iguais (tema do Blogger) | Nenhuma ação necessária | — |

## Página (on-page)
| Problema | Impacto | Evidência | Correção | Prioridade |
|---|---|---|---|---|
| Canibalização "eletricista em barueri" | Alto | GSC 28 dias: home pos. 7,7 (171 impr.), /p/eletricista pos. 6,9–11,2, versão ?utm do Perfil pos. 4,2, post 2026/05/eletricista-em-barueri-mestre-dos-reparos pos. 11,9 | Definir /p/eletricista-em-barueri.html como a página dessa busca: tirar "Eletricista" do começo do title da home e fazer o post de maio linkar para ela | 2 |
| Title da página de contrato com 68 caracteres | Baixo | Corta no Google (acima de 60) | Não ranqueia (pos. 39–83), então pode encurtar. Depende do Paulo, por causa da regra dos titles | 3 |
| Title do post com 32 caracteres e sem "Barueri" | Médio | "Manutenção Predial para Empresas" | Encurtar e localizar ao indexar. Depende do Paulo | 3 |
| H1 da home sem serviço e sem cidade | Médio | "Qualquer problema no imóvel. Um só time resolve." | Bloqueado pela regra do Paulo (não mudar H1). Só registro | — |
| Botão "Ligar" (tel:) na home | Alto (regra do negócio) | `<a class="btn tel" href="tel:+5511918390430" aria-label="Ligar">` | Remover de nova/home.html | 1 |

## Schema (lido renderizado)
| Problema | Impacto | Evidência | Correção | Prioridade |
|---|---|---|---|---|
| #empresa com tipos diferentes | Médio | Tema: Electrician+HomeAndConstructionBusiness; reformas: HomeAndConstructionBusiness+GeneralContractor; contrato: HomeAndConstructionBusiness | Nas páginas, só referenciar {"@id":".../#empresa"} sem redefinir o tipo | 2 |
| Nó da empresa na home sem @id | Médio | Electrician sem @id na home | Pôr @id #empresa na home | 2 |
| Formato de endereço e telefone diferentes | Baixo | "Avenida" x "Av."; "+55 11" x "+55-11" | Padronizar | 3 |
| Estrelas | OK | Home e eletricista com Product+AggregateRating; GSC: "Snippets de avaliação" PASS na home | Manter (regra do Paulo) | — |

## Conteúdo
2.400–2.700 palavras por página, engenheiro com CREA nomeado, fotos reais, data de revisão, FAQ, avaliações reais.
Sem achado crítico.

## Plano por prioridade
1. Pedir indexação do post e das versões novas (Search Console); tirar o tel: da home.
2. Resolver a canibalização de "eletricista em barueri"; padronizar o schema #empresa; medidas das imagens e
   alvos de toque da home.
3. Titles do contrato e do post (decisão do Paulo); WebP; lazy do logo.
