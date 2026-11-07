# Auditoria das skills: /p/contrato-de-manutencao-para-empresas.html (07/11/2026)

Arquivos: texto.md (2.212 palavras sem comentários e URLs), schema.json (@graph de 7 nós), este arquivo.
Lidos antes de escrever: ESTADO.md, guia-de-voz.txt, /root/.claude/CLAUDE.md, modelo pagina-eletricista/texto.md e schema.json, lote2/plano-frontend-design.md, conteúdo atual (orig/page-7044683241263890034.json e .txt).
Teste de formato: `python3 build.py contrato` rodou sem erro ("contrato ok ... H2 10 H3 24 meta 153"), 7 fotos achadas, 0 `tel:`, 1 tabela, 1 lista numerada. Gerou blogger-body.html, previa.html e meta.txt nesta pasta. Nada foi publicado.

---

## 1. Skill seo-content-brief (modo melhorar página existente), chamada ANTES de escrever

**Dados usados:**
- Search Console (3 meses, passados na tarefa): "manutenção predial em barueri": esta página pos. 83 (2 impr.), o post /2026/10/manutencao-para-empresas.html pos. 49 (15 impr.). "manutenção predial em alphaville": post pos. 35 (21 impr.).
- SERP ao vivo, OpenSEO get_serp_results (celular, Brasil, 07/11, cerca de 10 créditos):
  - "manutenção predial em barueri": 1º masterhousesolucoes.com.br (página local "Reformas e Manutenção em Barueri"), 2º ohub.com.br (diretório), 2º facilita-barueri-pro.base44.app (o app antigo da própria Mestre dos Reparos, guia de manutenção preventiva), 5º sindiconet (diretório), 4º a 7º vagas de emprego (jobted, bebee) e baruerifacil (diretório). No pacote local: RICO Manutenção Predial, **Mestre dos Reparos** (aponta para /p/eletricista-em-barueri.html) e Waldir.
  - "contrato de manutenção predial alphaville": só PDF de licitação de prefeitura (.sp.gov.br) e AI Overview. Nenhuma empresa concorrendo.

**O que a skill apontou (trechos do brief):**
- Intenção: transacional e local. O Google mostra pacote local + página local de empresa. Público: síndico, administradora, gestor de facilities.
- Concorrente real só um (Master House). Os outros são diretório e vaga, que a skill manda excluir. Lacunas: nenhum concorrente mostra modalidades de contrato, como a proposta é montada, clientes com nome nem responsável técnico com CREA.
- Manter e reforçar (já existia na página): lista do que o contrato cobre, escopo por especialidade, 6 modalidades, 6 etapas da proposta, segmentos, FAQ, clientes.
- Corrigir: a seção "Serviços de limpeza que executamos" (48 atividades) não tem a ver com a busca e divide a página em dois assuntos. Emoji nos H3. Botão "Ligar agora". FAQ fala em laudo e Corpo de Bombeiros. "Alphaville" e "Aldeia da Serra" aparecem como cidades. Nenhuma foto. Sem data de revisão nem autor.
- Ganho de informação: tabela de modalidades (formato x indicação x prazo), clientes com nome e o que foi feito, engenheiro com CREA, fotos reais de galpão, quadro e exaustor.
- Palavra principal no H1, no title, na meta e nas primeiras 100 palavras. Não precisa em todo H2.
- Links internos: contrato de limpeza, elétrica para condomínios, guia do blog (post), responsabilidade técnica, páginas de bairro e cidade.
- Meta tags: o title não muda (regra do Paulo, tem 68 caracteres). A skill pede meta de 130 a 150 caracteres e a regra do Paulo pede 140 a 155. Ficou 153 caracteres, valendo a regra do Paulo.

**O que mudei por causa do brief:**
- A página ficou só com conteúdo de contratação: o que cobre, escopo, modalidades (TABELA), proposta (lista numerada), segmentos, clientes, responsável técnico, avaliações, onde atendemos e FAQ.
- A seção de limpeza (48 atividades) saiu. A limpeza virou o H3 "Limpeza dentro do contrato", com link para /p/contrato-de-limpeza-para-empresas.html.
- Para resolver a canibalização, o post entra como leitura de apoio: "leia o nosso [guia de manutenção predial para empresas](/2026/10/manutencao-para-empresas.html)", na seção "Como montamos a proposta".
- Meta description: "Contrato de manutenção predial em Barueri para empresas, condomínios e galpões: elétrica, civil, pintura e reparos, com engenheiro CREA. Peça a proposta." (153).

## 2. Skill seo-content (E-E-A-T, frases de IA, Unicode invisível), chamada DEPOIS de escrever

**O que a skill apontou:**
- Script `content_humanize.py --json` em texto.md: `"change_count": 0`, `"invisible_count": 0` (nenhuma frase de IA da tabela e nenhum caractere invisível).
- Legibilidade (contagem própria): 135 frases, média de 16,9 palavras. A skill pede de 15 a 20. Havia 4 frases com mais de 30 palavras: o hero, a 1ª resposta do FAQ, a tabela e a lista de bairros (essas duas são falso positivo).
- Who/How/Why: Who está ok (engenheiro, CREA, UFRJ, SENAI, NR-10, linha "Página revisada em 7 de novembro de 2026"). Trust está ok (CNPJ, endereço, nota fiscal, garantia de 90 dias, clientes com nome).
- Experience é o ponto fraco: não existe caso real de contrato com resultado. A página atual não tem nenhum e eu não inventei.
- Afirmações sem fonte que encontrei: "Na maior parte dos imóveis o contrato reúne elétrica, civil...", "boa parte do trabalho é feita fora do expediente", "porta de acesso que não fecha é um dos chamados que mais param", "é ele quem assina a proposta", "peça referência dos atendimentos".
- Contagem: 2.212 palavras. O mínimo para página de serviço é 800.

