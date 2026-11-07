# Auditoria de skills: página Reformas (/p/reformas-residenciais-e-comerciais-em.html), 07/11/2026

Arquivos: texto.md (final), rascunho-v1.md (antes das revisões), schema.json. Gerador do schema: scratchpad/gen_schema_reformas.py (lê o FAQ do texto.md, então FAQPage = perguntas do texto). Nada publicado, Blogger não foi mexido.

Lido antes de escrever: ESTADO.md, guia-de-voz.txt, CLAUDE.md, modelo texto.md/schema.json do eletricista, plano-frontend-design.md, texto e HTML atuais da página.

## 1. Skill seo-content-brief (modo melhorar página existente)

Dados usados:
- OpenSEO get_serp_results (3 palavras-chave, celular, Brasil, 07/11): "empresa de reforma em barueri", "reforma de escritório barueri", "reforma de fachada predial em barueri".
- Top orgânico de "empresa de reforma em barueri": sosconstrucoes.com (1º), coteibem (diretório), ohub (diretório), Jotta/jreformas, rpmendes, Portal Reformas, Prates Engenharia. Pacote local: Jotta, RHL, Construtora Barueri, TC Reformas. Não aparecemos no top 15.
- Páginas baixadas (curl, contagem de palavras): sosconstrucoes 737 palavras, rpmendes 1.375, jreformas 2.294, Prates 1.710, Toppo 411. Nenhuma das 5 tem preço (0 ocorrências de "R$"), nenhuma cita CREA e nenhuma mostra caso de obra com problema e solução.
- GSC (do pedido): fachada predial pos. 74, escritório pos. 64, corporativa pos. 81, pedreiro pos. 42.

O que a skill apontou (resumo do brief):
- Intenção: transacional local (contratar empresa). O Google recompensa página de serviço + pacote local, com diretórios (ohub, coteibem, getninjas) no meio.
- Lacunas: (a) qualidade: concorrentes sem preço, sem responsável técnico, sem obra real; (b) tópico: "reforma de escritório" e "fachada predial" aparecem só em listas na página atual, sem seção própria; (c) profundidade: "pedreiro" só como lista de 48 atividades.
- Regra de relevância do site: tirar o que a empresa não sustenta com prova (exaustão de restaurante, galpão industrial, "relatório técnico de vistoria estrutural" = laudo, proibido).
- Ganho de informação: obra real da clínica do Centro de Barueri com fotos, preços de mão de obra de tabela e prazos médios das obras.
- Meta description de 130–150 caracteres pela skill; o pedido do Paulo é 140–155. Ficou com 153 (dentro do pedido).
- Esboço: hero + serviços (H3 por serviço) + obra real + residencial + comercial/escritório (H3 escritório e H3 fachada predial) + etapas + preço (tabela) + responsável técnico + avaliações + bairros + FAQ.

O que mudei por causa disso:
- A lista de 48 atividades e os 8 cartões com emoji saíram. Entraram 6 H3 de serviço com texto real; "Pedreiro e alvenaria" é o primeiro H3 (pos. 42 no GSC).
- Criados os H3 "Reforma de escritório em Barueri" e "Reforma predial e de fachada de condomínio" (buscas pos. 64 e 74).
- Criada a tabela "Quanto custa" (só valores da tabela do eletricista, que é publicada) e a tabela de prazos (7–15 / 10–20 / 30–60 dias, que já estavam no FAQ atual).
- Cortados: restaurante/exaustão, galpão industrial, relatório de vistoria, ar-condicionado no item de elétrica, a seção de hidráulica (agora só aparece dentro de banheiro e cozinha).
- Corrigida a cidade "Alphaville" na lista de cidades: Alphaville aparece só como bairro de Barueri.

## 2. Skill seo-content (revisão E-E-A-T e frases de IA)

O que a skill apontou:
- Script content_humanize.py: `"change_count": 0`, `"invisible_count": 0` (nenhuma frase típica de IA da tabela, nenhum caractere invisível). Rodado no rascunho e de novo no texto final: mesmo resultado.
- Métricas: 2.127 palavras no rascunho (piso de página de serviço: 800), frase média de 15 palavras (faixa 15–20), 11 links internos.
- Who/How/Why: Quem = engenheiro com CREA, UFRJ, 25 anos (ok). Como = obra real com foto (ok). Pela leitura de E-E-A-T, achei 5 afirmações no rascunho sem fonte nos arquivos, o que é risco de Trust (fato inventado):
  1. "Nesse ponto a obra parou um dia" (clínica): não existe na fonte.
  2. "pontos de água, esgoto e energia" da cadeira: a fonte diz só "capeamos os pontos".
  3. "você recebe foto do andamento pelo WhatsApp": não é processo confirmado.
  4. "circuito separado para os computadores" (escritório): não está na fonte.
  5. "Neste apartamento... refizemos parede e forro, portas, piso laminado": as fotos da galeria atual não estão ligadas a um mesmo apartamento.
- Experiência: a clínica não tem foto de "depois" no HTML atual. Não inventei: a seção mostra só Antes e Durante.

