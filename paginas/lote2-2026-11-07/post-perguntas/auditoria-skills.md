# Auditoria de skills: post "Perguntas e Respostas sobre Elétrica em Barueri" (07/11/2026)
Arquivos: texto.md, schema.json, brief.md (saída da seo-content-brief), gera_schema.py (gera o schema lendo o texto.md). Nada publicado.
Ordem chamada pela ferramenta Skill nesta tarefa: seo-content-brief → (escrita) → seo-content → seo-geo → seo-schema.

## 1. seo-content-brief (modo melhorar existente, tipo artigo)
Dado (OpenSEO get_keyword_metrics, projeto 751b5d0d, Brasil, 07/11, 5 palavras testadas):
- "problemas elétricos residenciais": 10 buscas/mês, KD 48, informacional.
- "dúvidas de elétrica", "perguntas sobre elétrica", "dúvidas elétrica residencial", "perguntas e respostas elétrica": SEM dado de volume (OpenSEO não retornou linha).
SERP mobile (get_serp_results 07/11): AI Overview, People Also Ask, vídeos e vídeos curtos nas 3 leituras; orgânicos de fabricante/seguradora/blog (krausmuller, foxlux, alugagera, segurosunimed, atilux, sindiconet, enelx).
Trechos do que apontou:
- "Topic gap: ninguém dá preço de mão de obra junto do problema."
- "Depth gap: 'disjuntor desarmando' aparece sem a conta (chuveiro 7.500 W em 220 V ≈ 34 A num disjuntor de 32 A)."
- "Quality gap: nenhum tem autor engenheiro identificado nem caso real com foto."
- "Post atual: cita ar-condicionado (seção inteira) e laudo (proibidos), 'mais de 20 anos' (errado: 25), banners 'Chame agora', 139 perguntas repetidas (disjuntor do chuveiro aparece em 3 seções)."
- Slug: a skill pede a palavra-chave no slug. Sugestão: /2026/11/problemas-eletricos-residenciais-perguntas.html. Mantive o endereço da tarefa no schema (decisão de quem publica).
O que mudei: palavra-chave no title, meta, 1ª frase do texto, 1 parágrafo de H2 e no H2 do FAQ final (H1 não mudou). 139 perguntas → 47, agrupadas em 7 H2 de tema; tirei ar-condicionado, laudo, "20 anos", botões "Chame agora" e a seção de "diferenciais" com emoji. Preço só da tabela 2026 da página do eletricista. Notas de concorrentes são estimativa por snippet (páginas não lidas na íntegra).
Divergência: skill pede meta de 130–150; tarefa pede 140–155 → meta com 148 (atende as duas).

## 2. seo-content (depois da escrita)
Script content_humanize.py: {"change_count": 0, "invisible_count": 0} na 1ª versão e na final → nenhuma frase típica de IA da tabela, nenhum caractere invisível.
Métricas da 1ª versão: 3.664 palavras, 49 perguntas, 210 frases, média 14,1 palavras por frase, 3 frases com mais de 30 palavras, 9 links internos (8 destinos).
O que apontou:
- Tamanho acima do alvo da tarefa (3.664 > 3.500).
- 5 primeiras frases com mais de 25 palavras (quadro antigo, fiação velha, lâmpada queimando, quando chamar, quem pode mexer).
- 2 perguntas fracas/sobrepostas: "Chuveiro 220 V em 127 V" (pouca busca, resposta óbvia) e "Interruptor esquentando" (repete tomada esquentando).
- Termos da lista proibida da tarefa: "religue" e "Ligar o fio terra" (contêm ligue/Ligar).
- Experiência: 2 casos reais (tomada derretida na Aldeia da Serra, apartamento sem DPS no Acqua Park Barueri) com foto; ok.
- Sem link externo: normas citadas só pelo nome (NBR 5410, NR-10).
- "Casa com mais de 25 anos" podia confundir com o número dos 25 anos de experiência.
O que mudei: cortei as 2 perguntas (o preço do chuveiro foi para a pergunta do choque), encurtei as introduções de H2 e frases redundantes, quebrei as frases longas, troquei "religue" por "volte a conectar" e "Ligar o fio terra" por "Conectar o fio terra", troquei "mais de 25 anos" por "casa antiga". Respostas com mais de 4 frases (6 casos) reduzidas para no máximo 4.
Pontuação (heurística da skill, não do Google): Conteúdo 78/100 — Experiência 14/20, Expertise 21/25, Autoridade 15/25, Confiança 28/30.

## 3. seo-geo
- robots.txt (lido 07/11): "User-agent: * / Disallow: /search / Allow: /" → busca: Googlebot, OAI-SearchBot, Claude-SearchBot e PerplexityBot liberados. Treino: GPTBot, ClaudeBot, Google-Extended também liberados. /llms.txt responde 301 (sem peso na nota).
- Definição nas primeiras 60 palavras: SIM ("Os problemas elétricos residenciais mais comuns são disjuntor desarmando, tomada esquentando, luz piscando, choque no chuveiro e fiação antiga.").
- Apontou (passagem autossuficiente): 8 respostas abriam só com "Sim."/"Não."/"Pode."/"Pouco," — trecho citado fora de contexto fica sem sujeito.
- Apontou: 3 H2 (Iluminação, Emergências, Quando chamar) começavam direto no H3, sem frase de resposta.
- Marca "Mestre dos Reparos" no corpo: 3 vezes (ok). 28 de 47 respostas trazem número.
O que mudei: as 8 respostas agora repetem o assunto na 1ª frase (ex.: "Sim, religar o disjuntor várias vezes seguidas é perigoso."; "Sim, o Mestre dos Reparos atende em Alphaville, que é bairro de Barueri..."); 1 frase de resposta direta nos 3 H2 (ex.: "Em Barueri, o atendimento de um eletricista começa em R$ 150 no Mestre dos Reparos, em horário comercial."). Cortei 3 trechos para voltar abaixo de 3.500 palavras.
Não medido: visibilidade real no ChatGPT/Perplexity/AI Overviews (sem ferramenta nesta tarefa).

## 4. seo-schema
Schema publicado hoje na URL antiga (lido 07/11): #empresa (Electrician + HomeAndConstructionBusiness); BlogPosting sem @id, headline antigo e image do blogger; FAQPage com 131 perguntas (texto antigo, cita WhatsApp e "avalia gratuitamente"); BreadcrumbList "Início > Eletricista em Barueri > ..." com item contendo ESPAÇO na URL (URL inválida).
Apontou: FAQPage não gera mais resultado rico no Google (desde 07/05/2026) — mantido só como dado coerente com o texto; FAQ antigo não bate com o texto novo; URL com espaço no breadcrumb.
Gerado schema.json por script (gera_schema.py lê o texto.md): BlogPosting (@id #artigo; author → #paulo-valadao; publisher → #empresa; datePublished 2026-05-22T14:40:25-03:00; dateModified 2026-11-07; mainEntityOfPage = URL nova; 4 ImageObject do jsdelivr com HTTP 200 conferido; wordCount); FAQPage com as 47 perguntas idênticas aos H3 e resposta = parágrafo da resposta sem markdown; BreadcrumbList Início > Blog > post. Asserts no script: sem AggregateRating, todas as URLs absolutas https sem espaço, nº de perguntas = nº de H3.
Pendências para quem publicar: (a) 301 da URL antiga (com espaço) para a nova; (b) remover do post o FAQPage de 131 perguntas e o breadcrumb antigo, e o BlogPosting do Worker para esta URL, para não haver 2 BlogPosting; (c) "Blog" aponta para /search, bloqueado no robots.txt (não quebra o breadcrumb).
