# Contexto: Mestre dos Reparos (Barueri-SP)

Levantado em 14/11/2026. Cada fato tem a fonte. Abreviações das fontes:
- [HOME] = https://www.mestredosreparos.app.br/ (texto visível e `ld+json`, curl 14/11; fonte no repo: `nova/home.html`)
- [ELE] = https://www.mestredosreparos.app.br/p/eletricista-em-barueri.html (curl 14/11)
- [LLMS] = https://www.mestredosreparos.app.br/p/llms.html (destino do 301 de /llms.txt) e `llms.txt` do repo
- [WK] = `cloudflare/worker.js`
- [EST] = ESTADO.md da sessão (scratchpad), com a data da anotação
- [REGRAS] = regras do Paulo registradas no log desta sessão (`/root/.claude/projects/-home-user/46e585c4-….jsonl`), com a data

## O que a empresa faz
- Empresa multisserviços em Barueri: elétrica residencial e predial, hidráulica, reformas de apartamento, banheiro e cozinha, pintura, forro de drywall, pisos e revestimentos, marido de aluguel, limpeza (diarista, pós-obra e pós-mudança) e contratos para empresas. [HOME, FAQ "Quais serviços…"]
- Carro-chefe de SEO: eletricista em Barueri. Página hub `/p/eletricista-em-barueri.html` (title "Eletricista em Barueri | Atendimento 24 Horas"). [ELE]
- Também vende material elétrico e ferramentas na loja online https://lojamestredosreparos.com/ (5% OFF no Pix, entrega em Barueri e região, retirada no Jardim Belval, "Levou o material? 5% OFF na instalação"). [HOME] Links para a Loja são fonte de receita, não "vazamento". [EST]

## Catálogo de serviços (schema `#empresa` → OfferCatalog) [HOME ld+json]
- Elétrica: eletricista em Barueri, residencial, predial, manutenção elétrica, emergencial 24h, troca de disjuntores, troca de quadro, tomadas e interruptores, tomada aquecendo, cabos aquecendo, disjuntor/disjuntor geral/DR desarmando, chuveiro desarmando/queimando resistência, instalação de chuveiro, circuitos para cozinha, luz piscando, lustres e pendentes, curto-circuito.
- Hidráulica: encanador em Barueri.
- Reformas: residenciais e comerciais, em geral, apartamento, banheiro, cozinha, predial.
- Pintura, forro e drywall; pisos e revestimentos; marido de aluguel.
- Limpeza: diarista com agendamento, pós-obra, pós-mudança.
- Empresas e condomínios: manutenção predial, contrato de manutenção, contrato de limpeza, contratos corporativos B2B, eletricista para condomínios.

## Quem compra
- Casa, apartamento, condomínio e empresa. [ELE: "Atendemos casa, apartamento, condomínio e empresa"]
- Empresas, condomínios e galpões (contratos de manutenção predial e de limpeza). [HOME, FAQ empresas]
- Público que interage nas redes: mulheres 35-64 (maior faixa mulher 45-54), homens 18-34. [EST 04/11, Replin]
- Leads do site chegam pelo WhatsApp: 18 cliques em 28 dias até 31/10 (10 orgânico, 4 Ads, 4 outros). [EST, GA4]

## Área atendida
- Todos os bairros de Barueri, incluindo Alphaville, Tamboré e Jardim Belval (sede), além de Santana de Parnaíba, Aldeia da Serra, Jandira, Itapevi e Carapicuíba. Reformas também em Cotia e Osasco. [HOME, FAQ "Quais regiões…"]
- `areaServed` do schema: cidades Barueri, Santana de Parnaíba, Jandira, Itapevi, Carapicuíba, Cotia, Osasco; locais Alphaville, Tamboré, Aldeia da Serra, Jardim Belval. [HOME ld+json]
- Hub elétrico linka 38 bairros + 4 cidades. [EST 07/11]
- Obs.: Carapicuíba foi removida do Google Ads (07/11), mas continua como área no site. [EST 07/11]