**O que mudei:**
- O hero foi quebrado em duas frases.
- A 1ª resposta do FAQ foi quebrada em duas frases.
- As frases sem fonte saíram ou viraram fato que não depende de número: "Você escolhe o que entra; o que ficar de fora aparece escrito na proposta"; "dá para marcar fora do expediente"; "Porta de acesso que não fecha para a operação"; "A vistoria inicial e o plano de manutenção passam por ele". A oferta de referência dos clientes saiu.
- Pendência para o Paulo: 1 caso real de contrato (cliente, o que mudou, período). Se ele mandar, entra como H2 "O que encontramos em contrato".

## 3. Skill seo-geo (citabilidade para IA)

**O que a skill apontou:**
- robots.txt (curl de 07/11): `User-agent: * / Allow: /`, com bloqueio só de /search e /share-widget. Googlebot, OAI-SearchBot, Claude-SearchBot e PerplexityBot podem ler a página. O Blogger entrega o HTML do servidor, sem depender de JS.
- "~44% das citações vêm do primeiro 30% da página": o hero dizia "Fazemos..." e o nome da marca não aparecia. Faltava entidade clara no 1º parágrafo.
- Faltava a definição "X é..." perto do topo. Ela só existia no FAQ, no fim da página.
- Pontos fortes: a tabela de modalidades, a lista de etapas e o FAQ com perguntas como H3 e resposta direta de 2 a 4 frases. A seção de clientes funciona sozinha (nome, bairro/cidade, serviço).
- llms.txt: /p/llms.txt já existe. Não conta para o Google e não muda nada aqui.

**O que mudei:**
- O 1º parágrafo agora começa com "A Mestre dos Reparos faz manutenção predial em Barueri por contrato...".
- A seção "O que o contrato de manutenção cobre" ganhou a definição na 1ª frase: "Contrato de manutenção predial é o acordo mensal em que uma empresa assume a manutenção preventiva e corretiva do imóvel, com escopo, frequência e prazo de atendimento por escrito."
- Em Modalidades: "A Mestre dos Reparos trabalha com seis formatos de contrato de manutenção predial." Assim o trecho funciona sozinho se for citado.

## 4. Skill seo-schema (JSON-LD)

**Detecção no HTML atual:** 3 blocos.
- `ProfessionalService` com @id #empresa. Conflita com o tipo da mesma entidade na página do eletricista.
- `areaServed` traz "Alphaville" e "Aldeia da Serra" como City (errado, porque Alphaville é bairro de Barueri), mais Osasco e Cotia.
- Horário 07:00–22:00 diferente do 24 h do resto do site. Imagem é logo do base44.
- FAQPage tem perguntas sobre laudo e Bombeiros. BreadcrumbList sem @id.

**O que a skill apontou:** FAQPage não dá mais rich result no Google desde 07/05/2026. Pode manter, mas como Info. Não usar HowTo. Usar URL absoluta e não inventar dado.

**O que gerei (schema.json, @graph):**
- `HomeAndConstructionBusiness` com @id https://www.mestredosreparos.app.br/#empresa. Mesmos NAP, horário, sameAs e employee do modelo aprovado. Imagem é a foto real do galpão (jsdelivr, commit 441521d). areaServed tem só as 5 cidades: Barueri, Santana de Parnaíba, Jandira, Itapevi, Carapicuíba.
- `Person` #paulo-valadao: CREA 141129611802, UFRJ, SENAI, NR-10, 25 anos.
- `WebSite` #site.
- `WebPage` #webpage: reviewedBy #paulo-valadao, lastReviewed 2026-11-07, datePublished 2026-10-11 (data real do Blogger), description = meta, primaryImageOfPage.
- `Service` #servico: serviceType "Manutenção predial", provider #empresa, areaServed, audience BusinessAudience, OfferCatalog com as 6 modalidades e SEM preço.
- `FAQPage` #faq: 12 perguntas tiradas por script do texto.md. Texto igual ao da página.
- `BreadcrumbList` #breadcrumb: Início → Manutenção predial para empresas. Bate com a trilha do build.py.
- Conferido: 0 AggregateRating, 0 Product, 0 URL relativa, JSON válido.

---

## Regras fixas conferidas no texto.md (contagem por script)
câmera 0 | ar-condicionado 0 | ventilador 0 | laudo 0 | AVCB 0 | encanador 0 | marido de aluguel 0 | ligue 0 | telefone 0 | tel: 0 | "Barueri e Alphaville" 0 | "·" 0 | emoji em H3 0.
- H1 e title iguais aos atuais.
- 25 anos é o único tempo de experiência no texto.
- Nota 4,9 sem o número de avaliações.
- SLA, preço e prazo só como estão na página atual: 12 meses ou 3/6 meses, emergência no mesmo dia, 90 dias de garantia, material de consumo incluso. O que não tem número está como "combinado na proposta".
- Clientes com o serviço que a página atual descreve para cada um. Para PJ Bank e MFA, cidade omitida porque não está na fonte.
- Fotos só de fotos/servicos e fotos/equipe. Nenhuma da raiz de fotos/.
- Hidráulica entrou como H3 "Hidráulica predial" porque já estava no texto atual. A palavra encanador não aparece. Não pus link para /p/hidrailica-mestre-dos-reparos.html porque não li o conteúdo dela.
- Osasco e Cotia saíram da lista de cidades para seguir o guia de voz e o schema do modelo (5 cidades). Se o Paulo quiser as duas de volta, é só adicionar.
