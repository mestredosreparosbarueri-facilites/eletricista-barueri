# Lote 2 (07/11) — auditoria da publicação
Páginas: /p/reformas-residenciais-e-comerciais-em.html, /p/contrato-de-manutencao-para-empresas.html, /2026/10/manutencao-para-empresas.html
Backups antes: backups/lote2-antes-2026-11-07/*.json

## frontend-design (plano ANTES do código): plano-frontend-design.md
## Conteúdo (3 agentes): seo-content-brief, seo-content, seo-geo, seo-schema — ver */auditoria-skills.md
## web-design-guidelines (104 regras de vercel-labs/web-interface-guidelines, conferidas por script no conteúdo novo; cabeçalho/rodapé/scripts já revisados na página do eletricista)
- ACHADO: 3 fotos da clínica sem width/height (CLS) -> corrigido (720x1292 medidos).
- ACHADO: widget "Dê sua nota" sem função fora de início/eletricista -> removido nas 3.
- OK: 1 H1, sem salto de heading, âncoras do sumário com destino, scroll-margin, text-wrap, tabular-nums, prefers-reduced-motion, sem transition:all, sem "...".
## Publicada — verificação (Playwright 1920/1366/390): left 0, sem rolagem lateral, 1 H1 igual ao anterior, 0 tel:, 0 imagens quebradas em 1366/390 (1920 = CDN frio no 1º acesso, conferido com curl: todas 200).
## Worker: meta description própria (1 só, tema removido), og:image com foto real, BlogPosting do tema removido no post (fica o @graph). Estrelas: início e eletricista continuam com Product+AggregateRating.
## seo-page (publicada):
- reformas: title 63 (mantido, regra do Paulo), desc 153, metadata_template templated=False, H2 10/H3 30, 3.000 palavras, Flesch PT ~66, canonical próprio, OG/Twitter completos, 9 imagens com alt e dimensões.
- contrato: title 68 (mantido), desc 153, templated=False, H2 10/H3 25, 2.927 palavras, Flesch ~54, canonical próprio, 7 imagens ok.
- post: title 32 (mantido), desc 147, templated=False, H2 11/H3 14, 2.864 palavras, Flesch ~58, canonical próprio, 5 imagens ok.
- 33 links internos das 3 páginas: todos 200.
