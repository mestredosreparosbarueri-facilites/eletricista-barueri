# PREMISSA MÁXIMA (Paulo, 20/11/2026) — vale acima de todas as outras regras

**NUNCA entregar ao Paulo nada faltando, com defeito ou que eu não saiba.**
- Antes de entregar qualquer planilha, cadastro, anúncio ou resposta: conferir TODOS os campos. Se faltar um dado, se algo estiver errado ou se eu não tiver certeza, NÃO entregar como pronto.
- Primeiro buscar o dado em todas as fontes (notas fiscais, Bling, FluxoPro, ML, Amazon, Google). Se ainda faltar, dizer exatamente o que falta e o que preciso dele, ANTES de entregar.
- Nunca chamar de "pronto", "completo" ou "certo" o que não foi verificado item por item.

# Regras do Paulo (Mestre dos Reparos) — valem em toda sessão

- Responder sempre em português do Brasil.
- **JAMAIS mentir ou tentar manipular o Paulo.**
- **NUNCA afirmar nada sem fonte ou prova.** Toda afirmação cita de onde veio (API, log, print, arquivo, skill). Dedução ou suposição é marcada como "suposição, não verificado". Se não souber, dizer "não sei" ou "não conferi". O Paulo sempre vai perguntar a fonte.
- **NUNCA fazer ou mexer em NADA sem: (1) aprovação de uma skill, plugin, conector ou repositório — EXECUTADA de verdade (Skill tool), não "critérios de cabeça" — E (2) aprovação final do Paulo.** Mostrar o resultado de cada skill antes. Evitar mexer toda hora (oscilação no Google).
- Dizer exatamente quais skills foram executadas e com qual texto. Nunca escrever "aprovado pelas skills" se a skill não rodou com aquele texto.
- Título da home definido em 15/11/2026 (passou pelas 3 skills + aprovação do Paulo): `Em Barueri | Reformas, Eletricista e Limpeza: um time só`. Não mexer antes da medição de 21/11/2026.
- **Decisão do Paulo (15/11/2026): a home é multisserviço ("um time só") e DEVE aparecer em todas as disciplinas** (elétrica, hidráulica, marido de aluguel, manutenção, limpeza), independentemente das páginas de cada assunto. Não tratar home x páginas de serviço como "canibalização/briga": as duas aparecerem juntas no Google é desejado. Medir pelo Search Console (página por busca).
  - **Prova (API do Search Console, 15/11/2026):** busca "eletricista em barueri", 17/10–13/11: total da busca = 281 impressões / 30 cliques; soma das páginas = 403 impressões / 31 cliques em 13 páginas. Soma > total = várias páginas do site apareceram juntas na mesma pesquisa. As páginas **se somam, não se dividem**.
- Estado completo e demais regras: `ESTADO.md` do pacote essencial (scratchpad).

# Mestre dos Reparos — contexto para o Claude

## Idioma
Todas as respostas, relatórios e textos devem ser em **português do Brasil**.

## Site principal
- https://mestredosreparos.app.br
- Hospedado no **Blogger**: não há acesso a servidor, `.htaccess` nem plugins de CMS. Mudanças são feitas no tema/HTML do Blogger (e no Worker da Cloudflare na frente do domínio).
- Recomendações técnicas de SEO devem ser possíveis dentro dessas limitações (Blogger + Cloudflare).

## Negócio
- Serviços elétricos (residencial e predial) e reformas.
- Área de atendimento: Barueri — incluindo os bairros Alphaville, Tamboré e Aldeia da Serra — e também Jandira, Itapevi e Santana de Parnaíba.
- Alphaville, Tamboré e Aldeia da Serra são bairros/regiões de Barueri: não tratar como cidades separadas.

## Plugin de SEO
- Plugin `claude-seo` (marketplace `agricidaniel-claude-seo`, repositório oficial AgriciDaniel/claude-seo), habilitado em `.claude/settings.json`.
