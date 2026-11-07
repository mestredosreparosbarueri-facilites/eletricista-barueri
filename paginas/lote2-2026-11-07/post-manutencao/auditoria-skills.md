# Auditoria de skills: post "Manutenção Predial para Empresas" (07/11/2026)
Arquivos: texto.md, schema.json, brief.md (saída completa da seo-content-brief). Nada publicado.
Ordem chamada pela ferramenta Skill nesta tarefa: seo-content-brief → (escrita) → seo-content → seo-geo → seo-schema.

## 1. seo-content-brief (modo melhorar existente, tipo artigo)
Fonte: WebSearch 07/11 ("manutenção predial em Barueri Alphaville empresa" e "como escolher empresa de manutenção predial checklist preventiva NBR 5674"). Concorrentes NÃO foram lidos na íntegra (pontuações estimadas, ditas como estimativa no brief).
Trechos do que apontou:
- "SERP traz diretórios (Ohub, GuiaTelefone), vagas (Indeed, InfoJobs) e 1 empresa local (GOES Facilities, Alphaville Industrial); para 'como escolher / checklist / NBR 5674' a SERP é de guias longos (Sienge, Produttivo, SíndicoNet)."
- "Topic gap: ninguém cruza checklist por TIPO de prédio comercial."
- "Topic gap: ninguém fala do que exigir em contrato com olhar de quem executa."
- "Depth gap: NR-10 aparece só como sigla."
- "Conteúdo atual do post: é página de serviço (canibaliza), cita ar-condicionado e laudo (proibidos), logos repetidos 2x, '15 anos' (errado: 25), responsável técnico sem nome."
- Esboço com 10 H2 + FAQ, alvo ~1.900 palavras, link principal "contrato de manutenção predial em Barueri".
O que mudei: texto refeito como guia seguindo o esboço; tirei ar-condicionado, laudo, "15 anos" e botão/linha de telefone; clientes citados 1 vez; autor com nome e CREA; data, tempo de leitura e sumário com âncoras.
Divergência registrada: a skill pede meta de 130–150 caracteres; a regra da tarefa é 140–155. Meta ficou com 147 (atende as duas). Title não foi alterado (regra do Paulo), embora a skill sugira 50–60 caracteres.

## 2. seo-content (após a escrita)
Script content_humanize.py (JSON): {"change_count": 0, "invisible_count": 0} → nenhuma frase típica de IA da tabela e nenhum caractere invisível.
Métricas calculadas: 46 frases nos parágrafos, média 16,2 palavras por frase (faixa da skill: 15–20). 6 links internos, 0 externos.
O que a análise apontou (critérios da skill):
- Experiência: o exemplo do quadro era genérico ("um exemplo que vemos com frequência") sem ligar à foto real.
- Frases de efeito/staccato: "Não é a obra grande. É o cuidado contínuo que evita a obra grande." e "O contrato é o que transforma a conversa em compromisso."
- Sem citação externa: normas citadas só pelo nome. Tentei link oficial da NR-10 (gov.br): BLOQUEADO na rede desta sessão (getaddrinfo ENOTFOUND www.gov.br). Mantive só o nome das normas.
- Quem/Como/Por quê: Quem = byline com CREA (ok); Por quê = guia para gestor decidir (ok).
O que mudei: o exemplo agora descreve a foto real (fuligem atrás dos disjuntores durante a medição com alicate amperímetro) e o alt foi reescrito; as duas frases de efeito saíram.
Pontuação (heurística da skill, não do Google): Conteúdo 80/100 — Experiência 13/20, Expertise 21/25, Autoridade 16/25, Confiança 26/30.

## 3. seo-geo
- robots.txt do site (lido 07/11): "User-agent: * / Allow: /" → Googlebot, OAI-SearchBot, Claude-SearchBot e PerplexityBot liberados (busca); GPTBot, ClaudeBot e Google-Extended também liberados (treino). /search está bloqueado.
- Definição nas primeiras 60 palavras: SIM ("Manutenção predial para empresas é o cuidado programado...").
- Apontou (clareza de entidade): a marca "Mestre dos Reparos" não aparecia no corpo do texto.
- Apontou (passagens respondíveis): 4 seções abriam sem resposta direta: checklist por tipo de prédio, frequência, normas e como escolher.
O que mudei: marca incluída na abertura e na seção de Alphaville; abertura de resposta direta nessas 4 seções (ex.: "Em empresas, a manutenção preventiva costuma ser mensal ou trimestral, com os quadros elétricos revisados em toda visita"; "Quatro normas orientam a manutenção predial em empresas: a NR-10, do Ministério do Trabalho, e três normas técnicas da ABNT..."). Para voltar a ficar abaixo de 2.200 palavras, cortei 4 frases que repetiam ideias.
Não medido: visibilidade real no ChatGPT/Perplexity/AI Overviews (sem ferramenta nesta tarefa).

## 4. seo-schema
- Schema publicado hoje no post (lido 07/11): BlogPosting do Worker (datePublished 12:54:00, autor sem @id, imagem do blogger_img_proxy) + um @graph dentro do post com BreadcrumbList "Início > Serviços B2B > ..." e um HomeAndConstructionBusiness repetindo #empresa com outro logo (base44).
- Apontou: FAQPage não gera mais resultado rico no Google (desde 07/05/2026) — mantido só como dado estruturado coerente com o texto, sem expectativa de estrela/FAQ na busca.
- Gerado schema.json: @graph com BlogPosting (@id #artigo; author → #paulo-valadao; publisher → #empresa; datePublished 2026-10-07T12:54:58-03:00 do campo published da API; dateModified 2026-11-07; mainEntityOfPage; 4 ImageObject do CDN com HTTP 200 conferido), FAQPage com as 8 perguntas idênticas ao texto (validado por script), BreadcrumbList Início > Blog > post. Sem AggregateRating (conferido por assert).
- Pendências para quem publicar: (a) tirar o @graph antigo de dentro do post (breadcrumb "Serviços B2B" e o HomeAndConstructionBusiness duplicado) e o BlogPosting antigo do Worker para este post, para não haver 2 BlogPosting; (b) o item "Blog" aponta para /search, que o robots.txt bloqueia — não quebra o breadcrumb, mas, se existir uma página de índice do blog fora de /search, troque.