## Horários
- Site e schema: 24 horas, todos os dias (`openingHoursSpecification` 00:00-23:59, seg-dom). [HOME ld+json; LLMS "24 horas, todos os dias, inclusive fins de semana e feriados"; ELE "Atendimento 24/7"]
- Preço muda por horário: mínimo R$ 150 em horário comercial, R$ 250 à noite/domingo/feriado, R$ 350 depois das 22 h. [ELE]
- (Interno, não é horário do site) Google Ads Obras roda seg-sáb 7-20h. [EST 07/11]

## Canais de contato
- WhatsApp (11) 91839-0430 → https://wa.me/5511918390430 (canal principal: "mande uma foto ou vídeo do problema e o bairro"). [HOME FAQ; LLMS]
- E-mail: mestredosreparosbarueri@gmail.com. [HOME ld+json; LLMS]
- Agendamento online (https://mestre-reparos.base44.app/Agendamento) e calculadora de preços (base44). [HOME; `scratchpad/blog/aplicar.py`]
- Redes (`sameAs`): instagram.com/mestredosreparosfacilites, facebook.com/profile.php?id=61587382650217, youtube.com/@mestredosreparos-i9d, tiktok.com/@mestre.dos.reparo1. [HOME ld+json]
- Telefone aparece só como número no schema/textos; não há atendimento por ligação (ver Limites). Botões "Ligar agora" e links `tel:` foram removidos. [EST 07/11]

## Preços publicados (só mão de obra; material à parte) [ELE, tabela e FAQ, curl 14/11]
| Serviço | Preço |
|---|---|
| Mínimo por atendimento, horário comercial | R$ 150 |
| Mínimo à noite, domingo e feriado / depois das 22 h | R$ 250 / R$ 350 |
| Trocar tomada ou interruptor | R$ 60 |
| Tomada de 20 A | R$ 80 |
| Trocar disjuntor / disjuntor geral | R$ 110 / R$ 180 |
| Instalar DR / DPS | R$ 200 / R$ 200 |
| Trocar resistência do chuveiro / instalar chuveiro | R$ 100 / R$ 140 |
| Luminária ou spot / pendente / plafon / painel LED | R$ 100 / R$ 120 / R$ 100 / R$ 110 |
| Diagnóstico de curto-circuito | R$ 200 |
| Circuito exclusivo até 15 m | R$ 380 |
| Passagem de fio avulsa | R$ 15/m |
| Ponto de tomada / ponto de luz / ponto de luz com interruptor | R$ 60 / R$ 80 / R$ 90 |
| Revisão elétrica da casa (~3 h) | R$ 320 |
| Revisão com reaperto do quadro / inspeção e reaperto (empresa, por quadro) | R$ 180 |
| Identificar circuitos do quadro | R$ 150 |
| Ligar cooktop / forno de embutir / torneira elétrica | R$ 160 / R$ 140 / R$ 110 |
| Luminária tubular de garagem (condomínio) | R$ 90 |
| Diária de eletricista (8 h) | R$ 550 |
| Troca do quadro de distribuição | visita técnica (~5 h) |
- Regra comercial publicada: abaixo de R$ 700 marca a execução direto, sem visita; acima disso, ou troca de quadro, visita técnica antes. [ELE; igual a EST 02/11]
- Formas de pagamento: Pix, cartão, dinheiro. `priceRange` "$$". [HOME ld+json]
- Não há preço publicado de reformas, pintura, limpeza ou contratos (não encontrado em [HOME]; páginas de reforma/contrato não conferidas nesta rodada).

## Diferenciais e afirmações feitas no site
- Responsável técnico: Eng. Paulo Henrique Valadão, engenheiro eletricista (UFRJ), CREA 141129611802; técnico em Eletrotécnica e em Refrigeração (SENAI); NR-10, NR-10 SEP, NR-12, NR-33, NR-6; FGV no `alumniOf`. [HOME FAQ e ld+json Person]
- "25 anos de campo e gestão de manutenção" (único valor válido de experiência). [HOME; REGRAS 07/11]
- Nota fiscal em todos os serviços e garantia de 90 dias na mão de obra, por escrito (CDC); peça com garantia do fabricante; se o problema voltar no prazo, refaz sem cobrar mão de obra. [HOME FAQ; ELE FAQ]
- "Equipe própria e sem terceirizar". [ELE] "Equipe própria de eletricistas, encanadores, pedreiros, pintores e diaristas". [LLMS]
- Google: 4,9 ★ com 36 avaliações (consulta de 07/11, número atualizado pelo Worker via KV `rc`). [HOME; ELE; WK `Contagem`]
- Avaliações no próprio site: 5,0 de 5, 7 votos (schema Product/AggregateRating). [HOME ld+json, 14/11]
- Clientes citados: Bradesco e Bureau Veritas (Alphaville), Itaú e Coca-Cola FEMSA (Barueri), PJ Bank, Armazena (Itapevi), MFA Transportes. [ELE] Paulo autorizou citar PJ Bank, Armazena e MFA. [REGRAS 07/11]
- Caso real publicado: apartamento novo no Acqua Park Barueri sem DPS no quadro; DPS instalado (R$ 200 de mão de obra). [ELE]
- Processo: foto no WhatsApp → preço; no dia desliga o circuito, faz, testa na frente do cliente, deixa limpo; NF + 90 dias. [ELE]
- Mídia: matéria na Band (31/10) com 4 links dofollow para a home. [EST]
- Selo "Empresa regularizada · CNPJ ativo · Responsável técnico" e "CNPJ e Inscrição Estadual ativos". [LLMS/p/llms.html; WK `SELO`]

## Limites (o que NÃO faz / não oferece)
- Não atende por telefone: não há mão de obra para atender ligação; leads vão para a IA do WhatsApp. Nunca sugerir ligação. [EST 07/11]
- Encanador NÃO é prioridade: não propor, não monitorar, não criar conteúdo/ads de encanador (o serviço continua no catálogo). [EST 02/11]
- Não confirma horário genérico ("horário a confirmar" proibido). [EST 02/11]
- Material não está incluído nos preços (só mão de obra); km é custo interno, não cobrado. [ELE; EST 03/11]
- O site não declara serviços recusados; nenhum "não fazemos" foi encontrado em [HOME]/[ELE] (busca por texto 14/11).

## Dados da empresa
- Nome: Mestre dos Reparos Manutenção & Limpeza (alternateName "Mestre dos Reparos"). [HOME ld+json]
- Razão social (legalName): Maria Eduarda Hengles Valadão. CNPJ 64.521.657/0001-87. [HOME ld+json]
- Endereço/sede: Av. Henrique Gonçalves Baptista, 2245, Jardim Belval, Barueri/SP, CEP 06420-130; geo -23.518991, -46.902077. [HOME ld+json; HOME rodapé]
- Tipo no schema: Electrician + HomeAndConstructionBusiness (`@id` …/#empresa). [HOME ld+json]
- Categoria principal no Perfil do Google trocada para "Serviço de instalação elétrica" (electrical_installation_service) em 07/11. [EST]

## Concorrentes
- Ainda não levantados (Setup passo 3). Pista: 6 líderes locais usam a categoria "Serviço de instalação elétrica". [EST 07/11]

## Regras do dono (Paulo) que afetam SEO
1. Site congelado e SEM páginas novas desde 02/11, até ordem explícita do Paulo (vale mesmo depois de 14/11). [EST 02/11]
2. Proibido rodar/criar/alterar/publicar qualquer coisa sem chamar as skills correspondentes na mesma tarefa (frontend-design com plano antes do código, web-design-guidelines depois, seo-page etc.), com prova da auditoria; hook `trava-skills.py` bloqueia. Testar a página publicada em 1920, 1366 e 390 px. [REGRAS 07/11 e 12/11]
3. O nome é masculino: "o Mestre dos Reparos", "do Mestre", "no Mestre", "pelo Mestre". Nunca "a/da/pela Mestre". [REGRAS 07/11; `ferramentas/corrige-genero-nome.py`]
4. Nunca usar num/numa/nuns/numas; escrever "em um/em uma/em uns/em umas". [REGRAS 09/11]
5. Escrever "Perfil do Google", não "GBP". [instrução do Paulo repassada nesta tarefa, 14/11]
6. Alphaville é bairro de Barueri: nunca "Barueri e Alphaville" como cidades; usar "Barueri (Alphaville, Tamboré, Belval…)" ou "Alphaville, em Barueri". [EST 03/11 e 07/11] (Obs.: o README do repo ainda diz "Barueri ou Alphaville".)
7. Nunca sugerir ligação telefônica nem botão "Ligar". [EST 07/11]
8. Reforma por bairro = 1 página hub (`/2026/10/reformas-em-barueri-para-residencias.html`, blocos #bairros/#cidades). As 27 `/p/reforma-*` estão em 301 → hub. Não criar páginas por bairro; reescrever só com obra real. [EST 04/11]
9. Não mudar H1 de nenhuma página; manter titles que ranqueiam. [REGRAS 07/11; EST 07/11]
10. Experiência = 25 anos (único valor). [REGRAS 07/11]
11. Nunca desligar as estrelas (Product + AggregateRating) da home e de `/p/eletricista-em-barueri.html`. [REGRAS 07/11]
12. Encanador não é prioridade (sem conteúdo/monitoramento). [EST 02/11]
13. Links do rodapé para diretórios e para a Loja ficam; não chamar de vazamento nem propor remover. [EST]
14. Tom acolhedor e humano, do jeito do Paulo, sem cara de IA (guia `entregas/guia-de-voz.txt`, não encontrado nesta máquina). [EST 03/11]
15. Toda afirmação com fonte; sem fonte, dizer "sem fonte". [REGRAS 12/11]
16. Fotos redondas de IA (img.tp-foto) não entram; usar fotos reais do Paulo. [REGRAS 07/11]
17. Não propor de novo: Bing (já conectado), pedido de avaliação à base, contrato de manutenção às empresas atendidas, prospecção fria. [EST]
18. Buscas em inglês no GSC (plumber/electrician near me, desktop) são robôs: excluir dos KPIs. [EST 02/11]
19. Economizar créditos (Claude e OpenSEO; lotes OpenSEO > 2.000 créditos pedem OK). [EST 04/11, 08/11]

## Medições pendentes registradas
- Posição de "eletricista em barueri" (1º no celular em 07/11, OpenSEO) e das páginas do lote 2: medir em 21/11 e 05/12. [EST 07/11]

## REGRA DO DONO — canibalização (14/11/2026, Paulo; versão final)
- APONTAR canibalização quando houver, sempre com prova (Search Console: query, páginas, impressões, posição, período).
- Páginas de assuntos diferentes NÃO podem disputar força entre si; se o Google fizer isso, é erro do Google a ser corrigido com sinais (links internos, títulos), não juntando serviços diferentes.
- Juntar/redirecionar páginas: SÓ se fizer sentido para SEO, com prova, e com ok do Paulo. Nunca redirecionar a home.
- Nunca dizer "resolvido" sem prova atual (dados das últimas 4 semanas + conferência no ar).

## Serviços que NÃO fazemos (Paulo, 14/11/2026)
- Desentupimento e caça-vazamento: não fazemos e não queremos. Hidráulica = vazamentos, registros e instalações (home, card Hidráulica). Nunca sugerir página, post ou palavra-chave desses serviços.
- Fonte dos serviços: sempre a lista de cards da home (nova/home.html).
