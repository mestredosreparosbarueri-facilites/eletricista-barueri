# Auditoria Ahrefs: mestredosreparos.app.br (2026-11-14)

Fonte: somente ferramentas MCP da Ahrefs. Nenhuma alteração feita na conta.

## O que a conta permite

Fonte: `subscription-info-limits-and-usage`

| Campo | Valor |
|---|---|
| subscription | Free, billed monthly |
| units_limit_workspace | 0 |
| units_usage_workspace | 0 |
| units_limit_api_key | 200000 |
| units_usage_api_key | 0 |
| usage_reset_date | 2026-11-30T00:00:00Z |
| api_key_expiration_date | 2036-10-20T01:09:59Z |

Na prática, todas as ferramentas de Site Audit e Site Explorer testadas retornaram "Insufficient plan" (ver Erros da ferramenta). Só `public-domain-rating-free` e `subscription-info-limits-and-usage` funcionaram.

## Site Audit

- `site-audit-projects`: erro "Insufficient plan". Não foi possível listar projetos.
- `site-audit-issues` e `site-audit-page-explorer`: não executadas, porque exigem `project_id` e nenhum projeto pôde ser listado.
- Issues por gravidade: sem dados.

## Autoridade e backlinks

- DR (gratuito), fonte `public-domain-rating-free`: **3.0**
- `site-explorer-domain-rating` (DR + Ahrefs Rank): erro "Insufficient plan".
- `site-explorer-backlinks-stats` (backlinks / domínios de referência): erro "Insufficient plan".
- `site-explorer-referring-domains` (lista de domínios de referência): erro "Insufficient plan". Lista indisponível.

## Palavras e páginas

- `site-explorer-metrics` (palavras orgânicas, tráfego, org_cost): erro "Insufficient plan".
- `site-explorer-organic-keywords` (BR): erro "Insufficient plan".
- `site-explorer-top-pages` (BR): erro "Insufficient plan".

## Comparação de DR

Fonte: `public-domain-rating-free` (versão padrão dr3, consulta de 2026-11-14)

| Domínio | DR |
|---|---|
| getninjas.com.br | 69.0 |
| eletricistapertodemim.adrianoeletricista.com.br | 25.0 |
| mestredosreparos.app.br | 3.0 |
| electrikmente.com.br | 0.1 |
| fageletrica.com.br | 0.1 |
| eletricistaembarueri.com.br | 0.0 |

## Erros da ferramenta

Todas as chamadas abaixo retornaram exatamente:
`The MCP server returned HTTP 400 for this tool call. Server error detail: { "error": "Insufficient plan" } (error code -32001)`

| Tool | Parâmetros |
|---|---|
| site-audit-projects | (sem parâmetros) |
| site-explorer-domain-rating | target=mestredosreparos.app.br, date=2026-11-14 |
| site-explorer-backlinks-stats | target=mestredosreparos.app.br, date=2026-11-14, mode=subdomains |
| site-explorer-metrics | target=mestredosreparos.app.br, date=2026-11-14, mode=subdomains, country=BR |
| site-explorer-referring-domains | target=mestredosreparos.app.br, mode=subdomains, limit=100 |
| site-explorer-organic-keywords | target=mestredosreparos.app.br, date=2026-11-14, country=BR, mode=subdomains, limit=50 |
| site-explorer-top-pages | target=mestredosreparos.app.br, date=2026-11-14, country=BR, mode=subdomains, limit=20 |

Não executadas (dependem de `project_id`): site-audit-issues, site-audit-page-explorer.