O que mudei:
- Os 5 trechos acima saíram ou foram reescritos só com o que a fonte diz. A galeria virou "Fotos de reformas de apartamento em Barueri", sem dizer que é o mesmo imóvel. O alt "Sala do mesmo apartamento" virou "Sala pronta... depois de reforma de apartamento em Barueri".
- Clientes (Bradesco, Bureau Veritas, Itaú, Coca-Cola FEMSA, PJ Bank, Armazena, MFA) citados como "manutenção predial", que é o serviço que foi feito. Não escrevi que eles fizeram reforma conosco.
- Avaliações: 1 parágrafo, nota 4,9, sem número de avaliações (o site troca sozinho).

## 3. Skill seo-geo (citabilidade para IA)

O que a skill apontou:
- Cerca de 44% das citações saem dos primeiros 30% da página: a resposta tem que vir logo no início de cada seção.
- Bloco de resposta autossuficiente: o trecho tem que funcionar sozinho, com a entidade nomeada ("a Mestre dos Reparos"), e não com "aqui" ou "nesta obra".
- Pontos fracos no rascunho: (a) "Serviços" começava sem dizer quantos e quais; (b) "Quanto custa" começava com uma negativa ("não tem preço fechado") e o número vinha só depois; (c) "Como funciona" dizia "São cinco etapas" sem dizer quais; (d) a clínica não nomeava a empresa; (e) 6 respostas do FAQ não tinham número (condomínio, sair de casa, material, escritório, arquiteto, entulho).
- Pontos fortes: tabelas de preço e de prazo, FAQ com pergunta como título, CREA e nome do engenheiro no hero, data de revisão visível.
- Robots e crawlers de IA: não refeitos (já auditados no site, como pedido).

O que mudei:
- "Serviços" abre com: "A Mestre dos Reparos faz seis tipos de serviço de reforma em Barueri: ...".
- "Quanto custa" abre com: "O orçamento de reforma na Mestre dos Reparos é gratuito. Serviço abaixo de R$ 700 é orçado só pelas fotos no WhatsApp...".
- "Como funciona" abre com as 5 etapas nomeadas e os 90 dias de garantia.
- Clínica: "Nesta obra da Mestre dos Reparos, um antigo consultório...".
- As 11 respostas do FAQ agora têm número (todos tirados do próprio texto: prazos, R$ 60, R$ 700, 90 dias, CREA, etapa 5). Checado por script: 0 respostas sem número, todas com 2–4 frases.
- A pergunta do FAQ "Quanto custa uma reforma em Barueri?" repetia o H2. Virou "Quanto custa uma reforma completa em Barueri?" (era a pergunta da página antiga).

## 4. Skill seo-schema (JSON-LD)

O que a skill apontou:
- FAQPage não gera mais resultado rico no Google (desde 07/05/2026). É Info, não erro: fica porque o pedido manda e ajuda a IA a ler.
- Só dados verdadeiros. URLs absolutas. Datas ISO. Sem avaliação inventada.
- Service, WebPage, Person, BreadcrumbList e LocalBusiness estão ativos.

O que fiz:
- @graph com 7 nós: empresa (#empresa, tipo HomeAndConstructionBusiness + GeneralContractor, que é o subtipo de reforma/obra), Person #paulo-valadao (UFRJ, SENAI, CREA 141129611802, NR-10, 25 anos; knowsAbout trocado para reforma), WebSite #site, WebPage (#webpage, com reviewedBy, lastReviewed 2026-11-07, datePublished 2026-10-11T02:12:41-03:00 tirado do Blogger), Service #servico (OfferCatalog com os 9 serviços dos H3), FAQPage #faq (11 perguntas, geradas a partir do texto.md), BreadcrumbList.
- Validado por script: `'ggregateRating' not in s` (sem AggregateRating), 0 URLs relativas, perguntas do FAQPage iguais aos H3 do texto (`FAQ igual: True`).
- Imagens do schema: as 3 URLs reais da clínica que já estão no HTML atual.
- Observação: o nó da empresa mantém o "telephone" que está no schema aprovado do eletricista (mesmo NAP do Perfil do Google). No texto não existe telefone, "ligue" nem tel:. Se o Paulo quiser, dá para tirar.

## Checagem das regras do Paulo (script no texto final)
- H1 e title iguais aos atuais. URL igual.
- Proibidos (excelência, solução completa, câmera, ar-condicionado, ventilador, laudo, AVCB, encanador, marido de aluguel, tel:, ligue, " · ", "Barueri e Alphaville", relatório): 0 ocorrências no corpo. A palavra "ligar" só aparece no comentário de cabeçalho ("Nenhum botão de ligar"), igual ao modelo do eletricista.
- 25 anos (único valor). Alphaville sempre como bairro.
- Fotos: 3 URLs da clínica do HTML atual; demais de fotos/reformas, fotos/obras, fotos/equipe. Nenhuma foto da raiz de fotos/.
- Links de bairro e cidade: as /p/reforma-* fazem 301 para o hub (conferido com curl em 07/11: centro, alphaville, cotia → 301). Por isso o link vai direto para o hub #bairros e #cidades, que são as únicas âncoras que existem lá. Os outros 9 links internos responderam 200.
